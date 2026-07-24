'use client';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { questionSchema, type QuestionFormData } from '@/types/questions';
import { submitQuestion } from '@/actions/question-actions';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { toast } from 'sonner';
import { CheckCircle2, ClipboardCopy, ArrowRight, RotateCcw, ChevronDown, ChevronUp } from 'lucide-react';
import Link from 'next/link';
import { Checkbox } from '@/components/ui/checkbox';

export function QuestionForm() {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isSubmitting },
    reset
  } = useForm<QuestionFormData>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      name: '',
      email: '',
      question_text: '',
      honeypot: '',
      allow_publish: false
    }
  });

  const [trackingCode, setTrackingCode] = useState<string | null>(null);
  const [submittedEmail, setSubmittedEmail] = useState<string | null>(null);
  const [showOptional, setShowOptional] = useState(false);

  const questionText = watch('question_text') || '';

  const onSubmit = async (data: QuestionFormData) => {
    try {
      const result = await submitQuestion(data);
      setTrackingCode(result.trackingCode);
      setSubmittedEmail(data.email || null);
    } catch (error) {
      toast.error('Soru gönderilirken bir hata oluştu. Lütfen tekrar deneyin.');
    }
  };

  const handleCopyCode = async () => {
    if (trackingCode) {
      try {
        await navigator.clipboard.writeText(trackingCode);
        toast.success('Takip kodu kopyalandı');
      } catch {
        toast.error('Kopyalama başarısız oldu');
      }
    }
  };

  const handleReset = () => {
    setTrackingCode(null);
    setSubmittedEmail(null);
    reset();
  };

  // Success State
  if (trackingCode) {
    return (
      <div className="max-w-lg mx-auto text-center space-y-6">
        <div className="flex justify-center">
          <div className="w-16 h-16 rounded-full bg-green-100 flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-green-600" />
          </div>
        </div>

        <div>
          <h3 className="text-2xl font-bold mb-2">Sorunuz Başarıyla Gönderildi!</h3>
          <p className="text-muted-foreground">
            Sorunuz en kısa sürede cevaplanacaktır.
          </p>
        </div>

        <div className="bg-background border-2 border-primary/20 rounded-2xl p-6 space-y-3">
          <p className="text-sm font-medium text-muted-foreground">Takip Kodunuz</p>
          <div className="flex items-center justify-center gap-3">
            <span className="text-2xl font-mono font-bold tracking-wider text-primary">
              {trackingCode}
            </span>
            <button
              onClick={handleCopyCode}
              className="p-2 rounded-lg hover:bg-muted transition-colors"
              aria-label="Takip kodunu kopyala"
            >
              <ClipboardCopy className="w-5 h-5 text-muted-foreground" />
            </button>
          </div>
        </div>

        <div className="bg-amber-50 border border-amber-200 rounded-xl p-4 text-sm text-amber-800">
          <strong>Bu kodu kaydedin!</strong> Cevabınızı kontrol etmek için bu koda ihtiyacınız olacak.
        </div>

        {submittedEmail && (
          <p className="text-sm text-muted-foreground">
            Sorunuz cevaplandığında <strong>{submittedEmail}</strong> adresine bildirim gönderilecektir.
          </p>
        )}

        <div className="flex flex-col sm:flex-row justify-center gap-3 pt-2">
          <Link
            href="/soru-sor/takip"
            className="inline-flex items-center justify-center gap-2 bg-primary text-primary-foreground px-6 py-3 rounded-xl font-semibold hover:bg-primary/90 transition-all shadow-lg shadow-primary/25"
          >
            Cevabımı Takip Et
            <ArrowRight className="w-4 h-4" />
          </Link>
          <button
            onClick={handleReset}
            className="inline-flex items-center justify-center gap-2 bg-background border-2 border-border px-6 py-3 rounded-xl font-semibold hover:border-primary/50 hover:bg-muted/50 transition-all"
          >
            <RotateCcw className="w-4 h-4" />
            Yeni Soru Sor
          </button>
        </div>
      </div>
    );
  }

  // Form State
  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 max-w-2xl mx-auto">
      <div className="border border-border/50 rounded-xl overflow-hidden bg-muted/10">
        <button
          type="button"
          onClick={() => setShowOptional(!showOptional)}
          className="w-full flex items-center justify-between p-4 bg-muted/20 hover:bg-muted/40 transition-colors"
        >
          <div className="flex flex-col text-left">
            <span className="font-medium text-sm">Kimlik ve İletişim Bilgileri</span>
            <span className="text-xs text-muted-foreground">İsteğe bağlıdır. Doldurmazsanız sorunuz anonim olur.</span>
          </div>
          {showOptional ? (
            <ChevronUp className="w-5 h-5 text-muted-foreground" />
          ) : (
            <ChevronDown className="w-5 h-5 text-muted-foreground" />
          )}
        </button>
        
        {showOptional && (
          <div className="p-4 space-y-4 border-t border-border/50">
            <div className="flex flex-col gap-2">
              <Label htmlFor="name">İsminiz (İsteğe Bağlı)</Label>
              <Input
                id="name"
                {...register('name')}
                placeholder="Adınız"
                autoComplete="name"
              />
              <p className="text-xs text-muted-foreground">
                Sorunuz yayınlandığında isminiz görünecektir. Boş bırakırsanız anonim olarak yayınlanır.
              </p>
              {errors.name && <p className="text-red-500 text-sm">{errors.name.message}</p>}
            </div>

            <div className="flex flex-col gap-2">
              <Label htmlFor="email">E-posta Adresiniz (İsteğe Bağlı)</Label>
              <Input
                id="email"
                type="email"
                {...register('email')}
                placeholder="ornek@email.com"
                autoComplete="email"
              />
              <p className="text-xs text-muted-foreground">
                Sorunuz cevaplandığında e-posta ile bilgilendirilirsiniz. E-posta adresiniz kimseyle paylaşılmaz.
              </p>
              {errors.email && <p className="text-red-500 text-sm">{errors.email.message}</p>}
            </div>
          </div>
        )}
      </div>

      <div className="flex flex-col gap-2">
        <Label htmlFor="question_text">Sorunuz</Label>
        <Textarea
          id="question_text"
          {...register('question_text')}
          placeholder="Merak ettiğiniz konuyu detaylı şekilde yazınız..."
          rows={5}
        />
        <div className="flex justify-between items-center">
          {errors.question_text ? (
            <p className="text-red-500 text-sm">{errors.question_text.message}</p>
          ) : (
            <span />
          )}
          <span className="text-xs text-muted-foreground">
            {questionText.length} / 1000
          </span>
        </div>
      </div>

      <div className="flex items-start space-x-3 bg-primary/5 p-4 rounded-xl border border-primary/10">
        <Controller
          control={control}
          name="allow_publish"
          render={({ field }) => (
            <Checkbox
              id="allow_publish"
              checked={field.value}
              onCheckedChange={field.onChange}
              className="mt-1"
            />
          )}
        />
        <div className="grid gap-1.5 leading-none">
          <Label 
            htmlFor="allow_publish" 
            className="cursor-pointer text-sm font-medium leading-relaxed peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            Sorumun ve cevabının, kimliğim gizli tutularak <Link href="/soru-cevap" className="text-primary hover:underline" target="_blank">Soru-Cevap</Link> sayfasında yayınlanmasına izin veriyorum.
          </Label>
          <p className="text-xs text-muted-foreground">
            Bunu işaretleseniz bile, yayınlanmadan önce tekrar onaydan geçecektir.
          </p>
        </div>
      </div>

      {/* Honeypot */}
      <div style={{ display: 'none' }} aria-hidden="true">
        <Input {...register('honeypot')} tabIndex={-1} autoComplete="off" />
      </div>

      <Button type="submit" disabled={isSubmitting} className="w-full py-6 text-base">
        {isSubmitting ? 'Gönderiliyor...' : 'Soruyu Gönder'}
      </Button>
    </form>
  );
}
