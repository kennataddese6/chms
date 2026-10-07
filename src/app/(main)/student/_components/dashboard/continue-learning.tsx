import Link from "next/link";

import { ArrowRight, Clock, HelpCircle, PlayCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { lessons } from "@/data/lessons";

export function ContinueLearning() {
  const currentLesson = lessons[0]; // Lesson 1: What is Exegesis?

  return (
    <Card className="col-span-12 lg:col-span-7">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="font-semibold text-base">Continue Learning</CardTitle>
          <CardDescription>Pick up where you left off in your current course module</CardDescription>
        </div>
        <Badge variant="outline" className="bg-blue-500/10 text-blue-600 text-xs">
          In Progress
        </Badge>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex flex-col justify-between gap-3 rounded-xl border bg-card p-4 transition-colors hover:border-primary/40 sm:flex-row sm:items-center">
          <div className="flex items-start gap-3">
            <div className="mt-0.5 flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary">
              <PlayCircle className="size-6" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm">{currentLesson.title}</span>
                {currentLesson.hasQuiz && (
                  <Badge variant="secondary" className="gap-1 text-[10px]">
                    <HelpCircle className="size-3 text-purple-600" /> Quiz Included
                  </Badge>
                )}
              </div>
              <p className="line-clamp-2 text-muted-foreground text-xs">{currentLesson.description}</p>
              <div className="flex items-center gap-3 pt-1 text-[11px] text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Clock className="size-3 text-primary" />
                  {currentLesson.duration}
                </span>
                <span>•</span>
                <span>Course: Intro to Biblical Exegesis</span>
              </div>
            </div>
          </div>

          <Button size="sm" asChild className="shrink-0 gap-1.5 self-end text-xs sm:self-center">
            <Link href={`/student/courses/${currentLesson.courseId}/lessons/${currentLesson.id}`}>
              Resume Lesson <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
