import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft, ArrowRight, CheckCircle2, Download, FileText, HelpCircle, PlayCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { courses } from "@/data/courses";
import { lessons } from "@/data/lessons";

interface LessonViewerPageProps {
  params: Promise<{ courseId: string; lessonId: string }>;
}

export default async function LessonViewerPage({ params }: LessonViewerPageProps) {
  const { courseId, lessonId } = await params;
  const course = courses.find((c) => c.id === courseId) || courses[0];
  const lesson = lessons.find((l) => l.id === lessonId) || lessons[0];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      <Button variant="ghost" size="sm" asChild className="gap-1.5 text-xs">
        <Link href={`/student/courses/${course.id}`}>
          <ArrowLeft className="size-3.5" /> Back to {course.title}
        </Link>
      </Button>

      {/* Lesson Title & Badges */}
      <div className="space-y-2">
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-xs">
            Lesson {lesson.order} of {course.lessonCount}
          </Badge>
          <Badge variant="secondary" className="text-xs capitalize">
            {lesson.contentType} Content
          </Badge>
        </div>
        <h1 className="text-2xl font-bold tracking-tight">{lesson.title}</h1>
        <p className="text-xs text-muted-foreground">{lesson.description}</p>
      </div>

      {/* Media / Video Placeholder */}
      <div className="relative aspect-video w-full overflow-hidden rounded-xl border bg-black/90 flex flex-col items-center justify-center text-white p-6 shadow-md">
        <div className="flex size-16 items-center justify-center rounded-full bg-primary/90 text-primary-foreground shadow-lg hover:scale-105 transition-transform cursor-pointer">
          <PlayCircle className="size-10 ml-1" />
        </div>
        <span className="mt-3 text-sm font-semibold">Video Lecture — {lesson.duration}</span>
        <span className="text-xs text-zinc-400">Click to play lecture recording</span>
      </div>

      {/* Lesson Content Text */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Lecture Notes & Exposition</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4 text-xs leading-relaxed text-foreground/90 whitespace-pre-line">
          {lesson.content}
        </CardContent>
      </Card>

      {/* Lesson Resources */}
      {lesson.resources.length > 0 && (
        <Card>
          <CardHeader>
            <CardTitle className="text-base font-semibold">Study Resources</CardTitle>
            <CardDescription>Supplemental reading materials and PDF handouts</CardDescription>
          </CardHeader>
          <CardContent className="space-y-2">
            {lesson.resources.map((res) => (
              <div key={res.id} className="flex items-center justify-between rounded-lg border p-3 text-xs">
                <div className="flex items-center gap-2.5">
                  <FileText className="size-4 text-primary" />
                  <span className="font-semibold">{res.title}</span>
                </div>
                <Button variant="outline" size="sm" className="h-7 text-[11px] gap-1">
                  <Download className="size-3" /> Download
                </Button>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Actions & Next Step */}
      <div className="flex flex-wrap items-center justify-between gap-3 pt-2 border-t">
        <Button variant="outline" size="sm" className="text-xs gap-1.5">
          <CheckCircle2 className="size-4 text-emerald-600" />
          Mark Lesson as Completed
        </Button>

        {lesson.hasQuiz && lesson.quizId && (
          <Button size="sm" asChild className="text-xs gap-1.5 bg-purple-600 hover:bg-purple-700 text-white">
            <Link href={`/student/quizzes/${lesson.quizId}`}>
              <HelpCircle className="size-4" />
              Take Lesson Quiz <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        )}
      </div>
    </div>
  );
}
