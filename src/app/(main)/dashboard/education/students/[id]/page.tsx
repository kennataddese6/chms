import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft, Award, BookOpen, CheckCircle, GraduationCap } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { courses } from "@/data/courses";
import { students } from "@/data/students";
import { getLevelLabel } from "@/data/types";
import { getInitials } from "@/lib/utils";

interface StudentDetailPageProps {
  params: Promise<{ id: string }>;
}

export default async function StudentDetailPage({ params }: StudentDetailPageProps) {
  const { id } = await params;
  const student = students.find((s) => s.id === id);

  if (!student) {
    notFound();
  }

  const enrolledCourses = courses.filter((c) => student.enrolledCourseIds.includes(c.id));

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" asChild className="gap-1.5 text-xs">
        <Link href="/dashboard/education/students">
          <ArrowLeft className="size-3.5" /> Back to Students Directory
        </Link>
      </Button>

      {/* Header Profile Card */}
      <div className="flex flex-col gap-4 rounded-xl border bg-card p-6 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Avatar className="size-20 border-2 border-purple-500/20">
            <AvatarImage src={student.avatarUrl} alt={student.name} />
            <AvatarFallback className="text-xl font-bold">{getInitials(student.name)}</AvatarFallback>
          </Avatar>
          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="text-xl font-bold tracking-tight">{student.name}</h1>
              <Badge
                variant="outline"
                className="text-xs bg-purple-500/10 text-purple-700 dark:text-purple-300 border-purple-300"
              >
                <GraduationCap className="mr-1 size-3" />
                {getLevelLabel(student.level)}
              </Badge>
              <Badge variant={student.status === "active" ? "default" : "secondary"} className="text-xs capitalize">
                {student.status}
              </Badge>
            </div>
            <p className="text-xs text-muted-foreground">{student.email}</p>
          </div>
        </div>

        <div className="flex items-center gap-4 border-t pt-4 sm:border-t-0 sm:pt-0">
          <div className="text-right">
            <div className="text-2xl font-bold text-emerald-600 dark:text-emerald-400">{student.averageGrade}%</div>
            <div className="text-[11px] text-muted-foreground font-medium">Average Score</div>
          </div>
        </div>
      </div>

      {/* Grid Content */}
      <div className="grid gap-4 md:grid-cols-2">
        {/* Progress & Level Tiers */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Level Progress & Status</CardTitle>
            <CardDescription>Academic track completion and completed levels</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4 text-xs">
            <div className="space-y-2">
              <div className="flex justify-between font-semibold">
                <span>Current Level Completion</span>
                <span className="text-primary">{student.progress}%</span>
              </div>
              <Progress value={student.progress} className="h-2" />
            </div>

            <div className="space-y-2 pt-2 border-t">
              <span className="font-semibold text-muted-foreground">Completed Education Levels:</span>
              <div className="flex flex-wrap gap-1.5">
                {student.completedLevels.map((lvl) => (
                  <Badge key={lvl} variant="secondary" className="text-xs gap-1">
                    <CheckCircle className="size-3 text-emerald-600" />
                    {getLevelLabel(lvl)}
                  </Badge>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subjects & Grades */}
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Subject Grades</CardTitle>
            <CardDescription>Course performance breakdown by subject</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-xs">
            {student.subjects.map((sub) => (
              <div key={sub.subject} className="flex items-center justify-between border-b pb-2">
                <span className="font-medium">{sub.subject}</span>
                <div className="flex items-center gap-2">
                  <span className="text-muted-foreground font-semibold">{sub.grade}%</span>
                  <Badge variant="outline" className="text-[10px] bg-muted/30">
                    Grade {sub.letterGrade}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>

      {/* Enrolled Courses */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Enrolled Courses</CardTitle>
          <CardDescription>Courses actively attended by {student.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid gap-3 sm:grid-cols-2">
            {enrolledCourses.map((crs) => (
              <div key={crs.id} className="flex items-start gap-3 rounded-lg border p-3 bg-accent/20">
                <div className="flex size-8 items-center justify-center rounded-md bg-blue-500/10 text-blue-600 mt-0.5">
                  <BookOpen className="size-4" />
                </div>
                <div className="flex flex-col text-xs min-w-0 flex-1">
                  <span className="font-semibold">{crs.title}</span>
                  <span className="text-muted-foreground">
                    {crs.teacherName} — {crs.subject}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
