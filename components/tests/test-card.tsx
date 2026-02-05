'use client';

import Link from 'next/link';
import { Brain, Clock, HelpCircle, ArrowRight } from 'lucide-react';
import { PsychologicalTest } from '@/types/psychological-tests';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';

interface TestCardProps {
    test: PsychologicalTest;
}

const iconMap: Record<string, React.ComponentType<{ className?: string }>> = {
    Brain,
    HelpCircle
};

export function TestCard({ test }: TestCardProps) {
    const IconComponent = iconMap[test.icon] || Brain;

    const colorClasses: Record<string, { bg: string; border: string; icon: string }> = {
        blue: {
            bg: 'bg-blue-50 hover:bg-blue-100',
            border: 'border-blue-200',
            icon: 'text-blue-600'
        },
        green: {
            bg: 'bg-green-50 hover:bg-green-100',
            border: 'border-green-200',
            icon: 'text-green-600'
        },
        purple: {
            bg: 'bg-purple-50 hover:bg-purple-100',
            border: 'border-purple-200',
            icon: 'text-purple-600'
        },
        orange: {
            bg: 'bg-orange-50 hover:bg-orange-100',
            border: 'border-orange-200',
            icon: 'text-orange-600'
        }
    };

    const colors = colorClasses[test.color] || colorClasses.blue;

    return (
        <Card className={`${colors.bg} ${colors.border} border-2 transition-all duration-300 hover:shadow-lg hover:-translate-y-1`}>
            <CardHeader className="pb-3">
                <div className="flex items-start justify-between">
                    <div className={`p-3 rounded-xl bg-white shadow-sm`}>
                        <IconComponent className={`w-8 h-8 ${colors.icon}`} />
                    </div>
                    <Badge variant="secondary" className="text-xs">
                        {test.questionCount} Soru
                    </Badge>
                </div>
                <CardTitle className="text-xl mt-4">{test.title}</CardTitle>
                <CardDescription className="text-sm text-muted-foreground">
                    {test.shortDescription}
                </CardDescription>
            </CardHeader>

            <CardContent className="pt-0">
                <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                    <div className="flex items-center gap-1">
                        <Clock className="w-4 h-4" />
                        <span>{test.duration}</span>
                    </div>
                </div>

                <Link href={`/testler/${test.slug}`}>
                    <Button className="w-full group">
                        Teste Başla
                        <ArrowRight className="w-4 h-4 ml-2 transition-transform group-hover:translate-x-1" />
                    </Button>
                </Link>
            </CardContent>
        </Card>
    );
}
