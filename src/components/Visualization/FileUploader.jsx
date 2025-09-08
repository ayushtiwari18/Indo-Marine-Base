import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUploader = ({ onFileUpload, isProcessing }) => {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0]);
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/json": [".json"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
      "text/tab-separated-values": [".tsv"],
      "application/xml": [".xml"],
      "text/plain": [".txt"],
    },
    multiple: false,
    maxSize: 50 * 1024 * 1024, // 50MB
  });

  const supportedFormats = [
    { ext: "CSV", icon: "📊", desc: "Comma-separated values" },
    { ext: "JSON", icon: "📄", desc: "JavaScript Object Notation" },
    { ext: "XLSX/XLS", icon: "📈", desc: "Excel spreadsheets" },
    { ext: "TSV", icon: "📋", desc: "Tab-separated values" },
    { ext: "XML", icon: "🗂️", desc: "Extensible Markup Language" },
    { ext: "TXT", icon: "📝", desc: "Plain text files" },
  ];

  return (
    <div className="ocean-card dashboard-card">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2">
          📁 Upload Your Data
        </h3>
        <p className="text-slate-300 text-sm">
          Drag and drop your file or click to browse. We support multiple
          formats.
        </p>
      </div>

      {/* Upload Zone */}
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
          isDragActive
            ? "border-cyan-400 bg-cyan-500/10"
            : "border-slate-600 hover:border-cyan-500 hover:bg-slate-800/50"
        }`}
      >
        <input {...getInputProps()} />

        {/* Marine Animation Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
          <div className="absolute top-4 left-4 w-6 h-6 bg-cyan-400/20 rounded-full animate-pulse"></div>
          <div
            className="absolute bottom-6 right-8 w-4 h-4 bg-blue-400/20 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 right-4 w-5 h-5 bg-teal-400/20 rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative z-10">
          {isProcessing ? (
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-cyan-500/30 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
              <div className="text-cyan-400 font-semibold">
                🌊 Processing your data...
              </div>
              <div className="text-slate-400 text-sm">
                Analyzing structure and generating insights
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-6xl mb-4">{isDragActive ? "🌊" : "📁"}</div>
              <div>
                <p className="text-white font-semibold mb-2">
                  {isDragActive
                    ? "Drop your file here"
                    : "Choose a file to upload"}
                </p>
                <p className="text-slate-400 text-sm">
                  or drag and drop it anywhere in this area
                </p>
              </div>
              <div className="text-xs text-slate-500">
                Maximum file size: 50MB
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Supported Formats */}
      <div className="mt-6">
        <h4 className="text-white font-semibold mb-3 text-sm">
          🔧 Supported Formats
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {supportedFormats.map((format) => (
            <div
              key={format.ext}
              className="flex items-center gap-2 p-2 bg-slate-800/30 rounded-lg"
            >
              <span className="text-lg">{format.icon}</span>
              <div>
                <div className="text-cyan-400 font-medium text-xs">
                  {format.ext}
                </div>
                <div className="text-slate-400 text-xs">{format.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sample Data */}
      <div className="mt-6 p-4 bg-slate-800/30 rounded-lg">
        <h4 className="text-white font-semibold mb-2 text-sm">
          🧪 Try Sample Data
        </h4>
        <p className="text-slate-300 text-xs mb-3">
          Don't have data? Try our marine biodiversity sample datasets.
        </p>
        <div className="grid grid-cols-1 gap-2">
          {[
            { name: "Species Occurrences", icon: "🐟", size: "2.3KB" },
            { name: "Environmental Data", icon: "🌡️", size: "1.8KB" },
            { name: "Research Stations", icon: "📍", size: "1.1KB" },
          ].map((sample) => (
            <button
              key={sample.name}
              className="flex items-center justify-between p-2 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors text-xs"
              onClick={() => {
                // Handle sample data loading
                console.log("Loading sample:", sample.name);
              }}
            >
              <div className="flex items-center gap-2">
                <span>{sample.icon}</span>
                <span className="text-slate-200">{sample.name}</span>
              </div>
              <span className="text-slate-400">{sample.size}</span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
