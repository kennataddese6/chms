"use client";

import type { ColumnDef } from "@tanstack/react-table";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import type { Student } from "@/data/types";
import { getLevelLabel } from "@/data/types";
import type { DataTableFeatures } from "@/lib/data-table-features";
import { getInitials } from "@/lib/utils";

export const studentColumns: ColumnDef<DataTableFeatures, Student>[] = [
  {
    accessorKey: "name",
    header: "Student Name",
    cell: ({ row }: { row: { original: Student } }) => {
      const student = row.original;
      return (
        <div className="flex items-center gap-3">
          <Avatar className="size-8">
            <AvatarImage src={student.avatarUrl} alt={student.name} />
            <AvatarFallback>{getInitials(student.name)}</AvatarFallback>
          </Avatar>
          <div className="flex flex-col">
            <span className="font-semibold text-xs leading-tight">{student.name}</span>
            <span className="text-[11px] text-muted-foreground">{student.email}</span>
          </div>
        </div>
      );
    },
  },
  {
    accessorKey: "level",
    header: "Level",
    cell: ({ row }: { row: { original: Student } }) => (
      <Badge variant="outline" className="text-[10px] capitalize">
        {getLevelLabel(row.original.level)}
      </Badge>
    ),
  },
  {
    accessorKey: "gradeCohort",
    header: "Class Cohort",
    cell: ({ row }: { row: { original: Student } }) => {
      const level = row.original.level;
      const gradeMap: Record<string, string> = {
        "grade-1": "Grade 1 Cohort",
        "grade-2": "Grade 2 Cohort",
        junior: "Grade 4 Cohort A",
        senior: "Grade 7 Cohort A",
        graduate: "Grade 10 Cohort A",
        candidate: "Graduation Class",
      };
      const label = gradeMap[level] || "Grade Cohort";
      return (
        <Badge variant="outline" className="bg-blue-500/10 font-medium text-[10px] text-blue-600 dark:text-blue-400">
          {label}
        </Badge>
      );
    },
  },
  {
    accessorKey: "progress",
    header: "Course Progress",
    cell: ({ row }: { row: { original: Student } }) => {
      const progress = row.original.progress;
      return (
        <div className="flex min-w-[120px] items-center gap-2">
          <Progress value={progress} className="h-1.5 flex-1" />
          <span className="font-semibold text-muted-foreground text-xs">{progress}%</span>
        </div>
      );
    },
  },
  {
    accessorKey: "averageGrade",
    header: "Average Grade",
    cell: ({ row }: { row: { original: Student } }) => {
      const score = row.original.averageGrade;
      const color =
        score >= 90 ? "text-emerald-600 dark:text-emerald-400" : score >= 80 ? "text-blue-600" : "text-amber-600";
      return <span className={`font-bold text-xs ${color}`}>{score}%</span>;
    },
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }: { row: { original: Student } }) => (
      <Badge variant={row.original.status === "active" ? "default" : "secondary"} className="text-[10px] capitalize">
        {row.original.status}
      </Badge>
    ),
  },
];
