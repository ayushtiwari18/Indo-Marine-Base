import { useState } from "react";
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
        return "🚢";
      case "end":
        return "🏁";
      default:
        return "📍";
    }
  };

  const getPointColor = (type) => {
    switch (type) {
      case "start":
        return "bg-green-500";
      case "end":
        return "bg-red-500";
      default:
        return "bg-primary";
    }
  };

  if (userRole === "public") {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <Navigation className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">Route Planning</h3>
          <p className="text-sm text-muted-foreground">
            Advanced route planning tools are available for researchers and
            administrators.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-4">
      {/* Route Points */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Route className="h-4 w-4" />
            Route Points
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          {routePoints.map((point, index) => (
            <div
              key={point.id}
              className="flex items-center gap-3 p-2 border rounded-lg"
            >
              <div
                className={`w-8 h-8 rounded-full flex items-center justify-center text-white text-xs ${getPointColor(
                  point.type
                )}`}
              >
                {index + 1}
              </div>
              <div className="flex-1">
                <div className="font-medium text-sm">{point.name}</div>
                <div className="text-xs text-muted-foreground">
                  {point.lat.toFixed(4)}, {point.lng.toFixed(4)}
                </div>
              </div>
              <Badge variant="outline" className="text-xs capitalize">
                {point.type}
              </Badge>
              {point.type === "waypoint" && (
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => removePoint(point.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              )}
            </div>
          ))}
        </CardContent>
      </Card>

      {/* Add Waypoint */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Plus className="h-4 w-4" />
            Add Waypoint
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="space-y-2">
            <Label htmlFor="point-name">Location Name</Label>
            <Input
              id="point-name"
              placeholder="e.g., Research Station Alpha"
              value={newPoint.name}
              onChange={(e) =>
                setNewPoint((prev) => ({ ...prev, name: e.target.value }))
              }
            />
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="space-y-2">
              <Label htmlFor="point-lat">Latitude</Label>
              <Input
                id="point-lat"
                placeholder="e.g., 15.2993"
                value={newPoint.lat}
                onChange={(e) =>
                  setNewPoint((prev) => ({ ...prev, lat: e.target.value }))
                }
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="point-lng">Longitude</Label>
              <Input
                id="point-lng"
                placeholder="e.g., 74.1240"
                value={newPoint.lng}
                onChange={(e) =>
                  setNewPoint((prev) => ({ ...prev, lng: e.target.value }))
                }
              />
            </div>
          </div>
          <Button onClick={addWaypoint} className="w-full" size="sm">
            <Plus className="h-4 w-4 mr-2" />
            Add Waypoint
          </Button>
        </CardContent>
      </Card>

      {/* Route Statistics */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base flex items-center gap-2">
            <Calculator className="h-4 w-4" />
            Route Analysis
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <Button
            onClick={calculateDistance}
            variant="outline"
            className="w-full"
          >
            <Calculator className="h-4 w-4 mr-2" />
            Recalculate Route
          </Button>

          <Separator />

          <div className="grid grid-cols-2 gap-4 text-sm">
            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Ruler className="h-4 w-4" />
                Distance
              </div>
              <div className="font-semibold">
                {routeStats.totalDistance.toFixed(1)} km
              </div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Clock className="h-4 w-4" />
                Est. Time
              </div>
              <div className="font-semibold">{routeStats.estimatedTime}</div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <Navigation className="h-4 w-4" />
                Avg. Speed
              </div>
              <div className="font-semibold">{routeStats.averageSpeed}</div>
            </div>

            <div className="space-y-1">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                Fuel Est.
              </div>
              <div className="font-semibold">{routeStats.fuelConsumption}</div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Quick Routes */}
      <Card>
        <CardHeader>
          <CardTitle className="text-base">Common Routes</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
            >
              Mumbai ↔ Goa Research Route
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
            >
              Chennai ↔ Andaman Islands
            </Button>
            <Button
              variant="outline"
              size="sm"
              className="w-full justify-start"
            >
              Kochi ↔ Lakshadweep Survey
            </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default RouteManager;
