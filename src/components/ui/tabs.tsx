import * as React from "react";
import { cn } from "@/lib/utils";

const TABS_CLASSES = {
  list: "inline-flex h-10 items-center rounded-lg bg-surface p-1",
  trigger:
    "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all focus-visible:outline-none disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-card data-[state=active]:shadow-sm",
  content: "mt-4",
};

function Tabs({
  tabs,
  defaultValue,
  className,
}: {
  tabs: { value: string; label: string; content: React.ReactNode }[];
  defaultValue?: string;
  className?: string;
}) {
  const [active, setActive] = React.useState(defaultValue || tabs[0]?.value);

  return (
    <div className={cn(className)}>
      <div role="tablist" className={TABS_CLASSES.list}>
        {tabs.map((tab) => (
          <button
            key={tab.value}
            role="tab"
            data-state={active === tab.value ? "active" : "inactive"}
            className={TABS_CLASSES.trigger}
            onClick={() => setActive(tab.value)}
          >
            {tab.label}
          </button>
        ))}
      </div>
      {tabs.map((tab) => (
        <div
          key={tab.value}
          role="tabpanel"
          data-state={active === tab.value ? "active" : "inactive"}
          className={cn(TABS_CLASSES.content, active !== tab.value && "hidden")}
        >
          {tab.content}
        </div>
      ))}
    </div>
  );
}

export { Tabs };
