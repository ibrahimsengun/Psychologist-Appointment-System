'use client';

import Link from 'next/link';
import { ScoreRange, ScoringConfig } from '@/types/psychological-tests';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, Calendar, RefreshCw, Share2 } from 'lucide-react';
import { getLevelColorClasses, calculatePercentage } from '@/utils/test-evaluation';

interface ResultDisplayProps {
    testTitle: string;
    score: number;
    maxScore: number;
    result: ScoreRange;
    disclaimer: string;
    onRetake: () => void;
}

export function ResultDisplay({
    testTitle,
    score,
    maxScore,
    result,
    disclaimer,
    onRetake
}: ResultDisplayProps) {
    const percentage = calculatePercentage(score, maxScore);
    const colors = getLevelColorClasses(result.color);

    // Gauge için açı hesaplama (180 derece yay)
    const gaugeAngle = (percentage / 100) * 180;

    return (
        <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            <Card className="border-2 shadow-lg">
                <CardHeader className="text-center pb-2">
                    <CardTitle className="text-2xl">Test Sonucunuz</CardTitle>
                    <CardDescription>{testTitle}</CardDescription>
                </CardHeader>

                <CardContent className="space-y-6">
                    {/* Gauge Meter */}
                    <div className="flex justify-center py-4">
                        <div className="relative w-48 h-24 overflow-hidden">
                            {/* Background arc */}
                            <div className="absolute inset-0">
                                <svg viewBox="0 0 100 50" className="w-full h-full">
                                    <path
                                        d="M 5 50 A 45 45 0 0 1 95 50"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        className="text-muted"
                                    />
                                    {/* Colored arc based on score */}
                                    <path
                                        d="M 5 50 A 45 45 0 0 1 95 50"
                                        fill="none"
                                        stroke="currentColor"
                                        strokeWidth="8"
                                        strokeDasharray={`${gaugeAngle * 0.785} 1000`}
                                        className={colors.text}
                                    />
                                </svg>
                            </div>

                            {/* Score display */}
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 text-center">
                                <div className={`text-4xl font-bold ${colors.text}`}>
                                    {score}
                                </div>
                                <div className="text-sm text-muted-foreground">
                                    / {maxScore}
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Level Badge */}
                    <div className={`${colors.bgLight} ${colors.border} border-2 rounded-xl p-6 text-center`}>
                        <h3 className={`text-xl font-bold ${colors.text} mb-2`}>
                            {result.label}
                        </h3>
                        <p className="text-muted-foreground text-sm leading-relaxed">
                            {result.description}
                        </p>
                    </div>

                    {/* Disclaimer */}
                    <div className="bg-amber-50 border border-amber-200 rounded-lg p-4 flex gap-3">
                        <AlertTriangle className="w-5 h-5 text-amber-600 flex-shrink-0 mt-0.5" />
                        <p className="text-sm text-amber-800">
                            {disclaimer}
                        </p>
                    </div>

                    {/* Actions */}
                    <div className="space-y-3 pt-2">
                        <Link href="/appointment" className="block">
                            <Button className="w-full" size="lg">
                                <Calendar className="w-5 h-5 mr-2" />
                                Uzmanla Görüşme Randevusu Al
                            </Button>
                        </Link>

                        <div className="flex gap-3">
                            <Button
                                variant="outline"
                                className="flex-1"
                                onClick={onRetake}
                            >
                                <RefreshCw className="w-4 h-4 mr-2" />
                                Testi Tekrarla
                            </Button>

                            <Button
                                variant="outline"
                                onClick={() => {
                                    if (navigator.share) {
                                        navigator.share({
                                            title: `${testTitle} Sonucum`,
                                            text: `${testTitle} sonucum: ${result.label}`,
                                            url: window.location.href
                                        });
                                    }
                                }}
                            >
                                <Share2 className="w-4 h-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
