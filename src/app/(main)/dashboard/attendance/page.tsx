"use client";

import { useState } from "react";

import { useAttendanceStore } from "@/stores/attendance/attendance-store";

import { AttendanceStats } from "./_components/attendance-stats";
import { AttendanceTable } from "./_components/attendance-table";
import { EventSelector } from "./_components/event-selector";

export default function AttendancePage() {
  const [selectedEventId, setSelectedEventId] = useState("evt-001");
  const { records, markAttendance, markAllPresent } = useAttendanceStore();

  const eventRecords = records.filter((r) => r.eventId === selectedEventId);
  const _demoPresentCount = eventRecords.filter((r) => r.status === "present").length;

  // Headline organization-level totals (427 total members, 312 avg attendance)
  const totalOrgMembers = 427;
  const headlinePresent = selectedEventId === "evt-001" ? 312 : 280;
  const headlineAbsent = totalOrgMembers - headlinePresent;

  return (
    <div className="space-y-6">
      <div>
        <h1 className="font-bold text-2xl tracking-tight">Attendance Register</h1>
        <p className="text-muted-foreground text-sm">
          St. Mary&apos;s Community Church — Sunday Service headline attendance: 312 present (of 427 members).
          Interactive roster below shows representative demo records.
        </p>
      </div>

      <EventSelector
        selectedEventId={selectedEventId}
        onSelectEvent={setSelectedEventId}
        onMarkAllPresent={() => markAllPresent(selectedEventId)}
      />

      <AttendanceStats presentCount={headlinePresent} absentCount={headlineAbsent} totalMembers={totalOrgMembers} />

      <AttendanceTable
        records={eventRecords}
        onToggleAttendance={(memberId, status) => markAttendance(memberId, status, selectedEventId)}
      />
    </div>
  );
}
