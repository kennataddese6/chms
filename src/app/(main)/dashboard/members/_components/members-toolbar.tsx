"use client";

import { useState } from "react";

import { RotateCcw, Search, UserPlus } from "lucide-react";
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

interface MembersToolbarProps {
  searchQuery: string;
  setSearchQuery: (q: string) => void;
  statusFilter: string;
  setStatusFilter: (s: string) => void;
  groupFilter: string;
  setGroupFilter: (g: string) => void;
  onReset: () => void;
}

export function MembersToolbar({
  searchQuery,
  setSearchQuery,
  statusFilter,
  setStatusFilter,
  groupFilter,
  setGroupFilter,
  onReset,
}: MembersToolbarProps) {
  const [openAddDialog, setOpenAddDialog] = useState(false);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");

  const handleAddMember = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !email) return;
    toast.success(`Member "${name}" added successfully!`);
    setOpenAddDialog(false);
    setName("");
    setEmail("");
    setPhone("");
  };

  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
      <div className="flex flex-wrap items-center gap-2">
        {/* Search */}
        <div className="relative w-full sm:w-64">
          <Search className="absolute top-2.5 left-2.5 size-4 text-muted-foreground" />
          <Input
            placeholder="Search by name, email..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="h-9 pl-8 text-xs"
          />
        </div>

        {/* Status Filter */}
        <Select value={statusFilter} onValueChange={setStatusFilter}>
          <SelectTrigger className="h-9 w-[130px] text-xs">
            <SelectValue placeholder="Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Statuses</SelectItem>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
            <SelectItem value="new">New</SelectItem>
          </SelectContent>
        </Select>

        {/* Group Filter */}
        <Select value={groupFilter} onValueChange={setGroupFilter}>
          <SelectTrigger className="h-9 w-[150px] text-xs">
            <SelectValue placeholder="Ministry / Group" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All Groups</SelectItem>
            <SelectItem value="Choir">Choir</SelectItem>
            <SelectItem value="Youth">Youth</SelectItem>
            <SelectItem value="Elders">Elders</SelectItem>
            <SelectItem value="Women's Ministry">Women&apos;s Ministry</SelectItem>
            <SelectItem value="Men's Fellowship">Men&apos;s Fellowship</SelectItem>
            <SelectItem value="Sunday School">Sunday School</SelectItem>
            <SelectItem value="Prayer Team">Prayer Team</SelectItem>
          </SelectContent>
        </Select>

        {(searchQuery || statusFilter !== "all" || groupFilter !== "all") && (
          <Button variant="ghost" size="sm" onClick={onReset} className="h-9 gap-1 px-2 text-xs">
            <RotateCcw className="size-3.5" />
            Reset
          </Button>
        )}
      </div>

      {/* Add Member Dialog */}
      <Dialog open={openAddDialog} onOpenChange={setOpenAddDialog}>
        <DialogTrigger asChild>
          <Button size="sm" className="h-9 gap-1.5">
            <UserPlus className="size-4" />
            Add Member
          </Button>
        </DialogTrigger>
        <DialogContent className="sm:max-w-[425px]">
          <form onSubmit={handleAddMember}>
            <DialogHeader>
              <DialogTitle>Register New Member</DialogTitle>
              <DialogDescription>Add a new church member to St. Mary&apos;s directory.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name" className="text-xs">
                  Full Name
                </Label>
                <Input
                  id="name"
                  placeholder="e.g. Samuel K. Mensah"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="email" className="text-xs">
                  Email Address
                </Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="e.g. samuel@example.co.uk"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="phone" className="text-xs">
                  Phone Number
                </Label>
                <Input
                  id="phone"
                  placeholder="e.g. 07700 900123"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setOpenAddDialog(false)}>
                Cancel
              </Button>
              <Button type="submit">Save Member</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
}
