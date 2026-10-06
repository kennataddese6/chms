import { create } from "zustand";

import type { QuizQuestion } from "@/data/types";

interface QuizAttempt {
  quizId: string;
  answers: Record<string, number>; // questionId -> selectedOptionIndex
  score: number;
  completedAt: string;
}

interface EducationState {
  completedLessonIds: string[];
  quizAttempts: Record<string, QuizAttempt>; // quizId -> attempt
  markLessonCompleted: (lessonId: string) => void;
  submitQuizAttempt: (quizId: string, answers: Record<string, number>, questions: QuizQuestion[]) => number;
  isLessonCompleted: (lessonId: string) => boolean;
  getQuizAttempt: (quizId: string) => QuizAttempt | undefined;
}

export const useEducationStore = create<EducationState>((set, get) => ({
  completedLessonIds: ["les-001"],
  quizAttempts: {
    "quiz-001": {
      quizId: "quiz-001",
      answers: { "q-001": 1, "q-002": 1, "q-003": 0, "q-004": 1 },
      score: 100,
      completedAt: new Date().toISOString(),
    },
  },

  markLessonCompleted: (lessonId) =>
    set((state) => ({
      completedLessonIds: state.completedLessonIds.includes(lessonId)
        ? state.completedLessonIds
        : [...state.completedLessonIds, lessonId],
    })),

  submitQuizAttempt: (quizId, answers, questions) => {
    let correct = 0;
    questions.forEach((q) => {
      if (answers[q.id] === q.correctAnswer) {
        correct++;
      }
    });
    const score = Math.round((correct / questions.length) * 100);
    const attempt: QuizAttempt = {
      quizId,
      answers,
      score,
      completedAt: new Date().toISOString(),
    };

    set((state) => ({
      quizAttempts: {
        ...state.quizAttempts,
        [quizId]: attempt,
      },
    }));

    return score;
  },

  isLessonCompleted: (lessonId) => get().completedLessonIds.includes(lessonId),
  getQuizAttempt: (quizId) => get().quizAttempts[quizId],
}));
