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
import { Copy, Play, Code2 } from "lucide-react";
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

  async searchSpecies(query, location) {
    const params = { q: query };
    if (location) params.location = location;
    
    const response = await this.client.get('/species/search', { params });
    return response.data;
  }
}

// Usage
const api = new OceanVistaClient('YOUR_API_KEY');

// Get datasets
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
    
    private function makeRequest($endpoint, $method = 'GET', $data = null) {
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
            CURLOPT_CUSTOMREQUEST => $method
        ]);
        
        if ($data && $method !== 'GET') {
            curl_setopt($ch, CURLOPT_POSTFIELDS, json_encode($data));
        }
        
        $response = curl_exec($ch);
        $httpCode = curl_getinfo($ch, CURLINFO_HTTP_CODE);
        curl_close($ch);
        
        if ($httpCode >= 400) {
            throw new Exception("API Error: HTTP $httpCode");
        }
        
        return json_decode($response, true);
    }
    
    public function getDatasets($category = null, $limit = 20) {
        $params = ['limit' => $limit];
        if ($category) {
            $params['category'] = $category;
        }
        
        $query = http_build_query($params);
        return $this->makeRequest("/datasets?$query");
    }
}

// Usage
try {
    $api = new OceanVistaAPI('YOUR_API_KEY');
    $datasets = $api->getDatasets('oceanography', 10);
    
    echo "Found " . $datasets['total'] . " datasets\\n";
    foreach ($datasets['results'] as $dataset) {
        echo "- " . $dataset['title'] . "\\n";
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}
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
try {
    $result = analyzeMarineImage(
        'YOUR_API_KEY',
        '/path/to/marine_image.jpg',
        'species_identification'
    );
    
    echo "Analysis Results:\\n";
    echo "Confidence: " . ($result['confidence'] * 100) . "%\\n";
    
    foreach ($result['predictions'] as $prediction) {
        printf("- %s: %.1f%%\\n", 
            $prediction['species'], 
            $prediction['probability'] * 100
        );
    }
} catch (Exception $e) {
    echo "Error: " . $e->getMessage() . "\\n";
}
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
                .header("Accept", "application/json")
                .GET()
                .build();
                
        HttpResponse<String> response = httpClient.send(request, 
                HttpResponse.BodyHandlers.ofString());
                
        if (response.statusCode() >= 400) {
            throw new RuntimeException("API Error: " + response.statusCode());
        }
        
        return objectMapper.readValue(response.body(), Map.class);
    }
}

// Usage
public class MarineDataApp {
    public static void main(String[] args) {
        try {
            OceanVistaClient client = new OceanVistaClient("YOUR_API_KEY");
            Map<String, Object> datasets = client.getDatasets("marine-biology", 10);
            
            System.out.println("Total datasets: " + datasets.get("total"));
            
            @SuppressWarnings("unchecked")
            List<Map<String, Object>> results = 
                    (List<Map<String, Object>>) datasets.get("results");
                    
            results.forEach(dataset -> 
                System.out.println("- " + dataset.get("title"))
            );
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}`,
      species: `import java.util.concurrent.CompletableFuture;

public class SpeciesSearchService {
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
    
    private Species mapToSpecies(Map<String, Object> data) {
        return new Species(
            (String) data.get("scientific_name"),
            (String) data.get("common_name"),
            (String) data.get("conservation_status"),
            (List<String>) data.get("habitats")
        );
    }
}

// Species model class
public class Species {
    private final String scientificName;
    private final String commonName;
    private final String conservationStatus;
    private final List<String> habitats;
    
    // Constructor and getters...
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
        
        StringBuilder body = new StringBuilder();
        body.append("--").append(boundary).append("\\r\\n");
        body.append("Content-Disposition: form-data; name=\\"image\\"; ")
            .append("filename=\\"").append(imagePath.getFileName()).append("\\"\\r\\n");
        body.append("Content-Type: image/jpeg\\r\\n\\r\\n");
        
        // Add image bytes here (simplified for example)
        
        body.append("\\r\\n--").append(boundary).append("\\r\\n");
        body.append("Content-Disposition: form-data; name=\\"analysis_type\\"\\r\\n\\r\\n");
        body.append(analysisType.getValue());
        body.append("\\r\\n--").append(boundary).append("--\\r\\n");
        
        HttpRequest request = HttpRequest.newBuilder()
                .uri(URI.create(client.getBaseUrl() + "/analyze/image"))
                .header("Authorization", "Bearer " + client.getApiKey())
                .header("Content-Type", "multipart/form-data; boundary=" + boundary)
                .POST(HttpRequest.BodyPublishers.ofString(body.toString()))
                .build();
                
        HttpResponse<String> response = client.getHttpClient()
                .send(request, HttpResponse.BodyHandlers.ofString());
                
        return client.getObjectMapper()
                .readValue(response.body(), AnalysisResult.class);
    }
}

public enum AnalysisType {
    SPECIES_IDENTIFICATION("species_identification"),
    HABITAT_ANALYSIS("habitat_analysis"),
    HEALTH_ASSESSMENT("health_assessment");
    
