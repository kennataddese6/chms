import Link from "next/link";

import { ArrowRight, CheckCircle2, HelpCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { quizzes } from "@/data/quizzes";

export default function StudentQuizzesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Available Quizzes & Self-Assessments</h1>
        <p className="text-sm text-muted-foreground">
          St. Mary&apos;s Education — Test your biblical knowledge and earn lesson completions.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {quizzes.map((q) => (
          <Card key={q.id} className="flex flex-col justify-between hover:border-purple-500/40 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2">
                <Badge variant="outline" className="text-[10px] bg-purple-500/10 text-purple-700 dark:text-purple-300">
                  {q.subject}
                </Badge>
                <Badge variant="secondary" className="text-[10px]">
                  {q.questionCount} Questions
                </Badge>
              </div>
              <CardTitle className="text-base font-bold mt-2 leading-snug">{q.title}</CardTitle>
              <CardDescription className="text-xs">Multiple choice assessment</CardDescription>
            </CardHeader>

            <CardContent className="pt-0 space-y-3 text-xs">
              <Button size="sm" asChild className="w-full text-xs gap-1.5 bg-purple-600 hover:bg-purple-700 text-white">
                <Link href={`/student/quizzes/${q.id}`}>
                  Start Quiz <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
