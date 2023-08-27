import { create } from 'zustand';
import { type Question } from '../types';
import confetti from 'canvas-confetti';
import { persist } from 'zustand/middleware';

interface State {
  questions: Question[];
  currentQuestionIndex: number;
  fetchQuestions: (limit: number) => Promise<void>;
  selectAnswer: (questionId: number, answerIndex: number) => void;
  goNextQuestion: () => void;
  goPrevQuestion: () => void;
  reset: () => void;
}

export const useQuestionsStore = create<State>()(
  persist(
    (set, get) => {
      return {
        laoding: false,
        questions: [],
        currentQuestionIndex: 0,

        fetchQuestions: async (limit: number) => {
          const res = await fetch('http://localhost:5173/data.json');
          const data = await res.json();

          const questions = data
            .sort(() => Math.random() - 0.5)
            .slice(0, limit);
          set({ questions });
        },

        selectAnswer: (questionId: number, answerIndex: number) => {
          const { questions } = get();
          const newQuestions = structuredClone(questions);
          const questionIndex = newQuestions.findIndex(
            (q) => q.id === questionId
          );
          const questionInfo = newQuestions[questionIndex];
          const isCorrectUserAnswer =
            questionInfo.correctAnswer === answerIndex;
          if (isCorrectUserAnswer) confetti();

          newQuestions[questionIndex] = {
            ...questionInfo,
            isCorrectUserAnswer,
            userSelectedAnswer: answerIndex,
          };
          set({ questions: newQuestions });
        },

        goNextQuestion: () => {
          const { currentQuestionIndex, questions } = get();
          const newCurrentQuestionIndex = currentQuestionIndex + 1;
          if (newCurrentQuestionIndex >= questions.length) return;
          set({ currentQuestionIndex: newCurrentQuestionIndex });
        },

        goPrevQuestion: () => {
          const { currentQuestionIndex } = get();
          const newCurrentQuestionIndex = currentQuestionIndex - 1;
          if (newCurrentQuestionIndex < 0) return;
          set({ currentQuestionIndex: newCurrentQuestionIndex });
        },
        reset: () => {
          set({ questions: [], currentQuestionIndex: 0 });
        }
      };
    },
    {
      name: 'questions',
      getStorage: () => localStorage,
    }
  )
);