    private final String value;
    
    AnalysisType(String value) {
        this.value = value;
    }
    
    public String getValue() {
        return value;
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

type Dataset struct {
    ID          string    \`json:"id"\`
    Title       string    \`json:"title"\`
    Description string    \`json:"description"\`
    Category    string    \`json:"category"\`
    CreatedAt   time.Time \`json:"created_at"\`
    UpdatedAt   time.Time \`json:"updated_at"\`
}

type DatasetsResponse struct {
    Results []Dataset \`json:"results"\`
    Total   int       \`json:"total"\`
    Page    int       \`json:"page"\`
    PerPage int       \`json:"per_page"\`
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
    
    // Build query parameters
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
    req.Header.Set("Accept", "application/json")
    
    resp, err := c.HTTPClient.Do(req)
    if err != nil {
        return nil, err
    }
    defer resp.Body.Close()
    
    if resp.StatusCode >= 400 {
        return nil, fmt.Errorf("API error: %d", resp.StatusCode)
    }
    
    body, err := io.ReadAll(resp.Body)
    if err != nil {
        return nil, err
    }
    
    var datasets DatasetsResponse
    if err := json.Unmarshal(body, &datasets); err != nil {
        return nil, err
    }
    
    return &datasets, nil
}

func main() {
    client := NewOceanVistaClient("YOUR_API_KEY")
    
    datasets, err := client.GetDatasets("marine-biology", 10)
    if err != nil {
        fmt.Printf("Error: %v\\n", err)
        return
    }
    
    fmt.Printf("Found %d datasets:\\n", datasets.Total)
    for _, dataset := range datasets.Results {
        fmt.Printf("- %s (%s)\\n", dataset.Title, dataset.Category)
    }
}`,
      species: `package main

import (
    "context"
    "encoding/json"
    "fmt"
    "sync"
)

type Species struct {
    ScientificName      string   \`json:"scientific_name"\`
    CommonName         string   \`json:"common_name"\`
    ConservationStatus string   \`json:"conservation_status"\`
    Habitats          []string \`json:"habitats"\`
    Location          string   \`json:"location"\`
}

type SpeciesSearchResponse struct {
    Results []Species \`json:"results"\`
    Total   int       \`json:"total"\`
    Query   string    \`json:"query"\`
}

func (c *OceanVistaClient) SearchSpecies(ctx context.Context, query, location string) (*SpeciesSearchResponse, error) {
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
    
    if resp.StatusCode >= 400 {
        return nil, fmt.Errorf("API error: %d", resp.StatusCode)
    }
    
    var searchResult SpeciesSearchResponse
    if err := json.NewDecoder(resp.Body).Decode(&searchResult); err != nil {
        return nil, err
    }
    
    return &searchResult, nil
}

// Concurrent species search
func (c *OceanVistaClient) SearchMultipleSpecies(queries []string) map[string]*SpeciesSearchResponse {
    results := make(map[string]*SpeciesSearchResponse)
    var mu sync.Mutex
    var wg sync.WaitGroup
    
    for _, query := range queries {
        wg.Add(1)
        go func(q string) {
            defer wg.Done()
            
            ctx, cancel := context.WithTimeout(context.Background(), 10*time.Second)
            defer cancel()
            
            result, err := c.SearchSpecies(ctx, q, "")
            
            mu.Lock()
            if err != nil {
                fmt.Printf("Error searching for %s: %v\\n", q, err)
            } else {
                results[q] = result
            }
            mu.Unlock()
        }(query)
    }
    
    wg.Wait()
    return results
}

func main() {
    client := NewOceanVistaClient("YOUR_API_KEY")
    
    // Single search
    species, err := client.SearchSpecies(
        context.Background(), 
        "great white shark", 
        "pacific ocean"
    )
    if err != nil {
        fmt.Printf("Error: %v\\n", err)
        return
    }
    
    fmt.Printf("Found %d species for query '%s':\\n", species.Total, species.Query)
    for _, s := range species.Results {
        fmt.Printf("- %s (%s) - Status: %s\\n", 
            s.CommonName, s.ScientificName, s.ConservationStatus)
    }
    
    // Multiple concurrent searches
    queries := []string{"dolphin", "whale", "shark", "turtle"}
    results := client.SearchMultipleSpecies(queries)
    
    fmt.Printf("\\nConcurrent search results:\\n")
    for query, result := range results {
        fmt.Printf("%s: %d results\\n", query, result.Total)
    }
}`,
      analyze: `package main

import (
    "bytes"
    "context"
    "encoding/json"
    "fmt"
    "io"
    "mime/multipart"
    "net/http"
    "os"
    "path/filepath"
    "time"
)

type AnalysisResult struct {
    Confidence   float64      \`json:"confidence"\`
    Predictions  []Prediction \`json:"predictions"\`
    AnalysisType string       \`json:"analysis_type"\`
    ProcessedAt  time.Time    \`json:"processed_at"\`
}

type Prediction struct {
    Species     string  \`json:"species"\`
    Probability float64 \`json:"probability"\`
    BoundingBox *Box    \`json:"bounding_box,omitempty"\`
}

type Box struct {
    X      int \`json:"x"\`
    Y      int \`json:"y"\`
    Width  int \`json:"width"\`
    Height int \`json:"height"\`
}

func (c *OceanVistaClient) AnalyzeImage(ctx context.Context, imagePath, analysisType string) (*AnalysisResult, error) {
    file, err := os.Open(imagePath)
    if err != nil {
        return nil, fmt.Errorf("failed to open image: %w", err)
    }
    defer file.Close()
    
    var body bytes.Buffer
    writer := multipart.NewWriter(&body)
    
    // Add image file
    part, err := writer.CreateFormFile("image", filepath.Base(imagePath))
    if err != nil {
        return nil, err
    }
    
    if _, err := io.Copy(part, file); err != nil {
        return nil, err
    }
    
    // Add analysis type
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
    
    if resp.StatusCode >= 400 {
        return nil, fmt.Errorf("API error: %d", resp.StatusCode)
    }
    
    var result AnalysisResult
    if err := json.NewDecoder(resp.Body).Decode(&result); err != nil {
        return nil, err
    }
    
    return &result, nil
}

// Batch image analysis
func (c *OceanVistaClient) AnalyzeImageBatch(imagePaths []string, analysisType string) map[string]*AnalysisResult {
    results := make(map[string]*AnalysisResult)
    var mu sync.Mutex
    var wg sync.WaitGroup
    
    // Limit concurrent requests
    semaphore := make(chan struct{}, 3)
    
    for _, path := range imagePaths {
        wg.Add(1)
        go func(imagePath string) {
            defer wg.Done()
            
            semaphore <- struct{}{} // Acquire
            defer func() { <-semaphore }() // Release
            
            ctx, cancel := context.WithTimeout(context.Background(), 30*time.Second)
            defer cancel()
            
            result, err := c.AnalyzeImage(ctx, imagePath, analysisType)
            
            mu.Lock()
            if err != nil {
                fmt.Printf("Error analyzing %s: %v\\n", imagePath, err)
            } else {
                results[imagePath] = result
            }
            mu.Unlock()
        }(path)
    }
    
    wg.Wait()
    return results
}

func main() {
    client := NewOceanVistaClient("YOUR_API_KEY")
    
    // Single image analysis
    result, err := client.AnalyzeImage(
        context.Background(),
        "/path/to/marine_image.jpg",
        "species_identification"
    )
    if err != nil {
        fmt.Printf("Error: %v\\n", err)
        return
    }
    
    fmt.Printf("Analysis Results:\\n")
    fmt.Printf("Confidence: %.2f%%\\n", result.Confidence*100)
    fmt.Printf("Analysis Type: %s\\n", result.AnalysisType)
    
    for i, pred := range result.Predictions {
        fmt.Printf("Prediction %d: %s (%.2f%%)\\n", 
            i+1, pred.Species, pred.Probability*100)
    }
    
    // Batch analysis
    imagePaths := []string{
        "/path/to/image1.jpg",
        "/path/to/image2.jpg",
        "/path/to/image3.jpg",
    }
    
    batchResults := client.AnalyzeImageBatch(imagePaths, "species_identification")
    fmt.Printf("\\nBatch analysis completed: %d images processed\\n", len(batchResults))
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
  
  def search_species(query, location: nil)
    params = { q: query }
    params[:location] = location if location
    
    uri = URI("#{BASE_URL}/species/search")
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
    request['Accept'] = 'application/json'
    
    response = http.request(request)
    
    unless response.is_a?(Net::HTTPSuccess)
      raise "API Error: #{response.code} #{response.message}"
    end
    
    JSON.parse(response.body)
  end
end

# Usage
client = OceanVistaClient.new('YOUR_API_KEY')

begin
  datasets = client.get_datasets(category: 'marine-biology', limit: 10)
  puts "Found #{datasets['total']} datasets"
  
  datasets['results'].each do |dataset|
    puts "- #{dataset['title']} (#{dataset['category']})"
  end
  
  # Search for species
  species = client.search_species('dolphin', location: 'atlantic ocean')
  puts "\\nSpecies search results:"
  
  species['results'].each do |result|
    puts "- #{result['common_name']} (#{result['scientific_name']})"
    puts "  Status: #{result['conservation_status']}"
  end
  
rescue => e
  puts "Error: #{e.message}"
end`,
      species: `class MarineSpeciesService
  def initialize(client)
    @client = client
  end
  
  def find_endangered_species(location)
    all_species = @client.search_species('', location: location)
    
    endangered = all_species['results'].select do |species|
      %w[endangered critically_endangered vulnerable].include?(
        species['conservation_status']&.downcase
      )
    end
    
    group_by_status(endangered)
  end
  
  def species_by_habitat(habitat_type)
    species_data = @client.search_species(habitat_type)
    
    species_data['results'].group_by { |s| s['habitats'] }
  end
  
  def compare_species_populations(*species_names)
    results = {}
    
    species_names.each do |name|
      data = @client.search_species(name)
      if data['results'].any?
        species = data['results'].first
        results[name] = {
          scientific_name: species['scientific_name'],
          status: species['conservation_status'],
          population_trend: species['population_trend'],
          habitats: species['habitats']
        }
      end
    end
    
    results
  end
  
  private
  
  def group_by_status(species_list)
    species_list.group_by { |s| s['conservation_status'] }
  end
end

# Usage
client = OceanVistaClient.new('YOUR_API_KEY')
service = MarineSpeciesService.new(client)

# Find endangered species in the Pacific
endangered = service.find_endangered_species('pacific ocean')
puts "Endangered species in Pacific Ocean:"

endangered.each do |status, species_list|
  puts "\\n#{status.upcase}:"
  species_list.each do |species|
    puts "  - #{species['common_name']} (#{species['scientific_name']})"
  end
end

# Compare whale populations
whales = service.compare_species_populations(
  'blue whale',
  'humpback whale', 
  'right whale'
)

puts "\\nWhale Population Comparison:"
whales.each do |name, data|
  puts "#{name.capitalize}:"
  puts "  Scientific: #{data[:scientific_name]}"
  puts "  Status: #{data[:status]}"
  puts "  Trend: #{data[:population_trend]}"
end`,
      analyze: `require 'net/http/post/multipart'

class ImageAnalysisService
  def initialize(client)
    @client = client
  end
  
  def analyze_image(image_path, analysis_type: 'species_identification')
    uri = URI("#{@client.class::BASE_URL}/analyze/image")
    
    File.open(image_path, 'rb') do |image_file|
      request = Net::HTTP::Post::Multipart.new(
        uri.path,
        'image' => UploadIO.new(image_file, 'image/jpeg', File.basename(image_path)),
        'analysis_type' => analysis_type
      )
      
      request['Authorization'] = "Bearer #{@client.instance_variable_get(:@api_key)}"
      
      http = Net::HTTP.new(uri.host, uri.port)
      http.use_ssl = true
      
      response = http.request(request)
      
      unless response.is_a?(Net::HTTPSuccess)
        raise "Analysis failed: #{response.code} #{response.message}"
      end
      
      JSON.parse(response.body)
    end
  end
  
  def batch_analyze_images(image_paths, analysis_type: 'species_identification')
    results = {}
    threads = []
    
    image_paths.each do |path|
      threads << Thread.new(path) do |image_path|
        begin
          result = analyze_image(image_path, analysis_type: analysis_type)
          Thread.current[:result] = { image_path => result }
        rescue => e
          Thread.current[:error] = { image_path => e.message }
        end
      end
    end
    
    threads.each do |thread|
      thread.join
      results.merge!(thread[:result]) if thread[:result]
      puts "Error: #{thread[:error]}" if thread[:error]
    end
    
    results
  end
  
  def analyze_and_classify(image_path)
    result = analyze_image(image_path)
    
    classification = {
      primary_species: result['predictions'].first,
      confidence_level: categorize_confidence(result['confidence']),
      all_predictions: result['predictions'],
      analysis_metadata: {
        processed_at: result['processed_at'],
        analysis_type: result['analysis_type']
      }
    }
    
    add_species_information(classification)
  end
  
  private
  
  def categorize_confidence(confidence)
    case confidence
    when 0.9..1.0 then 'very_high'
    when 0.8..0.9 then 'high'
    when 0.6..0.8 then 'medium'
    when 0.4..0.6 then 'low'
    else 'very_low'
    end
  end
  
  def add_species_information(classification)
    primary = classification[:primary_species]
    
    if primary && primary['species']
      species_info = @client.search_species(primary['species'])
      if species_info['results'].any?
        classification[:species_details] = species_info['results'].first
      end
    end
    
    classification
  end
end

# Usage
client = OceanVistaClient.new('YOUR_API_KEY')
analyzer = ImageAnalysisService.new(client)

begin
  # Single image analysis
  result = analyzer.analyze_and_classify('/path/to/marine_image.jpg')
  
  puts "Image Analysis Results:"
  puts "Primary Species: #{result[:primary_species]['species']}"
  puts "Confidence: #{result[:confidence_level]} (#{(result[:primary_species]['probability'] * 100).round(1)}%)"
  
  if result[:species_details]
    details = result[:species_details]
    puts "\\nSpecies Information:"
    puts "Scientific Name: #{details['scientific_name']}"
    puts "Conservation Status: #{details['conservation_status']}"
    puts "Habitats: #{details['habitats'].join(', ')}"
  end
  
  # Batch analysis
  image_paths = Dir['/path/to/images/*.jpg']
  batch_results = analyzer.batch_analyze_images(image_paths)
  
  puts "\\nBatch Analysis Summary:"
  batch_results.each do |path, analysis|
    species = analysis['predictions'].first['species']
    confidence = (analysis['predictions'].first['probability'] * 100).round(1)
    puts "#{File.basename(path)}: #{species} (#{confidence}%)"
  end
  
rescue => e
  puts "Error: #{e.message}"
end`,
    },
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold mb-2">
            Code Examples & Integration
          </h2>
          <p className="text-slate-600">
            Ready-to-use code snippets in popular programming languages
          </p>
        </div>
        <div className="flex gap-2">
          <Select value={selectedEndpoint} onValueChange={setSelectedEndpoint}>
            <SelectTrigger className="w-48">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              {Object.entries(endpoints).map(([key, endpoint]) => (
                <SelectItem key={key} value={key}>
                  {endpoint.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <Tabs defaultValue="javascript" className="w-full">
        <TabsList className="grid w-full grid-cols-4 lg:grid-cols-7 bg-white shadow-sm">
          {Object.entries(codeExamples).map(([language, examples]) => (
            <TabsTrigger
              key={language}
              value={language}
              className="data-[state=active]:bg-blue-500 data-[state=active]:text-white text-xs lg:text-sm"
            >
              <span className="mr-1">{examples.icon}</span>
              {language.charAt(0).toUpperCase() + language.slice(1)}
            </TabsTrigger>
          ))}
        </TabsList>

        {Object.entries(codeExamples).map(([language, examples]) => (
          <TabsContent key={language} value={language} className="mt-6">
            <Card className="shadow-lg border-0">
              <CardHeader className="border-b bg-slate-50">
                <div className="flex items-center justify-between">
                  <CardTitle className="flex items-center gap-2">
                    <Code2 className="h-5 w-5 text-blue-500" />
                    {language.charAt(0).toUpperCase() +
                      language.slice(1)} - {endpoints[selectedEndpoint].name}
                  </CardTitle>
                  <div className="flex gap-2">
                    <Badge
                      variant="outline"
                      className={
                        endpoints[selectedEndpoint].method === "GET"
                          ? "bg-green-50 text-green-700"
                          : "bg-blue-50 text-blue-700"
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
                      className="px-3"
                    >
                      {copied ? (
                        <CheckCircle className="h-4 w-4 text-green-500" />
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
                  <pre className="p-6 text-sm overflow-x-auto bg-slate-900 text-slate-100 rounded-b-lg">
                    <code>{examples[selectedEndpoint]}</code>
                  </pre>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>

      {/* Integration Guide */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-blue-50 to-indigo-50">
        <CardHeader>
          <CardTitle>Integration Best Practices</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            <div className="space-y-3">
              <h4 className="font-semibold text-blue-700">🔐 Authentication</h4>
              <ul className="text-sm space-y-1 text-slate-600">
                <li>• Always use HTTPS in production</li>
                <li>• Store API keys securely</li>
                <li>• Implement token refresh logic</li>
                <li>• Use environment variables</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-green-700">⚡ Performance</h4>
              <ul className="text-sm space-y-1 text-slate-600">
                <li>• Implement request caching</li>
                <li>• Use connection pooling</li>
                <li>• Handle rate limits gracefully</li>
                <li>• Batch multiple requests</li>
              </ul>
            </div>
            <div className="space-y-3">
              <h4 className="font-semibold text-purple-700">
                🛡️ Error Handling
              </h4>
              <ul className="text-sm space-y-1 text-slate-600">
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
