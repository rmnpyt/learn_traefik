"use client";

import { tracks } from "@/lib/config/nav";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { TrackId } from "@/types";

export function TrackSelector({
  active,
  onSelect,
}: {
  active: TrackId;
  onSelect: (id: TrackId) => void;
}) {
  return (
    <div className="flex flex-wrap gap-2 mb-6">
      {tracks.map((track) => (
        <button
          key={track.id}
          onClick={() => onSelect(track.id)}
          className={cn(
            "text-left px-3 py-2 rounded-lg border text-sm transition-colors cursor-pointer",
            active === track.id
              ? "border-primary bg-primary/10 text-primary"
              : "border-border hover:bg-surface"
          )}
        >
          <div className="font-medium">{track.label}</div>
          <div className="text-xs text-muted mt-0.5">{track.chapters.length} chapters</div>
        </button>
      ))}
    </div>
  );
}
