"use client";

import { useState } from "react";

import { ArrowLeft, ArrowRight, Check, Plus, Search } from "lucide-react";

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
import { Textarea } from "@/components/ui/textarea";
import { members as allMembers } from "@/data/members";
import type { ChurchGroup, GroupCategory } from "@/data/types";
import { getInitials } from "@/lib/utils";
import { useGroupsStore } from "@/stores/groups/groups-store";

interface CreateGroupDialogProps {
  editingGroup?: ChurchGroup;
  trigger?: React.ReactNode;
  open?: boolean;
  onOpenChange?: (open: boolean) => void;
}

const GROUP_CATEGORIES: GroupCategory[] = ["Ministry", "Fellowship", "Service", "Discipleship", "Worship"];

export function CreateGroupDialog({
  editingGroup,
  trigger,
  open: controlledOpen,
  onOpenChange: setControlledOpen,
}: CreateGroupDialogProps) {
  const [internalOpen, setInternalOpen] = useState(false);
  const isOpen = controlledOpen ?? internalOpen;
  const setIsOpen = setControlledOpen ?? setInternalOpen;

  const [step, setStep] = useState<1 | 2>(1);

  const { addGroup, updateGroup } = useGroupsStore();

  const [name, setName] = useState(editingGroup?.name ?? "");
  const [description, setDescription] = useState(editingGroup?.description ?? "");
  const [category, setCategory] = useState<GroupCategory>(editingGroup?.category ?? "Ministry");
  const [leaderId, setLeaderId] = useState(editingGroup?.leaderId ?? allMembers[0].id);
  const [meetingSchedule, setMeetingSchedule] = useState(editingGroup?.meetingSchedule ?? "Saturdays · 4:00 PM");
  const [location, setLocation] = useState(editingGroup?.location ?? "Youth Center - Main Hall");
  const [selectedMemberIds, setSelectedMemberIds] = useState<string[]>(
    editingGroup?.memberIds ?? ["m-001", "m-002", "m-003", "m-004"],
  );
  const [memberSearch, setMemberSearch] = useState("");

  const filteredMembers = allMembers.filter(
    (m) =>
      m.name.toLowerCase().includes(memberSearch.toLowerCase()) ||
      m.email.toLowerCase().includes(memberSearch.toLowerCase()),
  );

  const toggleMember = (mId: string) => {
    setSelectedMemberIds((prev) => (prev.includes(mId) ? prev.filter((id) => id !== mId) : [...prev, mId]));
  };

  const handleOpenChange = (newOpen: boolean) => {
    if (!newOpen) {
      setStep(1); // Reset step on close
    }
    setIsOpen(newOpen);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (step === 1) {
      setStep(2);
      return;
    }

    const assignedLeader = allMembers.find((m) => m.id === leaderId) || allMembers[0];

    if (editingGroup) {
      updateGroup(editingGroup.id, {
        name,
        description,
        category,
        leaderId: assignedLeader.id,
        leaderName: assignedLeader.name,
        leaderEmail: assignedLeader.email,
        memberIds: selectedMemberIds,
        memberCount: selectedMemberIds.length,
        meetingSchedule,
        location,
      });
    } else {
      addGroup({
        name: name || "New Church Ministry",
        description: description || "Active church group dedicated to prayer, fellowship, and ministry service.",
        category,
        leaderId: assignedLeader.id,
        leaderName: assignedLeader.name,
        leaderEmail: assignedLeader.email,
        memberIds: selectedMemberIds,
        memberCount: selectedMemberIds.length,
        meetingSchedule,
        location,
        attendanceRate: 90,
        status: "active",
        upcomingEvents: [{ id: `evt-${Date.now()}`, title: "Weekly Group Gathering", date: meetingSchedule, location }],
        recentActivity: [{ id: `act-${Date.now()}`, title: "Group formed by Admin", date: "Just now" }],
      });
    }

    handleOpenChange(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}

      <DialogContent className="flex max-h-[90vh] w-[96vw] max-w-xl sm:max-w-xl flex-col p-6">
        {/* Modal Header */}
        <DialogHeader className="border-b pb-3">
          <div className="flex items-center justify-between">
            <DialogTitle className="font-bold text-lg sm:text-xl">
              {editingGroup ? "Edit Group / Ministry" : "Create New Group / Ministry"}
            </DialogTitle>
            <Badge
              variant="outline"
              className="border-purple-200 bg-purple-500/10 text-purple-700 dark:text-purple-300 text-xs"
            >
              Step {step} of 2
            </Badge>
          </div>
          <DialogDescription className="text-xs">
            {step === 1
              ? "Step 1: Configure ministry category, leader, schedule, and location."
              : "Step 2: Assign church members to this group roster."}
          </DialogDescription>

          {/* Step Progress Tracker Bar */}
          <div className="flex items-center gap-2 pt-2">
            <button
              type="button"
              onClick={() => setStep(1)}
              className={`flex flex-1 items-center gap-2 rounded-md border p-2 text-left text-xs font-semibold transition-colors ${
                step === 1
                  ? "border-purple-500 bg-purple-500/10 text-purple-700 dark:text-purple-300"
                  : "border-muted bg-muted/30 text-muted-foreground hover:bg-muted/50"
              }`}
            >
              <span
                className={`flex size-5 items-center justify-center rounded-full text-[10px] ${
                  step === 1 ? "bg-purple-600 text-white" : "bg-muted-foreground/20"
                }`}
              >
                1
              </span>
              <span>Group Details</span>
            </button>

            <button
              type="button"
              onClick={() => {
                if (name.trim()) setStep(2);
              }}
              className={`flex flex-1 items-center gap-2 rounded-md border p-2 text-left text-xs font-semibold transition-colors ${
                step === 2
                  ? "border-purple-500 bg-purple-500/10 text-purple-700 dark:text-purple-300"
                  : "border-muted bg-muted/30 text-muted-foreground hover:bg-muted/50"
              }`}
            >
              <span
                className={`flex size-5 items-center justify-center rounded-full text-[10px] ${
                  step === 2 ? "bg-purple-600 text-white" : "bg-muted-foreground/20"
                }`}
              >
                2
              </span>
              <span className="truncate">Members ({selectedMemberIds.length} Selected)</span>
            </button>
          </div>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex flex-1 flex-col justify-between pt-2">
          {/* Step 1: Group Configuration */}
          {step === 1 && (
            <div className="space-y-4 py-2">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1.5 sm:col-span-1">
                  <Label htmlFor="groupName" className="text-xs font-semibold">
                    Group / Ministry Name
                  </Label>
                  <Input
                    id="groupName"
                    placeholder="e.g. Youth Ministry, Choir"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="h-9 text-xs"
                    required
                  />
                </div>

                <div className="col-span-2 space-y-1.5 sm:col-span-1">
                  <Label htmlFor="category" className="text-xs font-semibold">
                    Category / Ministry Type
                  </Label>
                  <Select value={category} onValueChange={(val) => setCategory(val as GroupCategory)}>
                    <SelectTrigger id="category" className="h-9 text-xs">
                      <SelectValue placeholder="Select Category" />
                    </SelectTrigger>
                    <SelectContent>
                      {GROUP_CATEGORIES.map((cat) => (
                        <SelectItem key={cat} value={cat} className="text-xs">
                          {cat}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="description" className="text-xs font-semibold">
                  Ministry Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Brief summary of ministry goals and fellowship activities..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  className="h-16 text-xs resize-none"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2 space-y-1.5 sm:col-span-1">
                  <Label htmlFor="leader" className="text-xs font-semibold">
                    Assigned Group Leader
                  </Label>
                  <Select value={leaderId} onValueChange={setLeaderId}>
                    <SelectTrigger id="leader" className="h-9 text-xs">
                      <SelectValue placeholder="Select Leader" />
                    </SelectTrigger>
                    <SelectContent>
                      {allMembers.map((m) => (
                        <SelectItem key={m.id} value={m.id} className="text-xs">
                          {m.name} ({m.email})
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div className="col-span-2 space-y-1.5 sm:col-span-1">
                  <Label htmlFor="location" className="text-xs font-semibold">
                    Meeting Location
                  </Label>
                  <Input
                    id="location"
                    placeholder="e.g. Youth Center - Main Hall"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="h-9 text-xs"
                  />
                </div>
              </div>

              <div className="space-y-1.5">
                <Label htmlFor="meetingSchedule" className="text-xs font-semibold">
                  Meeting Schedule
                </Label>
                <Input
                  id="meetingSchedule"
                  placeholder="e.g. Saturdays · 4:00 PM"
                  value={meetingSchedule}
                  onChange={(e) => setMeetingSchedule(e.target.value)}
                  className="h-9 text-xs"
                />
              </div>
            </div>
          )}

          {/* Step 2: Member Selection */}
          {step === 2 && (
            <div className="space-y-3 py-2">
              <div className="flex items-center justify-between">
                <div>
                  <h4 className="font-semibold text-xs text-foreground">Select Church Members</h4>
                  <p className="text-[11px] text-muted-foreground">Enroll members into {name || category}.</p>
                </div>
                <Badge variant="secondary" className="font-bold text-xs">
                  {selectedMemberIds.length} Selected
                </Badge>
              </div>

              <div className="relative">
                <Search className="absolute top-2.5 left-2.5 size-3.5 text-muted-foreground" />
                <Input
                  placeholder="Search members by name or email..."
                  value={memberSearch}
                  onChange={(e) => setMemberSearch(e.target.value)}
                  className="h-8 pl-8 text-xs"
                />
              </div>

              <ScrollArea className="h-64 rounded-md border p-1.5 bg-background">
                <div className="space-y-1">
                  {filteredMembers.map((mem) => {
                    const isSelected = selectedMemberIds.includes(mem.id);
                    return (
                      <button
                        type="button"
                        key={mem.id}
                        onClick={() => toggleMember(mem.id)}
                        className={`flex w-full cursor-pointer items-center justify-between rounded-md border p-2 text-left text-xs transition-colors ${
                          isSelected ? "border-purple-500/40 bg-purple-500/10" : "hover:bg-accent/50"
                        }`}
                      >
                        <div className="flex items-center gap-2.5">
                          <Avatar className="size-7">
                            <AvatarImage src={mem.avatarUrl} alt={mem.name} />
                            <AvatarFallback className="text-[10px]">{getInitials(mem.name)}</AvatarFallback>
                          </Avatar>
                          <div className="flex flex-col min-w-0">
                            <span className="truncate font-semibold text-xs">{mem.name}</span>
                            <span className="truncate text-[10px] text-muted-foreground">{mem.email}</span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 shrink-0">
                          <Badge variant="outline" className="text-[10px] capitalize">
                            {mem.status}
                          </Badge>
                          <div
                            className={`flex size-4 items-center justify-center rounded border ${
                              isSelected ? "border-purple-600 bg-purple-600 text-white" : "border-muted-foreground/40"
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
          <DialogFooter className="border-t pt-3 mt-3 flex items-center justify-between sm:justify-between w-full">
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
                  className="gap-1.5 text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white"
                >
                  Next: Select Members <ArrowRight className="size-3.5" />
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
                <Button
                  type="submit"
                  size="sm"
                  className="text-xs font-semibold bg-purple-600 hover:bg-purple-700 text-white"
                >
                  {editingGroup ? "Save Changes" : "Create Group / Ministry"}
                </Button>
              </>
            )}
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
