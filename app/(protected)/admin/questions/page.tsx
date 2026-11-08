import { getQuestions } from '@/actions/question-actions';
import QuestionsList from '@/components/questions-list';

export default async function QuestionsPage() {
  const questions = await getQuestions();
  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-xl md:text-3xl font-bold">Sorular</h1>
      </div>
      <div className="bg-white shadow-md rounded-lg">
        <QuestionsList questions={questions} />
      </div>
    </div>
  );
}
