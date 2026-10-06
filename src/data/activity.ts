import type { ActivityItem } from "./types";

export const recentActivities: ActivityItem[] = [
  {
    id: "act-001",
    type: "attendance-recorded",
    title: "Sunday Service Attendance Recorded",
    description: "312 members marked present out of 427 total members.",
    timestamp: "2 hours ago",
    icon: "CheckCircle2",
  },
  {
    id: "act-002",
    type: "quiz-completed",
    title: "Quiz Completed by Daniel Tesfaye",
    description: "Scored 92% on Quiz 1: Foundations of Exegesis.",
    timestamp: "4 hours ago",
    icon: "GraduationCap",
  },
  {
    id: "act-003",
    type: "member-added",
    title: "New Member Registered",
    description: "Hannah Wright joined Youth Ministry.",
    timestamp: "Yesterday at 14:30",
    icon: "UserPlus",
  },
  {
    id: "act-004",
    type: "exam-published",
    title: "Mid-Term Exam Results Published",
    description: "Senior Level Theology exam scores posted for 28 students.",
    timestamp: "2 days ago",
    icon: "FileSpreadsheet",
  },
  {
    id: "act-005",
    type: "course-created",
    title: "New Course Offered",
    description: "'Christian Ethics in Modern Society' assigned to Pastor Thomas Sterling.",
    timestamp: "3 days ago",
    icon: "BookOpen",
  },
  {
    id: "act-006",
    type: "event-created",
    title: "Upcoming Event Created",
    description: "'Youth Fellowship Retreat' scheduled for Nov 15-17.",
    timestamp: "4 days ago",
    icon: "Calendar",
  },
];
