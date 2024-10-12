import { useState, useEffect } from "react";
import { Question } from "@/types/question.type";
import { fetchQuestions } from "@/services/question.service";
import { decodeHtmlEntities } from "@/utils/decodeHtml";

type Answers = {
  correct: number;
  incorrect: number;
  total: number;
};

type QuizProgress = {
  questions: Question[];
  currentQuestionIndex: number;
  isQuizStarted: boolean;
  isFinished: boolean;
  answers: Answers;
  timer: number;
};

const initialAnswers: Answers = {
  correct: 0,
  incorrect: 0,
  total: 0,
};

export const useQuiz = () => {
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [isQuizStarted, setIsQuizStarted] = useState<boolean>(false);
  const [isFinished, setIsFinished] = useState<boolean>(false);
  const [answers, setAnswers] = useState<Answers>(initialAnswers);
  const [timer, setTimer] = useState<number>(0);

  useEffect(() => {
    const cachedProgress = localStorage.getItem("quizProgress");
    if (cachedProgress) {
      const {
        questions,
        currentQuestionIndex,
        isQuizStarted,
        isFinished,
        answers,
        timer,
      }: QuizProgress = JSON.parse(cachedProgress);
      setQuestions(questions);
      setAnswers(answers);
      setCurrentQuestionIndex(currentQuestionIndex);
      setIsQuizStarted(isQuizStarted);
      setIsFinished(isFinished);
      setTimer(timer);
    } else {
      loadQuestions();
    }
  }, []);

  useEffect(() => {
    if (questions.length > 0 || isQuizStarted || isFinished) {
      const quizProgress: QuizProgress = {
        questions,
        currentQuestionIndex,
        isQuizStarted,
        isFinished,
        answers,
        timer,
      };
      localStorage.setItem("quizProgress", JSON.stringify(quizProgress));
    }
  }, [
    questions,
    currentQuestionIndex,
    isQuizStarted,
    isFinished,
    answers,
    timer,
  ]);

  const loadQuestions = async () => {
    try {
      const newQuestions = await fetchQuestions();
      newQuestions.map((question) => {
        question.question = decodeHtmlEntities(question.question);
        question.correct_answer = decodeHtmlEntities(question.correct_answer);
        question.incorrect_answers =
          question.incorrect_answers.map(decodeHtmlEntities);
      });
      setQuestions(newQuestions);
    } catch (error) {
      console.error(error);
    }
  };

  const handleQuizStart = () => {
    setIsQuizStarted(true);
    setIsFinished(false);
  };

  const handlePlayAgain = async () => {
    localStorage.removeItem("quizProgress");
    setQuestions([]);
    setAnswers(initialAnswers);
    setCurrentQuestionIndex(0);
    setIsQuizStarted(true);
    setIsFinished(false);
    await loadQuestions();
  };

  const handleFinished = () => {
    setIsQuizStarted(false);
    setIsFinished(true);
    localStorage.removeItem("quizProgress");
  };

  const handleAnswer = (answer: string) => {
    const currentQuestion = questions[currentQuestionIndex];
    const isCorrect = answer === currentQuestion.correct_answer;
    setAnswers((prev) => ({
      ...prev,
      correct: prev.correct + (isCorrect ? 1 : 0),
      incorrect: prev.incorrect + (isCorrect ? 0 : 1),
      total: prev.total + 1,
    }));
    if (currentQuestionIndex === questions.length - 1) {
      handleFinished();
    } else {
      setCurrentQuestionIndex((prevIndex: number) => prevIndex + 1);
    }
  };

  return {
    questions,
    currentQuestionIndex,
    handleAnswer,
    handleQuizStart,
    handlePlayAgain,
    answers,
    isQuizStarted,
    setIsQuizStarted,
    isFinished,
    setIsFinished,
    timer,
    handleFinished,
  };
};
