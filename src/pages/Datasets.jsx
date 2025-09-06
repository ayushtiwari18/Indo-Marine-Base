import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Search,
  LayoutGrid,
  List,
  Download,
  Eye,
  Calendar,
  MapPin,
  ChevronDown,
  FileText,
  Database,
  Award,
  Users,
  ExternalLink,
} from "lucide-react";

const Datasets = () => {
  const [viewMode, setViewMode] = useState("table");
  const [searchTerm, setSearchTerm] = useState("");

  const datasets = [
    {
      id: 1,
      name: "Arabian Sea Temperature Profiles",
      category: "Oceanography",
      type: "Temperature",
      location: "Arabian Sea",
      timeRange: "2020-2024",
      size: "2.3 GB",
      records: "45,000",
      lastUpdated: "2024-12-10",
      description:
        "Comprehensive temperature measurements across different depths",
      tags: ["temperature", "depth", "seasonal"],
      isOriginal: true,
      credibility: {
        score: 95,
        citations: 12,
        peerReviewed: true,
        dataQuality: "High",
        institution: "NIOT, Chennai",
      },
      derivedDatasets: [1, 2], // IDs of derived datasets
    },
    {
      id: 2,
      name: "Bay of Bengal Fish Census",
      category: "Taxonomy",
      type: "Species Count",
      location: "Bay of Bengal",
      timeRange: "2023-2024",
      size: "890 MB",
      records: "12,500",
      lastUpdated: "2024-12-08",
      description: "Complete fish species inventory with population estimates",
      tags: ["fish", "census", "biodiversity"],
      isOriginal: true,
      credibility: {
        score: 88,
        citations: 8,
        peerReviewed: true,
        dataQuality: "High",
        institution: "Central Marine Fisheries Research Institute",
      },
      derivedDatasets: [3, 4],
    },
    {
      id: 3,
      name: "Otolith Morphology Database",
      category: "Otolith Morphology",
      type: "Image Data",
      location: "Indian Ocean",
      timeRange: "2019-2024",
      size: "5.1 GB",
      records: "8,900",
      lastUpdated: "2024-12-05",
      description:
        "High-resolution otolith images with morphometric measurements",
      tags: ["otolith", "morphology", "images"],
      isOriginal: true,
      credibility: {
        score: 92,
        citations: 15,
        peerReviewed: true,
        dataQuality: "Very High",
        institution: "Indian Institute of Science",
      },
      derivedDatasets: [5],
    },
    {
      id: 4,
      name: "Coral Reef eDNA Sequences",
      category: "Molecular/eDNA",
      type: "DNA Sequences",
      location: "Andaman Islands",
      timeRange: "2023-2024",
      size: "1.7 GB",
      records: "6,750",
      lastUpdated: "2024-12-03",
      description: "Environmental DNA samples from coral reef ecosystems",
      tags: ["eDNA", "coral", "sequences"],
      isOriginal: true,
      credibility: {
        score: 90,
        citations: 6,
        peerReviewed: true,
        dataQuality: "High",
        institution: "Zoological Survey of India",
      },
      derivedDatasets: [],
    },
    // Derived/Pre-processed datasets
    {
      id: 5,
      name: "Arabian Sea Seasonal Temperature Averages",
      category: "Oceanography",
      type: "Processed Temperature",
      location: "Arabian Sea",
      timeRange: "2020-2024",
      size: "45 MB",
      records: "1,200",
      lastUpdated: "2024-12-12",
      description:
        "Monthly and seasonal temperature averages derived from raw temperature profiles",
      tags: ["temperature", "seasonal", "averaged", "processed"],
      isOriginal: false,
      parentDataset: 1,
      credibility: {
        score: 95,
        citations: 3,
        peerReviewed: false,
        dataQuality: "High",
        institution: "NIOT, Chennai",
        processingMethod: "Statistical aggregation with quality control",
      },
      derivedDatasets: [],
    },
    {
      id: 6,
      name: "Arabian Sea Temperature Anomalies",
      category: "Oceanography",
      type: "Climate Indices",
      location: "Arabian Sea",
      timeRange: "2020-2024",
      size: "12 MB",
      records: "480",
      lastUpdated: "2024-12-12",
      description:
        "Temperature anomaly indices calculated from baseline climatology",
      tags: ["temperature", "anomaly", "climate", "indices"],
      isOriginal: false,
      parentDataset: 1,
      credibility: {
        score: 92,
        citations: 1,
        peerReviewed: false,
        dataQuality: "High",
        institution: "NIOT, Chennai",
        processingMethod: "Anomaly calculation against 30-year climatology",
      },
      derivedDatasets: [],
    },
    {
      id: 7,
      name: "Bay of Bengal Commercial Fish Species",
      category: "Taxonomy",
      type: "Species Subset",
      location: "Bay of Bengal",
      timeRange: "2023-2024",
      size: "156 MB",
      records: "2,800",
      lastUpdated: "2024-12-10",
      description:
        "Filtered dataset containing only commercially important fish species",
      tags: ["fish", "commercial", "filtered", "taxonomy"],
      isOriginal: false,
      parentDataset: 2,
      credibility: {
        score: 88,
        citations: 2,
        peerReviewed: false,
        dataQuality: "High",
        institution: "CMFRI",
        processingMethod:
          "Species filtering based on commercial importance criteria",
      },
      derivedDatasets: [],
    },
    {
      id: 8,
      name: "Bay of Bengal Biodiversity Indices",
      category: "Taxonomy",
      type: "Diversity Metrics",
      location: "Bay of Bengal",
      timeRange: "2023-2024",
      size: "8 MB",
      records: "450",
      lastUpdated: "2024-12-09",
      description:
        "Calculated biodiversity indices including Shannon, Simpson, and species richness",
      tags: ["biodiversity", "indices", "shannon", "simpson"],
      isOriginal: false,
      parentDataset: 2,
      credibility: {
        score: 85,
        citations: 0,
        peerReviewed: false,
        dataQuality: "High",
        institution: "CMFRI",
        processingMethod: "Standard ecological diversity calculations",
      },
      derivedDatasets: [],
    },
    {
      id: 9,
      name: "Otolith Shape Descriptors",
      category: "Otolith Morphology",
      type: "Morphometric Data",
      location: "Indian Ocean",
      timeRange: "2019-2024",
      size: "234 MB",
      records: "8,900",
      lastUpdated: "2024-12-07",
      description:
        "Extracted shape descriptors and morphometric measurements from otolith images",
      tags: ["otolith", "morphometry", "shape", "descriptors"],
      isOriginal: false,
      parentDataset: 3,
      credibility: {
        score: 92,
        citations: 4,
        peerReviewed: false,
        dataQuality: "Very High",
        institution: "IISc",
        processingMethod: "Automated image analysis with manual validation",
      },
      derivedDatasets: [],
    },
  ];

  const exportFormats = [
    {
      format: "CSV",
      description: "Comma-separated values",
      icon: <FileText className="h-4 w-4" />,
      extension: ".csv",
    },
    {
      format: "DwC-Core",
      description: "Darwin Core Archive",
      icon: <Database className="h-4 w-4" />,
      extension: ".zip",
    },
    {
      format: "OBIS",
      description: "Ocean Biodiversity Information System",
      icon: <Database className="h-4 w-4" />,
      extension: ".xml",
    },
    {
      format: "GBIF",
      description: "Global Biodiversity Information Facility",
      icon: <Database className="h-4 w-4" />,
      extension: ".zip",
    },
    {
      format: "NetCDF",
      description: "Network Common Data Form",
      icon: <Database className="h-4 w-4" />,
      extension: ".nc",
    },
    {
      format: "JSON-LD",
      description: "JSON Linked Data",
      icon: <FileText className="h-4 w-4" />,
      extension: ".json",
    },
  ];

  const categories = [
    "All",
    "Oceanography",
    "Taxonomy",
    "Otolith Morphology",
    "Molecular/eDNA",
  ];

  const filteredDatasets = datasets.filter(
    (dataset) =>
      dataset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dataset.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleExport = (dataset, format) => {
    console.log(`Exporting ${dataset.name} in ${format} format`);
    // Implementation would handle the actual export logic
    alert(`Exporting "${dataset.name}" in ${format} format...`);
  };

  const getCredibilityColor = (score) => {
    if (score >= 90) return "bg-green-100 text-green-800";
    if (score >= 80) return "bg-yellow-100 text-yellow-800";
    return "bg-red-100 text-red-800";
  };

  const CredibilityBadge = ({ credibility }) => (
    <div className="flex items-center gap-2">
      <Badge className={`${getCredibilityColor(credibility.score)} text-xs`}>
        {credibility.score}% credible
      </Badge>
      {credibility.peerReviewed && (
        <Badge variant="outline" className="text-xs">
          <Award className="h-3 w-3 mr-1" />
          Peer Reviewed
        </Badge>
      )}
    </div>
  );

  const DatasetCard = ({ dataset }) => (
    <Card className="hover:shadow-lg transition-shadow">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-2 mb-1">
              <CardTitle className="text-lg">{dataset.name}</CardTitle>
              {!dataset.isOriginal && (
                <Badge variant="secondary" className="text-xs">
                  Derived
                </Badge>
              )}
            </div>
            <CredibilityBadge credibility={dataset.credibility} />
          </div>
          <Badge variant="secondary">{dataset.category}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground mb-4">
          {dataset.description}
        </p>

        {!dataset.isOriginal && dataset.parentDataset && (
          <div className="mb-3 p-2 bg-blue-50 rounded-md">
            <p className="text-xs text-blue-700">
              <Database className="h-3 w-3 inline mr-1" />
              Derived from:{" "}
              {datasets.find((d) => d.id === dataset.parentDataset)?.name}
            </p>
          </div>
        )}

        <div className="space-y-2 text-sm">
          <div className="flex justify-between">
            <span className="text-muted-foreground">Records:</span>
            <span>{dataset.records}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Size:</span>
            <span>{dataset.size}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Location:</span>
            <span>{dataset.location}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-muted-foreground">Quality:</span>
            <span>{dataset.credibility.dataQuality}</span>
          </div>
        </div>

        <div className="flex flex-wrap gap-1 mt-3">
          {dataset.tags.map((tag, index) => (
            <Badge key={index} variant="outline" className="text-xs">
              {tag}
            </Badge>
          ))}
        </div>

        <div className="flex gap-2 mt-4">
          <Dialog>
            <DialogTrigger asChild>
              <Button size="sm" variant="outline">
                <Eye className="h-3 w-3 mr-1" />
                View Details
              </Button>
            </DialogTrigger>
            <DialogContent className="max-w-2xl">
              <DialogHeader>
                <DialogTitle>{dataset.name}</DialogTitle>
              </DialogHeader>
              <div className="space-y-4">
                <div>
                  <h4 className="font-semibold mb-2">Dataset Information</h4>
                  <div className="grid grid-cols-2 gap-4 text-sm">
                    <div>
                      <span className="text-muted-foreground">
                        Institution:
                      </span>
                      <p>{dataset.credibility.institution}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">Citations:</span>
                      <p>{dataset.credibility.citations}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Data Quality:
                      </span>
                      <p>{dataset.credibility.dataQuality}</p>
                    </div>
                    <div>
                      <span className="text-muted-foreground">
                        Last Updated:
                      </span>
                      <p>{dataset.lastUpdated}</p>
                    </div>
                  </div>
                </div>

                {dataset.credibility.processingMethod && (
                  <div>
                    <h4 className="font-semibold mb-2">Processing Method</h4>
                    <p className="text-sm text-muted-foreground">
                      {dataset.credibility.processingMethod}
                    </p>
                  </div>
                )}

                {dataset.derivedDatasets &&
                  dataset.derivedDatasets.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Derived Datasets</h4>
                      <div className="space-y-2">
                        {dataset.derivedDatasets.map((id) => {
                          const derived = datasets.find((d) => d.id === id);
                          return derived ? (
                            <div
                              key={id}
                              className="flex items-center gap-2 p-2 bg-gray-50 rounded"
                            >
                              <Database className="h-4 w-4 text-muted-foreground" />
                              <span className="text-sm">{derived.name}</span>
                            </div>
                          ) : null;
                        })}
                      </div>
                    </div>
                  )}
              </div>
            </DialogContent>
          </Dialog>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button size="sm">
                <Download className="h-3 w-3 mr-1" />
                Export
                <ChevronDown className="h-3 w-3 ml-1" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-56">
              {exportFormats.map((format) => (
                <DropdownMenuItem
                  key={format.format}
                  onClick={() => handleExport(dataset, format.format)}
                  className="flex items-center gap-2"
                >
                  {format.icon}
                  <div className="flex-1">
                    <div className="font-medium">{format.format}</div>
                    <div className="text-xs text-muted-foreground">
                      {format.description}
                    </div>
                  </div>
                  <span className="text-xs text-muted-foreground">
                    {format.extension}
                  </span>
                </DropdownMenuItem>
              ))}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardContent>
    </Card>
  );

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Marine Datasets</h1>
          <p className="text-muted-foreground">
            Explore our comprehensive collection of marine research data
            including original and derived datasets
          </p>
        </div>
      </div>

      {/* Search and Filters */}
      <Card>
        <CardContent className="p-6">
          <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
            <div className="flex flex-1 items-center gap-2">
              <Search className="h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search datasets..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="flex-1"
              />
            </div>
            <div className="flex items-center gap-2">
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Dataset Type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Types</SelectItem>
                  <SelectItem value="original">Original</SelectItem>
                  <SelectItem value="derived">Derived</SelectItem>
                </SelectContent>
              </Select>
              <Select>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Location" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Locations</SelectItem>
                  <SelectItem value="arabian-sea">Arabian Sea</SelectItem>
                  <SelectItem value="bay-bengal">Bay of Bengal</SelectItem>
                  <SelectItem value="indian-ocean">Indian Ocean</SelectItem>
                </SelectContent>
              </Select>
              <div className="flex items-center gap-1 border rounded-md">
                <Button
                  variant={viewMode === "table" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("table")}
                >
                  <List className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === "grid" ? "default" : "ghost"}
                  size="sm"
                  onClick={() => setViewMode("grid")}
                >
                  <LayoutGrid className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Category Tabs */}
      <Tabs defaultValue="All" className="w-full">
        <TabsList className="grid w-full grid-cols-5">
          {categories.map((category) => (
            <TabsTrigger key={category} value={category}>
              {category}
            </TabsTrigger>
          ))}
        </TabsList>

        {categories.map((category) => (
          <TabsContent key={category} value={category} className="space-y-4">
            {viewMode === "table" ? (
              <Card>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>Dataset Name</TableHead>
                      <TableHead>Type</TableHead>
                      <TableHead>Location</TableHead>
                      <TableHead>Records</TableHead>
                      <TableHead>Size</TableHead>
                      <TableHead>Credibility</TableHead>
                      <TableHead>Updated</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredDatasets
                      .filter(
                        (dataset) =>
                          category === "All" || dataset.category === category
                      )
                      .map((dataset) => (
                        <TableRow key={dataset.id}>
                          <TableCell>
                            <div>
                              <div className="flex items-center gap-2">
                                <span className="font-medium">
                                  {dataset.name}
                                </span>
                                {!dataset.isOriginal && (
                                  <Badge
                                    variant="secondary"
                                    className="text-xs"
                                  >
                                    Derived
                                  </Badge>
                                )}
                              </div>
                              <div className="text-sm text-muted-foreground">
                                {dataset.description}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell>
                            <Badge variant="outline">{dataset.type}</Badge>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <MapPin className="h-3 w-3 text-muted-foreground" />
                              {dataset.location}
                            </div>
                          </TableCell>
                          <TableCell>{dataset.records}</TableCell>
                          <TableCell>{dataset.size}</TableCell>
                          <TableCell>
                            <CredibilityBadge
                              credibility={dataset.credibility}
                            />
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3 w-3 text-muted-foreground" />
                              {dataset.lastUpdated}
                            </div>
                          </TableCell>
                          <TableCell>
                            <div className="flex items-center gap-1">
                              <Button size="sm" variant="outline">
                                <Eye className="h-3 w-3 mr-1" />
                                View
                              </Button>
                              <DropdownMenu>
                                <DropdownMenuTrigger asChild>
                                  <Button size="sm" variant="outline">
                                    <Download className="h-3 w-3 mr-1" />
                                    Export
                                  </Button>
                                </DropdownMenuTrigger>
                                <DropdownMenuContent>
                                  {exportFormats.slice(0, 3).map((format) => (
                                    <DropdownMenuItem
                                      key={format.format}
                                      onClick={() =>
                                        handleExport(dataset, format.format)
                                      }
                                    >
                                      {format.format}
                                    </DropdownMenuItem>
                                  ))}
                                </DropdownMenuContent>
                              </DropdownMenu>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))}
                  </TableBody>
                </Table>
              </Card>
            ) : (
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {filteredDatasets
                  .filter(
                    (dataset) =>
                      category === "All" || dataset.category === category
                  )
                  .map((dataset) => (
                    <DatasetCard key={dataset.id} dataset={dataset} />
                  ))}
              </div>
            )}
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default Datasets;
