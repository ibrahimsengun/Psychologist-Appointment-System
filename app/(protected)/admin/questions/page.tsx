import { getQuestions } from '@/actions/question-actions';
import { AdminPageHeader } from '@/components/admin/page-header';
import QuestionsList from '@/components/questions-list';

export default async function QuestionsPage() {
  const questions = await getQuestions();
  return (
    <div className="container mx-auto py-8">
      <AdminPageHeader
        title="Sorular"
        description="Sitedeki soru formundan gelen sorular. Cevabınız e-posta bırakan kişiye iletilir; isterseniz Soru-Cevap sayfasında da yayınlanır."
      />
      <div className="rounded-lg border bg-card">
        <QuestionsList questions={questions} />
      </div>
    </div>
  );
}
