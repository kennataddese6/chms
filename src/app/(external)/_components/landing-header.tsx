"use client";

import Link from "next/link";

import { ArrowRight, Church, Shield } from "lucide-react";

import { Button } from "@/components/ui/button";
import { APP_CONFIG } from "@/config/app-config";

import { LandingThemeSwitcher } from "./landing-theme-switcher";

export function LandingHeader() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground font-bold shadow-sm transition-transform group-hover:scale-105">
            <Church className="size-5" />
          </div>
          <div className="flex flex-col">
            <span className="font-bold text-sm tracking-tight leading-none">{APP_CONFIG.name}</span>
            <span className="text-[10px] text-muted-foreground font-medium mt-0.5">CHMS Platform</span>
          </div>
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-xs font-medium text-muted-foreground">
          <a href="#management" className="hover:text-foreground transition-colors">
            Church Management
          </a>
          <a href="#education" className="hover:text-foreground transition-colors">
            Education Platform
          </a>
          <a href="#experiences" className="hover:text-foreground transition-colors">
            3 Connected Roles
          </a>
          <a href="#adaptable" className="hover:text-foreground transition-colors">
            Customization
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <LandingThemeSwitcher />
          <Button size="sm" asChild className="h-9 gap-1.5 text-xs font-semibold shadow-sm">
            <Link href="/dashboard">
              Enter Prototype <ArrowRight className="size-3.5" />
            </Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
