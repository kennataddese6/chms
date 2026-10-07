import { members } from "./members";
import { students } from "./students";
import type { AttendanceStatus } from "./types";

export interface AttendanceCalendarEvent {
  id: string;
  title: string;
  start: string;
  end?: string;
  allDay?: boolean;
  status: AttendanceStatus;
  eventName: string;
  serviceType: string;
  teacherName: string;
  location: string;
  notes: string;
  className?: string;
  color?: string;
}

export interface MemberAttendanceSummaryStats {
  memberId: string;
  memberName: string;
  gradeOrCohort: string;
  present: number;
  late: number;
  absent: number;
  visitor: number;
  totalSessions: number;
  attendanceRate: number;
}

// Generate realistic date strings for Sundays & Wednesdays in recent weeks
function generateEventDates() {
  const dates: { dateStr: string; dayName: string; monthDay: number }[] = [];
  const _base = new Date(2026, 9, 1); // Oct 2026

  for (let d = -35; d <= 30; d++) {
    const dt = new Date(2026, 9, 1 + d);
    const day = dt.getDay();
    if (day === 0 || day === 3 || day === 6) {
      // Sunday (0), Wednesday (3), Saturday (6)
      const year = dt.getFullYear();
      const month = String(dt.getMonth() + 1).padStart(2, "0");
      const dateNum = String(dt.getDate()).padStart(2, "0");
      dates.push({
        dateStr: `${year}-${month}-${dateNum}`,
        dayName: day === 0 ? "Sunday" : day === 3 ? "Wednesday" : "Saturday",
        monthDay: dt.getDate(),
      });
    }
  }
  return dates;
}

export function getMemberAttendanceHistory(memberId: string): {
  stats: MemberAttendanceSummaryStats;
  events: AttendanceCalendarEvent[];
} {
  const member = members.find((m) => m.id === memberId);
  const student = students.find((s) => s.memberId === memberId || s.id === memberId);
  const memberName = member?.name || student?.name || "Church Member";
  const gradeOrCohort = student
    ? `Grade ${student.level === "grade-1" ? "1" : student.level === "grade-2" ? "2" : "5"} · Sunday School`
    : "General Congregation Member";

  const eventDates = generateEventDates();
  const rawIdHash = memberId.split("").reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const events: AttendanceCalendarEvent[] = [];
  let present = 0;
  let late = 0;
  let absent = 0;
  let visitor = 0;

  eventDates.forEach((ed, idx) => {
    const statusVal = (rawIdHash + idx * 7) % 100;
    let status: AttendanceStatus = "present";
    let notes = "Attended service on time";

    if (statusVal < 65) {
      status = "present";
      present++;
      notes = "Attended service on time";
    } else if (statusVal < 80) {
      status = "late";
      late++;
      notes = "Arrived 15 mins late due to morning traffic";
    } else if (statusVal < 93) {
      status = "absent";
      absent++;
      notes = "Notified absence (Family travel / sick)";
    } else {
      status = "visitor";
      visitor++;
      notes = "Visited special fellowship service";
    }

    let title = "";
    let eventName = "";
    let serviceType = "";
    let teacherName = "Sarah Smith";
    let location = "Sanctuary";
    let startTime = `${ed.dateStr}T09:00:00`;
    let endTime = `${ed.dateStr}T10:30:00`;

    if (ed.dayName === "Sunday") {
      eventName = "Sunday School — Grade 5";
      serviceType = "Sunday Worship & Education";
      teacherName = "Fr. James Osei & Sarah Smith";
      location = "Education Wing - Room 102";
      startTime = `${ed.dateStr}T09:30:00`;
      endTime = `${ed.dateStr}T11:00:00`;
    } else if (ed.dayName === "Wednesday") {
      eventName = "Midweek Bible Study";
      serviceType = "Discipleship Study";
      teacherName = "David Osei-Bonsu";
      location = "Fellowship Hall";
      startTime = `${ed.dateStr}T19:00:00`;
      endTime = `${ed.dateStr}T20:15:00`;
    } else {
      eventName = "Youth Ministry Fellowship";
      serviceType = "Youth Fellowship";
      teacherName = "Catherine Nwosu";
      location = "Youth Center";
      startTime = `${ed.dateStr}T16:00:00`;
      endTime = `${ed.dateStr}T17:30:00`;
    }

    const statusBadgeText =
      status === "present" ? "Present" : status === "late" ? "Late" : status === "absent" ? "Absent" : "Visitor";
    title = `${eventName} (${statusBadgeText})`;

    events.push({
      id: `att-evt-${memberId}-${idx}`,
      title,
      start: startTime,
      end: endTime,
      status,
      eventName,
      serviceType,
      teacherName,
      location,
      notes,
      className: status,
    });
  });

  const totalSessions = present + late + absent + visitor;
  const attendanceRate = Math.round(((present + late * 0.8 + visitor * 0.5) / (totalSessions || 1)) * 100);

  const stats: MemberAttendanceSummaryStats = {
    memberId,
    memberName,
    gradeOrCohort,
    present,
    late,
    absent,
    visitor,
    totalSessions,
    attendanceRate,
  };

  return { stats, events };
}
