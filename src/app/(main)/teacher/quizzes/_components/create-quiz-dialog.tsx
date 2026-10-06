"use client";

import { useState } from "react";

import { HelpCircle, PlusCircle } from "lucide-react";
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
import type { Quiz, Subject } from "@/data/types";

interface CreateQuizDialogProps {
  onAddQuiz: (quiz: Quiz) => void;
}

export function CreateQuizDialog({ onAddQuiz }: CreateQuizDialogProps) {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [subject, setSubject] = useState<Subject>("Bible Studies");
  const [q1, setQ1] = useState("");
  const [opt1, setOpt1] = useState("");
  const [opt2, setOpt2] = useState("");
  const [opt3, setOpt3] = useState("");
  const [opt4, setOpt4] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title || !q1) return;

    const newQuiz: Quiz = {
      id: `quiz-${Date.now()}`,
      lessonId: "les-001",
      courseId: "crs-001",
      title,
      subject,
      questionCount: 1,
      questions: [
        {
          id: `q-${Date.now()}`,
          question: q1,
          options: [opt1 || "Option A", opt2 || "Option B", opt3 || "Option C", opt4 || "Option D"],
          correctAnswer: 0,
        },
      ],
    };

    onAddQuiz(newQuiz);
    toast.success(`Quiz "${title}" created successfully!`);
    setOpen(false);
    setTitle("");
    setQ1("");
    setOpt1("");
    setOpt2("");
    setOpt3("");
    setOpt4("");
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button size="sm" className="h-9 gap-1.5">
          <PlusCircle className="size-4" />
          Build New Quiz
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px]">
        <form onSubmit={handleSubmit}>
          <DialogHeader>
            <DialogTitle>Create Lesson Quiz</DialogTitle>
            <DialogDescription>Add a quiz assessment for student learning checks.</DialogDescription>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid gap-2">
              <Label htmlFor="q-title" className="text-xs">
                Quiz Title
              </Label>
              <Input
                id="q-title"
                placeholder="e.g. Quiz 4: Pauline Epistles & Theology"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="grid gap-2">
              <Label htmlFor="q-subj" className="text-xs">
                Subject
              </Label>
              <Select value={subject} onValueChange={(val) => setSubject(val as Subject)}>
                <SelectTrigger id="q-subj" className="h-9 text-xs">
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

            <div className="border-t pt-3 space-y-3">
              <Label className="text-xs font-bold">Question 1</Label>
              <Input
                placeholder="Enter question text..."
                value={q1}
                onChange={(e) => setQ1(e.target.value)}
                required
                className="text-xs"
              />
              <div className="grid grid-cols-2 gap-2 text-xs">
                <Input
                  placeholder="Option 1 (Correct Answer)"
                  value={opt1}
                  onChange={(e) => setOpt1(e.target.value)}
                  className="border-emerald-500/50"
                />
                <Input placeholder="Option 2" value={opt2} onChange={(e) => setOpt2(e.target.value)} />
                <Input placeholder="Option 3" value={opt3} onChange={(e) => setOpt3(e.target.value)} />
                <Input placeholder="Option 4" value={opt4} onChange={(e) => setOpt4(e.target.value)} />
              </div>
            </div>
          </div>
          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Save Quiz</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
