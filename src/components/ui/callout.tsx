import { cn } from "@/lib/utils";
import { FileText, AlertCircle, CheckCircle2, Info, Lightbulb, TriangleAlert } from "lucide-react";

const calloutVariants: Record<string, { icon: React.ComponentType<{ className?: string }>; className: string }> = {
  info: { icon: Info, className: "border-blue-200 bg-blue-50 dark:border-blue-800 dark:bg-blue-950/50" },
  warning: { icon: TriangleAlert, className: "border-yellow-200 bg-yellow-50 dark:border-yellow-800 dark:bg-yellow-950/50" },
  error: { icon: AlertCircle, className: "border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/50" },
  success: { icon: CheckCircle2, className: "border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/50" },
  tip: { icon: Lightbulb, className: "border-emerald-200 bg-emerald-50 dark:border-emerald-800 dark:bg-emerald-950/50" },
  note: { icon: FileText, className: "border-gray-200 bg-gray-50 dark:border-gray-700 dark:bg-gray-950/50" },
};

function Callout({
  children,
  variant = "note",
  title,
  className,
}: {
  children: React.ReactNode;
  variant?: keyof typeof calloutVariants;
  title?: string;
  className?: string;
}) {
  const { icon: Icon, className: variantClass } = calloutVariants[variant];
  return (
    <div
      className={cn(
        "flex gap-3 rounded-lg border p-4 my-6",
        variantClass,
        className
      )}
    >
      <Icon className="mt-0.5 h-5 w-5 shrink-0" />
      <div>
        {title && <p className="mb-1 font-semibold">{title}</p>}
        <div className="text-sm [&>p]:m-0">{children}</div>
      </div>
    </div>
  );
}

export { Callout };
