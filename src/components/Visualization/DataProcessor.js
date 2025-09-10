// DataProcessor.js - Fixed version with proper error handling and data validation

class DataProcessor {
  constructor() {
    this.supportedFormats = ["csv", "json", "xlsx", "xls", "tsv", "xml", "txt"];
  }

  async processFile(file) {
    try {
      console.log(
        "Processing file:",
        file.name,
        "Size:",
        file.size,
        "Type:",
        file.type
      );

      // Validate file
      if (!file) {
        throw new Error("No file provided");
      }

      if (file.size === 0) {
        throw new Error("File is empty");
      }

      if (file.size > 50 * 1024 * 1024) {
        // 50MB limit
        throw new Error("File is too large. Maximum size is 50MB");
      }

      // Determine file type
      const fileExtension = this.getFileExtension(file.name);
      if (!this.supportedFormats.includes(fileExtension)) {
        throw new Error(`Unsupported file format: ${fileExtension}`);
      }

      // Read file content
      const fileContent = await this.readFile(file);

      // Parse based on file type
      let rawData;
      switch (fileExtension) {
        case "csv":
        case "tsv":
          rawData = this.parseCSV(
            fileContent,
            fileExtension === "tsv" ? "\t" : ","
          );
          break;
        case "json":
          rawData = this.parseJSON(fileContent);
          break;
        case "xlsx":
        case "xls":
          rawData = await this.parseExcel(file);
          break;
        case "xml":
          rawData = this.parseXML(fileContent);
          break;
        case "txt":
          rawData = this.parseTXT(fileContent);
          break;
        default:
          throw new Error(`Parser not implemented for ${fileExtension}`);
      }

      // Validate parsed data
      if (!rawData || rawData.length === 0) {
        throw new Error("No data found in file or file format is invalid");
      }

      console.log("Raw data parsed successfully:", rawData.length, "records");

      // Process and analyze data
      const processedData = this.preprocessData(rawData);
      const analysis = this.analyzeData(processedData);

      return {
        rawData,
        processedData,
        analysis,
      };
    } catch (error) {
      console.error("File processing error:", error);
      throw new Error(`Failed to process file: ${error.message}`);
    }
  }

  getFileExtension(filename) {
    return filename.toLowerCase().split(".").pop();
  }

