'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog';
import { Question } from '@/types/questions';
import { deleteQuestion } from '@/actions/question-actions';
import QuestionAnswerDialog from '@/components/question-answer-dialog';
import { useRouter } from 'next/navigation';
import { toast } from 'sonner';
import { format } from 'date-fns';
import { tr } from 'date-fns/locale';
import { Eye, Globe, MessageCircleQuestion, PenLine, Trash2 } from 'lucide-react';

const statusConfig = {
  pending: { label: 'Bekliyor', variant: 'warning' as const },
  answered: { label: 'Cevaplandı', variant: 'success' as const },
  rejected: { label: 'Reddedildi', variant: 'destructive' as const },
};

function StatusBadge({ status, isPublic }: { status: Question['status']; isPublic: boolean }) {
  const config = statusConfig[status];

  const variantClasses = {
    warning: 'bg-yellow-100 text-yellow-800 border-yellow-200',
    success: 'bg-green-100 text-green-800 border-green-200',
    destructive: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <div className="flex items-center gap-1.5">
      <Badge variant="outline" className={variantClasses[config.variant]}>
        {config.label}
      </Badge>
      {isPublic && (
        <span title="Herkese açık" className="flex">
          <Globe className="h-3.5 w-3.5 text-blue-500" />
        </span>
      )}
    </div>
  );
}

export default function QuestionsList({ questions }: { questions: Question[] }) {
  const router = useRouter();
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const pendingCount = questions.filter((q) => q.status === 'pending').length;
  const answeredCount = questions.filter((q) => q.status === 'answered').length;
  const rejectedCount = questions.filter((q) => q.status === 'rejected').length;

  const handleDelete = async (id: string) => {
    setDeletingId(id);
    try {
      await deleteQuestion(id);
      toast.success('Soru başarıyla silindi');
      router.refresh();
    } catch (error) {
      console.error('Soru silinirken hata oluştu:', error);
      toast.error('Soru silinirken bir hata oluştu');
    } finally {
      setDeletingId(null);
    }
  };

  const openDialog = (question: Question) => {
    setSelectedQuestion(question);
    setDialogOpen(true);
  };

  const handleDialogSuccess = () => {
    router.refresh();
  };

  const filterQuestions = (status?: Question['status']) => {
    if (!status) return questions;
    return questions.filter((q) => q.status === status);
  };

  const renderList = (filteredQuestions: Question[]) => {
    if (filteredQuestions.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <MessageCircleQuestion className="h-12 w-12 mb-4 opacity-40" />
          <p className="text-lg font-medium">Henüz soru gelmemiş</p>
          <p className="text-sm">Bu sekmede gösterilecek soru yok.</p>
        </div>
      );
    }

    return (
      <div className="grid grid-cols-1 gap-3 p-4 lg:grid-cols-2">
        {filteredQuestions.map((question) => (
          <article key={question.id} className="flex flex-col gap-3 rounded-lg border bg-card p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="text-sm">
                <p className="font-medium">{question.name || 'Anonim'}</p>
                <p className="text-xs text-muted-foreground">
                  {format(new Date(question.created_at), 'd MMM yyyy HH:mm', { locale: tr })}
                </p>
              </div>
              <StatusBadge status={question.status} isPublic={question.is_public} />
            </div>

            <p className="line-clamp-4 whitespace-pre-line text-sm">{question.question_text}</p>

            <div className="mt-auto flex items-center justify-between gap-2">
              {question.status === 'pending' ? (
                <Button size="sm" onClick={() => openDialog(question)}>
                  <PenLine className="mr-1 h-4 w-4" />
                  Cevapla
                </Button>
              ) : (
                <Button size="sm" variant="outline" onClick={() => openDialog(question)}>
                  <Eye className="mr-1 h-4 w-4" />
                  Görüntüle
                </Button>
              )}
              <AlertDialog>
                <AlertDialogTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="text-destructive hover:text-destructive hover:bg-destructive/10"
                    disabled={deletingId === question.id}
                  >
                    <Trash2 className="mr-1 h-4 w-4" />
                    Sil
                  </Button>
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Soruyu Sil</AlertDialogTitle>
                    <AlertDialogDescription>
                      Bu soruyu silmek istediğinize emin misiniz? Bu işlem geri alınamaz.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>İptal</AlertDialogCancel>
                    <AlertDialogAction
                      onClick={() => handleDelete(question.id)}
                      className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                    >
                      Sil
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </div>
          </article>
        ))}
      </div>
    );
  };

  return (
    <>
      <Tabs defaultValue={pendingCount > 0 ? 'pending' : 'all'} className="w-full">
        <div className="overflow-x-auto px-4 pt-4">
          <TabsList>
            <TabsTrigger value="all" className="gap-2">
              Tümü
              <Badge variant="secondary" className="text-xs px-1.5 py-0">
                {questions.length}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="pending" className="gap-2">
              Bekleyen
              <Badge
                variant="secondary"
                className={`text-xs px-1.5 py-0 ${pendingCount > 0 ? 'bg-yellow-100 text-yellow-800' : ''}`}
              >
                {pendingCount}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="answered" className="gap-2">
              Cevaplanan
              <Badge variant="secondary" className="text-xs px-1.5 py-0">
                {answeredCount}
              </Badge>
            </TabsTrigger>
            <TabsTrigger value="rejected" className="gap-2">
              Reddedilen
              <Badge variant="secondary" className="text-xs px-1.5 py-0">
                {rejectedCount}
              </Badge>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all">{renderList(filterQuestions())}</TabsContent>
        <TabsContent value="pending">{renderList(filterQuestions('pending'))}</TabsContent>
        <TabsContent value="answered">{renderList(filterQuestions('answered'))}</TabsContent>
        <TabsContent value="rejected">{renderList(filterQuestions('rejected'))}</TabsContent>
      </Tabs>

      {selectedQuestion && (
        <QuestionAnswerDialog
          question={selectedQuestion}
          open={dialogOpen}
          onOpenChange={setDialogOpen}
          onSuccess={handleDialogSuccess}
        />
      )}
    </>
  );
}
