import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft, ArrowRight, BookOpen, Clock, FileText, HelpCircle } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { courses } from "@/data/courses";
import { lessons } from "@/data/lessons";
import { getLevelLabel } from "@/data/types";

interface StudentCoursePageProps {
  params: Promise<{ courseId: string }>;
}

export default async function StudentCoursePage({ params }: StudentCoursePageProps) {
  const { courseId } = await params;
  const course = courses.find((c) => c.id === courseId) || courses[0];

  const courseLessons = lessons.filter((l) => l.courseId === course.id);
  const displayLessons = courseLessons.length > 0 ? courseLessons : lessons;

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" asChild className="gap-1.5 text-xs">
        <Link href="/student/courses">
          <ArrowLeft className="size-3.5" /> Back to My Courses
        </Link>
      </Button>

      {/* Course Banner */}
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
          <h1 className="text-2xl font-bold tracking-tight">{course.title}</h1>
          <p className="text-xs text-muted-foreground max-w-2xl">{course.description}</p>
          <p className="text-xs font-semibold text-primary pt-1">Instructor: {course.teacherName}</p>
        </div>
      </div>

      {/* Course Lessons */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base font-semibold">Lessons Modules ({displayLessons.length})</CardTitle>
          <CardDescription>Click a lesson to start or continue reading</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {displayLessons.map((les) => (
              <Link
                key={les.id}
                href={`/student/courses/${course.id}/lessons/${les.id}`}
                className="flex flex-col sm:flex-row sm:items-center justify-between rounded-lg border p-4 hover:bg-accent/40 transition-colors gap-3 block"
              >
                <div className="flex items-start gap-3">
                  <div className="flex size-9 items-center justify-center rounded-lg bg-purple-500/10 text-purple-600 mt-0.5">
                    <FileText className="size-4" />
                  </div>
                  <div className="flex flex-col space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-bold text-xs">{les.title}</span>
                      {les.hasQuiz && (
                        <Badge variant="secondary" className="text-[10px] gap-1">
                          <HelpCircle className="size-3 text-purple-600" /> Quiz Included
                        </Badge>
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground line-clamp-1">{les.description}</p>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-4 text-xs text-muted-foreground">
                  <span className="inline-flex items-center gap-1">
                    <Clock className="size-3.5 text-primary" />
                    {les.duration}
                  </span>
                  <Button size="sm" variant="ghost" className="text-xs gap-1">
                    Start <ArrowRight className="size-3.5" />
                  </Button>
                </div>
              </Link>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
