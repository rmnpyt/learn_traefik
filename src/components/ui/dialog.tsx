"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { X } from "lucide-react";

function Dialog({
  open,
  onOpenChange,
  children,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: React.ReactNode;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      <div
        className="fixed inset-0 bg-black/50"
        onClick={() => onOpenChange(false)}
      />
      <div className="relative z-50 w-full max-w-lg rounded-xl border border-border bg-card p-6 shadow-lg">
        {children}
      </div>
    </div>
  );
}

function DialogClose({ onClose }: { onClose: () => void }) {
  return (
    <button
      onClick={onClose}
      className="absolute right-4 top-4 text-muted hover:text-foreground cursor-pointer"
    >
      <X className="h-4 w-4" />
    </button>
  );
}

export { Dialog, DialogClose };
