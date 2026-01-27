import { useState } from "react";
import { Upload, Brain, Dna, LineChart, Lightbulb } from "lucide-react";
import { Header } from "@/components/Header";
import { StepCard } from "@/components/StepCard";
import { DataUpload } from "@/components/DataUpload";
import { DataPreview } from "@/components/DataPreview";
import { TrainingPanel, TrainingResults } from "@/components/TrainingPanel";
import { ResultsPanel } from "@/components/ResultsPanel";
import { OptimizationPanel } from "@/components/OptimizationPanel";
import { PredictionPanel } from "@/components/PredictionPanel";
import { ArchitecturePanel } from "@/components/ArchitecturePanel";
import { StatsSection } from "@/components/StatsSection";
import { FeaturesSection } from "@/components/FeaturesSection";
import { HowItWorksSection } from "@/components/HowItWorksSection";
import { cn } from "@/lib/utils";

type Step = 1 | 2 | 3 | 4 | 5;

const Index = () => {
  const [currentStep, setCurrentStep] = useState<Step>(1);
  const [data, setData] = useState<Record<string, string | number>[]>([]);
  const [columns, setColumns] = useState<string[]>([]);
  const [targetColumn, setTargetColumn] = useState<string | null>(null);
  const [trainingResults, setTrainingResults] = useState<TrainingResults | null>(null);
  const [optimizedResults, setOptimizedResults] = useState<TrainingResults | null>(null);

  const handleDataLoaded = (newData: any[], newColumns: string[]) => {
    setData(newData);
    setColumns(newColumns);
    if (newColumns.length > 0) {
      const defaultTarget = newColumns.find(
        (c) => c.toLowerCase() === "close" || c.toLowerCase() === "adj close"
      );
      setTargetColumn(defaultTarget || newColumns[newColumns.length - 1]);
    }
  };

  const handleTrainingComplete = (results: TrainingResults) => {
    setTrainingResults(results);
    setCurrentStep(3);
  };

  const handleOptimizationComplete = (results: TrainingResults) => {
    setOptimizedResults(results);
    setCurrentStep(4);
  };

  const steps = [
    { step: 1, title: "Upload Data", description: "Load your CSV dataset", icon: Upload },
    { step: 2, title: "Train Model", description: "Train the MLP neural network", icon: Brain },
    { step: 3, title: "Optimize", description: "Evolve optimal parameters", icon: Dna },
    { step: 4, title: "Predict", description: "Make live predictions", icon: LineChart },
    { step: 5, title: "Learn", description: "Understand the architecture", icon: Lightbulb },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero Section */}
      <section className="relative py-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
        <div className="absolute top-20 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-pulse-slow" />
        <div className="absolute bottom-10 right-1/4 w-48 h-48 bg-accent/10 rounded-full blur-3xl animate-pulse-slow" />

        <div className="container mx-auto px-4 relative">
          <div className="text-center max-w-3xl mx-auto mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4">
              Real-Time Evolutionary{" "}
              <span className="text-gradient-primary">Hyperparameter</span>{" "}
              Optimization
            </h1>
            <p className="text-lg text-muted-foreground mb-6">
              Predict stock prices using an MLP neural network optimized by
              genetic algorithms. Upload your data, train, optimize, and forecast
              with confidence.
            </p>
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-secondary border border-border text-sm text-muted-foreground">
              <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
              Powered by MLP + GA Optimization
            </div>
          </div>

          {/* Step Navigation */}
          <div className="grid grid-cols-1 md:grid-cols-5 gap-4 mb-12">
            {steps.map((s) => (
              <StepCard
                key={s.step}
                step={s.step}
                title={s.title}
                description={s.description}
                icon={s.icon}
                isActive={currentStep === s.step}
                isCompleted={
                  (s.step === 1 && data.length > 0) ||
                  (s.step === 2 && trainingResults !== null) ||
                  (s.step === 3 && optimizedResults !== null)
                }
                onClick={() => setCurrentStep(s.step as Step)}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <StatsSection />

      {/* Features Section */}
      <FeaturesSection />

      {/* How It Works Section */}
      <HowItWorksSection />

      {/* Main Content */}
      <main className="container mx-auto px-4 pb-20 pt-12">
        <div className="max-w-4xl mx-auto">
          {/* Step 1: Upload */}
          {currentStep === 1 && (
            <section className="space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Upload Your Financial Data
                </h2>
                <p className="text-muted-foreground">
                  Start by uploading a CSV file with historical stock data (Open,
                  High, Low, Close, Volume)
                </p>
              </div>

              <DataUpload onDataLoaded={handleDataLoaded} />

              {data.length > 0 && (
                <div className="space-y-6">
                  <DataPreview
                    data={data}
                    columns={columns}
                    targetColumn={targetColumn}
                    onSelectTarget={setTargetColumn}
                  />
                  <div className="flex justify-center">
                    <button
                      onClick={() => setCurrentStep(2)}
                      className="px-6 py-3 rounded-xl gradient-primary text-primary-foreground font-medium hover:opacity-90 transition-opacity glow-primary"
                    >
                      Continue to Training →
                    </button>
                  </div>
                </div>
              )}
            </section>
          )}

          {/* Step 2: Train */}
          {currentStep === 2 && (
            <section className="space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Train MLP Model
                </h2>
                <p className="text-muted-foreground">
                  Configure training parameters and build your neural network
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl border border-border bg-card">
                  <h3 className="font-semibold text-foreground mb-4">
                    Training Configuration
                  </h3>
                  <TrainingPanel
                    onTrainingComplete={handleTrainingComplete}
                    isDataReady={data.length > 0 && targetColumn !== null}
                  />
                </div>

                {trainingResults && (
                  <div className="p-6 rounded-xl border border-border bg-card">
                    <h3 className="font-semibold text-foreground mb-4">
                      Training Results
                    </h3>
                    <ResultsPanel results={trainingResults} />
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Step 3: Optimize */}
          {currentStep === 3 && (
            <section className="space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Genetic Algorithm Optimization
                </h2>
                <p className="text-muted-foreground">
                  Evolve optimal hyperparameters to improve model accuracy
                </p>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <div className="p-6 rounded-xl border border-border bg-card">
                  <OptimizationPanel
                    onOptimizationComplete={handleOptimizationComplete}
                    hasInitialResults={trainingResults !== null}
                  />
                </div>

                {trainingResults && (
                  <div className="p-6 rounded-xl border border-border bg-card">
                    <h3 className="font-semibold text-foreground mb-4">
                      Comparison
                    </h3>
                    <ResultsPanel
                      results={trainingResults}
                      optimizedResults={optimizedResults || undefined}
                    />
                  </div>
                )}
              </div>
            </section>
          )}

          {/* Step 4: Predict */}
          {currentStep === 4 && (
            <section className="space-y-6 animate-fade-in">
              <div className="text-center mb-8">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                  Live Prediction
                </h2>
                <p className="text-muted-foreground">
                  Enter feature values to predict the next closing price
                </p>
              </div>

              <div className="max-w-2xl mx-auto">
                <PredictionPanel
                  columns={columns}
                  hasOptimizedModel={optimizedResults !== null}
                />
              </div>
            </section>
          )}

          {/* Step 5: Architecture */}
          {currentStep === 5 && (
            <section className="animate-fade-in">
              <ArchitecturePanel />
            </section>
          )}
        </div>
      </main>

      {/* Footer */}
      <footer className="border-t border-border py-6">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-muted-foreground">
            Built with React • MLP Neural Networks • Genetic Algorithms
          </p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
