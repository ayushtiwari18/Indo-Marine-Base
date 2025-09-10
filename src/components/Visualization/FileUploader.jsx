import React, { useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUploader = ({ onFileUpload, isProcessing }) => {
  const [dragActive, setDragActive] = useState(false);

  const onDrop = useCallback(
    (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
        onFileUpload(acceptedFiles[0]);
      }
    },
    [onFileUpload]
  );

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      "text/csv": [".csv"],
      "application/json": [".json"],
      "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet": [
        ".xlsx",
      ],
      "application/vnd.ms-excel": [".xls"],
      "text/tab-separated-values": [".tsv"],
      "application/xml": [".xml"],
      "text/plain": [".txt"],
    },
    multiple: false,
    maxSize: 50 * 1024 * 1024, // 50MB
    onError: (error) => {
      console.error("Dropzone error:", error);
      alert("File upload error: " + error.message);
    },
  });

  const supportedFormats = [
    { ext: "CSV", icon: "📊", desc: "Comma-separated values" },
    { ext: "JSON", icon: "📄", desc: "JavaScript Object Notation" },
    { ext: "XLSX/XLS", icon: "📈", desc: "Excel spreadsheets" },
    { ext: "TSV", icon: "📋", desc: "Tab-separated values" },
    { ext: "XML", icon: "🗂️", desc: "Extensible Markup Language" },
    { ext: "TXT", icon: "📝", desc: "Plain text files" },
  ];

  // Generate realistic sample data
  const generateSampleData = (sampleType) => {
    let data, filename, mimeType;

    switch (sampleType) {
      case "species":
        data = generateSpeciesData();
        filename = "marine_species_occurrences.csv";
        mimeType = "text/csv";
        break;
      case "environmental":
        data = generateEnvironmentalData();
        filename = "environmental_measurements.csv";
        mimeType = "text/csv";
        break;
      case "stations":
        data = generateStationsData();
        filename = "research_stations.csv";
        mimeType = "text/csv";
        break;
      default:
        return;
    }

    // Create and trigger download
    const blob = new Blob([data], { type: mimeType });
    const file = new File([blob], filename, { type: mimeType });

    // Simulate file upload
    onFileUpload(file);
  };

  const generateSpeciesData = () => {
    const species = [
      "Pristis pristis",
      "Rhincodon typus",
      "Thunnus thynnus",
      "Carcharodon carcharias",
      "Eretmochelys imbricata",
      "Chelonia mydas",
      "Dermochelys coriacea",
      "Caretta caretta",
      "Delphinus delphis",
      "Tursiops truncatus",
      "Physeter macrocephalus",
      "Balaenoptera musculus",
      "Epinephelus itajara",
      "Mycteroperca bonaci",
      "Lutjanus campechanus",
      "Sciaenops ocellatus",
      "Acropora cervicornis",
      "Acropora palmata",
      "Montastraea cavernosa",
      "Diploria strigosa",
    ];

    const locations = [
      { lat: 8.1689, lon: 76.6413, location: "Kerala Coast" },
      { lat: 11.0168, lon: 76.9558, location: "Tamil Nadu Coast" },
      { lat: 13.0827, lon: 80.2707, location: "Chennai Waters" },
      { lat: 15.2993, lon: 74.124, location: "Goa Coast" },
      { lat: 19.076, lon: 72.8777, location: "Mumbai Waters" },
      { lat: 21.1702, lon: 72.8311, location: "Gujarat Coast" },
      { lat: 20.2961, lon: 85.8245, location: "Odisha Coast" },
      { lat: 22.5726, lon: 88.3639, location: "West Bengal Coast" },
    ];

    const headers = [
      "id",
      "species_name",
      "common_name",
      "latitude",
      "longitude",
      "location",
      "depth_m",
      "temperature_c",
      "salinity_ppt",
      "date_collected",
      "collector",
      "abundance",
      "life_stage",
      "habitat_type",
      "conservation_status",
    ];

    const commonNames = [
      "Sawfish",
      "Whale Shark",
      "Bluefin Tuna",
      "Great White Shark",
      "Hawksbill Turtle",
      "Green Turtle",
      "Leatherback Turtle",
      "Loggerhead Turtle",
      "Common Dolphin",
      "Bottlenose Dolphin",
      "Sperm Whale",
      "Blue Whale",
      "Goliath Grouper",
      "Black Grouper",
      "Red Snapper",
      "Red Drum",
      "Staghorn Coral",
      "Elkhorn Coral",
      "Great Star Coral",
      "Grooved Brain Coral",
    ];

    const collectors = [
      "Dr. Smith",
      "Prof. Patel",
      "Dr. Kumar",
      "Dr. Singh",
      "Prof. Sharma",
    ];
    const lifeStages = ["Adult", "Juvenile", "Larval", "Sub-adult"];
    const habitats = [
      "Coral Reef",
      "Open Ocean",
      "Coastal Waters",
      "Deep Sea",
      "Mangrove",
    ];
    const statuses = [
      "Least Concern",
      "Near Threatened",
      "Vulnerable",
      "Endangered",
      "Critically Endangered",
    ];

    let csv = headers.join(",") + "\n";

    for (let i = 0; i < 150; i++) {
      const speciesIndex = Math.floor(Math.random() * species.length);
      const locationData =
        locations[Math.floor(Math.random() * locations.length)];
      const date = new Date(
        2020 + Math.random() * 4,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      );

      const row = [
        `MBO_${String(i + 1).padStart(4, "0")}`,
        `"${species[speciesIndex]}"`,
        `"${commonNames[speciesIndex]}"`,
        (locationData.lat + (Math.random() - 0.5) * 0.1).toFixed(4),
        (locationData.lon + (Math.random() - 0.5) * 0.1).toFixed(4),
        `"${locationData.location}"`,
        Math.floor(Math.random() * 200),
        (25 + Math.random() * 10).toFixed(1),
        (34 + Math.random() * 3).toFixed(1),
        date.toISOString().split("T")[0],
        `"${collectors[Math.floor(Math.random() * collectors.length)]}"`,
        Math.floor(Math.random() * 20) + 1,
        lifeStages[Math.floor(Math.random() * lifeStages.length)],
        habitats[Math.floor(Math.random() * habitats.length)],
        statuses[Math.floor(Math.random() * statuses.length)],
      ];

      csv += row.join(",") + "\n";
    }

    return csv;
  };

  const generateEnvironmentalData = () => {
    const headers = [
      "station_id",
      "latitude",
      "longitude",
      "date",
      "time",
      "depth_m",
      "temperature_c",
      "salinity_ppt",
      "ph",
      "dissolved_oxygen_mg_l",
      "turbidity_ntu",
      "chlorophyll_a_mg_m3",
      "nitrate_mg_l",
      "phosphate_mg_l",
    ];

    const stations = [
      { id: "ST001", lat: 8.5241, lon: 76.9366, name: "Kochi Offshore" },
      { id: "ST002", lat: 11.9416, lon: 79.8083, name: "Pondicherry Coast" },
      { id: "ST003", lat: 13.0827, lon: 80.2707, name: "Chennai Waters" },
      { id: "ST004", lat: 15.8497, lon: 74.124, name: "Karwar Bay" },
      { id: "ST005", lat: 19.076, lon: 72.8777, name: "Mumbai Harbor" },
    ];

    let csv = headers.join(",") + "\n";

    for (let i = 0; i < 200; i++) {
      const station = stations[Math.floor(Math.random() * stations.length)];
      const date = new Date(
        2023,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      );
      const time = `${String(Math.floor(Math.random() * 24)).padStart(
        2,
        "0"
      )}:${String(Math.floor(Math.random() * 60)).padStart(2, "0")}:00`;

      const row = [
        station.id,
        (station.lat + (Math.random() - 0.5) * 0.01).toFixed(4),
        (station.lon + (Math.random() - 0.5) * 0.01).toFixed(4),
        date.toISOString().split("T")[0],
        time,
        Math.floor(Math.random() * 50),
        (26 + Math.random() * 6).toFixed(2),
        (34 + Math.random() * 2).toFixed(2),
        (7.8 + Math.random() * 0.6).toFixed(2),
        (6 + Math.random() * 3).toFixed(2),
        (1 + Math.random() * 10).toFixed(2),
        (0.5 + Math.random() * 2).toFixed(2),
        (0.1 + Math.random() * 0.5).toFixed(3),
        (0.02 + Math.random() * 0.1).toFixed(3),
      ];

      csv += row.join(",") + "\n";
    }

    return csv;
  };

  const generateStationsData = () => {
    const headers = [
      "station_id",
      "station_name",
      "latitude",
      "longitude",
      "established_year",
      "organization",
      "station_type",
      "depth_range_m",
      "primary_research_focus",
      "equipment_count",
      "last_maintenance",
      "operational_status",
    ];

    const stationData = [
      {
        id: "NIOT_001",
        name: "National Institute of Ocean Technology - Chennai",
        lat: 13.0827,
        lon: 80.2707,
        org: "NIOT",
      },
      {
        id: "CMFRI_001",
        name: "Central Marine Fisheries Research Institute - Kochi",
        lat: 9.9312,
        lon: 76.2673,
        org: "CMFRI",
      },
      {
        id: "NIO_001",
        name: "National Institute of Oceanography - Goa",
        lat: 15.4909,
        lon: 73.8278,
        org: "NIO",
      },
      {
        id: "CMLRE_001",
        name: "Centre for Marine Living Resources - Kochi",
        lat: 9.9312,
        lon: 76.2673,
        org: "CMLRE",
      },
      {
        id: "ESSO_001",
        name: "Earth System Science Organisation - Mumbai",
        lat: 19.076,
        lon: 72.8777,
        org: "ESSO",
      },
      {
        id: "INCOIS_001",
        name: "Indian National Centre for Ocean Information - Hyderabad",
        lat: 17.385,
        lon: 78.4867,
        org: "INCOIS",
      },
      {
        id: "FSI_001",
        name: "Fishery Survey of India - Mumbai",
        lat: 19.076,
        lon: 72.8777,
        org: "FSI",
      },
      {
        id: "NPOL_001",
        name: "Naval Physical and Oceanographic Laboratory - Kochi",
        lat: 9.9312,
        lon: 76.2673,
        org: "NPOL",
      },
    ];

    const types = [
      "Research Station",
      "Monitoring Buoy",
      "Coastal Observatory",
      "Deep Sea Platform",
    ];
    const focuses = [
      "Marine Biology",
      "Ocean Physics",
      "Climate Monitoring",
      "Fisheries Research",
      "Pollution Monitoring",
    ];
    const statuses = [
      "Operational",
      "Under Maintenance",
      "Temporarily Offline",
    ];

    let csv = headers.join(",") + "\n";

    stationData.forEach((station, i) => {
      const establishedYear = 1990 + Math.floor(Math.random() * 30);
      const lastMaintenance = new Date(
        2023,
        Math.floor(Math.random() * 12),
        Math.floor(Math.random() * 28) + 1
      );

      const row = [
        station.id,
        `"${station.name}"`,
        station.lat.toFixed(4),
        station.lon.toFixed(4),
        establishedYear,
        `"${station.org}"`,
        types[Math.floor(Math.random() * types.length)],
        `${Math.floor(Math.random() * 20)}-${
          Math.floor(Math.random() * 200) + 20
        }`,
        focuses[Math.floor(Math.random() * focuses.length)],
        Math.floor(Math.random() * 15) + 5,
        lastMaintenance.toISOString().split("T")[0],
        statuses[Math.floor(Math.random() * statuses.length)],
      ];

      csv += row.join(",") + "\n";
    });

    return csv;
  };

  return (
    <div className="ocean-card dashboard-card">
      <div className="mb-6">
        <h3 className="text-xl font-bold text-white mb-2">
          📁 Upload Your Data
        </h3>
        <p className="text-slate-300 text-sm">
          Drag and drop your file or click to browse. We support multiple
          formats with intelligent parsing.
        </p>
      </div>

      {/* Upload Zone */}
      <div
        {...getRootProps()}
        className={`relative border-2 border-dashed rounded-xl p-8 text-center transition-all duration-300 cursor-pointer ${
          isDragActive
            ? "border-cyan-400 bg-cyan-500/10"
            : "border-slate-600 hover:border-cyan-500 hover:bg-slate-800/50"
        }`}
      >
        <input {...getInputProps()} />

        {/* Marine Animation Elements */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
          <div className="absolute top-4 left-4 w-6 h-6 bg-cyan-400/20 rounded-full animate-pulse"></div>
          <div
            className="absolute bottom-6 right-8 w-4 h-4 bg-blue-400/20 rounded-full animate-pulse"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute top-1/2 right-4 w-5 h-5 bg-teal-400/20 rounded-full animate-pulse"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative z-10">
          {isProcessing ? (
            <div className="space-y-4">
              <div className="w-16 h-16 mx-auto">
                <div className="relative">
                  <div className="w-16 h-16 border-4 border-cyan-500/30 rounded-full animate-spin"></div>
                  <div className="absolute inset-0 w-16 h-16 border-4 border-cyan-500 border-t-transparent rounded-full animate-spin"></div>
                </div>
              </div>
              <div className="text-cyan-400 font-semibold">
                🌊 Processing your data...
              </div>
              <div className="text-slate-400 text-sm">
                Analyzing structure and generating insights
              </div>
            </div>
          ) : (
            <div className="space-y-4">
              <div className="text-6xl mb-4">{isDragActive ? "🌊" : "📁"}</div>
              <div>
                <p className="text-white font-semibold mb-2">
                  {isDragActive
                    ? "Drop your file here"
                    : "Choose a file to upload"}
                </p>
                <p className="text-slate-400 text-sm">
                  or drag and drop it anywhere in this area
                </p>
              </div>
              <div className="text-xs text-slate-500">
                Maximum file size: 50MB
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Supported Formats */}
      <div className="mt-6">
        <h4 className="text-white font-semibold mb-3 text-sm">
          🔧 Supported Formats
        </h4>
        <div className="grid grid-cols-2 gap-2">
          {supportedFormats.map((format) => (
            <div
              key={format.ext}
              className="flex items-center gap-2 p-2 bg-slate-800/30 rounded-lg"
            >
              <span className="text-lg">{format.icon}</span>
              <div>
                <div className="text-cyan-400 font-medium text-xs">
                  {format.ext}
                </div>
                <div className="text-slate-400 text-xs">{format.desc}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Sample Data */}
      <div className="mt-6 p-4 bg-slate-800/30 rounded-lg">
        <h4 className="text-white font-semibold mb-2 text-sm">
          🧪 Try Sample Data
        </h4>
        <p className="text-slate-300 text-xs mb-3">
          Don't have data? Try our realistic marine biodiversity sample
          datasets.
        </p>
        <div className="grid grid-cols-1 gap-2">
          {[
            {
              name: "Species Occurrences",
              icon: "🐟",
              size: "~15KB",
              type: "species",
              desc: "150 marine species records with locations",
            },
            {
              name: "Environmental Data",
              icon: "🌡️",
              size: "~12KB",
              type: "environmental",
              desc: "200 environmental measurements",
            },
            {
              name: "Research Stations",
              icon: "📍",
              size: "~2KB",
              type: "stations",
              desc: "8 Indian marine research stations",
            },
          ].map((sample) => (
            <button
              key={sample.name}
              onClick={() => generateSampleData(sample.type)}
              disabled={isProcessing}
              className="flex items-center justify-between p-3 bg-slate-700/50 hover:bg-slate-700 rounded-lg transition-colors text-xs disabled:opacity-50 disabled:cursor-not-allowed"
              title={sample.desc}
            >
              <div className="flex items-center gap-2">
                <span>{sample.icon}</span>
                <div className="text-left">
                  <div className="text-slate-200 font-medium">
                    {sample.name}
                  </div>
                  <div className="text-slate-400 text-xs">{sample.desc}</div>
                </div>
              </div>
              <div className="text-slate-400 text-xs">{sample.size}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Data Requirements */}
      <div className="mt-4 p-3 bg-blue-500/10 border border-blue-500/20 rounded-lg">
        <div className="flex items-start gap-2">
          <span className="text-blue-400 text-lg">💡</span>
          <div>
            <h5 className="text-blue-400 font-semibold text-xs mb-1">
              Data Requirements
            </h5>
            <div className="text-slate-300 text-xs space-y-1">
              <div>• CSV files should have headers in the first row</div>
              <div>• Use standard date formats (YYYY-MM-DD, MM/DD/YYYY)</div>
              <div>• Numeric columns should contain only numbers</div>
              <div>• Geographic data: use 'lat', 'lon' in column names</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileUploader;
