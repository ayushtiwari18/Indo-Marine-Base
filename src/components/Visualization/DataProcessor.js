import Papa from "papaparse";
import * as XLSX from "xlsx";
import {
  mean,
  median,
  mode,
  standardDeviation,
  min,
  max,
} from "simple-statistics";

class DataProcessor {
  constructor() {
    this.supportedFormats = {
      csv: this.parseCSV.bind(this),
      json: this.parseJSON.bind(this),
      xlsx: this.parseExcel.bind(this),
      xls: this.parseExcel.bind(this),
      tsv: this.parseTSV.bind(this),
      xml: this.parseXML.bind(this),
      txt: this.parseText.bind(this),
    };
  }

  async processFile(file) {
    try {
      const fileExtension = this.getFileExtension(file.name);
      const parser = this.supportedFormats[fileExtension];

      if (!parser) {
        throw new Error(`Unsupported file format: ${fileExtension}`);
      }

      // Parse the file
      const rawData = await parser(file);

      // Process and analyze the data
      const processedData = this.cleanAndProcessData(rawData);
      const analysis = this.analyzeData(processedData);

      return {
        rawData,
        processedData,
        analysis,
        fileInfo: {
          name: file.name,
          size: file.size,
          type: file.type,
          extension: fileExtension,
        },
      };
    } catch (error) {
      console.error("Error processing file:", error);
      throw error;
    }
  }

  getFileExtension(filename) {
    return filename.split(".").pop().toLowerCase();
  }

