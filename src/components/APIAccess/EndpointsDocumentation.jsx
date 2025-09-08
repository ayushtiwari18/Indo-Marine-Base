import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Search,
  Code,
  Database,
  Zap,
  FileText,
  Copy,
  ExternalLink,
  ChevronDown,
  ChevronRight,
  AlertCircle,
  CheckCircle,
  Waves,
  Globe,
  Activity,
  Shield,
} from "lucide-react";

export const EndpointsDocumentation = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [expandedEndpoint, setExpandedEndpoint] = useState(null);

  const endpointCategories = [
    { id: "all", name: "All Endpoints", count: 24 },
    { id: "datasets", name: "Datasets", count: 8 },
    { id: "species", name: "Species", count: 6 },
    { id: "analysis", name: "AI Analysis", count: 5 },
    { id: "monitoring", name: "Monitoring", count: 3 },
    { id: "admin", name: "Administration", count: 2 },
  ];

  const endpoints = [
    {
      id: "datasets-list",
      category: "datasets",
      name: "List Datasets",
      method: "GET",
      path: "/api/v2/datasets",
      description:
        "Retrieve a paginated list of available marine datasets with optional filtering",
      auth_required: true,
      rate_limit: "1000/hour",
      parameters: [
        {
          name: "category",
          type: "string",
          in: "query",
          required: false,
          description: "Filter by dataset category",
          enum: ["oceanography", "marine-biology", "climate", "pollution"],
        },
        {
          name: "location",
          type: "string",
          in: "query",
          required: false,
          description: "Filter by geographical location or region",
        },
        {
          name: "date_from",
          type: "string",
          format: "date",
          in: "query",
          required: false,
          description: "Filter datasets from this date (YYYY-MM-DD)",
        },
        {
          name: "date_to",
          type: "string",
          format: "date",
          in: "query",
          required: false,
          description: "Filter datasets until this date (YYYY-MM-DD)",
        },
        {
          name: "limit",
          type: "integer",
          in: "query",
          required: false,
          default: 20,
          description: "Number of results per page (max 100)",
        },
        {
          name: "page",
          type: "integer",
          in: "query",
          required: false,
          default: 1,
          description: "Page number for pagination",
        },
      ],
      responses: {
        200: {
          description: "Successful response with dataset list",
          example: `{
  "status": "success",
  "data": {
    "results": [
      {
        "id": "ds_001",
        "title": "Pacific Ocean Temperature Monitoring 2024",
        "category": "oceanography",
        "description": "Comprehensive temperature data from Pacific monitoring stations",
        "location": "Pacific Ocean",
        "date_range": {
          "start": "2024-01-01",
          "end": "2024-12-31"
        },
        "size": "2.3 GB",
        "format": ["CSV", "NetCDF"],
        "created_at": "2024-01-15T10:30:00Z",
        "updated_at": "2024-12-01T14:20:00Z",
        "access_level": "public",
        "download_url": "https://api.oceanvista.gov.in/v2/datasets/ds_001/download"
      }
    ],
    "pagination": {
      "current_page": 1,
      "per_page": 20,
      "total": 147,
      "total_pages": 8
    }
  },
  "meta": {
    "timestamp": "2024-12-15T10:30:00Z",
    "response_time": "0.12s"
  }
}`,
        },
        400: {
          description: "Bad request - invalid parameters",
          example: `{
  "status": "error",
  "error": {
    "code": "INVALID_PARAMETER",
    "message": "Invalid date format",
    "details": "date_from must be in YYYY-MM-DD format"
  }
}`,
        },
        401: {
          description: "Unauthorized - invalid or missing API key",
        },
        429: {
          description: "Rate limit exceeded",
        },
      },
    },
    {
      id: "datasets-get",
      category: "datasets",
      name: "Get Dataset Details",
      method: "GET",
      path: "/api/v2/datasets/{id}",
      description: "Retrieve detailed information about a specific dataset",
      auth_required: true,
      rate_limit: "2000/hour",
      parameters: [
        {
          name: "id",
          type: "string",
          in: "path",
          required: true,
          description: "Unique dataset identifier",
        },
        {
          name: "include_metadata",
          type: "boolean",
          in: "query",
          required: false,
          default: false,
          description: "Include detailed metadata in response",
        },
      ],
      responses: {
        200: {
          description: "Dataset details retrieved successfully",
          example: `{
  "status": "success",
  "data": {
    "id": "ds_001",
    "title": "Pacific Ocean Temperature Monitoring 2024",
    "category": "oceanography",
    "description": "Comprehensive temperature data collected from monitoring stations across the Pacific Ocean",
    "location": {
      "region": "Pacific Ocean",
      "coordinates": {
        "north": 60.0,
        "south": -60.0,
        "east": -120.0,
        "west": 120.0
      }
    },
    "temporal_coverage": {
      "start": "2024-01-01T00:00:00Z",
      "end": "2024-12-31T23:59:59Z",
      "resolution": "hourly"
    },
    "variables": [
      {
        "name": "sea_surface_temperature",
        "unit": "degrees_celsius",
        "description": "Sea surface temperature measurement"
      },
      {
        "name": "depth_temperature",
        "unit": "degrees_celsius", 
        "description": "Temperature at various depths"
      }
    ],
    "formats": ["CSV", "NetCDF", "JSON"],
    "size": "2.3 GB",
    "quality_score": 0.95,
    "access_level": "public",
    "license": "CC BY 4.0",
    "citation": "Ocean Research Institute (2024). Pacific Ocean Temperature Monitoring 2024. OceanVista Data Portal.",
    "download_url": "https://api.oceanvista.gov.in/v2/datasets/ds_001/download",
    "preview_url": "https://api.oceanvista.gov.in/v2/datasets/ds_001/preview"
  }
}`,
        },
        404: {
          description: "Dataset not found",
        },
      },
    },
    {
      id: "species-search",
      category: "species",
      name: "Search Species",
      method: "GET",
      path: "/api/v2/species/search",
      description: "Search for marine species using various criteria",
      auth_required: true,
      rate_limit: "5000/hour",
      parameters: [
        {
          name: "q",
          type: "string",
          in: "query",
          required: true,
          description:
            "Search query (species name, scientific name, or keywords)",
        },
        {
          name: "location",
          type: "string",
          in: "query",
          required: false,
          description: "Geographic location or marine region",
        },
        {
          name: "conservation_status",
          type: "string",
          in: "query",
          required: false,
          enum: [
            "extinct",
            "critically_endangered",
            "endangered",
            "vulnerable",
            "near_threatened",
            "least_concern",
          ],
          description: "Filter by IUCN conservation status",
        },
        {
          name: "habitat_type",
          type: "string",
          in: "query",
          required: false,
          enum: [
            "pelagic",
            "benthic",
            "coastal",
            "deep_sea",
            "coral_reef",
            "estuarine",
          ],
          description: "Filter by primary habitat type",
        },
        {
          name: "taxonomy_level",
          type: "string",
          in: "query",
          required: false,
          enum: ["species", "genus", "family", "order", "class"],
          description: "Taxonomic level for search results",
        },
      ],
      responses: {
        200: {
          description: "Species search results",
          example: `{
  "status": "success",
  "data": {
    "results": [
      {
        "id": "sp_001",
        "scientific_name": "Carcharodon carcharias",
        "common_names": ["Great White Shark", "White Shark"],
        "taxonomy": {
          "kingdom": "Animalia",
          "phylum": "Chordata",
          "class": "Chondrichthyes",
          "order": "Lamniformes",
          "family": "Lamnidae",
          "genus": "Carcharodon",
          "species": "carcharias"
        },
        "conservation_status": "vulnerable",
        "population_trend": "decreasing",
        "habitats": ["coastal waters", "open ocean", "continental shelf"],
        "geographic_range": ["Global - temperate and subtropical waters"],
        "physical_characteristics": {
          "max_length": "6.1 meters",
          "max_weight": "2268 kg",
          "lifespan": "70+ years"
        },
        "threats": ["overfishing", "bycatch", "habitat degradation"],
        "last_updated": "2024-11-15T09:30:00Z"
      }
    ],
    "search_metadata": {
      "query": "great white shark",
      "total_results": 23,
      "search_time": "0.08s",
      "filters_applied": []
    }
  }
}`,
        },
      },
    },
    {
      id: "analyze-image",
      category: "analysis",
      name: "Analyze Marine Image",
      method: "POST",
      path: "/api/v2/analyze/image",
      description:
        "Use AI to analyze marine life images for species identification and other insights",
      auth_required: true,
      rate_limit: "1000/hour",
      parameters: [
        {
          name: "image",
          type: "file",
          in: "formData",
          required: true,
          description:
            "Image file to analyze (JPEG, PNG, WebP). Max size: 10MB",
        },
        {
          name: "analysis_type",
          type: "string",
          in: "formData",
          required: true,
          enum: [
            "species_identification",
            "habitat_analysis",
            "behavior_analysis",
            "health_assessment",
          ],
          description: "Type of analysis to perform",
        },
        {
          name: "confidence_threshold",
          type: "number",
          format: "float",
          in: "formData",
          required: false,
          default: 0.5,
          description: "Minimum confidence threshold for predictions (0.0-1.0)",
        },
        {
          name: "return_bounding_boxes",
          type: "boolean",
          in: "formData",
          required: false,
          default: false,
          description: "Include bounding box coordinates for detected objects",
        },
      ],
      responses: {
        200: {
          description: "Image analysis completed successfully",
          example: `{
  "status": "success",
  "data": {
    "analysis_id": "ana_12345",
    "analysis_type": "species_identification",
    "confidence_threshold": 0.5,
    "overall_confidence": 0.94,
    "processing_time": "2.34s",
    "predictions": [
      {
        "species_id": "sp_001",
        "scientific_name": "Chelonia mydas",
        "common_name": "Green Sea Turtle",
        "confidence": 0.94,
        "bounding_box": {
          "x": 120,
          "y": 80,
          "width": 340,
          "height": 280
        },
        "additional_info": {
          "conservation_status": "endangered",
          "habitat": "coastal waters",
          "estimated_size": "adult"
        }
      },
      {
        "species_id": "sp_002",
        "scientific_name": "Caretta caretta",
        "common_name": "Loggerhead Sea Turtle",
        "confidence": 0.06,
        "bounding_box": {
          "x": 115,
          "y": 75,
          "width": 350,
          "height": 290
        }
      }
    ],
    "image_metadata": {
      "width": 1024,
      "height": 768,
      "format": "JPEG",
      "size_bytes": 245760,
      "location": {
        "latitude": 25.7617,
        "longitude": -80.1918,
        "accuracy": "approximate"
      },
      "timestamp": "2024-12-15T10:45:33Z"
    }
  }
}`,
        },
        400: {
          description: "Invalid image file or parameters",
        },
        413: {
          description: "Image file too large",
        },
      },
    },
    {
      id: "monitoring-status",
      category: "monitoring",
      name: "System Health Status",
      method: "GET",
      path: "/api/v2/monitoring/status",
      description: "Get current system health and service status information",
      auth_required: false,
      rate_limit: "100/hour",
      parameters: [],
      responses: {
        200: {
          description: "System status information",
          example: `{
  "status": "success",
  "data": {
    "overall_status": "healthy",
    "timestamp": "2024-12-15T10:30:00Z",
    "services": {
      "api_gateway": {
        "status": "healthy",
        "response_time": "12ms",
        "uptime": "99.98%"
      },
      "database": {
        "status": "healthy", 
        "response_time": "3ms",
        "connections": "45/200"
      },
      "ai_models": {
        "status": "healthy",
        "models_loaded": 8,
        "queue_size": 2
      },
      "data_storage": {
        "status": "healthy",
        "usage": "65%",
        "available_space": "12.5 TB"
      }
    },
    "metrics": {
      "requests_per_minute": 847,
      "average_response_time": "124ms",
      "error_rate": "0.12%",
      "active_users": 1205
    }
  }
}`,
        },
      },
    },
  ];

  const filteredEndpoints = endpoints.filter((endpoint) => {
    const matchesSearch =
      searchTerm === "" ||
      endpoint.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      endpoint.path.toLowerCase().includes(searchTerm.toLowerCase()) ||
      endpoint.description.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesCategory =
      selectedCategory === "all" || endpoint.category === selectedCategory;

    return matchesSearch && matchesCategory;
  });

  const toggleEndpoint = (endpointId) => {
    setExpandedEndpoint(expandedEndpoint === endpointId ? null : endpointId);
  };

  const getMethodColor = (method) => {
    const colors = {
      GET: "bg-gradient-to-r from-green-500 to-emerald-500",
      POST: "bg-gradient-to-r from-blue-500 to-cyan-500",
      PUT: "bg-gradient-to-r from-yellow-500 to-orange-500",
      DELETE: "bg-gradient-to-r from-red-500 to-pink-500",
      PATCH: "bg-gradient-to-r from-purple-500 to-violet-500",
    };
    return colors[method] || "bg-gradient-to-r from-gray-500 to-slate-500";
  };

  const getStatusColor = (status) => {
    const colors = {
      200: "text-green-400",
      201: "text-green-400",
      400: "text-yellow-400",
      401: "text-red-400",
      403: "text-red-400",
      404: "text-red-400",
      429: "text-orange-400",
      500: "text-red-400",
    };
    return colors[status] || "text-slate-400";
  };

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold text-slate-100 flex items-center justify-center gap-2">
          <Database className="h-6 w-6 text-cyan-400" />
          API Endpoints Documentation
        </h2>
        <p className="text-slate-400">
          Comprehensive documentation for all available API endpoints with
          examples and parameters
        </p>
      </div>

      {/* Search and Filter */}
      <Card className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 shadow-2xl">
        <CardContent className="p-6">
          <div className="flex flex-col md:flex-row gap-4">
            <div className="flex-1">
              <div className="relative">
                <Search className="absolute left-3 top-3 h-4 w-4 text-slate-400" />
                <Input
                  placeholder="Search endpoints, paths, or descriptions..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 bg-slate-700/30 border-slate-600/30 text-slate-200 placeholder:text-slate-500 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20"
                />
              </div>
            </div>
            <div className="flex gap-2 overflow-x-auto">
              {endpointCategories.map((category) => (
                <Button
                  key={category.id}
                  variant={
                    selectedCategory === category.id ? "default" : "outline"
                  }
                  size="sm"
                  onClick={() => setSelectedCategory(category.id)}
                  className={`whitespace-nowrap transition-all duration-300 ${
                    selectedCategory === category.id
                      ? "bg-gradient-to-r from-cyan-500 to-blue-500 text-white shadow-lg hover:shadow-cyan-500/25"
                      : "border-slate-600/30 text-slate-300 hover:bg-slate-700/50 hover:text-slate-100 hover:border-cyan-400/50"
                  }`}
                >
                  {category.name} ({category.count})
                </Button>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Endpoints List */}
      <div className="space-y-4">
        {filteredEndpoints.map((endpoint) => (
          <Card
            key={endpoint.id}
            className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 shadow-2xl overflow-hidden hover:shadow-cyan-500/10 transition-all duration-300"
          >
            <CardHeader
              className="cursor-pointer hover:bg-slate-700/20 transition-colors"
              onClick={() => toggleEndpoint(endpoint.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <Badge
                    className={`${getMethodColor(
                      endpoint.method
                    )} text-white font-mono shadow-lg`}
                  >
                    {endpoint.method}
                  </Badge>
                  <div className="flex-1">
                    <h3 className="font-semibold text-lg text-slate-100">
                      {endpoint.name}
                    </h3>
                    <code className="text-sm text-slate-300 bg-slate-800/50 border border-slate-600/30 px-2 py-1 rounded">
                      {endpoint.path}
                    </code>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  {endpoint.auth_required && (
                    <Badge
                      variant="outline"
                      className="text-xs border-cyan-500/30 text-cyan-400 bg-cyan-500/10"
                    >
                      Auth Required
                    </Badge>
                  )}
                  <Badge
                    variant="outline"
                    className="text-xs border-slate-600/30 text-slate-400"
                  >
                    {endpoint.rate_limit}
                  </Badge>
                  {expandedEndpoint === endpoint.id ? (
                    <ChevronDown className="h-5 w-5 text-cyan-400" />
                  ) : (
                    <ChevronRight className="h-5 w-5 text-slate-400" />
                  )}
                </div>
              </div>
            </CardHeader>

            {expandedEndpoint === endpoint.id && (
              <CardContent className="border-t border-slate-700/30 bg-slate-800/20">
                <div className="space-y-6 py-6">
                  {/* Description */}
                  <div>
                    <h4 className="font-semibold mb-2 text-slate-200">
                      Description
                    </h4>
                    <p className="text-slate-400">{endpoint.description}</p>
                  </div>

                  <Tabs defaultValue="parameters" className="w-full">
                    <TabsList className="grid w-full grid-cols-3 bg-slate-700/30 border border-slate-600/30">
                      <TabsTrigger
                        value="parameters"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white text-slate-300"
                      >
                        Parameters
                      </TabsTrigger>
                      <TabsTrigger
                        value="responses"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white text-slate-300"
                      >
                        Responses
                      </TabsTrigger>
                      <TabsTrigger
                        value="examples"
                        className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white text-slate-300"
                      >
                        Examples
                      </TabsTrigger>
                    </TabsList>

                    <TabsContent value="parameters" className="space-y-4">
                      {endpoint.parameters.length > 0 ? (
                        <div className="space-y-3">
                          {endpoint.parameters.map((param, index) => (
                            <div
                              key={index}
                              className="p-4 bg-slate-700/30 border border-slate-600/20 rounded-lg hover:bg-slate-700/50 transition-colors duration-300"
                            >
                              <div className="flex items-center gap-2 mb-2">
                                <code className="font-mono text-sm bg-slate-800/50 text-cyan-300 px-2 py-1 rounded border border-slate-600/30">
                                  {param.name}
                                </code>
                                <Badge
                                  variant="outline"
                                  className="text-xs border-blue-500/30 text-blue-400 bg-blue-500/10"
                                >
                                  {param.type}
                                </Badge>
                                {param.required ? (
                                  <Badge className="text-xs bg-red-500/20 text-red-400 border-red-500/30">
                                    Required
                                  </Badge>
                                ) : (
                                  <Badge
                                    variant="outline"
                                    className="text-xs border-slate-600/30 text-slate-400"
                                  >
                                    Optional
                                  </Badge>
                                )}
                                <Badge
                                  variant="outline"
                                  className="text-xs border-purple-500/30 text-purple-400 bg-purple-500/10"
                                >
                                  {param.in}
                                </Badge>
                              </div>
                              <p className="text-sm text-slate-300 mb-2">
                                {param.description}
                              </p>
                              {param.enum && (
                                <div className="text-xs">
                                  <span className="font-medium text-slate-200">
                                    Allowed values:{" "}
                                  </span>
                                  <code className="bg-slate-800/50 text-cyan-300 px-1 rounded border border-slate-600/30">
                                    {param.enum.join(", ")}
                                  </code>
                                </div>
                              )}
                              {param.default !== undefined && (
                                <div className="text-xs">
                                  <span className="font-medium text-slate-200">
                                    Default:{" "}
                                  </span>
                                  <code className="bg-slate-800/50 text-cyan-300 px-1 rounded border border-slate-600/30">
                                    {param.default}
                                  </code>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>
                      ) : (
                        <div className="text-center p-8 text-slate-500">
                          <FileText className="h-12 w-12 mx-auto mb-4 opacity-50 text-cyan-400/30" />
                          <p className="text-slate-400">
                            No parameters required for this endpoint
                          </p>
                        </div>
                      )}
                    </TabsContent>

                    <TabsContent value="responses" className="space-y-4">
                      <div className="space-y-4">
                        {Object.entries(endpoint.responses).map(
                          ([status, response]) => (
                            <div
                              key={status}
                              className="p-4 bg-slate-700/30 border border-slate-600/20 rounded-lg hover:bg-slate-700/50 transition-colors duration-300"
                            >
                              <div className="flex items-center gap-2 mb-3">
                                <Badge
                                  className={`${getStatusColor(
                                    status
                                  )} bg-transparent border border-current`}
                                >
                                  {status}
                                </Badge>
                                <span className="font-medium text-slate-200">
                                  {response.description}
                                </span>
                              </div>
                              {response.example && (
                                <div>
                                  <Label className="text-sm font-medium mb-2 block text-slate-200">
                                    Example Response:
                                  </Label>
                                  <pre className="text-xs bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-700/30 max-h-96">
                                    {response.example}
                                  </pre>
                                </div>
                              )}
                            </div>
                          )
                        )}
                      </div>
                    </TabsContent>

                    <TabsContent value="examples" className="space-y-4">
                      <div className="grid gap-4">
                        <div className="p-4 bg-slate-700/30 border border-slate-600/20 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <Label className="font-medium text-slate-200">
                              cURL Example
                            </Label>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400"
                            >
                              <Copy className="h-4 w-4 mr-1" />
                              Copy
                            </Button>
                          </div>
                          <pre className="text-xs bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-700/30">
                            {endpoint.method === "GET"
                              ? `curl -X GET "https://api.oceanvista.gov.in${endpoint.path}" \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json"`
                              : `curl -X ${endpoint.method} "https://api.oceanvista.gov.in${endpoint.path}" \\\n  -H "Authorization: Bearer YOUR_API_KEY" \\\n  -H "Content-Type: application/json" \\\n  -d '{"key": "value"}'`}
                          </pre>
                        </div>

                        <div className="p-4 bg-slate-700/30 border border-slate-600/20 rounded-lg">
                          <div className="flex items-center justify-between mb-3">
                            <Label className="font-medium text-slate-200">
                              JavaScript Example
                            </Label>
                            <Button
                              size="sm"
                              variant="outline"
                              className="border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400"
                            >
                              <Copy className="h-4 w-4 mr-1" />
                              Copy
                            </Button>
                          </div>
                          <pre className="text-xs bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-700/30">
                            {`const response = await fetch('${endpoint.path}', {
  method: '${endpoint.method}',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }${endpoint.method !== "GET" ? ",\n  body: JSON.stringify(data)" : ""}
});

const result = await response.json();
console.log(result);`}
                          </pre>
                        </div>
                      </div>
                    </TabsContent>
                  </Tabs>
                </div>
              </CardContent>
            )}
          </Card>
        ))}
      </div>

      {filteredEndpoints.length === 0 && (
        <Card className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 shadow-2xl">
          <CardContent className="p-12 text-center">
            <Search className="h-12 w-12 mx-auto mb-4 opacity-50 text-cyan-400/30" />
            <h3 className="font-semibold text-lg mb-2 text-slate-200">
              No endpoints found
            </h3>
            <p className="text-slate-400">
              Try adjusting your search terms or category filter
            </p>
          </CardContent>
        </Card>
      )}

      {/* API Status */}
      <Card className="bg-gradient-to-br from-slate-800/50 to-cyan-900/20 backdrop-blur-sm border border-cyan-500/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-slate-100">
            <Activity className="h-5 w-5 text-cyan-400" />
            API Status
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-4">
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-green-400 to-emerald-400 bg-clip-text text-transparent">
                99.9%
              </div>
              <div className="text-sm text-slate-400 flex items-center justify-center gap-1">
                <CheckCircle className="h-3 w-3 text-green-400" />
                Uptime
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                124ms
              </div>
              <div className="text-sm text-slate-400 flex items-center justify-center gap-1">
                <Zap className="h-3 w-3 text-cyan-400" />
                Avg Response
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-violet-400 bg-clip-text text-transparent">
                24
              </div>
              <div className="text-sm text-slate-400 flex items-center justify-center gap-1">
                <Database className="h-3 w-3 text-purple-400" />
                Endpoints
              </div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold bg-gradient-to-r from-orange-400 to-red-400 bg-clip-text text-transparent">
                v2.1.0
              </div>
              <div className="text-sm text-slate-400 flex items-center justify-center gap-1">
                <Globe className="h-3 w-3 text-orange-400" />
                API Version
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
