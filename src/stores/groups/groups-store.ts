import { create } from "zustand";

import { initialChurchGroups } from "@/data/groups";
import type { ChurchGroup } from "@/data/types";

interface GroupsState {
  groups: ChurchGroup[];
  addGroup: (newGroupData: Omit<ChurchGroup, "id">) => ChurchGroup;
  updateGroup: (id: string, updatedFields: Partial<ChurchGroup>) => void;
  deleteGroup: (id: string) => void;
  addMemberToGroup: (groupId: string, memberId: string) => void;
  removeMemberFromGroup: (groupId: string, memberId: string) => void;
  getGroupById: (id: string) => ChurchGroup | undefined;
  getGroupsForMember: (memberId: string) => ChurchGroup[];
}

export const useGroupsStore = create<GroupsState>((set, get) => ({
  groups: initialChurchGroups,

  addGroup: (newGroupData) => {
    const id = `grp-${Date.now()}`;
    const newGroup: ChurchGroup = {
      ...newGroupData,
      id,
      memberCount: newGroupData.memberIds ? newGroupData.memberIds.length : newGroupData.memberCount || 0,
    };

    set((state) => ({
      groups: [newGroup, ...state.groups],
    }));

    return newGroup;
  },

  updateGroup: (id, updatedFields) => {
    set((state) => ({
      groups: state.groups.map((g) => {
        if (g.id !== id) return g;
        const updated = { ...g, ...updatedFields };
        if (updatedFields.memberIds) {
          updated.memberCount = updatedFields.memberIds.length;
        }
        return updated;
      }),
    }));
  },

  deleteGroup: (id) => {
    set((state) => ({
      groups: state.groups.filter((g) => g.id !== id),
    }));
  },

  addMemberToGroup: (groupId, memberId) => {
    set((state) => ({
      groups: state.groups.map((g) => {
        if (g.id !== groupId) return g;
        if (g.memberIds.includes(memberId)) return g;
        const memberIds = [...g.memberIds, memberId];
        return {
          ...g,
          memberIds,
          memberCount: memberIds.length,
        };
      }),
    }));
  },

  removeMemberFromGroup: (groupId, memberId) => {
    set((state) => ({
      groups: state.groups.map((g) => {
        if (g.id !== groupId) return g;
        const memberIds = g.memberIds.filter((mId) => mId !== memberId);
        return {
          ...g,
          memberIds,
          memberCount: memberIds.length,
        };
      }),
    }));
  },

  getGroupById: (id) => get().groups.find((g) => g.id === id),

  getGroupsForMember: (memberId) =>
    get().groups.filter((g) => g.memberIds.includes(memberId) || g.leaderId === memberId),
}));
