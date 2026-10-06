import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { teacherClasses, teachers } from "@/data/teachers";
import { getLevelLabel } from "@/data/types";

export default function TeacherClassesPage() {
  const teacher = teachers[0]; // Fr. James Osei
  const myClasses = teacherClasses.filter((cls) => teacher.classIds.includes(cls.id));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">My Classes & Catechism Tiers</h1>
        <p className="text-sm text-muted-foreground">
          Assigned education classes for Fr. James Osei at St. Mary&apos;s Community Church.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {myClasses.map((cls) => (
          <Card key={cls.id} className="flex flex-col justify-between hover:border-emerald-500/40 transition-colors">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between">
                <Badge
                  variant="outline"
                  className="text-xs bg-emerald-500/10 text-emerald-700 dark:text-emerald-300 border-emerald-300"
                >
                  {getLevelLabel(cls.level)}
                </Badge>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400">
                  Avg Score: {cls.averageGrade}%
                </span>
              </div>
              <CardTitle className="text-lg font-bold mt-2 leading-snug">{cls.name}</CardTitle>
              <CardDescription className="text-xs">{cls.subject}</CardDescription>
            </CardHeader>

            <CardContent className="pt-0 space-y-4">
              <div className="rounded-md border p-2.5 bg-accent/20 text-xs space-y-1.5">
                <div className="flex justify-between text-muted-foreground">
                  <span>Enrolled Students:</span>
                  <span className="font-bold text-foreground">{cls.studentCount}</span>
                </div>
                <div className="flex justify-between text-muted-foreground">
                  <span>Next Lesson:</span>
                  <span className="font-medium text-foreground">{cls.nextLesson || "Lesson 5"}</span>
                </div>
              </div>

              <Button size="sm" variant="outline" asChild className="w-full text-xs gap-1.5">
                <Link href={`/teacher/classes/${cls.id}`}>
                  View Class & Students <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
