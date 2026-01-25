import { BlogPost } from '@/types/blog';
import { BlogCard } from './blog-card';

interface RelatedPostsProps {
    posts: BlogPost[];
}

export function RelatedPosts({ posts }: RelatedPostsProps) {
    if (posts.length === 0) {
        return null;
    }

    return (
        <section className="mt-16 pt-16 border-t">
            <div className="mb-8">
                <h2 className="text-3xl font-bold mb-2">İlgili Yazılar</h2>
                <p className="text-muted-foreground">
                    Bu yazıyla ilgili diğer içerikler
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                ))}
            </div>
        </section>
    );
}
