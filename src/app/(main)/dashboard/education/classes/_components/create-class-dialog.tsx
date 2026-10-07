"use client";

import { useState } from "react";

import { ArrowLeft, ArrowRight, Check, Search } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { students as allStudents } from "@/data/students";
import { teachers as allTeachers } from "@/data/teachers";
import type { EducationClass, EducationLevel } from "@/data/types";
import { getInitials } from "@/lib/utils";
import { useClassesStore } from "@/stores/classes/classes-store";

interface CreateClassDialogProps {
  editingClass?: EducationClass;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const GRADE_LEVEL_OPTIONS: { grade: string; level: EducationLevel; nextGrade: string }[] = [
  { grade: "Grade 1", level: "grade-1", nextGrade: "Grade 2" },
  { grade: "Grade 2", level: "grade-2", nextGrade: "Grade 3" },
  { grade: "Grade 3", level: "junior", nextGrade: "Grade 4" },
  { grade: "Grade 4", level: "junior", nextGrade: "Grade 5" },
  { grade: "Grade 5", level: "junior", nextGrade: "Grade 6" },
  { grade: "Grade 6", level: "senior", nextGrade: "Grade 7" },
  { grade: "Grade 7", level: "senior", nextGrade: "Grade 8" },
  { grade: "Grade 8", level: "senior", nextGrade: "Grade 9" },
  { grade: "Grade 9", level: "graduate", nextGrade: "Grade 10" },
  { grade: "Grade 10", level: "graduate", nextGrade: "Grade 11" },
  { grade: "Grade 11", level: "candidate", nextGrade: "Grade 12" },
  { grade: "Grade 12", level: "candidate", nextGrade: "Graduation Class" },
  { grade: "Graduation Class", level: "candidate", nextGrade: "Graduated Alumni" },
];

export function CreateClassDialog({
  editingClass,
  trigger,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: CreateClassDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen ?? internalOpen;
  const setIsOpen = setControlledOpen ?? setInternalOpen;

  const [step, setStep] = useState<1 | 2>(1);

  const { addClass, updateClass } = useClassesStore();

  const [name, setName] = useState(editingClass?.name ?? "");
  const [gradeLevel, setGradeLevel] = useState(editingClass?.gradeLevel ?? "Grade 1");
  const [teacherId, setTeacherId] = useState(editingClass?.teacherId ?? allTeachers[0].id);
  const [room, setRoom] = useState(editingClass?.room ?? "Room 101 - Primary Wing");
  const [schedule, setSchedule] = useState(editingClass?.schedule ?? "Sundays 09:30 - 10:45 AM");
  const [selectedStudentIds, setSelectedStudentIds] = useState<string[]>(
    editingClass?.studentIds ?? ["s-001", "s-002", "s-005"],
  );
  const [studentSearch, setStudentSearch] = useState("");

  const selectedGradeObj = GRADE_LEVEL_OPTIONS.find((g) => g.grade === gradeLevel) || GRADE_LEVEL_OPTIONS[0];

  const filteredStudents = allStudents.filter(
    (s) =>
      s.name.toLowerCase().includes(studentSearch.toLowerCase()) ||
      s.email.toLowerCase().includes(studentSearch.toLowerCase()),
  );

  const toggleStudent = (sId: string) => {
    setSelectedStudentIds((prev) => (prev.includes(sId) ? prev.filter((id) => id !== sId) : [...prev, sId]));
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setStep(1); // Reset to Step 1 on close
    }
    setIsOpen(newOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }

    const assignedTeacher = allTeachers.find((t) => t.id === teacherId) || allTeachers[0];

    if (editingClass) {
      updateClass(editingClass.id, {
        name,
        gradeLevel: selectedGradeObj.grade,
        level: selectedGradeObj.level,
        teacherId: assignedTeacher.id,
        teacherName: assignedTeacher.name,
        studentIds: selectedStudentIds,
        studentCount: selectedStudentIds.length,
        room,
        schedule,
        progressionNextGrade: selectedGradeObj.nextGrade,
      });
    } else {
      addClass({
        name: name || `${selectedGradeObj.grade} Cohort`,
        gradeLevel: selectedGradeObj.grade,
        level: selectedGradeObj.level,
        teacherId: assignedTeacher.id,
        teacherName: assignedTeacher.name,
        studentIds: selectedStudentIds,
        studentCount: selectedStudentIds.length,
        attendanceRate: 92,
        averageGrade: 85,
        status: "active",
        room,
        schedule,
        courseIds: ["crs-001"],
        progressionNextGrade: selectedGradeObj.nextGrade,
        recentActivity: [{ id: `act-${Date.now()}`, title: "Class created by Admin", date: "Just now" }],
      });
    }

    handleOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}

      <DialogContent className="flex max-h-[90vh] w-[96vw] max-w-xl flex-col p-6 sm:max-w-xl">
        {/* Modal Header */}
        <DialogHeader className="border-b pb-3">
          <div className="flex items-center justify-between">
            <DialogTitle className="font-bold text-lg sm:text-xl">
              {editingClass ? "Edit Education Class" : "Create New Education Class"}
            </DialogTitle>
            <Badge variant="outline" className="border-primary/20 bg-primary/10 text-primary text-xs">
              Step {step} of 2
            </Badge>
          </div>
          <DialogDescription className="text-xs">
            {step === 1
              ? "Step 1: Configure cohort details, grade level, and meeting schedule."
              : "Step 2: Select students from the church directory for this class roster."}
          </DialogDescription>

          {/* Multi-Step Progress Tracker Bar */}
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className={`flex flex-1 items-center gap-2 rounded-md border p-2 text-left font-semibold text-xs transition-colors ${
                step === 1
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-muted bg-muted/30 text-muted-foreground hover:bg-muted/50"
              }`}
            >
              <span
                className={`flex size-5 items-center justify-center rounded-full text-[10px] ${
                  step === 1 ? "bg-primary text-primary-foreground" : "bg-muted-foreground/20"
                }`}
              >
                1
              </span>
              <span>Cohort & Schedule</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (name.trim()) setStep(2);
              }}
              className={`flex flex-1 items-center gap-2 rounded-md border p-2 text-left font-semibold text-xs transition-colors ${
                step === 2
                  ? "border-primary bg-primary/10 text-primary"
                  : "border-muted bg-muted/30 text-muted-foreground hover:bg-muted/50"
              }`}
            >
              <span
                className={`flex size-5 items-center justify-center rounded-full text-[10px] ${
                  step === 2 ? "bg-primary text-primary-foreground" : "bg-muted-foreground/20"
                }`}
              >
                2
              </span>
              <span className="truncate">Roster ({selectedStudentIds.length} Selected)</span>
            </button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col justify-between pt-2">
          {/* Step 1: Cohort Settings */}
          {step === 1 && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1.5 sm:col-span-1">
                  <Label htmlFor="className" className="font-semibold text-xs">
                    Class / Cohort Name
                  </Label>
                  <Input
                    id="className"
                    placeholder="e.g. Grade 1 Cohort A"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-9 text-xs"
                    required
                  />
                </div>

                <div className="col-span-2 space-y-1.5 sm:col-span-1">
                  <Label htmlFor="gradeLevel" className="font-semibold text-xs">
                    Grade / Academic Level
                  </Label>
                  <Select value={gradeLevel} onValueChange={setGradeLevel}>
                    <SelectTrigger id="gradeLevel" className="h-9 text-xs">
                      <SelectValue placeholder="Select Grade" />
                    </SelectTrigger>
                    <SelectContent>
                      {GRADE_LEVEL_OPTIONS.map((g) => (
                        <SelectItem key={g.grade} value={g.grade} className="text-xs">
                          {g.grade}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1.5 sm:col-span-1">
                  <Label htmlFor="teacher" className="font-semibold text-xs">
                    Assigned Teacher
                  </Label>
                  <Select value={teacherId} onValueChange={setTeacherId}>
                    <SelectTrigger id="teacher" className="h-9 text-xs">
                      <SelectValue placeholder="Select Teacher" />
                    </SelectTrigger>
                    <SelectContent>
                      {allTeachers.map((t) => (
                        <SelectItem key={t.id} value={t.id} className="text-xs">
                          {t.name} ({t.title})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2 space-y-1.5 sm:col-span-1">
                  <Label htmlFor="room" className="font-semibold text-xs">
                    Room & Location
                  </Label>
                  <Input
                    id="room"
                    placeholder="e.g. Room 102 - Primary Wing"
                    value={room}
                    onChange={(e) => setRoom(e.target.value)}
                    className="h-9 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="schedule" className="font-semibold text-xs">
                  Meeting Schedule
                </Label>
                <Input
                  id="schedule"
                  placeholder="e.g. Sundays 09:30 - 10:45 AM"
                  value={schedule}
                  onChange={(e) => setSchedule(e.target.value)}
                  className="h-9 text-xs"
                />
              </div>

              <div className="rounded-md border bg-muted/40 p-2.5 text-muted-foreground text-xs">
                <strong className="text-foreground">Next Cohort Pathway:</strong> Students in {selectedGradeObj.grade}{" "}
                will advance to <strong>{selectedGradeObj.nextGrade}</strong> upon term completion.
              </div>
            </div>
          )}

          {/* Step 2: Roster Selection */}
          {step === 2 && (
            <div className="space-y-3 py-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-foreground text-xs">Select Enrolled Students</h4>
                  <p className="text-[11px] text-muted-foreground">
                    Directory search for {name || selectedGradeObj.grade}.
                  </p>
                </div>
                <Badge variant="secondary" className="font-bold text-xs">
                  {selectedStudentIds.length} Selected
                </Badge>
              </div>

              <div className="relative">
                <Search className="absolute top-2.5 left-2.5 size-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search directory by student name or email..."
                  value={studentSearch}
                  onChange={(e) => setStudentSearch(e.target.value)}
                  className="h-8 pl-8 text-xs"
                />
              </div>

              <ScrollArea className="h-64 rounded-md border bg-background p-1.5">
                <div className="space-y-1">
                  {filteredStudents.map((std) => {
                    const isSelected = selectedStudentIds.includes(std.id);
                    return (
                      <button
                        type="button"
                        key={std.id}
                        onClick={() => toggleStudent(std.id)}
                        className={`flex w-full cursor-pointer items-center justify-between rounded-md border p-2 text-left text-xs transition-colors ${
                          isSelected ? "border-primary/40 bg-primary/10" : "hover:bg-accent/50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Avatar className="size-7">
                            <AvatarImage src={std.avatarUrl} alt={std.name} />
                            <AvatarFallback className="text-[10px]">{getInitials(std.name)}</AvatarFallback>
                          </Avatar>
                          <div className="flex min-w-0 flex-col">
                            <span className="truncate font-semibold text-xs">{std.name}</span>
                            <span className="truncate text-[10px] text-muted-foreground">{std.email}</span>
                          </div>
                        </div>

                        <div className="flex shrink-0 items-center gap-2">
                          <Badge variant="outline" className="text-[10px] capitalize">
                            {std.level}
                          </Badge>
                          <div
                            className={`flex size-4 items-center justify-center rounded border ${
                              isSelected
                                ? "border-primary bg-primary text-primary-foreground"
                                : "border-muted-foreground/40"
                            }`}
                          >
                            {isSelected && <Check className="size-3" />}
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </ScrollArea>
            </div>
          )}

          {/* Form Footer */}
          <DialogFooter className="mt-3 flex w-full items-center justify-between border-t pt-3 sm:justify-between">
            {step === 1 ? (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => handleOpenChange(false)}
                  className="text-xs"
                >
                  Cancel
                </Button>
                <Button
                  type="button"
                  size="sm"
                  onClick={() => {
                    if (name.trim()) setStep(2);
                  }}
                  className="gap-1.5 font-semibold text-xs"
                >
                  Next: Select Roster <ArrowRight className="size-3.5" />
                </Button>
              </>
            ) : (
              <>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={() => setStep(1)}
                  className="gap-1.5 text-xs"
                >
                  <ArrowLeft className="size-3.5" /> Back to Setup
                </Button>
                <Button type="submit" size="sm" className="font-semibold text-xs">
                  {editingClass ? "Save Changes" : "Create Class Cohort"}
                </Button>
              </>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
