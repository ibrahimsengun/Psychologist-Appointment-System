import { getAllReviews } from '@/actions/review-actions';
import { AdminPageHeader } from '@/components/admin/page-header';
import { ReviewsTable } from '@/components/reviews-table';
import { CreateReviewDialog } from '@/components/reviews/create-review-dialog';
import { Review } from '@/types/review';

export default async function ReviewsPage() {
    const reviews = await getAllReviews() as Review[];

    return (
        <div className="container mx-auto py-8">
            <AdminPageHeader
                title="Yorumlar"
                description="Danışan yorumları anasayfada ve Danışan Yorumları sayfasında görünür."
                action={<CreateReviewDialog />}
            />

            <div className="rounded-lg border bg-card p-6">
                <ReviewsTable reviews={reviews} />
            </div>
        </div>
    );
}
