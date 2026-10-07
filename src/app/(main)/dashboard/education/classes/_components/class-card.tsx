"use client";

import { useState } from "react";

import Link from "next/link";

import { ArrowRight, Calendar, Edit, MapPin, MoreHorizontal, Trash2, Users } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import type { EducationClass } from "@/data/types";
import { getInitials } from "@/lib/utils";
import { useClassesStore } from "@/stores/classes/classes-store";

import { CreateClassDialog } from "./create-class-dialog";

interface ClassCardProps {
  cls: EducationClass;
}

function getGradeTheme(gradeLevel: string) {
  if (gradeLevel.includes("Grade 1") || gradeLevel.includes("Grade 2")) {
    return {
      badge: "border-sky-500/30 bg-sky-500/10 text-sky-700 dark:text-sky-300",
      accentBg: "bg-sky-500",
      borderHover: "hover:border-sky-500/40",
      label: "Primary Cohort",
    };
  }
  if (gradeLevel.includes("Grade 3") || gradeLevel.includes("Grade 4") || gradeLevel.includes("Grade 5")) {
    return {
      badge: "border-emerald-500/30 bg-emerald-500/10 text-emerald-700 dark:text-emerald-300",
      accentBg: "bg-emerald-500",
      borderHover: "hover:border-emerald-500/40",
      label: "Junior Cohort",
    };
  }
  if (gradeLevel.includes("Grade 6") || gradeLevel.includes("Grade 7") || gradeLevel.includes("Grade 8")) {
    return {
      badge: "border-amber-500/30 bg-amber-500/10 text-amber-700 dark:text-amber-300",
      accentBg: "bg-amber-500",
      borderHover: "hover:border-amber-500/40",
      label: "Senior Cohort",
    };
  }
  if (gradeLevel.includes("Grade 9") || gradeLevel.includes("Grade 10")) {
    return {
      badge: "border-indigo-500/30 bg-indigo-500/10 text-indigo-700 dark:text-indigo-300",
      accentBg: "bg-indigo-500",
      borderHover: "hover:border-indigo-500/40",
      label: "Graduate Cohort",
    };
  }
  return {
    badge: "border-purple-500/30 bg-purple-500/10 text-purple-700 dark:text-purple-300",
    accentBg: "bg-purple-500",
    borderHover: "hover:border-purple-500/40",
    label: "Graduation Candidate",
  };
}

export function ClassCard({ cls }: ClassCardProps) {
  const { deleteClass } = useClassesStore();
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const theme = getGradeTheme(cls.gradeLevel);

  return (
    <>
      <Card
        className={`group relative flex flex-col justify-between overflow-hidden border shadow-xs transition-all duration-200 hover:shadow-md ${theme.borderHover}`}
      >
        {/* Top Visual Accent Line */}
        <div className={`h-1 w-full ${theme.accentBg}`} />

        <CardHeader className="p-4 pb-2.5">
          <div className="flex items-start justify-between gap-2">
            <div className="space-y-1">
              <div className="flex flex-wrap items-center gap-1.5">
                <Badge variant="outline" className={`font-bold text-[11px] ${theme.badge}`}>
                  {cls.gradeLevel}
                </Badge>
                <span className="text-[10px] text-muted-foreground">• {theme.label}</span>
              </div>
              <h3 className="font-bold text-base text-foreground leading-snug transition-colors group-hover:text-primary">
                {cls.name}
              </h3>
            </div>

            <div className="flex items-center gap-1">
              <span
                className="flex size-2 rounded-full bg-emerald-500 ring-2 ring-emerald-500/20"
                title="Active Cohort"
              />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="size-7 text-muted-foreground hover:text-foreground">
                    <MoreHorizontal className="size-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-40 text-xs">
                  <DropdownMenuItem onClick={() => setIsEditDialogOpen(true)}>
                    <Edit className="mr-2 size-3.5" /> Edit Class
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-destructive" onClick={() => deleteClass(cls.id)}>
                    <Trash2 className="mr-2 size-3.5" /> Delete Class
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </CardHeader>

        <CardContent className="space-y-3 p-4 pt-0 text-xs">
          {/* Teacher Row */}
          <div className="flex items-center gap-2.5 rounded-lg border bg-muted/30 p-2">
            <Avatar className="size-7 border bg-background">
              <AvatarFallback className="bg-primary/10 font-bold text-[10px] text-primary">
                {getInitials(cls.teacherName)}
              </AvatarFallback>
            </Avatar>
            <div className="flex min-w-0 flex-col">
              <span className="font-medium text-[9px] text-muted-foreground uppercase tracking-wider">Instructor</span>
              <span className="truncate font-semibold text-foreground text-xs">{cls.teacherName}</span>
            </div>
          </div>

          {/* Core Metrics Grid */}
          <div className="grid grid-cols-3 gap-2 rounded-lg border bg-card p-2.5 text-center">
            <div className="space-y-0.5">
              <div className="flex items-center justify-center gap-1 font-bold text-foreground text-sm">
                <Users className="size-3.5 text-muted-foreground" />
                {cls.studentCount}
              </div>
              <div className="text-[10px] text-muted-foreground">Students</div>
            </div>

            <div className="space-y-0.5 border-x px-1">
              <div className="font-bold text-emerald-600 text-sm dark:text-emerald-400">{cls.attendanceRate}%</div>
              <div className="text-[10px] text-muted-foreground">Attendance</div>
            </div>

            <div className="space-y-0.5">
              <div className="font-bold text-blue-600 text-sm dark:text-blue-400">{cls.averageGrade}%</div>
              <div className="text-[10px] text-muted-foreground">Avg Grade</div>
            </div>
          </div>

          {/* Attendance Progress Meter */}
          <div className="space-y-1">
            <div className="flex items-center justify-between text-[10px] text-muted-foreground">
              <span>Attendance Metric</span>
              <span className="font-semibold text-emerald-600 dark:text-emerald-400">{cls.attendanceRate}%</span>
            </div>
            <Progress value={cls.attendanceRate} className="h-1.5" />
          </div>

          {/* Schedule & Location Pills */}
          <div className="space-y-1 text-[11px] text-muted-foreground">
            {cls.schedule && (
              <div className="flex items-center gap-1.5 truncate">
                <Calendar className="size-3.5 shrink-0 text-primary/70" />
                <span className="truncate">{cls.schedule}</span>
              </div>
            )}
            {cls.room && (
              <div className="flex items-center gap-1.5 truncate">
                <MapPin className="size-3.5 shrink-0 text-primary/70" />
                <span className="truncate">{cls.room}</span>
              </div>
            )}
          </div>
        </CardContent>

        <CardFooter className="p-4 pt-0">
          <Button
            variant="outline"
            size="sm"
            asChild
            className="w-full justify-between font-medium text-xs shadow-2xs transition-all hover:bg-primary hover:text-primary-foreground"
          >
            <Link href={`/dashboard/education/classes/${cls.id}`}>
              <span>Manage Class Roster</span>
              <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </CardFooter>
      </Card>

      <CreateClassDialog editingClass={cls} open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen} />
    </>
  );
}
