// File to handle data fetching from the Open Trivia DB API
import { shuffleArray } from './utils';

export type Question = {
  category: string;
  correct_answer: string;
  difficulty: string;
  incorrect_answers: string[];
  question: string;
  type: string;
};

export enum Difficulty {
  EASY = "easy",
  MEDIUM = "medium",
  HARD = "hard",
}

// Enhanced type with shuffled answers
export type QuestionsState = Question & { answers: string[] };

// Fetch quiz questions from Open Trivia API
export const fetchQuizQuestions = async (
  amount: number,
  difficulty: Difficulty
): Promise<QuestionsState[]> => {
  const endpoint = `https://opentdb.com/api.php?amount=${amount}&difficulty=${difficulty}&type=multiple&category=23`;

  try {
    const response = await fetch(endpoint);

    // If response is not OK (e.g., 404, 500), throw an error
    if (!response.ok) {
      throw new Error(`Failed to fetch: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    // Check if API returned valid questions
    if (!data.results || data.results.length === 0) {
      throw new Error("No quiz questions returned from the API.");
    }

    // Map and return the enhanced question data with shuffled answers
    return data.results.map((question: Question) => ({
      ...question,
      answers: shuffleArray([
        ...question.incorrect_answers,
        question.correct_answer,
      ]),
    }));

  } catch (error) {
    // Log and rethrow the error so it can be handled by the caller (e.g. App.tsx)
    console.error("Error fetching quiz questions:", error);
    throw error;
  }
};
