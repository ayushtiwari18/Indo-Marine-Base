import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Activity,
  BarChart3,
  Download,
  Expand,
  RefreshCw, // ✅ Correct import
  Settings,
  Share,
  TrendingUp,
  Waves,
  Globe,
  Eye,
} from "lucide-react";

const TableauDashboard = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [lastUpdated, setLastUpdated] = useState(new Date());
  const [viewMode, setViewMode] = useState("desktop");
  const [isFullscreen, setIsFullscreen] = useState(false);

  const dashboardRef = useRef(null);
  const headerRef = useRef(null);
  const controlsRef = useRef(null);
  const tableauRef = useRef(null);

  useEffect(() => {
    // Animation timeline
    const tl = gsap.timeline();

    // Header animation
    tl.from(headerRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.8,
      ease: "power2.out",
    });

    // Controls animation
    tl.from(
      controlsRef.current,
      {
        opacity: 0,
        y: 20,
        duration: 0.6,
        ease: "power2.out",
      },
      "-=0.5"
    );

    // Dashboard animation
    tl.from(
      dashboardRef.current,
      {
        opacity: 0,
        y: 40,
        duration: 0.8,
        ease: "power2.out",
      },
      "-=0.4"
    );

    return () => tl.kill();
  }, []);

  useEffect(() => {
    // Initialize Tableau dashboard
    const initTableau = () => {
      if (tableauRef.current) {
        const divElement = tableauRef.current;
        const vizElement = divElement.getElementsByTagName("object")[0];

        // Responsive sizing logic
        if (divElement.offsetWidth > 800) {
          vizElement.style.minWidth = "1200px";
          vizElement.style.maxWidth = "100%";
          vizElement.style.minHeight = "1050px";
          vizElement.style.maxHeight = divElement.offsetWidth * 0.75 + "px";
        } else if (divElement.offsetWidth > 500) {
          vizElement.style.minWidth = "1200px";
          vizElement.style.maxWidth = "100%";
          vizElement.style.minHeight = "1050px";
          vizElement.style.maxHeight = divElement.offsetWidth * 0.75 + "px";
        } else {
          vizElement.style.width = "100%";
          vizElement.style.minHeight = "1150px";
          vizElement.style.maxHeight = divElement.offsetWidth * 1.77 + "px";
        }

        const scriptElement = document.createElement("script");
        scriptElement.src =
          "https://public.tableau.com/javascripts/api/viz_v1.js";
        scriptElement.onload = () => {
          setTimeout(() => setIsLoading(false), 2000);
        };
        vizElement.parentNode.insertBefore(scriptElement, vizElement);
      }
    };

    const timer = setTimeout(initTableau, 500);
    return () => clearTimeout(timer);
  }, []);

  // Auto-refresh functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setLastUpdated(new Date());
      if (Math.random() > 0.8) {
        handleRefresh();
      }
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  const handleRefresh = () => {
    setIsRefreshing(true);
    setTimeout(() => {
      setIsRefreshing(false);
      setLastUpdated(new Date());
    }, 3000);
  };

  const handleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
    if (!isFullscreen && dashboardRef.current) {
      dashboardRef.current.requestFullscreen?.();
    } else if (document.fullscreenElement) {
      document.exitFullscreen?.();
    }
  };

  const handleExport = (format) => {
    console.log(`Exporting dashboard as ${format}`);
    // Add export logic here
  };

  const handleShare = () => {
    console.log("Sharing dashboard");
    // Add share logic here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 right-32 w-40 h-40 bg-cyan-400/3 rounded-full blur-3xl animate-pulse"></div>
        <div
          className="absolute top-1/3 left-20 w-32 h-32 bg-blue-400/3 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "1s" }}
        ></div>
        <div
          className="absolute bottom-40 right-1/4 w-36 h-36 bg-purple-400/3 rounded-full blur-2xl animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute top-2/3 left-1/3 w-28 h-28 bg-teal-400/3 rounded-full blur-xl animate-pulse"
          style={{ animationDelay: "3s" }}
        ></div>
      </div>

      <div className="relative z-10 p-6 space-y-8">
        {/* Header Section */}
        <div ref={headerRef} className="flex items-center justify-between">
          <div className="space-y-3">
            <div className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center shadow-lg">
                <BarChart3 className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 bg-clip-text text-transparent">
                  Analytics Dashboard
                </h1>
                <p className="text-slate-300 text-lg mt-1">
                  Interactive marine data visualization and insights
                </p>
              </div>
            </div>
            <div className="w-20 h-1 bg-gradient-to-r from-cyan-400 to-blue-500 rounded-full"></div>
          </div>

          <div ref={controlsRef} className="flex items-center gap-3">
            <Badge
              className={`${
                isRefreshing
                  ? "bg-gradient-to-r from-yellow-500 to-orange-500"
                  : "bg-gradient-to-r from-green-500 to-emerald-500"
              } text-white text-sm border-0 px-4 py-2`}
            >
              {isRefreshing ? (
                <>
                  <Activity className="h-4 w-4 mr-2 animate-spin" />
                  Refreshing...
                </>
              ) : (
                <>
                  <Activity className="h-4 w-4 mr-2 animate-pulse" />
                  Live • {lastUpdated.toLocaleTimeString()}
                </>
              )}
            </Badge>

            <Select value={viewMode} onValueChange={setViewMode}>
              <SelectTrigger className="w-36 bg-slate-800/50 border-cyan-500/20 text-slate-200">
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-cyan-500/20">
                <SelectItem
                  value="desktop"
                  className="text-slate-200 hover:bg-slate-800"
                >
                  <Eye className="h-4 w-4 mr-2 inline" />
                  Desktop
                </SelectItem>
                <SelectItem
                  value="tablet"
                  className="text-slate-200 hover:bg-slate-800"
                >
                  <Eye className="h-4 w-4 mr-2 inline" />
                  Tablet
                </SelectItem>
                <SelectItem
                  value="mobile"
                  className="text-slate-200 hover:bg-slate-800"
                >
                  <Eye className="h-4 w-4 mr-2 inline" />
                  Mobile
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Dashboard Controls */}
        <div className="flex items-center justify-between p-4 bg-slate-800/30 backdrop-blur-sm rounded-xl border border-cyan-500/20">
          <div className="flex items-center gap-4">
            <Button
              onClick={handleRefresh}
              disabled={isRefreshing}
              className="bg-slate-700/70 hover:bg-slate-600/70 text-cyan-300 border-cyan-500/30 hover:border-cyan-400/50"
            >
              <RefreshCw
                className={`h-4 w-4 mr-2 ${isRefreshing ? "animate-spin" : ""}`}
              />
              Refresh
            </Button>

            <Button
              onClick={handleFullscreen}
              className="bg-slate-700/70 hover:bg-slate-600/70 text-cyan-300 border-cyan-500/30 hover:border-cyan-400/50"
            >
              <Expand className="h-4 w-4 mr-2" />
              {isFullscreen ? "Exit" : "Fullscreen"}
            </Button>

            <Button
              onClick={handleShare}
              className="bg-slate-700/70 hover:bg-slate-600/70 text-cyan-300 border-cyan-500/30 hover:border-cyan-400/50"
            >
              <Share className="h-4 w-4 mr-2" />
              Share
            </Button>
          </div>

          <div className="flex items-center gap-2">
            <Select defaultValue="pdf">
              <SelectTrigger className="w-32 bg-slate-800/50 border-cyan-500/20 text-slate-200">
                <Download className="h-4 w-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent className="bg-slate-900 border-cyan-500/20">
                <SelectItem
                  value="pdf"
                  className="text-slate-200 hover:bg-slate-800"
                >
                  Export PDF
                </SelectItem>
                <SelectItem
                  value="png"
                  className="text-slate-200 hover:bg-slate-800"
                >
                  Export PNG
                </SelectItem>
                <SelectItem
                  value="xlsx"
                  className="text-slate-200 hover:bg-slate-800"
                >
                  Export Excel
                </SelectItem>
                <SelectItem
                  value="csv"
                  className="text-slate-200 hover:bg-slate-800"
                >
                  Export CSV
                </SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>

        {/* Main Dashboard Card */}
        <Card
          ref={dashboardRef}
          className="bg-slate-800/40 backdrop-blur-md border border-cyan-500/20 shadow-2xl shadow-cyan-500/10 overflow-hidden"
        >
          <CardHeader className="border-b border-cyan-500/20 bg-gradient-to-r from-slate-800/50 to-slate-700/50">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Globe className="h-6 w-6 text-cyan-400" />
                <CardTitle className="text-2xl font-semibold text-white">
                  Marine Data Analytics
                </CardTitle>
              </div>
              <div className="flex items-center gap-2">
                <Badge className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 text-cyan-300 border border-cyan-400/30">
                  <TrendingUp className="h-3 w-3 mr-1" />
                  Interactive
                </Badge>
                <Badge className="bg-gradient-to-r from-purple-500/20 to-pink-500/20 text-purple-300 border border-purple-400/30">
                  <Waves className="h-3 w-3 mr-1" />
                  Real-time
                </Badge>
              </div>
            </div>
          </CardHeader>

          <CardContent className="p-0 relative">
            {/* Loading Overlay */}
            {isLoading && (
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900/95 via-slate-800/95 to-slate-900/95 backdrop-blur-sm flex items-center justify-center z-20">
                <div className="text-center space-y-6">
                  <div className="relative">
                    <div className="w-20 h-20 border-4 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin mx-auto"></div>
                    <div
                      className="absolute inset-0 w-20 h-20 border-4 border-transparent border-t-blue-400 rounded-full animate-spin mx-auto"
                      style={{
                        animationDelay: "0.5s",
                        animationDuration: "1.5s",
                      }}
                    ></div>
                  </div>
                  <div className="space-y-3">
                    <h3 className="text-2xl font-semibold text-white">
                      Loading Dashboard...
                    </h3>
                    <p className="text-slate-300 text-lg">
                      Initializing interactive visualizations
                    </p>
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                      <div
                        className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.2s" }}
                      ></div>
                      <div
                        className="w-2 h-2 bg-purple-400 rounded-full animate-pulse"
                        style={{ animationDelay: "0.4s" }}
                      ></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Enhanced Tableau Dashboard Container */}
            <div className="relative rounded-xl overflow-hidden border-2 border-cyan-500/10">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500/20 via-blue-500/20 to-purple-500/20 rounded-xl blur-sm"></div>

              <div
                ref={tableauRef}
                className="tableauPlaceholder relative z-10 rounded-xl overflow-hidden"
                id="viz1757271826485"
                style={{
                  position: "relative",
                  background:
                    "linear-gradient(135deg, rgba(15, 23, 42, 0.8), rgba(30, 41, 59, 0.8))",
                  backdropFilter: "blur(10px)",
                  border: "1px solid rgba(6, 182, 212, 0.2)",
                  borderRadius: "12px",
                  boxShadow: "0 25px 50px -12px rgba(6, 182, 212, 0.25)",
                }}
              >
                <noscript>
                  <a href="#">
                    <img
                      alt="Dashboard Preview"
                      src="https://public.tableau.com/static/images/De/Demo_17571681827350/Dashboard1/1_rss.png"
                      style={{ border: "none", borderRadius: "12px" }}
                    />
                  </a>
                </noscript>
                <object className="tableauViz" style={{ display: "none" }}>
                  <param
                    name="host_url"
                    value="https%3A%2F%2Fpublic.tableau.com%2F"
                  />
                  <param name="embed_code_version" value="3" />
                  <param name="site_root" value="" />
                  <param name="name" value="Demo_17571681827350/Dashboard1" />
                  <param name="tabs" value="no" />
                  <param name="toolbar" value="no" />
                  <param
                    name="static_image"
                    value="https://public.tableau.com/static/images/De/Demo_17571681827350/Dashboard1/1.png"
                  />
                  <param name="animate_transition" value="yes" />
                  <param name="display_static_image" value="yes" />
                  <param name="display_spinner" value="yes" />
                  <param name="display_overlay" value="yes" />
                  <param name="display_count" value="yes" />
                  <param name="language" value="en-US" />
                  <param name="showShareOptions" value="false" />
                </object>
              </div>

              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400"></div>
              <div className="absolute bottom-0 left-0 w-full h-1 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400"></div>
            </div>
          </CardContent>
        </Card>

        {/* Dashboard Stats */}
        <div className="grid gap-6 md:grid-cols-4">
          {[
            {
              label: "Data Points",
              value: "2.4M",
              icon: Activity,
              color: "cyan",
            },
            {
              label: "Active Filters",
              value: "12",
              icon: Settings,
              color: "blue",
            },
            {
              label: "Visualizations",
              value: "8",
              icon: BarChart3,
              color: "purple",
            },
            {
              label: "Update Frequency",
              value: "Real-time",
              icon: RefreshCw,
              color: "green",
            }, // ✅ Fixed here
          ].map((stat, index) => (
            <Card
              key={index}
              className="bg-slate-800/30 backdrop-blur-sm border border-cyan-500/20 hover:border-cyan-400/40 transition-all duration-300 group cursor-pointer"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                  <div
                    className={`w-12 h-12 rounded-xl bg-gradient-to-br ${
                      stat.color === "cyan"
                        ? "from-cyan-500 to-blue-600"
                        : stat.color === "blue"
                        ? "from-blue-500 to-purple-600"
                        : stat.color === "purple"
                        ? "from-purple-500 to-pink-600"
                        : "from-green-500 to-emerald-600"
                    } flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="w-2 h-2 bg-cyan-400 rounded-full animate-pulse"></div>
                </div>
                <div className="space-y-1">
                  <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <p className="text-slate-400 text-sm font-medium">
                    {stat.label}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TableauDashboard;
