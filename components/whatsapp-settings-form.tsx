'use client';

import { useState } from 'react';
import { updateWhatsAppSettings, WhatsAppSettings } from '@/actions/settings-actions';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Button } from '@/components/ui/button';
import { Loader2, Save, MessageCircle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface WhatsAppSettingsFormProps {
    initialSettings: WhatsAppSettings;
}

export function WhatsAppSettingsForm({ initialSettings }: WhatsAppSettingsFormProps) {
    const [number, setNumber] = useState(initialSettings.number);
    const [message, setMessage] = useState(initialSettings.message);
    const [isSaving, setIsSaving] = useState(false);
    const { toast } = useToast();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSaving(true);

        try {
            await updateWhatsAppSettings(number, message);
            toast({
                title: 'Başarılı',
                description: 'WhatsApp ayarları güncellendi.',
            });
        } catch {
            toast({
                title: 'Hata',
                description: 'Ayarlar güncellenirken bir hata oluştu.',
                variant: 'destructive',
            });
        } finally {
            setIsSaving(false);
        }
    };

    return (
        <Card className="max-w-2xl">
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <MessageCircle className="h-5 w-5 text-green-500" />
                    WhatsApp Ayarları
                </CardTitle>
                <CardDescription>
                    Sitedeki WhatsApp butonunun numarasını ve varsayılan mesajını düzenleyin.
                </CardDescription>
            </CardHeader>
            <CardContent>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                        <Label htmlFor="whatsapp-number">Telefon Numarası</Label>
                        <Input
                            id="whatsapp-number"
                            type="text"
                            value={number}
                            onChange={(e) => setNumber(e.target.value)}
                            placeholder="905448322091"
                        />
                        <p className="text-xs text-muted-foreground">
                            Ülke kodu ile birlikte, başında + olmadan yazın. Örn: 905448322091
                        </p>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="whatsapp-message">Varsayılan Mesaj</Label>
                        <Input
                            id="whatsapp-message"
                            type="text"
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            placeholder="Merhaba, randevu almak istiyorum."
                        />
                        <p className="text-xs text-muted-foreground">
                            Kullanıcı WhatsApp butonuna tıkladığında otomatik yazılacak mesaj.
                        </p>
                    </div>

                    <Button type="submit" disabled={isSaving}>
                        {isSaving ? (
                            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                        ) : (
                            <Save className="mr-2 h-4 w-4" />
                        )}
                        Kaydet
                    </Button>
                </form>
            </CardContent>
        </Card>
    );
}
