import { Brain, Database, Dna, LineChart, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export function ArchitecturePanel() {
  const steps = [
    {
      icon: Database,
      title: "Data Input",
      description:
        "Historical financial data (Open, High, Low, Volume) is loaded and preprocessed. Missing values are handled and features are normalized to 0-1 range.",
    },
    {
      icon: Brain,
      title: "MLP Neural Network",
      description:
        "A Multi-Layer Perceptron with hidden layers processes the input features. Each neuron applies weights, biases, and ReLU activation to learn complex patterns.",
    },
    {
      icon: Dna,
      title: "Genetic Algorithm",
      description:
        "GA evolves optimal hyperparameters through selection, crossover, and mutation. Best configurations survive across generations to minimize prediction error.",
    },
    {
      icon: LineChart,
      title: "Prediction Output",
      description:
        "The optimized model generates accurate price predictions. MSE (Mean Squared Error) measures the difference between predicted and actual values.",
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center">
        <h3 className="text-xl font-bold text-foreground mb-2">
          How It Works
        </h3>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Our system combines neural networks with evolutionary optimization to
          create accurate financial forecasts.
        </p>
      </div>

      <div className="relative">
        {/* Connection line */}
        <div className="absolute left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-primary via-accent to-primary/30 hidden md:block" />

        <div className="space-y-8">
          {steps.map((step, index) => (
            <div
              key={index}
              className={cn(
                "relative flex items-start gap-6 animate-fade-in",
                index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
              )}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div
                className={cn(
                  "flex-1 p-6 rounded-xl border border-border bg-card hover:border-primary/30 transition-all duration-300",
                  index % 2 === 0 ? "md:text-right" : "md:text-left"
                )}
              >
                <div
                  className={cn(
                    "flex items-center gap-3 mb-3",
                    index % 2 === 0
                      ? "md:flex-row-reverse md:justify-start"
                      : "md:justify-start"
                  )}
                >
                  <div className="p-2 rounded-lg gradient-primary">
                    <step.icon className="w-5 h-5 text-primary-foreground" />
                  </div>
                  <h4 className="font-semibold text-foreground">{step.title}</h4>
                </div>
                <p className="text-sm text-muted-foreground">
                  {step.description}
                </p>
              </div>

              {/* Center dot */}
              <div className="absolute left-1/2 top-6 -translate-x-1/2 w-4 h-4 rounded-full gradient-primary border-4 border-background hidden md:block z-10" />

              {/* Empty spacer */}
              <div className="flex-1 hidden md:block" />
            </div>
          ))}
        </div>
      </div>

      {/* Simple flow diagram */}
      <div className="p-6 rounded-xl bg-card border border-border">
        <h4 className="font-semibold text-foreground mb-4 text-center">
          Processing Pipeline
        </h4>
        <div className="flex items-center justify-center gap-2 flex-wrap">
          {["CSV Data", "Normalize", "MLP Train", "GA Optimize", "Predict"].map(
            (label, i) => (
              <div key={i} className="flex items-center gap-2">
                <div className="px-4 py-2 rounded-lg bg-secondary text-sm font-medium text-foreground">
                  {label}
                </div>
                {i < 4 && (
                  <ArrowRight className="w-4 h-4 text-primary flex-shrink-0" />
                )}
              </div>
            )
          )}
        </div>
      </div>
    </div>
  );
}
