import { Upload, Settings, Dna, TrendingUp, ArrowRight } from "lucide-react";

const steps = [
  {
    icon: Upload,
    step: "01",
    title: "Upload Your Data",
    description: "Import your historical stock data in CSV format with OHLCV columns",
  },
  {
    icon: Settings,
    step: "02",
    title: "Configure & Train",
    description: "Set training parameters and let the MLP model learn from your data",
  },
  {
    icon: Dna,
    step: "03",
    title: "Optimize with GA",
    description: "Genetic algorithms evolve the best hyperparameters for your model",
  },
  {
    icon: TrendingUp,
    step: "04",
    title: "Make Predictions",
    description: "Use the optimized model to forecast future closing prices",
  },
];

export function HowItWorksSection() {
  return (
    <section className="py-16 bg-secondary/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">
            How It Works
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Get started in minutes with our simple 4-step process
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((step, index) => (
              <div
                key={step.step}
                className="relative animate-fade-in"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="p-6 rounded-xl bg-card border border-border h-full">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="text-4xl font-bold text-primary/20 font-mono">
                      {step.step}
                    </span>
                    <div className="w-10 h-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                      <step.icon className="w-5 h-5" />
                    </div>
                  </div>
                  <h3 className="font-semibold text-foreground mb-2">
                    {step.title}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {step.description}
                  </p>
                </div>
                
                {/* Arrow connector */}
                {index < steps.length - 1 && (
                  <div className="hidden lg:flex absolute -right-3 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="w-6 h-6 text-primary/40" />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
