import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Thermometer, Droplets, TestTube } from "lucide-react";

const createParameterIcon = (parameter, value) => {
  const colors = {
    temperature: "#ef4444",
    salinity: "#3b82f6",
    ph: "#8b5cf6",
  };

  const icons = {
    temperature: "🌡️",
    salinity: "💧",
    ph: "⚗️",
  };

  return L.divIcon({
    html: `<div style="
      width: 36px;
      height: 36px;
      border-radius: 50%;
      background-color: ${colors[parameter]};
      border: 3px solid white;
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 18px;
    ">
      ${icons[parameter]}
    </div>`,
    className: "parameter-marker",
    iconSize: [36, 36],
    iconAnchor: [18, 18],
  });
};

const OceanParametersMap = ({ height = "h-64" }) => {
  const parameterStations = [
    {
      id: 1,
      name: "Arabian Sea Station",
      lat: 15.0,
      lng: 73.0,
      temperature: 28.5,
      salinity: 34.8,
      ph: 8.1,
      depth: "50m",
    },
    {
      id: 2,
      name: "Bay of Bengal Station",
      lat: 13.0,
      lng: 85.0,
      temperature: 29.2,
      salinity: 33.5,
      ph: 8.0,
      depth: "75m",
    },
    {
      id: 3,
      name: "Kerala Coast Station",
      lat: 10.0,
      lng: 76.0,
      temperature: 27.8,
      salinity: 35.2,
      ph: 7.9,
      depth: "25m",
    },
    {
      id: 4,
      name: "Mumbai Offshore",
      lat: 19.0,
      lng: 72.5,
      temperature: 30.1,
      salinity: 34.5,
      ph: 8.2,
      depth: "100m",
    },
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

        {parameterStations.map((station) => (
          <Marker
            key={station.id}
            position={[station.lat, station.lng]}
            icon={createParameterIcon("temperature", station.temperature)}
          >
            <Popup>
              <div className="p-2 min-w-[200px]">
                <h4 className="font-semibold mb-2">{station.name}</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-center gap-2">
                    <Thermometer className="h-4 w-4 text-red-500" />
                    <span>
                      Temperature: <strong>{station.temperature}°C</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Droplets className="h-4 w-4 text-blue-500" />
                    <span>
                      Salinity: <strong>{station.salinity}‰</strong>
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    <TestTube className="h-4 w-4 text-purple-500" />
                    <span>
                      pH Level: <strong>{station.ph}</strong>
                    </span>
                  </div>
                  <div className="text-xs text-gray-600">
                    Depth: {station.depth}
                  </div>
                </div>
              </div>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default OceanParametersMap;
