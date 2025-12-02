import { useState } from "react";
import React from 'react';
import { Apple, Leaf, Pill, Calculator, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card, Form, Button, Badge, Alert, Tabs, Tab } from "react-bootstrap";

// Honey Purity Test Component
function HoneyPurityCalculator() {
  const [inputs, setInputs] = useState({ moisture: "", sugarContent: "", hmf: "" });
  const [result, setResult] = useState(null);

  const calculateHoneyPurity = () => {
    const moisture = parseFloat(inputs.moisture);
    const sugarContent = parseFloat(inputs.sugarContent);
    const hmf = parseFloat(inputs.hmf);

    if (isNaN(moisture) || isNaN(sugarContent) || isNaN(hmf)) {
      return;
    }

    const details = [];
    let quality = "good";
    let message = "";

    // Standard honey parameters
    if (moisture <= 20) {
      details.push("✓ Moisture content is acceptable (≤20%)");
    } else {
      details.push("✗ Moisture content is too high (>20%)");
      quality = "poor";
    }

    if (sugarContent >= 70) {
      details.push("✓ Sugar content is sufficient (≥70%)");
    } else {
      details.push("✗ Sugar content is too low (<70%)");
      quality = quality === "good" ? "average" : "poor";
    }

    if (hmf <= 40) {
      details.push("✓ HMF level is within acceptable range (≤40 mg/kg)");
    } else {
      details.push("✗ HMF level is too high - possible overheating or adulteration");
      quality = "poor";
    }

    if (quality === "good") {
      message = "Honey is PURE and of GOOD quality";
    } else if (quality === "average") {
      message = "Honey quality is AVERAGE - minor concerns present";
    } else {
      message = "Honey quality is POOR - possible adulteration or quality issues";
    }

    setResult({ quality, message, details });
  };

  const reset = () => {
    setInputs({ moisture: "", sugarContent: "", hmf: "" });
    setResult(null);
  };

  return (
    <Card>
      <Card.Header>
        <div className="d-flex align-items-center gap-2">
          <Calculator className="text-primary" style={{ width: '20px', height: '20px' }} />
          <h5 className="mb-0">Honey Purity Test</h5>
        </div>
        <p className="text-muted small mb-0">
          Verify honey authenticity by analyzing key quality parameters
        </p>
      </Card.Header>
      <Card.Body>
        <div className="row g-4">
          <div className="col-md-6">
            <Form.Label htmlFor="honey-moisture">Moisture Content (%)</Form.Label>
            <Form.Control
              id="honey-moisture"
              type="number"
              step="0.1"
              min="0"
              max="100"
              placeholder="e.g., 18.5"
              value={inputs.moisture}
              onChange={(e) => setInputs({ ...inputs, moisture: e.target.value })}
              data-testid="input-honey-moisture"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="honey-sugar">Sugar Content (%)</Form.Label>
            <Form.Control
              id="honey-sugar"
              type="number"
              step="0.1"
              min="0"
              max="100"
              placeholder="e.g., 75"
              value={inputs.sugarContent}
              onChange={(e) => setInputs({ ...inputs, sugarContent: e.target.value })}
              data-testid="input-honey-sugar"
            />
          </div>

          <div className="col-12">
            <Form.Label htmlFor="honey-hmf">HMF (Hydroxymethylfurfural) mg/kg</Form.Label>
            <Form.Control
              id="honey-hmf"
              type="number"
              step="0.1"
              min="0"
              max="200"
              placeholder="e.g., 25"
              value={inputs.hmf}
              onChange={(e) => setInputs({ ...inputs, hmf: e.target.value })}
              data-testid="input-honey-hmf"
            />
          </div>
        </div>

        <div className="d-flex gap-3 mt-4">
          <Button variant="primary" onClick={calculateHoneyPurity} data-testid="button-calculate-honey">
            Test Purity
          </Button>
          <Button variant="outline-secondary" onClick={reset} data-testid="button-reset-honey">
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
                  <span className="fw-semibold" data-testid="text-honey-quality">{result.message}</span>
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

export default HoneyPurityCalculator;
