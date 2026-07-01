"use client";

import { NavTree } from "./nav-tree";
import { navData } from "@/lib/config/nav";
import { cn } from "@/lib/utils";

export function Sidebar({ open, onClose }: { open: boolean; onClose: () => void }) {
  return (
    <>
      {open && (
        <div className="fixed inset-0 z-30 bg-black/50 lg:hidden" onClick={onClose} />
      )}
      <aside
        className={cn(
          "fixed top-14 left-0 z-30 h-[calc(100vh-3.5rem)] w-64 border-r border-border bg-sidebar overflow-y-auto transition-transform duration-200 lg:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full"
        )}
      >
        <div className="p-4">
          <NavTree items={navData} />
        </div>
      </aside>
    </>
  );
}
