'use client';

import { Category } from '@/types/category';
import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Pencil, Trash2 } from 'lucide-react';
import { deleteCategory } from '@/actions/category-actions';
import { toast } from 'sonner';

interface CategoriesTableProps {
    categories: Category[];
    onEdit: (category: Category) => void;
    onDelete: () => void;
}

export function CategoriesTable({ categories, onEdit, onDelete }: CategoriesTableProps) {
    const [deletingId, setDeletingId] = useState<string | null>(null);

    const handleDelete = async (category: Category) => {
        if (!confirm(`"${category.name}" kategorisini silmek istediğinizden emin misiniz?`)) {
            return;
        }

        setDeletingId(category.id);
        try {
            await deleteCategory(category.id);
            toast.success('Kategori silindi');
            onDelete();
        } catch (error: any) {
            toast.error(error.message || 'Kategori silinemedi');
        } finally {
            setDeletingId(null);
        }
    };

    if (categories.length === 0) {
        return (
            <div className="text-center py-12 border border-dashed rounded-lg">
                <p className="text-muted-foreground">Henüz kategori eklenmemiş</p>
            </div>
        );
    }

    return (
        <div className="border rounded-lg overflow-hidden">
            <table className="w-full">
                <thead className="bg-muted">
                    <tr>
                        <th className="px-4 py-3 text-left font-semibold">Kategori Adı</th>
                        <th className="px-4 py-3 text-left font-semibold">Slug</th>
                        <th className="px-4 py-3 text-left font-semibold">Açıklama</th>
                        <th className="px-4 py-3 text-left font-semibold">Oluşturulma</th>
                        <th className="px-4 py-3 text-right font-semibold">İşlemler</th>
                    </tr>
                </thead>
                <tbody>
                    {categories.map((category) => (
                        <tr key={category.id} className="border-t hover:bg-muted/50 transition-colors">
                            <td className="px-4 py-3 font-medium">{category.name}</td>
                            <td className="px-4 py-3">
                                <code className="text-sm bg-muted px-2 py-1 rounded">{category.slug}</code>
                            </td>
                            <td className="px-4 py-3 text-muted-foreground max-w-md truncate">
                                {category.description || '-'}
                            </td>
                            <td className="px-4 py-3 text-sm text-muted-foreground">
                                {new Date(category.created_at).toLocaleDateString('tr-TR')}
                            </td>
                            <td className="px-4 py-3">
                                <div className="flex items-center justify-end gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => onEdit(category)}
                                        disabled={deletingId === category.id}
                                    >
                                        <Pencil className="h-4 w-4" />
                                    </Button>
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => handleDelete(category)}
                                        disabled={deletingId === category.id}
                                    >
                                        <Trash2 className="h-4 w-4 text-destructive" />
                                    </Button>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}
