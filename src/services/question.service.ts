import { Question } from "@/types/question.type";

export const fetchQuestions = async (): Promise<Question[]> => {
  try {
    const res: Response = await fetch(
      "https://opentdb.com/api.php?amount=10&category=18&type=multiple"
    );
    const { results } = await res.json();
    return results;
  } catch (error) {
    console.error("Failed to fetch questions", error);
    return [];
  }
};
