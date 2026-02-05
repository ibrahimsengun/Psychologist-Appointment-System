'use client';

import { Question, QuestionOption } from '@/types/psychological-tests';
import { cn } from '@/lib/utils';

interface QuestionCardProps {
    question: Question;
    selectedValue: number | null;
    onSelect: (value: number) => void;
}

export function QuestionCard({ question, selectedValue, onSelect }: QuestionCardProps) {
    return (
        <div className="animate-in fade-in slide-in-from-right-4 duration-300">
            <h2 className="text-xl md:text-2xl font-semibold text-foreground mb-8 text-center">
                {question.text}
            </h2>

            <div className="grid gap-3">
                {question.options.map((option: QuestionOption) => (
                    <button
                        key={option.value}
                        onClick={() => onSelect(option.value)}
                        className={cn(
                            'w-full p-4 md:p-5 rounded-xl border-2 text-left transition-all duration-200',
                            'hover:border-primary hover:bg-primary/5',
                            'focus:outline-none focus:ring-2 focus:ring-primary focus:ring-offset-2',
                            selectedValue === option.value
                                ? 'border-primary bg-primary/10 shadow-md'
                                : 'border-muted bg-background hover:shadow-sm'
                        )}
                    >
                        <div className="flex items-center gap-4">
                            <div
                                className={cn(
                                    'w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all',
                                    selectedValue === option.value
                                        ? 'border-primary bg-primary'
                                        : 'border-muted-foreground/30'
                                )}
                            >
                                {selectedValue === option.value && (
                                    <div className="w-2 h-2 rounded-full bg-white" />
                                )}
                            </div>
                            <span className={cn(
                                'text-base md:text-lg',
                                selectedValue === option.value ? 'font-medium' : 'font-normal'
                            )}>
                                {option.label}
                            </span>
                        </div>
                    </button>
                ))}
            </div>

            <p className="text-center text-sm text-muted-foreground mt-6">
                Son 2 hafta içinde bu durumu ne sıklıkla yaşadınız?
            </p>
        </div>
    );
}
