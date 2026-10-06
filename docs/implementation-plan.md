# CHMS Prototype — Implementation Plan

> **Project**: Church Management & Education Platform Prototype
> **Church**: St. Mary's Community Church (fictional, UK)
> **Goal**: High-fidelity clickable prototype for church stakeholder presentation
> **Stack**: Next.js 16 / React 19 / TypeScript / Tailwind CSS v4 / shadcn/ui

---

## Standing Decisions

These decisions are locked in for the build. Change them here if needed before we start.

| Decision | Choice | Rationale |
|---|---|---|
| Role architecture | Separate route groups per role | Spec §18 says "completely different" dashboards; isolation keeps each role clean |
| Existing template screens | Hide from nav, keep code as reference | Finance, CRM, etc. are great component references but shouldn't appear in the church demo |
| Events UI | Simple events list + create dialog | FullCalendar is overkill for the prototype; a clean card/list is more appropriate |
| Mock data volume | ~25–30 members shown, full counts in KPIs | Enough to feel real without generating hundreds of entries |
| Data persistence | Zustand stores, session-only | Spec §20: "Data only needs to persist during the current browser session" |
| App name | "St. Mary's" or "ChurchFlow" (TBD) | Update `APP_CONFIG.name`; decide when we start |

---

## Phase 0 — Project Setup & Foundation

> **Goal**: Rebrand the template, set up role infrastructure, create the data layer.
> All subsequent phases depend on this.

---

### Task 0.1 — Rebrand App Config

Update the application identity from "Studio Admin" to the CHMS prototype branding.

**Files to modify:**
- `src/config/app-config.ts` — Change `name`, `meta.title`, `meta.description`
- `src/app/layout.tsx` — Update root metadata

**Acceptance:**
- App title in browser tab reflects the new name
- No references to "Studio Admin" remain in user-visible text

---

### Task 0.2 — Define TypeScript Types

Create the shared type definitions for all domain entities.

**File to create:**
- `src/data/types.ts`

**Types needed:**

```typescript
// Roles
type UserRole = "admin" | "teacher" | "student";

// Church Management
interface Member { id, name, email, phone, status, group, joinedDate, avatarUrl, family?, attendance? }
interface AttendanceRecord { id, eventId, memberId, status: "present" | "absent" | "excused", date }
interface ChurchEvent { id, title, type, date, time, location, description, attendeeCount? }

// Education
type EducationLevel = "grade-1" | "grade-2" | "junior" | "senior" | "graduate" | "candidate";
interface Student { id, memberId, name, level, progress, averageGrade, status, enrolledCourses }
interface Teacher { id, memberId, name, classes, studentCount }
interface Course { id, title, description, level, subject, teacherId, lessons }
interface Lesson { id, courseId, title, description, order, contentType, duration, hasQuiz }
interface Quiz { id, lessonId, title, questions: QuizQuestion[] }
interface QuizQuestion { id, question, options: string[], correctAnswer: number }
interface ExamResult { studentId, courseId, subject, score, grade, date }
interface Grade { studentId, subject, score, grade, level }
```

**Acceptance:**
- All types are exported from `src/data/types.ts`
- Types are strict (no `any`), use unions/literals where appropriate

---

### Task 0.3 — Create Mock Data

Build realistic mock data for St. Mary's Community Church.

**Files to create:**
- `src/data/members.ts` — ~30 members with realistic UK names, varied statuses/groups
- `src/data/attendance.ts` — Attendance records for recent services
- `src/data/events.ts` — ~10 upcoming events (services, Bible study, youth, exams)
- `src/data/students.ts` — ~25 students across all 6 levels
- `src/data/teachers.ts` — 12 teachers with assigned classes
- `src/data/courses.ts` — ~8 courses across levels (Theology, Bible Studies, Church History, Scripture, etc.)
- `src/data/lessons.ts` — ~5 lessons per course for at least 2 courses
- `src/data/quizzes.ts` — 2–3 complete quizzes with real biblical/theological questions (4 options each)
- `src/data/grades.ts` — Grade records for students
- `src/data/activity.ts` — Recent activity feed items

**Data guidelines (Spec §19):**
- Use realistic UK names (mix of backgrounds reflecting a London church)
- No Lorem Ipsum — real descriptions, event names, subject names
- Keep data centralized — UI components import from `src/data/`
- Statistics should add up: 427 total members, 186 students, 312 avg attendance, 12 teachers

