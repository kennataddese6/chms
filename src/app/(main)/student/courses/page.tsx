import Link from "next/link";

import { ArrowRight, FileText, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { courses } from "@/data/courses";
import { getLevelLabel } from "@/data/types";

export default function StudentCoursesPage() {
  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-2xl tracking-tight">My Courses</h1>
        <p className="text-muted-foreground text-sm">
          Enrolled curriculum courses for Senior Level at St. Mary&apos;s Community Church.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courses.slice(0, 4).map((crs) => (
          <Card key={crs.id} className="flex flex-col justify-between transition-colors hover:border-purple-500/40">
            <CardHeader className="pb-3">
              <div className="flex items-center justify-between gap-2">
                <Badge variant="outline" className="text-[10px]">
                  {getLevelLabel(crs.level)}
                </Badge>
                <Badge variant="secondary" className="text-[10px]">
                  {crs.subject}
                </Badge>
              </div>
              <CardTitle className="mt-2 font-bold text-base leading-snug">{crs.title}</CardTitle>
              <CardDescription className="mt-1 line-clamp-2 text-xs">{crs.description}</CardDescription>
            </CardHeader>

            <CardContent className="space-y-3 pt-0 text-xs">
              <div className="flex items-center justify-between border-t pt-3 text-muted-foreground">
                <span className="inline-flex items-center gap-1">
                  <FileText className="size-3.5 text-primary" />
                  {crs.lessonCount} Lessons
                </span>
                <span className="inline-flex items-center gap-1">
                  <Users className="size-3.5 text-primary" />
                  {crs.teacherName}
                </span>
              </div>

              <Button size="sm" variant="outline" asChild className="w-full gap-1.5 text-xs">
                <Link href={`/student/courses/${crs.id}`}>
                  View Lessons <ArrowRight className="size-3.5" />
                </Link>
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
