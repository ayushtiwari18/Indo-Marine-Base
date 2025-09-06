import { useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, Circle } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Badge } from "@/components/ui/badge";
import { Fish } from "lucide-react";

// Custom biodiversity marker
const createBiodiversityIcon = (speciesCount) => {
  const size = Math.min(Math.max(speciesCount / 10, 20), 50);
  const color =
    speciesCount > 200 ? "#22c55e" : speciesCount > 150 ? "#eab308" : "#ef4444";

  return L.divIcon({
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      border-radius: 50%;
      background-color: ${color};
      border: 2px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      color: white;
      font-weight: bold;
      font-size: ${Math.max(size / 4, 10)}px;
    ">
      ${speciesCount}
    </div>`,
    className: "biodiversity-marker",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
  });
};

const BiodiversityMap = ({ height = "h-64" }) => {
  const [selectedHotspot, setSelectedHotspot] = useState(null);

  // Biodiversity hotspots data
  const biodiversityHotspots = [
    {
      id: 1,
      name: "Andaman Islands",
      lat: 11.7401,
      lng: 92.6586,
      species: 245,
      endemic: 28,
      threatened: 12,
      description: "Rich coral reefs and marine biodiversity",
    },
    {
      id: 2,
      name: "Lakshadweep",
      lat: 10.5667,
      lng: 72.6417,
      species: 189,
      endemic: 15,
      threatened: 8,
      description: "Coral atolls with unique marine ecosystems",
    },
    {
      id: 3,
      name: "Gulf of Mannar",
      lat: 9.0,
      lng: 79.0,
      species: 198,
      endemic: 22,
      threatened: 15,
      description: "Biosphere reserve with dugongs and sea grass",
    },
    {
      id: 4,
      name: "Western Ghats Coast",
      lat: 15.3173,
      lng: 75.7139,
      species: 156,
      endemic: 35,
      threatened: 18,
      description: "Estuarine and mangrove ecosystems",
    },
    {
      id: 5,
      name: "Sundarbans",
      lat: 21.9497,
      lng: 89.1833,
      species: 134,
      endemic: 11,
      threatened: 9,
      description: "Mangrove forests and estuarine biodiversity",
    },
  ];

  return (
    <div className={`${height} w-full rounded-lg overflow-hidden relative`}>
      <MapContainer
        center={[15.0, 78.0]}
        zoom={6}
        style={{ height: "100%", width: "100%" }}
      >
        <TileLayer
          url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}"
          attribution="&copy; Esri"
        />

        {biodiversityHotspots.map((hotspot) => (
          <div key={hotspot.id}>
            <Marker
              position={[hotspot.lat, hotspot.lng]}
              icon={createBiodiversityIcon(hotspot.species)}
              eventHandlers={{
                click: () => setSelectedHotspot(hotspot),
              }}
            >
              <Popup>
                <div className="p-2 min-w-[200px]">
                  <div className="flex items-center gap-2 mb-2">
                    <Fish className="h-4 w-4 text-green-600" />
                    <Badge variant="secondary">Biodiversity Hotspot</Badge>
                  </div>
                  <h4 className="font-semibold mb-2">{hotspot.name}</h4>
                  <div className="grid grid-cols-2 gap-2 text-sm mb-2">
                    <div>
                      Species: <strong>{hotspot.species}</strong>
                    </div>
                    <div>
                      Endemic: <strong>{hotspot.endemic}</strong>
                    </div>
                    <div>
                      Threatened: <strong>{hotspot.threatened}</strong>
                    </div>
                  </div>
                  <p className="text-xs text-gray-600">{hotspot.description}</p>
                </div>
              </Popup>
            </Marker>

            {/* Biodiversity influence circle */}
            <Circle
              center={[hotspot.lat, hotspot.lng]}
              radius={hotspot.species * 200}
              pathOptions={{
                fillColor:
                  hotspot.species > 200
                    ? "#22c55e"
                    : hotspot.species > 150
                    ? "#eab308"
                    : "#ef4444",
                fillOpacity: 0.1,
                color:
                  hotspot.species > 200
                    ? "#22c55e"
                    : hotspot.species > 150
                    ? "#eab308"
                    : "#ef4444",
                weight: 1,
                opacity: 0.3,
              }}
            />
          </div>
        ))}
      </MapContainer>
    </div>
  );
};

export default BiodiversityMap;
