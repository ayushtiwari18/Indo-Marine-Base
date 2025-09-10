import React, { useState, useMemo } from "react";

const ChartRecommendations = ({
  dataAnalysis,
  processedData,
  onChartSelect,
}) => {
  const [selectedRecommendation, setSelectedRecommendation] = useState(null);
  const [showDetails, setShowDetails] = useState({});

  // Enhanced recommendations with dynamic confidence calculation
  const enhancedRecommendations = useMemo(() => {
    if (!dataAnalysis || !dataAnalysis.recommendations) return [];

    return dataAnalysis.recommendations
      .map((rec) => {
        // Calculate dynamic confidence based on data quality
        let confidence = rec.confidence || 0.5;

        // Boost confidence for good data quality
        if (rec.columns && rec.columns.length > 0) {
          const columnsExist = rec.columns.every(
            (col) =>
              dataAnalysis.columns[col] && dataAnalysis.columns[col].count > 0
          );
          if (columnsExist) confidence += 0.1;

          // Check data completeness
          const avgCompleteness =
            rec.columns.reduce((sum, col) => {
              const colData = dataAnalysis.columns[col];
              if (!colData) return sum;
              return sum + colData.count / dataAnalysis.rowCount;
            }, 0) / rec.columns.length;

          confidence += avgCompleteness * 0.2;
        }

        // Adjust confidence based on data size
        if (dataAnalysis.rowCount < 10) confidence -= 0.2;
        else if (dataAnalysis.rowCount > 1000) confidence += 0.1;

        // Boost confidence for marine biodiversity data
        if (dataAnalysis.summary.hasMarineData) {
          if (rec.type === "biodiversity-treemap") confidence += 0.15;
          if (rec.type === "map" && dataAnalysis.summary.hasGeographicData)
            confidence += 0.1;
        }

        return {
          ...rec,
          confidence: Math.min(0.99, Math.max(0.1, confidence)),
        };
      })
      .sort((a, b) => b.confidence - a.confidence);
  }, [dataAnalysis]);

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
      width: "800",
      height: "500",
      animated: true,
      enableTooltips: true,
    };

    // Chart-specific configuration
    switch (recommendation.type) {
      case "scatter":
        if (recommendation.columns.length >= 2) {
          config.xColumn = recommendation.columns[0];
          config.yColumn = recommendation.columns[1];
        }
        break;
      case "histogram":
        if (recommendation.columns.length >= 1) {
          config.column = recommendation.columns[0];
          config.bins = Math.min(30, Math.max(10, Math.sqrt(data.length)));
        }
        break;
      case "bar":
        if (recommendation.columns.length >= 1) {
          config.categoryColumn = recommendation.columns[0];
        }
        break;
      case "map":
        if (recommendation.columns.length >= 2) {
          config.latColumn = recommendation.columns[0];
          config.lonColumn = recommendation.columns[1];
        }
        break;
      case "timeline":
        if (recommendation.columns.length >= 2) {
          config.dateColumn = recommendation.columns[0];
          config.valueColumn = recommendation.columns[1];
        }
        break;
    }

    return config;
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 0.85) return "text-green-400";
    if (confidence >= 0.7) return "text-yellow-400";
    if (confidence >= 0.5) return "text-orange-400";
    return "text-red-400";
  };

  const getConfidenceLabel = (confidence) => {
    if (confidence >= 0.85) return "Highly Recommended";
    if (confidence >= 0.7) return "Recommended";
    if (confidence >= 0.5) return "Consider This";
    return "Limited Suitability";
  };

  const getDataQualityInfo = (columns) => {
    if (!columns || columns.length === 0) return null;

    const qualityInfo = columns.map((col) => {
      const colData = dataAnalysis.columns[col];
      if (!colData) return { column: col, quality: "unknown", completeness: 0 };

      const completeness = colData.count / dataAnalysis.rowCount;
      let quality = "poor";
      if (completeness > 0.9) quality = "excellent";
      else if (completeness > 0.7) quality = "good";
      else if (completeness > 0.5) quality = "fair";

      return {
        column: col,
        quality,
        completeness: Math.round(completeness * 100),
      };
    });

    return qualityInfo;
  };

  return (
    <div className="ocean-card dashboard-card">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2">
          🎯 AI Chart Recommendations
        </h3>
        <p className="text-slate-300 text-sm">
          Based on intelligent analysis of your data structure and content, here
          are optimized visualization options:
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
          {/* Data Quality Indicators */}
          <div className="col-span-2 mt-2 pt-2 border-t border-slate-700">
            <div className="flex items-center gap-4 text-xs">
              {dataAnalysis.summary.hasGeographicData && (
                <span className="text-green-400">🗺️ Geographic</span>
              )}
              {dataAnalysis.summary.hasTimeData && (
                <span className="text-blue-400">⏰ Temporal</span>
              )}
              {dataAnalysis.summary.hasMarineData && (
                <span className="text-teal-400">🌊 Marine Bio</span>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Recommendations */}
      <div className="space-y-3">
        {enhancedRecommendations.length > 0 ? (
          enhancedRecommendations.map((recommendation, index) => {
            const qualityInfo = getDataQualityInfo(recommendation.columns);

            return (
              <div key={index} className="relative">
                <div
                  className={`p-4 rounded-lg border transition-all duration-300 cursor-pointer ${
                    selectedRecommendation?.type === recommendation.type
                      ? "border-cyan-400 bg-cyan-500/10 shadow-lg"
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
                    <span className="text-slate-400 text-xs">
                      Using columns:{" "}
                    </span>
                    <div className="flex flex-wrap gap-1 mt-1">
                      {recommendation.columns.map((col, i) => {
                        const colQuality = qualityInfo?.find(
                          (q) => q.column === col
                        );
                        return (
                          <span
                            key={i}
                            className={`text-xs px-2 py-1 rounded ${
                              colQuality?.quality === "excellent"
                                ? "bg-green-500/20 text-green-400"
                                : colQuality?.quality === "good"
                                ? "bg-blue-500/20 text-blue-400"
                                : colQuality?.quality === "fair"
                                ? "bg-yellow-500/20 text-yellow-400"
                                : "bg-red-500/20 text-red-400"
                            }`}
                            title={
                              colQuality
                                ? `${colQuality.completeness}% complete`
                                : "Unknown quality"
                            }
                          >
                            {col}
                            {colQuality && (
                              <span className="ml-1 text-xs opacity-70">
                                {colQuality.completeness}%
                              </span>
                            )}
                          </span>
                        );
                      })}
                    </div>
                  </div>

                  {/* Quick Stats */}
                  {recommendation.columns.length > 0 && (
                    <div className="mb-3 text-xs text-slate-400">
                      <div className="flex items-center gap-4">
                        <span>
                          📊{" "}
                          {dataAnalysis.columns[recommendation.columns[0]]
                            ?.count || 0}{" "}
                          valid values
                        </span>
                        {recommendation.type === "bar" &&
                          dataAnalysis.columns[recommendation.columns[0]] && (
                            <span>
                              🏷️{" "}
                              {
                                dataAnalysis.columns[recommendation.columns[0]]
                                  .uniqueValues
                              }{" "}
                              categories
                            </span>
                          )}
                        {(recommendation.type === "scatter" ||
                          recommendation.type === "timeline") &&
                          recommendation.columns.length >= 2 && (
                            <span>
                              📈{" "}
                              {Math.min(
                                dataAnalysis.columns[recommendation.columns[0]]
                                  ?.count || 0,
                                dataAnalysis.columns[recommendation.columns[1]]
                                  ?.count || 0
                              )}{" "}
                              data points
                            </span>
                          )}
                      </div>
                    </div>
                  )}

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
                        <div>
                          <strong>Recommended Size:</strong>{" "}
                          {getRecommendedSize(
                            recommendation.type,
                            dataAnalysis.rowCount
                          )}
                        </div>
                        {qualityInfo && (
                          <div>
                            <strong>Data Quality:</strong>
                            <div className="mt-1">
                              {qualityInfo.map((info, idx) => (
                                <div key={idx} className="flex justify-between">
                                  <span>{info.column}:</span>
                                  <span
                                    className={
                                      info.quality === "excellent"
                                        ? "text-green-400"
                                        : info.quality === "good"
                                        ? "text-blue-400"
                                        : info.quality === "fair"
                                        ? "text-yellow-400"
                                        : "text-red-400"
                                    }
                                  >
                                    {info.quality} ({info.completeness}%)
                                  </span>
                                </div>
                              ))}
                            </div>
                          </div>
                        )}
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
            );
          })
        ) : (
          <div className="text-center py-8">
            <span className="text-4xl mb-2 block">🤔</span>
            <p className="text-slate-400">
              No suitable visualizations found for this data.
            </p>
            <p className="text-slate-500 text-sm mt-1">
              Try uploading data with more diverse column types.
            </p>
          </div>
        )}
      </div>

      {/* Custom Chart Option */}
      <div className="mt-6 pt-6 border-t border-slate-700">
        <h4 className="text-white font-semibold mb-3 text-sm">
          ⚙️ Advanced Options
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {[
            {
              type: "heatmap",
              icon: "🔥",
              name: "Heatmap",
              description: "Correlation matrix",
            },
            {
              type: "network",
              icon: "🕸️",
              name: "Network",
              description: "Relationship graph",
            },
            {
              type: "sankey",
              icon: "🌊",
              name: "Flow Diagram",
              description: "Flow visualization",
            },
            {
              type: "violin",
              icon: "🎻",
              name: "Violin Plot",
              description: "Distribution density",
            },
          ].map((chart) => (
            <button
              key={chart.type}
              onClick={() =>
                onChartSelect(chart.type, {
                  title: chart.name,
                  description: chart.description,
                  data: processedData,
                  colorScheme: "ocean",
                })
              }
              className="flex items-start gap-2 p-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors text-left"
              title={chart.description}
            >
              <span className="text-lg">{chart.icon}</span>
              <div>
                <div className="text-slate-200 font-medium text-xs">
                  {chart.name}
                </div>
                <div className="text-slate-400 text-xs">
                  {chart.description}
                </div>
              </div>
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
              Smart Recommendations
            </h5>
            <p className="text-slate-300 text-xs">
              Our AI analyzes your data structure, completeness, and domain
              context to suggest the most effective visualizations. Higher
              confidence scores indicate better data compatibility and expected
              visual impact.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

// Enhanced utility functions
const getChartDescription = (type) => {
  const descriptions = {
    histogram:
      "Showing distribution patterns, frequency, and data spread across value ranges",
    scatter:
      "Exploring correlations, relationships, and patterns between two numeric variables",
    bar: "Comparing categorical data, rankings, and identifying top performers or outliers",
    map: "Visualizing geographic patterns, spatial distributions, and location-based insights",
    timeline:
      "Tracking changes, trends, and temporal patterns over time periods",
    "biodiversity-treemap":
      "Hierarchical visualization of species diversity, taxonomic relationships, and abundance",
    heatmap:
      "Showing intensity patterns, correlations, and relationships across multiple dimensions",
    network:
      "Displaying connections, relationships, and interactions between entities",
    sankey:
      "Visualizing flows, transitions, and quantity movements between categories",
    violin:
      "Showing distribution density, statistical summaries, and data shape comparisons",
  };
  return descriptions[type] || "Advanced data visualization technique";
};

const getDataRequirements = (type) => {
  const requirements = {
    histogram: "One numeric column with continuous values",
    scatter: "Two numeric columns for X and Y axes",
    bar: "One categorical column with discrete categories",
    map: "Latitude and longitude coordinate columns",
    timeline: "Date/time column and numeric value column",
    "biodiversity-treemap":
      "Categorical hierarchy or species classification data",
    heatmap: "Multiple numeric columns for correlation analysis",
    network: "Source and target relationship columns",
    sankey: "Flow data with source, target, and value columns",
    violin: "Numeric data with optional grouping variables",
  };
  return requirements[type] || "Specific data structure required";
};

const getRecommendedSize = (type, rowCount) => {
  const baseRecommendations = {
    histogram: rowCount > 1000 ? "800x600" : "800x500",
    scatter: rowCount > 5000 ? "1000x700" : "800x500",
    bar: "800x500",
    map: "1000x600",
    timeline: "1000x500",
    "biodiversity-treemap": "800x600",
    heatmap: "800x800",
    network: "800x800",
    sankey: "1000x600",
    violin: "800x600",
  };

  return baseRecommendations[type] || "800x500";
};

export default ChartRecommendations;
