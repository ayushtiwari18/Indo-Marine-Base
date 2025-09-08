import React, { useState, useCallback } from "react";
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

  const handleFileUpload = useCallback(async (file) => {
    setUploadedFile(file);
    setIsProcessing(true);
    setCurrentStep("analyze");

    try {
      // Process the uploaded file
      const dataProcessor = new DataProcessor();
      const result = await dataProcessor.processFile(file);

      setRawData(result.rawData);
      setProcessedData(result.processedData);
      setDataAnalysis(result.analysis);
      setCurrentStep("visualize");
    } catch (error) {
      console.error("File processing error:", error);
      alert("Error processing file: " + error.message);
      setCurrentStep("upload");
    } finally {
      setIsProcessing(false);
    }
  }, []);

  const handleChartSelection = useCallback((chartType, config) => {
    setSelectedChart(chartType);
    setChartConfig(config);
    setCurrentStep("customize");
  }, []);

  const handleConfigChange = useCallback((newConfig) => {
    setChartConfig((prev) => ({ ...prev, ...newConfig }));
  }, []);

  const resetTool = useCallback(() => {
    setUploadedFile(null);
    setRawData(null);
    setProcessedData(null);
    setDataAnalysis(null);
    setSelectedChart(null);
    setChartConfig({});
    setCurrentStep("upload");
  }, []);

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
        </div>

        {/* Progress Steps */}
        <div className="flex justify-center mb-8">
          <div className="flex items-center space-x-4">
            {[
              { key: "upload", icon: "📁", label: "Upload" },
              { key: "analyze", icon: "🔍", label: "Analyze" },
              { key: "visualize", icon: "📊", label: "Visualize" },
              { key: "customize", icon: "🎨", label: "Customize" },
            ].map((step, index) => (
              <div key={step.key} className="flex items-center">
                <div
                  className={`flex items-center justify-center w-10 h-10 rounded-full border-2 transition-all duration-300 ${
                    currentStep === step.key
                      ? "bg-cyan-500 border-cyan-500 text-white"
                      : index <
                        ["upload", "analyze", "visualize", "customize"].indexOf(
                          currentStep
                        )
                      ? "bg-cyan-500/20 border-cyan-500 text-cyan-400"
                      : "border-slate-600 text-slate-400"
                  }`}
                >
                  <span className="text-sm">{step.icon}</span>
                </div>
                <span
                  className={`ml-2 text-sm font-medium ${
                    currentStep === step.key
                      ? "text-cyan-400"
                      : "text-slate-400"
                  }`}
                >
                  {step.label}
                </span>
                {index < 3 && (
                  <div className="w-8 h-0.5 bg-slate-600 mx-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>

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

              {/* Export Manager */}
              {selectedChart && (
                <ExportManager
                  chartData={processedData}
                  chartConfig={chartConfig}
                  chartType={selectedChart}
                />
              )}

              {/* Reset Button */}
              {currentStep !== "upload" && (
                <button
                  onClick={resetTool}
                  className="w-full ocean-btn-secondary px-4 py-2 rounded-lg text-sm font-medium"
                >
                  🔄 Start Over
                </button>
              )}
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
      </div>
    </div>
  );
};

export default DataVisualizationTool;
