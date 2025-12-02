import { useState } from "react";
import React from 'react';
import { Calculator, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card, Form, Button, Badge, Alert } from "react-bootstrap";

function FoodPhAnalyzer() {
  const [inputs, setInputs] = useState({ foodType: "", phValue: "" });
  const [result, setResult] = useState(null);

  const analyzePhLevel = () => {
    const phValue = parseFloat(inputs.phValue);
    
    if (isNaN(phValue) || !inputs.foodType) {
      return;
    }

    const details = [];
    let quality = "good";
    let message = "";

    details.push(`✓ Measured pH: ${phValue}`);
    
    const phRanges = {
      "meat": { min: 5.5, max: 6.5, note: "Fresh meat pH range" },
      "dairy": { min: 6.0, max: 7.0, note: "Milk products pH range" },
      "fruits": { min: 2.0, max: 6.0, note: "Fresh fruits pH range" },
      "vegetables": { min: 5.0, max: 7.0, note: "Vegetables pH range" },
      "beverages": { min: 2.5, max: 7.0, note: "Beverages pH range" }
    };

    const range = phRanges[inputs.foodType];
    if (range) {
      details.push(`✓ Expected pH range: ${range.min}-${range.max} (${range.note})`);
      
      if (phValue >= range.min && phValue <= range.max) {
        details.push("✓ pH is within normal range");
        quality = "good";
        message = `${inputs.foodType.charAt(0).toUpperCase() + inputs.foodType.slice(1)} pH is NORMAL`;
      } else {
        details.push("✗ pH is outside normal range");
        details.push("⚠ Potential spoilage or contamination risk");
        quality = "poor";
        message = `${inputs.foodType.charAt(0).toUpperCase() + inputs.foodType.slice(1)} pH is ABNORMAL`;
      }
    }

    if (phValue < 4.5) {
      details.push("✓ Low pH - Acidified food, microbial growth inhibited");
    } else if (phValue > 7.5) {
      details.push("✗ High pH - Potential bacterial growth risk");
    }

    setResult({ quality, message, details });
  };

  const reset = () => {
    setInputs({ foodType: "", phValue: "" });
    setResult(null);
  };

  return (
    <Card>
      <Card.Header>
        <div className="d-flex align-items-center gap-2">
          <Calculator className="text-primary" style={{ width: '20px', height: '20px' }} />
          <h5 className="mb-0">Food pH Analyzer</h5>
        </div>
        <p className="text-muted small mb-0">
          Analyze pH levels and assess spoilage risk in food products
        </p>
      </Card.Header>
      <Card.Body>
        <div className="row g-4">
          <div className="col-md-6">
            <Form.Label htmlFor="ph-food-type">Food Type</Form.Label>
            <Form.Select
              id="ph-food-type"
              value={inputs.foodType}
              onChange={(e) => setInputs({ ...inputs, foodType: e.target.value })}
              data-testid="select-ph-food-type"
            >
              <option value="">Select food type</option>
              <option value="meat">Meat & Poultry</option>
              <option value="dairy">Dairy Products</option>
              <option value="fruits">Fresh Fruits</option>
              <option value="vegetables">Vegetables</option>
              <option value="beverages">Beverages</option>
            </Form.Select>
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="ph-value">Measured pH Value</Form.Label>
            <Form.Control
              id="ph-value"
              type="number"
              step="0.01"
              min="0"
              max="14"
              placeholder="e.g., 6.5"
              value={inputs.phValue}
              onChange={(e) => setInputs({ ...inputs, phValue: e.target.value })}
              data-testid="input-ph-value"
            />
          </div>
        </div>

        <div className="d-flex gap-3 mt-4">
          <Button variant="primary" onClick={analyzePhLevel} data-testid="button-calculate-ph">
            Analyze pH Level
          </Button>
          <Button variant="outline-secondary" onClick={reset} data-testid="button-reset-ph">
            Reset
          </Button>
        </div>

        {result && (
          <Alert variant={result.quality === 'good' ? 'success' : 'danger'} className="mt-4">
            <div className="d-flex align-items-start gap-3">
              {result.quality === 'good' ? (
                <CheckCircle className="flex-shrink-0 mt-1" style={{ width: '20px', height: '20px' }} />
              ) : (
                <AlertCircle className="flex-shrink-0 mt-1" style={{ width: '20px', height: '20px' }} />
              )}
              <div className="flex-grow-1">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="fw-semibold" data-testid="text-ph-quality">{result.message}</span>
                  <Badge bg={result.quality === 'good' ? 'success' : 'danger'}>
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

export default FoodPhAnalyzer;