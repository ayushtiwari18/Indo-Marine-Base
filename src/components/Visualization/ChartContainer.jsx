import React, { useState, useRef } from "react";
import VisualizationEngine from "./VisualizationEngine";

const ChartContainer = ({
  data,
  chartType,
  config,
  isProcessing,
  currentStep,
  dataAnalysis,
}) => {
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [chartReady, setChartReady] = useState(false);
  const containerRef = useRef(null);

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const handleChartReady = (svgNode) => {
    setChartReady(true);
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case "upload":
        return (
          <div className="flex flex-col items-center justify-center h-96 text-center">
            <div className="text-6xl mb-4 opacity-50">📊</div>
            <h3 className="text-xl font-bold text-white mb-2">
              Ready for Your Data
            </h3>
            <p className="text-slate-300">
              Upload a file to get started with intelligent visualizations
            </p>
          </div>
        );

      case "analyze":
        return (
          <div className="flex flex-col items-center justify-center h-96 text-center">
            <div className="relative mb-6">
              <div className="w-16 h-16 border-4 border-cyan-500/30 rounded-full animate-spin"></div>
              <div className="absolute inset-0 w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">
              🔍 Analyzing Your Data
            </h3>
            <p className="text-slate-300 mb-4">
              Detecting data types and generating insights...
            </p>
            <div className="flex items-center gap-2 text-sm text-slate-400">
              <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
              <span>Processing {data?.length || 0} records</span>
            </div>
          </div>
        );

      case "visualize":
        if (!chartType) {
          return (
            <div className="flex flex-col items-center justify-center h-96 text-center">
              <div className="text-6xl mb-4">🎯</div>
              <h3 className="text-xl font-bold text-white mb-2">
                Choose Your Visualization
              </h3>
              <p className="text-slate-300 mb-4">
                Select a chart type from the recommendations panel
              </p>
              {dataAnalysis && (
                <div className="bg-slate-800/50 rounded-lg p-4 text-left">
                  <h4 className="text-cyan-400 font-semibold mb-2 text-sm">
                    Data Summary:
                  </h4>
                  <div className="text-xs text-slate-300 space-y-1">
                    <div>
                      📊 {dataAnalysis.rowCount.toLocaleString()} rows,{" "}
                      {dataAnalysis.columnCount} columns
                    </div>
                    <div>
                      🔢{" "}
                      {Object.entries(dataAnalysis.summary.dataTypes)
                        .map(([type, count]) => `${count} ${type}`)
                        .join(", ")}
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        }
        break;

      default:
        break;
    }

    return null;
  };

  if (
    (currentStep !== "customize" && currentStep !== "visualize") ||
    !chartType
  ) {
    return (
      <div
        className={`ocean-card dashboard-card ${
          isFullscreen ? "fixed inset-4 z-50" : ""
        }`}
      >
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-xl font-bold text-white">
            📊 Visualization Area
          </h3>
          <div className="flex items-center gap-2">
            <div
              className={`px-3 py-1 rounded-full text-xs font-medium ${
                currentStep === "upload"
                  ? "bg-slate-600 text-slate-300"
                  : currentStep === "analyze"
                  ? "bg-yellow-500/20 text-yellow-400"
                  : "bg-cyan-500/20 text-cyan-400"
              }`}
            >
              {currentStep === "upload" && "⏳ Waiting"}
              {currentStep === "analyze" && "🔍 Analyzing"}
              {currentStep === "visualize" && "🎯 Ready"}
            </div>
          </div>
        </div>

        <div className="relative bg-slate-800/30 rounded-lg overflow-hidden">
          {/* Marine Background Animation */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-32 h-32 bg-cyan-400/5 rounded-full animate-pulse"></div>
            <div
              className="absolute bottom-1/3 right-1/4 w-24 h-24 bg-blue-400/5 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
            <div
              className="absolute top-1/2 right-1/3 w-16 h-16 bg-teal-400/5 rounded-full animate-pulse"
              style={{ animationDelay: "2s" }}
            ></div>
          </div>

          {renderStepContent()}
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`ocean-card dashboard-card transition-all duration-300 ${
        isFullscreen ? "fixed inset-4 z-50 overflow-auto" : ""
      }`}
    >
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div>
          <h3 className="text-xl font-bold text-white">
            {config.title || "Data Visualization"}
          </h3>
          <p className="text-slate-300 text-sm">
            {config.description || "Interactive chart powered by D3.js"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Chart Status */}
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              chartReady
                ? "bg-green-500/20 text-green-400"
                : "bg-yellow-500/20 text-yellow-400"
            }`}
          >
            {chartReady ? "✅ Ready" : "⏳ Loading"}
          </div>

          {/* Fullscreen Toggle */}
          <button
            onClick={handleFullscreen}
            className="p-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors"
            title={isFullscreen ? "Exit Fullscreen" : "Enter Fullscreen"}
          >
            <span className="text-slate-300">{isFullscreen ? "🗗" : "🗖"}</span>
          </button>
        </div>
      </div>

      {/* Chart Area */}
      <div className="relative bg-slate-800/30 rounded-lg overflow-hidden">
        {/* Loading Overlay */}
        {isProcessing && (
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="text-center">
              <div className="relative mb-4">
                <div className="w-12 h-12 border-4 border-cyan-500/30 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-cyan-400 font-semibold">
                Generating Visualization...
              </p>
            </div>
          </div>
        )}

        {/* Chart Container */}
        <div className="p-4">
          {data && chartType && (
            <VisualizationEngine
              data={data}
              chartType={chartType}
              config={config}
              onChartReady={handleChartReady}
            />
          )}
        </div>

        {/* Chart Info Overlay */}
        {chartReady && (
          <div className="absolute bottom-4 left-4 bg-slate-900/80 backdrop-blur-sm rounded-lg p-3">
            <div className="text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full"></span>
                <span>{data?.length.toLocaleString()} data points</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span>Interactive D3.js visualization</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
                <span>Ocean-themed styling</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chart Statistics */}
      {chartReady && dataAnalysis && (
        <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="bg-slate-800/30 rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-cyan-400">
              {dataAnalysis.rowCount.toLocaleString()}
            </div>
            <div className="text-xs text-slate-400">Records</div>
          </div>
          <div className="bg-slate-800/30 rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-blue-400">
              {dataAnalysis.columnCount}
            </div>
            <div className="text-xs text-slate-400">Columns</div>
          </div>
          <div className="bg-slate-800/30 rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-teal-400">
              {Object.values(dataAnalysis.summary.dataTypes).reduce(
                (a, b) => a + b,
                0
              )}
            </div>
            <div className="text-xs text-slate-400">Data Types</div>
          </div>
          <div className="bg-slate-800/30 rounded-lg p-3 text-center">
            <div className="text-xl font-bold text-green-400">
              {chartType.charAt(0).toUpperCase() + chartType.slice(1)}
            </div>
            <div className="text-xs text-slate-400">Chart Type</div>
          </div>
        </div>
      )}

      {/* Marine Background Effects for Fullscreen */}
      {isFullscreen && (
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="floating-sphere floating-sphere-1"></div>
          <div className="floating-sphere floating-sphere-2"></div>
          <div className="floating-sphere floating-sphere-3"></div>
          <div className="ocean-wave-line"></div>
          <div className="ocean-wave-glow"></div>
        </div>
      )}
    </div>
  );
};

export default ChartContainer;
