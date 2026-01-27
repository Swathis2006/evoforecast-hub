import { TrendingUp, Database, Cpu, Zap } from "lucide-react";
import { useEffect, useState } from "react";

const stats = [
  { label: "Model Accuracy", value: 94.7, suffix: "%", icon: TrendingUp },
  { label: "Datasets Supported", value: 1000, suffix: "+", icon: Database },
  { label: "Training Speed", value: 10, suffix: "x faster", icon: Zap },
  { label: "Parameters Optimized", value: 50, suffix: "+", icon: Cpu },
];

export function StatsSection() {
  const [animated, setAnimated] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimated(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
    <section className="py-12 border-y border-border bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {stats.map((stat, index) => (
            <div
              key={stat.label}
              className="text-center p-4 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-primary/10 text-primary mb-3">
                <stat.icon className="w-6 h-6" />
              </div>
              <p className="text-3xl md:text-4xl font-bold font-mono text-foreground">
                {animated ? stat.value : 0}
                <span className="text-primary">{stat.suffix}</span>
              </p>
              <p className="text-sm text-muted-foreground mt-1">{stat.label}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
