'use server';

import { createClient } from '@/utils/supabase/server';
import { TestAnswer } from '@/types/psychological-tests';

interface SaveTestResultParams {
    testSlug: string;
    totalScore: number;
    resultLevel: string;
    answers: TestAnswer[];
    sessionId?: string;
    referrer?: string;
}

/**
 * Test sonucunu veritabanına kaydet
 */
export async function saveTestResult(params: SaveTestResultParams) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('test_results')
        .insert({
            test_slug: params.testSlug,
            total_score: params.totalScore,
            result_level: params.resultLevel,
            answers: params.answers,
            session_id: params.sessionId,
            referrer: params.referrer
        })
        .select()
        .single();

    if (error) {
        console.error('Test sonucu kaydedilemedi:', error);
        return { success: false, error: error.message };
    }

    return { success: true, data };
}

/**
 * Test istatistiklerini getir (Admin için)
 */
export async function getTestStatistics() {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('test_statistics')
        .select('*');

    if (error) {
        console.error('Test istatistikleri alınamadı:', error);
        return { success: false, error: error.message, data: [] };
    }

    return { success: true, data };
}

/**
 * Belirli bir testin son sonuçlarını getir (Admin için)
 */
export async function getRecentTestResults(testSlug: string, limit: number = 10) {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('test_results')
        .select('*')
        .eq('test_slug', testSlug)
        .order('completed_at', { ascending: false })
        .limit(limit);

    if (error) {
        console.error('Son test sonuçları alınamadı:', error);
        return { success: false, error: error.message, data: [] };
    }

    return { success: true, data };
}
