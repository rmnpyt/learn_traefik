"use client";

import { NavItem } from "@/types";
import { ChevronRight, Book, Bookmark, Play } from "lucide-react";
import { useState } from "react";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { usePathname } from "next/navigation";

const iconMap: Record<string, typeof Book> = {
  book: Book,
  bookmark: Bookmark,
  play: Play,
};

function NavTreeItem({ item, depth = 0 }: { item: NavItem; depth?: number }) {
  const [expanded, setExpanded] = useState(depth < 1);
  const pathname = usePathname();
  const Icon = item.icon ? iconMap[item.icon] : undefined;
  const isActive = item.href ? pathname === item.href : false;
  const hasChildren = item.children && item.children.length > 0;

  return (
    <div>
      <button
        onClick={() => {
          if (hasChildren) {
            setExpanded(!expanded);
          }
        }}
        className={cn(
          "flex w-full items-center gap-2 rounded-lg px-3 py-2 text-sm transition-colors",
          isActive
            ? "bg-primary/10 text-primary font-medium"
            : "text-sidebar-text hover:bg-nav-hover hover:text-white",
          depth > 0 && "pl-8"
        )}
      >
        {hasChildren && (
          <ChevronRight
            className={cn("h-3.5 w-3.5 transition-transform", expanded && "rotate-90")}
          />
        )}
        {Icon && !hasChildren && <Icon className="h-4 w-4 shrink-0" />}
        {item.href && !hasChildren ? (
          <Link href={item.href} className="flex-1 text-left">
            {item.title}
          </Link>
        ) : (
          <span className="flex-1 text-left">{item.title}</span>
        )}
      </button>
      {hasChildren && expanded && (
        <div className="mt-0.5">
          {item.children!.map((child) => (
            <NavTreeItem key={child.href || child.title} item={child} depth={depth + 1} />
          ))}
        </div>
      )}
    </div>
  );
}

export function NavTree({ items }: { items: NavItem[] }) {
  return (
    <nav className="space-y-0.5">
      {items.map((item) => (
        <NavTreeItem key={item.title} item={item} />
      ))}
    </nav>
  );
}
