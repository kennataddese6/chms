import { CheckCircle2, FileCheck, HelpCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Quiz } from "@/data/types";

interface QuizCardProps {
  quiz: Quiz;
}

export function QuizCard({ quiz }: QuizCardProps) {
  return (
    <Card className="flex flex-col justify-between hover:border-purple-500/40 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="outline" className="text-[10px] bg-purple-500/10 text-purple-700 dark:text-purple-300">
            {quiz.subject}
          </Badge>
          <Badge variant="secondary" className="text-[10px]">
            {quiz.questionCount} Questions
          </Badge>
        </div>
        <CardTitle className="text-base font-bold mt-2 leading-snug">{quiz.title}</CardTitle>
        <CardDescription className="text-xs">Assigned to lesson: {quiz.lessonId}</CardDescription>
      </CardHeader>

      <CardContent className="pt-0 space-y-3 text-xs">
        <div className="rounded-md border p-2.5 bg-accent/20 text-muted-foreground space-y-1">
          <div className="flex justify-between">
            <span>Question Format:</span>
            <span className="font-semibold text-foreground">Multiple Choice (4 options)</span>
          </div>
          <div className="flex justify-between">
            <span>Pass Threshold:</span>
            <span className="font-semibold text-emerald-600 dark:text-emerald-400">70%</span>
          </div>
        </div>

        <Button size="sm" variant="outline" className="w-full text-xs gap-1.5">
          <FileCheck className="size-3.5 text-purple-600" />
          Preview Quiz Questions
        </Button>
      </CardContent>
    </Card>
  );
}
