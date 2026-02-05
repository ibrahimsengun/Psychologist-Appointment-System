import { PsychologicalTest } from '@/types/psychological-tests';
import { GAD7 } from './gad7';

/**
 * Tüm psikolojik testlerin listesi
 */
export const allTests: PsychologicalTest[] = [
    GAD7
];

/**
 * Slug'a göre test bul
 */
export function getTestBySlug(slug: string): PsychologicalTest | undefined {
    return allTests.find(test => test.slug === slug);
}

/**
 * Tüm testleri getir
 */
export function getAllTests(): PsychologicalTest[] {
    return allTests;
}

export { GAD7 };
