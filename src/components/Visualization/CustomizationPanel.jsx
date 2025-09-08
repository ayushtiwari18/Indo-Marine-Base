import React, { useState } from "react";

const CustomizationPanel = ({
  chartType,
  config,
  dataAnalysis,
  onConfigChange,
}) => {
  const [activeTab, setActiveTab] = useState("appearance");

  const colorSchemes = [
    {
      name: "Ocean Blues",
      colors: ["#0ea5e9", "#06b6d4", "#22d3ee", "#67e8f9"],
      value: "ocean",
    },
    {
      name: "Marine Depths",
      colors: ["#1e3a8a", "#1e40af", "#3b82f6", "#60a5fa"],
      value: "depths",
    },
    {
      name: "Coral Reef",
      colors: ["#dc2626", "#ea580c", "#f59e0b", "#eab308"],
      value: "coral",
    },
    {
      name: "Tropical",
      colors: ["#059669", "#10b981", "#34d399", "#6ee7b7"],
      value: "tropical",
    },
    {
      name: "Sunset",
      colors: ["#7c3aed", "#a855f7", "#c084fc", "#e879f9"],
      value: "sunset",
    },
  ];

  const chartTypes = [
    { type: "histogram", name: "Histogram", icon: "📊" },
    { type: "scatter", name: "Scatter Plot", icon: "📈" },
    { type: "bar", name: "Bar Chart", icon: "📋" },
    { type: "map", name: "Map", icon: "🗺️" },
    { type: "timeline", name: "Timeline", icon: "⏱️" },
    { type: "biodiversity-treemap", name: "Treemap", icon: "🌿" },
    { type: "heatmap", name: "Heatmap", icon: "🔥" },
    { type: "network", name: "Network", icon: "🕸️" },
  ];

  const handleConfigChange = (key, value) => {
    onConfigChange({ [key]: value });
  };

  const getAvailableColumns = (type = "all") => {
    if (!dataAnalysis.columns) return [];

    const columns = Object.keys(dataAnalysis.columns);

    switch (type) {
      case "numeric":
        return columns.filter(
          (col) => dataAnalysis.dataTypes[col] === "numeric"
        );
      case "categorical":
        return columns.filter(
          (col) =>
            dataAnalysis.dataTypes[col] === "categorical" ||
            dataAnalysis.dataTypes[col] === "species"
        );
      case "date":
        return columns.filter((col) => dataAnalysis.dataTypes[col] === "date");
      case "geographic":
        return columns.filter(
          (col) => dataAnalysis.dataTypes[col] === "geographic"
        );
      default:
        return columns;
    }
  };

  const renderAppearanceTab = () => (
    <div className="space-y-6">
      {/* Color Scheme */}
      <div>
        <label className="block text-white font-semibold mb-3 text-sm">
          🎨 Color Scheme
        </label>
        <div className="grid grid-cols-1 gap-2">
          {colorSchemes.map((scheme) => (
            <button
              key={scheme.value}
              onClick={() => handleConfigChange("colorScheme", scheme.value)}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all ${
                config.colorScheme === scheme.value
                  ? "border-cyan-400 bg-cyan-500/10"
                  : "border-slate-600 hover:border-cyan-500 bg-slate-800/30"
              }`}
            >
              <span className="text-slate-200 text-sm">{scheme.name}</span>
              <div className="flex gap-1">
                {scheme.colors.map((color, i) => (
                  <div
                    key={i}
                    className="w-4 h-4 rounded-full border border-slate-500"
                    style={{ backgroundColor: color }}
                  />
                ))}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Chart Title */}
      <div>
        <label className="block text-white font-semibold mb-2 text-sm">
          📝 Chart Title
        </label>
        <input
          type="text"
          value={config.title || ""}
          onChange={(e) => handleConfigChange("title", e.target.value)}
          placeholder="Enter chart title..."
          className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-slate-200 placeholder-slate-400 focus:border-cyan-400 focus:outline-none text-sm"
        />
      </div>

      {/* Chart Size */}
      <div>
        <label className="block text-white font-semibold mb-2 text-sm">
          📐 Chart Size
        </label>
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-slate-400 text-xs mb-1">Width</label>
            <select
              value={config.width || "800"}
              onChange={(e) => handleConfigChange("width", e.target.value)}
              className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-slate-200 text-sm focus:border-cyan-400 focus:outline-none"
            >
              <option value="600">Small (600px)</option>
              <option value="800">Medium (800px)</option>
              <option value="1000">Large (1000px)</option>
              <option value="1200">Extra Large (1200px)</option>
            </select>
          </div>
          <div>
            <label className="block text-slate-400 text-xs mb-1">Height</label>
            <select
              value={config.height || "500"}
              onChange={(e) => handleConfigChange("height", e.target.value)}
              className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-slate-200 text-sm focus:border-cyan-400 focus:outline-none"
            >
              <option value="400">Small (400px)</option>
              <option value="500">Medium (500px)</option>
              <option value="600">Large (600px)</option>
              <option value="700">Extra Large (700px)</option>
            </select>
          </div>
        </div>
      </div>

      {/* Animation */}
      <div>
        <label className="flex items-center gap-2 text-white font-semibold text-sm">
          <input
            type="checkbox"
            checked={config.animated !== false}
            onChange={(e) => handleConfigChange("animated", e.target.checked)}
            className="w-4 h-4 text-cyan-400 bg-slate-800 border-slate-600 rounded focus:ring-cyan-400"
          />
          ✨ Enable Animations
        </label>
      </div>
    </div>
  );

  const renderDataTab = () => (
    <div className="space-y-6">
      {/* Chart Type Switcher */}
      <div>
        <label className="block text-white font-semibold mb-3 text-sm">
          📊 Chart Type
        </label>
        <div className="grid grid-cols-2 gap-2">
          {chartTypes.map((type) => (
            <button
              key={type.type}
              onClick={() => onConfigChange({ chartType: type.type })}
              className={`flex items-center gap-2 p-2 rounded-lg border transition-all text-sm ${
                chartType === type.type
                  ? "border-cyan-400 bg-cyan-500/10 text-cyan-400"
                  : "border-slate-600 hover:border-cyan-500 bg-slate-800/30 text-slate-200"
              }`}
            >
              <span>{type.icon}</span>
              <span>{type.name}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Column Selection based on chart type */}
      {chartType === "scatter" && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-white font-semibold mb-2 text-sm">
              X Axis
            </label>
            <select
              value={config.xColumn || ""}
              onChange={(e) => handleConfigChange("xColumn", e.target.value)}
              className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-slate-200 text-sm focus:border-cyan-400 focus:outline-none"
            >
              <option value="">Select column...</option>
              {getAvailableColumns("numeric").map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-white font-semibold mb-2 text-sm">
              Y Axis
            </label>
            <select
              value={config.yColumn || ""}
              onChange={(e) => handleConfigChange("yColumn", e.target.value)}
              className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-slate-200 text-sm focus:border-cyan-400 focus:outline-none"
            >
              <option value="">Select column...</option>
              {getAvailableColumns("numeric").map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {chartType === "histogram" && (
        <div>
          <label className="block text-white font-semibold mb-2 text-sm">
            Column
          </label>
          <select
            value={config.column || ""}
            onChange={(e) => handleConfigChange("column", e.target.value)}
            className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-slate-200 text-sm focus:border-cyan-400 focus:outline-none"
          >
            <option value="">Select column...</option>
            {getAvailableColumns("numeric").map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
          <div className="mt-3">
            <label className="block text-slate-400 text-xs mb-1">
              Number of Bins: {config.bins || 20}
            </label>
            <input
              type="range"
              min="5"
              max="50"
              value={config.bins || 20}
              onChange={(e) =>
                handleConfigChange("bins", parseInt(e.target.value))
              }
              className="w-full h-2 bg-slate-700 rounded-lg appearance-none cursor-pointer"
            />
          </div>
        </div>
      )}

      {chartType === "bar" && (
        <div>
          <label className="block text-white font-semibold mb-2 text-sm">
            Category Column
          </label>
          <select
            value={config.categoryColumn || ""}
            onChange={(e) =>
              handleConfigChange("categoryColumn", e.target.value)
            }
            className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-slate-200 text-sm focus:border-cyan-400 focus:outline-none"
          >
            <option value="">Select column...</option>
            {getAvailableColumns("categorical").map((col) => (
              <option key={col} value={col}>
                {col}
              </option>
            ))}
          </select>
        </div>
      )}

      {chartType === "map" && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-white font-semibold mb-2 text-sm">
              Latitude
            </label>
            <select
              value={config.latColumn || ""}
              onChange={(e) => handleConfigChange("latColumn", e.target.value)}
              className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-slate-200 text-sm focus:border-cyan-400 focus:outline-none"
            >
              <option value="">Select column...</option>
              {getAvailableColumns("numeric").map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-white font-semibold mb-2 text-sm">
              Longitude
            </label>
            <select
              value={config.lonColumn || ""}
              onChange={(e) => handleConfigChange("lonColumn", e.target.value)}
              className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-slate-200 text-sm focus:border-cyan-400 focus:outline-none"
            >
              <option value="">Select column...</option>
              {getAvailableColumns("numeric").map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {chartType === "timeline" && (
        <div className="grid grid-cols-2 gap-3">
          <div>
            <label className="block text-white font-semibold mb-2 text-sm">
              Date Column
            </label>
            <select
              value={config.dateColumn || ""}
              onChange={(e) => handleConfigChange("dateColumn", e.target.value)}
              className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-slate-200 text-sm focus:border-cyan-400 focus:outline-none"
            >
              <option value="">Select column...</option>
              {getAvailableColumns("date")
                .concat(getAvailableColumns("all"))
                .map((col) => (
                  <option key={col} value={col}>
                    {col}
                  </option>
                ))}
            </select>
          </div>
          <div>
            <label className="block text-white font-semibold mb-2 text-sm">
              Value Column
            </label>
            <select
              value={config.valueColumn || ""}
              onChange={(e) =>
                handleConfigChange("valueColumn", e.target.value)
              }
              className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-slate-200 text-sm focus:border-cyan-400 focus:outline-none"
            >
              <option value="">Select column...</option>
              {getAvailableColumns("numeric").map((col) => (
                <option key={col} value={col}>
                  {col}
                </option>
              ))}
            </select>
          </div>
        </div>
      )}

      {/* Data Filtering */}
      <div>
        <label className="block text-white font-semibold mb-2 text-sm">
          🔍 Data Filtering
        </label>
        <div className="space-y-3">
          <div>
            <label className="block text-slate-400 text-xs mb-1">
              Max Records to Display
            </label>
            <select
              value={config.maxRecords || "1000"}
              onChange={(e) => handleConfigChange("maxRecords", e.target.value)}
              className="w-full px-3 py-2 bg-slate-800/50 border border-slate-600 rounded-lg text-slate-200 text-sm focus:border-cyan-400 focus:outline-none"
            >
              <option value="100">100 records</option>
              <option value="500">500 records</option>
              <option value="1000">1,000 records</option>
              <option value="5000">5,000 records</option>
              <option value="all">All records</option>
            </select>
          </div>
          <div>
            <label className="flex items-center gap-2 text-slate-300 text-sm">
              <input
                type="checkbox"
                checked={config.removeOutliers || false}
                onChange={(e) =>
                  handleConfigChange("removeOutliers", e.target.checked)
                }
                className="w-4 h-4 text-cyan-400 bg-slate-800 border-slate-600 rounded focus:ring-cyan-400"
              />
              Remove statistical outliers
            </label>
          </div>
        </div>
      </div>
    </div>
  );

  const renderInteractionsTab = () => (
    <div className="space-y-6">
      {/* Interactions */}
      <div>
        <label className="block text-white font-semibold mb-3 text-sm">
          🖱️ Interactions
        </label>
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-slate-300 text-sm">
            <input
              type="checkbox"
              checked={config.enableZoom !== false}
              onChange={(e) =>
                handleConfigChange("enableZoom", e.target.checked)
              }
              className="w-4 h-4 text-cyan-400 bg-slate-800 border-slate-600 rounded focus:ring-cyan-400"
            />
            Enable zoom and pan
          </label>
          <label className="flex items-center gap-2 text-slate-300 text-sm">
            <input
              type="checkbox"
              checked={config.enableTooltips !== false}
              onChange={(e) =>
                handleConfigChange("enableTooltips", e.target.checked)
              }
              className="w-4 h-4 text-cyan-400 bg-slate-800 border-slate-600 rounded focus:ring-cyan-400"
            />
            Show tooltips on hover
          </label>
          <label className="flex items-center gap-2 text-slate-300 text-sm">
            <input
              type="checkbox"
              checked={config.enableBrush || false}
              onChange={(e) =>
                handleConfigChange("enableBrush", e.target.checked)
              }
              className="w-4 h-4 text-cyan-400 bg-slate-800 border-slate-600 rounded focus:ring-cyan-400"
            />
            Enable brush selection
          </label>
          <label className="flex items-center gap-2 text-slate-300 text-sm">
            <input
              type="checkbox"
              checked={config.enableLegend !== false}
              onChange={(e) =>
                handleConfigChange("enableLegend", e.target.checked)
              }
              className="w-4 h-4 text-cyan-400 bg-slate-800 border-slate-600 rounded focus:ring-cyan-400"
            />
            Show legend
          </label>
        </div>
      </div>

      {/* Marine Theme Options */}
      <div>
        <label className="block text-white font-semibold mb-3 text-sm">
          🌊 Marine Theme
        </label>
        <div className="space-y-3">
          <label className="flex items-center gap-2 text-slate-300 text-sm">
            <input
              type="checkbox"
              checked={config.marineBackground !== false}
              onChange={(e) =>
                handleConfigChange("marineBackground", e.target.checked)
              }
              className="w-4 h-4 text-cyan-400 bg-slate-800 border-slate-600 rounded focus:ring-cyan-400"
            />
            Ocean gradient background
          </label>
          <label className="flex items-center gap-2 text-slate-300 text-sm">
            <input
              type="checkbox"
              checked={config.waveEffects || false}
              onChange={(e) =>
                handleConfigChange("waveEffects", e.target.checked)
              }
              className="w-4 h-4 text-cyan-400 bg-slate-800 border-slate-600 rounded focus:ring-cyan-400"
            />
            Animated wave effects
          </label>
          <label className="flex items-center gap-2 text-slate-300 text-sm">
            <input
              type="checkbox"
              checked={config.marineIcons || false}
              onChange={(e) =>
                handleConfigChange("marineIcons", e.target.checked)
              }
              className="w-4 h-4 text-cyan-400 bg-slate-800 border-slate-600 rounded focus:ring-cyan-400"
            />
            Use marine-themed icons
          </label>
        </div>
      </div>
    </div>
  );

  return (
    <div className="ocean-card dashboard-card">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2">
          🎨 Customize Chart
        </h3>
        <p className="text-slate-300 text-sm">
          Adjust appearance, data selection, and interactions for your
          visualization.
        </p>
      </div>

      {/* Tabs */}
      <div className="flex space-x-1 mb-6 bg-slate-800/30 rounded-lg p-1">
        {[
          { key: "appearance", label: "🎨 Style", icon: "🎨" },
          { key: "data", label: "📊 Data", icon: "📊" },
          { key: "interactions", label: "🖱️ Options", icon: "🖱️" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
              activeTab === tab.key
                ? "bg-cyan-500/20 text-cyan-400 border border-cyan-500/30"
                : "text-slate-400 hover:text-slate-200 hover:bg-slate-700/50"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="min-h-[400px]">
        {activeTab === "appearance" && renderAppearanceTab()}
        {activeTab === "data" && renderDataTab()}
        {activeTab === "interactions" && renderInteractionsTab()}
      </div>

      {/* Reset Button */}
      <div className="mt-6 pt-6 border-t border-slate-700">
        <button
          onClick={() => onConfigChange({ reset: true })}
          className="w-full ocean-btn-secondary px-4 py-2 rounded-lg text-sm font-medium"
        >
          🔄 Reset to Defaults
        </button>
      </div>
    </div>
  );
};

export default CustomizationPanel;
