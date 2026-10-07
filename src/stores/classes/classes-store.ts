import { create } from "zustand";

import { initialEducationClasses } from "@/data/classes";
import type { EducationClass } from "@/data/types";

interface ClassesState {
  classes: EducationClass[];
  addClass: (newClassData: Omit<EducationClass, "id">) => EducationClass;
  updateClass: (id: string, updatedFields: Partial<EducationClass>) => void;
  deleteClass: (id: string) => void;
  assignStudentToClass: (classId: string, studentId: string) => void;
  removeStudentFromClass: (classId: string, studentId: string) => void;
  getClassById: (id: string) => EducationClass | undefined;
}

export const useClassesStore = create<ClassesState>((set, get) => ({
  classes: initialEducationClasses,

  addClass: (newClassData) => {
    const id = `cls-${Date.now()}`;
    const newClass: EducationClass = {
      ...newClassData,
      id,
      studentCount: newClassData.studentIds ? newClassData.studentIds.length : newClassData.studentCount || 0,
    };

    set((state) => ({
      classes: [newClass, ...state.classes],
    }));

    return newClass;
  },

  updateClass: (id, updatedFields) => {
    set((state) => ({
      classes: state.classes.map((c) => {
        if (c.id !== id) return c;
        const updated = { ...c, ...updatedFields };
        if (updatedFields.studentIds) {
          updated.studentCount = updatedFields.studentIds.length;
        }
        return updated;
      }),
    }));
  },

  deleteClass: (id) => {
    set((state) => ({
      classes: state.classes.filter((c) => c.id !== id),
    }));
  },

  assignStudentToClass: (classId, studentId) => {
    set((state) => ({
      classes: state.classes.map((c) => {
        if (c.id !== classId) return c;
        if (c.studentIds.includes(studentId)) return c;
        const studentIds = [...c.studentIds, studentId];
        return {
          ...c,
          studentIds,
          studentCount: studentIds.length,
        };
      }),
    }));
  },

  removeStudentFromClass: (classId, studentId) => {
    set((state) => ({
      classes: state.classes.map((c) => {
        if (c.id !== classId) return c;
        const studentIds = c.studentIds.filter((sId) => sId !== studentId);
        return {
          ...c,
          studentIds,
          studentCount: studentIds.length,
        };
      }),
    }));
  },

  getClassById: (id) => get().classes.find((c) => c.id === id),
}));
