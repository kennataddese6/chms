import { members } from "./members";
import type { AttendanceRecord, WeeklyAttendance } from "./types";

/** Attendance records for the most recent Sunday Service (4 Oct 2026) */
export const sundayServiceAttendance: AttendanceRecord[] = members.map((member, index) => ({
  id: `att-${member.id}`,
  eventId: "evt-010",
  memberId: member.id,
  memberName: member.name,
  status: member.status === "inactive" || index % 7 === 0 ? "absent" : "present",
  date: "2026-10-04",
}));

/** Attendance records for Wednesday Bible Study (1 Oct 2026) */
export const bibleStudyAttendance: AttendanceRecord[] = members.slice(0, 18).map((member, index) => ({
  id: `att-bs-${member.id}`,
  eventId: "evt-002",
  memberId: member.id,
  memberName: member.name,
  status: index % 4 === 0 ? "absent" : "present",
  date: "2026-10-01",
}));

/** Weekly attendance history for the chart (last 12 weeks) */
export const weeklyAttendanceHistory: WeeklyAttendance[] = [
  { week: "W28", date: "2026-07-12", present: 298, absent: 129, total: 427 },
  { week: "W29", date: "2026-07-19", present: 285, absent: 142, total: 427 },
  { week: "W30", date: "2026-07-26", present: 310, absent: 117, total: 427 },
  { week: "W31", date: "2026-08-02", present: 305, absent: 122, total: 427 },
  { week: "W32", date: "2026-08-09", present: 290, absent: 137, total: 427 },
  { week: "W33", date: "2026-08-16", present: 318, absent: 109, total: 427 },
  { week: "W34", date: "2026-08-23", present: 302, absent: 125, total: 427 },
  { week: "W35", date: "2026-08-30", present: 295, absent: 132, total: 427 },
  { week: "W36", date: "2026-09-06", present: 320, absent: 107, total: 427 },
  { week: "W37", date: "2026-09-13", present: 308, absent: 119, total: 427 },
  { week: "W38", date: "2026-09-20", present: 315, absent: 112, total: 427 },
  { week: "W39", date: "2026-09-27", present: 312, absent: 115, total: 427 },
];

export const attendanceStats = {
  averageWeekly: 312,
  lastSunday: { present: 312, absent: 115, total: 427 },
  trend: "+2.1%",
};
