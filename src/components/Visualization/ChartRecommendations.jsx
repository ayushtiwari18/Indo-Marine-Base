import React, { useState } from "react";

const ChartRecommendations = ({
  dataAnalysis,
  processedData,
  onChartSelect,
}) => {
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [showDetails, setShowDetails] = useState({});

  const handleRecommendationClick = (recommendation) => {
    setSelectedRecommendation(recommendation);
    const config = generateChartConfig(
      recommendation,
      dataAnalysis,
      processedData
    );
    onChartSelect(recommendation.type, config);
  };

  const toggleDetails = (index) => {
    setShowDetails((prev) => ({
      ...prev,
      [index]: !prev[index],
    }));
  };

  const generateChartConfig = (recommendation, analysis, data) => {
    const config = {
      title: recommendation.title,
      description: recommendation.description,
      columns: recommendation.columns,
      data: data,
      colorScheme: "ocean",
    };

    switch (recommendation.type) {
      case "scatter":
        config.xColumn = recommendation.columns[0];
        config.yColumn = recommendation.columns[1];
        break;
      case "histogram":
        config.column = recommendation.columns[0];
        config.bins = 20;
        break;
      case "bar":
        config.categoryColumn = recommendation.columns[0];
        break;
      case "map":
        config.latColumn = recommendation.columns[0];
        config.lonColumn = recommendation.columns[1];
        break;
      case "timeline":
        config.dateColumn = recommendation.columns[0];
        config.valueColumn = recommendation.columns[1];
        break;
    }

    return config;
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.9) return "text-green-400";
    if (confidence >= 0.8) return "text-yellow-400";
    return "text-orange-400";
  };

  const getConfidenceLabel = (confidence) => {
    if (confidence >= 0.9) return "Highly Recommended";
    if (confidence >= 0.8) return "Recommended";
    return "Consider This";
  };

  return (
    <div className="ocean-card dashboard-card">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2">
          🎯 AI Chart Recommendations
        </h3>
        <p className="text-slate-300 text-sm">
          Based on your data analysis, here are the best visualization options:
        </p>
      </div>

      {/* Data Summary */}
      <div className="mb-6 p-4 bg-slate-800/30 rounded-lg">
        <h4 className="text-white font-semibold mb-2 text-sm">
          📊 Data Overview
        </h4>
        <div className="grid grid-cols-2 gap-4 text-xs">
          <div>
            <span className="text-slate-400">Rows:</span>
            <span className="text-cyan-400 ml-2 font-mono">
              {dataAnalysis.rowCount.toLocaleString()}
            </span>
          </div>
          <div>
            <span className="text-slate-400">Columns:</span>
            <span className="text-cyan-400 ml-2 font-mono">
              {dataAnalysis.columnCount}
            </span>
          </div>
          <div className="col-span-2">
            <span className="text-slate-400">Data Types:</span>
            <div className="flex flex-wrap gap-1 mt-1">
              {Object.entries(dataAnalysis.summary.dataTypes).map(
                ([type, count]) => (
                  <span
                    key={type}
                    className="bg-cyan-500/20 text-cyan-400 px-2 py-1 rounded-full text-xs"
                  >
                    {type}: {count}
                  </span>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="space-y-3">
        {dataAnalysis.recommendations.map((recommendation, index) => (
          <div key={index} className="relative">
            <div
              className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                selectedRecommendation?.type === recommendation.type
                  ? "border-cyan-400 bg-cyan-500/10"
                  : "border-slate-600 hover:border-cyan-500 bg-slate-800/30 hover:bg-slate-800/50"
              }`}
              onClick={() => handleRecommendationClick(recommendation)}
            >
              {/* Header */}
              <div className="flex items-start justify-between mb-2">
                <div className="flex items-center gap-3">
                  <span className="text-2xl">{recommendation.icon}</span>
                  <div>
                    <h4 className="text-white font-semibold text-sm">
                      {recommendation.title}
                    </h4>
                    <p className="text-slate-300 text-xs">
                      {recommendation.description}
                    </p>
                  </div>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <span
                    className={`text-xs font-semibold ${getConfidenceColor(
                      recommendation.confidence
                    )}`}
                  >
                    {(recommendation.confidence * 100).toFixed(0)}%
                  </span>
                  <span className="text-xs text-slate-400">
                    {getConfidenceLabel(recommendation.confidence)}
                  </span>
                </div>
              </div>

              {/* Columns Used */}
              <div className="mb-3">
                <span className="text-slate-400 text-xs">Using columns: </span>
                {recommendation.columns.map((col, i) => (
                  <span
                    key={i}
                    className="text-cyan-400 text-xs bg-cyan-500/20 px-2 py-1 rounded mr-1"
                  >
                    {col}
                  </span>
                ))}
              </div>

              {/* Details Toggle */}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  toggleDetails(index);
                }}
                className="text-xs text-slate-400 hover:text-cyan-400 transition-colors"
              >
                {showDetails[index] ? "▼ Hide Details" : "▶ Show Details"}
              </button>

              {/* Expandable Details */}
              {showDetails[index] && (
                <div className="mt-3 pt-3 border-t border-slate-700">
                  <div className="text-xs text-slate-300 space-y-2">
                    <div>
                      <strong>Chart Type:</strong> {recommendation.type}
                    </div>
                    <div>
                      <strong>Best For:</strong>{" "}
                      {getChartDescription(recommendation.type)}
                    </div>
                    <div>
                      <strong>Data Requirements:</strong>{" "}
                      {getDataRequirements(recommendation.type)}
                    </div>
                  </div>
                </div>
              )}

              {/* Selection Indicator */}
              {selectedRecommendation?.type === recommendation.type && (
                <div className="absolute top-2 right-2">
                  <div className="w-3 h-3 bg-cyan-400 rounded-full animate-pulse"></div>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Custom Chart Option */}
      <div className="mt-6 pt-6 border-t border-slate-700">
        <h4 className="text-white font-semibold mb-3 text-sm">
          ⚙️ Custom Options
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {[
            { type: "heatmap", icon: "🔥", name: "Heatmap" },
            { type: "network", icon: "🕸️", name: "Network" },
            { type: "sankey", icon: "🌊", name: "Flow Diagram" },
            { type: "violin", icon: "🎻", name: "Violin Plot" },
          ].map((chart) => (
            <button
              key={chart.type}
              onClick={() =>
                onChartSelect(chart.type, {
                  title: chart.name,
                  data: processedData,
                })
              }
              className="flex items-center gap-2 p-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors text-xs"
            >
              <span>{chart.icon}</span>
              <span className="text-slate-200">{chart.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Help Section */}
      <div className="mt-6 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <div className="flex items-start gap-2">
          <span className="text-blue-400 text-lg">💡</span>
          <div>
            <h5 className="text-blue-400 font-semibold text-xs mb-1">
              Pro Tip
            </h5>
            <p className="text-slate-300 text-xs">
              Charts with higher confidence scores are optimized for your
              specific data structure. Click any recommendation to generate an
              interactive visualization.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

const getChartDescription = (type) => {
  const descriptions = {
    histogram: "Showing distribution patterns and frequency of values",
    scatter: "Exploring correlations and relationships between variables",
    bar: "Comparing categorical data and identifying top performers",
    map: "Visualizing geographic patterns and spatial distributions",
    timeline: "Tracking changes and trends over time periods",
    "biodiversity-treemap": "Hierarchical visualization of species diversity",
    heatmap: "Showing intensity patterns across two dimensions",
    network: "Displaying connections and relationships between entities",
    sankey: "Visualizing flow and transitions between categories",
    violin: "Showing distribution density and statistical summaries",
  };
  return descriptions[type] || "Advanced data visualization";
};

const getDataRequirements = (type) => {
  const requirements = {
    histogram: "One numeric column",
    scatter: "Two numeric columns",
    bar: "One categorical column",
    map: "Latitude and longitude coordinates",
    timeline: "Date column and numeric values",
    "biodiversity-treemap": "Categorical hierarchy data",
    heatmap: "Two categorical or numeric dimensions",
    network: "Source and target relationships",
    sankey: "Flow data with source, target, and values",
    violin: "Numeric data with optional grouping",
  };
  return requirements[type] || "Depends on chart complexity";
};

export default ChartRecommendations;
