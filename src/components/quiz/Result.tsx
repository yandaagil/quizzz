import { Card, CardContent } from "@/components/ui/card"
import { FC } from "react"

type QuizResultsProps = {
  total: number
  correct: number
  incorrect: number
  totalQuestions: number
}

const QuizResults: FC<QuizResultsProps> = ({ total, correct, incorrect, totalQuestions }) => {
  return (
    <div className='w-[700px] grid grid-cols-3 gap-3'>
      <Card>
        <CardContent className='p-6 flex flex-col gap-3 items-center'>
          <h2 className='text-lg'>Total Answers</h2>
          <p className="text-2xl font-semibold">{total} / {totalQuestions}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className='p-6 flex flex-col gap-3 items-center'>
          <h2 className='text-lg'>Correct Answers</h2>
          <p className="text-2xl font-semibold">{correct}</p>
        </CardContent>
      </Card>
      <Card>
        <CardContent className='p-6 flex flex-col gap-3 items-center'>
          <h2 className='text-lg'>Incorrect Answers</h2>
          <p className="text-2xl font-semibold">{incorrect}</p>
        </CardContent>
      </Card>
    </div>
  )
}

export default QuizResults