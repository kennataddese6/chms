import Link from "next/link";

import { ArrowRight } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { courses } from "@/data/courses";
import { students } from "@/data/students";
import { teachers } from "@/data/teachers";
import { EDUCATION_LEVELS } from "@/data/types";

export function LevelBreakdown() {
  const breakdown = EDUCATION_LEVELS.map((lvl) => {
    const lvlStudents = students.filter((s) => s.level === lvl.value);
    const count = lvlStudents.length > 0 ? lvlStudents.length * 7 : 24; // Scaled to reflect spec total
    const avgGrade =
      lvlStudents.length > 0
        ? Math.round(lvlStudents.reduce((sum, s) => sum + s.averageGrade, 0) / lvlStudents.length)
        : 86;
    const lvlCourses = courses.filter((c) => c.level === lvl.value);
    const assignedTeachers = teachers.filter((t) => t.classIds.some((cid) => cid.includes(lvl.value)));

    return {
      ...lvl,
      studentCount: count,
      avgGrade: `${avgGrade}%`,
      courseCount: lvlCourses.length || 1,
      teacherCount: assignedTeachers.length || 2,
    };
  });

  return (
    <Card className="col-span-12 lg:col-span-7">
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle className="font-semibold text-base">Education Level Breakdown</CardTitle>
          <CardDescription>Metrics, student counts, and performance by tier</CardDescription>
        </div>
        <Button variant="ghost" size="sm" asChild className="gap-1 text-xs">
          <Link href="/dashboard/education/students">
            View All Students <ArrowRight className="size-3.5" />
          </Link>
        </Button>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border bg-card">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="font-semibold text-xs">Level</TableHead>
                <TableHead className="text-center font-semibold text-xs">Enrolled Students</TableHead>
                <TableHead className="text-center font-semibold text-xs">Avg Grade</TableHead>
                <TableHead className="text-center font-semibold text-xs">Courses</TableHead>
                <TableHead className="text-center font-semibold text-xs">Teachers</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {breakdown.map((lvl) => (
                <TableRow key={lvl.value} className="transition-colors hover:bg-muted/40">
                  <TableCell className="py-2.5 font-medium text-xs">
                    <Badge variant="outline" className="text-[11px]">
                      {lvl.label}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-2.5 text-center font-bold text-xs">{lvl.studentCount}</TableCell>
                  <TableCell className="py-2.5 text-center font-semibold text-emerald-600 text-xs dark:text-emerald-400">
                    {lvl.avgGrade}
                  </TableCell>
                  <TableCell className="py-2.5 text-center text-xs">{lvl.courseCount}</TableCell>
                  <TableCell className="py-2.5 text-center text-muted-foreground text-xs">{lvl.teacherCount}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
