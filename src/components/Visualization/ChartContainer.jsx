import React, { useState, useRef, useEffect } from "react";
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
  const [chartError, setChartError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const containerRef = useRef(null);

  // Reset chart ready state when chart type or config changes
  useEffect(() => {
    if (chartType && data) {
      setChartReady(false);
      setChartError(null);
      setIsLoading(true);
    }
  }, [chartType, config, data]);

  const handleFullscreen = () => {
    if (!isFullscreen && containerRef.current) {
      if (containerRef.current.requestFullscreen) {
        containerRef.current.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleChartReady = (svgNode) => {
    setChartReady(true);
    setIsLoading(false);
    setChartError(null);
  };

  const handleChartError = (error) => {
    setChartError(error);
    setIsLoading(false);
    setChartReady(false);
  };

  // Enhanced step content rendering
  const renderStepContent = () => {
    switch (currentStep) {
      case "upload":
        return (
          <div className="flex flex-col items-center justify-center h-96 text-center">
            <div className="text-6xl mb-4 opacity-50">📊</div>
            <h3 className="text-xl font-bold text-white mb-2">
              Ready for Your Data
            </h3>
            <p className="text-slate-300 mb-4">
              Upload a file to get started with intelligent visualizations
            </p>
            <div className="bg-slate-800/50 rounded-lg p-4 text-sm text-slate-400">
              <p>💡 Supported formats: CSV, JSON, Excel, XML, TSV, TXT</p>
              <p>🚀 AI-powered chart recommendations</p>
              <p>🌊 Marine biodiversity optimized</p>
            </div>
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
              Our AI is examining your data structure, types, and patterns...
            </p>
            <div className="space-y-2 text-sm text-slate-400">
              <div className="flex items-center gap-2 justify-center">
                <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                <span>
                  Processing {data?.length?.toLocaleString() || 0} records
                </span>
              </div>
              <div
                className="flex items-center gap-2 justify-center"
                style={{ animationDelay: "0.5s" }}
              >
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></div>
                <span>Detecting column types and patterns</span>
              </div>
              <div
                className="flex items-center gap-2 justify-center"
                style={{ animationDelay: "1s" }}
              >
                <div className="w-2 h-2 bg-teal-400 rounded-full animate-pulse"></div>
                <span>Generating intelligent recommendations</span>
              </div>
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
                Select a chart type from the AI recommendations panel
              </p>
              {dataAnalysis && (
                <div className="bg-slate-800/50 rounded-lg p-4 text-left max-w-md">
                  <h4 className="text-cyan-400 font-semibold mb-2 text-sm">
                    Data Analysis Complete:
                  </h4>
                  <div className="text-xs text-slate-300 space-y-1">
                    <div className="flex justify-between">
                      <span>📊 Records:</span>
                      <span className="text-cyan-400">
                        {dataAnalysis.rowCount.toLocaleString()}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>📋 Columns:</span>
                      <span className="text-cyan-400">
                        {dataAnalysis.columnCount}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>🔢 Data Types:</span>
                      <span className="text-cyan-400">
                        {Object.keys(dataAnalysis.summary.dataTypes).length}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span>🎯 Recommendations:</span>
                      <span className="text-green-400">
                        {dataAnalysis.recommendations?.length || 0}
                      </span>
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

  // Don't show container if we're not ready for visualization
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
              {currentStep === "upload" && "⏳ Waiting for data"}
              {currentStep === "analyze" && "🔍 Analyzing structure"}
              {currentStep === "visualize" && "🎯 Ready to visualize"}
            </div>
          </div>
        </div>

        <div className="relative bg-slate-800/30 rounded-lg overflow-hidden min-h-[500px]">
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
            <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/20 to-transparent"></div>
          </div>

          <div className="relative z-10">{renderStepContent()}</div>
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
            {config.description || "Interactive chart powered by D3.js and AI"}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Chart Status */}
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium ${
              chartError
                ? "bg-red-500/20 text-red-400"
                : chartReady
                ? "bg-green-500/20 text-green-400"
                : isLoading
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-slate-600 text-slate-300"
            }`}
          >
            {chartError
              ? "❌ Error"
              : chartReady
              ? "✅ Ready"
              : isLoading
              ? "⏳ Loading"
              : "⏸️ Waiting"}
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
        {/* Error Display */}
        {chartError && (
          <div className="absolute inset-0 bg-red-900/20 backdrop-blur-sm z-20 flex items-center justify-center">
            <div className="text-center p-6 bg-slate-900/90 rounded-lg max-w-md">
              <span className="text-4xl mb-2 block">⚠️</span>
              <h4 className="text-red-400 font-semibold mb-2">
                Visualization Error
              </h4>
              <p className="text-slate-300 text-sm mb-3">{chartError}</p>
              <div className="text-xs text-slate-400">
                <p>• Check that your data columns are properly formatted</p>
                <p>• Ensure required columns are selected</p>
                <p>• Try a different chart type for this data</p>
              </div>
            </div>
          </div>
        )}

        {/* Loading Overlay */}
        {(isProcessing || isLoading) && (
          <div className="absolute inset-0 bg-slate-900/50 backdrop-blur-sm z-10 flex items-center justify-center">
            <div className="text-center">
              <div className="relative mb-4">
                <div className="w-12 h-12 border-4 border-cyan-500/30 rounded-full animate-spin"></div>
                <div className="absolute inset-0 w-12 h-12 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
              </div>
              <p className="text-cyan-400 font-semibold">
                {isProcessing
                  ? "Processing Data..."
                  : "Generating Visualization..."}
              </p>
              <p className="text-slate-400 text-sm mt-1">
                {chartType && `Creating ${chartType} chart`}
              </p>
            </div>
          </div>
        )}

        {/* Chart Container */}
        <div className="p-4">
          {data && chartType && config && (
            <VisualizationEngine
              data={data}
              chartType={chartType}
              config={{
                ...config,
                columns: config.columns,
                xColumn: config.xColumn,
                yColumn: config.yColumn,
                dateColumn: config.dateColumn,
                valueColumn: config.valueColumn,
                latColumn: config.latColumn,
                lonColumn: config.lonColumn,
                categoryColumn: config.categoryColumn,
                column: config.column,
              }}
              onChartReady={handleChartReady}
              onError={handleChartError}
            />
          )}
        </div>

        {/* Chart Info Overlay */}
        {chartReady && !chartError && (
          <div className="absolute bottom-4 left-4 bg-slate-900/90 backdrop-blur-sm rounded-lg p-3 max-w-xs">
            <div className="text-xs text-slate-300 space-y-1">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></span>
                <span>{data?.length?.toLocaleString()} data points</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full"></span>
                <span>Interactive D3.js visualization</span>
              </div>
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 bg-teal-400 rounded-full"></span>
                <span>AI-optimized styling</span>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Chart Statistics */}
      {chartReady && dataAnalysis && (
        <div className="mt-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            <div className="bg-slate-800/30 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-cyan-400 mb-1">
                {data?.length?.toLocaleString() || 0}
              </div>
              <div className="text-xs text-slate-400">📊 Records</div>
            </div>
            <div className="bg-slate-800/30 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-blue-400 mb-1">
                {dataAnalysis.columnCount || 0}
              </div>
              <div className="text-xs text-slate-400">📋 Columns</div>
            </div>
            <div className="bg-slate-800/30 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-teal-400 mb-1">
                {Object.keys(dataAnalysis.summary?.dataTypes || {}).length}
              </div>
              <div className="text-xs text-slate-400">🔢 Data Types</div>
            </div>
            <div className="bg-slate-800/30 rounded-lg p-3 text-center">
              <div className="text-lg font-bold text-green-400 mb-1">
                {chartType?.charAt(0).toUpperCase() + chartType?.slice(1) ||
                  "None"}
              </div>
              <div className="text-xs text-slate-400">📈 Chart Type</div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChartContainer;
