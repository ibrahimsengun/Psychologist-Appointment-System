'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { PsychologicalTest, TestAnswer } from '@/types/psychological-tests';
import { calculateScore, evaluateResult } from '@/utils/test-evaluation';
import { saveTestResult } from '@/actions/test-actions';
import { ProgressBar } from './progress-bar';
import { QuestionCard } from './question-card';
import { ResultDisplay } from './result-display';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, ArrowRight, Play } from 'lucide-react';

interface TestWizardProps {
    test: PsychologicalTest;
}

type WizardStep = 'intro' | 'questions' | 'result';

export function TestWizard({ test }: TestWizardProps) {
    const router = useRouter();
    const [step, setStep] = useState<WizardStep>('intro');
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answers, setAnswers] = useState<TestAnswer[]>([]);
    const [selectedValue, setSelectedValue] = useState<number | null>(null);
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Track computed results
    const [totalScore, setTotalScore] = useState(0);
    const [result, setResult] = useState(test.scoring.ranges[0]);

    const handleStart = () => {
        setStep('questions');
        setCurrentQuestion(0);
        setAnswers([]);
        setSelectedValue(null);
    };

    const handleSelectOption = (value: number) => {
        setSelectedValue(value);
    };

    const handleNext = async () => {
        if (selectedValue === null) return;

        const newAnswer: TestAnswer = {
            questionId: test.questions[currentQuestion].id,
            value: selectedValue
        };

        const updatedAnswers = [...answers, newAnswer];
        setAnswers(updatedAnswers);

        if (currentQuestion < test.questions.length - 1) {
            // Next question
            setCurrentQuestion(prev => prev + 1);
            setSelectedValue(null);
        } else {
            // Calculate result
            setIsSubmitting(true);

            const score = calculateScore(updatedAnswers);
            const resultRange = evaluateResult(score, test.scoring);

            setTotalScore(score);
            setResult(resultRange);

            // Save to database
            try {
                await saveTestResult({
                    testSlug: test.slug,
                    totalScore: score,
                    resultLevel: resultRange.level,
                    answers: updatedAnswers,
                    referrer: typeof window !== 'undefined' ? document.referrer : undefined
                });
            } catch (error) {
                console.error('Test sonucu kaydedilemedi:', error);
            }

            setIsSubmitting(false);
            setStep('result');
        }
    };

    const handlePrevious = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prev => prev - 1);
            // Restore previous answer
            const previousAnswer = answers[currentQuestion - 1];
            setSelectedValue(previousAnswer?.value ?? null);
            // Remove last answer
            setAnswers(prev => prev.slice(0, -1));
        }
    };

    const handleRetake = () => {
        setStep('intro');
        setCurrentQuestion(0);
        setAnswers([]);
        setSelectedValue(null);
        setTotalScore(0);
        setResult(test.scoring.ranges[0]);
    };

    // Intro Screen
    if (step === 'intro') {
        return (
            <Card className="max-w-2xl mx-auto border-2 shadow-lg">
                <CardHeader className="text-center">
                    <CardTitle className="text-2xl md:text-3xl">{test.title}</CardTitle>
                    <CardDescription className="text-base mt-2">
                        {test.description}
                    </CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    <div className="grid grid-cols-2 gap-4 text-center">
                        <div className="bg-muted/50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-primary">{test.questionCount}</div>
                            <div className="text-sm text-muted-foreground">Soru</div>
                        </div>
                        <div className="bg-muted/50 rounded-lg p-4">
                            <div className="text-2xl font-bold text-primary">{test.duration}</div>
                            <div className="text-sm text-muted-foreground">Süre</div>
                        </div>
                    </div>

                    <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                        <p className="text-sm text-blue-800">
                            <strong>Nasıl Cevaplamalısınız:</strong> Her soru için, son 2 hafta içinde bu durumu
                            ne sıklıkla yaşadığınızı düşünerek en uygun seçeneği işaretleyin.
                        </p>
                    </div>

                    <Button
                        className="w-full"
                        size="lg"
                        onClick={handleStart}
                    >
                        <Play className="w-5 h-5 mr-2" />
                        Teste Başla
                    </Button>

                    <Button
                        variant="ghost"
                        className="w-full"
                        onClick={() => router.push('/testler')}
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Tüm Testlere Dön
                    </Button>
                </CardContent>
            </Card>
        );
    }

    // Questions Screen
    if (step === 'questions') {
        return (
            <div className="max-w-2xl mx-auto space-y-6">
                <ProgressBar
                    current={currentQuestion + 1}
                    total={test.questions.length}
                />

                <Card className="border-2 shadow-lg">
                    <CardContent className="pt-8 pb-6 px-6">
                        <QuestionCard
                            question={test.questions[currentQuestion]}
                            selectedValue={selectedValue}
                            onSelect={handleSelectOption}
                        />
                    </CardContent>
                </Card>

                <div className="flex gap-3">
                    <Button
                        variant="outline"
                        onClick={handlePrevious}
                        disabled={currentQuestion === 0}
                        className="flex-1"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Önceki
                    </Button>

                    <Button
                        onClick={handleNext}
                        disabled={selectedValue === null || isSubmitting}
                        className="flex-1"
                    >
                        {currentQuestion === test.questions.length - 1 ? (
                            isSubmitting ? 'Hesaplanıyor...' : 'Sonucu Gör'
                        ) : (
                            <>
                                Sonraki
                                <ArrowRight className="w-4 h-4 ml-2" />
                            </>
                        )}
                    </Button>
                </div>
            </div>
        );
    }

    // Result Screen
    return (
        <div className="max-w-2xl mx-auto">
            <ResultDisplay
                testTitle={test.title}
                score={totalScore}
                maxScore={test.scoring.maxScore}
                result={result}
                disclaimer={test.scoring.disclaimer}
                onRetake={handleRetake}
            />
        </div>
    );
}
