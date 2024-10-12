import { FC } from 'react'
import { Card, CardContent } from "@/components/ui/card"
import { Question } from '@/types/question.type'

type QuestionCardProps = {
  question: Question
}

export const QuestionCard: FC<QuestionCardProps> = ({ question }) => (
  <Card>
    <CardContent className='p-6'>
      <p className='text-md font-semibold'>{question.question}</p>
    </CardContent>
  </Card>
)