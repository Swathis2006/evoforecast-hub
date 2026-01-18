import { useState } from "react";
import { Sparkles, Loader2, Dna, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { TrainingResults } from "./TrainingPanel";
import { cn } from "@/lib/utils";

interface OptimizationPanelProps {
  onOptimizationComplete: (results: TrainingResults) => void;
  hasInitialResults: boolean;
}

interface GAParams {
  learningRate: number;
  hiddenLayers: number;
  neuronsPerLayer: number;
}

export function OptimizationPanel({
  onOptimizationComplete,
  hasInitialResults,
}: OptimizationPanelProps) {
  const [isOptimizing, setIsOptimizing] = useState(false);
  const [generation, setGeneration] = useState(0);
  const [currentBest, setCurrentBest] = useState<GAParams | null>(null);
  const [fitness, setFitness] = useState<number[]>([]);

  const simulateGA = () => {
    setIsOptimizing(true);
    setGeneration(0);
    setFitness([]);

    const generations = 10;
    let gen = 0;

    const interval = setInterval(() => {
      gen++;
      setGeneration(gen);

      const newFitness = 0.03 - (gen / generations) * 0.015 + Math.random() * 0.002;
      setFitness((prev) => [...prev, newFitness]);

      setCurrentBest({
        learningRate: 0.001 + Math.random() * 0.009,
        hiddenLayers: Math.floor(2 + Math.random() * 3),
        neuronsPerLayer: Math.floor(32 + Math.random() * 96),
      });

      if (gen >= generations) {
        clearInterval(interval);
        setTimeout(() => {
          const results: TrainingResults = {
            mse: 0.0156 + Math.random() * 0.005,
            predictions: Array.from(
              { length: 10 },
              () => 150 + Math.random() * 50
            ),
            epochs: 100,
            batchSize: 32,
          };
          setIsOptimizing(false);
          onOptimizationComplete(results);
        }, 500);
      }
    }, 600);
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl bg-gradient-to-r from-primary/10 to-accent/10 border border-primary/20">
        <div className="flex items-start gap-3">
          <div className="p-2 rounded-lg gradient-primary">
            <Dna className="w-5 h-5 text-primary-foreground" />
          </div>
          <div>
            <h4 className="font-semibold text-foreground mb-1">
              Genetic Algorithm Optimization
            </h4>
            <p className="text-sm text-muted-foreground">
              Evolves optimal hyperparameters through natural selection: learning
              rate, hidden layers, and neurons per layer.
            </p>
          </div>
        </div>
      </div>

      {isOptimizing && (
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">
              Generation {generation}/10
            </span>
            <span className="text-sm font-mono text-primary">
              {((generation / 10) * 100).toFixed(0)}%
            </span>
          </div>

          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-primary to-accent transition-all duration-300"
              style={{ width: `${(generation / 10) * 100}%` }}
            />
          </div>

          {currentBest && (
            <div className="grid grid-cols-3 gap-3">
              <ParamCard
                label="Learning Rate"
                value={currentBest.learningRate.toFixed(4)}
              />
              <ParamCard
                label="Hidden Layers"
                value={currentBest.hiddenLayers.toString()}
              />
              <ParamCard
                label="Neurons/Layer"
                value={currentBest.neuronsPerLayer.toString()}
              />
            </div>
          )}

          {fitness.length > 0 && (
            <div className="p-4 rounded-xl bg-card border border-border">
              <div className="flex items-center gap-2 mb-3">
                <Zap className="w-4 h-4 text-accent" />
                <span className="text-sm font-medium text-foreground">
                  Fitness Evolution
                </span>
              </div>
              <div className="flex items-end gap-1 h-16">
                {fitness.map((f, i) => (
                  <div
                    key={i}
                    className="flex-1 gradient-primary rounded-t transition-all duration-300"
                    style={{
                      height: `${Math.max(20, 100 - f * 2000)}%`,
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      <Button
        onClick={simulateGA}
        disabled={!hasInitialResults || isOptimizing}
        variant="accent"
        size="lg"
        className="w-full"
      >
        {isOptimizing ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Evolving Parameters...
          </>
        ) : (
          <>
            <Sparkles className="w-5 h-5" />
            Run Genetic Optimization
          </>
        )}
      </Button>

      {!hasInitialResults && (
        <p className="text-sm text-center text-muted-foreground">
          Train the initial model first to enable optimization
        </p>
      )}
    </div>
  );
}

function ParamCard({ label, value }: { label: string; value: string }) {
  return (
    <div className="p-3 rounded-lg bg-secondary/50 border border-border text-center">
      <p className="text-xs text-muted-foreground mb-1">{label}</p>
      <p className="font-mono font-semibold text-primary">{value}</p>
    </div>
  );
}
