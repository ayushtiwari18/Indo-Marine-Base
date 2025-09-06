import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Download,
  Github,
  Package,
  Star,
  ExternalLink,
  Code,
  BookOpen,
  Zap,
  Shield,
  Users,
  CheckCircle,
  AlertTriangle,
  Copy,
} from "lucide-react";

export const SDKDownloads = () => {
  const [copiedInstall, setCopiedInstall] = useState("");

  const copyInstallCommand = (command, sdkId) => {
    navigator.clipboard.writeText(command);
    setCopiedInstall(sdkId);
    setTimeout(() => setCopiedInstall(""), 2000);
  };

  const sdks = [
    {
      id: "python",
      name: "Python SDK",
      icon: "🐍",
      version: "2.1.4",
      description:
        "Official Python client library with async support and type hints",
      popularity: "Most Popular",
      downloads: "25.4K",
      stars: 1247,
      language: "Python",
      installation: {
        pip: "pip install oceanvista-python",
        conda: "conda install -c oceanvista oceanvista-python",
        poetry: "poetry add oceanvista-python",
      },
      features: [
        "Async/await support",
        "Type hints & annotations",
        "Automatic retry logic",
        "Built-in caching",
        "Pandas integration",
        "Jupyter notebook support",
        "Progress bars for uploads",
        "Error handling utilities",
      ],
      requirements: "Python 3.8+",
      size: "2.4 MB",
      lastUpdated: "2024-12-10",
      examples: {
        quickStart: `from oceanvista import OceanVistaClient

# Initialize client
client = OceanVistaClient(api_key="your_api_key")

# Search for species
dolphins = await client.species.search("dolphin")
print(f"Found {len(dolphins)} dolphin species")

# Analyze an image
result = await client.analyze.image("whale.jpg", "species_identification")
print(f"Identified: {result.top_prediction.species}")`,
        advanced: `import asyncio
from oceanvista import OceanVistaClient
from oceanvista.types import AnalysisType, DatasetCategory

async def marine_research_pipeline():
    client = OceanVistaClient(
        api_key="your_api_key",
        timeout=30,
        retry_attempts=3
    )
    
    # Batch process multiple images
    image_paths = ["whale1.jpg", "whale2.jpg", "whale3.jpg"]
    results = await client.analyze.batch_images(
        image_paths, 
        analysis_type=AnalysisType.SPECIES_IDENTIFICATION,
        confidence_threshold=0.8
    )
    
    # Get oceanography datasets
    datasets = await client.datasets.list(
        category=DatasetCategory.OCEANOGRAPHY,
        location="Pacific Ocean",
        limit=50
    )
    
    # Download dataset
    for dataset in datasets:
        if dataset.size_gb < 1.0:  # Only small datasets
            await client.datasets.download(
                dataset.id, 
                path=f"./data/{dataset.title}.csv"
            )
    
    await client.close()

# Run the pipeline
asyncio.run(marine_research_pipeline())`,
      },
    },
    {
      id: "javascript",
      name: "JavaScript SDK",
      icon: "📜",
      version: "2.1.2",
      description:
        "Modern JavaScript/TypeScript SDK for browser and Node.js environments",
      popularity: "Trending",
      downloads: "18.9K",
      stars: 892,
      language: "JavaScript/TypeScript",
      installation: {
        npm: "npm install @oceanvista/sdk",
        yarn: "yarn add @oceanvista/sdk",
        pnpm: "pnpm add @oceanvista/sdk",
      },
      features: [
        "TypeScript definitions included",
        "Browser & Node.js support",
        "Promise & async/await",
        "Request/response interceptors",
        "Automatic JSON parsing",
        "File upload utilities",
        "React hooks (optional)",
        "Webpack/Vite compatible",
      ],
      requirements: "Node.js 16+ or modern browser",
      size: "145 KB",
      lastUpdated: "2024-12-08",
      examples: {
        quickStart: `import { OceanVistaClient } from '@oceanvista/sdk';

// Initialize client
const client = new OceanVistaClient({
  apiKey: 'your_api_key',
  baseURL: 'https://api.oceanvista.gov.in/v2'
});

// Search species
const species = await client.species.search('shark');
console.log(\`Found \${species.total} shark species\`);

// Analyze image
const formData = new FormData();
formData.append('image', fileInput.files[0]);
formData.append('analysis_type', 'species_identification');

const result = await client.analyze.image(formData);
console.log('Top prediction:', result.predictions[0]);`,
        advanced: `import { OceanVistaClient, AnalysisType } from '@oceanvista/sdk';

class MarineResearchApp {
  constructor() {
    this.client = new OceanVistaClient({
      apiKey: process.env.OCEANVISTA_API_KEY,
      timeout: 30000,
      retries: 3,
      interceptors: {
        request: (config) => {
          console.log(\`Making request to \${config.url}\`);
          return config;
        },
        response: (response) => {
          console.log(\`Response: \${response.status}\`);
          return response;
        }
      }
    });
  }

  async analyzeBatch(images) {
    const analyses = await Promise.allSettled(
      images.map(async (image) => {
        try {
          return await this.client.analyze.image(image, {
            analysisType: AnalysisType.SPECIES_IDENTIFICATION,
            confidenceThreshold: 0.7,
            returnBoundingBoxes: true
          });
        } catch (error) {
          console.error(\`Failed to analyze \${image.name}:\`, error);
          throw error;
        }
      })
    );
    
    return analyses
      .filter(result => result.status === 'fulfilled')
      .map(result => result.value);
  }

  async getMarineDatasets(region) {
    const datasets = await this.client.datasets.search({
      category: 'marine-biology',
      location: region,
      dateFrom: '2024-01-01',
      limit: 100
    });
    
    return datasets.results.filter(d => d.access_level === 'public');
  }
}

export default MarineResearchApp;`,
      },
    },
    {
      id: "r",
      name: "R Package",
      icon: "📊",
      version: "2.0.8",
      description:
        "R package for statistical analysis of marine data with ggplot2 integration",
      popularity: "Research Favorite",
      downloads: "12.3K",
      stars: 456,
      language: "R",
      installation: {
        cran: 'install.packages("oceanvista")',
        github: 'devtools::install_github("oceanvista/oceanvista-r")',
        conda: "conda install -c r r-oceanvista",
      },
      features: [
        "Native R data.frame output",
        "ggplot2 visualization helpers",
        "Statistical analysis functions",
        "Spatial data support (sf)",
        "Time series analysis tools",
        "Marine ecology utilities",
        "Integration with tidyverse",
        "Shiny app components",
      ],
      requirements: "R 4.0+",
      size: "3.8 MB",
      lastUpdated: "2024-12-05",
      examples: {
        quickStart: `library(oceanvista)
library(ggplot2)

# Set API key
ov_set_api_key("your_api_key")

# Get species data
dolphins <- ov_species_search("dolphin", location = "Pacific Ocean")
print(paste("Found", nrow(dolphins), "dolphin species"))

# Plot conservation status
ggplot(dolphins, aes(x = conservation_status)) +
  geom_bar() +
  theme_minimal() +
  labs(title = "Dolphin Species by Conservation Status")`,
        advanced: `library(oceanvista)
library(dplyr)
library(ggplot2)
library(sf)

# Marine biodiversity analysis pipeline
analyze_marine_biodiversity <- function(region, years) {
  # Get datasets for region and time period  
  datasets <- ov_datasets_search(
    category = "marine-biology",
    location = region,
    date_from = paste0(min(years), "-01-01"),
    date_to = paste0(max(years), "-12-31")
  )
  
  # Process each dataset
  biodiversity_data <- datasets %>%
    slice_head(n = 10) %>%  # Limit for demo
    pull(id) %>%
    map_dfr(~{
      data <- ov_dataset_download(.x, format = "csv")
      data$dataset_id <- .x
      data
    })
  
  # Calculate biodiversity metrics
  species_richness <- biodiversity_data %>%
    group_by(location, year) %>%
    summarise(
      species_count = n_distinct(scientific_name),
      shannon_diversity = ov_shannon_diversity(species_count),
      .groups = "drop"
    )
  
  # Create visualizations
  p1 <- ggplot(species_richness, aes(x = year, y = species_count)) +
    geom_line(aes(color = location)) +
    geom_point() +
    theme_minimal() +
    labs(
      title = "Species Richness Over Time",
      x = "Year",
      y = "Number of Species"
    )
  
  # Spatial analysis if coordinates available
  if(all(c("latitude", "longitude") %in% names(biodiversity_data))) {
    spatial_data <- biodiversity_data %>%
      st_as_sf(coords = c("longitude", "latitude"), crs = 4326)
    
    p2 <- ggplot(spatial_data) +
      geom_sf(aes(color = conservation_status)) +
      theme_void() +
      labs(title = "Spatial Distribution of Marine Species")
    
    return(list(
      data = species_richness,
      temporal_plot = p1,
      spatial_plot = p2
    ))
  }
  
  return(list(data = species_richness, plot = p1))
}

# Run analysis
results <- analyze_marine_biodiversity("Great Barrier Reef", 2020:2024)
print(results$plot)`,
      },
    },
    {
      id: "java",
      name: "Java SDK",
      icon: "☕",
      version: "2.1.0",
      description:
        "Enterprise-grade Java SDK with Spring Boot integration and reactive support",
      popularity: "Enterprise Choice",
      downloads: "8.7K",
      stars: 234,
      language: "Java",
      installation: {
        maven: `<dependency>
  <groupId>gov.in.oceanvista</groupId>
  <artifactId>oceanvista-java-sdk</artifactId>
  <version>2.1.0</version>
</dependency>`,
        gradle: 'implementation "gov.in.oceanvista:oceanvista-java-sdk:2.1.0"',
      },
      features: [
        "Spring Boot auto-configuration",
        "Reactive programming support",
        "Connection pooling",
        "Built-in retry mechanisms",
        "Jackson JSON integration",
        "Micrometer metrics support",
        "OpenAPI 3.0 client generation",
        "Enterprise security features",
      ],
      requirements: "Java 11+, Spring Boot 2.7+",
      size: "12.4 MB",
      lastUpdated: "2024-11-28",
      examples: {
        quickStart: `import gov.in.oceanvista.sdk.OceanVistaClient;
import gov.in.oceanvista.sdk.model.*;

// Initialize client
OceanVistaClient client = OceanVistaClient.builder()
    .apiKey("your_api_key")
    .baseUrl("https://api.oceanvista.gov.in/v2")
    .build();

// Search species
SpeciesSearchResponse response = client.species()
    .search("whale")
    .location("Atlantic Ocean")
    .execute();

System.out.println("Found " + response.getTotal() + " whale species");

// Analyze image
Path imagePath = Paths.get("whale.jpg");
AnalysisResult result = client.analyze()
    .image(imagePath)
    .analysisType(AnalysisType.SPECIES_IDENTIFICATION)
    .execute();

System.out.println("Top prediction: " + result.getPredictions().get(0).getSpecies());`,
        advanced: `@Service
public class MarineDataService {
    
    private final OceanVistaClient client;
    private final MeterRegistry meterRegistry;
    
    public MarineDataService(OceanVistaClient client, MeterRegistry meterRegistry) {
        this.client = client;
        this.meterRegistry = meterRegistry;
    }
    
    @Retryable(value = {Exception.class}, maxAttempts = 3)
    public CompletableFuture<List<AnalysisResult>> processBatchImages(List<Path> imagePaths) {
        Timer.Sample sample = Timer.start(meterRegistry);
        
        List<CompletableFuture<AnalysisResult>> futures = imagePaths.stream()
            .map(path -> client.analyze()
                .imageAsync(path)
                .analysisType(AnalysisType.SPECIES_IDENTIFICATION)
                .confidenceThreshold(0.8)
                .executeAsync()
                .exceptionally(throwable -> {
                    log.error("Failed to analyze image: " + path, throwable);
                    return null;
                }))
            .collect(Collectors.toList());
        
        return CompletableFuture.allOf(futures.toArray(new CompletableFuture[0]))
            .thenApply(v -> futures.stream()
                .map(CompletableFuture::join)
                .filter(Objects::nonNull)
                .collect(Collectors.toList()))
            .whenComplete((result, throwable) -> {
                sample.stop(Timer.builder("oceanvista.batch.analysis")
                    .description("Batch image analysis processing time")
                    .register(meterRegistry));
            });
    }
    
    @Cacheable("datasets")
    public Page<Dataset> getMarineDatasets(String region, Pageable pageable) {
        return client.datasets()
            .search()
            .category(DatasetCategory.MARINE_BIOLOGY)
            .location(region)
            .page(pageable.getPageNumber())
            .size(pageable.getPageSize())
            .execute();
    }
    
    @EventListener
    public void handleSpeciesDiscovery(SpeciesAnalysisEvent event) {
        if (event.getConfidence() > 0.95) {
            log.info("High confidence species identification: {}", 
                event.getSpeciesName());
            
            // Store in database, send notifications, etc.
            applicationEventPublisher.publishEvent(
                new HighConfidenceSpeciesEvent(event.getSpeciesName())
            );
        }
    }
}`,
      },
    },
    {
      id: "go",
      name: "Go SDK",
      icon: "🐹",
      version: "2.0.5",
      description:
        "High-performance Go SDK with concurrency support and minimal dependencies",
      popularity: "Performance Leader",
      downloads: "5.2K",
      stars: 189,
      language: "Go",
      installation: {
        go: "go get github.com/oceanvista/oceanvista-go",
        module: "go mod tidy",
      },
      features: [
        "Zero external dependencies",
        "Context-based cancellation",
        "Concurrent request handling",
        "Built-in rate limiting",
        "Structured logging",
        "Metrics collection",
        "HTTP/2 support",
        "Memory efficient",
      ],
      requirements: "Go 1.19+",
      size: "8.1 MB",
      lastUpdated: "2024-12-02",
      examples: {
        quickStart: `package main

import (
    "context"
    "fmt"
    "log"
    
    "github.com/oceanvista/oceanvista-go"
)

func main() {
    client := oceanvista.NewClient("your_api_key")
    
    // Search for species
    ctx := context.Background()
    species, err := client.Species.Search(ctx, &oceanvista.SpeciesSearchRequest{
        Query:    "dolphin",
        Location: "Pacific Ocean",
    })
    if err != nil {
        log.Fatal(err)
    }
    
    fmt.Printf("Found %d dolphin species\\n", len(species.Results))
    
    // Analyze image
    result, err := client.Analyze.Image(ctx, "whale.jpg", "species_identification")
    if err != nil {
        log.Fatal(err)
    }
    
    fmt.Printf("Identified: %s\\n", result.TopPrediction.Species)
}`,
        advanced: `package main

import (
    "context"
    "fmt"
    "log"
    "sync"
    "time"
    
    "github.com/oceanvista/oceanvista-go"
)

type MarineResearchPipeline struct {
    client *oceanvista.Client
    logger *log.Logger
}

func NewPipeline(apiKey string) *MarineResearchPipeline {
    return &MarineResearchPipeline{
        client: oceanvista.NewClient(apiKey),
        logger: log.New(os.Stdout, "[MARINE] ", log.LstdFlags),
    }
}

func (p *MarineResearchPipeline) ProcessBatchImages(ctx context.Context, imagePaths []string) error {
    const maxConcurrency = 5
    semaphore := make(chan struct{}, maxConcurrency)
    
    var wg sync.WaitGroup
    results := make(chan *oceanvista.AnalysisResult, len(imagePaths))
    errors := make(chan error, len(imagePaths))
    
    for _, path := range imagePaths {
        wg.Add(1)
        go func(imagePath string) {
            defer wg.Done()
            
            semaphore <- struct{}{}        // Acquire
            defer func() { <-semaphore }() // Release
            
            ctx, cancel := context.WithTimeout(ctx, 30*time.Second)
            defer cancel()
            
            result, err := p.client.Analyze.Image(ctx, imagePath, "species_identification")
            if err != nil {
                p.logger.Printf("Failed to analyze %s: %v", imagePath, err)
                errors <- err
                return
            }
            
            results <- result
            p.logger.Printf("Analyzed %s: %s (%.2f confidence)", 
                imagePath, result.TopPrediction.Species, result.Confidence)
        }(path)
    }
    
    // Close channels when done
    go func() {
        wg.Wait()
        close(results)
        close(errors)
    }()
    
    // Collect results
    var analysisResults []*oceanvista.AnalysisResult
    var analysisErrors []error
    
    for {
        select {
        case result, ok := <-results:
            if !ok {
                results = nil
            } else {
                analysisResults = append(analysisResults, result)
            }
        case err, ok := <-errors:
            if !ok {
                errors = nil
            } else {
                analysisErrors = append(analysisErrors, err)
            }
        }
        
        if results == nil && errors == nil {
            break
        }
    }
    
    p.logger.Printf("Batch analysis complete: %d successful, %d failed", 
        len(analysisResults), len(analysisErrors))
    
    return nil
}

func (p *MarineResearchPipeline) GetDatasets(ctx context.Context, region string) ([]*oceanvista.Dataset, error) {
    datasets, err := p.client.Datasets.List(ctx, &oceanvista.DatasetListRequest{
        Category: "marine-biology",
        Location: region,
        Limit:    50,
    })
    if err != nil {
        return nil, fmt.Errorf("failed to get datasets: %w", err)
    }
    
    return datasets.Results, nil
}

func main() {
    pipeline := NewPipeline("your_api_key")
    ctx := context.Background()
    
    // Process multiple images concurrently
    imagePaths := []string{"whale1.jpg", "whale2.jpg", "whale3.jpg"}
    if err := pipeline.ProcessBatchImages(ctx, imagePaths); err != nil {
        log.Fatal(err)
    }
    
    // Get marine datasets
    datasets, err := pipeline.GetDatasets(ctx, "Great Barrier Reef")
    if err != nil {
        log.Fatal(err)
    }
    
    fmt.Printf("Found %d datasets for Great Barrier Reef\\n", len(datasets))
}`,
      },
    },
    {
      id: "ruby",
      name: "Ruby Gem",
      icon: "💎",
      version: "2.0.3",
      description: "Ruby gem with Rails integration and elegant API design",
      popularity: "Developer Friendly",
      downloads: "4.1K",
      stars: 156,
      language: "Ruby",
      installation: {
        gem: "gem install oceanvista",
        bundler: "bundle add oceanvista",
        gemfile: 'gem "oceanvista", "~> 2.0"',
      },
      features: [
        "Rails integration",
        "ActiveRecord-like syntax",
        "Background job support",
        "Ruby blocks & iterators",
        "Configurable middleware",
        "Automatic pagination",
        "Error handling DSL",
        "Development console",
      ],
      requirements: "Ruby 3.0+, Rails 6.1+ (optional)",
      size: "1.2 MB",
      lastUpdated: "2024-11-25",
      examples: {
        quickStart: `require 'oceanvista'

# Configure client
OceanVista.configure do |config|
  config.api_key = 'your_api_key'
  config.base_url = 'https://api.oceanvista.gov.in/v2'
  config.timeout = 30
end

# Search for species
dolphins = OceanVista::Species.search('dolphin', location: 'Pacific Ocean')
puts "Found #{dolphins.count} dolphin species"

# Analyze image
result = OceanVista::Analysis.image('whale.jpg', type: 'species_identification')
puts "Identified: #{result.top_prediction.species}"`,
        advanced: `require 'oceanvista'

class MarineResearchService
  include OceanVista::DSL
  
  def initialize
    configure_client do |config|
      config.api_key = ENV['OCEANVISTA_API_KEY']
      config.retry_attempts = 3
      config.cache_enabled = true
      config.logger = Rails.logger if defined?(Rails)
    end
  end
  
  def batch_analyze_images(image_paths, options = {})
    results = []
    
    image_paths.each_slice(5) do |batch|
      threads = batch.map do |path|
        Thread.new do
          begin
            analysis = OceanVista::Analysis.image(path, options)
            { path: path, result: analysis, status: :success }
          rescue OceanVista::Error => e
            { path: path, error: e.message, status: :error }
          end
        end
      end
      
      batch_results = threads.map(&:value)
      results.concat(batch_results)
      
      # Log progress
      successful = batch_results.count { |r| r[:status] == :success }
      puts "Processed batch: #{successful}/#{batch.size} successful"
    end
    
    results
  end
  
  def marine_biodiversity_report(region, date_range)
    # Get datasets
    datasets = OceanVista::Dataset.where(
      category: 'marine-biology',
      location: region,
      date_range: date_range
    ).limit(20)
    
    # Process datasets
    species_data = datasets.flat_map do |dataset|
      dataset.download.lazy.map do |row|
        {
          species: row['scientific_name'],
          location: row['location'],
          date: Date.parse(row['observation_date']),
          conservation_status: row['conservation_status']
        }
      end
    end
    
    # Generate report
    {
      total_species: species_data.map { |d| d[:species] }.uniq.count,
      endangered_count: species_data.count { |d| d[:conservation_status] == 'endangered' },
      locations: species_data.map { |d| d[:location] }.uniq,
      date_range: {
        start: species_data.map { |d| d[:date] }.min,
        end: species_data.map { |d| d[:date] }.max
      }
    }
  end
  
  def schedule_analysis_job(image_path)
    OceanVista::AnalysisJob.perform_later(image_path)
  end
end

# Usage in Rails controller
class MarineDataController < ApplicationController
  def analyze
    service = MarineResearchService.new
    
    if params[:batch_mode]
      # Background processing for large batches
      image_paths = params[:images].map { |img| img.tempfile.path }
      job_id = service.schedule_analysis_job(image_paths)
      render json: { job_id: job_id, status: 'processing' }
    else
      # Immediate analysis for single image
      result = service.batch_analyze_images([params[:image].tempfile.path])
      render json: result.first
    end
  end
  
  def biodiversity_report
    service = MarineResearchService.new
    report = service.marine_biodiversity_report(
      params[:region],
      Date.parse(params[:start_date])..Date.parse(params[:end_date])
    )
    
    render json: report
  end
end`,
      },
    },
    {
      id: "php",
      name: "PHP SDK",
      icon: "🐘",
      version: "2.0.6",
      description:
        "PHP SDK with Laravel integration and modern PHP 8+ features",
      popularity: "Web Development",
      downloads: "6.8K",
      stars: 203,
      language: "PHP",
      installation: {
        composer: "composer require oceanvista/php-sdk",
        laravel:
          'php artisan vendor:publish --provider="OceanVista\\ServiceProvider"',
      },
      features: [
        "Laravel service provider",
        "PHP 8+ attributes support",
        "Guzzle HTTP client",
        "PSR-4 autoloading",
        "Queue integration",
        "Middleware pipeline",
        "Response caching",
        "Debug toolbar integration",
      ],
      requirements: "PHP 8.1+, Laravel 9+ (optional)",
      size: "892 KB",
      lastUpdated: "2024-11-20",
      examples: {
        quickStart: `<?php

require_once 'vendor/autoload.php';

use OceanVista\\Client;

// Initialize client
$client = new Client([
    'api_key' => 'your_api_key',
    'base_uri' => 'https://api.oceanvista.gov.in/v2',
    'timeout' => 30
]);

// Search for species
$dolphins = $client->species()->search('dolphin', [
    'location' => 'Pacific Ocean'
]);

echo "Found " . count($dolphins->results) . " dolphin species\\n";

// Analyze image
$result = $client->analyze()->image('whale.jpg', 'species_identification');
echo "Identified: " . $result->topPrediction->species . "\\n";`,
        advanced: `<?php

namespace App\\Services;

use OceanVista\\Client;
use OceanVista\\Exceptions\\OceanVistaException;
use Illuminate\\Support\\Facades\\Cache;
use Illuminate\\Support\\Facades\\Log;
use Illuminate\\Http\\UploadedFile;

class MarineResearchService
{
    private Client $client;
    
    public function __construct()
    {
        $this->client = new Client([
            'api_key' => config('services.oceanvista.api_key'),
            'base_uri' => config('services.oceanvista.base_uri'),
            'timeout' => 30,
            'retry' => 3,
            'middleware' => [
                'cache' => true,
                'logging' => true
            ]
        ]);
    }
    
    public function batchAnalyzeImages(array $images): array
    {
        $results = [];
        $chunks = array_chunk($images, 5); // Process in batches of 5
        
        foreach ($chunks as $chunk) {
            $promises = [];
            
            foreach ($chunk as $image) {
                $promises[] = $this->client->analyze()->imageAsync(
                    $image instanceof UploadedFile ? $image->path() : $image,
                    'species_identification'
                );
            }
            
            try {
                $batchResults = $this->client->settle($promises);
                $results = array_merge($results, $batchResults);
                
                Log::info('Processed image batch', [
                    'batch_size' => count($chunk),
                    'successful' => count(array_filter($batchResults, fn($r) => $r['status'] === 'fulfilled'))
                ]);
            } catch (OceanVistaException $e) {
                Log::error('Batch processing failed', ['error' => $e->getMessage()]);
                throw $e;
            }
        }
        
        return $results;
    }
    
    public function getMarineDatasetsSummary(string $region): array
    {
        return Cache::remember("marine_datasets_{$region}", 3600, function () use ($region) {
            $datasets = $this->client->datasets()->search([
                'category' => 'marine-biology',
                'location' => $region,
                'limit' => 100
            ]);
            
            $summary = [
                'total_datasets' => $datasets->total,
                'categories' => [],
                'date_range' => ['start' => null, 'end' => null],
                'total_size_gb' => 0
            ];
            
            foreach ($datasets->results as $dataset) {
                // Group by category
                $category = $dataset->category;
                if (!isset($summary['categories'][$category])) {
                    $summary['categories'][$category] = 0;
                }
                $summary['categories'][$category]++;
                
                // Calculate date range
                $startDate = new \\DateTime($dataset->temporal_coverage->start);
                $endDate = new \\DateTime($dataset->temporal_coverage->end);
                
                if (!$summary['date_range']['start'] || $startDate < new \\DateTime($summary['date_range']['start'])) {
                    $summary['date_range']['start'] = $startDate->format('Y-m-d');
                }
                
                if (!$summary['date_range']['end'] || $endDate > new \\DateTime($summary['date_range']['end'])) {
                    $summary['date_range']['end'] = $endDate->format('Y-m-d');
                }
                
                // Sum up sizes
                $summary['total_size_gb'] += $dataset->size_gb ?? 0;
            }
            
            return $summary;
        });
    }
}

// Laravel Controller Usage
class MarineDataController extends Controller
{
    private MarineResearchService $marineService;
    
    public function __construct(MarineResearchService $marineService)
    {
        $this->marineService = $marineService;
    }
    
    public function analyzeImages(Request $request)
    {
        $request->validate([
            'images' => 'required|array|max:20',
            'images.*' => 'image|max:10240'
        ]);
        
        try {
            $results = $this->marineService->batchAnalyzeImages($request->file('images'));
            
            return response()->json([
                'success' => true,
                'results' => $results,
                'processed_count' => count($results)
            ]);
        } catch (OceanVistaException $e) {
            return response()->json([
                'success' => false,
                'error' => $e->getMessage()
            ], 500);
        }
    }
    
    public function datasetsSummary(string $region)
    {
        $summary = $this->marineService->getMarineDatasetsSummary($region);
        
        return response()->json($summary);
    }
}`,
      },
    },
  ];

  return (
    <div className="space-y-8">
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Official SDKs & Libraries</h2>
        <p className="text-slate-600">
          Download official SDKs and start building with OceanVista API in your
          favorite programming language
        </p>
      </div>

      {/* SDK Grid */}
      <div className="grid gap-6">
        {sdks.map((sdk) => (
          <Card key={sdk.id} className="shadow-lg border-0 overflow-hidden">
            <CardHeader className="border-b bg-gradient-to-r from-slate-50 to-blue-50">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="text-3xl">{sdk.icon}</div>
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="text-xl font-bold">{sdk.name}</h3>
                      <Badge variant="outline" className="text-xs">
                        v{sdk.version}
                      </Badge>
                      <Badge className="bg-blue-500 text-xs">
                        {sdk.popularity}
                      </Badge>
                    </div>
                    <p className="text-slate-600 text-sm">{sdk.description}</p>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-center gap-4 mb-2">
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <Download className="h-4 w-4" />
                      {sdk.downloads}
                    </div>
                    <div className="flex items-center gap-1 text-sm text-slate-600">
                      <Star className="h-4 w-4" />
                      {sdk.stars}
                    </div>
                  </div>
                  <div className="text-xs text-slate-500">
                    Updated: {sdk.lastUpdated}
                  </div>
                </div>
              </div>
            </CardHeader>

            <CardContent className="p-0">
              <Tabs defaultValue="install" className="w-full">
                <TabsList className="w-full justify-start rounded-none border-b h-12">
                  <TabsTrigger value="install" className="px-6">
                    Installation
                  </TabsTrigger>
                  <TabsTrigger value="features" className="px-6">
                    Features
                  </TabsTrigger>
                  <TabsTrigger value="examples" className="px-6">
                    Examples
                  </TabsTrigger>
                  <TabsTrigger value="docs" className="px-6">
                    Documentation
                  </TabsTrigger>
                </TabsList>

                <TabsContent value="install" className="p-6">
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                      <div>
                        <h4 className="font-semibold mb-2">Requirements</h4>
                        <p className="text-sm text-slate-600">
                          {sdk.requirements}
                        </p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Package Size</h4>
                        <p className="text-sm text-slate-600">{sdk.size}</p>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-2">Language</h4>
                        <p className="text-sm text-slate-600">{sdk.language}</p>
                      </div>
                    </div>

                    <div className="space-y-3">
                      <h4 className="font-semibold">Installation Commands</h4>
                      {Object.entries(sdk.installation).map(
                        ([method, command]) => (
                          <div
                            key={method}
                            className="p-3 bg-slate-50 rounded-lg"
                          >
                            <div className="flex items-center justify-between mb-2">
                              <Badge variant="outline" className="capitalize">
                                {method}
                              </Badge>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() =>
                                  copyInstallCommand(command, sdk.id + method)
                                }
                                className="px-3"
                              >
                                {copiedInstall === sdk.id + method ? (
                                  <CheckCircle className="h-4 w-4 text-green-500" />
                                ) : (
                                  <Copy className="h-4 w-4" />
                                )}
                              </Button>
                            </div>
                            <pre className="text-sm bg-slate-900 text-slate-100 p-3 rounded overflow-x-auto">
                              <code>{command}</code>
                            </pre>
                          </div>
                        )
                      )}
                    </div>
                  </div>
                </TabsContent>

                <TabsContent value="features" className="p-6">
                  <div className="grid gap-3 md:grid-cols-2">
                    {sdk.features.map((feature, index) => (
                      <div key={index} className="flex items-center gap-2 p-2">
                        <CheckCircle className="h-4 w-4 text-green-500 flex-shrink-0" />
                        <span className="text-sm">{feature}</span>
                      </div>
                    ))}
                  </div>
                </TabsContent>

                <TabsContent value="examples" className="p-6">
                  <Tabs defaultValue="quickStart" className="w-full">
                    <TabsList className="w-full justify-start">
                      <TabsTrigger value="quickStart">Quick Start</TabsTrigger>
                      <TabsTrigger value="advanced">Advanced Usage</TabsTrigger>
                    </TabsList>

                    <TabsContent value="quickStart" className="mt-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">Quick Start Example</h4>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              copyInstallCommand(
                                sdk.examples.quickStart,
                                `${sdk.id}-quick`
                              )
                            }
                          >
                            <Copy className="h-4 w-4 mr-1" />
                            Copy
                          </Button>
                        </div>
                        <pre className="text-xs bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto">
                          <code>{sdk.examples.quickStart}</code>
                        </pre>
                      </div>
                    </TabsContent>

                    <TabsContent value="advanced" className="mt-4">
                      <div className="space-y-3">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">Advanced Example</h4>
                          <Button
                            size="sm"
                            variant="outline"
                            onClick={() =>
                              copyInstallCommand(
                                sdk.examples.advanced,
                                `${sdk.id}-advanced`
                              )
                            }
                          >
                            <Copy className="h-4 w-4 mr-1" />
                            Copy
                          </Button>
                        </div>
                        <pre className="text-xs bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto max-h-96">
                          <code>{sdk.examples.advanced}</code>
                        </pre>
                      </div>
                    </TabsContent>
                  </Tabs>
                </TabsContent>

                <TabsContent value="docs" className="p-6">
                  <div className="space-y-4">
                    <div className="grid gap-4 md:grid-cols-2">
                      <Button
                        variant="outline"
                        className="flex items-center gap-2 h-auto p-4 justify-start"
                      >
                        <BookOpen className="h-5 w-5 text-blue-500" />
                        <div className="text-left">
                          <div className="font-medium">Documentation</div>
                          <div className="text-sm text-slate-600">
                            Complete API reference
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 ml-auto" />
                      </Button>

                      <Button
                        variant="outline"
                        className="flex items-center gap-2 h-auto p-4 justify-start"
                      >
                        <Github className="h-5 w-5 text-slate-700" />
                        <div className="text-left">
                          <div className="font-medium">Source Code</div>
                          <div className="text-sm text-slate-600">
                            View on GitHub
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 ml-auto" />
                      </Button>

                      <Button
                        variant="outline"
                        className="flex items-center gap-2 h-auto p-4 justify-start"
                      >
                        <Package className="h-5 w-5 text-green-500" />
                        <div className="text-left">
                          <div className="font-medium">Package Registry</div>
                          <div className="text-sm text-slate-600">
                            View package details
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 ml-auto" />
                      </Button>

                      <Button
                        variant="outline"
                        className="flex items-center gap-2 h-auto p-4 justify-start"
                      >
                        <Users className="h-5 w-5 text-purple-500" />
                        <div className="text-left">
                          <div className="font-medium">Community</div>
                          <div className="text-sm text-slate-600">
                            Join discussions
                          </div>
                        </div>
                        <ExternalLink className="h-4 w-4 ml-auto" />
                      </Button>
                    </div>

                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <div className="flex items-center gap-2 mb-2">
                        <Zap className="h-4 w-4 text-blue-600" />
                        <span className="font-medium text-blue-800">
                          Getting Started Tips
                        </span>
                      </div>
                      <ul className="text-sm text-blue-700 space-y-1">
                        <li>• Start with the quick start example above</li>
                        <li>• Check out our comprehensive documentation</li>
                        <li>
                          • Join our community for support and discussions
                        </li>
                        <li>• Star the repository to stay updated</li>
                      </ul>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Community & Support */}
      <Card className="shadow-lg border-0 bg-gradient-to-br from-purple-50 to-blue-50">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5 text-purple-500" />
            Community & Support
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            <div className="text-center">
              <div className="text-3xl mb-2">🚀</div>
              <h4 className="font-semibold mb-2">Quick Start Guide</h4>
              <p className="text-sm text-slate-600 mb-3">
                Get up and running in minutes with our step-by-step guide
              </p>
              <Button size="sm" variant="outline">
                View Guide
              </Button>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-2">📖</div>
              <h4 className="font-semibold mb-2">API Documentation</h4>
              <p className="text-sm text-slate-600 mb-3">
                Complete reference documentation with examples
              </p>
              <Button size="sm" variant="outline">
                Read Docs
              </Button>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-2">💬</div>
              <h4 className="font-semibold mb-2">Community Forum</h4>
              <p className="text-sm text-slate-600 mb-3">
                Get help from our community of developers
              </p>
              <Button size="sm" variant="outline">
                Join Forum
              </Button>
            </div>

            <div className="text-center">
              <div className="text-3xl mb-2">🐛</div>
              <h4 className="font-semibold mb-2">Report Issues</h4>
              <p className="text-sm text-slate-600 mb-3">
                Found a bug? Report it on our GitHub repository
              </p>
              <Button size="sm" variant="outline">
                Report Bug
              </Button>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* SDK Comparison */}
      <Card className="shadow-lg border-0">
        <CardHeader>
          <CardTitle>SDK Comparison</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b">
                  <th className="text-left p-3">SDK</th>
                  <th className="text-left p-3">Version</th>
                  <th className="text-left p-3">Downloads</th>
                  <th className="text-left p-3">Size</th>
                  <th className="text-left p-3">Best For</th>
                  <th className="text-left p-3">Features</th>
                </tr>
              </thead>
              <tbody>
                {sdks.slice(0, 4).map((sdk) => (
                  <tr key={sdk.id} className="border-b hover:bg-slate-50">
                    <td className="p-3">
                      <div className="flex items-center gap-2">
                        <span className="text-lg">{sdk.icon}</span>
                        <span className="font-medium">{sdk.name}</span>
                      </div>
                    </td>
                    <td className="p-3">
                      <Badge variant="outline">v{sdk.version}</Badge>
                    </td>
                    <td className="p-3">{sdk.downloads}</td>
                    <td className="p-3">{sdk.size}</td>
                    <td className="p-3">
                      <Badge className="bg-blue-500">{sdk.popularity}</Badge>
                    </td>
                    <td className="p-3">
                      <div className="flex gap-1">
                        <Badge variant="outline" className="text-xs">
                          Async
                        </Badge>
                        <Badge variant="outline" className="text-xs">
                          Types
                        </Badge>
                        <span className="text-slate-500">
                          +{sdk.features.length - 2}
                        </span>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};
