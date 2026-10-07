"use client";

import { useState } from "react";

import { Check, Plus, Search } from "lucide-react";

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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
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

    setIsOpen(false);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      {trigger ? <DialogTrigger asChild>{trigger}</DialogTrigger> : null}
      {!trigger && !controlledOpen ? (
        <DialogTrigger asChild>
          <Button className="gap-2">
            <Plus className="size-4" /> Create Group / Ministry
          </Button>
        </DialogTrigger>
      ) : null}

      <DialogContent className="flex max-h-[90vh] max-w-2xl flex-col p-6">
        <DialogHeader>
          <DialogTitle>{editingGroup ? "Edit Group / Ministry" : "Create New Group / Ministry"}</DialogTitle>
          <DialogDescription>
            Organize members into active ministry teams, fellowship groups, prayer circles, or choir.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="flex-1 space-y-4 overflow-y-auto pr-1">
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-2 sm:col-span-1">
              <Label htmlFor="groupName">Group / Ministry Name</Label>
              <Input
                id="groupName"
                placeholder="e.g. Youth Ministry, St. Mary's Choir"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>

            <div className="col-span-2 space-y-2 sm:col-span-1">
              <Label htmlFor="category">Category / Type</Label>
              <Select value={category} onValueChange={(val) => setCategory(val as GroupCategory)}>
                <SelectTrigger id="category">
                  <SelectValue placeholder="Select Category" />
                </SelectTrigger>
                <SelectContent>
                  {GROUP_CATEGORIES.map((cat) => (
                    <SelectItem key={cat} value={cat}>
                      {cat}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Brief summary of ministry goals and activities..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="h-20 text-xs"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 space-y-2 sm:col-span-1">
              <Label htmlFor="leader">Assigned Leader</Label>
              <Select value={leaderId} onValueChange={setLeaderId}>
                <SelectTrigger id="leader">
                  <SelectValue placeholder="Select Leader" />
                </SelectTrigger>
                <SelectContent>
                  {allMembers.map((m) => (
                    <SelectItem key={m.id} value={m.id}>
                      {m.name} ({m.email})
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="col-span-2 space-y-2 sm:col-span-1">
              <Label htmlFor="location">Meeting Location</Label>
              <Input
                id="location"
                placeholder="e.g. Youth Center - Main Hall"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="meetingSchedule">Meeting Schedule</Label>
            <Input
              id="meetingSchedule"
              placeholder="e.g. Saturdays · 4:00 PM"
              value={meetingSchedule}
              onChange={(e) => setMeetingSchedule(e.target.value)}
            />
          </div>

          {/* Member Selector Section */}
          <div className="space-y-3 border-t pt-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="font-semibold text-sm">Select Members ({selectedMemberIds.length} selected)</Label>
                <p className="text-muted-foreground text-xs">Assign church members & students to this group.</p>
              </div>
            </div>

            <div className="relative">
              <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
              <Input
                placeholder="Search members by name or email..."
                value={memberSearch}
                onChange={(e) => setMemberSearch(e.target.value)}
                className="h-9 pl-9 text-xs"
              />
            </div>

            <ScrollArea className="h-44 rounded-md border p-2">
              <div className="space-y-1.5">
                {filteredMembers.map((mem) => {
                  const isSelected = selectedMemberIds.includes(mem.id);
                  return (
                    <button
                      type="button"
                      key={mem.id}
                      onClick={() => toggleMember(mem.id)}
                      className={`flex w-full cursor-pointer items-center justify-between rounded-md border p-2 text-left text-xs transition-colors ${
                        isSelected ? "border-primary/40 bg-primary/10" : "hover:bg-accent/40"
                      }`}
                    >
                      <div className="flex items-center gap-2.5">
                        <Avatar className="size-7">
                          <AvatarImage src={mem.avatarUrl} alt={mem.name} />
                          <AvatarFallback className="text-[10px]">{getInitials(mem.name)}</AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="font-semibold">{mem.name}</span>
                          <span className="text-[10px] text-muted-foreground">{mem.email}</span>
                        </div>
                      </div>

                      <div className="flex items-center gap-2">
                        <Badge variant="outline" className="text-[10px] capitalize">
                          {mem.status}
                        </Badge>
                        <div
                          className={`flex size-5 items-center justify-center rounded border ${
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

          <DialogFooter className="pt-2">
            <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">{editingGroup ? "Save Changes" : "Create Group"}</Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}
