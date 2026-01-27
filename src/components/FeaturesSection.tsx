import { Brain, Dna, LineChart, Shield, Clock, Sparkles } from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "MLP Neural Network",
    description: "Advanced multilayer perceptron architecture for accurate price predictions",
  },
  {
    icon: Dna,
    title: "Genetic Optimization",
    description: "Evolutionary algorithms to find the best hyperparameters automatically",
  },
  {
    icon: LineChart,
    title: "Real-Time Forecasting",
    description: "Get instant predictions for next-day closing prices",
  },
  {
    icon: Clock,
    title: "Fast Training",
    description: "Optimized training pipeline for quick model iteration",
  },
  {
    icon: Shield,
    title: "Data Privacy",
    description: "Your data stays in your browser - nothing is uploaded to servers",
  },
  {
    icon: Sparkles,
    title: "Easy to Use",
    description: "No coding required - just upload your CSV and start predicting",
  },
];

export function FeaturesSection() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-3">
            Powerful Features
          </h2>
          <p className="text-muted-foreground max-w-xl mx-auto">
            Everything you need for financial forecasting with machine learning
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="group p-6 rounded-xl border border-border bg-card hover:border-primary/50 hover:bg-primary/5 transition-all duration-300 animate-fade-in"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center mb-4 group-hover:bg-primary/20 transition-colors">
                <feature.icon className="w-6 h-6" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-sm text-muted-foreground">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
