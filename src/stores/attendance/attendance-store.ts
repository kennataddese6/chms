import { create } from "zustand";

import { sundayServiceAttendance as initialAttendance } from "@/data/attendance";
import type { AttendanceRecord, AttendanceStatus } from "@/data/types";

interface AttendanceState {
  records: AttendanceRecord[];
  markAttendance: (memberId: string, status: AttendanceStatus, eventId?: string) => void;
  markAllPresent: (eventId?: string) => void;
  resetAttendance: () => void;
}

export const useAttendanceStore = create<AttendanceState>((set) => ({
  records: initialAttendance,

  markAttendance: (memberId, status, eventId = "evt-001") =>
    set((state) => {
      const existing = state.records.find((r) => r.memberId === memberId && r.eventId === eventId);
      if (existing) {
        return {
          records: state.records.map((r) => (r.memberId === memberId && r.eventId === eventId ? { ...r, status } : r)),
        };
      }
      return {
        records: [
          ...state.records,
          {
            id: `att-${Date.now()}-${memberId}`,
            eventId,
            memberId,
            memberName: "Member",
            status,
            date: new Date().toISOString().split("T")[0],
          },
        ],
      };
    }),

  markAllPresent: (eventId = "evt-001") =>
    set((state) => ({
      records: state.records.map((r) => (r.eventId === eventId ? { ...r, status: "present" } : r)),
    })),

  resetAttendance: () => set({ records: initialAttendance }),
}));
