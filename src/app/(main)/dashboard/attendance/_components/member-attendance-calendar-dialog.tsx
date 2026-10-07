"use client";

import * as React from "react";

import { useCalendarController } from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/react/daygrid";
import interactionPlugin from "@fullcalendar/react/interaction";
import listPlugin from "@fullcalendar/react/list";
import multiMonthPlugin from "@fullcalendar/react/multimonth";
import timeGridPlugin from "@fullcalendar/react/timegrid";
import { format } from "date-fns";
import { CheckCircle2, ChevronLeft, ChevronRight, Clock, Sparkles, UserCheck, UserX, XIcon } from "lucide-react";

import { EventCalendarViews } from "@/components/calendar/event-calendar-views";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ButtonGroup } from "@/components/ui/button-group";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { type AttendanceCalendarEvent, getMemberAttendanceHistory } from "@/data/attendance-calendar-data";

interface MemberAttendanceCalendarDialogProps {
  memberId: string | null;
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const views = [
  { key: "dayGridMonth", label: "Month View" },
  { key: "timeGridWeek", label: "Week View" },
  { key: "timeGridDay", label: "Day View" },
];

const plugins = [dayGridPlugin, timeGridPlugin, listPlugin, interactionPlugin, multiMonthPlugin];

export function MemberAttendanceCalendarDialog({ memberId, open, onOpenChange }: MemberAttendanceCalendarDialogProps) {
  const controller = useCalendarController();
  const [selectedEvent, setSelectedEvent] = React.useState<AttendanceCalendarEvent | null>(null);

  const { stats, events } = React.useMemo(() => {
    if (!memberId) {
      return {
        stats: {
          memberId: "",
          memberName: "Church Member",
          gradeOrCohort: "Sunday School",
          present: 18,
          late: 2,
          absent: 3,
          visitor: 1,
          totalSessions: 24,
          attendanceRate: 86,
        },
        events: [],
      };
    }
    return getMemberAttendanceHistory(memberId);
  }, [memberId]);

  const fcEvents = React.useMemo(() => {
    return events.map((evt) => {
      let color = "#10b981"; // Emerald present
      let backgroundColor = "#10b981";
      let borderColor = "#059669";

      if (evt.status === "late") {
        color = "#f59e0b"; // Amber late
        backgroundColor = "#f59e0b";
        borderColor = "#d97706";
      } else if (evt.status === "absent") {
        color = "#ef4444"; // Red absent
        backgroundColor = "#ef4444";
        borderColor = "#dc2626";
      } else if (evt.status === "visitor") {
        color = "#8b5cf6"; // Purple visitor
        backgroundColor = "#8b5cf6";
        borderColor = "#7c3aed";
      }

      return {
        id: evt.id,
        title: evt.title,
        start: evt.start,
        end: evt.end,
        color,
        backgroundColor,
        borderColor,
        textColor: "#ffffff",
        extendedProps: evt,
      };
    });
  }, [events]);

  const [dateTitle, setDateTitle] = React.useState(() => format(new Date(), "MMMM yyyy"));

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="fixed inset-0 top-0 left-0 z-50 flex h-screen w-screen max-w-none translate-x-0 translate-y-0 flex-col overflow-hidden rounded-none border-none bg-background p-3 sm:max-w-none sm:p-4">
        {/* Ultra-Compact Full-Screen Header (Single Row) */}
        <DialogHeader className="flex-shrink-0 border-b pb-2.5">
          <div className="flex flex-wrap items-center justify-between gap-3">
            {/* Member Info */}
            <div className="flex items-center gap-2.5">
              <DialogTitle className="font-bold text-lg sm:text-xl">{stats.memberName}</DialogTitle>
              <Badge variant="outline" className="border-primary/20 bg-primary/10 font-semibold text-primary text-xs">
                {stats.gradeOrCohort}
              </Badge>
              <Badge variant="secondary" className="font-medium text-xs">
                Attendance Calendar History
              </Badge>
            </div>

            {/* Inline Metric Pills & Legend */}
            <div className="flex flex-wrap items-center gap-2 text-xs sm:gap-3">
              <div className="flex items-center gap-1.5 rounded-full border bg-emerald-500/10 px-2.5 py-0.5 text-emerald-700 dark:text-emerald-300">
                <CheckCircle2 className="size-3.5" />
                <span className="font-bold">{stats.present}</span> Present
              </div>
              <div className="flex items-center gap-1.5 rounded-full border bg-amber-500/10 px-2.5 py-0.5 text-amber-700 dark:text-amber-300">
                <Clock className="size-3.5" />
                <span className="font-bold">{stats.late}</span> Late
              </div>
              <div className="flex items-center gap-1.5 rounded-full border bg-red-500/10 px-2.5 py-0.5 text-red-700 dark:text-red-300">
                <UserX className="size-3.5" />
                <span className="font-bold">{stats.absent}</span> Absent
              </div>
              <div className="flex items-center gap-1.5 rounded-full border bg-purple-500/10 px-2.5 py-0.5 text-purple-700 dark:text-purple-300">
                <UserCheck className="size-3.5" />
                <span className="font-bold">{stats.visitor}</span> Visitor
              </div>

              {/* Attendance Rate Pill */}
              <div className="flex items-center gap-2 rounded-full border bg-muted/60 px-3 py-0.5 font-medium text-xs">
                <span className="text-muted-foreground">Rate:</span>
                <span className="font-bold text-emerald-600 dark:text-emerald-400">{stats.attendanceRate}%</span>
                <div className="h-1.5 w-12 overflow-hidden rounded-full bg-muted">
                  <div className="h-full bg-emerald-500" style={{ width: `${stats.attendanceRate}%` }} />
                </div>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Full-Screen Calendar Viewport Container (Takes ~90%+ of Screen Height) */}
        <div className="mt-2 flex min-h-0 flex-1 flex-col overflow-hidden rounded-xl border bg-card shadow-xs">
          {/* Calendar Toolbar Header */}
          <div className="flex flex-shrink-0 flex-col gap-2 border-b bg-sidebar p-2.5 text-sidebar-foreground sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-3">
              <span className="font-bold text-lg">{dateTitle}</span>
              <span className="hidden text-muted-foreground text-xs sm:inline-block">
                Click any scheduled date box to inspect detailed session activity notes.
              </span>
            </div>

