"use client";

import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "./theme-toggle";
import { SearchBar } from "./search-bar";

export function Navbar({
  sidebarOpen,
  onSidebarToggle,
}: {
  sidebarOpen: boolean;
  onSidebarToggle: () => void;
}) {
  return (
    <header className="sticky top-0 z-40 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="flex h-14 items-center gap-4 px-4 lg:px-6">
        <button
          onClick={onSidebarToggle}
          className="lg:hidden cursor-pointer text-muted hover:text-foreground"
        >
          {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>

        <a href="/" className="flex items-center gap-2 font-bold text-lg shrink-0">
          <span className="text-primary">Traefik</span>
          <span className="text-muted font-normal">Learn</span>
        </a>

        <div className="hidden md:flex flex-1 max-w-md mx-4">
          <SearchBar />
        </div>

        <div className="flex items-center gap-2 ml-auto">
          <a
            href="https://doc.traefik.io/traefik/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-muted hover:text-foreground hidden sm:inline"
          >
            Official Docs
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
