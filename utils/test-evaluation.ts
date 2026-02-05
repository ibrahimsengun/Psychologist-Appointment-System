import { TestAnswer, ScoringConfig, ScoreRange } from '@/types/psychological-tests';

/**
 * Toplam puanı hesapla
 */
export function calculateScore(answers: TestAnswer[]): number {
    return answers.reduce((total, answer) => total + answer.value, 0);
}

/**
 * Puana göre sonuç seviyesini belirle
 */
export function evaluateResult(score: number, config: ScoringConfig): ScoreRange {
    const range = config.ranges.find(r => score >= r.min && score <= r.max);

    if (!range) {
        // Fallback to the last range if score exceeds max
        return config.ranges[config.ranges.length - 1];
    }

    return range;
}

/**
 * Yüzde olarak skoru hesapla (gauge için)
 */
export function calculatePercentage(score: number, maxScore: number): number {
    return Math.round((score / maxScore) * 100);
}

/**
 * Seviyeye göre Tailwind renk sınıfı döndür
 */
export function getLevelColorClasses(color: string): {
    bg: string;
    text: string;
    border: string;
    bgLight: string;
} {
    const colorMap: Record<string, { bg: string; text: string; border: string; bgLight: string }> = {
        emerald: {
            bg: 'bg-emerald-500',
            text: 'text-emerald-600',
            border: 'border-emerald-500',
            bgLight: 'bg-emerald-50'
        },
        yellow: {
            bg: 'bg-yellow-500',
            text: 'text-yellow-600',
            border: 'border-yellow-500',
            bgLight: 'bg-yellow-50'
        },
        orange: {
            bg: 'bg-orange-500',
            text: 'text-orange-600',
            border: 'border-orange-500',
            bgLight: 'bg-orange-50'
        },
        red: {
            bg: 'bg-red-500',
            text: 'text-red-600',
            border: 'border-red-500',
            bgLight: 'bg-red-50'
        }
    };

    return colorMap[color] || colorMap.emerald;
}
