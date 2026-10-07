"use client";

import { useState } from "react";

import { PlusCircle } from "lucide-react";
import { toast } from "sonner";

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
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import type { Course, EducationLevel, Subject } from "@/data/types";

interface CreateCourseDialogProps {
  onAddCourse: (course: Course) => void;
}

export function CreateCourseDialog({ onAddCourse }: CreateCourseDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [level, setLevel] = useState<EducationLevel>("senior");
  const [subject, setSubject] = useState<Subject>("Bible Studies");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title) return;

    const newCourse: Course = {
      id: `crs-${Date.now()}`,
      title,
      description: description || "New education course curriculum.",
      level,
      subject,
      teacherId: "t-001",
      teacherName: "Fr. James Osei",
      lessonCount: 4,
      enrolledStudents: 25,
      status: "active",
    };

    onAddCourse(newCourse);
    toast.success(`Course "${title}" created successfully!`);
    setOpen(false);
    setTitle("");
    setDescription("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-9 gap-1.5">
          <PlusCircle className="size-4" />
          Create Course
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create New Course</DialogTitle>
            <DialogDescription>Add a new curriculum course to St. Mary&apos;s education platform.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="c-title" className="text-xs">
                Course Title
              </Label>
              <Input
                id="c-title"
                placeholder="e.g. Introduction to Christian Ethics"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div className="grid gap-2">
                <Label htmlFor="c-level" className="text-xs">
                  Education Level
                </Label>
                <Select value={level} onValueChange={(val) => setLevel(val as EducationLevel)}>
                  <SelectTrigger id="c-level" className="h-9 text-xs">
                    <SelectValue placeholder="Level" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="grade-1">Grade 1</SelectItem>
                    <SelectItem value="grade-2">Grade 2</SelectItem>
                    <SelectItem value="junior">Junior</SelectItem>
                    <SelectItem value="senior">Senior</SelectItem>
                    <SelectItem value="graduate">Graduate</SelectItem>
                    <SelectItem value="candidate">Candidate</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid gap-2">
                <Label htmlFor="c-subject" className="text-xs">
                  Subject
                </Label>
                <Select value={subject} onValueChange={(val) => setSubject(val as Subject)}>
                  <SelectTrigger id="c-subject" className="h-9 text-xs">
                    <SelectValue placeholder="Subject" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Bible Studies">Bible Studies</SelectItem>
                    <SelectItem value="Theology">Theology</SelectItem>
                    <SelectItem value="Church History">Church History</SelectItem>
                    <SelectItem value="Scripture">Scripture</SelectItem>
                    <SelectItem value="Christian Ethics">Christian Ethics</SelectItem>
                    <SelectItem value="Pastoral Care">Pastoral Care</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid gap-2">
              <Label htmlFor="c-desc" className="text-xs">
                Description
              </Label>
              <Textarea
                id="c-desc"
                placeholder="Overview of course objectives and scope..."
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                className="min-h-[70px] text-xs"
              />
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Course</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
