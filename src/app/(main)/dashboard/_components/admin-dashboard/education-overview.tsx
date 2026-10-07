import Link from "next/link";

import { ArrowRight, Award, BookOpen, Users } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { courses } from "@/data/courses";
import { students } from "@/data/students";
import { teachers } from "@/data/teachers";
import { EDUCATION_LEVELS } from "@/data/types";

export function AdminEducationOverview() {
  const levelCounts = EDUCATION_LEVELS.map((lvl) => {
    const count = students.filter((s) => s.level === lvl.value).length;
    return { ...lvl, count };
  });

  return (
    <Card className="col-span-12 lg:col-span-7">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="font-semibold text-base">Education Platform Overview</CardTitle>
          <CardDescription>Student distribution across 6 education levels</CardDescription>
        </div>
        <Button variant="ghost" size="sm" asChild className="gap-1 text-xs">
          <Link href="/dashboard/education">
            Manage Education <ArrowRight className="size-3.5" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent className="space-y-5">
        {/* Quick summary stats */}
        <div className="grid grid-cols-3 gap-3 rounded-lg border bg-accent/20 p-3">
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-md bg-purple-500/15 text-purple-600">
              <Users className="size-4" />
            </div>
            <div>
              <div className="font-bold text-sm">186</div>
              <div className="text-[10px] text-muted-foreground">Total Students</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-md bg-blue-500/15 text-blue-600">
              <BookOpen className="size-4" />
            </div>
            <div>
              <div className="font-bold text-sm">{courses.length}</div>
              <div className="text-[10px] text-muted-foreground">Active Courses</div>
            </div>
          </div>
          <div className="flex items-center gap-2.5">
            <div className="flex size-8 items-center justify-center rounded-md bg-emerald-500/15 text-emerald-600">
              <Award className="size-4" />
            </div>
            <div>
              <div className="font-bold text-sm">{teachers.length}</div>
              <div className="text-[10px] text-muted-foreground">Catechists & Teachers</div>
            </div>
          </div>
        </div>

        {/* Level breakdown */}
        <div className="space-y-3">
          <span className="font-semibold text-muted-foreground text-xs">Student Distribution by Level</span>
          <div className="grid gap-2.5 sm:grid-cols-2">
            {levelCounts.map((lvl) => {
              const percentage = Math.round((lvl.count / 25) * 100);
              return (
                <div key={lvl.value} className="space-y-1 rounded-md border p-2.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-medium">{lvl.label}</span>
                    <span className="font-semibold text-muted-foreground">{lvl.count} students</span>
                  </div>
                  <Progress value={percentage} className="h-1.5" />
                </div>
              );
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
