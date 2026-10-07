import { Church } from "lucide-react";

import { APP_CONFIG } from "@/config/app-config";

export function LandingFooter() {
  return (
    <footer className="border-t bg-background py-8">
      <div className="mx-auto flex max-w-6xl flex-col items-center justify-between gap-4 px-4 text-muted-foreground text-xs sm:flex-row sm:px-6">
        <div className="flex items-center gap-2">
          <Church className="size-4 text-primary" />
          <span className="font-semibold text-foreground">{APP_CONFIG.name}</span>
          <span>— Church Management & Education Platform</span>
        </div>
        <p className="text-[11px] text-muted-foreground">
          {APP_CONFIG.copyright} Built with Next.js 16, React 19, and Tailwind CSS v4.
        </p>
      </div>
    </footer>
  );
}
