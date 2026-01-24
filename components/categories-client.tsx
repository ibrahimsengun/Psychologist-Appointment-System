'use client';

import { useState, useEffect } from 'react';
import { Category } from '@/types/category';
import { getCategories } from '@/actions/category-actions';
import { CategoriesTable } from '@/components/categories-table';
import { CategoryForm } from '@/components/forms/category-form';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

export function CategoriesClient({ initialCategories }: { initialCategories: Category[] }) {
    const [categories, setCategories] = useState<Category[]>(initialCategories);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingCategory, setEditingCategory] = useState<Category | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const refreshCategories = async () => {
        setIsLoading(true);
        try {
            const data = await getCategories();
            setCategories(data);
        } catch (error) {
            console.error('Kategoriler yüklenemedi:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (category: Category) => {
        setEditingCategory(category);
        setIsDialogOpen(true);
    };

    const handleSuccess = () => {
        setIsDialogOpen(false);
        setEditingCategory(null);
        refreshCategories();
    };

    const handleCancel = () => {
        setIsDialogOpen(false);
        setEditingCategory(null);
    };

    const handleOpenNew = () => {
        setEditingCategory(null);
        setIsDialogOpen(true);
    };

    return (
        <div className="container my-8 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Blog Kategorileri</h1>
                    <p className="text-muted-foreground mt-1">
                        Blog yazılarınız için kategori oluşturun ve yönetin
                    </p>
                </div>
                <Button onClick={handleOpenNew}>
                    <Plus className="mr-2 h-4 w-4" />
                    Yeni Kategori
                </Button>
            </div>

            <CategoriesTable
                categories={categories}
                onEdit={handleEdit}
                onDelete={refreshCategories}
            />

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>
                            {editingCategory ? 'Kategoriyi Düzenle' : 'Yeni Kategori Oluştur'}
                        </DialogTitle>
                        <DialogDescription>
                            {editingCategory
                                ? 'Kategori bilgilerini güncelleyin'
                                : 'Blog yazılarınız için yeni bir kategori oluşturun'}
                        </DialogDescription>
                    </DialogHeader>
                    <CategoryForm
                        category={editingCategory}
                        onSuccess={handleSuccess}
                        onCancel={handleCancel}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}
