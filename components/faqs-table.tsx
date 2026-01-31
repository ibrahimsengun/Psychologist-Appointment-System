'use client';

import { useState } from 'react';
import { FAQ } from '@/types/faq';
import { deleteFAQ, toggleFAQActive, toggleHomepageFAQ } from '@/actions/faq-actions';
import { Button } from '@/components/ui/button';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Pencil, Trash2, Eye, EyeOff, Home } from 'lucide-react';
import { toast } from 'sonner';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from '@/components/ui/alert-dialog';

interface FAQsTableProps {
    faqs: FAQ[];
    onEdit: (faq: FAQ) => void;
    onRefresh: () => void;
}

export function FAQsTable({ faqs, onEdit, onRefresh }: FAQsTableProps) {
    const [deletingId, setDeletingId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState(false);
    const [togglingId, setTogglingId] = useState<string | null>(null);
    const [togglingHomepageId, setTogglingHomepageId] = useState<string | null>(null);

    const handleDelete = async () => {
        if (!deletingId) return;

        setIsDeleting(true);
        try {
            await deleteFAQ(deletingId);
            toast.success('Soru silindi');
            onRefresh();
        } catch (error: any) {
            toast.error(error.message || 'Soru silinemedi');
        } finally {
            setIsDeleting(false);
            setDeletingId(null);
        }
    };

    const handleToggleActive = async (faq: FAQ) => {
        setTogglingId(faq.id);
        try {
            await toggleFAQActive(faq.id, !faq.is_active);
            toast.success(faq.is_active ? 'Soru pasif yapıldı' : 'Soru aktif yapıldı');
            onRefresh();
        } catch (error: any) {
            toast.error(error.message || 'Durum güncellenemedi');
        } finally {
            setTogglingId(null);
        }
    };

    const handleToggleHomepage = async (faq: FAQ) => {
        setTogglingHomepageId(faq.id);
        try {
            await toggleHomepageFAQ(faq.id, !faq.show_on_homepage);
            toast.success(faq.show_on_homepage ? 'Anasayfadan kaldırıldı' : 'Anasayfaya eklendi');
            onRefresh();
        } catch (error: any) {
            toast.error(error.message || 'Durum güncellenemedi');
        } finally {
            setTogglingHomepageId(null);
        }
    };

    if (faqs.length === 0) {
        return (
            <div className="text-center py-12 bg-muted/50 rounded-lg">
                <p className="text-muted-foreground">Henüz soru eklenmemiş</p>
            </div>
        );
    }

    return (
        <>
            <div className="border rounded-lg">
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead className="w-12">Sıra</TableHead>
                            <TableHead>Soru</TableHead>
                            <TableHead className="w-24">Durum</TableHead>
                            <TableHead className="w-28">Anasayfa</TableHead>
                            <TableHead className="w-36 text-right">İşlemler</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {faqs.map((faq) => (
                            <TableRow key={faq.id}>
                                <TableCell className="font-medium">
                                    {faq.display_order}
                                </TableCell>
                                <TableCell>
                                    <div className="max-w-md">
                                        <p className="font-medium truncate">{faq.question}</p>
                                        <p className="text-sm text-muted-foreground truncate">
                                            {faq.answer.substring(0, 100)}...
                                        </p>
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={faq.is_active ? 'default' : 'secondary'}>
                                        {faq.is_active ? 'Aktif' : 'Pasif'}
                                    </Badge>
                                </TableCell>
                                <TableCell>
                                    <Badge variant={faq.show_on_homepage ? 'default' : 'outline'}>
                                        {faq.show_on_homepage ? 'Gösteriliyor' : 'Gizli'}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-right">
                                    <div className="flex items-center justify-end gap-1">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleToggleHomepage(faq)}
                                            disabled={togglingHomepageId === faq.id}
                                            title={faq.show_on_homepage ? 'Anasayfadan Kaldır' : 'Anasayfada Göster'}
                                            className={faq.show_on_homepage ? 'text-primary' : ''}
                                        >
                                            <Home className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => handleToggleActive(faq)}
                                            disabled={togglingId === faq.id}
                                            title={faq.is_active ? 'Pasif Yap' : 'Aktif Yap'}
                                        >
                                            {faq.is_active ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onEdit(faq)}
                                            title="Düzenle"
                                        >
                                            <Pencil className="h-4 w-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => setDeletingId(faq.id)}
                                            className="text-destructive hover:text-destructive"
                                            title="Sil"
                                        >
                                            <Trash2 className="h-4 w-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>

            <AlertDialog open={!!deletingId} onOpenChange={() => setDeletingId(null)}>
                <AlertDialogContent>
                    <AlertDialogHeader>
                        <AlertDialogTitle>Soruyu Sil</AlertDialogTitle>
                        <AlertDialogDescription>
                            Bu soruyu silmek istediğinizden emin misiniz? Bu işlem geri alınamaz.
                        </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                        <AlertDialogCancel disabled={isDeleting}>İptal</AlertDialogCancel>
                        <AlertDialogAction
                            onClick={handleDelete}
                            disabled={isDeleting}
                            className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                        >
                            {isDeleting ? 'Siliniyor...' : 'Sil'}
                        </AlertDialogAction>
                    </AlertDialogFooter>
                </AlertDialogContent>
            </AlertDialog>
        </>
    );
}
