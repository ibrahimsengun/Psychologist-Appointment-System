import { z } from "zod";

export const videoFormSchema = z.object({
    youtube_url: z
        .string()
        .min(1, "YouTube URL zorunludur")
        .refine(
            (url) => {
                const patterns = [
                    /youtube\.com\/watch\?v=/,
                    /youtube\.com\/shorts\//,
                    /youtu\.be\//,
                    /youtube\.com\/embed\//,
                ];
                return patterns.some((p) => p.test(url));
            },
            { message: "Geçerli bir YouTube URL'si giriniz" }
        ),
    title: z.string().min(1, "Video başlığı zorunludur"),
});

export type VideoFormValues = z.infer<typeof videoFormSchema>;

export interface Video {
    id: string;
    youtube_url: string;
    title: string;
    sort_order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}

/**
 * YouTube URL'sinden video ID'sini çıkarır.
 * Desteklenen formatlar:
 * - https://www.youtube.com/watch?v=VIDEO_ID
 * - https://youtube.com/shorts/VIDEO_ID
 * - https://youtu.be/VIDEO_ID
 * - https://www.youtube.com/embed/VIDEO_ID
 */
export function extractYouTubeId(url: string): string | null {
    const patterns = [
        /youtube\.com\/watch\?v=([^&\s]+)/,
        /youtube\.com\/shorts\/([^?\s]+)/,
        /youtu\.be\/([^?\s]+)/,
        /youtube\.com\/embed\/([^?\s]+)/,
    ];

    for (const pattern of patterns) {
        const match = url.match(pattern);
        if (match?.[1]) return match[1];
    }

    return null;
}
