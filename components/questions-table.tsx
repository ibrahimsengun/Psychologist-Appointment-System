'use client';

import { useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
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

export default function QuestionsTable({ questions }: { questions: Question[] }) {
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

  const renderTable = (filteredQuestions: Question[]) => {
    if (filteredQuestions.length === 0) {
      return (
        <div className="flex flex-col items-center justify-center py-16 text-muted-foreground">
          <MessageCircleQuestion className="h-12 w-12 mb-4 opacity-40" />
          <p className="text-lg font-medium">Henüz soru gelmemiş</p>
          <p className="text-sm">Bu kategoride henüz soru bulunmuyor</p>
        </div>
      );
    }

    return (
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Tarih</TableHead>
            <TableHead className="min-w-[300px]">Soru</TableHead>
            <TableHead>Gönderen</TableHead>
            <TableHead>Durum</TableHead>
            <TableHead className="w-[140px]">İşlemler</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {filteredQuestions.map((question) => (
            <TableRow key={question.id}>
              <TableCell className="whitespace-nowrap text-sm text-muted-foreground">
                {format(new Date(question.created_at), 'd MMM yyyy HH:mm', { locale: tr })}
              </TableCell>
              <TableCell className="text-sm">
                {question.question_text.length > 80
                  ? `${question.question_text.slice(0, 80)}...`
                  : question.question_text}
              </TableCell>
              <TableCell className="text-sm">
                {question.name || 'Anonim'}
              </TableCell>
              <TableCell>
                <StatusBadge status={question.status} isPublic={question.is_public} />
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  {question.status === 'pending' && (
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Cevapla"
                      onClick={() => openDialog(question)}
                      className="text-primary hover:text-primary hover:bg-primary/10"
                    >
                      <PenLine className="h-4 w-4" />
                    </Button>
                  )}
                  {(question.status === 'answered' || question.status === 'rejected') && (
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Görüntüle"
                      onClick={() => openDialog(question)}
                      className="text-muted-foreground hover:text-foreground"
                    >
                      <Eye className="h-4 w-4" />
                    </Button>
                  )}
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="icon"
                        className="text-destructive hover:text-destructive hover:bg-destructive/10"
                        disabled={deletingId === question.id}
                      >
                        <Trash2 className="h-4 w-4" />
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
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    );
  };

  return (
    <>
      <Tabs defaultValue="all" className="w-full">
        <div className="px-4 pt-4">
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

        <TabsContent value="all">{renderTable(filterQuestions())}</TabsContent>
        <TabsContent value="pending">{renderTable(filterQuestions('pending'))}</TabsContent>
        <TabsContent value="answered">{renderTable(filterQuestions('answered'))}</TabsContent>
        <TabsContent value="rejected">{renderTable(filterQuestions('rejected'))}</TabsContent>
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
