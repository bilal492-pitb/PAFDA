import { useState } from "react";
import React from 'react';
import { Leaf, Calculator, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card, Form, Button, Badge, Alert } from "react-bootstrap";

function SoilPhAnalyzer() {
  const [inputs, setInputs] = useState({ 
    soilType: "", 
    phValue: "", 
    cropType: "", 
    depth: "" 
  });
  const [result, setResult] = useState(null);

  const analyzeSoilPh = () => {
    const ph = parseFloat(inputs.phValue);
    const depth = parseFloat(inputs.depth);

    if (isNaN(ph) || isNaN(depth)) {
      return;
    }

    const details = [];
    let quality = "good";
    let message = "";

    details.push(`✓ Soil pH: ${ph.toFixed(2)}`);
    details.push(`✓ Sample depth: ${depth} cm`);
    details.push(`✓ Soil type: ${inputs.soilType}`);

    // Optimal pH ranges for crops
    const phRanges = {
      "vegetables": { min: 6.0, max: 7.0, note: "Most vegetables prefer slightly acidic to neutral soil" },
      "fruits": { min: 5.5, max: 6.8, note: "Fruits generally prefer acidic soil" },
      "grains": { min: 6.2, max: 7.2, note: "Grains prefer neutral to slightly alkaline soil" },
      "legumes": { min: 6.0, max: 7.0, note: "Legumes prefer neutral soil" }
    };

    const range = phRanges[inputs.cropType] || { min: 6.0, max: 7.0 };

    if (ph >= range.min && ph <= range.max) {
      details.push(`✓ pH is optimal for ${inputs.cropType}`);
      details.push(range.note);
      quality = "good";
      message = `Soil pH is OPTIMAL for ${inputs.cropType}`;
    } else {
      details.push(`✗ pH is outside optimal range (${range.min}-${range.max})`);
      if (ph < range.min) {
        details.push("⚠ Soil is too acidic - consider lime application");
        message = `Soil is TOO ACIDIC for ${inputs.cropType}`;
      } else {
        details.push("⚠ Soil is too alkaline - consider sulfur application");
        message = `Soil is TOO ALKALINE for ${inputs.cropType}`;
      }
      quality = "poor";
    }

    setResult({ quality, message, details });
  };

  const reset = () => {
    setInputs({ soilType: "", phValue: "", cropType: "", depth: "" });
    setResult(null);
  };

  return (
    <Card>
      <Card.Header>
        <div className="d-flex align-items-center gap-2">
          <Leaf className="text-primary" style={{ width: '20px', height: '20px' }} />
          <h5 className="mb-0">Soil pH Analyzer</h5>
        </div>
        <p className="text-muted small mb-0">
          Analyze soil acidity and recommend amendments for optimal crop growth
        </p>
      </Card.Header>
      <Card.Body>
        <div className="row g-4">
          <div className="col-md-6">
            <Form.Label htmlFor="soil-ph-value">Soil pH Measurement</Form.Label>
            <Form.Control
              id="soil-ph-value"
              type="number"
              step="0.01"
              min="3.0"
              max="11.0"
              placeholder="e.g., 6.5"
              value={inputs.phValue}
              onChange={(e) => setInputs({ ...inputs, phValue: e.target.value })}
              data-testid="input-soil-ph-value"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="soil-type">Soil Type</Form.Label>
            <Form.Select
              id="soil-type"
              value={inputs.soilType}
              onChange={(e) => setInputs({ ...inputs, soilType: e.target.value })}
              data-testid="select-soil-type"
            >
              <option value="">Select soil type</option>
              <option value="sandy">Sandy Soil</option>
              <option value="loam">Loam Soil</option>
              <option value="clay">Clay Soil</option>
              <option value="silt">Silt Soil</option>
            </Form.Select>
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="soil-crop-type">Crop Type</Form.Label>
            <Form.Select
              id="soil-crop-type"
              value={inputs.cropType}
              onChange={(e) => setInputs({ ...inputs, cropType: e.target.value })}
              data-testid="select-soil-crop-type"
            >
              <option value="">Select crop type</option>
              <option value="vegetables">Vegetables</option>
              <option value="fruits">Fruits</option>
              <option value="grains">Grains</option>
              <option value="legumes">Legumes</option>
            </Form.Select>
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="soil-depth">Sample Depth (cm)</Form.Label>
            <Form.Control
              id="soil-depth"
              type="number"
              step="1"
              min="5"
              max="50"
              placeholder="e.g., 15"
              value={inputs.depth}
              onChange={(e) => setInputs({ ...inputs, depth: e.target.value })}
              data-testid="input-soil-depth"
            />
          </div>
        </div>

        <div className="d-flex gap-3 mt-4">
          <Button variant="primary" onClick={analyzeSoilPh} data-testid="button-calculate-soil-ph">
            Analyze Soil pH
          </Button>
          <Button variant="outline-secondary" onClick={reset} data-testid="button-reset-soil-ph">
            Reset
          </Button>
        </div>

        {result && (
          <Alert variant={result.quality === 'good' ? 'success' : 'warning'} className="mt-4">
            <div className="d-flex align-items-start gap-3">
              {result.quality === 'good' ? (
                <CheckCircle className="flex-shrink-0 mt-1" style={{ width: '20px', height: '20px' }} />
              ) : (
                <AlertCircle className="flex-shrink-0 mt-1" style={{ width: '20px', height: '20px' }} />
              )}
              <div className="flex-grow-1">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="fw-semibold" data-testid="text-soil-ph-quality">{result.message}</span>
                  <Badge bg={result.quality === 'good' ? 'success' : 'warning'}>
                    {result.quality.toUpperCase()}
                  </Badge>
                </div>
                <div className="small">
                  {result.details.map((detail, index) => (
                    <div key={index}>{detail}</div>
                  ))}
                </div>
              </div>
            </div>
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
}

export default SoilPhAnalyzer;