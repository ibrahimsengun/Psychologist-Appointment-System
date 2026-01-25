'use server';

import { BlogPost } from '@/types/blog';
import { getPublishedPosts } from './blog-actions';
import { getBlogPostCategories } from './category-actions';

/**
 * Get related posts based on:
 * 1. Same categories
 * 2. Similar keywords in title/excerpt
 * 3. Recent posts as fallback
 */
export async function getRelatedPosts(
    currentPostId: string,
    limit: number = 3
): Promise<BlogPost[]> {
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

    // Get categories for all posts
    const currentCategories = await getBlogPostCategories(currentPostId);
    const currentCategoryIds = currentCategories.map(cat => cat.id);

    // Score each post
    const scoredPosts = await Promise.all(
        otherPosts.map(async (post) => {
            let score = 0;

            // Get post categories
            const postCategories = await getBlogPostCategories(post.id);
            const postCategoryIds = postCategories.map(cat => cat.id);

            // Score: Same category = 10 points per category
            const commonCategories = currentCategoryIds.filter(id =>
                postCategoryIds.includes(id)
            );
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

            // Add categories to post for display
            return {
                ...post,
                categories: postCategories,
                _score: score
            };
        })
    );

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
