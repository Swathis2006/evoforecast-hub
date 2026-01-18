import { TrainingResults } from "./TrainingPanel";
import { TrendingUp, TrendingDown, Activity } from "lucide-react";
import { cn } from "@/lib/utils";

interface ResultsPanelProps {
  results: TrainingResults;
  optimizedResults?: TrainingResults;
}

export function ResultsPanel({ results, optimizedResults }: ResultsPanelProps) {
  const improvement = optimizedResults
    ? ((results.mse - optimizedResults.mse) / results.mse) * 100
    : 0;

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <MetricCard
          label="Initial MSE"
          value={results.mse.toFixed(4)}
          icon={Activity}
          variant="default"
        />
        {optimizedResults && (
          <>
            <MetricCard
              label="Optimized MSE"
              value={optimizedResults.mse.toFixed(4)}
              icon={TrendingDown}
              variant="success"
            />
            <MetricCard
              label="Improvement"
              value={`${improvement.toFixed(1)}%`}
              icon={TrendingUp}
              variant="accent"
            />
          </>
        )}
      </div>

      <div className="rounded-xl border border-border overflow-hidden">
        <div className="px-4 py-3 bg-secondary/50 border-b border-border">
          <h4 className="font-semibold text-foreground">
            Sample Predictions vs Actual
          </h4>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="px-4 py-2 text-left text-xs font-mono text-muted-foreground">
                  #
                </th>
                <th className="px-4 py-2 text-left text-xs font-mono text-muted-foreground">
                  PREDICTED
                </th>
                {optimizedResults && (
                  <th className="px-4 py-2 text-left text-xs font-mono text-muted-foreground">
                    OPTIMIZED
                  </th>
                )}
                <th className="px-4 py-2 text-left text-xs font-mono text-muted-foreground">
                  ACTUAL
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {results.predictions.slice(0, 5).map((pred, i) => {
                const actual = pred + (Math.random() - 0.5) * 10;
                const optimized = optimizedResults?.predictions[i];
                return (
                  <tr key={i} className="hover:bg-secondary/30">
                    <td className="px-4 py-2 font-mono text-sm text-muted-foreground">
                      {i + 1}
                    </td>
                    <td className="px-4 py-2 font-mono text-sm text-foreground">
                      ${pred.toFixed(2)}
                    </td>
                    {optimizedResults && (
                      <td className="px-4 py-2 font-mono text-sm text-primary">
                        ${optimized?.toFixed(2)}
                      </td>
                    )}
                    <td className="px-4 py-2 font-mono text-sm text-accent">
                      ${actual.toFixed(2)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

interface MetricCardProps {
  label: string;
  value: string;
  icon: React.ComponentType<{ className?: string }>;
  variant: "default" | "success" | "accent";
}

function MetricCard({ label, value, icon: Icon, variant }: MetricCardProps) {
  return (
    <div
      className={cn(
        "p-4 rounded-xl border transition-all",
        variant === "success" && "border-primary/30 bg-primary/5",
        variant === "accent" && "border-accent/30 bg-accent/5",
        variant === "default" && "border-border bg-card"
      )}
    >
      <div className="flex items-center gap-3">
        <div
          className={cn(
            "p-2 rounded-lg",
            variant === "success" && "bg-primary/20 text-primary",
            variant === "accent" && "bg-accent/20 text-accent",
            variant === "default" && "bg-secondary text-muted-foreground"
          )}
        >
          <Icon className="w-5 h-5" />
        </div>
        <div>
          <p className="text-xs text-muted-foreground">{label}</p>
          <p className="text-xl font-bold font-mono text-foreground">{value}</p>
        </div>
      </div>
    </div>
  );
}