**Acceptance:**
- All files export typed arrays/objects
- Importing any data file works without errors
- KPI numbers are consistent across files

---

### Task 0.4 — Create Zustand Stores for Session State

Set up Zustand stores for mutable state that changes during the demo.

**Files to create:**
- `src/stores/role/role-store.ts` — Active role (`admin | teacher | student`), active user identity
- `src/stores/role/role-provider.tsx` — React context provider
- `src/stores/attendance/attendance-store.ts` — Mutable attendance marking
- `src/stores/education/education-store.ts` — Lesson completion, quiz answers, course progress

**Acceptance:**
- `useRoleStore()` returns current role and provides `setRole()` action
- Stores reset on page refresh (session-only)

---

### Task 0.5 — Build Role Switcher Component

Create a role selector that appears in the header and switches the active dashboard.

**File to create:**
- `src/components/role-switcher.tsx`

**Behavior:**
- Dropdown or segmented control showing: Admin / Teacher / Student
- Switching navigates to the corresponding role's dashboard route
- Shows the current role's user identity (e.g., "Admin — St. Mary's" / "Fr. James Osei" / "Daniel Tesfaye")
- Visually distinct from other header controls

**Integration point:**
- Replaces or sits next to the existing `AccountSwitcher` in the dashboard header

**Acceptance:**
- Switching from Admin → Teacher navigates to `/teacher`
- Switching from Teacher → Student navigates to `/student`
- Current role is visually indicated

---

### Task 0.6 — Create Route Groups & Layout Shells

Set up the three role-specific route groups with their own layouts and sidebar navigation.

**Files to create:**

Admin (reuse existing):
- Modify `src/app/(main)/dashboard/layout.tsx` — Add role switcher to header, point sidebar to admin nav items
- `src/navigation/sidebar/admin-sidebar-items.ts` — Dashboard, Members, Attendance, Events, Education

Teacher:
- `src/app/(main)/teacher/layout.tsx` — Teacher shell (similar structure to dashboard layout)
- `src/app/(main)/teacher/_components/sidebar/` — Teacher sidebar components
- `src/navigation/sidebar/teacher-sidebar-items.ts` — Dashboard, My Classes, Students, Courses, Lessons, Quizzes, Grades

Student:
- `src/app/(main)/student/layout.tsx` — Student shell
- `src/app/(main)/student/_components/sidebar/` — Student sidebar components
- `src/navigation/sidebar/student-sidebar-items.ts` — Dashboard, My Courses, Quizzes, Grades, Progress

**Key changes:**
- `src/navigation/sidebar/sidebar-items.ts` — Replace with admin items (remove Finance, CRM, etc.)
- `src/app/(main)/dashboard/_components/sidebar/app-sidebar.tsx` — Update logo/name, nav items source
- `src/config/app-config.ts` — Already done in Task 0.1

**Acceptance:**
- `/dashboard` loads admin layout with admin sidebar
- `/teacher` loads teacher layout with teacher sidebar
- `/student` loads student layout with student sidebar
- Role switcher works across all three
- Each layout has the header with search, theme switcher, and role switcher

---

### Task 0.7 — Clean Up Template Screens

Remove existing template screens from navigation so they don't appear during the demo.

