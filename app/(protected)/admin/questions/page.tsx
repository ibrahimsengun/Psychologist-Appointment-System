import { getQuestions } from '@/actions/question-actions';
import QuestionsTable from '@/components/questions-table';

export default async function QuestionsPage() {
  const questions = await getQuestions();
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl md:text-3xl font-bold">Sorular</h1>
      </div>
      <div className="bg-white shadow-md rounded-lg">
        <QuestionsTable questions={questions} />
      </div>
    </div>
  );
}
