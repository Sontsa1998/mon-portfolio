import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { getTechIcon } from "@/lib/tech-icons";
import { cn } from "@/lib/utils";

export function TechIcon({
  name,
  className,
  iconClassName,
  compact = false,
}: {
  name: string;
  className?: string;
  iconClassName?: string;
  /** Icon-only square badge with a name tooltip, for space-constrained contexts. */
  compact?: boolean;
}) {
  const entry = getTechIcon(name);
  const icon =
    entry.kind === "brand" ? (
      <svg
        viewBox="0 0 24 24"
        className={cn("size-5", iconClassName)}
        fill="currentColor"
        aria-hidden
      >
        <path d={entry.icon.path} />
      </svg>
    ) : (
      <entry.icon className={cn("size-5", iconClassName)} aria-hidden />
    );

  if (compact) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>
          <span
            tabIndex={0}
            aria-label={name}
            className={cn(
              "cursor-hover relative inline-flex size-9 origin-center scale-100 items-center justify-center rounded-lg border border-border bg-muted/50 text-foreground/75 transition-[transform,color,border-color] duration-300 ease-out hover:z-10 hover:scale-150 hover:border-[var(--accent-to)]/60 hover:text-[var(--accent-to)] focus-visible:z-10 focus-visible:scale-150 focus-visible:border-[var(--accent-to)]/60 focus-visible:text-[var(--accent-to)]",
              className,
            )}
          >
            {icon}
          </span>
        </TooltipTrigger>
        <TooltipContent>{name}</TooltipContent>
      </Tooltip>
    );
  }

  return (
    <span
      tabIndex={0}
      className={cn(
        "cursor-hover relative flex w-20 flex-col items-center gap-1.5 rounded-lg border border-border bg-muted/50 px-2 py-3 text-center text-foreground/75 transition-[transform,color,border-color] duration-300 ease-out hover:z-10 hover:-translate-y-0.5 hover:border-[var(--accent-to)]/60 hover:text-[var(--accent-to)] focus-visible:z-10 focus-visible:-translate-y-0.5 focus-visible:border-[var(--accent-to)]/60 focus-visible:text-[var(--accent-to)]",
        className,
      )}
    >
      {icon}
      <span className="text-[11px] font-bold leading-tight">{name}</span>
    </span>
  );
}
