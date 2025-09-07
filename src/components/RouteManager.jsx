import React, { useState, useEffect, useRef } from "react";
import { gsap } from "gsap";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Navigation,
  Plus,
  Trash2,
  MapPin,
  Route,
  Calculator,
  Clock,
  Ruler,
  Ship,
  Target,
  Activity,
} from "lucide-react";

const RouteManager = ({
  onRouteUpdate,
  onDistanceCalculate,
  userRole = "public",
}) => {
  const [routePoints, setRoutePoints] = useState([
    {
      id: "1",
      name: "Mumbai Port",
      lat: 18.922,
      lng: 72.8347,
      type: "start",
    },
    {
      id: "2",
      name: "Kochi Port",
      lat: 9.9312,
      lng: 76.2673,
      type: "end",
    },
  ]);

  const [newPoint, setNewPoint] = useState({
    name: "",
    lat: "",
    lng: "",
  });

  const [routeStats, setRouteStats] = useState({
    totalDistance: 1247.5,
    estimatedTime: "18h 30m",
    fuelConsumption: "2,850L",
    averageSpeed: "12 knots",
  });

  const cardsRef = useRef([]);

  useEffect(() => {
    // GSAP animations for smooth entrance
    gsap.from(cardsRef.current, {
      opacity: 0,
      y: 30,
      duration: 0.6,
      stagger: 0.1,
      ease: "power2.out",
    });
  }, []);

  const addWaypoint = () => {
    if (!newPoint.name || !newPoint.lat || !newPoint.lng) return;

    const waypoint = {
      id: Date.now().toString(),
      name: newPoint.name,
      lat: parseFloat(newPoint.lat),
      lng: parseFloat(newPoint.lng),
      type: "waypoint",
    };

    const updatedRoute = [
      ...routePoints.slice(0, -1),
      waypoint,
      routePoints[routePoints.length - 1],
    ];
    setRoutePoints(updatedRoute);
    onRouteUpdate?.(updatedRoute);

    setNewPoint({ name: "", lat: "", lng: "" });

    // Simulate distance calculation
    setRouteStats((prev) => ({
      ...prev,
      totalDistance: prev.totalDistance + Math.random() * 200,
      estimatedTime: `${Math.floor(prev.totalDistance / 65)}h ${Math.floor(
        ((prev.totalDistance % 65) * 60) / 65
      )}m`,
    }));
  };

  const removePoint = (id) => {
    const filtered = routePoints.filter((point) => point.id !== id);
    setRoutePoints(filtered);
    onRouteUpdate?.(filtered);
  };

  const calculateDistance = () => {
    onDistanceCalculate?.(routePoints);
    // Simulate calculation update
    setRouteStats((prev) => ({
      ...prev,
      totalDistance: Math.random() * 2000 + 500,
      estimatedTime: `${Math.floor(Math.random() * 30 + 10)}h ${Math.floor(
        Math.random() * 60
      )}m`,
    }));
  };

  const getPointIcon = (type) => {
    switch (type) {
      case "start":
        return Ship;
      case "end":
        return Target;
      default:
        return MapPin;
    }
  };

  const getPointColor = (type) => {
    switch (type) {
      case "start":
        return "from-green-500 to-emerald-600";
      case "end":
        return "from-red-500 to-rose-600";
      default:
        return "from-cyan-500 to-blue-600";
    }
  };

  if (userRole === "public") {
    return (
      <div className="dashboard-card text-center">
        <Navigation className="h-16 w-16 text-cyan-400/60 mx-auto mb-4" />
        <h3 className="text-xl font-semibold text-white mb-2">
          Route Planning
        </h3>
        <p className="text-slate-300">
          Advanced route planning tools are available for researchers and
          administrators.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Route Points */}
      <div ref={(el) => (cardsRef.current[0] = el)} className="dashboard-card">
        <div className="flex items-center gap-3 mb-6">
          <Route className="h-6 w-6 text-cyan-400" />
          <h3 className="text-xl font-semibold text-white">Route Points</h3>
        </div>

        <div className="space-y-3">
          {routePoints.map((point, index) => {
            const IconComponent = getPointIcon(point.type);
            return (
              <div
                key={point.id}
                className="flex items-center gap-4 p-4 rounded-xl bg-slate-800/30 border border-slate-700/50 hover:border-cyan-500/30 transition-all duration-300"
              >
                <div
                  className={`w-12 h-12 rounded-xl bg-gradient-to-br ${getPointColor(
                    point.type
                  )} flex items-center justify-center shadow-lg`}
                >
                  <IconComponent className="h-6 w-6 text-white" />
                </div>

                <div className="flex-1">
                  <div className="font-semibold text-white mb-1">
                    {point.name}
                  </div>
                  <div className="text-sm text-slate-400">
                    {point.lat.toFixed(4)}, {point.lng.toFixed(4)}
                  </div>
                </div>

                <div className="flex items-center gap-2">
                  <Badge
                    className={`bg-gradient-to-r ${getPointColor(
                      point.type
                    )} text-white text-xs border-0 capitalize`}
                  >
                    {point.type}
                  </Badge>
                  {point.type === "waypoint" && (
                    <Button
                      onClick={() => removePoint(point.id)}
                      className="bg-red-500/20 hover:bg-red-500/30 text-red-400 border-red-500/30 hover:border-red-400/50"
                      size="sm"
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Add Waypoint */}
      <div ref={(el) => (cardsRef.current[1] = el)} className="dashboard-card">
        <div className="flex items-center gap-3 mb-6">
          <Plus className="h-6 w-6 text-cyan-400" />
          <h3 className="text-xl font-semibold text-white">Add Waypoint</h3>
        </div>

        <div className="space-y-4">
          <div className="space-y-2">
            <Label className="text-cyan-300 font-medium">Location Name</Label>
            <Input
              placeholder="e.g., Research Station Alpha"
              value={newPoint.name}
              onChange={(e) =>
                setNewPoint((prev) => ({ ...prev, name: e.target.value }))
              }
              className="bg-slate-800/50 border-cyan-500/20 text-slate-200 placeholder-slate-400 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label className="text-cyan-300 font-medium">Latitude</Label>
              <Input
                placeholder="e.g., 15.2993"
                value={newPoint.lat}
                onChange={(e) =>
                  setNewPoint((prev) => ({ ...prev, lat: e.target.value }))
                }
                className="bg-slate-800/50 border-cyan-500/20 text-slate-200 placeholder-slate-400 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>
            <div className="space-y-2">
              <Label className="text-cyan-300 font-medium">Longitude</Label>
              <Input
                placeholder="e.g., 74.1240"
                value={newPoint.lng}
                onChange={(e) =>
                  setNewPoint((prev) => ({ ...prev, lng: e.target.value }))
                }
                className="bg-slate-800/50 border-cyan-500/20 text-slate-200 placeholder-slate-400 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
              />
            </div>
          </div>

          <Button
            onClick={addWaypoint}
            className="w-full bg-gradient-to-r from-cyan-500 to-blue-500 hover:from-cyan-400 hover:to-blue-400 text-white"
          >
            <Plus className="h-4 w-4 mr-2" />
            Add Waypoint
          </Button>
        </div>
      </div>

      {/* Route Analysis */}
      <div ref={(el) => (cardsRef.current[2] = el)} className="dashboard-card">
        <div className="flex items-center gap-3 mb-6">
          <Calculator className="h-6 w-6 text-cyan-400" />
          <h3 className="text-xl font-semibold text-white">Route Analysis</h3>
        </div>

        <div className="space-y-6">
          <Button
            onClick={calculateDistance}
            className="w-full bg-slate-700/50 hover:bg-slate-600/70 text-cyan-300 border-cyan-500/30 hover:border-cyan-400/50"
          >
            <Calculator className="h-4 w-4 mr-2" />
            Recalculate Route
          </Button>

          <Separator className="border-cyan-500/20" />

          <div className="grid grid-cols-2 gap-6">
            <div className="text-center p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
              <div className="flex items-center justify-center gap-2 text-slate-400 mb-2">
                <Ruler className="h-4 w-4" />
                <span className="text-sm">Distance</span>
              </div>
              <div className="text-2xl font-bold text-cyan-400">
                {routeStats.totalDistance.toFixed(1)} km
              </div>
            </div>

            <div className="text-center p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
              <div className="flex items-center justify-center gap-2 text-slate-400 mb-2">
                <Clock className="h-4 w-4" />
                <span className="text-sm">Est. Time</span>
              </div>
              <div className="text-2xl font-bold text-blue-400">
                {routeStats.estimatedTime}
              </div>
            </div>

            <div className="text-center p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
              <div className="flex items-center justify-center gap-2 text-slate-400 mb-2">
                <Navigation className="h-4 w-4" />
                <span className="text-sm">Avg. Speed</span>
              </div>
              <div className="text-2xl font-bold text-purple-400">
                {routeStats.averageSpeed}
              </div>
            </div>

            <div className="text-center p-4 rounded-xl bg-slate-800/30 border border-slate-700/50">
              <div className="flex items-center justify-center gap-2 text-slate-400 mb-2">
                <Activity className="h-4 w-4" />
                <span className="text-sm">Fuel Est.</span>
              </div>
              <div className="text-2xl font-bold text-green-400">
                {routeStats.fuelConsumption}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Routes */}
      <div ref={(el) => (cardsRef.current[3] = el)} className="dashboard-card">
        <div className="flex items-center gap-3 mb-6">
          <Route className="h-6 w-6 text-cyan-400" />
          <h3 className="text-xl font-semibold text-white">Common Routes</h3>
        </div>

        <div className="space-y-3">
          {[
            "Mumbai ↔ Goa Research Route",
            "Chennai ↔ Andaman Islands",
            "Kochi ↔ Lakshadweep Survey",
          ].map((route, index) => (
            <Button
              key={index}
              className="w-full justify-start bg-slate-700/50 hover:bg-slate-600/70 text-cyan-300 border-cyan-500/30 hover:border-cyan-400/50 transition-all duration-300"
            >
              <Navigation className="h-4 w-4 mr-3" />
              {route}
            </Button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default RouteManager;