            <div className="flex items-center gap-2">
              <ButtonGroup>
                <Button size="icon" variant="outline" className="size-8" onClick={() => controller.prev()}>
                  <ChevronLeft className="size-4" />
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  className="h-8 font-medium text-xs"
                  onClick={() => controller.today()}
                >
                  Today
                </Button>
                <Button size="icon" variant="outline" className="size-8" onClick={() => controller.next()}>
                  <ChevronRight className="size-4" />
                </Button>
              </ButtonGroup>

              <Select value={controller.view?.type ?? views[0].key} onValueChange={(val) => controller.changeView(val)}>
                <SelectTrigger className="h-8 w-36 text-xs">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent align="end">
                  <SelectGroup>
                    {views.map((v) => (
                      <SelectItem key={v.key} value={v.key} className="text-xs">
                        {v.label}
                      </SelectItem>
                    ))}
                  </SelectGroup>
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* Calendar Full Canvas */}
          <div className="relative flex min-h-0 flex-1 flex-col overflow-hidden p-2">
            <EventCalendarViews
              height="100%"
              expandRows={true}
              controller={controller}
              initialView={views[0].key}
              plugins={[...plugins]}
              popoverCloseContent={() => <XIcon className="size-4 text-muted-foreground hover:text-foreground" />}
              events={fcEvents}
              nowIndicator
              eventContent={(eventInfo) => {
                const ext = eventInfo.event.extendedProps as AttendanceCalendarEvent;
                const status = ext?.status;
                let bgClass = "bg-emerald-600 border-emerald-700 text-white dark:bg-emerald-600";
                let statusText = "Present";

                if (status === "late") {
                  bgClass = "bg-amber-500 border-amber-600 text-white dark:bg-amber-500";
                  statusText = "Late";
                } else if (status === "absent") {
                  bgClass = "bg-red-600 border-red-700 text-white dark:bg-red-600";
                  statusText = "Absent";
                } else if (status === "visitor") {
                  bgClass = "bg-purple-600 border-purple-700 text-white dark:bg-purple-600";
                  statusText = "Visitor";
                }

                return (
                  <div
                    className={`flex w-full items-center justify-between gap-1 overflow-hidden rounded px-1.5 py-1 font-semibold text-xs shadow-xs ${bgClass}`}
                  >
                    <span className="truncate">{eventInfo.event.title}</span>
                    <span className="shrink-0 rounded bg-black/20 px-1 py-0.5 font-bold text-[9px] uppercase tracking-wider">
                      {statusText}
                    </span>
                  </div>
                );
              }}
              eventClick={(info) => {
                const ext = info.event.extendedProps as AttendanceCalendarEvent;
                if (ext) setSelectedEvent(ext);
              }}
              datesSet={(info) => {
                setDateTitle(info.view.title);
              }}
            />
          </div>
        </div>

        {/* Selected Event Detail Banner (Overlay / Drawer) */}
        {selectedEvent && (
          <div className="mt-2 flex-shrink-0 space-y-1 rounded-lg border bg-card p-2.5 text-xs shadow-xs">
            <div className="flex items-center justify-between border-b pb-1">
              <div className="flex items-center gap-2">
                <Sparkles className="size-3.5 text-primary" />
                <h4 className="font-bold text-xs">{selectedEvent.eventName}</h4>
              </div>
              <div className="flex items-center gap-2">
                <Badge
                  variant="outline"
                  className={`font-semibold text-[10px] capitalize ${
                    selectedEvent.status === "present"
                      ? "border-emerald-300 bg-emerald-500/10 text-emerald-700"
                      : selectedEvent.status === "late"
                        ? "border-amber-300 bg-amber-500/10 text-amber-700"
                        : selectedEvent.status === "absent"
                          ? "border-red-300 bg-red-500/10 text-red-700"
                          : "border-purple-300 bg-purple-500/10 text-purple-700"
                  }`}
                >
                  Status: {selectedEvent.status}
                </Badge>
                <Button
                  variant="ghost"
                  size="icon"
                  className="size-5 text-muted-foreground hover:text-foreground"
                  onClick={() => setSelectedEvent(null)}
                >
                  <XIcon className="size-3" />
                </Button>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-x-4 text-[11px] text-muted-foreground sm:grid-cols-4">
              <div>
                <strong className="text-foreground">Date:</strong>{" "}
                {selectedEvent.start ? format(new Date(selectedEvent.start), "PPP 'at' p") : "Scheduled"}
              </div>
              <div>
                <strong className="text-foreground">Leader:</strong> {selectedEvent.teacherName}
              </div>
              <div>
                <strong className="text-foreground">Location:</strong> {selectedEvent.location}
              </div>
              <div className="truncate">
                <strong className="text-foreground">Notes:</strong> {selectedEvent.notes}
              </div>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  );
}
