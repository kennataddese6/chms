import Link from "next/link";

import { ArrowLeft, Clock, FileText, HelpCircle, Video } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { courses } from "@/data/courses";
import { lessons } from "@/data/lessons";
import { getLevelLabel } from "@/data/types";

interface CourseDetailPageProps {
  params: Promise<{ courseId: string }>;
}

export default async function CourseDetailPage({ params }: CourseDetailPageProps) {
  const { courseId } = await params;
  const course = courses.find((c) => c.id === courseId) || courses[0];

  const courseLessons = lessons.filter((l) => l.courseId === course.id);
  const displayLessons = courseLessons.length > 0 ? courseLessons : lessons;

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" asChild className="gap-1.5 text-xs">
        <Link href="/teacher/courses">
          <ArrowLeft className="size-3.5" /> Back to Courses
        </Link>
      </Button>

      {/* Course Header Banner */}
      <div className="flex flex-col gap-4 rounded-xl border bg-card p-6 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="text-xs">
              {getLevelLabel(course.level)}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {course.subject}
            </Badge>
          </div>
          <h1 className="font-bold text-2xl tracking-tight">{course.title}</h1>
          <p className="max-w-2xl text-muted-foreground text-xs">{course.description}</p>
        </div>

        <div className="flex items-center gap-6 border-t pt-4 sm:border-t-0 sm:pt-0">
          <div className="text-center">
            <div className="font-bold text-xl">{displayLessons.length}</div>
            <div className="text-[11px] text-muted-foreground">Lessons</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-xl">{course.enrolledStudents}</div>
            <div className="text-[11px] text-muted-foreground">Students</div>
          </div>
        </div>
      </div>

      {/* Lessons List Card */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle className="font-semibold text-base">Course Lessons ({displayLessons.length})</CardTitle>
            <CardDescription>Structured lessons and reading materials for students</CardDescription>
          </div>
          <Button size="sm" className="gap-1 text-xs">
            + Add Lesson
          </Button>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {displayLessons.map((les) => (
              <div
                key={les.id}
                className="flex flex-col justify-between gap-3 rounded-lg border p-4 transition-colors hover:bg-accent/40 sm:flex-row sm:items-center"
              >
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 flex size-9 items-center justify-center rounded-lg bg-primary/10 text-primary">
                    {les.contentType === "video" ? <Video className="size-4" /> : <FileText className="size-4" />}
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs">{les.title}</span>
                      {les.hasQuiz && (
                        <Badge variant="secondary" className="gap-1 text-[10px]">
                          <HelpCircle className="size-3 text-purple-600" /> Has Quiz
                        </Badge>
                      )}
                    </div>
                    <p className="line-clamp-1 text-muted-foreground text-xs">{les.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between gap-4 border-t pt-2 text-muted-foreground text-xs sm:justify-end sm:border-t-0 sm:pt-0">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3.5" />
                    {les.duration}
                  </span>
                  <Button variant="outline" size="sm" className="text-xs">
                    Edit Lesson
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
