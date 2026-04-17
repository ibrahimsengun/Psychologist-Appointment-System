export interface GalleryImage {
    id: string;
    image_url: string;
    title: string | null;
    description: string | null;
    sort_order: number;
    is_active: boolean;
    created_at: string;
    updated_at: string;
}
