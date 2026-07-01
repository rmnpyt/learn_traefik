import { cn } from "@/lib/utils";

function Badge({
  children,
  variant = "default",
  className,
}: {
  children: React.ReactNode;
  variant?: "default" | "outline" | "success" | "warning" | "error";
  className?: string;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium",
        variant === "default" && "bg-primary/10 text-primary",
        variant === "outline" && "border border-border text-muted",
        variant === "success" && "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400",
        variant === "warning" && "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400",
        variant === "error" && "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400",
        className
      )}
    >
      {children}
    </span>
  );
}

export { Badge };