  // CSV Parser
  async parseCSV(file) {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        complete: (results) => {
          if (results.errors.length > 0) {
            reject(
              new Error("CSV parsing error: " + results.errors[0].message)
            );
          } else {
            resolve(results.data);
          }
        },
        header: true,
        skipEmptyLines: true,
        transformHeader: (header) => header.trim(),
        transform: (value) => value.trim(),
      });
    });
  }

  // JSON Parser
  async parseJSON(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const json = JSON.parse(e.target.result);
          // Convert to array of objects if needed
          const data = Array.isArray(json) ? json : [json];
          resolve(data);
        } catch (error) {
          reject(new Error("Invalid JSON format"));
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsText(file);
    });
  }

  // Excel Parser
  async parseExcel(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const data = new Uint8Array(e.target.result);
          const workbook = XLSX.read(data, { type: "array" });

          // Get first worksheet
          const firstSheetName = workbook.SheetNames[0];
          const worksheet = workbook.Sheets[firstSheetName];

          // Convert to JSON
          const jsonData = XLSX.utils.sheet_to_json(worksheet, {
            header: 1,
            defval: "",
          });

          // Convert to array of objects
          if (jsonData.length === 0) {
            reject(new Error("Empty Excel file"));
            return;
          }

          const headers = jsonData[0];
          const rows = jsonData.slice(1);
          const result = rows.map((row) => {
            let obj = {};
            headers.forEach((header, index) => {
              obj[header] = row[index] || "";
            });
            return obj;
          });

          resolve(result);
        } catch (error) {
          reject(new Error("Excel parsing error: " + error.message));
        }
      };
      reader.onerror = () => reject(new Error("Failed to read file"));
      reader.readAsArrayBuffer(file);
    });
  }

  // TSV Parser
  async parseTSV(file) {
    return new Promise((resolve, reject) => {
      Papa.parse(file, {
        complete: (results) => {
          if (results.errors.length > 0) {
            reject(
              new Error("TSV parsing error: " + results.errors[0].message)
            );
          } else {
            resolve(results.data);
          }
        },
        header: true,
        skipEmptyLines: true,
        delimiter: "\t",
      });
    });
  }

  // XML Parser (basic)
  async parseXML(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const parser = new DOMParser();
          const xmlDoc = parser.parseFromString(e.target.result, "text/xml");

          // Simple XML to JSON conversion
          const result = this.xmlToJson(xmlDoc);
          resolve([result]);
        } catch (error) {
          reject(new Error("XML parsing error: " + error.message));
        }
      };
      reader.readAsText(file);
    });
  }

  // Text Parser
  async parseText(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onload = (e) => {
        try {
          const text = e.target.result;
          const lines = text.split("\n").filter((line) => line.trim());

          // Try to detect delimiter
          const delimiters = [",", "\t", ";", "|"];
          let bestDelimiter = ",";
          let maxColumns = 0;

          delimiters.forEach((delimiter) => {
            const columns = lines[0].split(delimiter).length;
            if (columns > maxColumns) {
              maxColumns = columns;
              bestDelimiter = delimiter;
            }
          });

          // Parse as CSV with detected delimiter
          Papa.parse(text, {
            complete: (results) => {
              if (results.errors.length > 0) {
                reject(
                  new Error("Text parsing error: " + results.errors[0].message)
                );
              } else {
                resolve(results.data);
              }
            },
            header: true,
            skipEmptyLines: true,
            delimiter: bestDelimiter,
          });
        } catch (error) {
          reject(new Error("Text parsing error: " + error.message));
        }
      };
      reader.readAsText(file);
    });
  }

  // Data Cleaning and Processing
  cleanAndProcessData(rawData) {
    if (!Array.isArray(rawData) || rawData.length === 0) {
      throw new Error("No valid data found");
    }

    // Remove empty rows and clean data
    const cleanedData = rawData
      .filter(
        (row) =>
          row &&
          Object.values(row).some((value) => value !== null && value !== "")
      )
      .map((row) => {
        const cleanedRow = {};
        Object.keys(row).forEach((key) => {
          let value = row[key];

          // Convert numeric strings to numbers
          if (typeof value === "string" && value.trim() !== "") {
            const numValue = parseFloat(value);
            if (!isNaN(numValue)) {
              value = numValue;
            } else {
              value = value.trim();
            }
          }

          cleanedRow[key] = value;
        });
        return cleanedRow;
      });

    return cleanedData;
  }

  // Data Analysis
  analyzeData(data) {
    if (!data || data.length === 0) {
      throw new Error("No data to analyze");
    }

    const columns = Object.keys(data[0]);
    const analysis = {
      rowCount: data.length,
      columnCount: columns.length,
      columns: {},
      dataTypes: {},
      summary: {},
      recommendations: [],
    };

    // Analyze each column
    columns.forEach((column) => {
      const values = data
        .map((row) => row[column])
        .filter((v) => v !== null && v !== undefined && v !== "");

      if (values.length === 0) {
        analysis.columns[column] = { type: "empty", values: [] };
        return;
      }

      const numericValues = values.filter(
        (v) => typeof v === "number" && !isNaN(v)
      );
      const dateValues = values.filter((v) => this.isDate(v));
      const textValues = values.filter((v) => typeof v === "string");

      // Determine column type
      if (numericValues.length > values.length * 0.8) {
        analysis.columns[column] = this.analyzeNumericColumn(
          column,
          numericValues
        );
        analysis.dataTypes[column] = "numeric";
      } else if (dateValues.length > values.length * 0.8) {
        analysis.columns[column] = this.analyzeDateColumn(column, dateValues);
        analysis.dataTypes[column] = "date";
      } else if (this.isGeographicColumn(column, values)) {
        analysis.columns[column] = this.analyzeGeographicColumn(column, values);
        analysis.dataTypes[column] = "geographic";
      } else if (this.isMarineSpeciesColumn(column, textValues)) {
        analysis.columns[column] = this.analyzeSpeciesColumn(
          column,
          textValues
        );
        analysis.dataTypes[column] = "species";
      } else {
        analysis.columns[column] = this.analyzeCategoricalColumn(
          column,
          values
        );
        analysis.dataTypes[column] = "categorical";
      }
    });

    // Generate visualization recommendations
    analysis.recommendations =
      this.generateVisualizationRecommendations(analysis);
    analysis.summary = this.generateDataSummary(analysis);

    return analysis;
  }

  // Numeric Column Analysis
  analyzeNumericColumn(columnName, values) {
    return {
      type: "numeric",
      count: values.length,
      min: min(values),
      max: max(values),
      mean: mean(values),
      median: median(values),
      stdDev: standardDeviation(values),
      nullCount: 0,
      distribution: this.calculateDistribution(values),
    };
  }

  // Date Column Analysis
  analyzeDateColumn(columnName, values) {
    const dates = values
      .map((v) => new Date(v))
      .filter((d) => !isNaN(d.getTime()));
    return {
      type: "date",
      count: dates.length,
      minDate: new Date(Math.min(...dates)),
      maxDate: new Date(Math.max(...dates)),
      range: Math.max(...dates) - Math.min(...dates),
    };
  }

  // Geographic Column Analysis
  analyzeGeographicColumn(columnName, values) {
    const numericValues = values.filter((v) => typeof v === "number");
    return {
      type: "geographic",
      count: numericValues.length,
      min: Math.min(...numericValues),
      max: Math.max(...numericValues),
      isLatitude: this.isLatitudeColumn(columnName, numericValues),
      isLongitude: this.isLongitudeColumn(columnName, numericValues),
    };
  }

  // Species Column Analysis
  analyzeSpeciesColumn(columnName, values) {
    const uniqueSpecies = [...new Set(values)];
    return {
      type: "species",
      count: values.length,
      uniqueSpecies: uniqueSpecies.length,
      mostCommon: this.getMostCommonValues(values, 5),
      marineKeywords: this.findMarineKeywords(values),
    };
  }

  // Categorical Column Analysis
  analyzeCategoricalColumn(columnName, values) {
    const categories = [...new Set(values)];
    return {
      type: "categorical",
      count: values.length,
      uniqueValues: categories.length,
      categories: categories.slice(0, 20), // Limit to top 20
      distribution: this.getCategoryDistribution(values),
    };
  }

  // Utility Methods
  isDate(value) {
    const date = new Date(value);
    return !isNaN(date.getTime()) && typeof value === "string";
  }

  isGeographicColumn(columnName, values) {
    const name = columnName.toLowerCase();
    return (
      (name.includes("lat") ||
        name.includes("lng") ||
        name.includes("lon") ||
        name.includes("coordinate")) &&
      values.some((v) => typeof v === "number")
    );
  }

  isLatitudeColumn(columnName, values) {
    return (
      columnName.toLowerCase().includes("lat") &&
      values.every((v) => v >= -90 && v <= 90)
    );
  }

  isLongitudeColumn(columnName, values) {
    return (
      (columnName.toLowerCase().includes("lng") ||
        columnName.toLowerCase().includes("lon")) &&
      values.every((v) => v >= -180 && v <= 180)
    );
  }

  isMarineSpeciesColumn(columnName, values) {
    const name = columnName.toLowerCase();
    const marineKeywords = [
      "species",
      "fish",
      "marine",
      "scientific",
      "taxonomy",
    ];
    const hasMarineKeyword = marineKeywords.some((keyword) =>
      name.includes(keyword)
    );

    if (hasMarineKeyword) return true;

    // Check if values contain scientific names (Genus species format)
    const scientificNamePattern = /^[A-Z][a-z]+ [a-z]+/;
    return values.some((v) => scientificNamePattern.test(v));
  }

  findMarineKeywords(values) {
    const marineTerms = [
      "fish",
      "shark",
      "whale",
      "dolphin",
      "coral",
      "crab",
      "shrimp",
      "plankton",
    ];
    return marineTerms.filter((term) =>
      values.some((v) => v.toLowerCase().includes(term))
    );
  }

  getMostCommonValues(values, limit = 5) {
    const counts = {};
    values.forEach((v) => {
      counts[v] = (counts[v] || 0) + 1;
    });

    return Object.entries(counts)
      .sort((a, b) => b[1] - a[1])
      .slice(0, limit)
      .map(([value, count]) => ({ value, count }));
  }

  getCategoryDistribution(values) {
    const counts = {};
    values.forEach((v) => {
      counts[v] = (counts[v] || 0) + 1;
    });
    return counts;
  }

  calculateDistribution(values) {
    // Simple histogram calculation
    const sortedValues = [...values].sort((a, b) => a - b);
    const bins = 10;
    const binSize = (max(values) - min(values)) / bins;
    const distribution = [];

    for (let i = 0; i < bins; i++) {
      const binStart = min(values) + i * binSize;
      const binEnd = binStart + binSize;
      const count = sortedValues.filter(
        (v) => v >= binStart && v < binEnd
      ).length;
      distribution.push({ range: [binStart, binEnd], count });
    }

    return distribution;
  }

  // Visualization Recommendations
  generateVisualizationRecommendations(analysis) {
    const recommendations = [];
    const { columns, dataTypes, rowCount } = analysis;
    const columnNames = Object.keys(columns);

    // Single numeric column - Histogram
    const numericColumns = columnNames.filter(
      (col) => dataTypes[col] === "numeric"
    );
    if (numericColumns.length >= 1) {
      recommendations.push({
        type: "histogram",
        title: "Distribution Analysis",
        description: "Show the distribution of numeric values",
        columns: [numericColumns[0]],
        confidence: 0.9,
        icon: "📊",
      });
    }

    // Two numeric columns - Scatter plot
    if (numericColumns.length >= 2) {
      recommendations.push({
        type: "scatter",
        title: "Correlation Analysis",
        description: "Explore relationships between numeric variables",
        columns: numericColumns.slice(0, 2),
        confidence: 0.95,
        icon: "📈",
      });
    }

    // Geographic data - Map
    const latColumn = columnNames.find((col) =>
      this.isLatitudeColumn(col, Object.values(columns[col]))
    );
    const lonColumn = columnNames.find((col) =>
      this.isLongitudeColumn(col, Object.values(columns[col]))
    );
    if (latColumn && lonColumn) {
      recommendations.push({
        type: "map",
        title: "Geographic Distribution",
        description: "Visualize spatial distribution of your data",
        columns: [latColumn, lonColumn],
        confidence: 0.98,
        icon: "🗺️",
      });
    }

    // Categorical data - Bar chart
    const categoricalColumns = columnNames.filter(
      (col) => dataTypes[col] === "categorical"
    );
    if (
      categoricalColumns.length >= 1 &&
      columns[categoricalColumns[0]].uniqueValues < 20
    ) {
      recommendations.push({
        type: "bar",
        title: "Category Distribution",
        description: "Compare values across different categories",
        columns: [categoricalColumns[0]],
        confidence: 0.85,
        icon: "📋",
      });
    }

    // Time series data
    const dateColumns = columnNames.filter((col) => dataTypes[col] === "date");
    if (dateColumns.length >= 1 && numericColumns.length >= 1) {
      recommendations.push({
        type: "timeline",
        title: "Temporal Analysis",
        description: "Track changes over time",
        columns: [dateColumns[0], numericColumns[0]],
        confidence: 0.92,
        icon: "⏱️",
      });
    }

    // Marine biodiversity specific
    const speciesColumns = columnNames.filter(
      (col) => dataTypes[col] === "species"
    );
    if (speciesColumns.length >= 1) {
      recommendations.push({
        type: "biodiversity-treemap",
        title: "Biodiversity Treemap",
        description: "Hierarchical view of species diversity",
        columns: [speciesColumns[0]],
        confidence: 0.88,
        icon: "🌿",
      });
    }

    // Sort by confidence
    return recommendations
      .sort((a, b) => b.confidence - a.confidence)
      .slice(0, 5);
  }

  generateDataSummary(analysis) {
    const { rowCount, columnCount, dataTypes } = analysis;

    const typeCount = Object.values(dataTypes).reduce((acc, type) => {
      acc[type] = (acc[type] || 0) + 1;
      return acc;
    }, {});

    return {
      totalRows: rowCount,
      totalColumns: columnCount,
      dataTypes: typeCount,
      hasGeographicData: "geographic" in typeCount,
      hasTimeData: "date" in typeCount,
      hasMarineData: "species" in typeCount,
    };
  }

  // Simple XML to JSON converter
  xmlToJson(xml) {
   let obj = {};

    if (xml.nodeType === 1) {
      if (xml.attributes.length > 0) {
        obj["@attributes"] = {};
        for (let j = 0; j < xml.attributes.length; j++) {
          const attribute = xml.attributes.item(j);
          obj["@attributes"][attribute.nodeName] = attribute.nodeValue;
        }
      }
    } else if (xml.nodeType === 3) {
      obj = xml.nodeValue;
    }

    if (xml.hasChildNodes()) {
      for (let i = 0; i < xml.childNodes.length; i++) {
        const item = xml.childNodes.item(i);
        const nodeName = item.nodeName;
        if (typeof obj[nodeName] === "undefined") {
          obj[nodeName] = this.xmlToJson(item);
        } else {
          if (typeof obj[nodeName].push === "undefined") {
            const old = obj[nodeName];
            obj[nodeName] = [];
            obj[nodeName].push(old);
          }
          obj[nodeName].push(this.xmlToJson(item));
        }
      }
    }

    return obj;
  }
}

export default DataProcessor;
