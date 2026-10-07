"use client";

import Link from "next/link";

import { ArrowRight, Church } from "lucide-react";

import { Button } from "@/components/ui/button";
import { APP_CONFIG } from "@/config/app-config";

import { LandingThemeSwitcher } from "./landing-theme-switcher";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="group flex items-center gap-2.5">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary font-bold text-primary-foreground shadow-sm transition-transform group-hover:scale-105">
            <Church className="size-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm leading-none tracking-tight">{APP_CONFIG.name}</span>
            <span className="mt-0.5 font-medium text-[10px] text-muted-foreground">CHMS Platform</span>
          </div>
        </Link>

        <nav className="hidden items-center gap-6 font-medium text-muted-foreground text-xs md:flex">
          <a href="#management" className="transition-colors hover:text-foreground">
            Church Management
          </a>
          <a href="#education" className="transition-colors hover:text-foreground">
            Education Platform
          </a>
          <a href="#experiences" className="transition-colors hover:text-foreground">
            3 Connected Roles
          </a>
          <a href="#adaptable" className="transition-colors hover:text-foreground">
            Customization
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <LandingThemeSwitcher />
          <Button size="sm" asChild className="h-9 gap-1.5 font-semibold text-xs shadow-sm">
            <Link href="/dashboard">
              Enter Prototype <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
