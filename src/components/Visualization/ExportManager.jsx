import React, { useState } from "react";
import { saveAs } from "file-saver";

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
    if (!chartData || chartData.length === 0) {
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
    try {
      const chartElement = document.querySelector(".visualization-engine svg");
      if (!chartElement) {
        throw new Error("Chart not found");
      }

      // Use html2canvas for PNG export
      const { default: html2canvas } = await import("html2canvas");

      const canvas = await html2canvas(chartElement.parentElement, {
        backgroundColor: "#1e293b",
        scale: 2, // High resolution
        logging: false,
        useCORS: true,
        allowTaint: false,
      });

      canvas.toBlob((blob) => {
        if (blob) {
          saveAs(blob, `${getFileName()}.png`);
        } else {
          throw new Error("Failed to generate PNG");
        }
      }, "image/png");
    } catch (error) {
      throw new Error(`PNG export failed: ${error.message}`);
    }
  };

  const exportAsSVG = async () => {
    try {
      const svgElement = document.querySelector(".visualization-engine svg");
      if (!svgElement) {
        throw new Error("SVG chart not found");
      }

      // Clone the SVG to avoid modifying the original
      const svgClone = svgElement.cloneNode(true);

      // Add CSS styles to the SVG
      const styleElement = document.createElementNS(
        "http://www.w3.org/2000/svg",
        "style"
      );
      styleElement.textContent = `
        .ocean-gradient { fill: url(#oceanGradient); }
        text { font-family: system-ui, -apple-system, sans-serif; }
        .bar { transition: none; }
        .dot { transition: none; }
      `;
      svgClone.insertBefore(styleElement, svgClone.firstChild);

      // Set proper dimensions
      svgClone.setAttribute("width", chartConfig.width || "800");
      svgClone.setAttribute("height", chartConfig.height || "500");

      const serializer = new XMLSerializer();
      const svgString = serializer.serializeToString(svgClone);

      // Add XML declaration
      const fullSvg = `<?xml version="1.0" encoding="UTF-8"?>\n${svgString}`;

      const blob = new Blob([fullSvg], { type: "image/svg+xml" });
      saveAs(blob, `${getFileName()}.svg`);
    } catch (error) {
      throw new Error(`SVG export failed: ${error.message}`);
    }
  };

  const exportAsPDF = async () => {
    try {
      // Dynamic import of jsPDF
      const { jsPDF } = await import("jspdf");

      const chartElement = document.querySelector(".visualization-engine svg");
      if (!chartElement) {
        throw new Error("Chart not found");
      }

      // Convert SVG to canvas first
      const { default: html2canvas } = await import("html2canvas");

      const canvas = await html2canvas(chartElement.parentElement, {
        backgroundColor: "#1e293b",
        scale: 2,
        logging: false,
        useCORS: true,
      });

      // Create PDF
      const pdf = new jsPDF({
        orientation: "landscape",
        unit: "px",
        format: [canvas.width, canvas.height],
      });

      // Add title
      pdf.setFontSize(16);
      pdf.setTextColor(255, 255, 255);
      pdf.text(chartConfig.title || "Data Visualization", 20, 30);

      // Add chart image
      const imgData = canvas.toDataURL("image/png");
      pdf.addImage(imgData, "PNG", 0, 0, canvas.width, canvas.height);

      // Add metadata
      pdf.setFontSize(10);
      pdf.text(
        `Generated: ${new Date().toLocaleString()}`,
        20,
        canvas.height - 20
      );
      pdf.text(
        `Records: ${chartData.length.toLocaleString()}`,
        20,
        canvas.height - 10
      );

      // Save PDF
      pdf.save(`${getFileName()}.pdf`);
    } catch (error) {
      throw new Error(`PDF export failed: ${error.message}`);
    }
  };

  const exportAsCSV = async () => {
    try {
      if (!chartData || !Array.isArray(chartData)) {
        throw new Error("Invalid data for CSV export");
      }

      const csvContent = convertToCSV(chartData);
      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      saveAs(blob, `${getFileName()}.csv`);
    } catch (error) {
      throw new Error(`CSV export failed: ${error.message}`);
    }
  };

  const exportAsJSON = async () => {
    try {
      const exportData = {
        metadata: {
          chartType: chartType,
          config: chartConfig,
          exportedAt: new Date().toISOString(),
          recordCount: chartData.length,
          columns: Object.keys(chartData[0] || {}),
        },
        data: chartData,
      };

      const jsonString = JSON.stringify(exportData, null, 2);
      const blob = new Blob([jsonString], { type: "application/json" });
      saveAs(blob, `${getFileName()}.json`);
    } catch (error) {
      throw new Error(`JSON export failed: ${error.message}`);
    }
  };

  const exportAsExcel = async () => {
    try {
      // Dynamic import of xlsx library
      const XLSX = await import("xlsx");

      const workbook = XLSX.utils.book_new();

      // Main data sheet
      const dataSheet = XLSX.utils.json_to_sheet(chartData);

      // Add column widths for better formatting
      const cols = Object.keys(chartData[0] || {}).map(() => ({ wch: 15 }));
      dataSheet["!cols"] = cols;

      XLSX.utils.book_append_sheet(workbook, dataSheet, "Data");

      // Metadata sheet
      const metadata = [
        { Property: "Chart Type", Value: chartType },
        { Property: "Title", Value: chartConfig.title || "Untitled Chart" },
        { Property: "Records Count", Value: chartData.length },
        {
          Property: "Columns Count",
          Value: Object.keys(chartData[0] || {}).length,
        },
        { Property: "Exported At", Value: new Date().toLocaleString() },
        { Property: "Export Format", Value: "Excel Workbook" },
      ];

      const metadataSheet = XLSX.utils.json_to_sheet(metadata);
      XLSX.utils.book_append_sheet(workbook, metadataSheet, "Metadata");

      // Chart configuration sheet if available
      if (chartConfig && Object.keys(chartConfig).length > 0) {
        const configData = Object.entries(chartConfig).map(([key, value]) => ({
          Setting: key,
          Value:
            typeof value === "object" ? JSON.stringify(value) : String(value),
        }));

        const configSheet = XLSX.utils.json_to_sheet(configData);
        XLSX.utils.book_append_sheet(workbook, configSheet, "Configuration");
      }

      // Generate Excel file
      const excelBuffer = XLSX.writeFile(workbook, `${getFileName()}.xlsx`);
    } catch (error) {
      throw new Error(`Excel export failed: ${error.message}`);
    }
  };

  const convertToCSV = (data) => {
    if (!data || data.length === 0) return "";

    const headers = Object.keys(data[0]);
    const csvRows = [headers.join(",")];

    data.forEach((row) => {
      const values = headers.map((header) => {
        let value = row[header];

        // Handle null/undefined
        if (value === null || value === undefined) {
          return "";
        }

        // Convert to string
        value = String(value);

        // Escape commas and quotes in CSV
        if (
          value.includes(",") ||
          value.includes('"') ||
          value.includes("\n")
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
    const title = (chartConfig.title || "marine-chart")
      .toLowerCase()
      .replace(/[^a-z0-9]/g, "-")
      .replace(/-+/g, "-")
      .replace(/^-|-$/g, "");

    const timestamp = new Date()
      .toISOString()
      .slice(0, 19)
      .replace(/[:.]/g, "-");

    return `${title}-${timestamp}`;
  };

  const getFileSizeEstimate = () => {
    if (!chartData || chartData.length === 0) return "0 KB";

    const dataSize = JSON.stringify(chartData).length;
    const kb = Math.round(dataSize / 1024);

    switch (exportFormat) {
      case "png":
        return `~${Math.round(kb * 2)} KB`; // Images are typically larger
      case "svg":
        return `~${Math.round(kb * 0.3)} KB`; // SVG is more compact
      case "pdf":
        return `~${Math.round(kb * 3)} KB`; // PDF has overhead
      case "csv":
        return `~${Math.round(kb * 0.7)} KB`; // CSV is compact
      case "json":
        return `~${Math.round(kb * 1.2)} KB`; // JSON has structure overhead
      case "excel":
        return `~${Math.round(kb * 1.5)} KB`; // Excel has overhead
      default:
        return `~${kb} KB`;
    }
  };

  // Share functionality
  const handleShare = async (method) => {
    try {
      switch (method) {
        case "link":
          await copyShareableLink();
          break;
        case "email":
          await emailVisualization();
          break;
        default:
          break;
      }
    } catch (error) {
      console.error("Share failed:", error);
      alert("Share failed: " + error.message);
    }
  };

  const copyShareableLink = async () => {
    try {
      // Create a shareable state object
      const shareData = {
        chartType,
        config: chartConfig,
        dataHash: btoa(JSON.stringify(chartData)).slice(0, 100), // Truncated hash
        timestamp: Date.now(),
      };

      const shareUrl = `${window.location.origin}${
        window.location.pathname
      }?share=${btoa(JSON.stringify(shareData))}`;

      if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        alert("Shareable link copied to clipboard!");
      } else {
        // Fallback for older browsers
        const textArea = document.createElement("textarea");
        textArea.value = shareUrl;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand("copy");
        document.body.removeChild(textArea);
        alert("Shareable link copied to clipboard!");
      }
    } catch (error) {
      throw new Error(`Failed to copy link: ${error.message}`);
    }
  };

  const emailVisualization = () => {
    try {
      const subject = encodeURIComponent(
        `Data Visualization: ${chartConfig.title || "Marine Data Chart"}`
      );
      const body = encodeURIComponent(
        `I've created a data visualization that might interest you:\n\n` +
          `Chart Type: ${chartType}\n` +
          `Title: ${chartConfig.title || "Untitled"}\n` +
          `Data Points: ${chartData.length.toLocaleString()}\n` +
          `Generated: ${new Date().toLocaleString()}\n\n` +
          `You can view this visualization using the Marine Biodiversity Data Tool.`
      );

      const mailtoUrl = `mailto:?subject=${subject}&body=${body}`;
      window.open(mailtoUrl);
    } catch (error) {
      throw new Error(`Failed to create email: ${error.message}`);
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
              <div>🔢 Records: {chartData?.length?.toLocaleString() || 0}</div>
            </div>
          </div>
        </div>
      </div>

      {/* Export Button */}
      <button
        onClick={handleExport}
        disabled={isExporting || !chartData || chartData.length === 0}
        className={`w-full px-6 py-3 rounded-xl font-semibold transition-all duration-300 ${
          isExporting || !chartData || chartData.length === 0
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
          disabled={isExporting || !chartData || chartData.length === 0}
          className="px-3 py-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg text-sm text-slate-200 transition-colors disabled:opacity-50"
        >
          🖼️ Quick PNG
        </button>
        <button
          onClick={() => {
            setExportFormat("csv");
            setTimeout(handleExport, 100);
          }}
          disabled={isExporting || !chartData || chartData.length === 0}
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
          <button
            onClick={() => handleShare("link")}
            className="flex items-center gap-2 p-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors text-sm text-slate-200"
          >
            <span>📋</span>
            <span>Copy shareable link</span>
          </button>
          <button
            onClick={() => handleShare("email")}
            className="flex items-center gap-2 p-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors text-sm text-slate-200"
          >
            <span>📧</span>
            <span>Email visualization</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExportManager;
