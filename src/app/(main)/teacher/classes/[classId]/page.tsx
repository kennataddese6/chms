import Link from "next/link";
import { notFound } from "next/navigation";

import { ArrowLeft } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { students } from "@/data/students";
import { teacherClasses } from "@/data/teachers";
import { getLevelLabel } from "@/data/types";
import { getInitials } from "@/lib/utils";

interface ClassDetailPageProps {
  params: Promise<{ classId: string }>;
}

export default async function ClassDetailPage({ params }: ClassDetailPageProps) {
  const { classId } = await params;
  const cls = teacherClasses.find((c) => c.id === classId) || teacherClasses[0];

  if (!cls) {
    notFound();
  }

  // Filter students in this class level
  const classStudents = students.filter((s) => s.level === cls.level);

  return (
    <div className="space-y-6">
      <Button variant="ghost" size="sm" asChild className="gap-1.5 text-xs">
        <Link href="/teacher/classes">
          <ArrowLeft className="size-3.5" /> Back to My Classes
        </Link>
      </Button>

      {/* Class Header Banner */}
      <div className="flex flex-col gap-4 rounded-xl border bg-card p-6 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="space-y-1.5">
          <div className="flex items-center gap-2">
            <Badge variant="outline" className="bg-emerald-500/10 text-emerald-700 text-xs dark:text-emerald-300">
              {getLevelLabel(cls.level)}
            </Badge>
            <Badge variant="secondary" className="text-xs">
              {cls.subject}
            </Badge>
          </div>
          <h1 className="font-bold text-2xl tracking-tight">{cls.name}</h1>
          <p className="text-muted-foreground text-xs">Taught by Fr. James Osei</p>
        </div>

        <div className="flex items-center gap-6 border-t pt-4 sm:border-t-0 sm:pt-0">
          <div className="text-center">
            <div className="font-bold text-xl">{cls.studentCount}</div>
            <div className="text-[11px] text-muted-foreground">Students</div>
          </div>
          <div className="text-center">
            <div className="font-bold text-emerald-600 text-xl dark:text-emerald-400">{cls.averageGrade}%</div>
            <div className="text-[11px] text-muted-foreground">Class Average</div>
          </div>
        </div>
      </div>

      {/* Enrolled Students Table Card */}
      <Card>
        <CardHeader>
          <CardTitle className="font-semibold text-base">Enrolled Students ({classStudents.length})</CardTitle>
          <CardDescription>Student roster and performance standing for {cls.name}</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {classStudents.map((std) => (
              <div
                key={std.id}
                className="flex items-center justify-between rounded-lg border p-3 text-xs transition-colors hover:bg-accent/40"
              >
                <div className="flex items-center gap-3">
                  <Avatar className="size-8">
                    <AvatarImage src={std.avatarUrl} alt={std.name} />
                    <AvatarFallback>{getInitials(std.name)}</AvatarFallback>
                  </Avatar>
                  <div className="flex flex-col">
                    <span className="font-semibold">{std.name}</span>
                    <span className="text-[11px] text-muted-foreground">{std.email}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <div className="hidden w-32 flex-col gap-1 sm:flex">
                    <div className="flex justify-between text-[11px] text-muted-foreground">
                      <span>Progress</span>
                      <span>{std.progress}%</span>
                    </div>
                    <Progress value={std.progress} className="h-1.5" />
                  </div>
                  <div className="text-right">
                    <span className="font-bold text-emerald-600 dark:text-emerald-400">{std.averageGrade}%</span>
                    <div className="text-[10px] text-muted-foreground">Avg Score</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
