"use client";

import { useState } from "react";

import Link from "next/link";

import { ArrowRight, Edit, MoreHorizontal, Trash2 } from "lucide-react";

import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Progress } from "@/components/ui/progress";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { EducationClass } from "@/data/types";
import { getInitials } from "@/lib/utils";
import { useClassesStore } from "@/stores/classes/classes-store";

import { CreateClassDialog } from "./create-class-dialog";

interface ClassTableProps {
  classes: EducationClass[];
}

export function ClassTable({ classes }: ClassTableProps) {
  const { deleteClass } = useClassesStore();
  const [editingClass, setEditingClass] = useState<EducationClass | null>(null);

  return (
    <div className="overflow-x-auto rounded-md border bg-card shadow-xs">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Class Name</TableHead>
            <TableHead>Grade / Level</TableHead>
            <TableHead>Assigned Teacher</TableHead>
            <TableHead className="text-center">Students</TableHead>
            <TableHead className="w-44">Attendance Summary</TableHead>
            <TableHead className="text-center">Avg Grade</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {classes.length === 0 ? (
            <TableRow>
              <TableCell colSpan={8} className="py-8 text-center text-muted-foreground text-sm">
                No education classes found. Click &quot;Create Class&quot; to add one.
              </TableCell>
            </TableRow>
          ) : (
            classes.map((cls) => (
              <TableRow key={cls.id} className="text-xs">
                <TableCell className="font-semibold text-foreground">
                  <Link
                    href={`/dashboard/education/classes/${cls.id}`}
                    className="flex items-center gap-1.5 hover:underline"
                  >
                    {cls.name}
                  </Link>
                </TableCell>
                <TableCell>
                  <Badge
                    variant="outline"
                    className="bg-blue-500/10 font-medium text-blue-600 text-xs dark:text-blue-400"
                  >
                    {cls.gradeLevel}
                  </Badge>
                </TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Avatar className="size-6">
                      <AvatarFallback className="bg-primary/10 text-[10px] text-primary">
                        {getInitials(cls.teacherName)}
                      </AvatarFallback>
                    </Avatar>
                    <span className="font-medium">{cls.teacherName}</span>
                  </div>
                </TableCell>
                <TableCell className="text-center font-bold">{cls.studentCount}</TableCell>
                <TableCell>
                  <div className="space-y-1">
                    <div className="flex justify-between text-[11px] text-muted-foreground">
                      <span>Attendance</span>
                      <span className="font-semibold text-emerald-600 dark:text-emerald-400">
                        {cls.attendanceRate}%
                      </span>
                    </div>
                    <Progress value={cls.attendanceRate} className="h-1.5" />
                  </div>
                </TableCell>
                <TableCell className="text-center font-bold text-blue-600 dark:text-blue-400">
                  {cls.averageGrade}%
                </TableCell>
                <TableCell>
                  <Badge variant="secondary" className="text-[10px] capitalize">
                    {cls.status}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-1">
                    <Button variant="ghost" size="sm" asChild className="h-8 gap-1 text-xs">
                      <Link href={`/dashboard/education/classes/${cls.id}`}>
                        View <ArrowRight className="size-3" />
                      </Link>
                    </Button>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="size-8">
                          <MoreHorizontal className="size-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-36 text-xs">
                        <DropdownMenuItem onClick={() => setEditingClass(cls)}>
                          <Edit className="mr-2 size-3.5" /> Edit
                        </DropdownMenuItem>
                        <DropdownMenuItem className="text-destructive" onClick={() => deleteClass(cls.id)}>
                          <Trash2 className="mr-2 size-3.5" /> Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </TableCell>
              </TableRow>
            ))
          )}
        </TableBody>
      </Table>

      {editingClass && (
        <CreateClassDialog
          editingClass={editingClass}
          open={!!editingClass}
          onOpenChange={(open) => {
            if (!open) setEditingClass(null);
          }}
        />
      )}
    </div>
  );
}
