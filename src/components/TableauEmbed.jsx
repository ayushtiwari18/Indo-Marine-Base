import React, { useState, useEffect, useRef } from "react";
import { Badge } from "@/components/ui/badge";
import { Activity, AlertCircle, RefreshCw } from "lucide-react";

const TableauEmbed = ({
  src,
  width = "100%",
  height = "600px",
  marginBottom = "0px",
  showLoadingIndicator = true,
  title = "Tableau Dashboard",
  className = "",
  onLoad,
  onError,
}) => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [retryCount, setRetryCount] = useState(0);
  const iframeRef = useRef(null);

  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;

    const handleLoad = () => {
      setIsLoading(false);
      setHasError(false);
      onLoad && onLoad();
    };

    const handleError = () => {
      setIsLoading(false);
      setHasError(true);
      onError && onError();
    };

    iframe.addEventListener("load", handleLoad);
    iframe.addEventListener("error", handleError);

    // Timeout fallback for loading state
    const timeout = setTimeout(() => {
      if (isLoading) {
        setIsLoading(false);
      }
    }, 10000);

    return () => {
      iframe.removeEventListener("load", handleLoad);
      iframe.removeEventListener("error", handleError);
      clearTimeout(timeout);
    };
  }, [src, retryCount, isLoading, onLoad, onError]);

  const handleRetry = () => {
    setIsLoading(true);
    setHasError(false);
    setRetryCount((prev) => prev + 1);
  };

  const getResponsiveWidth = () => {
    if (typeof width === "string" && width.includes("%")) {
      return width;
    }
    if (typeof width === "number") {
      return `${width}px`;
    }
    if (width === "auto") {
      return "100%";
    }
    return width;
  };

  return (
    <div className={`relative ${className}`}>
      {/* Loading Indicator */}
      {isLoading && showLoadingIndicator && (
        <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl border border-cyan-500/20">
          <div className="text-center space-y-4">
            <div className="relative">
              <div className="w-16 h-16 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mx-auto"></div>
              <div
                className="absolute inset-0 w-16 h-16 border-4 border-transparent border-t-blue-400 rounded-full animate-spin mx-auto"
                style={{ animationDelay: "0.5s", animationDuration: "1.5s" }}
              ></div>
            </div>
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-white">
                Loading {title}...
              </h4>
              <p className="text-slate-300 text-sm">
                Please wait while the dashboard loads
              </p>
              <Badge className="bg-gradient-to-r from-cyan-500 to-blue-500 text-white border-0">
                <Activity className="h-3 w-3 mr-1 animate-pulse" />
                Initializing Tableau
              </Badge>
            </div>
          </div>
        </div>
      )}

      {/* Error State */}
      {hasError && (
        <div className="absolute inset-0 bg-gradient-to-br from-red-900/20 via-slate-800/95 to-slate-900/95 backdrop-blur-sm flex items-center justify-center z-10 rounded-xl border border-red-500/20">
          <div className="text-center space-y-4 p-6">
            <AlertCircle className="h-16 w-16 text-red-400 mx-auto" />
            <div className="space-y-2">
              <h4 className="text-lg font-semibold text-white">
                Failed to Load Dashboard
              </h4>
              <p className="text-slate-300 text-sm max-w-md">
                Unable to load the Tableau dashboard. This might be due to
                network issues or dashboard availability.
              </p>
              <button
                onClick={handleRetry}
                className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-cyan-500 to-blue-500 text-white rounded-lg hover:from-cyan-600 hover:to-blue-600 transition-all duration-200 text-sm font-medium mt-4"
              >
                <RefreshCw className="h-4 w-4" />
                Retry Loading
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Tableau Iframe */}
      <iframe
        ref={iframeRef}
        key={`tableau-${retryCount}`}
        src={src}
        title={title}
        style={{
          width: getResponsiveWidth(),
          height: height,
          border: "none",
          marginBottom: marginBottom,
          display: hasError ? "none" : "block",
        }}
        allowFullScreen
        sandbox="allow-scripts allow-same-origin allow-forms allow-popups allow-popups-to-escape-sandbox"
        loading="lazy"
      />
    </div>
  );
};

export default TableauEmbed;
