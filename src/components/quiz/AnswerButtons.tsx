import { FC } from 'react'
import { Button } from '@/components/ui/button'
import { Question } from '@/types/question.type'

type AnswerButtonsProps = {
  question: Question
  onAnswer: (answer: string) => void
}

export const AnswerButtons: FC<AnswerButtonsProps> = ({ question, onAnswer }) => (
  <div className='grid grid-cols-2 grid-rows-2 gap-3'>
    {question.incorrect_answers.concat(question.correct_answer)
      .sort(() => Math.random() - 0.5)
      .map((answer) => (
        <Button key={answer} variant='outline' size="lg" className='text-wrap h-20 text-md' onClick={() => onAnswer(answer)}>
          {answer}
        </Button>
      ))}
  </div>
)