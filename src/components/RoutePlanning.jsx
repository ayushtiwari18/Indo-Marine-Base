import React, { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { gsap } from "gsap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Route,
  Navigation,
  MapPin,
  Compass,
  Anchor,
  Waves,
  Clock,
  Ruler,
  Save,
  Download,
  Play,
  Pause,
  RotateCcw,
  Plus,
  Minus,
  Eye,
  Settings,
  Zap,
} from "lucide-react";
import InteractiveMap from "@/components/InteractiveMap";
import RouteManager from "@/components/RouteManager";

const RoutePlanning = ({ userRole = "researcher" }) => {
  const [routePoints, setRoutePoints] = useState([]);
  const [selectedRoute, setSelectedRoute] = useState(null);
  const [isNavigating, setIsNavigating] = useState(false);
  const [routeDistance, setRouteDistance] = useState(0);
  const [estimatedTime, setEstimatedTime] = useState(0);
  const [vesselSpeed, setVesselSpeed] = useState(10); // knots
  const [weatherConditions, setWeatherConditions] = useState("good");
  const [fuelConsumption, setFuelConsumption] = useState(0);

  const containerRef = useRef(null);
  const mapRef = useRef(null);

  const routes = [
    {
      id: 1,
      name: "Mumbai to Kochi Research Route",
      distance: "485 nm",
      duration: "48h 30m",
      waypoints: 8,
      status: "active",
      type: "research",
    },
    {
      id: 2,
      name: "Goa to Mangalore Survey",
      distance: "180 nm",
      duration: "18h 00m",
      waypoints: 5,
      status: "planned",
      type: "survey",
    },
    {
      id: 3,
      name: "Andaman Deep Sea Expedition",
      distance: "1,240 nm",
      duration: "124h 00m",
      waypoints: 12,
      status: "completed",
      type: "expedition",
    },
  ];

  const waypoints = [
    { id: 1, name: "Mumbai Port", lat: 19.076, lng: 72.8777, type: "port" },
    {
      id: 2,
      name: "Research Station Alpha",
      lat: 18.5204,
      lng: 73.8567,
      type: "research",
    },
    {
      id: 3,
      name: "Deep Water Point",
      lat: 17.985,
      lng: 74.2021,
      type: "data",
    },
    { id: 4, name: "Kochi Harbor", lat: 9.9312, lng: 76.2673, type: "port" },
  ];

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, ease: "power2.out" }
      );
    }, containerRef);

    return () => ctx.revert();
  }, []);

  const handleRouteCalculation = () => {
    // Calculate route based on waypoints
    const distance = routePoints.length * 85 + Math.random() * 200; // Mock calculation
    const time = distance / vesselSpeed;
    const fuel = distance * 0.5; // Mock fuel calculation

    setRouteDistance(distance);
    setEstimatedTime(time);
    setFuelConsumption(fuel);
  };

  const handleStartNavigation = () => {
    setIsNavigating(!isNavigating);
  };

  const getRouteTypeColor = (type) => {
    switch (type) {
      case "research":
        return "bg-cyan-500/20 text-cyan-300 border-cyan-400/30";
      case "survey":
        return "bg-blue-500/20 text-blue-300 border-blue-400/30";
      case "expedition":
        return "bg-purple-500/20 text-purple-300 border-purple-400/30";
      default:
        return "bg-slate-500/20 text-slate-300 border-slate-400/30";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "active":
        return "bg-emerald-500/20 text-emerald-300";
      case "planned":
        return "bg-yellow-500/20 text-yellow-300";
      case "completed":
        return "bg-slate-500/20 text-slate-300";
      default:
        return "bg-slate-500/20 text-slate-300";
    }
  };

  return (
    <div
      ref={containerRef}
      className="min-h-screen w-full bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden"
    >
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="floating-sphere floating-sphere-1"></div>
        <div className="floating-sphere floating-sphere-2"></div>
        <div className="floating-sphere floating-sphere-3"></div>
        <div className="stars-layer-1"></div>
        <div className="stars-layer-2"></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Header */}
        <motion.div
          className="text-center space-y-4"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex items-center justify-center gap-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-purple-500 to-blue-600 shadow-lg">
              <Navigation className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-200 via-blue-300 to-cyan-400 bg-clip-text text-transparent">
                Marine Route Planning & Analysis
              </h1>
              <p className="text-slate-300 text-lg mt-2">
                Advanced navigation planning with real-time oceanographic data
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30 px-4 py-2">
              <Navigation className="w-4 h-4 mr-2" />
              GPS Navigation
            </Badge>
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30 px-4 py-2">
              <Waves className="w-4 h-4 mr-2" />
              Weather Integration
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 px-4 py-2">
              <Compass className="w-4 h-4 mr-2" />
              Auto Routing
            </Badge>
          </div>
        </motion.div>

        {/* Main Route Planning Interface */}
        <div className="grid gap-6 lg:grid-cols-12">
          {/* Route Map */}
          <motion.div
            className="lg:col-span-8"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <div className="ocean-card bg-slate-800/60 backdrop-blur-xl border border-purple-500/20 rounded-2xl p-6">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-2xl font-semibold text-white flex items-center gap-3">
                  <Route className="h-6 w-6 text-purple-400" />
                  Interactive Route Planner
                </h3>

                <div className="flex items-center gap-3">
                  <Badge
                    className={`${
                      isNavigating
                        ? "bg-emerald-500/20 text-emerald-300"
                        : "bg-slate-500/20 text-slate-300"
                    }`}
                  >
                    {isNavigating ? (
                      <>
                        <Play className="h-3 w-3 mr-1 animate-pulse" />
                        Navigating
                      </>
                    ) : (
                      <>
                        <Pause className="h-3 w-3 mr-1" />
                        Standby
                      </>
                    )}
                  </Badge>
                  <Button
                    onClick={handleStartNavigation}
                    className={`ocean-btn-${
                      isNavigating ? "secondary" : "primary"
                    }`}
                  >
                    {isNavigating ? (
                      <Pause className="h-4 w-4 mr-2" />
                    ) : (
                      <Play className="h-4 w-4 mr-2" />
                    )}
                    {isNavigating ? "Stop" : "Start"} Navigation
                  </Button>
                </div>
              </div>

              <div className="rounded-xl overflow-hidden border border-purple-500/20 bg-slate-900/50">
                <div className="h-[500px] lg:h-[600px] relative">
                  {/* Placeholder for Interactive Map with Route Planning */}
                  <div className="w-full h-full bg-gradient-to-br from-slate-800/50 to-slate-900/50 flex items-center justify-center relative">
                    <div className="absolute inset-0 ocean-wave-line opacity-30"></div>
                    <div className="absolute inset-0 ocean-wave-glow opacity-20"></div>

                    <div className="text-center z-10">
                      <Route className="h-16 w-16 mx-auto mb-4 text-purple-400/60" />
                      <h4 className="text-xl font-semibold mb-2 text-white">
                        Interactive Route Planning Map
                      </h4>
                      <p className="text-slate-300 max-w-md">
                        Click to add waypoints, drag to modify routes, and
                        visualize real-time oceanographic conditions
                      </p>
                    </div>

                    {/* Mock Route Points */}
                    <div className="absolute top-20 left-20 w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
                    <div
                      className="absolute top-32 right-32 w-3 h-3 bg-cyan-400 rounded-full animate-pulse"
                      style={{ animationDelay: "0.5s" }}
                    ></div>
                    <div
                      className="absolute bottom-28 left-1/3 w-3 h-3 bg-purple-400 rounded-full animate-pulse"
                      style={{ animationDelay: "1s" }}
                    ></div>
                    <div
                      className="absolute bottom-20 right-20 w-3 h-3 bg-blue-400 rounded-full animate-pulse"
                      style={{ animationDelay: "1.5s" }}
                    ></div>

                    {/* Mock Route Lines */}
                    <svg className="absolute inset-0 w-full h-full pointer-events-none">
                      <defs>
                        <linearGradient
                          id="routeGradient"
                          x1="0%"
                          y1="0%"
                          x2="100%"
                          y2="100%"
                        >
                          <stop
                            offset="0%"
                            style={{ stopColor: "#06b6d4", stopOpacity: 1 }}
                          />
                          <stop
                            offset="50%"
                            style={{ stopColor: "#3b82f6", stopOpacity: 1 }}
                          />
                          <stop
                            offset="100%"
                            style={{ stopColor: "#8b5cf6", stopOpacity: 1 }}
                          />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 80 80 Q 200 150 320 128 T 500 180 T 600 120"
                        stroke="url(#routeGradient)"
                        strokeWidth="3"
                        fill="none"
                        className="animate-pulse"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Route Controls & Information */}
          <motion.div
            className="lg:col-span-4 space-y-6"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            {/* Route Manager */}
            <div className="ocean-card bg-slate-800/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <Settings className="h-5 w-5 text-cyan-400" />
                Route Configuration
              </h4>

              <div className="space-y-4">
                <div>
                  <Label className="text-cyan-200 text-sm">
                    Vessel Speed (knots)
                  </Label>
                  <div className="flex items-center gap-2 mt-1">
                    <Input
                      type="number"
                      value={vesselSpeed}
                      onChange={(e) => setVesselSpeed(Number(e.target.value))}
                      className="bg-slate-700/50 border-cyan-500/30 text-cyan-100 flex-1"
                      min="1"
                      max="30"
                    />
                    <span className="text-cyan-400 text-sm">kts</span>
                  </div>
                </div>

                <div>
                  <Label className="text-cyan-200 text-sm">
                    Weather Conditions
                  </Label>
                  <Select
                    value={weatherConditions}
                    onValueChange={setWeatherConditions}
                  >
                    <SelectTrigger className="bg-slate-700/50 border-cyan-500/30 text-cyan-100 mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-slate-800 border-cyan-500/30">
                      <SelectItem value="excellent" className="text-slate-200">
                        Excellent
                      </SelectItem>
                      <SelectItem value="good" className="text-slate-200">
                        Good
                      </SelectItem>
                      <SelectItem value="moderate" className="text-slate-200">
                        Moderate
                      </SelectItem>
                      <SelectItem value="poor" className="text-slate-200">
                        Poor
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Separator className="bg-slate-700/50" />

                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">
                      Total Distance
                    </span>
                    <span className="text-cyan-300 font-semibold">
                      {routeDistance.toFixed(1)} nm
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">
                      Estimated Time
                    </span>
                    <span className="text-blue-300 font-semibold">
                      {estimatedTime.toFixed(1)} hrs
                    </span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-slate-300 text-sm">
                      Fuel Consumption
                    </span>
                    <span className="text-purple-300 font-semibold">
                      {fuelConsumption.toFixed(1)} L
                    </span>
                  </div>
                </div>

                <Button
                  onClick={handleRouteCalculation}
                  className="w-full ocean-btn-primary"
                >
                  <Zap className="h-4 w-4 mr-2" />
                  Calculate Route
                </Button>
              </div>
            </div>

            {/* Waypoints List */}
            <div className="ocean-card bg-slate-800/60 backdrop-blur-xl border border-blue-500/20 rounded-2xl p-6">
              <h4 className="text-lg font-semibold text-white mb-4 flex items-center gap-2">
                <MapPin className="h-5 w-5 text-blue-400" />
                Waypoints ({waypoints.length})
              </h4>

              <div className="space-y-3 max-h-48 overflow-y-auto">
                {waypoints.map((point, index) => (
                  <div
                    key={point.id}
                    className="flex items-center gap-3 p-3 bg-slate-700/30 rounded-lg hover:bg-slate-700/50 transition-colors"
                  >
                    <div className="flex-shrink-0">
                      <div
                        className={`w-3 h-3 rounded-full ${
                          point.type === "port"
                            ? "bg-emerald-400"
                            : point.type === "research"
                            ? "bg-cyan-400"
                            : "bg-purple-400"
                        }`}
                      ></div>
                    </div>
                    <div className="flex-1 min-w-0">
                      <div className="font-medium text-slate-200 text-sm truncate">
                        {point.name}
                      </div>
                      <div className="text-xs text-slate-400">
                        {point.lat.toFixed(4)}°, {point.lng.toFixed(4)}°
                      </div>
                    </div>
                    <Badge variant="outline" className="text-xs">
                      {index + 1}
                    </Badge>
                  </div>
                ))}
              </div>

              <div className="flex gap-2 mt-4">
                <Button size="sm" className="ocean-btn-secondary flex-1">
                  <Plus className="h-4 w-4 mr-1" />
                  Add
                </Button>
                <Button size="sm" variant="outline" className="flex-1">
                  <Save className="h-4 w-4 mr-1" />
                  Save
                </Button>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Saved Routes */}
        <motion.div
          className="ocean-card bg-slate-800/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.6 }}
        >
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-semibold text-white flex items-center gap-3">
              <Anchor className="h-6 w-6 text-cyan-400" />
              Saved Routes
            </h3>
            <Button className="ocean-btn-primary">
              <Plus className="h-4 w-4 mr-2" />
              New Route
            </Button>
          </div>

          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
            {routes.map((route) => (
              <motion.div
                key={route.id}
                className="p-4 bg-slate-700/30 rounded-xl border border-slate-600/30 hover:border-cyan-500/30 transition-colors cursor-pointer"
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <div className="flex items-start justify-between mb-3">
                  <div className="flex-1">
                    <h4 className="font-semibold text-slate-200 text-sm mb-1">
                      {route.name}
                    </h4>
                    <div className="flex items-center gap-2">
                      <Badge className={getRouteTypeColor(route.type)}>
                        {route.type}
                      </Badge>
                      <Badge className={getStatusColor(route.status)}>
                        {route.status}
                      </Badge>
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <div className="text-slate-400">Distance</div>
                    <div className="text-cyan-300 font-medium">
                      {route.distance}
                    </div>
                  </div>
                  <div>
                    <div className="text-slate-400">Duration</div>
                    <div className="text-blue-300 font-medium">
                      {route.duration}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4">
                  <Button size="sm" className="ocean-btn-secondary flex-1">
                    <Eye className="h-3 w-3 mr-1" />
                    View
                  </Button>
                  <Button size="sm" variant="outline" className="flex-1">
                    <Download className="h-3 w-3 mr-1" />
                    Export
                  </Button>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default RoutePlanning;
