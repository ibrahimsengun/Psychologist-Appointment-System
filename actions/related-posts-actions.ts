'use server';

import { BlogPostListItem } from '@/types/blog';
import { getPublishedPosts } from './blog-actions';

/**
 * Get related posts based on:
 * 1. Same categories
 * 2. Similar keywords in title/excerpt
 * 3. Recent posts as fallback
 */
export async function getRelatedPosts(
    currentPostId: string,
    limit: number = 3
): Promise<BlogPostListItem[]> {
    const allPosts = await getPublishedPosts();

    // Exclude current post
    const otherPosts = allPosts.filter(post => post.id !== currentPostId);

    if (otherPosts.length === 0) {
        return [];
    }

    // Get current post
    const currentPost = allPosts.find(post => post.id === currentPostId);
    if (!currentPost) {
        return otherPosts.slice(0, limit);
    }

    // Categories already come with each post from getPublishedPosts (single cached query)
    const currentCategoryIds = (currentPost.categories ?? []).map(c => c.id);

    // Score each post
    const scoredPosts = otherPosts.map((post) => {
        let score = 0;

        const postCategories = post.categories ?? [];
        const postCategoryIds = postCategories.map(c => c.id);

        // Score: Same category = 10 points per category
        const commonCategories = currentCategoryIds.filter(id => postCategoryIds.includes(id));
        score += commonCategories.length * 10;

        // Score: Title similarity (common words)
        const currentWords = extractKeywords(currentPost.title);
        const postWords = extractKeywords(post.title);
        const commonWords = currentWords.filter(word => postWords.includes(word));
        score += commonWords.length * 5;

        // Score: Excerpt similarity
        const currentExcerptWords = extractKeywords(currentPost.excerpt);
        const postExcerptWords = extractKeywords(post.excerpt);
        const commonExcerptWords = currentExcerptWords.filter(word =>
            postExcerptWords.includes(word)
        );
        score += commonExcerptWords.length * 2;

        return {
            ...post,
            categories: postCategories,
            _score: score
        };
    });

    // Sort by score (highest first) and return top N
    return scoredPosts
        .sort((a, b) => (b._score || 0) - (a._score || 0))
        .slice(0, limit)
        .map(({ _score, ...post }) => post); // Remove score from final result
}

/**
 * Extract meaningful keywords from text
 * Removes common Turkish stop words and short words
 */
function extractKeywords(text: string): string[] {
    const turkishStopWords = [
        've', 'veya', 'ile', 'için', 'bir', 'bu', 'şu', 'o', 'de', 'da',
        'mi', 'mu', 'mü', 'mı', 'ise', 'gibi', 'kadar', 'daha', 'çok',
        'en', 'ne', 'nasıl', 'neden', 'niçin', 'nerede', 'kim', 'hangi'
    ];

    return text
        .toLowerCase()
        .replace(/[^\w\sğüşıöçĞÜŞİÖÇ]/g, ' ') // Remove punctuation
        .split(/\s+/)
        .filter(word =>
            word.length > 3 && // At least 4 characters
            !turkishStopWords.includes(word) &&
            !/^\d+$/.test(word) // Not a number
        );
}
