import Link from "next/link";

import { ArrowRight, FileText, Users } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import type { Course } from "@/data/types";
import { getLevelLabel } from "@/data/types";

interface CourseCardProps {
  course: Course;
}

export function CourseCard({ course }: CourseCardProps) {
  return (
    <Card className="flex flex-col justify-between transition-colors hover:border-primary/40">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="outline" className="text-[10px]">
            {getLevelLabel(course.level)}
          </Badge>
          <Badge variant="secondary" className="text-[10px]">
            {course.subject}
          </Badge>
        </div>
        <CardTitle className="mt-2 font-bold text-base leading-snug">{course.title}</CardTitle>
        <CardDescription className="mt-1 line-clamp-2 text-xs">{course.description}</CardDescription>
      </CardHeader>

      <CardContent className="space-y-3 pt-0 text-xs">
        <div className="flex items-center justify-between border-t pt-3 text-muted-foreground">
          <span className="inline-flex items-center gap-1">
            <FileText className="size-3.5 text-primary" />
            {course.lessonCount} Lessons
          </span>
          <span className="inline-flex items-center gap-1">
            <Users className="size-3.5 text-primary" />
            {course.enrolledStudents} Enrolled
          </span>
        </div>

        <Button size="sm" variant="outline" asChild className="w-full gap-1.5 text-xs">
          <Link href={`/teacher/courses/${course.id}`}>
            Manage Lessons <ArrowRight className="size-3.5" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
