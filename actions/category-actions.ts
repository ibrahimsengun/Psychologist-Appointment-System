'use server';

import { Category, CategoryFormValues } from '@/types/category';
import { createClient } from '@/utils/supabase/server';
import slugify from 'slugify';

// Tüm kategorileri getir
export async function getCategories(): Promise<Category[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .order('name', { ascending: true });

    if (error) {
        console.error('Kategoriler getirilemedi:', error);
        throw new Error('Kategoriler yüklenemedi');
    }

    return data as Category[];
}

// Tekil kategori getir
export async function getCategoryById(id: string): Promise<Category | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('id', id)
        .single();

    if (error) {
        return null;
    }

    return data as Category;
}

// Slug ile kategori getir
export async function getCategoryBySlug(slug: string): Promise<Category | null> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('categories')
        .select('*')
        .eq('slug', slug)
        .single();

    if (error) {
        return null;
    }

    return data as Category;
}

// Kategori oluştur
export async function createCategory(formData: CategoryFormValues): Promise<Category> {
    const supabase = await createClient();

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Yetkilendirme hatası');
    }

    // Slug'ı otomatik oluştur veya kullan
    const slug = formData.slug || slugify(formData.name, {
        lower: true,
        strict: true,
        locale: 'tr'
    });

    // Slug benzersizliğini kontrol et
    const existingCategory = await getCategoryBySlug(slug);
    if (existingCategory) {
        throw new Error('Bu slug zaten kullanılıyor');
    }

    const { data, error } = await supabase
        .from('categories')
        .insert({
            name: formData.name,
            slug: slug,
            description: formData.description || null
        })
        .select()
        .single();

    if (error) {
        console.error('Kategori oluşturma hatası:', error);
        throw new Error('Kategori oluşturulamadı');
    }

    return data as Category;
}

// Kategori güncelle
export async function updateCategory(id: string, formData: CategoryFormValues): Promise<Category> {
    const supabase = await createClient();

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Yetkilendirme hatası');
    }

    // Mevcut kategoriyi kontrol et
    const existingCategory = await getCategoryById(id);
    if (!existingCategory) {
        throw new Error('Kategori bulunamadı');
    }

    // Eğer slug değişiyorsa, benzersizliğini kontrol et
    if (formData.slug !== existingCategory.slug) {
        const slugExists = await getCategoryBySlug(formData.slug);
        if (slugExists) {
            throw new Error('Bu slug zaten kullanılıyor');
        }
    }

    const { data, error } = await supabase
        .from('categories')
        .update({
            name: formData.name,
            slug: formData.slug,
            description: formData.description || null
        })
        .eq('id', id)
        .select()
        .single();

    if (error) {
        console.error('Kategori güncelleme hatası:', error);
        throw new Error('Kategori güncellenemedi');
    }

    return data as Category;
}

// Kategori sil
export async function deleteCategory(id: string): Promise<void> {
    const supabase = await createClient();

    const {
        data: { user }
    } = await supabase.auth.getUser();

    if (!user) {
        throw new Error('Yetkilendirme hatası');
    }

    // Kategoriye bağlı blog yazısı var mı kontrol et
    const { count } = await supabase
        .from('blog_post_categories')
        .select('*', { count: 'exact', head: true })
        .eq('category_id', id);

    if (count && count > 0) {
        throw new Error(`Bu kategori ${count} blog yazısında kullanılıyor. Önce blog yazılarından kaldırın.`);
    }

    const { error } = await supabase
        .from('categories')
        .delete()
        .eq('id', id);

    if (error) {
        console.error('Kategori silme hatası:', error);
        throw new Error('Kategori silinemedi');
    }
}

// Blog yazısının kategorilerini getir
export async function getBlogPostCategories(blogPostId: string): Promise<Category[]> {
    const supabase = await createClient();

    const { data, error } = await supabase
        .from('blog_post_categories')
        .select(`
      category_id,
      categories (*)
    `)
        .eq('blog_post_id', blogPostId);

    if (error) {
        console.error('Blog yazısı kategorileri getirilemedi:', error);
        return [];
    }

    return data.map((item: any) => item.categories) as Category[];
}

// Blog yazısına kategori ekle
export async function addCategoryToBlogPost(blogPostId: string, categoryId: string): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase
        .from('blog_post_categories')
        .insert({
            blog_post_id: blogPostId,
            category_id: categoryId
        });

    if (error) {
        console.error('Kategori eklenemedi:', error);
        throw new Error('Kategori blog yazısına eklenemedi');
    }
}

// Blog yazısından kategori kaldır
export async function removeCategoryFromBlogPost(blogPostId: string, categoryId: string): Promise<void> {
    const supabase = await createClient();

    const { error } = await supabase
        .from('blog_post_categories')
        .delete()
        .eq('blog_post_id', blogPostId)
        .eq('category_id', categoryId);

    if (error) {
        console.error('Kategori kaldırılamadı:', error);
        throw new Error('Kategori blog yazısından kaldırılamadı');
    }
}

// Blog yazısının tüm kategorilerini güncelle
export async function updateBlogPostCategories(blogPostId: string, categoryIds: string[]): Promise<void> {
    const supabase = await createClient();

    // Önce mevcut kategorileri sil
    await supabase
        .from('blog_post_categories')
        .delete()
        .eq('blog_post_id', blogPostId);

    // Yeni kategorileri ekle
    if (categoryIds.length > 0) {
        const { error } = await supabase
            .from('blog_post_categories')
            .insert(
                categoryIds.map(categoryId => ({
                    blog_post_id: blogPostId,
                    category_id: categoryId
                }))
            );

        if (error) {
            console.error('Kategoriler güncellenemedi:', error);
            throw new Error('Blog yazısı kategorileri güncellenemedi');
        }
    }
}
