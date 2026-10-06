import type { Metadata } from "next";

import { APP_CONFIG } from "@/config/app-config";

import { BuiltAroundChurchSection } from "./_components/built-around-church-section";
import { ChurchManagementSection } from "./_components/church-management-section";
import { EducationSection } from "./_components/education-section";
import { LandingFooter } from "./_components/landing-footer";
import { LandingHeader } from "./_components/landing-header";
import { LandingHero } from "./_components/landing-hero";
import { ThreeExperiencesSection } from "./_components/three-experiences-section";
import styles from "./landing.module.css";

export const metadata: Metadata = {
  title: `${APP_CONFIG.name} — Church Management & Education Platform`,
  description:
    "Manage your church community, coordinate ministry and education, and give students a structured path from learning to progression — all in one connected platform.",
  alternates: {
    canonical: "/",
  },
};

export default function Home() {
  return (
    <div className={`${styles.landing} min-h-screen bg-background text-foreground`}>
      <LandingHeader />
      <main>
        <LandingHero />
        <ChurchManagementSection />
        <EducationSection />
        <ThreeExperiencesSection />
        <BuiltAroundChurchSection />
      </main>
      <LandingFooter />
    </div>
  );
}
