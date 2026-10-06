// ─── Roles ───────────────────────────────────────────────────────────────────

export type UserRole = "admin" | "teacher" | "student";

export interface AppUser {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: UserRole;
}

// ─── Church Management ──────────────────────────────────────────────────────

export type MembershipStatus = "active" | "inactive" | "new";

export type MemberGroup =
  | "General"
  | "Choir"
  | "Youth"
  | "Elders"
  | "Women's Ministry"
  | "Men's Fellowship"
  | "Sunday School"
  | "Prayer Team";

export interface FamilyMember {
  memberId: string;
  relationship: "spouse" | "child" | "parent" | "sibling";
}

export interface MemberNote {
  id: string;
  date: string;
  author: string;
  content: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  status: MembershipStatus;
  groups: MemberGroup[];
  joinedDate: string;
  avatarUrl: string;
  family: FamilyMember[];
  notes: MemberNote[];
  attendanceRate: number;
}

// ─── Attendance ─────────────────────────────────────────────────────────────

export type AttendanceStatus = "present" | "absent" | "excused";

export interface AttendanceRecord {
  id: string;
  eventId: string;
  memberId: string;
  memberName: string;
  status: AttendanceStatus;
  date: string;
}

export interface WeeklyAttendance {
  week: string;
  date: string;
  present: number;
  absent: number;
  total: number;
}

// ─── Events ─────────────────────────────────────────────────────────────────

export type EventType =
  | "sunday-service"
  | "bible-study"
  | "youth-meeting"
  | "prayer-meeting"
  | "education-exam"
  | "community"
  | "special";

export interface ChurchEvent {
  id: string;
  title: string;
  type: EventType;
  date: string;
  time: string;
  endTime?: string;
  location: string;
  description: string;
  attendeeCount?: number;
  isRecurring?: boolean;
}

// ─── Education ──────────────────────────────────────────────────────────────

export type EducationLevel = "grade-1" | "grade-2" | "junior" | "senior" | "graduate" | "candidate";

export const EDUCATION_LEVELS: { value: EducationLevel; label: string; order: number }[] = [
  { value: "grade-1", label: "Grade 1", order: 1 },
  { value: "grade-2", label: "Grade 2", order: 2 },
  { value: "junior", label: "Junior", order: 3 },
  { value: "senior", label: "Senior", order: 4 },
  { value: "graduate", label: "Graduate", order: 5 },
  { value: "candidate", label: "Candidate", order: 6 },
];

export type StudentStatus = "active" | "on-hold" | "completed" | "withdrawn";

export type Subject =
  | "Bible Studies"
  | "Theology"
  | "Church History"
  | "Scripture"
  | "Christian Ethics"
  | "Pastoral Care";

export interface Student {
  id: string;
  memberId: string;
  name: string;
  email: string;
  avatarUrl: string;
  level: EducationLevel;
  progress: number;
  averageGrade: number;
  status: StudentStatus;
  enrolledCourseIds: string[];
  completedLevels: EducationLevel[];
  subjects: StudentSubject[];
}

export interface StudentSubject {
  subject: Subject;
  grade: number;
  letterGrade: string;
}

export interface Teacher {
  id: string;
  memberId: string;
  name: string;
  email: string;
  avatarUrl: string;
  title: string;
  classIds: string[];
  studentCount: number;
  subjects: Subject[];
}

export interface TeacherClass {
  id: string;
  teacherId: string;
  name: string;
  level: EducationLevel;
  subject: Subject;
  studentCount: number;
  averageGrade: number;
  nextLesson?: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  level: EducationLevel;
  subject: Subject;
  teacherId: string;
  teacherName: string;
  lessonCount: number;
  enrolledStudents: number;
  status: "active" | "draft" | "archived";
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  order: number;
  contentType: "video" | "text" | "mixed";
  duration: string;
  hasQuiz: boolean;
  quizId?: string;
  content: string;
  resources: LessonResource[];
}

export interface LessonResource {
  id: string;
  title: string;
  type: "pdf" | "document" | "link";
  url: string;
}

// ─── Quizzes & Exams ────────────────────────────────────────────────────────

export interface QuizQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
}

export interface Quiz {
  id: string;
  lessonId: string;
  courseId: string;
  title: string;
  subject: Subject;
  questionCount: number;
  questions: QuizQuestion[];
}

export interface ExamResult {
  id: string;
  studentId: string;
  studentName: string;
  courseId: string;
  subject: Subject;
  level: EducationLevel;
  score: number;
  grade: string;
  date: string;
  quizId?: string;
}

// ─── Grades ─────────────────────────────────────────────────────────────────

export interface GradeRecord {
  id: string;
  studentId: string;
  studentName: string;
  subject: Subject;
  level: EducationLevel;
  score: number;
  grade: string;
  date: string;
  type: "quiz" | "exam" | "assignment";
}

// ─── Activity ───────────────────────────────────────────────────────────────

export type ActivityType =
  | "member-added"
  | "attendance-recorded"
  | "exam-published"
  | "course-created"
  | "quiz-completed"
  | "event-created"
  | "grade-posted";

export interface ActivityItem {
  id: string;
  type: ActivityType;
  title: string;
  description: string;
  timestamp: string;
  icon?: string;
}

// ─── Helpers ────────────────────────────────────────────────────────────────

export function getLetterGrade(score: number): string {
  if (score >= 93) return "A";
  if (score >= 90) return "A-";
  if (score >= 87) return "B+";
  if (score >= 83) return "B";
  if (score >= 80) return "B-";
  if (score >= 77) return "C+";
  if (score >= 73) return "C";
  if (score >= 70) return "C-";
  if (score >= 67) return "D+";
  if (score >= 63) return "D";
  if (score >= 60) return "D-";
  return "F";
}

export function getLevelLabel(level: EducationLevel): string {
  return EDUCATION_LEVELS.find((l) => l.value === level)?.label ?? level;
}
