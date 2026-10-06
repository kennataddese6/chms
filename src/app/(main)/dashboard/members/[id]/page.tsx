import { notFound } from "next/navigation";

import { members } from "@/data/members";

import { MemberProfileHeader } from "../_components/member-profile-header";
import { MemberProfileTabs } from "../_components/member-profile-tabs";

interface MemberProfilePageProps {
  params: Promise<{ id: string }>;
}

export default async function MemberProfilePage({ params }: MemberProfilePageProps) {
  const { id } = await params;
  const member = members.find((m) => m.id === id);

  if (!member) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <MemberProfileHeader member={member} />
      <MemberProfileTabs member={member} />
    </div>
  );
}
