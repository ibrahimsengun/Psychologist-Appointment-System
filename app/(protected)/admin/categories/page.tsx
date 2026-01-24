import { getCategories } from '@/actions/category-actions';
import { CategoriesClient } from '@/components/categories-client';

export const metadata = {
    title: 'Blog Kategorileri | Admin Panel',
    description: 'Blog kategorilerini yönetin'
};

export default async function CategoriesPage() {
    const categories = await getCategories();

    return <CategoriesClient initialCategories={categories} />;
}
