import { useState } from "react";
import React from 'react';
import { Leaf, Calculator, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card, Form, Button, Badge, Alert } from "react-bootstrap";

function CropMaturityIndexCalculator() {
  const [inputs, setInputs] = useState({ 
    cropType: "", 
    daysAfterPlanting: "", 
    brix: "", 
    firmness: "", 
    colorIndex: "" 
  });
  const [result, setResult] = useState(null);

  const calculateMaturityIndex = () => {
    const days = parseInt(inputs.daysAfterPlanting);
    const brix = parseFloat(inputs.brix);
    const firmness = parseFloat(inputs.firmness);
    const color = parseFloat(inputs.colorIndex);

    if (isNaN(days) || isNaN(brix) || isNaN(firmness) || isNaN(color)) {
      return;
    }

    const details = [];
    let quality = "good";
    let message = "";

    // Maturity parameters for different crops
    const cropParams = {
      "tomato": { days: 75, brix: 5.0, firmness: 12 },
      "apple": { days: 150, brix: 14.0, firmness: 8 },
      "grape": { days: 120, brix: 18.0, firmness: 6 },
      "citrus": { days: 180, brix: 12.0, firmness: 10 }
    };

    const params = cropParams[inputs.cropType] || { days: 100, brix: 10.0, firmness: 10 };

    details.push(`✓ Days after planting: ${days}`);
    details.push(`✓ Brix reading: ${brix}°`);
    details.push(`✓ Firmness: ${firmness} N`);
    details.push(`✓ Color index: ${color}/10`);

    let score = 0;

    if (Math.abs(days - params.days) <= 10) {
      details.push("✓ Optimal harvest timing");
      score += 1;
    } else if (days < params.days - 10) {
      details.push("⚠ Premature - not ready for harvest");
      score -= 1;
    } else {
      details.push("⚠ Overripe - may have reduced quality");
      score -= 0.5;
    }

    if (brix >= params.brix) {
      details.push("✓ Sufficient sugar content");
      score += 1;
    } else {
      details.push("✗ Low sugar content - immature");
      score -= 1;
    }

    if (firmness >= params.firmness) {
      details.push("✓ Adequate firmness");
      score += 0.5;
    } else {
      details.push("⚠ Soft texture - may be overripe");
      score -= 0.5;
    }

    if (color >= 7) {
      details.push("✓ Good color development");
      score += 0.5;
    } else {
      details.push("⚠ Poor color development");
      score -= 0.5;
    }

    if (score >= 2.5) {
      quality = "good";
      message = `OPTIMAL MATURITY for ${inputs.cropType.charAt(0).toUpperCase() + inputs.cropType.slice(1)}`;
    } else if (score >= 1.5) {
      quality = "average";
      message = `NEAR OPTIMAL MATURITY - Harvest soon`;
    } else {
      quality = "poor";
      message = `NOT READY - Delay harvest`;
    }

    details.push(`✓ Maturity score: ${score.toFixed(1)}/3.0`);

    setResult({ quality, message, details, maturityScore: score.toFixed(1) });
  };

  const reset = () => {
    setInputs({ cropType: "", daysAfterPlanting: "", brix: "", firmness: "", colorIndex: "" });
    setResult(null);
  };

  return (
    <Card>
      <Card.Header>
        <div className="d-flex align-items-center gap-2">
          <Leaf className="text-primary" style={{ width: '20px', height: '20px' }} />
          <h5 className="mb-0">Crop Maturity Index Calculator</h5>
        </div>
        <p className="text-muted small mb-0">
          Determine optimal harvest time based on plant parameters
        </p>
      </Card.Header>
      <Card.Body>
        <div className="row g-4">
          <div className="col-md-6">
            <Form.Label htmlFor="maturity-crop-type">Crop Type</Form.Label>
            <Form.Select
              id="maturity-crop-type"
              value={inputs.cropType}
              onChange={(e) => setInputs({ ...inputs, cropType: e.target.value })}
              data-testid="select-maturity-crop-type"
            >
              <option value="">Select crop type</option>
              <option value="tomato">Tomato</option>
              <option value="apple">Apple</option>
              <option value="grape">Grape</option>
              <option value="citrus">Citrus</option>
            </Form.Select>
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="maturity-days">Days After Planting</Form.Label>
            <Form.Control
              id="maturity-days"
              type="number"
              step="1"
              min="30"
              max="365"
              placeholder="e.g., 75"
              value={inputs.daysAfterPlanting}
              onChange={(e) => setInputs({ ...inputs, daysAfterPlanting: e.target.value })}
              data-testid="input-maturity-days"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="maturity-brix">Brix Reading (if applicable)</Form.Label>
            <Form.Control
              id="maturity-brix"
              type="number"
              step="0.1"
              min="0"
              max="30"
              placeholder="e.g., 12.5"
              value={inputs.brix}
              onChange={(e) => setInputs({ ...inputs, brix: e.target.value })}
              data-testid="input-maturity-brix"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="maturity-firmness">Firmness (N)</Form.Label>
            <Form.Control
              id="maturity-firmness"
              type="number"
              step="0.1"
              min="0"
              max="50"
              placeholder="e.g., 8.5"
              value={inputs.firmness}
              onChange={(e) => setInputs({ ...inputs, firmness: e.target.value })}
              data-testid="input-maturity-firmness"
            />
          </div>

          <div className="col-md-12">
            <Form.Label htmlFor="maturity-color">Color Index (1-10)</Form.Label>
            <Form.Control
              id="maturity-color"
              type="number"
              step="0.5"
              min="1"
              max="10"
              placeholder="e.g., 7.5"
              value={inputs.colorIndex}
              onChange={(e) => setInputs({ ...inputs, colorIndex: e.target.value })}
              data-testid="input-maturity-color"
            />
          </div>
        </div>

        <div className="d-flex gap-3 mt-4">
          <Button variant="primary" onClick={calculateMaturityIndex} data-testid="button-calculate-maturity">
            Calculate Maturity
          </Button>
          <Button variant="outline-secondary" onClick={reset} data-testid="button-reset-maturity">
            Reset
          </Button>
        </div>

        {result && (
          <Alert variant={result.quality === 'good' ? 'success' : result.quality === 'average' ? 'warning' : 'danger'} className="mt-4">
            <div className="d-flex align-items-start gap-3">
              {result.quality === 'good' ? (
                <CheckCircle className="flex-shrink-0 mt-1" style={{ width: '20px', height: '20px' }} />
              ) : (
                <AlertCircle className="flex-shrink-0 mt-1" style={{ width: '20px', height: '20px' }} />
              )}
              <div className="flex-grow-1">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="fw-semibold" data-testid="text-maturity-quality">{result.message}</span>
                  <Badge bg={result.quality === 'good' ? 'success' : result.quality === 'average' ? 'warning' : 'danger'}>
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

export default CropMaturityIndexCalculator;