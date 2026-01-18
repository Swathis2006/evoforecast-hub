import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react";

interface StepCardProps {
  step: number;
  title: string;
  description: string;
  icon: LucideIcon;
  isActive?: boolean;
  isCompleted?: boolean;
  onClick?: () => void;
}

export function StepCard({
  step,
  title,
  description,
  icon: Icon,
  isActive = false,
  isCompleted = false,
  onClick,
}: StepCardProps) {
  return (
    <div
      onClick={onClick}
      className={cn(
        "relative group cursor-pointer transition-all duration-300",
        "p-6 rounded-xl border",
        "hover:scale-[1.02] hover:-translate-y-1",
        isActive
          ? "border-primary/50 bg-primary/5 glow-primary"
          : isCompleted
          ? "border-primary/30 bg-primary/5"
          : "border-border bg-card hover:border-primary/30"
      )}
    >
      <div className="flex items-start gap-4">
        <div
          className={cn(
            "flex items-center justify-center w-12 h-12 rounded-lg transition-all duration-300",
            isActive || isCompleted
              ? "gradient-primary text-primary-foreground"
              : "bg-secondary text-muted-foreground group-hover:bg-primary/20 group-hover:text-primary"
          )}
        >
          <Icon className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono text-muted-foreground">
              STEP {step}
            </span>
            {isCompleted && (
              <span className="text-xs font-medium text-primary">✓ DONE</span>
            )}
          </div>
          <h3 className="text-lg font-semibold text-foreground mb-1">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
      <div
        className={cn(
          "absolute inset-0 rounded-xl opacity-0 transition-opacity duration-300",
          "bg-gradient-to-r from-primary/5 to-transparent",
          "group-hover:opacity-100"
        )}
      />
    </div>
  );
}
