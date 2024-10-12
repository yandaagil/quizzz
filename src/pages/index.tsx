import { AnswerButtons } from '@/components/quiz/AnswerButtons';
import QuizLoading from '@/components/quiz/Loading';
import { QuestionCard } from '@/components/quiz/QuestionCard';
import QuizResults from '@/components/quiz/Result';
import Timer from '@/components/quiz/Timer';
import { Button } from '@/components/ui/button'
import { useQuiz } from '@/hooks/useQuiz';
import Layout from '@/layouts/layout';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const navigate = useNavigate();
  const {
    questions,
    currentQuestionIndex,
    handleAnswer,
    handleQuizStart,
    handlePlayAgain,
    isQuizStarted,
    isFinished,
    answers,
    handleFinished,
    timer
  } = useQuiz()

  useEffect(() => {
    const isLoggedIn = localStorage.getItem('loggedIn');
    if (!isLoggedIn) {
      navigate('/login')
    }
  }, []);

  if (questions.length === 0) return <QuizLoading />

  const currentQuestion = questions[currentQuestionIndex]

  return (
    <Layout title='Quizzz'>
      {isQuizStarted &&
        <div className='w-[700px] space-y-3'>
          <div className='flex justify-between'>
            <p className='font-semibold text-md'>{currentQuestionIndex + 1}/{questions.length}</p>
            <Timer time={timer || 300} onExpire={handleFinished} />
            <p className='font-semibold text-md'>{answers.total} answered</p>
          </div>
          <QuestionCard question={currentQuestion} />
          <AnswerButtons question={currentQuestion} onAnswer={handleAnswer} />
        </div>
      }
      {!isQuizStarted && isFinished && <QuizResults totalQuestions={questions.length} {...answers} />}
      {!isQuizStarted && !isFinished && <Button onClick={handleQuizStart}>
        Start Quiz
      </Button>}
      {!isQuizStarted && isFinished && <Button onClick={handlePlayAgain}>
        Play Again
      </Button>}
    </Layout>
  )
}

export default Home