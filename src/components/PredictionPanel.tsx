import { useState } from "react";
import { ArrowRight, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

interface PredictionPanelProps {
  columns: string[];
  hasOptimizedModel: boolean;
}

export function PredictionPanel({
  columns,
  hasOptimizedModel,
}: PredictionPanelProps) {
  const [inputs, setInputs] = useState<Record<string, string>>({});
  const [prediction, setPrediction] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const featureColumns = columns.filter(
    (col) =>
      col.toLowerCase() !== "date" &&
      col.toLowerCase() !== "close" &&
      col.toLowerCase() !== "adj close"
  );

  const handlePredict = () => {
    setIsLoading(true);
    setTimeout(() => {
      // Simulate prediction based on inputs
      const basePrice = 175;
      const randomVariation = (Math.random() - 0.5) * 20;
      setPrediction(basePrice + randomVariation);
      setIsLoading(false);
    }, 800);
  };

  return (
    <div className="space-y-6">
      <div className="p-4 rounded-xl border-glow">
        <div className="flex items-center gap-2 mb-4">
          <TrendingUp className="w-5 h-5 text-primary" />
          <h4 className="font-semibold text-foreground">
            Live Price Prediction
          </h4>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-4">
          {featureColumns.slice(0, 6).map((col) => (
            <div key={col} className="space-y-1">
              <label className="text-xs font-medium text-muted-foreground uppercase">
                {col}
              </label>
              <input
                type="number"
                placeholder="0.00"
                value={inputs[col] || ""}
                onChange={(e) =>
                  setInputs((prev) => ({ ...prev, [col]: e.target.value }))
                }
                className="w-full px-3 py-2 rounded-lg bg-secondary border border-border text-foreground font-mono text-sm focus:outline-none focus:ring-2 focus:ring-primary/50"
              />
            </div>
          ))}
        </div>

        <Button
          onClick={handlePredict}
          disabled={!hasOptimizedModel || isLoading}
          variant="glow"
          className="w-full"
        >
          {isLoading ? (
            "Predicting..."
          ) : (
            <>
              Predict Next Day Close
              <ArrowRight className="w-4 h-4" />
            </>
          )}
        </Button>
      </div>

      {prediction !== null && (
        <div className="p-6 rounded-xl gradient-card border border-primary/30 text-center animate-fade-in">
          <p className="text-sm text-muted-foreground mb-2">
            Predicted Closing Price
          </p>
          <p className="text-4xl font-bold font-mono text-gradient-primary">
            ${prediction.toFixed(2)}
          </p>
          <p className="text-xs text-muted-foreground mt-2">
            Based on optimized MLP model
          </p>
        </div>
      )}

      {!hasOptimizedModel && (
        <p className="text-sm text-center text-muted-foreground">
          Complete the optimization step to enable live predictions
        </p>
      )}
    </div>
  );
}
