import { useEffect, useRef } from "react";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import "leaflet.heat";

// Custom hook to add heatmap layer
function HeatmapLayer({ points }) {
  const map = useMap();

  useEffect(() => {
    if (!points || points.length === 0) return;

    // Create heatmap layer
    const heat = L.heatLayer(points, {
      radius: 25,
      blur: 15,
      maxZoom: 10,
      gradient: {
        0.0: "#000080",
        0.2: "#0000FF",
        0.4: "#00FFFF",
        0.6: "#FFFF00",
        0.8: "#FF8000",
        1.0: "#FF0000",
      },
    }).addTo(map);

    return () => {
      map.removeLayer(heat);
    };
  }, [map, points]);

  return null;
}

const TemperatureHeatMap = ({ height = "h-64" }) => {
  // Sample temperature data points [lat, lng, intensity]
  const temperaturePoints = [
    [15.0, 73.0, 0.8], // Arabian Sea - High temp
    [13.0, 85.0, 0.6], // Bay of Bengal - Medium temp
    [10.0, 76.0, 0.7], // Kerala Coast - Medium-high temp
    [19.0, 72.5, 0.9], // Mumbai Coast - Very high temp
    [12.0, 79.0, 0.5], // Tamil Nadu - Medium temp
    [16.5, 74.0, 0.8], // Goa Coast - High temp
    [11.5, 78.5, 0.6], // Pondicherry - Medium temp
    [21.0, 88.0, 0.4], // West Bengal - Lower temp
    [8.5, 77.0, 0.7], // Kanyakumari - Medium-high temp
    [14.5, 83.0, 0.6], // Andhra Pradesh - Medium temp
  ];

  return (
    <div className={`${height} w-full rounded-lg overflow-hidden`}>
      <MapContainer
        center={[15.0, 78.0]}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution="&copy; OpenStreetMap contributors"
        />
        <HeatmapLayer points={temperaturePoints} />
      </MapContainer>
    </div>
  );
};

export default TemperatureHeatMap;
