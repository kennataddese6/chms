"use client";

import Link from "next/link";

import { ArrowLeft, Calendar, Edit, Mail, MapPin, Phone, ShieldCheck } from "lucide-react";
import { toast } from "sonner";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import type { Member } from "@/data/types";
import { getInitials } from "@/lib/utils";

interface MemberProfileHeaderProps {
  member: Member;
}

export function MemberProfileHeader({ member }: MemberProfileHeaderProps) {
  return (
    <div className="space-y-4">
      {/* Back button */}
      <Button variant="ghost" size="sm" asChild className="gap-1.5 text-xs">
        <Link href="/dashboard/members">
          <ArrowLeft className="size-3.5" /> Back to Members Directory
        </Link>
      </Button>

      {/* Header Card */}
      <div className="flex flex-col gap-4 rounded-xl border bg-card p-6 shadow-xs sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
          <Avatar className="size-20 border-2 border-primary/10">
            <AvatarImage src={member.avatarUrl} alt={member.name} />
            <AvatarFallback className="font-bold text-xl">{getInitials(member.name)}</AvatarFallback>
          </Avatar>

          <div className="space-y-1.5">
            <div className="flex flex-wrap items-center gap-2">
              <h1 className="font-bold text-xl tracking-tight">{member.name}</h1>
              <Badge variant={member.status === "active" ? "default" : "secondary"} className="text-xs capitalize">
                {member.status}
              </Badge>
              <Badge variant="outline" className="border-primary/20 bg-primary/5 text-xs">
                <ShieldCheck className="mr-1 size-3 text-primary" />
                Member ID: {member.id}
              </Badge>
            </div>

            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-muted-foreground text-xs">
              <span className="inline-flex items-center gap-1">
                <Mail className="size-3.5 text-primary/70" />
                {member.email}
              </span>
              <span className="inline-flex items-center gap-1">
                <Phone className="size-3.5 text-primary/70" />
                {member.phone}
              </span>
              <span className="inline-flex items-center gap-1">
                <MapPin className="size-3.5 text-primary/70" />
                {member.address}
              </span>
              <span className="inline-flex items-center gap-1">
                <Calendar className="size-3.5 text-primary/70" />
                Joined {member.joinedDate}
              </span>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 sm:self-start">
          <Button
            variant="outline"
            size="sm"
            className="gap-1.5 text-xs"
            onClick={() => toast.info(`Edit mode for ${member.name}`)}
          >
            <Edit className="size-3.5" />
            Edit Profile
          </Button>
        </div>
      </div>
    </div>
  );
}
