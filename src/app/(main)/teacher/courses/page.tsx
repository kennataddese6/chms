"use client";

import { useState } from "react";

import { courses as initialCourses } from "@/data/courses";
import type { Course } from "@/data/types";

import { CourseCard } from "./_components/course-card";
import { CreateCourseDialog } from "./_components/create-course-dialog";

export default function TeacherCoursesPage() {
  const [courseList, setCourseList] = useState<Course[]>(initialCourses);

  const handleAddCourse = (newCourse: Course) => {
    setCourseList([newCourse, ...courseList]);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Courses & Curriculum</h1>
          <p className="text-sm text-muted-foreground">
            St. Mary&apos;s Education — Manage courses, subjects, and lesson modules.
          </p>
        </div>
        <CreateCourseDialog onAddCourse={handleAddCourse} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {courseList.map((crs) => (
          <CourseCard key={crs.id} course={crs} />
        ))}
      </div>
    </div>
  );
}