**What to do:**
- Remove all existing items from sidebar nav (Finance, CRM, Analytics, etc.)
- Keep the route files in place (they're useful code references)
- Redirect `/dashboard` to admin dashboard instead of `/dashboard/default`

**What NOT to do:**
- Don't delete any existing screen code — it's reference material
- Don't modify `src/components/ui/` or `src/components/calendar/`

**Acceptance:**
- Sidebar shows only CHMS-relevant items
- No "Coming Soon", "Legacy", or demo-template items visible

---

## Phase 1 — Admin Dashboard & Members

> **Goal**: Build the admin's primary view and the members management flow.
> This is the first thing the church stakeholders will see.

---

### Task 1.1 — Admin Dashboard Page

Build the admin dashboard (Spec §5).

**File to create:**
- `src/app/(main)/dashboard/page.tsx` — Composing page (Server Component)
- `src/app/(main)/dashboard/_components/admin-dashboard/` — All dashboard widgets

**Widgets to build:**
1. **KPI Row** — 4 cards: Total Members (427), Weekly Attendance (312), Education Students (186), Upcoming Events (24)
2. **Attendance Chart** — Area/bar chart showing weekly attendance over last 8–12 weeks (Recharts)
3. **Recent Activity** — List of 5–6 recent activity items with icons and timestamps
4. **Upcoming Events** — Next 4–5 events with date, time, type badge
5. **Education Overview** — Mini card showing students by level, link to education section

**Layout:** 12-column grid, similar to Finance dashboard rhythm
- Row 1: KPI cards (full width)
- Row 2: Attendance chart (7 cols) + Recent activity (5 cols)
- Row 3: Upcoming events (5 cols) + Education overview (7 cols)

**Reference:** `finance/page.tsx` for layout pattern

**Acceptance:**
- Dashboard loads with realistic data
- All KPI numbers visible at a glance
- Chart renders with theme-appropriate colors
- Responsive: stacks vertically on mobile/tablet

---

### Task 1.2 — Members List Page

Build the members directory (Spec §6).

**Files to create:**
- `src/app/(main)/dashboard/members/page.tsx`
- `src/app/(main)/dashboard/members/_components/members-table.tsx` — Data table
- `src/app/(main)/dashboard/members/_components/members-columns.tsx` — Column definitions
- `src/app/(main)/dashboard/members/_components/members-toolbar.tsx` — Search + filter bar

**Table columns:** Name (with avatar), Email, Phone, Status (Active/Inactive badge), Group, Attendance %, Joined Date

**Filters:** Status dropdown, Group dropdown, search by name/email

**Reference:** `users/_components/` for table pattern with TanStack Table

**Acceptance:**
- Table renders with 25–30 members
- Search filters in real-time
- Status/group filters work
- Clicking a row navigates to member profile (Task 1.3)

---

### Task 1.3 — Member Profile Page

Build the individual member profile (Spec §6).

**Files to create:**
- `src/app/(main)/dashboard/members/[memberId]/page.tsx`
- `src/app/(main)/dashboard/members/[memberId]/_components/member-header.tsx` — Avatar, name, contact, status
- `src/app/(main)/dashboard/members/[memberId]/_components/member-tabs.tsx` — Tab container

**Tabs:**
1. **Personal Information** — Name, email, phone, address, joined date, membership status
2. **Family** — Family members (linked members)
3. **Groups** — Group memberships (e.g., Choir, Youth, Elders)
4. **Attendance** — Attendance history list with dates and status
5. **Events** — Upcoming/past events this member is associated with
6. **Notes** — Simple notes list (static mock)

**Acceptance:**
- Profile loads with correct member data based on URL param
- All 6 tabs render with content
- Back navigation returns to members list

---

## Phase 2 — Admin: Attendance, Events & Education

> **Goal**: Complete the admin-side flows for attendance tracking, events, and education oversight.

---

### Task 2.1 — Attendance Page

Build attendance management (Spec §7).

**Files to create:**
- `src/app/(main)/dashboard/attendance/page.tsx`
- `src/app/(main)/dashboard/attendance/_components/event-selector.tsx` — Dropdown to pick service/event
- `src/app/(main)/dashboard/attendance/_components/attendance-table.tsx` — Member list with present/absent checkboxes
- `src/app/(main)/dashboard/attendance/_components/attendance-stats.tsx` — Present/Absent counts, percentage
- `src/app/(main)/dashboard/attendance/_components/attendance-chart.tsx` — Historical attendance chart

**Behavior:**
- Default shows most recent Sunday Service
- Selecting an event loads its attendance data
- Checking/unchecking a member updates the Zustand attendance store
- Stats update in real-time as checkboxes change

**Example display:** "Sunday Service — 4 October 2026 | Present: 312 | Absent: 115"

**Acceptance:**
- Event selector switches attendance view
- Checkboxes toggle and stats update live
- Chart shows 8–12 weeks of historical data

---

### Task 2.2 — Events Page

Build events management (Spec §8).

**Files to create:**
- `src/app/(main)/dashboard/events/page.tsx`
- `src/app/(main)/dashboard/events/_components/events-list.tsx` — Card grid of upcoming events
- `src/app/(main)/dashboard/events/_components/event-card.tsx` — Individual event card
- `src/app/(main)/dashboard/events/_components/create-event-dialog.tsx` — Modal form for creating event

**Event card shows:** Title, date/time, type badge, location, attendee count

**Create event form fields:** Title, Type (dropdown), Date, Time, Location, Description

**Behavior:**
- Create event dialog opens, form submits, new event appears in list (session state)
- Clicking an event card shows event details (dialog or dedicated view)

**Acceptance:**
- 8–10 events displayed as cards
- Create event dialog works and adds event to list
- Event types have distinct badge colors

---

### Task 2.3 — Education Overview Page

Build the admin education dashboard (Spec §9).

**Files to create:**
- `src/app/(main)/dashboard/education/page.tsx`
- `src/app/(main)/dashboard/education/_components/education-kpis.tsx` — KPI cards
- `src/app/(main)/dashboard/education/_components/level-breakdown.tsx` — Table/cards showing students per level
- `src/app/(main)/dashboard/education/_components/education-charts.tsx` — Grade distribution, enrollment trends

**KPIs:** Total Students (186), Active Teachers (12), Active Courses (8), Average Grade (B+), Upcoming Exams (3)

**Level breakdown table:**
| Level | Students | Avg Grade | Active Courses |
|---|---|---|---|
| Grade 1 | 31 | B | 2 |
| Grade 2 | 42 | B+ | 2 |
| ... | ... | ... | ... |

**Acceptance:**
- KPI cards render with correct totals
- Level breakdown shows all 6 levels
- Charts render with education data

---

### Task 2.4 — Education Students Page

Build education student management (Spec §10).

**Files to create:**
- `src/app/(main)/dashboard/education/students/page.tsx`
- `src/app/(main)/dashboard/education/students/_components/student-table.tsx`
- `src/app/(main)/dashboard/education/students/_components/student-columns.tsx`
- `src/app/(main)/dashboard/education/students/[studentId]/page.tsx` — Student education profile

**Table columns:** Name, Level (badge), Progress (progress bar), Average Grade, Status

**Education profile tabs:**
1. **Overview** — Current level, overall progress, average grade
2. **Subjects** — List of subjects with grades
3. **Courses** — Enrolled courses with completion %
4. **Exam Results** — Table of exam scores
5. **Progress** — Mini progression visual (reused in Task 4.4)

**Acceptance:**
- Student table renders with filters for Level and Status
- Clicking opens education profile with all tabs populated

---

## Phase 3 — Teacher Flow

> **Goal**: Build the teacher's dashboard and course/quiz management tools.
> This demonstrates how educators interact with the platform.

---

### Task 3.1 — Teacher Dashboard

Build the teacher dashboard (Spec §11).

**Files to create:**
- `src/app/(main)/teacher/page.tsx`
- `src/app/(main)/teacher/_components/dashboard/teacher-kpis.tsx`
- `src/app/(main)/teacher/_components/dashboard/my-classes-card.tsx`
- `src/app/(main)/teacher/_components/dashboard/recent-submissions.tsx`
- `src/app/(main)/teacher/_components/dashboard/upcoming-exams-card.tsx`

**KPIs:** My Classes (3), Total Students (64), Upcoming Exams (2), Average Performance (78%)

**Widgets:**
- My Classes — cards showing class name, level, student count
- Upcoming Exams — next 2–3 exams with date, subject, level
- Recent Submissions — last 5 student quiz/exam submissions
- Class Performance — simple bar chart comparing class averages

**Acceptance:**
- Dashboard shows data relevant to the logged-in teacher (Fr. James Osei)
- All widgets render with realistic data

---

### Task 3.2 — My Classes & Students Pages

**Files to create:**
- `src/app/(main)/teacher/classes/page.tsx` — Grid of class cards
- `src/app/(main)/teacher/classes/[classId]/page.tsx` — Class detail with enrolled students
- `src/app/(main)/teacher/students/page.tsx` — All students across teacher's classes

**Class card:** Level, subject, student count, average grade, next lesson

**Acceptance:**
- Teacher sees only their assigned classes
- Clicking a class shows enrolled students
- Students page shows all students with grades

---

### Task 3.3 — Course & Lesson Management

Build course/lesson creation (Spec §12).

**Files to create:**
- `src/app/(main)/teacher/courses/page.tsx` — Course list
- `src/app/(main)/teacher/courses/_components/course-card.tsx`
- `src/app/(main)/teacher/courses/_components/create-course-dialog.tsx`
- `src/app/(main)/teacher/courses/[courseId]/page.tsx` — Course detail with lessons
- `src/app/(main)/teacher/courses/[courseId]/_components/lesson-list.tsx`
- `src/app/(main)/teacher/courses/[courseId]/_components/create-lesson-dialog.tsx`

**Course form fields:** Title, Description, Level, Subject, Teacher

**Lesson form fields:** Title, Description, Content type (Video/Text/Mixed), add resources

**Example course:** "Introduction to Christian Theology" — Senior level, 5 lessons

**Acceptance:**
- Course list shows existing courses
- Create course dialog works (adds to session state)
- Course detail shows ordered lesson list
- Create lesson dialog works

---

### Task 3.4 — Quiz Management (Teacher Side)

Build quiz creation for teachers (Spec §13).

**Files to create:**
- `src/app/(main)/teacher/quizzes/page.tsx` — Quiz list
- `src/app/(main)/teacher/quizzes/_components/quiz-card.tsx`
- `src/app/(main)/teacher/quizzes/_components/create-quiz-dialog.tsx` — Quiz builder with question/answer fields

**Quiz builder:**
- Quiz title, associated lesson
- Add questions (question text + 4 options + mark correct answer)
- Preview quiz

**Acceptance:**
- Quiz list shows existing quizzes grouped by course
- Create quiz form allows adding multiple questions

---

### Task 3.5 — Grades Page (Teacher Side)

Build the grades management view (Spec §14).

**Files to create:**
- `src/app/(main)/teacher/grades/page.tsx`
- `src/app/(main)/teacher/grades/_components/grades-table.tsx`
- `src/app/(main)/teacher/grades/_components/grades-filters.tsx`

**Table columns:** Student, Subject, Score (%), Grade (letter), Date

**Filters:** Level, Subject, Exam, Student search

**Acceptance:**
- Grades table renders with filterable data
- Letter grades display with color-coded badges (A=green, B=blue, C=yellow, etc.)

---

## Phase 4 — Student Flow

> **Goal**: Build the student experience — dashboard, course viewer, quiz taking, and progression.
> This is the most interactive part of the prototype.

---

### Task 4.1 — Student Dashboard

Build the student dashboard (Spec §15).

**Files to create:**
- `src/app/(main)/student/page.tsx`
- `src/app/(main)/student/_components/dashboard/progress-overview.tsx` — Overall progress ring/bar
- `src/app/(main)/student/_components/dashboard/subject-grades.tsx` — Subject cards with grades
- `src/app/(main)/student/_components/dashboard/continue-learning.tsx` — Next lesson card
- `src/app/(main)/student/_components/dashboard/upcoming-exams.tsx`
- `src/app/(main)/student/_components/dashboard/recent-grades.tsx`

**Student identity:** Daniel Tesfaye, Senior level

**Display:**
- Overall Progress: 72% (progress ring)
- Average Grade: 87%
- Subject cards: Bible Studies (82%), Theology (87%), Church History (91%), Scripture (88%)
- Continue Learning: next incomplete lesson with course name
- Upcoming Exam: next scheduled exam
- Recent Grades: last 3–4 graded items

**Acceptance:**
- Dashboard feels personal and focused on the student's journey
- Progress indicators are visually prominent
- "Continue Learning" card links to the next lesson

---

### Task 4.2 — Student Course & Lesson Viewer

Build the student learning experience (Spec §16).

**Files to create:**
- `src/app/(main)/student/courses/page.tsx` — Subject/course list
- `src/app/(main)/student/courses/[courseId]/page.tsx` — Course overview with lesson list
- `src/app/(main)/student/courses/[courseId]/lessons/[lessonId]/page.tsx` — Lesson viewer

**Lesson viewer layout:**
- Course title + "Lesson 4 of 8" indicator
- Video placeholder (styled div with play icon, not a real player)
- Lesson text content (2–3 paragraphs of real theological content)
- Resource links (PDF placeholder buttons)
- "Mark as Complete" button
- "Take Quiz" button (if lesson has a quiz)
- Previous/Next lesson navigation

**Behavior:**
- "Mark as Complete" updates education store, shows completion state
- Lesson list shows checkmarks for completed lessons

**Acceptance:**
- Lesson page looks polished and content-focused
- Mark complete toggles state visually
- Navigation between lessons works
- Quiz CTA links to quiz taking page

---

### Task 4.3 — Quiz Taking Experience

Build the student quiz interface (Spec §13).

**Files to create:**
- `src/app/(main)/student/quizzes/[quizId]/page.tsx` — Quiz taking page
- `src/app/(main)/student/quizzes/[quizId]/_components/quiz-question.tsx` — Single question with radio options
- `src/app/(main)/student/quizzes/[quizId]/_components/quiz-results.tsx` — Results display

**Flow:**
1. Show quiz title, question count, associated lesson
2. Display questions one-at-a-time or all-at-once (all-at-once is simpler for prototype)
3. Student selects answers via radio buttons
4. "Submit Quiz" calculates score against correct answers
5. Results screen shows: score (8/10), percentage (80%), letter grade (B), per-question correct/incorrect

**Acceptance:**
- Quiz renders with 5–10 real theological questions
- Radio selection works for all questions
- Submit calculates correct score
- Results clearly show which answers were right/wrong with visual indicators (green check / red cross)

---

### Task 4.4 — Student Progression View

Build the level progression visualization (Spec §17).

**Files to create:**
- `src/app/(main)/student/progress/page.tsx`
- `src/app/(main)/student/progress/_components/level-stepper.tsx` — Vertical stepper showing all levels

**Visual:** Vertical stepper/timeline:
```
 Grade 1     — Completed
 Grade 2     — Completed
 Junior      — Completed
 Senior      — Current (72% complete)
 Graduate    — Locked
 Candidate   — Locked
```

**Also show on this page:**
- Current level details (subjects, progress bars per subject)
- Requirements to advance (if applicable)
- Completed level certificates (placeholder)

**Acceptance:**
- Current level is clearly highlighted
- Completed levels show as done
- Future levels appear locked/dimmed
- Responsive and visually polished

---

## Phase 5 — Interactions & Connectivity

> **Goal**: Wire up cross-role interactions, ensure all navigation flows work end-to-end, add search.

---

### Task 5.1 — Wire Role-Specific Navigation

Ensure all sidebar items link to working pages across all three roles.

**Verify:**
- Every admin sidebar item navigates correctly
- Every teacher sidebar item navigates correctly
- Every student sidebar item navigates correctly
- Role switcher updates sidebar and navigates to the correct dashboard
- Active sidebar item is highlighted on all pages

**Acceptance:**
- Zero dead links in navigation
- Active state matches current route

---

### Task 5.2 — Connect Cross-Page Links

Wire up all in-page links and CTAs:
- Dashboard "View all members" → Members page
- Dashboard upcoming event → Events page
- Dashboard education overview → Education page
- Member profile attendance tab → link to attendance page
- Education student → student education profile
- Teacher class → student list
- Student "Continue Learning" → correct lesson page
- Student quiz CTA → quiz page
- Quiz results "Back to lesson" → lesson page

**Acceptance:**
- All clickable elements navigate to the correct destination
- Back navigation works intuitively

---

### Task 5.3 — Implement Search

Add functional search across the current role's content.

**Modify:**
- Existing `src/app/(main)/dashboard/_components/header/search-dialog.tsx` — Connect to mock data

**Search should find:**
- Admin: Members, Events, Students
- Teacher: Students, Courses, Quizzes
- Student: Courses, Lessons

**Acceptance:**
- Search dialog opens, typing filters results
- Clicking a result navigates to the relevant page

---

## Phase 6 — Polish & Quality

> **Goal**: Match the quality bar in Spec §24 — "should look like a real SaaS product, not an AI-generated demo."

---

### Task 6.1 — Responsive Layout Audit

Test and fix all pages at these breakpoints:
- Desktop: 1440px+
- Tablet landscape: 1024px
- Tablet portrait: 768px

**Common fixes:**
- Grid columns collapsing properly
- Tables scrolling horizontally on smaller screens
- Sidebar behaving correctly (collapsible on tablet)
- Action buttons wrapping or stacking

**Acceptance:**
- No broken layouts at any target breakpoint
- Cards and grids adapt cleanly

---

### Task 6.2 — Empty & Loading States

Add appropriate states where content could be absent.

**Screens needing empty states:**
- Members list (no search results)
- Attendance (no event selected)
- Events (no upcoming events)
- Grades (no results for filter)
- Quiz (no quizzes available)

**Use:** `src/components/ui/empty.tsx` for consistent empty state treatment

**Acceptance:**
- Filtering to zero results shows a clean empty state, not a blank area
- Empty states have relevant icons and messages

---

### Task 6.3 — Dark Mode Verification

Verify all new screens work correctly in dark mode.

**Common issues to check:**
- Card backgrounds using `bg-card` not hardcoded whites
- Text using `text-foreground` / `text-muted-foreground`
- Borders using `border-border`
- Chart colors using `chart-1` through `chart-5` tokens
- Badges readable in both modes

**Acceptance:**
- Toggle dark mode: all screens render correctly
- No contrast issues or invisible text

---

### Task 6.4 — Typography & Spacing Consistency

Final pass ensuring visual rhythm matches the template's established patterns.

**Check:**
- Page titles: `text-3xl tracking-tight` (matches Finance dashboard)
- Subtitle dates: `text-muted-foreground text-sm`
- Card padding: consistent across all cards
- Gap sizing: `gap-4` between cards, `gap-4 md:gap-6` for page sections
- Table density matches existing Users table

**Acceptance:**
- New screens are visually indistinguishable in quality from existing template screens

---

### Task 6.5 — Final Demo Flow Walkthrough

Walk through the three priority demo flows (Spec §21) end-to-end:

**Admin flow:**
Dashboard → Members → Member Profile → Attendance → Events → Education → Education Students → Student Profile

**Teacher flow:**
Dashboard → My Classes → Course → Lessons → Quiz Management → Grades

**Student flow:**
Dashboard → Course → Lesson → Take Quiz → Results → Progress/Levels

**Acceptance:**
- Each flow is smooth with no dead ends
- Transitions feel natural
- Data is consistent across views (same student shows same grades everywhere)

---

## File Tree Summary (New Files)

```
src/
├── data/
│   ├── types.ts                    ← Task 0.2
│   ├── members.ts                  ← Task 0.3
│   ├── attendance.ts               ← Task 0.3
│   ├── events.ts                   ← Task 0.3
│   ├── students.ts                 ← Task 0.3
│   ├── teachers.ts                 ← Task 0.3
│   ├── courses.ts                  ← Task 0.3
│   ├── lessons.ts                  ← Task 0.3
│   ├── quizzes.ts                  ← Task 0.3
│   ├── grades.ts                   ← Task 0.3
│   └── activity.ts                 ← Task 0.3
├── stores/
│   ├── role/                       ← Task 0.4
│   ├── attendance/                 ← Task 0.4
│   └── education/                  ← Task 0.4
├── components/
│   └── role-switcher.tsx           ← Task 0.5
├── navigation/sidebar/
│   ├── admin-sidebar-items.ts      ← Task 0.6
│   ├── teacher-sidebar-items.ts    ← Task 0.6
│   └── student-sidebar-items.ts    ← Task 0.6
├── app/(main)/
│   ├── dashboard/                  ← Admin screens (Phase 1–2)
│   │   ├── members/
│   │   ├── attendance/
│   │   ├── events/
│   │   └── education/
│   ├── teacher/                    ← Teacher screens (Phase 3)
│   │   ├── classes/
│   │   ├── courses/
│   │   ├── students/
│   │   ├── quizzes/
│   │   └── grades/
│   └── student/                    ← Student screens (Phase 4)
│       ├── courses/
│       ├── quizzes/
│       ├── grades/
│       └── progress/
```

---

## Estimated Effort by Phase

| Phase | Tasks | Scope |
|---|---|---|
| Phase 0 — Foundation | 7 tasks | Data layer, routing, role switching, cleanup |
| Phase 1 — Admin Dashboard & Members | 3 tasks | Dashboard, member list, member profile |
| Phase 2 — Admin Attendance/Events/Education | 4 tasks | Attendance, events, education overview, education students |
| Phase 3 — Teacher Flow | 5 tasks | Teacher dashboard, classes, courses, quizzes, grades |
| Phase 4 — Student Flow | 4 tasks | Student dashboard, lesson viewer, quiz taking, progression |
| Phase 5 — Interactions | 3 tasks | Navigation wiring, cross-links, search |
| Phase 6 — Polish | 5 tasks | Responsive, empty states, dark mode, typography, final walkthrough |
| **Total** | **31 tasks** | |
