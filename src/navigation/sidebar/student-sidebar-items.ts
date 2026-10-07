import { Award, BookOpen, CheckSquare, LayoutDashboard, TrendingUp } from "lucide-react";

import type { NavGroup } from "./admin-sidebar-items";

export const studentSidebarItems: NavGroup[] = [
  {
    id: 1,
    label: "Student Portal",
    items: [
      {
        id: "student-overview",
        title: "Overview",
        url: "/student",
        icon: LayoutDashboard,
      },
      {
        id: "student-courses",
        title: "My Courses",
        url: "/student/courses",
        icon: BookOpen,
      },
      {
        id: "student-quizzes",
        title: "Quizzes",
        url: "/student/quizzes",
        icon: CheckSquare,
      },
      {
        id: "student-grades",
        title: "My Grades",
        url: "/student/grades",
        icon: Award,
      },
      {
        id: "student-progress",
        title: "Level Progress",
        url: "/student/progress",
        icon: TrendingUp,
      },
    ],
  },
];
