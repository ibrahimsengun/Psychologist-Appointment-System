import { getAllReviews } from '@/actions/review-actions';
import { ReviewsTable } from '@/components/reviews-table';
import { CreateReviewDialog } from '@/components/reviews/create-review-dialog';
import { Review } from '@/types/review';

export default async function ReviewsPage() {
    const reviews = await getAllReviews() as Review[];

    return (
        <div className="container mx-auto py-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold">Yorumlar</h1>
                <CreateReviewDialog />
            </div>

            <div className="bg-white shadow-lg rounded-lg p-6">
                <ReviewsTable reviews={reviews} />
            </div>
        </div>
    );
}
