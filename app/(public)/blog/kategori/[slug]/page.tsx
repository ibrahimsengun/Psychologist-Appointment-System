import { getCategoryBySlug } from '@/actions/category-actions';
import { getPublishedPosts } from '@/actions/blog-actions';
import { getBlogPostCategories } from '@/actions/category-actions';
import { BlogCard } from '@/components/blog/blog-card';
import { Breadcrumb } from '@/components/ui/breadcrumb';
import { notFound } from 'next/navigation';
import type { Metadata } from 'next';

type Props = {
    params: Promise<{ slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const category = await getCategoryBySlug(slug);

    if (!category) {
        return {
            title: 'Kategori Bulunamadı'
        };
    }

    return {
        title: `${category.name} | Blog Kategorisi - Uzman Psk. Lokman Yılmaz`,
        description: category.description || `${category.name} kategorisindeki blog yazıları. Samsun psikolog Lokman Yılmaz tarafından hazırlanan içerikler.`,
        keywords: `${category.name}, psikoloji blog, ${category.slug}, samsun psikolog`,
        alternates: {
            canonical: `https://lokmanyilmaz.com.tr/blog/kategori/${slug}`
        },
        openGraph: {
            title: `${category.name} | Blog Kategorisi`,
            description: category.description || `${category.name} kategorisindeki blog yazıları`,
            url: `https://lokmanyilmaz.com.tr/blog/kategori/${slug}`,
            type: 'website'
        }
    };
}

export const revalidate = 3600;

export default async function CategoryPage({ params }: Props) {
    const { slug } = await params;
    const category = await getCategoryBySlug(slug);

    if (!category) {
        notFound();
    }

    // Get all published posts
    const allPosts = await getPublishedPosts();

    // Filter posts by category
    const postsWithCategories = await Promise.all(
        allPosts.map(async (post) => {
            const categories = await getBlogPostCategories(post.id);
            return { ...post, categories };
        })
    );

    const categoryPosts = postsWithCategories.filter((post) =>
        post.categories?.some((cat) => cat.id === category.id)
    );

    return (
        <div className="container py-8">
            <Breadcrumb
                items={[
                    { label: 'Blog', href: '/blog' },
                    { label: category.name }
                ]}
            />

            <div className="mb-8">
                <h1 className="text-4xl font-bold mb-3">{category.name}</h1>
                {category.description && (
                    <p className="text-lg text-muted-foreground">{category.description}</p>
                )}
                <p className="text-sm text-muted-foreground mt-2">
                    {categoryPosts.length} yazı bulundu
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {categoryPosts.length === 0 && (
                    <div className="col-span-full text-center py-12 border border-dashed rounded-lg">
                        <p className="text-muted-foreground">
                            Bu kategoride henüz blog yazısı bulunmuyor
                        </p>
                    </div>
                )}
                {categoryPosts.map((post) => (
                    <BlogCard key={post.id} post={post} />
                ))}
            </div>
        </div>
    );
}
