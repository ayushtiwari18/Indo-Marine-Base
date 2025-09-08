import React, { useState } from "react";
import { saveAs } from "file-saver";
import html2canvas from "html2canvas";
import * as XLSX from "xlsx";

const ExportManager = ({ chartData, chartConfig, chartType }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [exportFormat, setExportFormat] = useState("png");

  const exportFormats = [
    {
      value: "png",
      label: "PNG Image",
      icon: "🖼️",
      desc: "High-quality raster image",
    },
    {
      value: "svg",
      label: "SVG Vector",
      icon: "📐",
      desc: "Scalable vector graphics",
    },
    {
      value: "pdf",
      label: "PDF Document",
      icon: "📄",
      desc: "Portable document format",
    },
    {
      value: "csv",
      label: "CSV Data",
      icon: "📊",
      desc: "Comma-separated values",
    },
    {
      value: "json",
      label: "JSON Data",
      icon: "🔧",
      desc: "JavaScript object notation",
    },
    {
      value: "excel",
      label: "Excel File",
      icon: "📈",
      desc: "Microsoft Excel workbook",
    },
  ];

  const handleExport = async () => {
    if (!chartData) {
      alert("No data available for export");
      return;
    }

    setIsExporting(true);

    try {
      switch (exportFormat) {
        case "png":
          await exportAsPNG();
          break;
        case "svg":
          await exportAsSVG();
          break;
        case "pdf":
          await exportAsPDF();
          break;
        case "csv":
          await exportAsCSV();
          break;
        case "json":
          await exportAsJSON();
          break;
        case "excel":
          await exportAsExcel();
          break;
        default:
          throw new Error("Unsupported export format");
      }
    } catch (error) {
      console.error("Export failed:", error);
      alert("Export failed: " + error.message);
    } finally {
      setIsExporting(false);
    }
  };

  const exportAsPNG = async () => {
    const chartElement = document.querySelector(".visualization-engine svg");
    if (!chartElement) {
      throw new Error("Chart not found");
    }

    const canvas = await html2canvas(chartElement.parentElement, {
      backgroundColor: "#1e293b",
      scale: 2, // High resolution
      logging: false,
    });

    canvas.toBlob((blob) => {
      saveAs(blob, `${getFileName()}.png`);
    });
  };

  const exportAsSVG = async () => {
    const svgElement = document.querySelector(".visualization-engine svg");
    if (!svgElement) {
      throw new Error("SVG chart not found");
    }

    // Clone the SVG to avoid modifying the original
    const svgClone = svgElement.cloneNode(true);

    // Add styling information
    const styleElement = document.createElementNS(
      "http://www.w3.org/2000/svg",
      "style"
    );
    styleElement.textContent = `
      .ocean-gradient { fill: url(#oceanGradient); }
      text { font-family: system-ui, -apple-system, sans-serif; }
    `;
    svgClone.insertBefore(styleElement, svgClone.firstChild);

    const serializer = new XMLSerializer();
    const svgString = serializer.serializeToString(svgClone);
    const blob = new Blob([svgString], { type: "image/svg+xml" });
    saveAs(blob, `${getFileName()}.svg`);
  };

  const exportAsPDF = async () => {
    // For PDF export, we'll use PNG conversion
    // In a real application, you might want to use a library like jsPDF
    const chartElement = document.querySelector(".visualization-engine svg");
    if (!chartElement) {
      throw new Error("Chart not found");
    }

    const canvas = await html2canvas(chartElement.parentElement, {
      backgroundColor: "#1e293b",
      scale: 2,
    });

    // Simple PDF creation (you might want to use jsPDF for better control)
    canvas.toBlob((blob) => {
      saveAs(blob, `${getFileName()}.png`); // Fallback to PNG
      alert("PDF export is not fully implemented. Exported as PNG instead.");
    });
  };

  const exportAsCSV = async () => {
    if (!chartData || !Array.isArray(chartData)) {
      throw new Error("Invalid data for CSV export");
    }

    const csvContent = convertToCSV(chartData);
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, `${getFileName()}.csv`);
  };

  const exportAsJSON = async () => {
    const exportData = {
      metadata: {
        chartType: chartType,
        config: chartConfig,
        exportedAt: new Date().toISOString(),
        recordCount: chartData.length,
      },
      data: chartData,
    };

    const jsonString = JSON.stringify(exportData, null, 2);
    const blob = new Blob([jsonString], { type: "application/json" });
    saveAs(blob, `${getFileName()}.json`);
  };

  const exportAsExcel = async () => {
    const workbook = XLSX.utils.book_new();

    // Main data sheet
    const dataSheet = XLSX.utils.json_to_sheet(chartData);
    XLSX.utils.book_append_sheet(workbook, dataSheet, "Data");

    // Metadata sheet
    const metadata = {
      "Chart Type": chartType,
      Title: chartConfig.title || "Untitled Chart",
      "Records Count": chartData.length,
      "Columns Count": Object.keys(chartData[0] || {}).length,
      "Exported At": new Date().toLocaleString(),
      "Export Format": "Excel Workbook",
    };

    const metadataSheet = XLSX.utils.json_to_sheet([metadata]);
    XLSX.utils.book_append_sheet(workbook, metadataSheet, "Metadata");

    // Generate Excel file
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });
    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    saveAs(blob, `${getFileName()}.xlsx`);
  };

  const convertToCSV = (data) => {
    if (!data || data.length === 0) return "";

    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(",")];

    data.forEach((row) => {
      const values = headers.map((header) => {
        const value = row[header];
        // Escape commas and quotes in CSV
        if (
          typeof value === "string" &&
          (value.includes(",") || value.includes('"'))
        ) {
          return `"${value.replace(/"/g, '""')}"`;
        }
        return value;
      });
      csvRows.push(values.join(","));
    });

    return csvRows.join("\n");
  };

  const getFileName = () => {
    const title = chartConfig.title || "marine-chart";
    const timestamp = new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/[:.]/g, "-");
    return `${title.toLowerCase().replace(/\s+/g, "-")}-${timestamp}`;
  };

  const getFileSizeEstimate = () => {
    if (!chartData) return "0 KB";

    const dataSize = JSON.stringify(chartData).length;
    const kb = Math.round(dataSize / 1024);

    switch (exportFormat) {
      case "png":
        return `~${Math.round(kb * 3)} KB`; // Images are typically larger
      case "svg":
        return `~${Math.round(kb * 0.5)} KB`; // SVG is more compact
      case "csv":
        return `~${Math.round(kb * 0.8)} KB`; // CSV is compact
      case "json":
        return `~${kb} KB`;
      case "excel":
        return `~${Math.round(kb * 1.5)} KB`; // Excel has overhead
      default:
        return `~${kb} KB`;
    }
  };

  return (
    <div className="ocean-card dashboard-card">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2">
          📤 Export Visualization
        </h3>
        <p className="text-slate-300 text-sm">
          Save your chart and data in various formats for sharing and further
          analysis.
        </p>
      </div>

      {/* Export Format Selection */}
      <div className="mb-6">
        <label className="block text-white font-semibold mb-3 text-sm">
          📁 Export Format
        </label>
        <div className="grid grid-cols-1 gap-2">
          {exportFormats.map((format) => (
            <button
              key={format.value}
              onClick={() => setExportFormat(format.value)}
              className={`flex items-center justify-between p-3 rounded-lg border transition-all text-left ${
                exportFormat === format.value
                  ? "border-cyan-400 bg-cyan-500/10"
                  : "border-slate-600 hover:border-cyan-500 bg-slate-800/30"
              }`}
            >
              <div className="flex items-center gap-3">
                <span className="text-xl">{format.icon}</span>
                <div>
                  <div className="text-slate-200 font-medium text-sm">
                    {format.label}
                  </div>
                  <div className="text-slate-400 text-xs">{format.desc}</div>
                </div>
              </div>
              <div className="text-slate-400 text-xs">
                {getFileSizeEstimate()}
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Export Options */}
      <div className="mb-6 p-4 bg-slate-800/30 rounded-lg">
        <h4 className="text-white font-semibold mb-3 text-sm">
          ⚙️ Export Options
        </h4>

        {(exportFormat === "png" || exportFormat === "svg") && (
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-slate-300 text-sm">
              <input
                type="checkbox"
                defaultChecked={true}
                className="w-4 h-4 text-cyan-400 bg-slate-800 border-slate-600 rounded focus:ring-cyan-400"
              />
              Include chart title and legends
            </label>
            <label className="flex items-center gap-2 text-slate-300 text-sm">
              <input
                type="checkbox"
                defaultChecked={false}
                className="w-4 h-4 text-cyan-400 bg-slate-800 border-slate-600 rounded focus:ring-cyan-400"
              />
              High resolution (2x scaling)
            </label>
          </div>
        )}

        {(exportFormat === "csv" ||
          exportFormat === "json" ||
          exportFormat === "excel") && (
          <div className="space-y-3">
            <label className="flex items-center gap-2 text-slate-300 text-sm">
              <input
                type="checkbox"
                defaultChecked={true}
                className="w-4 h-4 text-cyan-400 bg-slate-800 border-slate-600 rounded focus:ring-cyan-400"
              />
              Include metadata and chart configuration
            </label>
            <label className="flex items-center gap-2 text-slate-300 text-sm">
              <input
                type="checkbox"
                defaultChecked={false}
                className="w-4 h-4 text-cyan-400 bg-slate-800 border-slate-600 rounded focus:ring-cyan-400"
              />
              Export only visible/filtered data
            </label>
          </div>
        )}
      </div>

      {/* Export Summary */}
      <div className="mb-6 p-4 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <div className="flex items-start gap-3">
          <span className="text-blue-400 text-lg">ℹ️</span>
          <div>
            <h5 className="text-blue-400 font-semibold text-sm mb-1">
              Export Summary
            </h5>
            <div className="text-slate-300 text-xs space-y-1">
              <div>
                📊 Chart:{" "}
                {chartType.charAt(0).toUpperCase() + chartType.slice(1)}
              </div>
              <div>
                📁 Format:{" "}
                {exportFormats.find((f) => f.value === exportFormat)?.label}
              </div>
              <div>💾 Estimated Size: {getFileSizeEstimate()}</div>
              <div>🔢 Records: {chartData?.length.toLocaleString() || 0}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Button */}
      <button
        onClick={handleExport}
        disabled={isExporting || !chartData}
        className={`w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
          isExporting || !chartData
            ? "bg-slate-600 text-slate-400 cursor-not-allowed"
            : "ocean-btn-primary hover:scale-105"
        }`}
      >
        {isExporting ? (
          <div className="flex items-center justify-center gap-2">
            <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
            <span>Exporting...</span>
          </div>
        ) : (
          <div className="flex items-center justify-center gap-2">
            <span>📤</span>
            <span>
              Export{" "}
              {exportFormats.find((f) => f.value === exportFormat)?.label}
            </span>
          </div>
        )}
      </button>

      {/* Quick Actions */}
      <div className="mt-4 grid grid-cols-2 gap-2">
        <button
          onClick={() => {
            setExportFormat("png");
            setTimeout(handleExport, 100);
          }}
          disabled={isExporting || !chartData}
          className="px-3 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-sm text-slate-200 transition-colors disabled:opacity-50"
        >
          🖼️ Quick PNG
        </button>
        <button
          onClick={() => {
            setExportFormat("csv");
            setTimeout(handleExport, 100);
          }}
          disabled={isExporting || !chartData}
          className="px-3 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-sm text-slate-200 transition-colors disabled:opacity-50"
        >
          📊 Quick CSV
        </button>
      </div>

      {/* Share Options */}
      <div className="mt-6 pt-6 border-t border-slate-700">
        <h4 className="text-white font-semibold mb-3 text-sm">
          🔗 Share & Collaborate
        </h4>
        <div className="grid grid-cols-1 gap-2">
          <button className="flex items-center gap-2 p-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors text-sm text-slate-200">
            <span>📋</span>
            <span>Copy shareable link</span>
          </button>
          <button className="flex items-center gap-2 p-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors text-sm text-slate-200">
            <span>📧</span>
            <span>Email visualization</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportManager;
