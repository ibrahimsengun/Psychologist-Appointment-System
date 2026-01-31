'use client';

import { useState } from 'react';
import { FAQ } from '@/types/faq';
import { getAllFAQs } from '@/actions/faq-actions';
import { FAQsTable } from '@/components/faqs-table';
import { FAQForm } from '@/components/forms/faq-form';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from '@/components/ui/dialog';

export function FAQsClient({ initialFAQs }: { initialFAQs: FAQ[] }) {
    const [faqs, setFAQs] = useState<FAQ[]>(initialFAQs);
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [editingFAQ, setEditingFAQ] = useState<FAQ | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    const refreshFAQs = async () => {
        setIsLoading(true);
        try {
            const data = await getAllFAQs();
            setFAQs(data);
        } catch (error) {
            console.error('FAQ\'lar yüklenemedi:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleEdit = (faq: FAQ) => {
        setEditingFAQ(faq);
        setIsDialogOpen(true);
    };

    const handleSuccess = () => {
        setIsDialogOpen(false);
        setEditingFAQ(null);
        refreshFAQs();
    };

    const handleCancel = () => {
        setIsDialogOpen(false);
        setEditingFAQ(null);
    };

    const handleOpenNew = () => {
        setEditingFAQ(null);
        setIsDialogOpen(true);
    };

    return (
        <div className="container my-8 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold">Sıkça Sorulan Sorular</h1>
                    <p className="text-muted-foreground mt-1">
                        Anasayfada görüntülenecek SSS bölümünü yönetin
                    </p>
                </div>
                <Button onClick={handleOpenNew}>
                    <Plus className="mr-2 h-4 w-4" />
                    Yeni Soru
                </Button>
            </div>

            <FAQsTable
                faqs={faqs}
                onEdit={handleEdit}
                onRefresh={refreshFAQs}
            />

            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle>
                            {editingFAQ ? 'Soruyu Düzenle' : 'Yeni Soru Ekle'}
                        </DialogTitle>
                        <DialogDescription>
                            {editingFAQ
                                ? 'Soru ve cevap bilgilerini güncelleyin'
                                : 'Anasayfada görüntülenecek yeni bir soru ekleyin'}
                        </DialogDescription>
                    </DialogHeader>
                    <FAQForm
                        faq={editingFAQ}
                        onSuccess={handleSuccess}
                        onCancel={handleCancel}
                    />
                </DialogContent>
            </Dialog>
        </div>
    );
}
