// components/RouteManager.jsx
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Route, Plus, Trash2, Navigation, Calculator } from "lucide-react";

const RouteManager = ({ onRouteUpdate, onDistanceCalculate, userRole }) => {
  const [waypoints, setWaypoints] = useState([
    { id: 1, name: "Start Point", lat: 15.0, lng: 72.0 },
    { id: 2, name: "Station Alpha", lat: 16.5, lng: 74.5 },
  ]);

  const [newWaypoint, setNewWaypoint] = useState({
    name: "",
    lat: "",
    lng: "",
  });
  const [routeDistance, setRouteDistance] = useState(null);

  const addWaypoint = () => {
    if (newWaypoint.name && newWaypoint.lat && newWaypoint.lng) {
      const waypoint = {
        id: Date.now(),
        name: newWaypoint.name,
        lat: parseFloat(newWaypoint.lat),
        lng: parseFloat(newWaypoint.lng),
      };

      const updatedWaypoints = [...waypoints, waypoint];
      setWaypoints(updatedWaypoints);
      setNewWaypoint({ name: "", lat: "", lng: "" });
      onRouteUpdate && onRouteUpdate(updatedWaypoints);
    }
  };

  const removeWaypoint = (id) => {
    const updatedWaypoints = waypoints.filter((wp) => wp.id !== id);
    setWaypoints(updatedWaypoints);
    onRouteUpdate && onRouteUpdate(updatedWaypoints);
  };

  const calculateDistance = () => {
    // Simple distance calculation (Haversine formula approximation)
    let totalDistance = 0;

    for (let i = 0; i < waypoints.length - 1; i++) {
      const lat1 = waypoints[i].lat * (Math.PI / 180);
      const lng1 = waypoints[i].lng * (Math.PI / 180);
      const lat2 = waypoints[i + 1].lat * (Math.PI / 180);
      const lng2 = waypoints[i + 1].lng * (Math.PI / 180);

      const dlat = lat2 - lat1;
      const dlng = lng2 - lng1;

      const a =
        Math.sin(dlat / 2) * Math.sin(dlat / 2) +
        Math.cos(lat1) *
          Math.cos(lat2) *
          Math.sin(dlng / 2) *
          Math.sin(dlng / 2);

      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
      const distance = 6371 * c; // Earth's radius in km

      totalDistance += distance;
    }

    setRouteDistance(totalDistance.toFixed(2));
    onDistanceCalculate &&
      onDistanceCalculate({ waypoints, distance: totalDistance });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-sm flex items-center gap-2">
          <Route className="h-4 w-4" />
          Route Planning
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Current Waypoints */}
        <div>
          <h4 className="text-xs font-medium mb-2 text-muted-foreground">
            Waypoints ({waypoints.length})
          </h4>
          <div className="space-y-2 max-h-32 overflow-y-auto">
            {waypoints.map((waypoint, index) => (
              <div
                key={waypoint.id}
                className="flex items-center justify-between p-2 bg-muted/30 rounded text-xs"
              >
                <div>
                  <div className="font-medium">{waypoint.name}</div>
                  <div className="text-muted-foreground">
                    {waypoint.lat.toFixed(2)}, {waypoint.lng.toFixed(2)}
                  </div>
                </div>
                {waypoints.length > 2 && (
                  <Button
                    onClick={() => removeWaypoint(waypoint.id)}
                    size="sm"
                    variant="ghost"
                    className="h-6 w-6 p-0 text-muted-foreground hover:text-destructive"
                  >
                    <Trash2 className="h-3 w-3" />
                  </Button>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Add New Waypoint */}
        {userRole !== "public" && (
          <div className="space-y-2">
            <h4 className="text-xs font-medium text-muted-foreground">
              Add Waypoint
            </h4>
            <Input
              placeholder="Waypoint name"
              value={newWaypoint.name}
              onChange={(e) =>
                setNewWaypoint({ ...newWaypoint, name: e.target.value })
              }
              className="text-xs"
              size="sm"
            />
            <div className="flex gap-2">
              <Input
                placeholder="Latitude"
                value={newWaypoint.lat}
                onChange={(e) =>
                  setNewWaypoint({ ...newWaypoint, lat: e.target.value })
                }
                className="text-xs"
                size="sm"
              />
              <Input
                placeholder="Longitude"
                value={newWaypoint.lng}
                onChange={(e) =>
                  setNewWaypoint({ ...newWaypoint, lng: e.target.value })
                }
                className="text-xs"
                size="sm"
              />
            </div>
            <Button onClick={addWaypoint} size="sm" className="w-full">
              <Plus className="h-3 w-3 mr-1" />
              Add Point
            </Button>
          </div>
        )}

        {/* Route Actions */}
        <div className="space-y-2">
          <Button
            onClick={calculateDistance}
            variant="outline"
            size="sm"
            className="w-full"
          >
            <Calculator className="h-3 w-3 mr-1" />
            Calculate Distance
          </Button>

          {routeDistance && (
            <div className="text-center p-2 bg-primary/10 rounded">
              <Badge variant="outline" className="text-xs">
                Total Distance: {routeDistance} km
              </Badge>
            </div>
          )}
        </div>

        {/* Route Info */}
        <div className="text-xs text-muted-foreground space-y-1">
          <div className="flex justify-between">
            <span>Start:</span>
            <span>{waypoints[0]?.name || "Not set"}</span>
          </div>
          <div className="flex justify-between">
            <span>End:</span>
            <span>{waypoints[waypoints.length - 1]?.name || "Not set"}</span>
          </div>
          <div className="flex justify-between">
            <span>Stops:</span>
            <span>{Math.max(0, waypoints.length - 2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default RouteManager;
