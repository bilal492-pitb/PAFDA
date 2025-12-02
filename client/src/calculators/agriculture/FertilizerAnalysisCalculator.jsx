
import { useState } from "react";
import React from 'react';
import { Apple, Leaf, Pill, Calculator, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card, Form, Button, Badge, Alert, Tabs, Tab } from "react-bootstrap";



// Fertilizer Analysis Component
function FertilizerAnalysisCalculator() {
  const [inputs, setInputs] = useState({ nitrogen: "", phosphorus: "", potassium: "" });
  const [result, setResult] = useState(null);

  const calculateFertilizerQuality = () => {
    const nitrogen = parseFloat(inputs.nitrogen);
    const phosphorus = parseFloat(inputs.phosphorus);
    const potassium = parseFloat(inputs.potassium);

    if (isNaN(nitrogen) || isNaN(phosphorus) || isNaN(potassium)) {
      return;
    }

    const details = [];
    let quality = "good";
    let message = "";
    const total = nitrogen + phosphorus + potassium;

    details.push(`Total NPK: ${total.toFixed(1)}%`);

    // Standard fertilizer parameters (NPK balanced fertilizer)
    if (nitrogen >= 10 && nitrogen <= 46) {
      details.push("✓ Nitrogen (N) content is within acceptable range");
    } else {
      details.push("✗ Nitrogen (N) content is outside standard range");
      quality = "average";
    }

    if (phosphorus >= 5 && phosphorus <= 46) {
      details.push("✓ Phosphorus (P) content is within acceptable range");
    } else {
      details.push("✗ Phosphorus (P) content is outside standard range");
      quality = quality === "good" ? "average" : "poor";
    }

    if (potassium >= 5 && potassium <= 60) {
      details.push("✓ Potassium (K) content is within acceptable range");
    } else {
      details.push("✗ Potassium (K) content is outside standard range");
      quality = quality === "good" ? "average" : "poor";
    }

    if (quality === "good") {
      message = "Fertilizer composition meets quality standards";
    } else if (quality === "average") {
      message = "Fertilizer composition needs attention";
    } else {
      message = "Fertilizer composition does not meet standards";
    }

    setResult({ quality, message, details });
  };

  const reset = () => {
    setInputs({ nitrogen: "", phosphorus: "", potassium: "" });
    setResult(null);
  };

  return (
    <Card>
      <Card.Header>
        <div className="d-flex align-items-center gap-2">
          <Calculator className="text-primary" style={{ width: '20px', height: '20px' }} />
          <h5 className="mb-0">Fertilizer NPK Analysis</h5>
        </div>
        <p className="text-muted small mb-0">
          Validate fertilizer composition against quality standards
        </p>
      </Card.Header>
      <Card.Body>
        <div className="row g-4">
          <div className="col-md-4">
            <Form.Label htmlFor="fert-nitrogen">Nitrogen (N) %</Form.Label>
            <Form.Control
              id="fert-nitrogen"
              type="number"
              step="0.1"
              min="0"
              max="100"
              placeholder="e.g., 20"
              value={inputs.nitrogen}
              onChange={(e) => setInputs({ ...inputs, nitrogen: e.target.value })}
              data-testid="input-fertilizer-nitrogen"
            />
          </div>

          <div className="col-md-4">
            <Form.Label htmlFor="fert-phosphorus">Phosphorus (P) %</Form.Label>
            <Form.Control
              id="fert-phosphorus"
              type="number"
              step="0.1"
              min="0"
              max="100"
              placeholder="e.g., 20"
              value={inputs.phosphorus}
              onChange={(e) => setInputs({ ...inputs, phosphorus: e.target.value })}
              data-testid="input-fertilizer-phosphorus"
            />
          </div>

          <div className="col-md-4">
            <Form.Label htmlFor="fert-potassium">Potassium (K) %</Form.Label>
            <Form.Control
              id="fert-potassium"
              type="number"
              step="0.1"
              min="0"
              max="100"
              placeholder="e.g., 20"
              value={inputs.potassium}
              onChange={(e) => setInputs({ ...inputs, potassium: e.target.value })}
              data-testid="input-fertilizer-potassium"
            />
          </div>
        </div>

        <div className="d-flex gap-3 mt-4">
          <Button variant="primary" onClick={calculateFertilizerQuality} data-testid="button-calculate-fertilizer">
            Analyze Composition
          </Button>
          <Button variant="outline-secondary" onClick={reset} data-testid="button-reset-fertilizer">
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
                  <span className="fw-semibold" data-testid="text-fertilizer-quality">{result.message}</span>
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

export default FertilizerAnalysisCalculator;
