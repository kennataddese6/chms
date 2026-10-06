"use client";

import { useState } from "react";

import { quizzes as initialQuizzes } from "@/data/quizzes";
import type { Quiz } from "@/data/types";

import { CreateQuizDialog } from "./_components/create-quiz-dialog";
import { QuizCard } from "./_components/quiz-card";

export default function TeacherQuizzesPage() {
  const [quizList, setQuizList] = useState<Quiz[]>(initialQuizzes);

  const handleAddQuiz = (newQuiz: Quiz) => {
    setQuizList([newQuiz, ...quizList]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Quiz & Assessment Builder</h1>
          <p className="text-sm text-muted-foreground">
            St. Mary&apos;s Education — Create and manage multiple-choice quizzes for lessons.
          </p>
        </div>
        <CreateQuizDialog onAddQuiz={handleAddQuiz} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quizList.map((quiz) => (
          <QuizCard key={quiz.id} quiz={quiz} />
        ))}
      </div>
    </div>
  );
}
