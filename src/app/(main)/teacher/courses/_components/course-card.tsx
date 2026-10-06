import Link from "next/link";

import { ArrowRight, BookOpen, FileText, Users } from "lucide-react";

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
    <Card className="flex flex-col justify-between hover:border-primary/40 transition-colors">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between gap-2">
          <Badge variant="outline" className="text-[10px]">
            {getLevelLabel(course.level)}
          </Badge>
          <Badge variant="secondary" className="text-[10px]">
            {course.subject}
          </Badge>
        </div>
        <CardTitle className="text-base font-bold mt-2 leading-snug">{course.title}</CardTitle>
        <CardDescription className="text-xs line-clamp-2 mt-1">{course.description}</CardDescription>
      </CardHeader>

      <CardContent className="pt-0 space-y-3 text-xs">
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

        <Button size="sm" variant="outline" asChild className="w-full text-xs gap-1.5">
          <Link href={`/teacher/courses/${course.id}`}>
            Manage Lessons <ArrowRight className="size-3.5" />
          </Link>
        </Button>
      </CardContent>
    </Card>
  );
}
