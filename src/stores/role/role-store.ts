import { create } from "zustand";

import type { UserRole } from "@/data/types";

export interface UserIdentity {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatarUrl: string;
  title?: string;
  level?: string;
}

export const DEMO_USERS: Record<UserRole, UserIdentity> = {
  admin: {
    id: "u-admin",
    name: "St. Mary's Administrator",
    email: "admin@stmarys.org.uk",
    role: "admin",
    avatarUrl: "",
    title: "Church Administrator",
  },
  teacher: {
    id: "t-001",
    name: "Fr. James Osei",
    email: "fr.osei@stmarys.org.uk",
    role: "teacher",
    avatarUrl: "",
    title: "Senior Catechist & Bible Teacher",
  },
  student: {
    id: "s-001",
    name: "Daniel Tesfaye",
    email: "daniel.tesfaye@email.co.uk",
    role: "student",
    avatarUrl: "",
    level: "senior",
    title: "Senior Level Student",
  },
};

interface RoleState {
  currentRole: UserRole;
  user: UserIdentity;
  setRole: (role: UserRole) => void;
}

export const useRoleStore = create<RoleState>((set) => ({
  currentRole: "admin",
  user: DEMO_USERS.admin,
  setRole: (role: UserRole) =>
    set({
      currentRole: role,
      user: DEMO_USERS[role],
    }),
}));
