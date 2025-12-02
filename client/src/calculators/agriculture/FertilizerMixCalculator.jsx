import { useState } from "react";
import React from 'react';
import { Leaf, Calculator, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card, Form, Button, Badge, Alert } from "react-bootstrap";

function FertilizerMixCalculator() {
  const [inputs, setInputs] = useState({ 
    n: "", 
    p: "", 
    k: "", 
    area: "", 
    cropType: "" 
  });
  const [result, setResult] = useState(null);

  const calculateFertilizerMix = () => {
    const n = parseFloat(inputs.n);
    const p = parseFloat(inputs.p);
    const k = parseFloat(inputs.k);
    const area = parseFloat(inputs.area);

    if (isNaN(n) || isNaN(p) || isNaN(k) || isNaN(area)) {
      return;
    }

    const details = [];
    let quality = "good";
    let message = "";

    // Calculate total nutrients required
    const totalN = n * area;
    const totalP = p * area;
    const totalK = k * area;

    details.push(`✓ Recommended N-P-K ratio: ${n}-${p}-${k}`);
    details.push(`✓ Total nitrogen required: ${totalN.toFixed(2)} kg`);
    details.push(`✓ Total phosphorus (P2O5) required: ${totalP.toFixed(2)} kg`);
    details.push(`✓ Total potassium (K2O) required: ${totalK.toFixed(2)} kg`);
    details.push(`✓ For area: ${area} hectares`);

    // Suggest common fertilizer mixes
    if (inputs.cropType === "vegetables") {
      details.push("✓ Suggested application: Split into 2-3 doses");
    } else if (inputs.cropType === "grains") {
      details.push("✓ Suggested application: At planting and tillering");
    }

    if (n > 200 || p > 100 || k > 150) {
      details.push("⚠ High nutrient levels - may cause environmental impact");
      quality = "average";
      message = "High fertilizer application rate";
    } else {
      quality = "good";
      message = "Balanced fertilizer mix calculated";
    }

    setResult({ quality, message, details, nutrients: { n: totalN.toFixed(2), p: totalP.toFixed(2), k: totalK.toFixed(2) } });
  };

  const reset = () => {
    setInputs({ n: "", p: "", k: "", area: "", cropType: "" });
    setResult(null);
  };

  return (
    <Card>
      <Card.Header>
        <div className="d-flex align-items-center gap-2">
          <Leaf className="text-primary" style={{ width: '20px', height: '20px' }} />
          <h5 className="mb-0">Fertilizer Mix Ratio Calculator</h5>
        </div>
        <p className="text-muted small mb-0">
          Calculate NPK ratios and quantities for custom fertilizer mixes
        </p>
      </Card.Header>
      <Card.Body>
        <div className="row g-4">
          <div className="col-md-6">
            <Form.Label htmlFor="fertilizer-n">Nitrogen (N) kg/ha</Form.Label>
            <Form.Control
              id="fertilizer-n"
              type="number"
              step="1"
              min="0"
              max="500"
              placeholder="e.g., 120"
              value={inputs.n}
              onChange={(e) => setInputs({ ...inputs, n: e.target.value })}
              data-testid="input-fertilizer-n"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="fertilizer-p">Phosphorus (P2O5) kg/ha</Form.Label>
            <Form.Control
              id="fertilizer-p"
              type="number"
              step="1"
              min="0"
              max="300"
              placeholder="e.g., 60"
              value={inputs.p}
              onChange={(e) => setInputs({ ...inputs, p: e.target.value })}
              data-testid="input-fertilizer-p"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="fertilizer-k">Potassium (K2O) kg/ha</Form.Label>
            <Form.Control
              id="fertilizer-k"
              type="number"
              step="1"
              min="0"
              max="400"
              placeholder="e.g., 90"
              value={inputs.k}
              onChange={(e) => setInputs({ ...inputs, k: e.target.value })}
              data-testid="input-fertilizer-k"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="fertilizer-area">Field Area (hectares)</Form.Label>
            <Form.Control
              id="fertilizer-area"
              type="number"
              step="0.1"
              min="0.1"
              max="1000"
              placeholder="e.g., 5.0"
              value={inputs.area}
              onChange={(e) => setInputs({ ...inputs, area: e.target.value })}
              data-testid="input-fertilizer-area"
            />
          </div>

          <div className="col-md-12">
            <Form.Label htmlFor="fertilizer-crop-type">Crop Type</Form.Label>
            <Form.Select
              id="fertilizer-crop-type"
              value={inputs.cropType}
              onChange={(e) => setInputs({ ...inputs, cropType: e.target.value })}
              data-testid="select-fertilizer-crop-type"
            >
              <option value="">Select crop type</option>
              <option value="vegetables">Vegetables</option>
              <option value="grains">Grains (Wheat, Rice, Corn)</option>
              <option value="fruits">Fruits</option>
              <option value="legumes">Legumes</option>
            </Form.Select>
          </div>
        </div>

        <div className="d-flex gap-3 mt-4">
          <Button variant="primary" onClick={calculateFertilizerMix} data-testid="button-calculate-fertilizer-mix">
            Calculate Fertilizer Mix
          </Button>
          <Button variant="outline-secondary" onClick={reset} data-testid="button-reset-fertilizer-mix">
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
                  <span className="fw-semibold" data-testid="text-fertilizer-mix-quality">{result.message}</span>
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

export default FertilizerMixCalculator;