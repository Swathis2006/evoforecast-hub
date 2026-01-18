import { cn } from "@/lib/utils";

interface DataPreviewProps {
  data: Record<string, string | number>[];
  columns: string[];
  targetColumn: string | null;
  onSelectTarget: (column: string) => void;
}

export function DataPreview({
  data,
  columns,
  targetColumn,
  onSelectTarget,
}: DataPreviewProps) {
  const previewData = data.slice(0, 5);

  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between">
        <h3 className="font-semibold text-foreground">Data Preview</h3>
        <span className="text-xs font-mono text-muted-foreground">
          {data.length} rows • {columns.length} columns
        </span>
      </div>

      <div className="rounded-xl border border-border overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-secondary/50">
                {columns.map((col) => (
                  <th
                    key={col}
                    onClick={() => onSelectTarget(col)}
                    className={cn(
                      "px-4 py-3 text-left text-xs font-mono font-medium uppercase tracking-wider cursor-pointer transition-colors",
                      targetColumn === col
                        ? "text-primary bg-primary/10"
                        : "text-muted-foreground hover:text-foreground hover:bg-secondary"
                    )}
                  >
                    <div className="flex items-center gap-2">
                      {col}
                      {targetColumn === col && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded gradient-primary text-primary-foreground">
                          TARGET
                        </span>
                      )}
                    </div>
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-border">
              {previewData.map((row, i) => (
                <tr
                  key={i}
                  className="hover:bg-secondary/30 transition-colors"
                >
                  {columns.map((col) => (
                    <td
                      key={col}
                      className={cn(
                        "px-4 py-3 text-sm font-mono",
                        typeof row[col] === "number"
                          ? "text-accent"
                          : "text-foreground"
                      )}
                    >
                      {typeof row[col] === "number"
                        ? row[col].toFixed(2)
                        : row[col]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <p className="text-xs text-muted-foreground">
        💡 Click on a column header to select it as the target variable for
        prediction
      </p>
    </div>
  );
}
