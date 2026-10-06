import Link from "next/link";

import { ArrowRight, BookOpen, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { teacherClasses, teachers } from "@/data/teachers";
import { getLevelLabel } from "@/data/types";

export function MyClassesCard() {
  const teacher = teachers[0]; // Fr. James Osei
  const myClasses = teacherClasses.filter((cls) => teacher.classIds.includes(cls.id));

  return (
    <Card className="col-span-12 lg:col-span-7">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="text-base font-semibold">My Classes</CardTitle>
          <CardDescription>Classes & subjects taught by Fr. James Osei</CardDescription>
        </div>
        <Button variant="ghost" size="sm" asChild className="text-xs gap-1">
          <Link href="/teacher/classes">
            View All <ArrowRight className="size-3.5" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="grid gap-3 sm:grid-cols-2">
          {myClasses.map((cls) => (
            <Link
              key={cls.id}
              href={`/teacher/classes/${cls.id}`}
              className="flex flex-col justify-between rounded-lg border p-4 bg-card hover:bg-accent/40 transition-colors"
            >
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-[10px]">
                    {getLevelLabel(cls.level)}
                  </Badge>
                  <span className="text-[11px] font-bold text-emerald-600 dark:text-emerald-400">
                    Avg: {cls.averageGrade}%
                  </span>
                </div>
                <h4 className="font-bold text-sm leading-snug">{cls.name}</h4>
                <p className="text-xs text-muted-foreground">{cls.subject}</p>
              </div>

              <div className="mt-4 pt-3 border-t flex items-center justify-between text-xs text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <Users className="size-3.5 text-primary" />
                  {cls.studentCount} Students
                </span>
                <span className="inline-flex items-center gap-1 text-[11px]">
                  <BookOpen className="size-3 text-primary" />
                  {cls.nextLesson || "Lesson 5"}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
