import { useState } from "react";
import { Play, Loader2, CheckCircle2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface TrainingPanelProps {
  onTrainingComplete: (results: TrainingResults) => void;
  isDataReady: boolean;
}

export interface TrainingResults {
  mse: number;
  predictions: number[];
  epochs: number;
  batchSize: number;
}

export function TrainingPanel({
  onTrainingComplete,
  isDataReady,
}: TrainingPanelProps) {
  const [epochs, setEpochs] = useState(100);
  const [batchSize, setBatchSize] = useState(32);
  const [isTraining, setIsTraining] = useState(false);
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState<string>("");

  const simulateTraining = () => {
    if (!isDataReady) return;

    setIsTraining(true);
    setProgress(0);
    setStatus("Initializing model...");

    const statuses = [
      "Initializing model...",
      "Loading data...",
      "Normalizing features...",
      "Training epoch 1-25...",
      "Training epoch 26-50...",
      "Training epoch 51-75...",
      "Training epoch 76-100...",
      "Calculating predictions...",
      "Computing metrics...",
    ];

    let step = 0;
    const interval = setInterval(() => {
      step++;
      const newProgress = Math.min((step / statuses.length) * 100, 100);
      setProgress(newProgress);
      setStatus(statuses[Math.min(step, statuses.length - 1)]);

      if (step >= statuses.length) {
        clearInterval(interval);
        const results: TrainingResults = {
          mse: 0.0234 + Math.random() * 0.01,
          predictions: Array.from(
            { length: 10 },
            () => 150 + Math.random() * 50
          ),
          epochs,
          batchSize,
        };
        setTimeout(() => {
          setIsTraining(false);
          onTrainingComplete(results);
        }, 500);
      }
    }, 400);
  };

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">Epochs</label>
          <input
            type="number"
            value={epochs}
            onChange={(e) => setEpochs(Number(e.target.value))}
            min={10}
            max={500}
            disabled={isTraining}
            className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
          />
          <p className="text-xs text-muted-foreground">
            Number of training iterations
          </p>
        </div>
        <div className="space-y-2">
          <label className="text-sm font-medium text-foreground">
            Batch Size
          </label>
          <input
            type="number"
            value={batchSize}
            onChange={(e) => setBatchSize(Number(e.target.value))}
            min={8}
            max={128}
            step={8}
            disabled={isTraining}
            className="w-full px-4 py-2 rounded-lg bg-secondary border border-border text-foreground font-mono focus:outline-none focus:ring-2 focus:ring-primary/50 disabled:opacity-50"
          />
          <p className="text-xs text-muted-foreground">
            Samples per gradient update
          </p>
        </div>
      </div>

      {isTraining && (
        <div className="space-y-3 p-4 rounded-xl bg-secondary/50 border border-border">
          <div className="flex items-center justify-between">
            <span className="text-sm text-muted-foreground">{status}</span>
            <span className="text-sm font-mono text-primary">
              {progress.toFixed(0)}%
            </span>
          </div>
          <div className="h-2 rounded-full bg-secondary overflow-hidden">
            <div
              className="h-full gradient-primary transition-all duration-300"
              style={{ width: `${progress}%` }}
            />
          </div>
        </div>
      )}

      <Button
        onClick={simulateTraining}
        disabled={!isDataReady || isTraining}
        variant="glow"
        size="lg"
        className="w-full"
      >
        {isTraining ? (
          <>
            <Loader2 className="w-5 h-5 animate-spin" />
            Training Model...
          </>
        ) : (
          <>
            <Play className="w-5 h-5" />
            Train MLP Model
          </>
        )}
      </Button>

      {!isDataReady && (
        <p className="text-sm text-center text-muted-foreground">
          Please upload data and select a target column first
        </p>
      )}
    </div>
  );
}
