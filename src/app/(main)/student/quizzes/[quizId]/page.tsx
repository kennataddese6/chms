"use client";

import { use, useState } from "react";

import Link from "next/link";

import { ArrowLeft, Award, CheckCircle2, RotateCcw, XCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { quizzes } from "@/data/quizzes";
import { getLetterGrade } from "@/data/types";
import { useEducationStore } from "@/stores/education/education-store";

interface StudentQuizPageProps {
  params: Promise<{ quizId: string }>;
}

export default function StudentQuizPage({ params }: StudentQuizPageProps) {
  const { quizId } = use(params);
  const quiz = quizzes.find((q) => q.id === quizId) || quizzes[0];
  const { submitQuizAttempt, getQuizAttempt } = useEducationStore();

  const existingAttempt = getQuizAttempt(quiz.id);

  const [answers, setAnswers] = useState<Record<string, number>>(existingAttempt?.answers || {});
  const [submitted, setSubmitted] = useState<boolean>(!!existingAttempt);
  const [calculatedScore, setCalculatedScore] = useState<number>(existingAttempt?.score || 0);

  const handleSelectOption = (questionId: string, optionIndex: number) => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionId]: optionIndex }));
  };

  const handleSubmitQuiz = (e: React.FormEvent) => {
    e.preventDefault();
    const score = submitQuizAttempt(quiz.id, answers, quiz.questions);
    setCalculatedScore(score);
    setSubmitted(true);
  };

  const handleRetake = () => {
    setAnswers({});
    setSubmitted(false);
  };

  const letterGrade = getLetterGrade(calculatedScore);

  return (
    <div className="mx-auto max-w-3xl space-y-6">
      <Button variant="ghost" size="sm" asChild className="gap-1.5 text-xs">
        <Link href="/student/quizzes">
          <ArrowLeft className="size-3.5" /> Back to Quizzes
        </Link>
      </Button>

      {/* Header Banner */}
      <div className="flex flex-col gap-2 rounded-xl border bg-card p-6 shadow-xs">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="bg-purple-500/10 text-purple-700 text-xs dark:text-purple-300">
            {quiz.subject}
          </Badge>
          <Badge variant="secondary" className="text-xs">
            {quiz.questions.length} Questions
          </Badge>
        </div>
        <h1 className="font-bold text-2xl tracking-tight">{quiz.title}</h1>
        <p className="text-muted-foreground text-xs">
          Select your answers below and click submit to evaluate your score.
        </p>
      </div>

      {/* Score Results Card when Submitted */}
      {submitted && (
        <Card className="border-emerald-500/30 bg-gradient-to-br from-emerald-500/10 via-background to-background">
          <CardHeader className="pb-3">
            <CardTitle className="flex items-center gap-2 font-bold text-lg">
              <Award className="size-5 text-emerald-600" />
              Quiz Submission Results
            </CardTitle>
            <CardDescription>Your score has been saved to your student profile record.</CardDescription>
          </CardHeader>
          <CardContent className="flex flex-col justify-between gap-4 pt-0 sm:flex-row sm:items-center">
            <div className="flex items-center gap-6">
              <div>
                <div className="font-bold text-3xl text-emerald-600 dark:text-emerald-400">{calculatedScore}%</div>
                <div className="font-medium text-muted-foreground text-xs">Total Score</div>
              </div>
              <div className="border-l pl-6">
                <div className="font-bold text-3xl">{letterGrade}</div>
                <div className="font-medium text-muted-foreground text-xs">Letter Grade</div>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleRetake} className="gap-1.5 text-xs">
              <RotateCcw className="size-3.5" /> Retake Quiz
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Questions Form */}
      <form onSubmit={handleSubmitQuiz} className="space-y-4">
        {quiz.questions.map((q, qIndex) => {
          const selectedOption = answers[q.id];
          const isCorrect = selectedOption === q.correctAnswer;

          return (
            <Card
              key={q.id}
              className={
                submitted
                  ? isCorrect
                    ? "border-emerald-500/50 bg-emerald-500/5"
                    : "border-red-500/50 bg-red-500/5"
                  : ""
              }
            >
              <CardHeader className="pb-3">
                <div className="flex items-start justify-between gap-2">
                  <span className="font-bold text-sm leading-snug">
                    Question {qIndex + 1}: {q.question}
                  </span>
                  {submitted && (
                    <Badge variant={isCorrect ? "default" : "destructive"} className="shrink-0 gap-1 text-[10px]">
                      {isCorrect ? <CheckCircle2 className="size-3" /> : <XCircle className="size-3" />}
                      {isCorrect ? "Correct (+100%)" : "Incorrect"}
                    </Badge>
                  )}
                </div>
              </CardHeader>
              <CardContent>
                <RadioGroup
                  value={selectedOption !== undefined ? selectedOption.toString() : ""}
                  onValueChange={(val) => handleSelectOption(q.id, parseInt(val, 10))}
                  disabled={submitted}
                  className="space-y-2.5"
                >
                  {q.options.map((opt, optIdx) => {
                    const isSelected = selectedOption === optIdx;
                    const isAnswer = q.correctAnswer === optIdx;

                    let optStyle = "";
                    if (submitted) {
                      if (isAnswer) optStyle = "border-emerald-500 bg-emerald-500/10 font-bold";
                      else if (isSelected && !isCorrect) optStyle = "border-red-500 bg-red-500/10";
                    }

                    return (
                      <div
                        key={optIdx}
                        className={`flex cursor-pointer items-center space-x-3 rounded-lg border p-3 text-xs transition-colors ${optStyle}`}
                      >
                        <RadioGroupItem value={optIdx.toString()} id={`${q.id}-opt-${optIdx}`} />
                        <Label htmlFor={`${q.id}-opt-${optIdx}`} className="flex-1 cursor-pointer font-medium">
                          {opt}
                        </Label>
                      </div>
                    );
                  })}
                </RadioGroup>
              </CardContent>
            </Card>
          );
        })}

        {!submitted && (
          <div className="flex justify-end pt-2">
            <Button type="submit" className="bg-purple-600 font-semibold text-white hover:bg-purple-700">
              Submit Quiz for Evaluation
            </Button>
          </div>
        )}
      </form>
    </div>
  );
}
