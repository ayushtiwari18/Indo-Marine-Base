import React, { useState, useCallback, useEffect } from "react";
import FileUploader from "./FileUploader";
import DataProcessor from "./DataProcessor";
import VisualizationEngine from "./VisualizationEngine";
import ChartRecommendations from "./ChartRecommendations";
import CustomizationPanel from "./CustomizationPanel";
import ChartContainer from "./ChartContainer";
import ExportManager from "./ExportManager";

const DataVisualizationTool = () => {
  const [uploadedFile, setUploadedFile] = useState(null);
  const [rawData, setRawData] = useState(null);
  const [processedData, setProcessedData] = useState(null);
  const [dataAnalysis, setDataAnalysis] = useState(null);
  const [selectedChart, setSelectedChart] = useState(null);
  const [chartConfig, setChartConfig] = useState({});
  const [isProcessing, setIsProcessing] = useState(false);
  const [currentStep, setCurrentStep] = useState("upload"); // upload, analyze, visualize, customize
  const [error, setError] = useState(null);
  const [processingProgress, setProcessingProgress] = useState(0);

  // Auto-save state to localStorage
  useEffect(() => {
    const savedState = localStorage.getItem("dataVisualizationTool");
    if (savedState) {
      try {
        const state = JSON.parse(savedState);
        if (state.processedData && state.dataAnalysis) {
          setProcessedData(state.processedData);
          setDataAnalysis(state.dataAnalysis);
          setSelectedChart(state.selectedChart);
          setChartConfig(state.chartConfig);
          setCurrentStep(state.currentStep || "visualize");
        }
      } catch (error) {
        console.warn("Failed to restore saved state:", error);
        localStorage.removeItem("dataVisualizationTool");
      }
    }
  }, []);

  // Save state when data changes
  useEffect(() => {
    if (processedData && dataAnalysis) {
      const stateToSave = {
        processedData,
        dataAnalysis,
        selectedChart,
        chartConfig,
        currentStep,
        timestamp: Date.now(),
      };
      localStorage.setItem(
        "dataVisualizationTool",
        JSON.stringify(stateToSave)
      );
    }
  }, [processedData, dataAnalysis, selectedChart, chartConfig, currentStep]);

  const handleFileUpload = useCallback(async (file) => {
    setUploadedFile(file);
    setIsProcessing(true);
    setCurrentStep("analyze");
    setError(null);
    setProcessingProgress(0);

    try {
      // Simulate progress updates
      const progressInterval = setInterval(() => {
        setProcessingProgress((prev) => {
          if (prev >= 90) {
            clearInterval(progressInterval);
            return 90;
          }
          return prev + Math.random() * 15;
        });
      }, 200);

      // Process the uploaded file
      const dataProcessor = new DataProcessor();
      const result = await dataProcessor.processFile(file);

      // Complete progress
      clearInterval(progressInterval);
      setProcessingProgress(100);

      // Validate results
      if (!result.processedData || result.processedData.length === 0) {
        throw new Error(
          "No valid data found in the file. Please check the file format and content."
        );
      }

      if (!result.analysis || !result.analysis.recommendations) {
        throw new Error(
          "Failed to analyze data structure. The file may be corrupted or in an unsupported format."
        );
      }

      setRawData(result.rawData);
      setProcessedData(result.processedData);
      setDataAnalysis(result.analysis);
      setCurrentStep("visualize");

      // Show success notification
      setTimeout(() => {
        showNotification(
          "success",
          `Successfully processed ${result.processedData.length.toLocaleString()} records with ${
            result.analysis.recommendations.length
          } chart recommendations!`
        );
      }, 500);
    } catch (error) {
      console.error("File processing error:", error);
      setError(error.message);
      setCurrentStep("upload");
      showNotification("error", `Processing failed: ${error.message}`);
    } finally {
      setIsProcessing(false);
      setProcessingProgress(0);
    }
  }, []);

  const handleChartSelection = useCallback(
    (chartType, config) => {
      if (!chartType) {
        console.warn("No chart type provided");
        return;
      }

      // Validate that required columns exist
      if (config.xColumn && !dataAnalysis.columns[config.xColumn]) {
        showNotification(
          "warning",
          `Column ${config.xColumn} not found in data`
        );
        return;
      }
      if (config.yColumn && !dataAnalysis.columns[config.yColumn]) {
        showNotification(
          "warning",
          `Column ${config.yColumn} not found in data`
        );
        return;
      }
      if (
        config.categoryColumn &&
        !dataAnalysis.columns[config.categoryColumn]
      ) {
        showNotification(
          "warning",
          `Column ${config.categoryColumn} not found in data`
        );
        return;
      }

      setSelectedChart(chartType);
      setChartConfig({
        ...config,
        // Add default config values
        animated: config.animated !== false,
        enableTooltips: config.enableTooltips !== false,
        enableLegend: config.enableLegend !== false,
        colorScheme: config.colorScheme || "ocean",
        width: config.width || "800",
        height: config.height || "500",
      });
      setCurrentStep("customize");

      showNotification(
        "success",
        `Selected ${
          chartType.charAt(0).toUpperCase() + chartType.slice(1)
        } chart`
      );
    },
    [dataAnalysis]
  );

  const handleConfigChange = useCallback(
    (newConfig) => {
      if (newConfig.reset) {
        // Reset to default config
        const defaultConfig = {
          title: "",
          colorScheme: "ocean",
          width: "800",
          height: "500",
          animated: true,
          enableTooltips: true,
          enableLegend: true,
          maxRecords: "1000",
          bins: 20,
        };
        setChartConfig(defaultConfig);
        showNotification("info", "Configuration reset to defaults");
      } else if (newConfig.chartType && newConfig.chartType !== selectedChart) {
        // Handle chart type change
        setSelectedChart(newConfig.chartType);
        const { chartType, ...configWithoutType } = newConfig;
        setChartConfig((prev) => ({ ...prev, ...configWithoutType }));
        showNotification("info", `Changed to ${newConfig.chartType} chart`);
      } else {
        // Regular config update
        setChartConfig((prev) => ({ ...prev, ...newConfig }));
      }
    },
    [selectedChart]
  );

  const resetTool = useCallback(() => {
    setUploadedFile(null);
    setRawData(null);
    setProcessedData(null);
    setDataAnalysis(null);
    setSelectedChart(null);
    setChartConfig({});
    setCurrentStep("upload");
    setError(null);

    // Clear saved state
    localStorage.removeItem("dataVisualizationTool");

    showNotification("info", "Tool reset successfully");
  }, []);

  // Notification system
  const [notifications, setNotifications] = useState([]);

  const showNotification = (type, message, duration = 4000) => {
    const id = Date.now();
    const notification = { id, type, message };

    setNotifications((prev) => [...prev, notification]);

    setTimeout(() => {
      setNotifications((prev) => prev.filter((n) => n.id !== id));
    }, duration);
  };

  const removeNotification = (id) => {
    setNotifications((prev) => prev.filter((n) => n.id !== id));
  };

  // Keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey || event.metaKey) {
        switch (event.key) {
          case "r":
            event.preventDefault();
            if (currentStep !== "upload") {
              resetTool();
            }
            break;
          case "u":
            event.preventDefault();
            if (currentStep !== "upload") {
              setCurrentStep("upload");
            }
            break;
          default:
            break;
        }
      }

      if (event.key === "Escape" && currentStep === "customize") {
        setCurrentStep("visualize");
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [currentStep, resetTool]);

  // Get step progress percentage
  const getStepProgress = () => {
    const stepOrder = ["upload", "analyze", "visualize", "customize"];
    const currentIndex = stepOrder.indexOf(currentStep);
    return ((currentIndex + 1) / stepOrder.length) * 100;
  };

  // Enhanced step validation
  const canProceedToStep = (step) => {
    switch (step) {
      case "analyze":
        return uploadedFile !== null;
      case "visualize":
        return processedData !== null && dataAnalysis !== null;
      case "customize":
        return selectedChart !== null;
      default:
        return true;
    }
  };

  return (
    <div className="data-visualization-tool relative min-h-screen bg-slate-900">
      {/* Marine Background Effects */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="floating-sphere floating-sphere-1"></div>
        <div className="floating-sphere floating-sphere-2"></div>
        <div className="floating-sphere floating-sphere-3"></div>
        <div className="ocean-wave-line"></div>
        <div className="ocean-wave-glow"></div>
      </div>

      {/* Notifications */}
      <div className="fixed top-4 right-4 z-50 space-y-2">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className={`p-4 rounded-lg shadow-lg backdrop-blur-sm border animate-slide-in-right ${
              notification.type === "success"
                ? "bg-green-500/10 border-green-500/20 text-green-400"
                : notification.type === "error"
                ? "bg-red-500/10 border-red-500/20 text-red-400"
                : notification.type === "warning"
                ? "bg-yellow-500/10 border-yellow-500/20 text-yellow-400"
                : "bg-blue-500/10 border-blue-500/20 text-blue-400"
            }`}
          >
            <div className="flex items-start gap-2">
              <span className="text-lg">
                {notification.type === "success"
                  ? "✅"
                  : notification.type === "error"
                  ? "❌"
                  : notification.type === "warning"
                  ? "⚠️"
                  : "ℹ️"}
              </span>
              <div className="flex-1">
                <p className="text-sm font-medium">{notification.message}</p>
              </div>
              <button
                onClick={() => removeNotification(notification.id)}
                className="text-slate-400 hover:text-slate-200 transition-colors"
              >
                ✕
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center gap-2 bg-cyan-500/10 backdrop-blur-sm border border-cyan-500/20 rounded-full px-6 py-2 mb-4">
            <span className="text-2xl">📊</span>
            <span className="text-cyan-400 font-semibold">
              Universal Data Visualization Tool
            </span>
          </div>
          <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
            Transform Your{" "}
            <span className="bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
              Data into Insights
            </span>
          </h1>
          <p className="text-xl text-slate-300 max-w-3xl mx-auto">
            Upload any data file and get intelligent, interactive visualizations
            powered by AI and D3.js
          </p>

          {/* Enhanced Status Display */}
          {dataAnalysis && (
            <div className="mt-4 inline-flex items-center gap-4 text-sm text-slate-400">
              <span>📊 {dataAnalysis.rowCount.toLocaleString()} records</span>
              <span>📋 {dataAnalysis.columnCount} columns</span>
              {selectedChart && (
                <span>
                  🎨{" "}
                  {selectedChart.charAt(0).toUpperCase() +
                    selectedChart.slice(1)}{" "}
                  chart
                </span>
              )}
            </div>
          )}
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="relative">
            {/* Progress Bar */}
            <div className="absolute top-5 left-0 right-0 h-0.5 bg-slate-700 rounded-full">
              <div
                className="h-full bg-gradient-to-r from-cyan-400 to-blue-400 rounded-full transition-all duration-500"
                style={{ width: `${getStepProgress()}%` }}
              ></div>
            </div>

            <div className="flex items-center space-x-4 relative">
              {[
                { key: "upload", icon: "📁", label: "Upload" },
                { key: "analyze", icon: "🔍", label: "Analyze" },
                { key: "visualize", icon: "📊", label: "Visualize" },
                { key: "customize", icon: "🎨", label: "Customize" },
              ].map((step, index) => {
                const isActive = currentStep === step.key;
                const isCompleted =
                  index <
                  ["upload", "analyze", "visualize", "customize"].indexOf(
                    currentStep
                  );
                const isAccessible = canProceedToStep(step.key);

                return (
                  <div key={step.key} className="flex items-center">
                    <button
                      onClick={() => isAccessible && setCurrentStep(step.key)}
                      disabled={!isAccessible}
                      className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                        isActive
                          ? "bg-cyan-500 border-cyan-500 text-white shadow-lg shadow-cyan-500/25"
                          : isCompleted
                          ? "bg-green-500/20 border-green-500 text-green-400 hover:bg-green-500/30"
                          : isAccessible
                          ? "border-slate-600 text-slate-400 hover:border-slate-500"
                          : "border-slate-700 text-slate-600 cursor-not-allowed"
                      }`}
                      title={`${step.label} ${
                        !isAccessible ? "(Complete previous steps first)" : ""
                      }`}
                    >
                      <span className="text-sm">
                        {isCompleted ? "✓" : step.icon}
                      </span>
                    </button>
                    <span
                      className={`ml-2 text-sm font-medium transition-colors ${
                        isActive
                          ? "text-cyan-400"
                          : isCompleted
                          ? "text-green-400"
                          : "text-slate-400"
                      }`}
                    >
                      {step.label}
                    </span>
                    {index < 3 && (
                      <div className="w-8 h-0.5 bg-transparent mx-4"></div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* Processing Progress Bar */}
        {isProcessing && (
          <div className="mb-6 max-w-md mx-auto">
            <div className="flex items-center gap-3 mb-2">
              <span className="text-sm text-slate-400">Processing...</span>
              <span className="text-sm text-cyan-400">
                {Math.round(processingProgress)}%
              </span>
            </div>
            <div className="w-full bg-slate-700 rounded-full h-2">
              <div
                className="bg-gradient-to-r from-cyan-400 to-blue-400 h-2 rounded-full transition-all duration-300"
                style={{ width: `${processingProgress}%` }}
              ></div>
            </div>
          </div>
        )}

        {/* Error Display */}
        {error && (
          <div className="mb-6 max-w-2xl mx-auto p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
            <div className="flex items-start gap-3">
              <span className="text-red-400 text-lg">❌</span>
              <div>
                <h4 className="text-red-400 font-semibold mb-1">
                  Processing Error
                </h4>
                <p className="text-slate-300 text-sm">{error}</p>
                <button
                  onClick={() => setError(null)}
                  className="mt-2 text-xs text-red-400 hover:text-red-300 underline"
                >
                  Dismiss
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Main Content Area */}
        <div className="grid lg:grid-cols-12 gap-8">
          {/* Left Panel - Controls */}
          <div className="lg:col-span-4">
            <div className="sticky top-8 space-y-6">
              {/* File Upload */}
              {currentStep === "upload" && (
                <FileUploader
                  onFileUpload={handleFileUpload}
                  isProcessing={isProcessing}
                />
              )}

              {/* Chart Recommendations */}
              {currentStep === "visualize" && dataAnalysis && (
                <ChartRecommendations
                  dataAnalysis={dataAnalysis}
                  processedData={processedData}
                  onChartSelect={handleChartSelection}
                />
              )}

              {/* Customization Panel */}
              {currentStep === "customize" && selectedChart && (
                <CustomizationPanel
                  chartType={selectedChart}
                  config={chartConfig}
                  dataAnalysis={dataAnalysis}
                  onConfigChange={handleConfigChange}
                />
              )}

              {/* Export Manager - Show when chart is selected */}
              {selectedChart && processedData && (
                <ExportManager
                  chartData={processedData}
                  chartConfig={chartConfig}
                  chartType={selectedChart}
                />
              )}

              {/* Action Buttons */}
              <div className="space-y-2">
                {/* Reset Button */}
                {currentStep !== "upload" && (
                  <button
                    onClick={resetTool}
                    className="w-full ocean-btn-secondary px-4 py-2 rounded-lg text-sm font-medium flex items-center justify-center gap-2"
                    title="Ctrl+R to reset"
                  >
                    🔄 Start Over
                  </button>
                )}

                {/* Back Button */}
                {currentStep === "customize" && (
                  <button
                    onClick={() => setCurrentStep("visualize")}
                    className="w-full bg-slate-700/50 hover:bg-slate-700 text-slate-200 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    title="Escape to go back"
                  >
                    ← Back to Charts
                  </button>
                )}

                {/* Skip to Visualization (when chart is ready) */}
                {currentStep === "visualize" &&
                  !selectedChart &&
                  dataAnalysis?.recommendations?.length > 0 && (
                    <button
                      onClick={() => {
                        const firstRec = dataAnalysis.recommendations[0];
                        handleChartSelection(firstRec.type, {
                          title: firstRec.title,
                          columns: firstRec.columns,
                          data: processedData,
                        });
                      }}
                      className="w-full bg-cyan-600/20 hover:bg-cyan-600/30 text-cyan-400 border border-cyan-500/30 px-4 py-2 rounded-lg text-sm font-medium transition-colors"
                    >
                      ⚡ Quick Start with Top Recommendation
                    </button>
                  )}
              </div>

              {/* Keyboard Shortcuts Help */}
              <div className="p-3 bg-slate-800/30 rounded-lg">
                <h5 className="text-white font-semibold text-xs mb-2">
                  ⌨️ Keyboard Shortcuts
                </h5>
                <div className="text-xs text-slate-400 space-y-1">
                  <div>Ctrl+R: Reset tool</div>
                  <div>Ctrl+U: Back to upload</div>
                  <div>Escape: Go back (when customizing)</div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Panel - Visualization */}
          <div className="lg:col-span-8">
            <ChartContainer
              data={processedData}
              chartType={selectedChart}
              config={chartConfig}
              isProcessing={isProcessing}
              currentStep={currentStep}
              dataAnalysis={dataAnalysis}
            />
          </div>
        </div>

        {/* Footer */}
        <div className="mt-16 pt-8 border-t border-slate-800 text-center text-slate-500">
          <div className="flex items-center justify-center gap-6 text-sm">
            <span>🌊 Marine Biodiversity Optimized</span>
            <span>🤖 AI-Powered Recommendations</span>
            <span>📊 Interactive D3.js Charts</span>
            <span>⚡ Real-time Processing</span>
          </div>
          <div className="mt-2 text-xs">
            Built with React, D3.js, and intelligent data analysis algorithms
          </div>
        </div>
      </div>

      {/* Global Styles for Animations */}
      <style jsx>{`
        @keyframes slide-in-right {
          from {
            transform: translateX(100%);
            opacity: 0;
          }
          to {
            transform: translateX(0);
            opacity: 1;
          }
        }

        .animate-slide-in-right {
          animation: slide-in-right 0.3s ease-out;
        }

        .floating-sphere {
          position: absolute;
          border-radius: 50%;
          background: radial-gradient(
            circle at 30% 30%,
            rgba(6, 182, 212, 0.1),
            rgba(6, 182, 212, 0.05)
          );
          animation: float 6s ease-in-out infinite;
        }

        .floating-sphere-1 {
          width: 200px;
          height: 200px;
          top: 10%;
          left: 5%;
          animation-delay: 0s;
        }

        .floating-sphere-2 {
          width: 150px;
          height: 150px;
          top: 50%;
          right: 10%;
          animation-delay: 2s;
        }

        .floating-sphere-3 {
          width: 100px;
          height: 100px;
          bottom: 20%;
          left: 50%;
          animation-delay: 4s;
        }

        .ocean-wave-line {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 2px;
          background: linear-gradient(90deg, transparent, #06b6d4, transparent);
          animation: wave 4s ease-in-out infinite;
        }

        .ocean-wave-glow {
          position: absolute;
          bottom: 0;
          left: 0;
          right: 0;
          height: 20px;
          background: linear-gradient(
            0deg,
            rgba(6, 182, 212, 0.1),
            transparent
          );
          animation: glow 3s ease-in-out infinite alternate;
        }

        @keyframes float {
          0%,
          100% {
            transform: translateY(0px) rotate(0deg);
          }
          33% {
            transform: translateY(-20px) rotate(1deg);
          }
          66% {
            transform: translateY(10px) rotate(-1deg);
          }
        }

        @keyframes wave {
          0%,
          100% {
            transform: scaleX(1);
            opacity: 0.5;
          }
          50% {
            transform: scaleX(1.1);
            opacity: 0.8;
          }
        }

        @keyframes glow {
          0% {
            opacity: 0.3;
          }
          100% {
            opacity: 0.6;
          }
        }

        .ocean-btn-primary {
          background: linear-gradient(135deg, #06b6d4, #0ea5e9);
          color: white;
          border: none;
          transition: all 0.3s ease;
        }

        .ocean-btn-primary:hover {
          background: linear-gradient(135deg, #0891b2, #0284c7);
          box-shadow: 0 10px 25px rgba(6, 182, 212, 0.3);
        }

        .ocean-btn-secondary {
          background: rgba(71, 85, 105, 0.5);
          color: #cbd5e1;
          border: 1px solid rgba(71, 85, 105, 0.8);
          transition: all 0.3s ease;
        }

        .ocean-btn-secondary:hover {
          background: rgba(71, 85, 105, 0.8);
          border-color: #06b6d4;
          color: #06b6d4;
        }

        .ocean-card {
          background: linear-gradient(
            135deg,
            rgba(15, 23, 42, 0.8),
            rgba(30, 41, 59, 0.6)
          );
          backdrop-filter: blur(10px);
          border: 1px solid rgba(71, 85, 105, 0.3);
          border-radius: 12px;
          transition: all 0.3s ease;
        }

        .ocean-card:hover {
          border-color: rgba(6, 182, 212, 0.5);
          box-shadow: 0 8px 32px rgba(6, 182, 212, 0.1);
        }

        .dashboard-card {
          padding: 24px;
        }

        .slider::-webkit-slider-thumb {
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #06b6d4;
          cursor: pointer;
          box-shadow: 0 2px 6px rgba(6, 182, 212, 0.3);
        }

        .slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 50%;
          background: #06b6d4;
          cursor: pointer;
          border: none;
          box-shadow: 0 2px 6px rgba(6, 182, 212, 0.3);
        }
      `}</style>
    </div>
  );
};

export default DataVisualizationTool;
