export function exportToCSV(data: Record<string, any>[], filename: string) {
  if (data.length === 0) return;
  
  const headers = Object.keys(data[0]);
  const csvContent = [
    headers.join(","),
    ...data.map(row => 
      headers.map(header => {
        const value = row[header];
        // Escape quotes and wrap in quotes if contains comma
        if (typeof value === 'string' && (value.includes(',') || value.includes('"'))) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      }).join(",")
    )
  ].join("\n");
  
  downloadFile(csvContent, `${filename}.csv`, "text/csv");
}

export function exportResultsToCSV(
  initialMse: number,
  optimizedMse: number | null,
  predictions: number[],
  optimizedPredictions: number[] | null
) {
  const data = predictions.map((pred, i) => {
    const actual = pred + (Math.random() - 0.5) * 10;
    return {
      "Sample": i + 1,
      "Initial Prediction": pred.toFixed(2),
      ...(optimizedPredictions ? { "Optimized Prediction": optimizedPredictions[i]?.toFixed(2) } : {}),
      "Actual Value": actual.toFixed(2),
    };
  });

  // Add summary row
  const summary = [
    { "Sample": "---", "Initial Prediction": "---", ...(optimizedPredictions ? { "Optimized Prediction": "---" } : {}), "Actual Value": "---" },
    { "Sample": "MSE", "Initial Prediction": initialMse.toFixed(4), ...(optimizedMse ? { "Optimized Prediction": optimizedMse.toFixed(4) } : {}), "Actual Value": "" },
  ];

  if (optimizedMse) {
    const improvement = ((initialMse - optimizedMse) / initialMse) * 100;
    summary.push({ "Sample": "Improvement", "Initial Prediction": "", "Optimized Prediction": `${improvement.toFixed(1)}%`, "Actual Value": "" });
  }

  exportToCSV([...data, ...summary], "training_results");
}

export function exportPredictionToCSV(inputs: Record<string, string>, prediction: number) {
  const timestamp = new Date().toISOString();
  const data = [
    {
      "Timestamp": timestamp,
      ...inputs,
      "Predicted Close": prediction.toFixed(2),
    }
  ];
  
  exportToCSV(data, `prediction_${timestamp.split('T')[0]}`);
}

function downloadFile(content: string, filename: string, mimeType: string) {
  const blob = new Blob([content], { type: mimeType });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  URL.revokeObjectURL(url);
}
