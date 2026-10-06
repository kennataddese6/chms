# Church Management & Education Platform

## Prototype Specification

## 1. Purpose

Build a high-fidelity, clickable web prototype for presentation to a UK church.

The prototype should demonstrate the concept of a single platform combining:

1. **Church Management**
2. **Church Education / Bible Academy**

This is **not a production application**.

The prototype should use realistic mock data and simulated interactions. No real database, authentication, payments, email, SMS, or external APIs are required.

The goal is to let the church understand the product and provide feedback before production development begins.

---

# 2. Product Concept

The platform has three main user roles:

* **Church Administrator**
* **Teacher / Priest**
* **Student**

The church uses the platform to manage its members, attendance, events and educational program.

Students use the same platform to participate in structured religious education.

The education system should feel more like a **school/academy** than a marketplace such as Coursera.

Students progress through levels such as:

* Grade 1
* Grade 2
* Junior
* Senior
* Graduate
* Candidate

Each level can contain multiple subjects and courses.

Students can:

* Study lessons
* Complete quizzes
* Take exams
* Receive grades
* Track progress
* Progress through levels

The education program may eventually use a monthly student subscription, but **do not implement real payments in this prototype**.

---

# 3. Design Direction

Create a polished, modern SaaS interface.

The product should feel:

* Professional
* Trustworthy
* Calm
* Suitable for a church
* Modern but not overly flashy
* Easy for non-technical church administrators to understand

Use a clean dashboard layout with:

* Sidebar navigation
* Top navigation/header
* Cards
* Tables
* Tabs
* Progress indicators
* Charts where useful
* Dialogs/modals for simple actions

Use a consistent design system throughout the application.

Do not over-design the prototype.

Prioritize usability and clarity over visual effects.

---

# 4. Demo Church

Use a fictional UK church for the prototype.

Church name:

**St. Mary's Community Church**

Use realistic fictional data throughout the application.

Example statistics:

* 427 members
* 312 average weekly attendance
* 186 education students
* 12 teachers
* 8 active classes
* 24 upcoming events

Do not use real people's personal information.

---

# 5. Church Administrator

Create an admin dashboard.

## Dashboard

Show:

* Total Members
* Weekly Attendance
* Education Students
* Upcoming Events

Include a simple attendance chart.

Include:

* Upcoming events
* Recent activity
* Recent attendance
* Education overview

Example recent activity:

* 12 new members added
* Sunday attendance recorded
* Grade 2 exam results published
* New education course created

---

# 6. Members

Create a members page with:

* Search
* Filters
* Member table

Example fields:

* Name
* Email
* Phone
* Membership status
* Group
* Attendance
* Joined date

Clicking a member should open a member profile.

Member profile should show:

* Personal information
* Family
* Groups
* Attendance history
* Events
* Notes

Actions can be simulated.

---

# 7. Attendance

Create an attendance page.

Allow the admin to:

* Select an event/service
* View attendance
* Mark people as present/absent
* See attendance statistics

Use mock data.

Include a simple attendance history/chart.

Example:

**Sunday Service — 4 October 2026**

Present: 312
Absent: 115

---

# 8. Events

Create an events page.

Show upcoming events such as:

* Sunday Service
* Bible Study
* Youth Meeting
* Prayer Meeting
* Education Examination

Allow the prototype user to:

* View event details
* Create an event using a modal
* View attendance

The actions only need to update local/mock state.

---

# 9. Education Overview

Create an Education section in the admin dashboard.

Show:

* Total students
* Students by level
* Active teachers
* Courses
* Average grades
* Upcoming exams

Example:

| Level     | Students |
| --------- | -------: |
| Grade 1   |       31 |
| Grade 2   |       42 |
| Junior    |       38 |
| Senior    |       35 |
| Graduate  |       25 |
| Candidate |       15 |

---

# 10. Education — Students

Create an education student management page.

Show:

* Student name
* Level
* Progress
* Average grade
* Status

Clicking a student opens their education profile.

Education profile should show:

* Current level
* Subjects
* Grades
* Completed courses
* Exam results
* Overall progress

---

# 11. Teacher / Priest Dashboard

Create a separate teacher role.

Teacher dashboard should show:

* My classes
* Number of students
* Upcoming exams
* Recent submissions
* Average class performance

Teacher navigation:

* Dashboard
* My Classes
* Students
* Courses
* Lessons
* Quizzes
* Grades

---

# 12. Course / Lesson Creation

Teachers should be able to create a course.

Example course:

**Introduction to Christian Theology**

Course fields:

* Title
* Description
* Level
* Subject
* Teacher

A course contains lessons.

Example:

1. Introduction
2. Scripture
3. Theology
4. Church History
5. Review

Each lesson can contain:

* Title
* Description
* Video placeholder
* Text content
* PDF/resource placeholder

The content does not need to be real.

---

# 13. Quiz

Create a simple quiz interface.

Example:

