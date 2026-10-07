"use client";

import { useState } from "react";

import { useRouter } from "next/navigation";

import { ChevronLeft, ChevronRight, Info } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { Member } from "@/data/types";
import { getInitials } from "@/lib/utils";

import { MembersToolbar } from "./members-toolbar";

interface MembersTableProps {
  initialMembers: Member[];
}

export function MembersTable({ initialMembers }: MembersTableProps) {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [groupFilter, setGroupFilter] = useState("all");
  const [pageIndex, setPageIndex] = useState(0);
  const pageSize = 10;

  const filteredData = initialMembers.filter((m) => {
    const matchesSearch =
      m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      m.phone.includes(searchQuery);

    const matchesStatus = statusFilter === "all" || m.status === statusFilter;

    const matchesGroup = groupFilter === "all" || m.groups.some((g) => g.toLowerCase() === groupFilter.toLowerCase());

    return matchesSearch && matchesStatus && matchesGroup;
  });

  const totalOrganizationMembers = 427;
  const totalPages = Math.ceil(totalOrganizationMembers / pageSize);

  const paginatedRows = filteredData.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize);

  const handleResetFilters = () => {
    setSearchQuery("");
    setStatusFilter("all");
    setGroupFilter("all");
    setPageIndex(0);
  };

  return (
    <div className="space-y-4">
      <MembersToolbar
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        statusFilter={statusFilter}
        setStatusFilter={setStatusFilter}
        groupFilter={groupFilter}
        setGroupFilter={setGroupFilter}
        onReset={handleResetFilters}
      />

      <div className="rounded-md border bg-card">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead className="font-semibold text-xs">Member Name</TableHead>
              <TableHead className="font-semibold text-xs">Phone</TableHead>
              <TableHead className="font-semibold text-xs">Status</TableHead>
              <TableHead className="font-semibold text-xs">Ministry / Group</TableHead>
              <TableHead className="font-semibold text-xs">Attendance Rate</TableHead>
              <TableHead className="font-semibold text-xs">Joined Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {paginatedRows.length ? (
              paginatedRows.map((member) => (
                <TableRow
                  key={member.id}
                  className="cursor-pointer transition-colors hover:bg-muted/50"
                  onClick={() => router.push(`/dashboard/members/${member.id}`)}
                >
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <Avatar className="size-8">
                        <AvatarImage src={member.avatarUrl} alt={member.name} />
                        <AvatarFallback>{getInitials(member.name)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <span className="font-semibold text-xs leading-tight">{member.name}</span>
                        <span className="text-[11px] text-muted-foreground">{member.email}</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-xs">{member.phone}</TableCell>
                  <TableCell className="py-3">
                    <Badge
                      variant={
                        member.status === "active" ? "default" : member.status === "new" ? "secondary" : "outline"
                      }
                      className="text-[10px] capitalize"
                    >
                      {member.status}
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex flex-wrap gap-1">
                      {member.groups.slice(0, 2).map((grp) => (
                        <Badge key={grp} variant="outline" className="bg-muted/30 text-[10px]">
                          {grp}
                        </Badge>
                      ))}
                      {member.groups.length > 2 && (
                        <span className="text-[10px] text-muted-foreground">+{member.groups.length - 2}</span>
                      )}
                    </div>
                  </TableCell>
                  <TableCell className="py-3">
                    <span
                      className={`font-semibold text-xs ${
                        member.attendanceRate >= 80
                          ? "text-emerald-600 dark:text-emerald-400"
                          : member.attendanceRate >= 60
                            ? "text-amber-600"
                            : "text-red-600"
                      }`}
                    >
                      {member.attendanceRate}%
                    </span>
                  </TableCell>
                  <TableCell className="py-3 text-muted-foreground text-xs">{member.joinedDate}</TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="h-24 text-center text-muted-foreground text-xs">
                  No members found matching your filters.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination & Prototype Indicator */}
      <div className="flex flex-col gap-2 text-muted-foreground text-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex items-center gap-1.5">
          <Info className="size-3.5 shrink-0 text-primary/70" />
          <span>
            Showing {paginatedRows.length} of {totalOrganizationMembers} total members (representative demo subset)
          </span>
        </div>
        <div className="flex items-center gap-2 self-end sm:self-auto">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
            disabled={pageIndex === 0}
            className="h-8 w-8 p-0"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <span>
            Page {pageIndex + 1} of {totalPages}
          </span>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPageIndex((p) => Math.min(totalPages - 1, p + 1))}
            disabled={pageIndex >= totalPages - 1 || paginatedRows.length < pageSize}
            className="h-8 w-8 p-0"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
