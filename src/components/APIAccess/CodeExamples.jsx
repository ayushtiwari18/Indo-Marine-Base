import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
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
  Copy,
  Play,
  Code2,
  CheckCircle,
  Waves,
  Shield,
  Zap,
  Globe,
} from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const CodeExamples = () => {
  const [selectedEndpoint, setSelectedEndpoint] = useState("datasets");
  const [copied, setCopied] = useState(false);
  const { toast } = useToast();

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    toast({
      title: "Copied!",
      description: "Code copied to clipboard",
    });
    setTimeout(() => setCopied(false), 2000);
  };

  const endpoints = {
    datasets: {
      name: "List Datasets",
      url: "/api/v2/datasets",
      method: "GET",
    },
    species: {
      name: "Species Search",
      url: "/api/v2/species/search",
      method: "GET",
    },
    analyze: {
      name: "Image Analysis",
      url: "/api/v2/analyze/image",
      method: "POST",
    },
  };

  const codeExamples = {
    curl: {
      icon: "🌐",
      datasets: `curl -X GET "https://api.oceanvista.gov.in/v2/datasets" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json" \\
  -H "Accept: application/json"`,
      species: `curl -X GET "https://api.oceanvista.gov.in/v2/species/search?q=shark" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -H "Content-Type: application/json"`,
      analyze: `curl -X POST "https://api.oceanvista.gov.in/v2/analyze/image" \\
  -H "Authorization: Bearer YOUR_API_KEY" \\
  -F "image=@marine_sample.jpg" \\
  -F "analysis_type=species_identification"`,
    },
    javascript: {
      icon: "📜",
      datasets: `// Using fetch API
const response = await fetch('https://api.oceanvista.gov.in/v2/datasets', {
  method: 'GET',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json',
    'Accept': 'application/json'
  }
});

const data = await response.json();
console.log(data);

// Using axios
import axios from 'axios';

const client = axios.create({
  baseURL: 'https://api.oceanvista.gov.in/v2',
  headers: {
    'Authorization': 'Bearer YOUR_API_KEY',
    'Content-Type': 'application/json'
  }
});

const { data } = await client.get('/datasets');`,
      species: `const searchSpecies = async (query) => {
  try {
    const response = await fetch(\`https://api.oceanvista.gov.in/v2/species/search?q=\${query}\`, {
      headers: {
        'Authorization': 'Bearer YOUR_API_KEY',
        'Content-Type': 'application/json'
      }
    });
    
    if (!response.ok) {
      throw new Error(\`HTTP error! status: \${response.status}\`);
    }
    
    const species = await response.json();
    return species;
  } catch (error) {
    console.error('Error searching species:', error);
    throw error;
  }
};

// Usage
const sharks = await searchSpecies('shark');`,
      analyze: `const analyzeImage = async (imageFile) => {
  const formData = new FormData();
  formData.append('image', imageFile);
  formData.append('analysis_type', 'species_identification');
  
  const response = await fetch('https://api.oceanvista.gov.in/v2/analyze/image', {
    method: 'POST',
    headers: {
      'Authorization': 'Bearer YOUR_API_KEY'
    },
    body: formData
  });
  
  return await response.json();
};

// Usage with file input
const fileInput = document.getElementById('imageInput');
const result = await analyzeImage(fileInput.files[0]);`,
    },
    python: {
      icon: "🐍",
      datasets: `import requests
import json

class OceanVistaAPI:
    def __init__(self, api_key):
        self.base_url = "https://api.oceanvista.gov.in/v2"
        self.headers = {
            "Authorization": f"Bearer {api_key}",
            "Content-Type": "application/json",
            "Accept": "application/json"
        }
    
    def get_datasets(self, category=None, limit=20):
        """Fetch marine datasets"""
        params = {"limit": limit}
        if category:
            params["category"] = category
            
        response = requests.get(
            f"{self.base_url}/datasets",
            headers=self.headers,
            params=params
        )
        response.raise_for_status()
        return response.json()

# Usage
api = OceanVistaAPI("YOUR_API_KEY")
datasets = api.get_datasets(category="oceanography")
print(json.dumps(datasets, indent=2))`,
      species: `import requests
from typing import Optional, List, Dict

def search_species(api_key: str, query: str, 
                  location: Optional[str] = None) -> Dict:
    """Search for marine species"""
    url = "https://api.oceanvista.gov.in/v2/species/search"
    
    headers = {
        "Authorization": f"Bearer {api_key}",
        "Content-Type": "application/json"
    }
    
    params = {"q": query}
    if location:
        params["location"] = location
    
    response = requests.get(url, headers=headers, params=params)
    response.raise_for_status()
    
    return response.json()

# Usage
species_data = search_species(
    api_key="YOUR_API_KEY",
    query="great white shark",
    location="pacific ocean"
)

for species in species_data.get("results", []):
    print(f"Species: {species['common_name']}")
    print(f"Scientific: {species['scientific_name']}")
    print(f"Status: {species['conservation_status']}")
    print("---")`,
      analyze: `import requests
from pathlib import Path

def analyze_marine_image(api_key: str, image_path: str, 
                        analysis_type: str = "species_identification"):
    """Analyze marine life image using AI"""
    url = "https://api.oceanvista.gov.in/v2/analyze/image"
    
    headers = {
        "Authorization": f"Bearer {api_key}"
    }
    
    with open(image_path, 'rb') as image_file:
        files = {
            'image': image_file,
            'analysis_type': (None, analysis_type)
        }
        
        response = requests.post(url, headers=headers, files=files)
        response.raise_for_status()
        
        return response.json()

# Usage
result = analyze_marine_image(
    api_key="YOUR_API_KEY",
    image_path="path/to/marine_life.jpg",
    analysis_type="species_identification"
)

print(f"Confidence: {result['confidence']:.2%}")
print(f"Species: {result['predictions'][0]['species']}")
print(f"Probability: {result['predictions'][0]['probability']:.2%}")`,
    },
    nodejs: {
      icon: "💚",
      datasets: `const axios = require('axios');

class OceanVistaClient {
  constructor(apiKey) {
    this.client = axios.create({
      baseURL: 'https://api.oceanvista.gov.in/v2',
      headers: {
        'Authorization': \`Bearer \${apiKey}\`,
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
    });
  }

  async getDatasets(options = {}) {
    try {
      const response = await this.client.get('/datasets', {
        params: options
      });
      return response.data;
    } catch (error) {
      console.error('API Error:', error.response?.data || error.message);
      throw error;
    }
  }
}

// Usage
const api = new OceanVistaClient('YOUR_API_KEY');
const datasets = await api.getDatasets({
  category: 'marine-biology',
  limit: 50
});

console.log(\`Found \${datasets.total} datasets\`);`,
      species: `const express = require('express');
const { OceanVistaClient } = require('./oceanvista-client');

const app = express();
const api = new OceanVistaClient(process.env.OCEANVISTA_API_KEY);

app.get('/api/species/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const { location, limit = 10 } = req.query;
    
    const species = await api.searchSpecies(query, location);
    
    res.json({
      success: true,
      query,
      location,
      results: species.results.slice(0, limit),
      total: species.total
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
});

app.listen(3000, () => {
  console.log('Marine API server running on port 3000');
});`,
      analyze: `const multer = require('multer');
const FormData = require('form-data');
const fs = require('fs');

const upload = multer({ dest: 'uploads/' });

app.post('/analyze', upload.single('image'), async (req, res) => {
  try {
    const { analysis_type = 'species_identification' } = req.body;
    
    const formData = new FormData();
    formData.append('image', fs.createReadStream(req.file.path));
    formData.append('analysis_type', analysis_type);
    
    const response = await axios.post(
      'https://api.oceanvista.gov.in/v2/analyze/image',
      formData,
      {
        headers: {
          'Authorization': \`Bearer \${process.env.OCEANVISTA_API_KEY}\`,
          ...formData.getHeaders()
        }
      }
    );
    
    // Clean up uploaded file
    fs.unlinkSync(req.file.path);
    
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});`,
    },
    php: {
      icon: "🐘",
      datasets: `<?php

class OceanVistaAPI {
    private $baseUrl = 'https://api.oceanvista.gov.in/v2';
    private $apiKey;
    
    public function __construct($apiKey) {
        $this->apiKey = $apiKey;
    }
    
    public function getDatasets($category = null, $limit = 20) {
        $params = ['limit' => $limit];
        if ($category) {
            $params['category'] = $category;
        }
        
        $query = http_build_query($params);
        return $this->makeRequest("/datasets?$query");
    }
    
    private function makeRequest($endpoint) {
        $url = $this->baseUrl . $endpoint;
        
        $headers = [
            'Authorization: Bearer ' . $this->apiKey,
            'Content-Type: application/json',
            'Accept: application/json'
        ];
        
        $ch = curl_init();
        curl_setopt_array($ch, [
            CURLOPT_URL => $url,
            CURLOPT_RETURNTRANSFER => true,
            CURLOPT_HTTPHEADER => $headers,
        ]);
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode >= 400) {
            throw new Exception("API Error: HTTP $httpCode");
        }
        
        return json_decode($response, true);
    }
}

// Usage
$api = new OceanVistaAPI('YOUR_API_KEY');
$datasets = $api->getDatasets('oceanography', 10);
echo "Found " . $datasets['total'] . " datasets\\n";
?>`,
      species: `<?php

function searchMarineSpecies($apiKey, $query, $location = null) {
    $baseUrl = 'https://api.oceanvista.gov.in/v2/species/search';
    
    $params = ['q' => $query];
    if ($location) {
        $params['location'] = $location;
    }
    
    $url = $baseUrl . '?' . http_build_query($params);
    
    $context = stream_context_create([
        'http' => [
            'method' => 'GET',
            'header' => [
                'Authorization: Bearer ' . $apiKey,
                'Content-Type: application/json'
            ]
        ]
    ]);
    
    $response = file_get_contents($url, false, $context);
    
    if ($response === FALSE) {
        throw new Exception('Failed to fetch species data');
    }
    
    return json_decode($response, true);
}

// Usage
$species = searchMarineSpecies(
    'YOUR_API_KEY',
    'dolphin',
    'mediterranean sea'
);

echo "Species Search Results:\\n";
foreach ($species['results'] as $result) {
    printf("- %s (%s)\\n", 
        $result['common_name'], 
        $result['scientific_name']
    );
}
?>`,
      analyze: `<?php

function analyzeMarineImage($apiKey, $imagePath, $analysisType = 'species_identification') {
    $url = 'https://api.oceanvista.gov.in/v2/analyze/image';
    
    $postFields = [
        'image' => new CURLFile($imagePath),
        'analysis_type' => $analysisType
    ];
    
    $ch = curl_init();
    curl_setopt_array($ch, [
        CURLOPT_URL => $url,
        CURLOPT_POST => true,
        CURLOPT_POSTFIELDS => $postFields,
        CURLOPT_RETURNTRANSFER => true,
        CURLOPT_HTTPHEADER => [
            'Authorization: Bearer ' . $apiKey
        ]
    ]);
    
    $response = curl_exec($ch);
    $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
    curl_close($ch);
    
    if ($httpCode !== 200) {
        throw new Exception("Analysis failed with HTTP code: $httpCode");
    }
    
    return json_decode($response, true);
}

// Usage
$result = analyzeMarineImage(
    'YOUR_API_KEY',
    '/path/to/marine_image.jpg',
    'species_identification'
);

echo "Analysis Results:\\n";
echo "Confidence: " . ($result['confidence'] * 100) . "%\\n";
?>`,
    },
    java: {
      icon: "☕",
      datasets: `import java.net.http.*;
import java.net.URI;
import java.util.*;
import com.fasterxml.jackson.databind.ObjectMapper;

public class OceanVistaClient {
    private final HttpClient httpClient;
    private final String baseUrl = "https://api.oceanvista.gov.in/v2";
    private final String apiKey;
    private final ObjectMapper objectMapper;
    
    public OceanVistaClient(String apiKey) {
        this.apiKey = apiKey;
        this.httpClient = HttpClient.newHttpClient();
        this.objectMapper = new ObjectMapper();
    }
    
    public Map<String, Object> getDatasets(String category, int limit) 
            throws Exception {
        String endpoint = "/datasets";
        Map<String, String> params = new HashMap<>();
        params.put("limit", String.valueOf(limit));
        if (category != null) {
            params.put("category", category);
        }
        
        String query = params.entrySet().stream()
                .map(e -> e.getKey() + "=" + e.getValue())
                .reduce((a, b) -> a + "&" + b)
                .orElse("");
                
        URI uri = URI.create(baseUrl + endpoint + "?" + query);
        
        HttpRequest request = HttpRequest.newBuilder()
                .uri(uri)
                .header("Authorization", "Bearer " + apiKey)
                .header("Content-Type", "application/json")
                .GET()
                .build();
                
        HttpResponse<String> response = httpClient.send(request, 
                HttpResponse.BodyHandlers.ofString());
                
        return objectMapper.readValue(response.body(), Map.class);
    }
}`,
      species: `public class SpeciesSearchService {
    private final OceanVistaClient client;
    
    public SpeciesSearchService(String apiKey) {
        this.client = new OceanVistaClient(apiKey);
    }
    
    public CompletableFuture<List<Species>> searchSpeciesAsync(
            String query, String location) {
        return CompletableFuture.supplyAsync(() -> {
            try {
                String endpoint = "/species/search";
                Map<String, String> params = new HashMap<>();
                params.put("q", query);
                if (location != null) {
                    params.put("location", location);
                }
                
                Map<String, Object> response = client.makeRequest(
                    endpoint, "GET", params);
                
                @SuppressWarnings("unchecked")
                List<Map<String, Object>> results = 
                    (List<Map<String, Object>>) response.get("results");
                
                return results.stream()
                    .map(this::mapToSpecies)
                    .collect(Collectors.toList());
                    
            } catch (Exception e) {
                throw new RuntimeException("Species search failed", e);
            }
        });
    }
}`,
      analyze: `import java.nio.file.Files;
import java.nio.file.Path;

public class ImageAnalysisService {
    private final OceanVistaClient client;
    
    public ImageAnalysisService(String apiKey) {
        this.client = new OceanVistaClient(apiKey);
    }
    
    public AnalysisResult analyzeImage(Path imagePath, 
                                     AnalysisType analysisType) 
            throws Exception {
        String boundary = "----WebKitFormBoundary" + 
                         System.currentTimeMillis();
        
        byte[] imageBytes = Files.readAllBytes(imagePath);
        
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(client.getBaseUrl() + "/analyze/image"))
                .header("Authorization", "Bearer " + client.getApiKey())
                .header("Content-Type", "multipart/form-data; boundary=" + boundary)
                .POST(HttpRequest.BodyPublishers.ofString(buildMultipartBody()))
                .build();
                
        HttpResponse<String> response = client.getHttpClient()
                .send(request, HttpResponse.BodyHandlers.ofString());
                
        return client.getObjectMapper()
                .readValue(response.body(), AnalysisResult.class);
    }
}`,
    },
    go: {
      icon: "🐹",
      datasets: `package main

import (
    "encoding/json"
    "fmt"
    "io"
    "net/http"
    "net/url"
    "time"
)

type OceanVistaClient struct {
    BaseURL    string
    APIKey     string
    HTTPClient *http.Client
}

func NewOceanVistaClient(apiKey string) *OceanVistaClient {
    return &OceanVistaClient{
        BaseURL: "https://api.oceanvista.gov.in/v2",
        APIKey:  apiKey,
        HTTPClient: &http.Client{
            Timeout: 30 * time.Second,
        },
    }
}

func (c *OceanVistaClient) GetDatasets(category string, limit int) (*DatasetsResponse, error) {
    endpoint := "/datasets"
    
    params := url.Values{}
    params.Add("limit", fmt.Sprintf("%d", limit))
    if category != "" {
        params.Add("category", category)
    }
    
    fullURL := fmt.Sprintf("%s%s?%s", c.BaseURL, endpoint, params.Encode())
    
    req, err := http.NewRequest("GET", fullURL, nil)
    if err != nil {
        return nil, err
    }
    
    req.Header.Set("Authorization", "Bearer "+c.APIKey)
    req.Header.Set("Content-Type", "application/json")
    
    resp, err := c.HTTPClient.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    
    var datasets DatasetsResponse
    if err := json.NewDecoder(resp.Body).Decode(&datasets); err != nil {
        return nil, err
    }
    
    return &datasets, nil
}`,
      species: `func (c *OceanVistaClient) SearchSpecies(ctx context.Context, query, location string) (*SpeciesSearchResponse, error) {
    endpoint := "/species/search"
    
    params := url.Values{}
    params.Add("q", query)
    if location != "" {
        params.Add("location", location)
    }
    
    fullURL := fmt.Sprintf("%s%s?%s", c.BaseURL, endpoint, params.Encode())
    
    req, err := http.NewRequestWithContext(ctx, "GET", fullURL, nil)
    if err != nil {
        return nil, err
    }
    
    req.Header.Set("Authorization", "Bearer "+c.APIKey)
    req.Header.Set("Content-Type", "application/json")
    
    resp, err := c.HTTPClient.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    
    var searchResult SpeciesSearchResponse
    if err := json.NewDecoder(resp.Body).Decode(&searchResult); err != nil {
        return nil, err
    }
    
    return &searchResult, nil
}`,
      analyze: `func (c *OceanVistaClient) AnalyzeImage(ctx context.Context, imagePath, analysisType string) (*AnalysisResult, error) {
    file, err := os.Open(imagePath)
    if err != nil {
        return nil, fmt.Errorf("failed to open image: %w", err)
    }
    defer file.Close()
    
    var body bytes.Buffer
    writer := multipart.NewWriter(&body)
    
    part, err := writer.CreateFormFile("image", filepath.Base(imagePath))
    if err != nil {
        return nil, err
    }
    
    if _, err := io.Copy(part, file); err != nil {
        return nil, err
    }
    
    if err := writer.WriteField("analysis_type", analysisType); err != nil {
        return nil, err
    }
    
    writer.Close()
    
    fullURL := fmt.Sprintf("%s/analyze/image", c.BaseURL)
    req, err := http.NewRequestWithContext(ctx, "POST", fullURL, &body)
    if err != nil {
        return nil, err
    }
    
    req.Header.Set("Authorization", "Bearer "+c.APIKey)
    req.Header.Set("Content-Type", writer.FormDataContentType())
    
    resp, err := c.HTTPClient.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    
    var result AnalysisResult
    if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
        return nil, err
    }
    
    return &result, nil
}`,
    },
    ruby: {
      icon: "💎",
      datasets: `require 'net/http'
require 'json'
require 'uri'

class OceanVistaClient
  BASE_URL = 'https://api.oceanvista.gov.in/v2'
  
  def initialize(api_key)
    @api_key = api_key
  end
  
  def get_datasets(category: nil, limit: 20)
    params = { limit: limit }
    params[:category] = category if category
    
    uri = URI("#{BASE_URL}/datasets")
    uri.query = URI.encode_www_form(params)
    
    make_request(uri, Net::HTTP::Get)
  end
  
  private
  
  def make_request(uri, request_class)
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    
    request = request_class.new(uri)
    request['Authorization'] = "Bearer #{@api_key}"
    request['Content-Type'] = 'application/json'
    
    response = http.request(request)
    JSON.parse(response.body)
  end
end

# Usage
client = OceanVistaClient.new('YOUR_API_KEY')
datasets = client.get_datasets(category: 'marine-biology')`,
      species: `def find_endangered_species(location)
  all_species = @client.search_species('', location: location)
  
  endangered = all_species['results'].select do |species|
    %w[endangered critically_endangered vulnerable].include?(
      species['conservation_status']&.downcase
    )
  end
  
  group_by_status(endangered)
end

# Usage
client = OceanVistaClient.new('YOUR_API_KEY')
endangered = find_endangered_species('pacific ocean')

endangered.each do |status, species_list|
  puts "#{status.upcase}:"
  species_list.each do |species|
    puts "  - #{species['common_name']}"
  end
end`,
      analyze: `require 'net/http/post/multipart'

def analyze_image(image_path, analysis_type: 'species_identification')
  uri = URI("#{BASE_URL}/analyze/image")
  
  File.open(image_path, 'rb') do |image_file|
    request = Net::HTTP::Post::Multipart.new(
      uri.path,
      'image' => UploadIO.new(image_file, 'image/jpeg', File.basename(image_path)),
      'analysis_type' => analysis_type
    )
    
    request['Authorization'] = "Bearer #{@api_key}"
    
    http = Net::HTTP.new(uri.host, uri.port)
    http.use_ssl = true
    
    response = http.request(request)
    JSON.parse(response.body)
  end
end

# Usage
result = analyze_image('/path/to/marine_image.jpg')
puts "Confidence: #{(result['confidence'] * 100).round(1)}%"`,
    },
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2 text-slate-100 flex items-center gap-2">
            <Code2 className="h-6 w-6 text-cyan-400" />
            Code Examples & Integration
          </h2>
          <p className="text-slate-400">
            Ready-to-use code snippets in popular programming languages
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedEndpoint} onValueChange={setSelectedEndpoint}>
            <SelectTrigger className="w-48 bg-slate-700/30 border-slate-600/30 text-slate-200 focus:border-cyan-400/50 focus:ring-2 focus:ring-cyan-400/20">
              <SelectValue />
            </SelectTrigger>
            <SelectContent className="bg-slate-800 border-slate-600">
              {Object.entries(endpoints).map(([key, endpoint]) => (
                <SelectItem
                  key={key}
                  value={key}
                  className="text-slate-200 focus:bg-slate-700 focus:text-cyan-400"
                >
                  {endpoint.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="javascript" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 bg-slate-800/40 backdrop-blur-sm border border-slate-700/50 rounded-2xl p-1 shadow-xl">
          {Object.entries(codeExamples).map(([language, examples]) => (
            <TabsTrigger
              key={language}
              value={language}
              className="flex items-center space-x-1 px-2 py-2 rounded-xl transition-all duration-300 data-[state=active]:bg-gradient-to-br data-[state=active]:from-cyan-500 data-[state=active]:to-blue-500 data-[state=active]:text-white data-[state=active]:shadow-lg text-slate-400 hover:text-slate-200 hover:bg-slate-700/30 text-xs lg:text-sm"
            >
              <span className="text-sm">{examples.icon}</span>
              <span className="hidden sm:inline">
                {language.charAt(0).toUpperCase() + language.slice(1)}
              </span>
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(codeExamples).map(([language, examples]) => (
          <TabsContent key={language} value={language} className="mt-6">
            <Card className="bg-slate-800/30 backdrop-blur-sm border border-slate-700/30 shadow-2xl">
              <CardHeader className="border-b border-slate-700/30 bg-slate-800/20">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2 text-slate-100">
                    <Code2 className="h-5 w-5 text-cyan-400" />
                    {language.charAt(0).toUpperCase() +
                      language.slice(1)} - {endpoints[selectedEndpoint].name}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Badge
                      variant="outline"
                      className={
                        endpoints[selectedEndpoint].method === "GET"
                          ? "border-green-500/30 text-green-400 bg-green-500/10"
                          : "border-blue-500/30 text-blue-400 bg-blue-500/10"
                      }
                    >
                      {endpoints[selectedEndpoint].method}
                    </Badge>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        copyToClipboard(examples[selectedEndpoint])
                      }
                      className="px-3 border-cyan-500/30 text-cyan-400 hover:bg-cyan-500/10 hover:border-cyan-400"
                    >
                      {copied ? (
                        <CheckCircle className="h-4 w-4 text-green-400" />
                      ) : (
                        <Copy className="h-4 w-4" />
                      )}
                      <span className="ml-1">Copy</span>
                    </Button>
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="relative">
                  <pre className="p-6 text-sm overflow-x-auto bg-slate-900 text-slate-100 rounded-b-lg border-t border-slate-700/30 max-h-96">
                    <code>{examples[selectedEndpoint]}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Integration Guide */}
      <Card className="bg-gradient-to-br from-slate-800/50 to-cyan-900/20 backdrop-blur-sm border border-cyan-500/20 shadow-2xl">
        <CardHeader>
          <CardTitle className="text-slate-100 flex items-center gap-2">
            <Waves className="h-5 w-5 text-cyan-400" />
            Integration Best Practices
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3">
              <h4 className="font-semibold text-cyan-300 flex items-center gap-2">
                <Shield className="h-4 w-4" />
                Authentication
              </h4>
              <ul className="text-sm space-y-1 text-slate-400">
                <li>• Always use HTTPS in production</li>
                <li>• Store API keys securely</li>
                <li>• Implement token refresh logic</li>
                <li>• Use environment variables</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-green-300 flex items-center gap-2">
                <Zap className="h-4 w-4" />
                Performance
              </h4>
              <ul className="text-sm space-y-1 text-slate-400">
                <li>• Implement request caching</li>
                <li>• Use connection pooling</li>
                <li>• Handle rate limits gracefully</li>
                <li>• Batch multiple requests</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-purple-300 flex items-center gap-2">
                <Globe className="h-4 w-4" />
                Error Handling
              </h4>
              <ul className="text-sm space-y-1 text-slate-400">
                <li>• Implement retry logic</li>
                <li>• Log API errors properly</li>
                <li>• Validate responses</li>
                <li>• Handle timeouts</li>
              </ul>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
