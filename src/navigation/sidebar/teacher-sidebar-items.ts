import { Award, BookOpen, CheckSquare, LayoutDashboard, School, Users } from "lucide-react";

import type { NavGroup } from "./admin-sidebar-items";

export const teacherSidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Teacher Portal",
    items: [
      {
        id: "teacher-overview",
        title: "Overview",
        url: "/teacher",
        icon: LayoutDashboard,
      },
      {
        id: "teacher-classes",
        title: "My Classes",
        url: "/teacher/classes",
        icon: School,
      },
      {
        id: "teacher-students",
        title: "Students",
        url: "/teacher/students",
        icon: Users,
      },
    ],
  },
  {
    id: 2,
    label: "Curriculum & Grading",
    items: [
      {
        id: "teacher-courses",
        title: "Courses & Lessons",
        url: "/teacher/courses",
        icon: BookOpen,
      },
      {
        id: "teacher-quizzes",
        title: "Quizzes",
        url: "/teacher/quizzes",
        icon: CheckSquare,
      },
      {
        id: "teacher-grades",
        title: "Grades & Exams",
        url: "/teacher/grades",
        icon: Award,
      },
    ],
  },
];
