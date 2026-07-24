'use client';

import { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Badge } from '@/components/ui/badge';
import { Question } from '@/types/questions';
import { answerQuestion, rejectQuestion, toggleQuestionPublic } from '@/actions/question-actions';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Loader2, User, Mail, Calendar, Hash } from 'lucide-react';

interface QuestionAnswerDialogProps {
  question: Question;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

export default function QuestionAnswerDialog({
  question,
  open,
  onOpenChange,
  onSuccess,
}: QuestionAnswerDialogProps) {
  const [answerText, setAnswerText] = useState(question.answer_text || '');
  const [isPublic, setIsPublic] = useState(question.is_public);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isRejecting, setIsRejecting] = useState(false);

  const handleAnswer = async () => {
    if (!answerText.trim()) {
      toast.error('Lütfen bir cevap yazın');
      return;
    }

    setIsSubmitting(true);
    try {
      await answerQuestion(question.id, answerText, isPublic);
      toast.success('Soru başarıyla cevaplandı');
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Cevaplama hatası:', error);
      toast.error('Cevap kaydedilirken bir hata oluştu');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    setIsRejecting(true);
    try {
      await rejectQuestion(question.id);
      toast.success('Soru reddedildi');
      onSuccess();
      onOpenChange(false);
    } catch (error) {
      console.error('Reddetme hatası:', error);
      toast.error('Soru reddedilirken bir hata oluştu');
    } finally {
      setIsRejecting(false);
    }
  };

  const handleTogglePublic = async () => {
    const newValue = !isPublic;
    setIsPublic(newValue);
    if (question.status === 'answered') {
      try {
        await toggleQuestionPublic(question.id, newValue);
        toast.success(newValue ? 'Soru herkese açık yapıldı' : 'Soru gizlendi');
      } catch (error) {
        console.error('Güncelleme hatası:', error);
        setIsPublic(!newValue);
        toast.error('Güncelleme sırasında bir hata oluştu');
      }
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Soru Detayı</DialogTitle>
          <DialogDescription>
            Soruyu inceleyin ve cevaplayın
          </DialogDescription>
        </DialogHeader>

        {/* Question info card */}
        <div className="grid grid-cols-2 gap-3 p-4 bg-muted/50 rounded-lg text-sm">
          <div className="flex items-center gap-2">
            <User className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Gönderen:</span>
            <span className="font-medium">{question.name || 'Anonim'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Mail className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">E-posta:</span>
            <span className="font-medium">{question.email || 'Belirtilmemiş'}</span>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Tarih:</span>
            <span className="font-medium">
              {format(new Date(question.created_at), 'd MMM yyyy HH:mm', { locale: tr })}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <Hash className="h-4 w-4 text-muted-foreground" />
            <span className="text-muted-foreground">Takip Kodu:</span>
            <span className="font-mono font-medium text-xs">{question.tracking_code}</span>
          </div>
        </div>

        {/* Question text */}
        <blockquote className="border-l-4 border-primary/30 pl-4 py-2 italic text-foreground/80 bg-primary/5 rounded-r-lg">
          {question.question_text}
        </blockquote>

        {/* Existing answer display */}
        {question.status === 'answered' && question.answer_text && (
          <div className="border-l-4 border-green-500 pl-4 py-3 bg-green-50 rounded-r-lg">
            <p className="text-sm font-medium text-green-800 mb-1">Mevcut Cevap:</p>
            <p className="text-sm text-green-700 whitespace-pre-wrap">{question.answer_text}</p>
          </div>
        )}

        {/* Answer textarea */}
        {question.status !== 'rejected' && (
          <>
            <div className="space-y-2">
              <Label htmlFor="answer">Cevabınız</Label>
              <Textarea
                id="answer"
                placeholder="Soruya cevabınızı yazın..."
                value={answerText}
                onChange={(e) => setAnswerText(e.target.value)}
                rows={5}
                className="resize-y"
              />
            </div>

            {/* Public checkbox */}
            <div className={`flex items-start space-x-3 p-3 rounded-lg border ${question.allow_publish ? 'border-primary/20 bg-primary/5' : 'border-red-200 bg-red-50/50 opacity-70'}`}>
              <Checkbox
                id="is-public"
                checked={isPublic}
                onCheckedChange={handleTogglePublic}
                disabled={!question.allow_publish}
              />
              <div className="grid gap-1 leading-none">
                <Label htmlFor="is-public" className={question.allow_publish ? 'cursor-pointer' : 'cursor-not-allowed text-red-700'}>
                  Bu soruyu ve cevabı herkese açık olarak yayınla
                </Label>
                <p className={`text-xs ${question.allow_publish ? 'text-muted-foreground' : 'text-red-600 font-medium'}`}>
                  {question.allow_publish 
                    ? 'İşaretlerseniz soru-cevap sayfasında görünecektir. Kullanıcı izin vermiş.' 
                    : 'Kullanıcı yayınlanmasına İZİN VERMEMİŞ. Yayınlayamazsınız.'}
                </p>
              </div>
            </div>
          </>
        )}

        {/* Rejected state */}
        {question.status === 'rejected' && (
          <div className="p-4 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-700 font-medium">Bu soru reddedilmiştir.</p>
          </div>
        )}

        <DialogFooter className="gap-2 sm:gap-0">
          {question.status === 'pending' && (
            <>
              <Button
                variant="destructive"
                onClick={handleReject}
                disabled={isRejecting || isSubmitting}
                className="mr-auto"
              >
                {isRejecting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Reddet
              </Button>
              <Button
                onClick={handleAnswer}
                disabled={isSubmitting || isRejecting}
              >
                {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                Cevapla
              </Button>
            </>
          )}
          {question.status === 'answered' && (
            <Button
              onClick={handleAnswer}
              disabled={isSubmitting}
            >
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Güncelle
            </Button>
          )}
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
