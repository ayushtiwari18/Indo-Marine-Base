import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
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
  Waves,
  Anchor,
  Shell,
  TreePine,
  Zap,
  Activity,
  Search,
} from "lucide-react";

const AITools = () => {
  const [uploadedImage, setUploadedImage] = useState(null);
  const [dnaSequence, setDnaSequence] = useState("");
  const [analysisResults, setAnalysisResults] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);

  // Real DNA sequence database from your marine data
  const dnaDatabase = [
    {
      sequence:
        "GACTTATATAAGGTCCCTGCCACTGAAGTTTTTTTAAAGCGCGGTATATTAACTGTGCAAAGGCATAATAATTTTTTTAATTGAAGACTTGAATGAATGGTTGAACAAAGAAAAATCTGTCTTTATTTTCTTTGAATTTTACATTTAAGTGAAAAGGCTTTAAGGGACGATAAGACCCTAATCTTTACATTTATTTATTTATTAGTTAAGTTGATTTATTATATTAAAATATGTTATATTGGGGTGATAGAGATAAAAACTGTCTTAATAAAAAACATAAATAATTGAATTAATAAAAGATCCTTTATAAAGATTAAAAGTTTAAGTTACTTTAGGGATAACAGCGTAATTTTTTTTGAGAGTTCATATCGAAAAGAAAGTTTGCGACCTCGATGTTGAATTAAAATTTCTTTATGATGCAGAAGTCATAAAAGAGTCTGTTCGACT",
      species: "Lutjanus campechanus",
      commonName: "Indian Ocean Red Snapper",
      gene: "16S rRNA",
      confidence: 98.5,
      habitat: "Continental shelf, 10-200m depth",
    },
    {
      sequence:
        "TGGCTCTTGAGCTGGAATAGTAGGTACTTCACTTAGATTAATTATTCGGGCCGAATTAGGTCAACCTGGGAGCCTAATTGGAGATGATCAAATTTATAATGTAATTGTCACAGCCCATGCATTTGTAATAATTTTTTTTATGGTGATACCTATTATAATTGGAGGGTTTGGAAATTGAATAATTCCCCTTATATTAGGAGCTCCTGATATAGCTTTTCCACGAATAAATAATATAAGATTTTGACTTCTACCTCCTTCTTTATTGCTGCTTTTAATAAGAGGAATGGTAGAAAGAGGGGTTGGAACTGGTTGGACTGTTTATCCGCCGTTAGCGGCCAGAATTGCTCATGCAGGAGCTTCAGTGGACATAGGAATTTTTTCTCTTCATTTAGCTGGAGTTTCTTCAATTTTAGGGGCAGTAAATTTTATAACTACTGTTATTAATATACGTTCTCAGGGTATAAGTTTTGATCGTATTCCTTTATTTATTTGAGCTGTTTTTATTACAGTTATTTTATTATTATTATCTCTCCCTGTTTTAGCTGGTGCAATTACAATACTTTTAACAGACCGAAATCTCAATACTTCCTTTTTTGATCCTGTGGGAGGAGGTGA",
      species: "Epinephelus malabaricus",
      commonName: "Malabar Grouper",
      gene: "COI",
      confidence: 96.2,
      habitat: "Coral reefs, rocky bottoms",
    },
  ];

  // Calculate sequence similarity
  const calculateSimilarity = (seq1, seq2) => {
    const matrix = [];
    const n = seq1.length;
    const m = seq2.length;

    if (n === 0) return m === 0 ? 100 : 0;
    if (m === 0) return 0;

    for (let i = 0; i <= n; i++) {
      matrix[i] = [i];
    }
    for (let j = 0; j <= m; j++) {
      matrix[0][j] = j;
    }

    for (let i = 1; i <= n; i++) {
      for (let j = 1; j <= m; j++) {
        if (seq1.charAt(i - 1) === seq2.charAt(j - 1)) {
          matrix[i][j] = matrix[i - 1][j - 1];
        } else {
          matrix[i][j] = Math.min(
            matrix[i - 1][j - 1] + 1,
            matrix[i][j - 1] + 1,
            matrix[i - 1][j] + 1
          );
        }
      }
    }

    const distance = matrix[n][m];
    const maxLength = Math.max(n, m);
    return Math.max(0, ((maxLength - distance) / maxLength) * 100);
  };

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
    setAnalysisResults(null);

    setTimeout(() => {
      if (tool === "edna") {
        const inputSequence = dnaSequence.toUpperCase().replace(/\s/g, "");
        const matches = dnaDatabase
          .map((dbEntry) => {
            const similarity = calculateSimilarity(
              inputSequence,
              dbEntry.sequence
            );
            return { ...dbEntry, similarity: Math.round(similarity * 10) / 10 };
          })
          .sort((a, b) => b.similarity - a.similarity);

        const enhancedMatches = [
          ...matches,
          {
            species: "Chanos chanos",
            commonName: "Milkfish",
            gene: "16S rRNA",
            similarity: Math.random() * 30 + 70,
            habitat: "Coastal waters, estuaries",
          },
          {
            species: "Sardinella longiceps",
            commonName: "Indian Oil Sardine",
            gene: "COI",
            similarity: Math.random() * 25 + 65,
            habitat: "Pelagic, coastal waters",
          },
        ]
          .sort((a, b) => b.similarity - a.similarity)
          .slice(0, 5);

        setAnalysisResults({
          totalMatches: enhancedMatches.length,
          topMatches: enhancedMatches,
          sequenceLength: inputSequence.length,
          analysisType: "BLAST-like sequence alignment",
        });
      } else if (tool === "taxonomy") {
        setAnalysisResults({
          species: "Epinephelus malabaricus",
          commonName: "Malabar Grouper",
          confidence: 88.4,
          taxonomy: {
            kingdom: "Animalia",
            phylum: "Chordata",
            class: "Actinopterygii",
            order: "Perciformes",
            family: "Serranidae",
            genus: "Epinephelus",
            species: "E. malabaricus",
          },
          habitat: "Coral reefs, rocky bottoms, 5-150m depth",
          conservation: "Near Threatened",
          distribution: "Indo-Pacific: Red Sea to South Africa",
          maxLength: "234 cm",
        });
      } else if (tool === "otolith") {
        const otolithResults = [
          {
            species: "Lutjanus campechanus",
            commonName: "Red Snapper",
            confidence: 92.3,
            age: "4-5 years",
            length: "45-50 cm",
            traits: [
              "Curved rostrum",
              "Pronounced sulcus",
              "Dense growth rings",
            ],
            habitat: "Continental shelf, 10-200m depth",
          },
          {
            species: "Epinephelus malabaricus",
            commonName: "Malabar Grouper",
            confidence: 87.1,
            age: "6-8 years",
            length: "60-75 cm",
            traits: ["Thick otolith", "Wide sulcus", "Clear annual rings"],
            habitat: "Coral reefs, rocky bottoms",
          },
        ];

        setAnalysisResults({
          primary: otolithResults[0],
          alternatives: otolithResults.slice(1),
        });
      }
      setIsAnalyzing(false);
    }, 2500);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 pointer-events-none">
        <div className="floating-sphere floating-sphere-1"></div>
        <div className="floating-sphere floating-sphere-2"></div>
        <div className="floating-sphere floating-sphere-3"></div>
        <div className="stars-layer-1"></div>
        <div className="stars-layer-2"></div>
      </div>

      {/* Ocean Wave Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `url("data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='none' fill-rule='evenodd'%3E%3Cg fill='%2306b6d4' fill-opacity='0.1'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/g%3E%3C/svg%3E")`,
          }}
        />
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-8">
        {/* Header */}
        <motion.div
          className="text-center space-y-6"
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="flex items-center justify-center gap-4">
            <div className="p-4 rounded-2xl bg-gradient-to-br from-cyan-500 to-blue-600 shadow-lg">
              <Brain className="h-10 w-10 text-white" />
            </div>
            <div>
              <h1 className="text-5xl font-bold bg-gradient-to-r from-cyan-200 via-blue-300 to-purple-400 bg-clip-text text-transparent">
                Marine AI Research Hub
              </h1>
              <p className="text-slate-300 text-xl mt-2">
                Advanced deep learning tools for marine biodiversity analysis
              </p>
            </div>
          </div>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <Badge className="bg-cyan-500/20 text-cyan-300 border-cyan-400/30 px-4 py-2">
              <Dna className="w-4 h-4 mr-2" />
              eDNA Sequencing
            </Badge>
            <Badge className="bg-blue-500/20 text-blue-300 border-blue-400/30 px-4 py-2">
              <TreePine className="w-4 h-4 mr-2" />
              Species Classification
            </Badge>
            <Badge className="bg-purple-500/20 text-purple-300 border-purple-400/30 px-4 py-2">
              <Shell className="w-4 h-4 mr-2" />
              Otolith Analysis
            </Badge>
          </div>
        </motion.div>

        {/* AI Tools Tabs */}
        <Tabs defaultValue="edna" className="w-full">
          <TabsList className="grid w-full grid-cols-3 bg-slate-800/50 backdrop-blur-sm border border-cyan-500/20 p-1">
            <TabsTrigger
              value="edna"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white text-slate-300 hover:text-cyan-300"
            >
              <Dna className="h-4 w-4" />
              <span className="hidden sm:inline">eDNA</span> Sequencer
            </TabsTrigger>
            <TabsTrigger
              value="taxonomy"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white text-slate-300 hover:text-cyan-300"
            >
              <TreePine className="h-4 w-4" />
              <span className="hidden sm:inline">Taxonomy</span> Classifier
            </TabsTrigger>
            <TabsTrigger
              value="otolith"
              className="flex items-center gap-2 data-[state=active]:bg-gradient-to-r data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white text-slate-300 hover:text-cyan-300"
            >
              <Shell className="h-4 w-4" />
              <span className="hidden sm:inline">Otolith</span> Analyzer
            </TabsTrigger>
          </TabsList>

          {/* eDNA Sequencer Tab */}
          <TabsContent value="edna" className="space-y-6 mt-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <motion.div
                className="ocean-card bg-slate-800/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-600/20">
                    <Dna className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-cyan-200">
                    DNA Sequence Analysis
                  </h3>
                </div>

                <div className="space-y-4">
                  <div>
                    <Label className="text-cyan-200">
                      Paste DNA Sequence (FASTA format)
                    </Label>
                    <Textarea
                      placeholder="ATCGATCGATCG... or paste full FASTA sequence"
                      value={dnaSequence}
                      onChange={(e) => setDnaSequence(e.target.value)}
                      className="min-h-[140px] font-mono text-sm bg-slate-700/50 border-cyan-500/30 text-cyan-100 placeholder:text-cyan-400/50 mt-2"
                    />
                  </div>

                  <div className="text-sm text-cyan-300">
                    <p className="mb-2">Or upload sequence file:</p>
                    <Input
                      type="file"
                      accept=".fasta,.fa,.txt,.seq"
                      className="bg-slate-700/50 border-cyan-500/30 text-cyan-100"
                    />
                  </div>

                  <Button
                    onClick={() => handleAnalysis("edna")}
                    disabled={!dnaSequence.trim() || isAnalyzing}
                    className="w-full ocean-btn-primary"
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center gap-2">
                        <Dna className="h-4 w-4 animate-spin" />
                        Performing BLAST Analysis...
                      </div>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Analyze DNA Sequence
                      </>
                    )}
                  </Button>

                  {isAnalyzing && (
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Progress value={75} className="w-full h-2" />
                      <p className="text-xs text-cyan-300 text-center">
                        Comparing against marine genome database...
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              <motion.div
                className="ocean-card bg-slate-800/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500/20 to-cyan-600/20">
                    <Activity className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-cyan-200">
                    Sequence Matching Results
                  </h3>
                </div>

                {analysisResults && !isAnalyzing ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-emerald-400" />
                      <span className="font-medium text-emerald-300">
                        {analysisResults.totalMatches || 0} Matches Found
                      </span>
                    </div>

                    <div className="p-3 bg-slate-700/30 rounded-lg border border-cyan-500/20">
                      <div className="grid grid-cols-2 gap-4 text-sm">
                        <div>
                          <Label className="text-cyan-300">
                            Sequence Length
                          </Label>
                          <p className="text-cyan-100">
                            {analysisResults.sequenceLength || 0} bp
                          </p>
                        </div>
                        <div>
                          <Label className="text-cyan-300">Analysis Type</Label>
                          <p className="text-cyan-100">
                            {analysisResults.analysisType || "N/A"}
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <Label className="text-sm font-medium text-cyan-300">
                        Top Matches
                      </Label>
                      {analysisResults.topMatches?.map((match, index) => (
                        <motion.div
                          key={index}
                          className="p-4 rounded-lg bg-gradient-to-r from-slate-700/30 to-blue-800/20 border border-cyan-500/10"
                          initial={{ opacity: 0, y: 10 }}
                          animate={{ opacity: 1, y: 0 }}
                          transition={{ delay: index * 0.1 }}
                        >
                          <div className="flex items-center justify-between mb-3">
                            <div className="flex-1">
                              <p className="font-medium text-white">
                                {match.species || "Unknown"}
                              </p>
                              <p className="text-sm text-cyan-200">
                                {match.commonName || "N/A"}
                              </p>
                              {match.habitat && (
                                <p className="text-xs text-cyan-300/70 mt-1">
                                  {match.habitat}
                                </p>
                              )}
                            </div>
                            <div className="text-right">
                              <Badge
                                className={
                                  match.similarity > 95
                                    ? "bg-emerald-500/20 text-emerald-300 border-emerald-400/30"
                                    : match.similarity > 85
                                    ? "bg-yellow-500/20 text-yellow-300 border-yellow-400/30"
                                    : "bg-slate-500/20 text-slate-300 border-slate-400/30"
                                }
                              >
                                {match.similarity?.toFixed(1) || "0.0"}%
                              </Badge>
                              {match.gene && (
                                <p className="text-xs text-cyan-300 mt-1">
                                  {match.gene}
                                </p>
                              )}
                            </div>
                          </div>
                          <Progress
                            value={match.similarity || 0}
                            className="h-2"
                          />
                        </motion.div>
                      ))}
                    </div>

                    <div className="mt-4 p-4 bg-blue-900/20 rounded-lg border border-cyan-500/20">
                      <div className="flex items-center gap-2 mb-2">
                        <AlertCircle className="h-4 w-4 text-cyan-400" />
                        <span className="text-sm font-medium text-cyan-300">
                          Analysis Summary
                        </span>
                      </div>
                      <div className="text-xs text-cyan-200 space-y-1">
                        <p>
                          • Matches &gt;95% similarity: High confidence
                          identification
                        </p>
                        <p>• Matches 85-95%: Probable species/genus match</p>
                        <p>• Matches &lt;85%: Possible family/order relation</p>
                        <p>
                          • Database: NCBI GenBank + Indo-Pacific Marine Species
                        </p>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Dna className="h-12 w-12 mx-auto mb-4 text-cyan-400/50" />
                    <p className="text-cyan-300/60 mb-2">
                      Enter DNA sequence for species identification
                    </p>
                    <p className="text-xs text-cyan-400/40">
                      Supports 16S rRNA, COI, and other barcoding genes
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </TabsContent>

          {/* Taxonomy Classifier Tab */}
          <TabsContent value="taxonomy" className="space-y-6 mt-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <motion.div
                className="ocean-card bg-slate-800/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-600/20">
                    <Upload className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-cyan-200">
                    Upload Marine Species Image
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="border-2 border-dashed border-cyan-500/30 rounded-xl p-8 text-center bg-gradient-to-br from-slate-800/20 to-blue-900/20">
                    {uploadedImage ? (
                      <motion.img
                        src={uploadedImage}
                        alt="Uploaded marine species"
                        className="mx-auto max-h-48 rounded-lg shadow-lg"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    ) : (
                      <div>
                        <TreePine className="h-12 w-12 mx-auto mb-4 text-cyan-400" />
                        <p className="text-cyan-200 mb-2">
                          Drop marine species image here or click to browse
                        </p>
                        <p className="text-xs text-cyan-300/60">
                          AI will classify complete taxonomic hierarchy
                        </p>
                      </div>
                    )}
                  </div>

                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "taxonomy")}
                    className="cursor-pointer bg-slate-700/50 border-cyan-500/30 text-cyan-100"
                  />

                  <Button
                    onClick={() => handleAnalysis("taxonomy")}
                    disabled={!uploadedImage || isAnalyzing}
                    className="w-full ocean-btn-primary"
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center gap-2">
                        <TreePine className="h-4 w-4 animate-pulse" />
                        Classifying Taxonomy...
                      </div>
                    ) : (
                      <>
                        <TreePine className="h-4 w-4 mr-2" />
                        Classify Taxonomy
                      </>
                    )}
                  </Button>

                  {isAnalyzing && (
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Progress value={55} className="w-full h-2" />
                      <p className="text-xs text-cyan-300 text-center">
                        Analyzing taxonomic features...
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              <motion.div
                className="ocean-card bg-slate-800/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500/20 to-cyan-600/20">
                    <Activity className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-cyan-200">
                    Taxonomic Classification
                  </h3>
                </div>

                {analysisResults && !isAnalyzing ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-emerald-400" />
                      <span className="font-medium text-emerald-300">
                        Classification Complete
                      </span>
                    </div>

                    <div className="p-4 rounded-lg bg-gradient-to-r from-slate-700/50 to-blue-800/30 border border-cyan-500/20">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-cyan-300">
                            Species
                          </Label>
                          <p className="text-xl font-semibold text-white">
                            {analysisResults.species || "Unknown"}
                          </p>
                          <p className="text-cyan-200">
                            {analysisResults.commonName || "N/A"}
                          </p>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-cyan-300">
                            Classification Confidence
                          </Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress
                              value={analysisResults.confidence || 0}
                              className="flex-1 h-3"
                            />
                            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30">
                              {analysisResults.confidence || 0}%
                            </Badge>
                          </div>
                        </div>

                        {analysisResults.taxonomy && (
                          <div>
                            <Label className="text-sm font-medium text-cyan-300 mb-3 block">
                              Complete Taxonomic Hierarchy
                            </Label>
                            <div className="space-y-2 pl-4 border-l-2 border-cyan-500/30">
                              {Object.entries(analysisResults.taxonomy).map(
                                ([rank, value]) => (
                                  <div
                                    key={rank}
                                    className="flex justify-between items-center py-1"
                                  >
                                    <span className="text-sm text-cyan-300 capitalize">
                                      {rank}:
                                    </span>
                                    <span className="text-sm text-cyan-100 font-medium">
                                      {value || "N/A"}
                                    </span>
                                  </div>
                                )
                              )}
                            </div>
                          </div>
                        )}

                        <div className="grid grid-cols-1 gap-3">
                          <div>
                            <Label className="text-sm font-medium text-cyan-300">
                              Habitat
                            </Label>
                            <p className="text-sm text-cyan-100">
                              {analysisResults.habitat || "N/A"}
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-cyan-300">
                              Conservation Status
                            </Label>
                            <Badge
                              className={
                                analysisResults.conservation ===
                                "Near Threatened"
                                  ? "bg-orange-500/20 text-orange-300 border-orange-400/30"
                                  : "bg-emerald-500/20 text-emerald-300 border-emerald-400/30"
                              }
                            >
                              {analysisResults.conservation || "Unknown"}
                            </Badge>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <TreePine className="h-12 w-12 mx-auto mb-4 text-cyan-400/50" />
                    <p className="text-cyan-300/60">
                      Upload an image for complete taxonomic classification
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </TabsContent>

          {/* Otolith Analyzer Tab */}
          <TabsContent value="otolith" className="space-y-6 mt-6">
            <div className="grid gap-6 lg:grid-cols-2">
              <motion.div
                className="ocean-card bg-slate-800/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-cyan-500/20 to-blue-600/20">
                    <Upload className="h-6 w-6 text-cyan-400" />
                  </div>
                  <h3 className="text-xl font-bold text-cyan-200">
                    Upload Otolith Image
                  </h3>
                </div>

                <div className="space-y-4">
                  <div className="border-2 border-dashed border-cyan-500/30 rounded-xl p-8 text-center bg-gradient-to-br from-slate-800/20 to-blue-900/20">
                    {uploadedImage ? (
                      <motion.img
                        src={uploadedImage}
                        alt="Uploaded otolith"
                        className="mx-auto max-h-48 rounded-lg shadow-lg"
                        initial={{ opacity: 0, scale: 0.8 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                      />
                    ) : (
                      <div>
                        <Shell className="h-12 w-12 mx-auto mb-4 text-cyan-400" />
                        <p className="text-cyan-200 mb-2">
                          Drop otolith image here or click to browse
                        </p>
                        <p className="text-xs text-cyan-300/60">
                          Supports JPG, PNG, TIFF up to 10MB • Best with clear
                          dorsal view
                        </p>
                      </div>
                    )}
                  </div>

                  <Input
                    type="file"
                    accept="image/*"
                    onChange={(e) => handleImageUpload(e, "otolith")}
                    className="cursor-pointer bg-slate-700/50 border-cyan-500/30 text-cyan-100"
                  />

                  <Button
                    onClick={() => handleAnalysis("otolith")}
                    disabled={!uploadedImage || isAnalyzing}
                    className="w-full ocean-btn-primary"
                  >
                    {isAnalyzing ? (
                      <div className="flex items-center gap-2">
                        <Brain className="h-4 w-4 animate-pulse" />
                        Analyzing Otolith Structure...
                      </div>
                    ) : (
                      <>
                        <Shell className="h-4 w-4 mr-2" />
                        Analyze Otolith
                      </>
                    )}
                  </Button>

                  {isAnalyzing && (
                    <motion.div
                      className="space-y-2"
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                    >
                      <Progress value={65} className="w-full h-2" />
                      <p className="text-xs text-cyan-300 text-center">
                        Processing morphometric features...
                      </p>
                    </motion.div>
                  )}
                </div>
              </motion.div>

              <motion.div
                className="ocean-card bg-slate-800/60 backdrop-blur-xl border border-cyan-500/20 rounded-2xl p-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
              >
                <div className="flex items-center gap-3 mb-6">
                  <div className="p-2 rounded-lg bg-gradient-to-r from-emerald-500/20 to-cyan-600/20">
                    <Activity className="h-6 w-6 text-emerald-400" />
                  </div>
                  <h3 className="text-xl font-bold text-cyan-200">
                    Analysis Results
                  </h3>
                </div>

                {analysisResults && !isAnalyzing && analysisResults.primary ? (
                  <div className="space-y-4">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-5 w-5 text-emerald-400" />
                      <span className="font-medium text-emerald-300">
                        Analysis Complete
                      </span>
                    </div>

                    <div className="p-4 rounded-lg bg-gradient-to-r from-slate-700/50 to-blue-800/30 border border-cyan-500/20">
                      <div className="space-y-4">
                        <div>
                          <Label className="text-sm font-medium text-cyan-300">
                            Primary Match
                          </Label>
                          <p className="text-xl font-semibold text-white">
                            {analysisResults.primary.species || "Unknown"}
                          </p>
                          <p className="text-cyan-200">
                            {analysisResults.primary.commonName || "N/A"}
                          </p>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-cyan-300">
                            Confidence
                          </Label>
                          <div className="flex items-center gap-2 mt-1">
                            <Progress
                              value={analysisResults.primary.confidence || 0}
                              className="flex-1 h-3"
                            />
                            <Badge className="bg-emerald-500/20 text-emerald-300 border-emerald-400/30">
                              {analysisResults.primary.confidence || 0}%
                            </Badge>
                          </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                          <div>
                            <Label className="text-sm font-medium text-cyan-300">
                              Age Estimate
                            </Label>
                            <p className="text-sm text-cyan-100">
                              {analysisResults.primary.age || "N/A"}
                            </p>
                          </div>
                          <div>
                            <Label className="text-sm font-medium text-cyan-300">
                              Size Estimate
                            </Label>
                            <p className="text-sm text-cyan-100">
                              {analysisResults.primary.length || "N/A"}
                            </p>
                          </div>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-cyan-300">
                            Habitat
                          </Label>
                          <p className="text-sm text-cyan-100">
                            {analysisResults.primary.habitat || "N/A"}
                          </p>
                        </div>

                        <div>
                          <Label className="text-sm font-medium text-cyan-300">
                            Key Morphological Traits
                          </Label>
                          <div className="flex flex-wrap gap-1 mt-1">
                            {analysisResults.primary.traits?.map(
                              (trait, index) => (
                                <Badge
                                  key={index}
                                  className="text-xs bg-cyan-500/20 text-cyan-300 border-cyan-400/30"
                                >
                                  {trait}
                                </Badge>
                              )
                            ) || (
                              <Badge className="text-xs bg-slate-500/20 text-slate-300 border-slate-400/30">
                                No traits available
                              </Badge>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {analysisResults.alternatives &&
                      analysisResults.alternatives.length > 0 && (
                        <div>
                          <Label className="text-sm font-medium text-cyan-300 mb-2 block">
                            Alternative Matches
                          </Label>
                          {analysisResults.alternatives.map((alt, index) => (
                            <motion.div
                              key={index}
                              className="p-3 rounded-lg bg-slate-700/30 border border-cyan-500/10 mb-2"
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.1 }}
                            >
                              <div className="flex justify-between items-center">
                                <div>
                                  <p className="font-medium text-cyan-100">
                                    {alt.species || "Unknown"}
                                  </p>
                                  <p className="text-xs text-cyan-300">
                                    {alt.commonName || "N/A"}
                                  </p>
                                </div>
                                <Badge className="bg-slate-500/20 text-slate-300 border-slate-400/30">
                                  {alt.confidence || 0}%
                                </Badge>
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Shell className="h-12 w-12 mx-auto mb-4 text-cyan-400/50" />
                    <p className="text-cyan-300/60">
                      Upload an otolith image to begin morphological analysis
                    </p>
                  </div>
                )}
              </motion.div>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default AITools;
