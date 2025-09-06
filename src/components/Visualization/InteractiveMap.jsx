// components/InteractiveMap.jsx
import { useState, useEffect } from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const InteractiveMap = ({ height, onMarkerClick, userRole, showControls }) => {
  const [selectedMarker, setSelectedMarker] = useState(null);
  const [mapData, setMapData] = useState([]);

  // Sample data points for Arabian Sea and Bay of Bengal
  const sampleMarkers = [
    {
      id: 1,
      x: 25,
      y: 35,
      name: "Station Alpha",
      temperature: 28.5,
      salinity: 34.2,
      region: "Arabian Sea",
    },
    {
      id: 2,
      x: 45,
      y: 25,
      name: "Station Beta",
      temperature: 29.1,
      salinity: 34.8,
      region: "Arabian Sea",
    },
    {
      id: 3,
      x: 65,
      y: 45,
      name: "Station Gamma",
      temperature: 30.2,
      salinity: 35.1,
      region: "Bay of Bengal",
    },
    {
      id: 4,
      x: 75,
      y: 35,
      name: "Station Delta",
      temperature: 27.8,
      salinity: 33.9,
      region: "Bay of Bengal",
    },
    {
      id: 5,
      x: 35,
      y: 55,
      name: "Station Epsilon",
      temperature: 26.9,
      salinity: 34.5,
      region: "Indian Ocean",
    },
  ];

  useEffect(() => {
    setMapData(sampleMarkers);
  }, []);

  const handleMarkerClick = (marker) => {
    setSelectedMarker(marker);
    onMarkerClick && onMarkerClick(marker);
  };

  return (
    <div className={`${height} relative`}>
      <div className="w-full h-full bg-gradient-to-br from-blue-50 via-cyan-50 to-teal-50 rounded-lg border relative overflow-hidden">
        {/* Map Background */}
        <div className="absolute inset-0 opacity-20">
          <svg
            width="100%"
            height="100%"
            viewBox="0 0 100 100"
            className="absolute inset-0"
          >
            {/* Coastline representation */}
            <path
              d="M10,20 Q20,15 30,25 T50,30 T70,35 Q80,40 90,35"
              stroke="rgb(34, 197, 94)"
              strokeWidth="0.5"
              fill="none"
            />
            <path
              d="M15,60 Q25,55 35,65 T55,70 T75,75 Q85,80 95,75"
              stroke="rgb(34, 197, 94)"
              strokeWidth="0.5"
              fill="none"
            />
          </svg>
        </div>

        {/* Grid Lines */}
        <div className="absolute inset-0 opacity-10">
          {[...Array(10)].map((_, i) => (
            <div
              key={`v-${i}`}
              className="absolute top-0 bottom-0 w-px bg-gray-400"
              style={{ left: `${i * 10}%` }}
            />
          ))}
          {[...Array(10)].map((_, i) => (
            <div
              key={`h-${i}`}
              className="absolute left-0 right-0 h-px bg-gray-400"
              style={{ top: `${i * 10}%` }}
            />
          ))}
        </div>

        {/* Data Markers */}
        {mapData.map((marker) => (
          <div
            key={marker.id}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{ left: `${marker.x}%`, top: `${marker.y}%` }}
            onClick={() => handleMarkerClick(marker)}
          >
            {/* Marker Circle */}
            <div
              className={`w-4 h-4 rounded-full border-2 border-white shadow-lg transition-all duration-200 group-hover:scale-125 ${
                marker.temperature > 29
                  ? "bg-red-500"
                  : marker.temperature > 27
                  ? "bg-yellow-500"
                  : "bg-blue-500"
              }`}
            />

            {/* Hover Tooltip */}
            <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 px-2 py-1 bg-black text-white text-xs rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap z-10">
              <div>{marker.name}</div>
              <div>
                {marker.temperature}°C | {marker.salinity}‰
              </div>
            </div>
          </div>
        ))}

        {/* Legend */}
        <div className="absolute bottom-4 left-4">
          <div className="bg-white/90 backdrop-blur-sm rounded-lg p-3 shadow-lg">
            <div className="text-xs font-semibold mb-2">Temperature (°C)</div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-blue-500"></div>
              <span>&lt; 27°C</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <span>27-29°C</span>
            </div>
            <div className="flex items-center gap-2 text-xs">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <span>&gt; 29°C</span>
            </div>
          </div>
        </div>

        {/* Region Labels */}
        <div className="absolute top-4 left-8 text-sm font-semibold text-blue-800 opacity-60">
          Arabian Sea
        </div>
        <div className="absolute top-4 right-8 text-sm font-semibold text-teal-800 opacity-60">
          Bay of Bengal
        </div>

        {/* Coordinates Display */}
        <div className="absolute top-4 left-1/2 transform -translate-x-1/2">
          <Badge variant="secondary" className="text-xs">
            Indian Ocean Region
          </Badge>
        </div>
      </div>

      {/* Selected Marker Info Panel */}
      {selectedMarker && (
        <div className="absolute top-4 right-4 bg-white rounded-lg shadow-lg p-4 max-w-xs">
          <div className="flex justify-between items-start mb-2">
            <h3 className="font-semibold">{selectedMarker.name}</h3>
            <button
              onClick={() => setSelectedMarker(null)}
              className="text-gray-400 hover:text-gray-600 text-lg leading-none"
            >
              ×
            </button>
          </div>
          <div className="space-y-1 text-sm">
            <div>Region: {selectedMarker.region}</div>
            <div>Temperature: {selectedMarker.temperature}°C</div>
            <div>Salinity: {selectedMarker.salinity}‰</div>
            <div className="text-xs text-gray-500 mt-2">
              Click on other markers to explore data
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default InteractiveMap;