  async readFile(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onload = (event) => {
        resolve(event.target.result);
      };

      reader.onerror = (error) => {
        reject(new Error("Failed to read file: " + error.message));
      };

      // Read as text for most formats
      if (
        file.name.toLowerCase().endsWith(".xlsx") ||
        file.name.toLowerCase().endsWith(".xls")
      ) {
        reader.readAsArrayBuffer(file);
      } else {
        reader.readAsText(file, "UTF-8");
      }
    });
  }

  parseCSV(content, delimiter = ",") {
    try {
      if (!content || content.trim().length === 0) {
        throw new Error("CSV file is empty");
      }

      const lines = content
        .split("\n")
        .filter((line) => line.trim().length > 0);

      if (lines.length === 0) {
        throw new Error("No valid lines found in CSV");
      }

      // Parse header
      const headers = this.parseCSVLine(lines[0], delimiter);

      if (headers.length === 0) {
        throw new Error("No headers found in CSV");
      }

      console.log("CSV Headers:", headers);

      const data = [];

      // Parse data rows
      for (let i = 1; i < lines.length; i++) {
        try {
          const values = this.parseCSVLine(lines[i], delimiter);

          if (values.length === 0) continue; // Skip empty rows

          const row = {};
          headers.forEach((header, index) => {
            row[header] = values[index] || null;
          });

          data.push(row);
        } catch (error) {
          console.warn(`Error parsing row ${i + 1}:`, error);
          // Continue processing other rows
        }
      }

      if (data.length === 0) {
        throw new Error("No valid data rows found in CSV");
      }

      console.log("CSV parsed successfully:", data.length, "rows");
      return data;
    } catch (error) {
      throw new Error(`CSV parsing failed: ${error.message}`);
    }
  }

  parseCSVLine(line, delimiter) {
    const result = [];
    let current = "";
    let inQuotes = false;
    let i = 0;

    while (i < line.length) {
      const char = line[i];
      const nextChar = line[i + 1];

      if (char === '"') {
        if (inQuotes && nextChar === '"') {
          // Escaped quote
          current += '"';
          i += 2;
        } else {
          // Toggle quote state
          inQuotes = !inQuotes;
          i++;
        }
      } else if (char === delimiter && !inQuotes) {
        // Field separator
        result.push(current.trim());
        current = "";
        i++;
      } else {
        // Regular character
        current += char;
        i++;
      }
    }

    // Add the last field
    result.push(current.trim());

    return result.map((field) => {
      // Remove surrounding quotes and clean up
      if (field.startsWith('"') && field.endsWith('"')) {
        return field.slice(1, -1).replace(/""/g, '"');
      }
      return field;
    });
  }

  parseJSON(content) {
    try {
      const parsed = JSON.parse(content);

      if (Array.isArray(parsed)) {
        return parsed;
      } else if (typeof parsed === "object" && parsed !== null) {
        // If it's an object, try to find an array property
        const keys = Object.keys(parsed);
        for (const key of keys) {
          if (Array.isArray(parsed[key])) {
            return parsed[key];
          }
        }
        // If no array found, convert object to single-item array
        return [parsed];
      } else {
        throw new Error("JSON must contain an array or object");
      }
    } catch (error) {
      throw new Error(`JSON parsing failed: ${error.message}`);
    }
  }

  async parseExcel(file) {
    try {
      // Dynamic import for xlsx library
      const XLSX = await import("https://unpkg.com/xlsx@0.18.5/xlsx.mjs");

      const arrayBuffer = await this.readFile(file);
      const workbook = XLSX.read(arrayBuffer, { type: "array" });

      // Use the first sheet
      const firstSheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[firstSheetName];

      // Convert to JSON
      const data = XLSX.utils.sheet_to_json(worksheet, { defval: null });

      if (!data || data.length === 0) {
        throw new Error("No data found in Excel file");
      }

      return data;
    } catch (error) {
      throw new Error(`Excel parsing failed: ${error.message}`);
    }
  }

  parseXML(content) {
    try {
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(content, "text/xml");

      // Check for parsing errors
      const parseError = xmlDoc.querySelector("parsererror");
      if (parseError) {
        throw new Error("Invalid XML format");
      }

      // Convert XML to simple array of objects
      const data = [];
      const rootElements = xmlDoc.documentElement.children;

      for (const element of rootElements) {
        const item = {};

        // Get attributes
        for (const attr of element.attributes) {
          item[attr.name] = attr.value;
        }

        // Get child elements
        for (const child of element.children) {
          item[child.tagName] = child.textContent;
        }

        // If no children, use text content
        if (element.children.length === 0 && element.textContent.trim()) {
          item[element.tagName] = element.textContent.trim();
        }

        data.push(item);
      }

      return data;
    } catch (error) {
      throw new Error(`XML parsing failed: ${error.message}`);
    }
  }

  parseTXT(content) {
    try {
      // Try to parse as tab-separated or comma-separated
      const lines = content.split("\n").filter((line) => line.trim());

      if (lines.length === 0) {
        throw new Error("Text file is empty");
      }

      // Detect delimiter
      const firstLine = lines[0];
      let delimiter = "\t";
      if (
        firstLine.includes(",") &&
        firstLine.split(",").length > firstLine.split("\t").length
      ) {
        delimiter = ",";
      }

      return this.parseCSV(content, delimiter);
    } catch (error) {
      throw new Error(`Text file parsing failed: ${error.message}`);
    }
  }

  preprocessData(rawData) {
    try {
      if (!rawData || rawData.length === 0) {
        return [];
      }

      return rawData.map((row, index) => {
        const processedRow = {};

        Object.keys(row).forEach((key) => {
          let value = row[key];

          // Handle null/undefined values
          if (value === null || value === undefined || value === "") {
            processedRow[key] = null;
            return;
          }

          // Convert to string first
          value = String(value).trim();

          // Try to convert to number
          if (this.isNumeric(value)) {
            processedRow[key] = parseFloat(value);
          }
          // Try to convert to date
          else if (this.isDate(value)) {
            processedRow[key] = new Date(value);
          }
          // Keep as string
          else {
            processedRow[key] = value;
          }
        });

        return processedRow;
      });
    } catch (error) {
      console.error("Data preprocessing failed:", error);
      return rawData; // Return original data if preprocessing fails
    }
  }

  isNumeric(value) {
    if (typeof value === "number") return true;
    if (typeof value !== "string") return false;

    // Remove common formatting
    const cleaned = value.replace(/[,$%\s]/g, "");
    return !isNaN(cleaned) && !isNaN(parseFloat(cleaned)) && isFinite(cleaned);
  }

  isDate(value) {
    if (!value || typeof value !== "string") return false;

    // Common date patterns
    const datePatterns = [
      /^\d{4}-\d{2}-\d{2}$/, // YYYY-MM-DD
      /^\d{2}\/\d{2}\/\d{4}$/, // MM/DD/YYYY
      /^\d{2}-\d{2}-\d{4}$/, // MM-DD-YYYY
      /^\d{4}\/\d{2}\/\d{2}$/, // YYYY/MM/DD
    ];

    return (
      datePatterns.some((pattern) => pattern.test(value)) &&
      !isNaN(Date.parse(value))
    );
  }

  analyzeData(data) {
    try {
      if (!data || data.length === 0) {
        throw new Error("No data to analyze");
      }

      const analysis = {
        rowCount: data.length,
        columnCount: 0,
        columns: {},
        dataTypes: {},
        summary: {
          dataTypes: {},
          hasGeographicData: false,
          hasTimeData: false,
          hasMarineData: false,
        },
        recommendations: [],
      };

      // Get all unique column names
      const allColumns = new Set();
      data.forEach((row) => {
        Object.keys(row).forEach((col) => allColumns.add(col));
      });

      analysis.columnCount = allColumns.size;

      // Analyze each column
      allColumns.forEach((column) => {
        const columnData = this.analyzeColumn(data, column);
        analysis.columns[column] = columnData;
        analysis.dataTypes[column] = columnData.type;
      });

      // Count data types
      Object.values(analysis.dataTypes).forEach((type) => {
        analysis.summary.dataTypes[type] =
          (analysis.summary.dataTypes[type] || 0) + 1;
      });

      // Detect special data patterns
      analysis.summary.hasGeographicData = this.hasGeographicData(
        analysis.columns
      );
      analysis.summary.hasTimeData = this.hasTimeData(analysis.columns);
      analysis.summary.hasMarineData = this.hasMarineData(
        analysis.columns,
        data
      );

      // Generate recommendations
      analysis.recommendations = this.generateRecommendations(analysis);

      return analysis;
    } catch (error) {
      console.error("Data analysis failed:", error);
      throw error;
    }
  }

  analyzeColumn(data, columnName) {
    const values = data
      .map((row) => row[columnName])
      .filter((v) => v !== null && v !== undefined);

    const analysis = {
      count: values.length,
      nullCount: data.length - values.length,
      uniqueValues: new Set(values).size,
      type: "mixed",
      samples: values.slice(0, 5),
    };

    if (values.length === 0) {
      analysis.type = "empty";
      return analysis;
    }

    // Determine data type
    const numericValues = values.filter(
      (v) => typeof v === "number" || this.isNumeric(v)
    );
    const dateValues = values.filter(
      (v) => v instanceof Date || this.isDate(v)
    );

    if (numericValues.length / values.length > 0.8) {
      analysis.type = "numeric";
      const nums = numericValues.map((v) =>
        typeof v === "number" ? v : parseFloat(v)
      );
      analysis.min = Math.min(...nums);
      analysis.max = Math.max(...nums);
      analysis.mean = nums.reduce((a, b) => a + b, 0) / nums.length;
    } else if (dateValues.length / values.length > 0.8) {
      analysis.type = "date";
    } else if (this.isGeographicColumn(columnName)) {
      analysis.type = "geographic";
    } else if (this.isSpeciesColumn(columnName, values)) {
      analysis.type = "species";
    } else {
      analysis.type = "categorical";
    }

    return analysis;
  }

  isGeographicColumn(columnName) {
    const geoKeywords = ["lat", "lon", "lng", "longitude", "latitude", "coord"];
    return geoKeywords.some((keyword) =>
      columnName.toLowerCase().includes(keyword)
    );
  }

  isSpeciesColumn(columnName, values) {
    const speciesKeywords = [
      "species",
      "organism",
      "taxa",
      "scientific",
      "binomial",
    ];
    const hasSpeciesName = speciesKeywords.some((keyword) =>
      columnName.toLowerCase().includes(keyword)
    );

    // Check if values look like species names (contain spaces and capital letters)
    const speciesLikeValues = values.filter(
      (v) =>
        typeof v === "string" &&
        v.includes(" ") &&
        /^[A-Z][a-z]+ [a-z]+/.test(v)
    );

    return hasSpeciesName || speciesLikeValues.length / values.length > 0.5;
  }

  hasGeographicData(columns) {
    const columnNames = Object.keys(columns);
    const hasLat = columnNames.some((name) =>
      name.toLowerCase().includes("lat")
    );
    const hasLon = columnNames.some(
      (name) =>
        name.toLowerCase().includes("lon") || name.toLowerCase().includes("lng")
    );
    return hasLat && hasLon;
  }

  hasTimeData(columns) {
    return Object.values(columns).some((col) => col.type === "date");
  }

  hasMarineData(columns, data) {
    const marineKeywords = [
      "marine",
      "ocean",
      "sea",
      "fish",
      "species",
      "biodiversity",
      "depth",
      "salinity",
      "temperature",
      "ph",
      "oxygen",
    ];

    const columnNames = Object.keys(columns).join(" ").toLowerCase();
    const hasMarineColumns = marineKeywords.some((keyword) =>
      columnNames.includes(keyword)
    );

    // Check data content for marine-related terms
    const sampleText = data
      .slice(0, 10)
      .map((row) => Object.values(row).join(" "))
      .join(" ")
      .toLowerCase();

    const hasMarineData = marineKeywords.some((keyword) =>
      sampleText.includes(keyword)
    );

    return hasMarineColumns || hasMarineData;
  }

  generateRecommendations(analysis) {
    const recommendations = [];
    const { columns, summary } = analysis;

    const numericColumns = Object.keys(columns).filter(
      (col) => columns[col].type === "numeric"
    );
    const categoricalColumns = Object.keys(columns).filter(
      (col) =>
        columns[col].type === "categorical" || columns[col].type === "species"
    );
    const dateColumns = Object.keys(columns).filter(
      (col) => columns[col].type === "date"
    );
    const geographicColumns = Object.keys(columns).filter(
      (col) => columns[col].type === "geographic"
    );

    // Histogram for numeric data
    if (numericColumns.length > 0) {
      recommendations.push({
        type: "histogram",
        title: "Distribution Analysis",
        description: "Show the distribution of numeric values",
        columns: [numericColumns[0]],
        confidence: 0.9,
        icon: "📊",
      });
    }

    // Scatter plot for two numeric columns
    if (numericColumns.length >= 2) {
      recommendations.push({
        type: "scatter",
        title: "Correlation Analysis",
        description: "Explore relationships between numeric variables",
        columns: numericColumns.slice(0, 2),
        confidence: 0.85,
        icon: "📈",
      });
    }

    // Bar chart for categorical data
    if (categoricalColumns.length > 0) {
      const bestCategorical =
        categoricalColumns.find(
          (col) =>
            columns[col].uniqueValues < 20 && columns[col].uniqueValues > 1
        ) || categoricalColumns[0];

      recommendations.push({
        type: "bar",
        title: "Category Distribution",
        description: "Compare different categories",
        columns: [bestCategorical],
        confidence: 0.8,
        icon: "📋",
      });
    }

    // Map for geographic data
    if (summary.hasGeographicData) {
      const latCol = Object.keys(columns).find((col) =>
        col.toLowerCase().includes("lat")
      );
      const lonCol = Object.keys(columns).find(
        (col) =>
          col.toLowerCase().includes("lon") || col.toLowerCase().includes("lng")
      );

      if (latCol && lonCol) {
        recommendations.push({
          type: "map",
          title: "Geographic Distribution",
          description: "Visualize spatial patterns",
          columns: [latCol, lonCol],
          confidence: 0.95,
          icon: "🗺️",
        });
      }
    }

    // Timeline for temporal data
    if (dateColumns.length > 0 && numericColumns.length > 0) {
      recommendations.push({
        type: "timeline",
        title: "Temporal Trends",
        description: "Track changes over time",
        columns: [dateColumns[0], numericColumns[0]],
        confidence: 0.85,
        icon: "⏱️",
      });
    }

    // Biodiversity treemap for species data
    if (summary.hasMarineData && categoricalColumns.length > 0) {
      const speciesCol =
        categoricalColumns.find((col) => columns[col].type === "species") ||
        categoricalColumns[0];

      recommendations.push({
        type: "biodiversity-treemap",
        title: "Biodiversity Overview",
        description: "Hierarchical view of species diversity",
        columns: [speciesCol],
        confidence: 0.9,
        icon: "🌿",
      });
    }

    // Sort by confidence
    return recommendations.sort((a, b) => b.confidence - a.confidence);
  }
}

export default DataProcessor;
