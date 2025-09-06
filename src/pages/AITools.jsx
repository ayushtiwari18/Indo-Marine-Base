import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Upload,
  Brain,
  Fish,
  Dna,
  Camera,
  CheckCircle,
  AlertCircle,
} from "lucide-react";

const AITools = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [dnaSequence, setDnaSequence] = useState("");
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  const handleImageUpload = (event, tool) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAnalysis = (tool) => {
    setIsAnalyzing(true);
    // Simulate analysis
    setTimeout(() => {
      if (tool === "otolith") {
        setAnalysisResults({
          species: "Lutjanus campechanus",
          commonName: "Red Snapper",
          confidence: 92,
          age: "4-5 years",
          length: "45-50 cm",
          traits: ["Curved rostrum", "Pronounced sulcus", "Dense growth rings"],
        });
      } else if (tool === "species") {
        setAnalysisResults({
          species: "Epinephelus malabaricus",
          commonName: "Malabar Grouper",
          confidence: 88,
          family: "Serranidae",
          habitat: "Coral reefs, rocky bottoms",
          conservation: "Near Threatened",
        });
      } else if (tool === "edna") {
        setAnalysisResults({
          matches: [
            {
              species: "Chanos chanos",
              commonName: "Milkfish",
              similarity: 98.5,
            },
            {
              species: "Sardinella longiceps",
              commonName: "Indian Oil Sardine",
              similarity: 95.2,
            },
            {
              species: "Rastrelliger kanagurta",
              commonName: "Indian Mackerel",
              similarity: 93.8,
            },
          ],
        });
      }
      setIsAnalyzing(false);
    }, 2000);
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">AI-Powered Analysis Tools</h1>
          <p className="text-muted-foreground">
            Advanced machine learning tools for marine species identification
            and analysis
          </p>
        </div>
      </div>

      <Tabs defaultValue="otolith" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="otolith" className="flex items-center gap-2">
            <Brain className="h-4 w-4" />
            Otolith Analyzer
          </TabsTrigger>
          <TabsTrigger value="species" className="flex items-center gap-2">
            <Fish className="h-4 w-4" />
            Species Identifier
          </TabsTrigger>
          <TabsTrigger value="edna" className="flex items-center gap-2">
            <Dna className="h-4 w-4" />
            eDNA Matcher
          </TabsTrigger>
        </TabsList>

        {/* Otolith Analyzer */}
        <TabsContent value="otolith" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  Upload Otolith Image
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  {uploadedImage ? (
                    <img
                      src={uploadedImage}
                      alt="Uploaded otolith"
                      className="mx-auto max-h-48 rounded-lg"
                    />
                  ) : (
                    <div>
                      <Camera className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-2">
                        Drop otolith image here or click to browse
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Supports JPG, PNG, TIFF up to 10MB
                      </p>
                    </div>
                  )}
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "otolith")}
                  className="cursor-pointer"
                />
                <Button
                  onClick={() => handleAnalysis("otolith")}
                  disabled={!uploadedImage || isAnalyzing}
                  className="w-full"
                >
                  {isAnalyzing ? "Analyzing..." : "Analyze Otolith"}
                </Button>
                {isAnalyzing && <Progress value={65} className="w-full" />}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Analysis Results</CardTitle>
              </CardHeader>
              <CardContent>
                {analysisResults && !isAnalyzing ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Analysis Complete</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium">Species</Label>
                        <p className="text-lg font-semibold">
                          {analysisResults.species}
                        </p>
                        <p className="text-muted-foreground">
                          {analysisResults.commonName}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">
                          Confidence
                        </Label>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={analysisResults.confidence}
                            className="flex-1"
                          />
                          <span className="text-sm font-medium">
                            {analysisResults.confidence}%
                          </span>
                        </div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <Label className="text-sm font-medium">
                            Estimated Age
                          </Label>
                          <p className="text-sm">{analysisResults.age}</p>
                        </div>
                        <div>
                          <Label className="text-sm font-medium">
                            Estimated Length
                          </Label>
                          <p className="text-sm">{analysisResults.length}</p>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">
                          Key Traits
                        </Label>
                        <div className="flex flex-wrap gap-1 mt-1">
                          {analysisResults.traits?.map((trait, index) => (
                            <Badge
                              key={index}
                              variant="outline"
                              className="text-xs"
                            >
                              {trait}
                            </Badge>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Brain className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Upload an otolith image to begin analysis
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Species Identifier */}
        <TabsContent value="species" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Upload className="h-5 w-5 text-primary" />
                  Upload Fish Image
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="border-2 border-dashed border-border rounded-lg p-8 text-center">
                  {uploadedImage ? (
                    <img
                      src={uploadedImage}
                      alt="Uploaded fish"
                      className="mx-auto max-h-48 rounded-lg"
                    />
                  ) : (
                    <div>
                      <Fish className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                      <p className="text-muted-foreground mb-2">
                        Drop fish image here or click to browse
                      </p>
                      <p className="text-xs text-muted-foreground">
                        Best results with clear, side-view images
                      </p>
                    </div>
                  )}
                </div>
                <Input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageUpload(e, "species")}
                  className="cursor-pointer"
                />
                <Button
                  onClick={() => handleAnalysis("species")}
                  disabled={!uploadedImage || isAnalyzing}
                  className="w-full"
                >
                  {isAnalyzing ? "Identifying..." : "Identify Species"}
                </Button>
                {isAnalyzing && <Progress value={45} className="w-full" />}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Identification Results</CardTitle>
              </CardHeader>
              <CardContent>
                {analysisResults && !isAnalyzing ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Species Identified</span>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <Label className="text-sm font-medium">Species</Label>
                        <p className="text-lg font-semibold">
                          {analysisResults.species}
                        </p>
                        <p className="text-muted-foreground">
                          {analysisResults.commonName}
                        </p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">
                          Confidence
                        </Label>
                        <div className="flex items-center gap-2">
                          <Progress
                            value={analysisResults.confidence}
                            className="flex-1"
                          />
                          <span className="text-sm font-medium">
                            {analysisResults.confidence}%
                          </span>
                        </div>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Family</Label>
                        <p className="text-sm">{analysisResults.family}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">Habitat</Label>
                        <p className="text-sm">{analysisResults.habitat}</p>
                      </div>
                      <div>
                        <Label className="text-sm font-medium">
                          Conservation Status
                        </Label>
                        <Badge
                          variant={
                            analysisResults.conservation === "Near Threatened"
                              ? "destructive"
                              : "secondary"
                          }
                        >
                          {analysisResults.conservation}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Fish className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Upload a fish image to identify the species
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* eDNA Matcher */}
        <TabsContent value="edna" className="space-y-6">
          <div className="grid gap-6 lg:grid-cols-2">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Dna className="h-5 w-5 text-primary" />
                  DNA Sequence Input
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="dna-sequence">Paste DNA Sequence</Label>
                  <Textarea
                    id="dna-sequence"
                    placeholder="ATCGATCGATCG..."
                    value={dnaSequence}
                    onChange={(e) => setDnaSequence(e.target.value)}
                    className="min-h-[120px] font-mono text-sm"
                  />
                </div>
                <div className="text-sm text-muted-foreground">
                  <p>Or upload FASTA file:</p>
                </div>
                <Input type="file" accept=".fasta,.fa,.txt" />
                <Button
                  onClick={() => handleAnalysis("edna")}
                  disabled={!dnaSequence || isAnalyzing}
                  className="w-full"
                >
                  {isAnalyzing ? "Matching..." : "Find Matches"}
                </Button>
                {isAnalyzing && <Progress value={75} className="w-full" />}
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Matching Results</CardTitle>
              </CardHeader>
              <CardContent>
                {analysisResults && !isAnalyzing ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="font-medium">Matches Found</span>
                    </div>
                    <div className="space-y-3">
                      {analysisResults.matches?.map((match, index) => (
                        <div key={index} className="border rounded-lg p-3">
                          <div className="flex items-center justify-between mb-2">
                            <div>
                              <p className="font-medium">{match.species}</p>
                              <p className="text-sm text-muted-foreground">
                                {match.commonName}
                              </p>
                            </div>
                            <Badge
                              variant={
                                match.similarity > 95 ? "default" : "secondary"
                              }
                            >
                              {match.similarity}%
                            </Badge>
                          </div>
                          <Progress value={match.similarity} className="h-2" />
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 p-3 bg-muted rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-medium">
                          Analysis Notes
                        </span>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        Results based on NCBI GenBank database. Matches above
                        95% similarity are considered highly reliable.
                      </p>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Dna className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                    <p className="text-muted-foreground">
                      Enter DNA sequence to find species matches
                    </p>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default AITools;
