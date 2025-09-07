"use client";
import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  BookOpen,
  Search,
  Code,
  Download,
  ExternalLink,
  Play,
  Copy,
  CheckCircle,
  FileText,
  Zap,
  Database,
  Layers,
} from "lucide-react";

gsap.registerPlugin(ScrollTrigger);

const Documentation = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, margin: "-100px" });
  const [searchTerm, setSearchTerm] = useState("");
  const [copiedCode, setCopiedCode] = useState(null);

  const apiEndpoints = [
    {
      method: "GET",
      endpoint: "/api/v1/species",
      description: "Retrieve marine species data",
      parameters: ["limit", "offset", "filter"],
      response: "Array of species objects with taxonomic information",
    },
    {
      method: "POST",
      endpoint: "/api/v1/species/identify",
      description: "Identify species from image or eDNA data",
      parameters: ["image_data", "location", "confidence_threshold"],
      response: "Species identification with confidence score",
    },
    {
      method: "GET",
      endpoint: "/api/v1/oceanographic",
      description: "Get oceanographic data for specified region",
      parameters: ["lat", "lon", "depth", "date_range"],
      response: "Temperature, salinity, and other oceanographic parameters",
    },
    {
      method: "POST",
      endpoint: "/api/v1/data/upload",
      description: "Upload research data to the platform",
      parameters: ["file", "metadata", "dataset_type"],
      response: "Upload confirmation with dataset ID",
    },
  ];

  const codeExamples = [
    {
      title: "Species Identification",
      language: "python",
      code: `import requests
import base64

# Load and encode image
with open('marine_species.jpg', 'rb') as f:
    image_data = base64.b64encode(f.read()).decode()

# API call
response = requests.post('https://api.marineintelligence.org/v1/species/identify', {
    'image_data': image_data,
    'location': {'lat': 36.7783, 'lon': -119.4179},
    'confidence_threshold': 0.8
})

result = response.json()
print(f"Species: {result['species_name']}")
print(f"Confidence: {result['confidence']:.2f}")`,
    },
    {
      title: "Oceanographic Data Query",
      language: "javascript",
      code: `const fetchOceanData = async (lat, lon, depth) => {
  const response = await fetch(
    \`https://api.marineintelligence.org/v1/oceanographic?lat=\${lat}&lon=\${lon}&depth=\${depth}\`
  );
  
  const data = await response.json();
  
  return {
    temperature: data.temperature,
    salinity: data.salinity,
    dissolved_oxygen: data.dissolved_oxygen,
    ph: data.ph
  };
};

// Usage
const oceanData = await fetchOceanData(36.7783, -119.4179, 100);
console.log('Ocean conditions:', oceanData);`,
    },
  ];

  const guides = [
    {
      title: "Getting Started Guide",
      description:
        "Complete guide to setting up your research account and accessing marine data",
      duration: "10 min read",
      level: "Beginner",
      topics: ["Account Setup", "API Keys", "First Query"],
    },
    {
      title: "Species Identification Tutorial",
      description: "Learn how to use AI-powered species identification tools",
      duration: "15 min read",
      level: "Intermediate",
      topics: ["Image Upload", "eDNA Analysis", "Result Interpretation"],
    },
    {
      title: "Data Integration Workflow",
      description:
        "Best practices for integrating your research data with our platform",
      duration: "20 min read",
      level: "Advanced",
      topics: ["Data Formats", "Metadata Standards", "Batch Processing"],
    },
    {
      title: "Oceanographic Analysis",
      description:
        "Advanced techniques for oceanographic data analysis and visualization",
      duration: "25 min read",
      level: "Advanced",
      topics: [
        "Time Series Analysis",
        "Spatial Interpolation",
        "Climate Models",
      ],
    },
  ];

  const copyToClipboard = (code, index) => {
    navigator.clipboard.writeText(code);
    setCopiedCode(index);
    setTimeout(() => setCopiedCode(null), 2000);
  };

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo(
        ".doc-card",
        { y: 80, opacity: 0, scale: 0.9 },
        {
          y: 0,
          opacity: 1,
          scale: 1,
          duration: 0.8,
          ease: "power3.out",
          stagger: 0.1,
          scrollTrigger: {
            trigger: ".docs-content",
            start: "top 70%",
          },
        }
      );
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <div
      ref={sectionRef}
      className="min-h-screen bg-gradient-to-b from-slate-900 via-slate-800 to-slate-900 pt-24 pb-16"
    >
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden opacity-5">
        <div className="absolute w-96 h-96 rounded-full bg-gradient-to-br from-cyan-400/20 to-blue-500/10 top-20 -left-20 animate-pulse"></div>
        <div
          className="absolute w-80 h-80 rounded-full bg-gradient-to-br from-blue-400/15 to-cyan-500/8 bottom-20 -right-20 animate-pulse"
          style={{ animationDelay: "2s" }}
        ></div>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 50 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-slate-800/60 backdrop-blur-sm px-6 py-3 rounded-full border border-cyan-500/30 mb-8">
            <BookOpen className="w-5 h-5 text-cyan-400" />
            <span className="text-cyan-300 text-sm font-medium">
              Developer Documentation
            </span>
          </div>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-white via-cyan-200 to-cyan-400 bg-clip-text text-transparent">
              API
            </span>
            <br />
            <span className="text-white">Documentation</span>
          </h1>

          <p className="text-xl md:text-2xl text-slate-300 max-w-4xl mx-auto leading-relaxed">
            Comprehensive guides and API reference for integrating marine
            intelligence into your research workflows.
          </p>
        </motion.div>

        {/* Search */}
        <Card className="doc-card bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 mb-8">
          <CardContent className="p-6">
            <div className="relative max-w-2xl mx-auto">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-slate-400" />
              <Input
                placeholder="Search documentation, API endpoints, or guides..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10 bg-slate-900/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-cyan-500 text-lg py-3"
              />
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <div className="docs-content">
          <Tabs defaultValue="api" className="space-y-8">
            <TabsList className="grid w-full grid-cols-4 bg-slate-800/90 border border-slate-700/50">
              <TabsTrigger
                value="api"
                className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
              >
                API Reference
              </TabsTrigger>
              <TabsTrigger
                value="guides"
                className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
              >
                Guides
              </TabsTrigger>
              <TabsTrigger
                value="examples"
                className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
              >
                Code Examples
              </TabsTrigger>
              <TabsTrigger
                value="sdks"
                className="data-[state=active]:bg-cyan-600 data-[state=active]:text-white"
              >
                SDKs
              </TabsTrigger>
            </TabsList>

            {/* API Reference Tab */}
            <TabsContent value="api">
              <div className="space-y-6">
                {apiEndpoints.map((endpoint, index) => (
                  <Card
                    key={index}
                    className="doc-card bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 group"
                  >
                    <CardContent className="p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div className="flex items-center gap-3">
                          <Badge
                            className={`${
                              endpoint.method === "GET"
                                ? "bg-emerald-600/20 text-emerald-400 border-emerald-500/30"
                                : "bg-blue-600/20 text-blue-400 border-blue-500/30"
                            }`}
                          >
                            {endpoint.method}
                          </Badge>
                          <code className="text-cyan-400 font-mono text-lg">
                            {endpoint.endpoint}
                          </code>
                        </div>
                        <Button
                          size="sm"
                          className="bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600"
                        >
                          <Play className="w-4 h-4 mr-2" />
                          Try It
                        </Button>
                      </div>

                      <p className="text-slate-300 mb-4">
                        {endpoint.description}
                      </p>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                          <h4 className="text-sm font-semibold text-cyan-400 mb-2">
                            Parameters:
                          </h4>
                          <div className="space-y-1">
                            {endpoint.parameters.map((param, idx) => (
                              <Badge
                                key={idx}
                                variant="outline"
                                className="border-slate-600 text-slate-300 mr-2 mb-1"
                              >
                                {param}
                              </Badge>
                            ))}
                          </div>
                        </div>
                        <div>
                          <h4 className="text-sm font-semibold text-cyan-400 mb-2">
                            Response:
                          </h4>
                          <p className="text-slate-400 text-sm">
                            {endpoint.response}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Guides Tab */}
            <TabsContent value="guides">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {guides.map((guide, index) => (
                  <Card
                    key={index}
                    className="doc-card bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 group overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/5 to-blue-500/8 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                    <CardContent className="relative z-10 p-8">
                      <div className="flex items-start justify-between mb-4">
                        <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 flex items-center justify-center">
                          <BookOpen className="w-6 h-6 text-white" />
                        </div>
                        <Badge
                          className={`${
                            guide.level === "Beginner"
                              ? "bg-emerald-600/20 text-emerald-400 border-emerald-500/30"
                              : guide.level === "Intermediate"
                              ? "bg-yellow-600/20 text-yellow-400 border-yellow-500/30"
                              : "bg-red-600/20 text-red-400 border-red-500/30"
                          }`}
                        >
                          {guide.level}
                        </Badge>
                      </div>

                      <h3 className="text-xl font-bold text-white mb-2 group-hover:text-cyan-100 transition-colors duration-300">
                        {guide.title}
                      </h3>

                      <p className="text-slate-300 mb-4 leading-relaxed">
                        {guide.description}
                      </p>

                      <div className="flex items-center gap-4 text-sm text-slate-400 mb-4">
                        <span>{guide.duration}</span>
                        <span>•</span>
                        <span>{guide.topics.length} topics</span>
                      </div>

                      <div className="flex flex-wrap gap-1 mb-6">
                        {guide.topics.slice(0, 2).map((topic, idx) => (
                          <Badge
                            key={idx}
                            variant="outline"
                            className="border-cyan-500/30 text-cyan-400 text-xs"
                          >
                            {topic}
                          </Badge>
                        ))}
                        {guide.topics.length > 2 && (
                          <Badge
                            variant="outline"
                            className="border-slate-600 text-slate-400 text-xs"
                          >
                            +{guide.topics.length - 2} more
                          </Badge>
                        )}
                      </div>

                      <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white group/btn">
                        Start Reading
                        <ExternalLink className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform duration-300" />
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* Code Examples Tab */}
            <TabsContent value="examples">
              <div className="space-y-8">
                {codeExamples.map((example, index) => (
                  <Card
                    key={index}
                    className="doc-card bg-slate-800/90 backdrop-blur-xl border border-slate-700/50"
                  >
                    <CardHeader className="flex flex-row items-center justify-between">
                      <CardTitle className="text-white flex items-center gap-2">
                        <Code className="w-5 h-5 text-cyan-400" />
                        {example.title}
                      </CardTitle>
                      <div className="flex gap-2">
                        <Badge className="bg-slate-700 text-slate-300">
                          {example.language}
                        </Badge>
                        <Button
                          size="sm"
                          onClick={() => copyToClipboard(example.code, index)}
                          className="bg-slate-700 hover:bg-slate-600 text-white"
                        >
                          {copiedCode === index ? (
                            <CheckCircle className="w-4 h-4" />
                          ) : (
                            <Copy className="w-4 h-4" />
                          )}
                        </Button>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="bg-slate-900/80 rounded-lg p-6 overflow-x-auto">
                        <pre className="text-sm text-slate-300 font-mono whitespace-pre-wrap">
                          <code>{example.code}</code>
                        </pre>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            {/* SDKs Tab */}
            <TabsContent value="sdks">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    name: "Python SDK",
                    version: "v2.1.0",
                    icon: "🐍",
                    downloads: "15K+",
                  },
                  {
                    name: "JavaScript SDK",
                    version: "v1.8.2",
                    icon: "📦",
                    downloads: "8K+",
                  },
                  {
                    name: "R Package",
                    version: "v1.3.1",
                    icon: "📊",
                    downloads: "5K+",
                  },
                ].map((sdk, index) => (
                  <Card
                    key={index}
                    className="doc-card bg-slate-800/90 backdrop-blur-xl border border-slate-700/50 hover:border-cyan-500/50 transition-all duration-500 group"
                  >
                    <CardContent className="p-8 text-center">
                      <div className="text-4xl mb-4">{sdk.icon}</div>
                      <h3 className="text-xl font-bold text-white mb-2">
                        {sdk.name}
                      </h3>
                      <p className="text-cyan-400 mb-2">{sdk.version}</p>
                      <p className="text-slate-400 text-sm mb-6">
                        {sdk.downloads} downloads
                      </p>
                      <div className="space-y-2">
                        <Button className="w-full bg-gradient-to-r from-cyan-600 to-blue-700 hover:from-cyan-500 hover:to-blue-600 text-white">
                          <Download className="w-4 h-4 mr-2" />
                          Install
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full border-slate-600 text-slate-300 hover:bg-slate-700/50"
                        >
                          <BookOpen className="w-4 h-4 mr-2" />
                          Documentation
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default Documentation;
