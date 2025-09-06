import { useState, useRef, useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { X, Fish, Thermometer, Droplets, Waves } from "lucide-react";

// Fix for default markers in React Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom marker icons
const createCustomIcon = (type, color) => {
  return L.divIcon({
    html: `<div style="
      width: 32px;
      height: 32px;
      border-radius: 50%;
      background-color: ${color};
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-size: 16px;
    ">
      ${
        type === "temperature"
          ? "🌡️"
          : type === "salinity"
          ? "💧"
          : type === "biodiversity"
          ? "🐟"
          : type === "fishing"
          ? "🎣"
          : "📍"
      }
    </div>`,
    className: "custom-marker",
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

// Map event handler component
function MapEvents({ onMarkerClick }) {
  useMapEvents({
    click: (e) => {
      console.log("Map clicked at:", e.latlng);
    },
  });
  return null;
}

const InteractiveMap = ({
  markers = [],
  layers = ["satellite"],
  onMarkerClick,
  height = "h-96",
  showControls = true,
  userRole = "public",
}) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const mapRef = useRef(null);

  // Sample markers for Indian Ocean region
  const sampleMarkers = [
    {
      id: "1",
      lng: 73.0,
      lat: 15.0,
      type: "temperature",
      data: { temperature: 28.5, depth: "10m", location: "Arabian Sea" },
    },
    {
      id: "2",
      lng: 85.0,
      lat: 13.0,
      type: "biodiversity",
      data: { species: 245, endemic: 28, location: "Bay of Bengal" },
    },
    {
      id: "3",
      lng: 76.0,
      lat: 10.0,
      type: "salinity",
      data: { salinity: 34.8, depth: "25m", location: "Kerala Coast" },
    },
    {
      id: "4",
      lng: 72.5,
      lat: 19.0,
      type: "fishing",
      data: { catch: 3200, species: "Tuna", location: "Mumbai Coast" },
    },
  ];

  const displayMarkers = markers.length > 0 ? markers : sampleMarkers;

  const markerColors = {
    temperature: "#ef4444",
    salinity: "#3b82f6",
    biodiversity: "#22c55e",
    fishing: "#eab308",
  };

  const getMarkerIcon = (type) => {
    switch (type) {
      case "temperature":
        return <Thermometer className="h-4 w-4" />;
      case "salinity":
        return <Droplets className="h-4 w-4" />;
      case "biodiversity":
        return <Fish className="h-4 w-4" />;
      case "fishing":
        return <Waves className="h-4 w-4" />;
      default:
        return <Fish className="h-4 w-4" />;
    }
  };

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    onMarkerClick?.(marker);
  };

  return (
    <div className="relative">
      <div className={`${height} w-full rounded-lg overflow-hidden`}>
        <MapContainer
          center={[15.0, 78.0]}
          zoom={5}
          style={{ height: "100%", width: "100%" }}
          ref={mapRef}
        >
          {/* Different tile layers based on user preference */}
          {layers.includes("satellite") ? (
            <TileLayer
              url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
              attribution='&copy; <a href="https://www.esri.com/">Esri</a>'
            />
          ) : (
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
          )}

          {/* Add markers */}
          {displayMarkers.map((marker) => (
            <Marker
              key={marker.id}
              position={[marker.lat, marker.lng]}
              icon={createCustomIcon(marker.type, markerColors[marker.type])}
              eventHandlers={{
                click: () => handleMarkerClick(marker),
              }}
            >
              <Popup>
                <div className="p-2">
                  <div className="flex items-center gap-2 mb-2">
                    {getMarkerIcon(marker.type)}
                    <Badge variant="secondary" className="capitalize">
                      {marker.type}
                    </Badge>
                  </div>
                  <h4 className="font-semibold mb-2">{marker.data.location}</h4>
                  {marker.type === "temperature" && (
                    <div className="text-sm">
                      <div>Temperature: {marker.data.temperature}°C</div>
                      <div>Depth: {marker.data.depth}</div>
                    </div>
                  )}
                  {marker.type === "biodiversity" && (
                    <div className="text-sm">
                      <div>Species: {marker.data.species}</div>
                      <div>Endemic: {marker.data.endemic}</div>
                    </div>
                  )}
                  {marker.type === "salinity" && (
                    <div className="text-sm">
                      <div>Salinity: {marker.data.salinity}‰</div>
                      <div>Depth: {marker.data.depth}</div>
                    </div>
                  )}
                  {marker.type === "fishing" && (
                    <div className="text-sm">
                      <div>Catch: {marker.data.catch}kg</div>
                      <div>Species: {marker.data.species}</div>
                    </div>
                  )}
                </div>
              </Popup>
            </Marker>
          ))}

          <MapEvents onMarkerClick={handleMarkerClick} />
        </MapContainer>
      </div>

      {/* External Marker Info Card (Optional) */}
      {selectedMarker && (
        <Card className="absolute top-4 right-4 w-80 z-1000 shadow-lg">
          <CardContent className="p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-2">
                {getMarkerIcon(selectedMarker.type)}
                <Badge variant="secondary" className="capitalize">
                  {selectedMarker.type}
                </Badge>
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSelectedMarker(null)}
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            <div className="space-y-2">
              <h4 className="font-semibold">{selectedMarker.data.location}</h4>
              {selectedMarker.type === "temperature" && (
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Temperature: {selectedMarker.data.temperature}°C</div>
                  <div>Depth: {selectedMarker.data.depth}</div>
                </div>
              )}
              {selectedMarker.type === "biodiversity" && (
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Species: {selectedMarker.data.species}</div>
                  <div>Endemic: {selectedMarker.data.endemic}</div>
                </div>
              )}
              {selectedMarker.type === "salinity" && (
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Salinity: {selectedMarker.data.salinity}‰</div>
                  <div>Depth: {selectedMarker.data.depth}</div>
                </div>
              )}
              {selectedMarker.type === "fishing" && (
                <div className="grid grid-cols-2 gap-2 text-sm">
                  <div>Catch: {selectedMarker.data.catch}kg</div>
                  <div>Species: {selectedMarker.data.species}</div>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default InteractiveMap;