**Theology — Lesson 3 Quiz**

Question:

> Which book is traditionally considered part of the New Testament?

Provide multiple-choice answers.

After submitting:

* Calculate a mock score
* Show correct/incorrect answers
* Show percentage
* Show grade

Example:

**8 / 10 — 80% — B**

---

# 14. Exams & Grades

Create an admin/teacher grades page.

Show students and grades.

Example:

| Student        | Subject        | Score | Grade |
| -------------- | -------------- | ----: | ----- |
| Daniel Tesfaye | Theology       |   87% | A     |
| Sarah Williams | Bible Studies  |   82% | B+    |
| Michael Brown  | Church History |   91% | A     |

Include filters for:

* Level
* Subject
* Exam
* Student

---

# 15. Student Dashboard

Create a completely different dashboard for the student role.

Example student:

**Daniel Tesfaye**

Level:

**Senior**

Dashboard should show:

**Overall Progress: 72%**

**Average Grade: 87%**

**Subjects**

* Bible Studies — 82%
* Theology — 87%
* Church History — 91%
* Scripture — 88%

Also show:

* Continue Learning
* Upcoming Exam
* Recent Grades
* Completed Lessons

---

# 16. Student Course Experience

Student should be able to:

1. Open a subject
2. Open a course
3. View lessons
4. Mark lessons complete
5. Take quizzes
6. See grades
7. View overall progress

Create a visually polished lesson page.

Example:

**Introduction to Theology**

Lesson 4 of 8

[Video Placeholder]

Lesson content

[Mark as Complete]

[Take Quiz]

---

# 17. Student Progression

Show the student's educational progression visually.

Example:

```text
Grade 1
   ↓
Grade 2
   ↓
Junior
   ↓
Senior       ← Current
   ↓
Graduate
   ↓
Candidate
```

The current level should be clearly highlighted.

Do not implement complicated promotion rules.

This is only to demonstrate the concept.

---

# 18. Role Switching

Because this is a prototype, provide an easy way to switch between:

* Admin
* Teacher
* Student

For example, a role selector in the prototype header.

No real authentication is required.

When switching roles, show the appropriate dashboard and navigation.

---

# 19. Mock Data

Use local mock data.

Create reusable mock data structures for:

* Members
* Students
* Teachers
* Courses
* Lessons
* Quizzes
* Exams
* Grades
* Attendance
* Events

Keep the data centralized so it can easily be replaced by a real backend later.

Use realistic names and values.

Do not use Lorem Ipsum.

---

# 20. Interactions

The prototype should feel functional.

Implement simple client-side interactions such as:

* Navigation
* Search
* Filtering
* Tabs
* Opening profiles
* Opening dialogs
* Creating mock events
* Marking attendance
* Completing lessons
* Taking quizzes
* Viewing results
* Switching roles

Data only needs to persist during the current browser session.

Do not implement:

* Real authentication
* Database
* Payment processing
* Email
* SMS
* File storage
* Video hosting
* Real-time functionality
* Production security

---

# 21. Important Prototype Principle

This prototype is being shown to a real church.

Do not present every possible feature.

Prioritize the following demonstration:

### Admin

Dashboard → Members → Attendance → Education

### Teacher

Dashboard → Class → Course → Quiz → Grades

### Student

Dashboard → Level → Course → Lesson → Quiz → Progress

These flows should be especially polished.

---

# 22. Future Features — Do NOT Build Now

Keep these outside the prototype scope:

* Stripe/payment integration
* Student subscriptions
* Church revenue sharing
* Certificates
* Mobile apps
* SMS
* Email automation
* Video hosting
* Advanced accounting
* Donations
* Multi-church marketplace
* AI features
* Advanced reporting
* Real authentication
* Production database

These can be discussed as future possibilities but should not distract from the prototype.

---

# 23. Technical Requirements

Use:

* Next.js
* TypeScript
* Tailwind CSS
* shadcn/ui where appropriate

Prefer simple architecture.

Avoid unnecessary dependencies.

Use reusable components.

Keep mock data separate from UI components.

The application should run locally with the normal Next.js development command.

---

# 24. Quality Requirements

The prototype should:

* Work on desktop and tablet
* Have responsive layouts
* Have no obvious broken states
* Have consistent spacing
* Have consistent typography
* Have polished empty/loading states where appropriate
* Avoid excessive animations
* Avoid unnecessary complexity

The final result should look like a **real SaaS product**, not an AI-generated demo.

---

# 25. Success Criteria

The prototype is successful if a church administrator can look at it and understand:

1. How their church members would be managed.
2. How attendance would be managed.
3. How their educational program would be managed.
4. How teachers would create and manage education.
5. How students would study online.
6. How students would take quizzes/exams and receive grades.
7. How students would progress through educational levels.

The prototype should generate discussion and feedback about the church's actual requirements before production development begins.

**Do not optimize for completeness. Optimize for demonstrating the concept clearly and convincingly.**
