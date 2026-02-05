import { z } from 'zod';

// ==================== TYPES ====================

/**
 * Soru seçeneği
 */
export interface QuestionOption {
    value: number;
    label: string;
}

/**
 * Test sorusu
 */
export interface Question {
    id: number;
    text: string;
    options: QuestionOption[];
}

/**
 * Puan aralığı ve sonuç seviyesi
 */
export interface ScoreRange {
    min: number;
    max: number;
    level: 'minimal' | 'mild' | 'moderate' | 'severe';
    label: string;
    description: string;
    color: string; // Tailwind color class
}

/**
 * Puanlama konfigürasyonu
 */
export interface ScoringConfig {
    maxScore: number;
    ranges: ScoreRange[];
    disclaimer: string;
}

/**
 * Psikolojik test tanımı
 */
export interface PsychologicalTest {
    id: string;
    slug: string;
    title: string;
    description: string;
    shortDescription: string;
    duration: string;
    questionCount: number;
    icon: string; // lucide icon name
    color: string; // Tailwind color for card
    questions: Question[];
    scoring: ScoringConfig;
}

/**
 * Kullanıcı cevabı
 */
export interface TestAnswer {
    questionId: number;
    value: number;
}

/**
 * Test sonucu
 */
export interface TestResult {
    testSlug: string;
    totalScore: number;
    resultLevel: ScoreRange['level'];
    answers: TestAnswer[];
    completedAt: Date;
}

// ==================== ZOD SCHEMAS ====================

export const testResultSchema = z.object({
    testSlug: z.string(),
    totalScore: z.number(),
    resultLevel: z.enum(['minimal', 'mild', 'moderate', 'severe']),
    answers: z.array(z.object({
        questionId: z.number(),
        value: z.number()
    }))
});

export type TestResultFormValues = z.infer<typeof testResultSchema>;

// ==================== DATABASE TYPES ====================

export interface TestResultDB {
    id: string;
    test_slug: string;
    total_score: number;
    result_level: string;
    answers: Record<number, number>;
    completed_at: string;
    session_id?: string;
    user_agent?: string;
    referrer?: string;
}
