import { Brain, TrendingUp } from "lucide-react";

export function Header() {
  return (
    <header className="border-b border-border bg-card/50 backdrop-blur-sm sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="relative">
              <div className="p-2 rounded-xl gradient-primary">
                <Brain className="w-6 h-6 text-primary-foreground" />
              </div>
              <div className="absolute -bottom-1 -right-1 p-1 rounded-full bg-accent">
                <TrendingUp className="w-3 h-3 text-accent-foreground" />
              </div>
            </div>
            <div>
              <h1 className="font-bold text-foreground text-lg">
                Neural Forecast
              </h1>
              <p className="text-xs text-muted-foreground">
                MLP + Genetic Algorithm
              </p>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
              v1.0
            </span>
          </div>
        </div>
      </div>
    </header>
  );
}
