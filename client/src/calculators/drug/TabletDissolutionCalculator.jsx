import { useState } from "react";
import React from 'react';
import { Apple, Leaf, Pill, Calculator, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card, Form, Button, Badge, Alert, Tabs, Tab } from "react-bootstrap";



// Tablet Dissolution Test Component
function TabletDissolutionCalculator() {
  const [inputs, setInputs] = useState({ dissolutionPercentage: "", timeMinutes: "" });
  const [result, setResult] = useState(null);

  const calculateDissolutionCompliance = () => {
    const dissolution = parseFloat(inputs.dissolutionPercentage);
    const time = parseFloat(inputs.timeMinutes);

    if (isNaN(dissolution) || isNaN(time)) {
      return;
    }

    const details = [];
    let quality = "good";
    let message = "";

    details.push(`Dissolution: ${dissolution}% in ${time} minutes`);

    // Standard dissolution criteria (typical for immediate release tablets at 30 min)
    if (time <= 30) {
      if (dissolution >= 80) {
        details.push("✓ Meets USP/BP dissolution criteria (≥80% in 30 min)");
        quality = "good";
        message = "Tablet dissolution is EXCELLENT - meets pharmacopeial standards";
      } else if (dissolution >= 70) {
        details.push("~ Acceptable dissolution but below optimal");
        quality = "average";
        message = "Tablet dissolution is ACCEPTABLE but could be improved";
      } else {
        details.push("✗ Does not meet dissolution criteria (<70% in 30 min)");
        quality = "poor";
        message = "Tablet dissolution is POOR - does not meet standards";
      }
    } else if (time <= 45) {
      if (dissolution >= 85) {
        details.push("✓ Good dissolution for extended time point");
        quality = "good";
        message = "Tablet dissolution is GOOD";
      } else {
        details.push("✗ Inadequate dissolution for time point");
        quality = "poor";
        message = "Tablet dissolution is INADEQUATE";
      }
    } else {
      if (dissolution >= 90) {
        details.push("✓ Complete dissolution achieved");
        quality = "good";
        message = "Tablet dissolution is COMPLETE";
      } else {
        details.push("✗ Incomplete dissolution - formulation issue");
        quality = "poor";
        message = "Tablet dissolution is INCOMPLETE - formulation concerns";
      }
    }

    setResult({ quality, message, details });
  };

  const reset = () => {
    setInputs({ dissolutionPercentage: "", timeMinutes: "" });
    setResult(null);
  };

  return (
    <Card>
      <Card.Header>
        <div className="d-flex align-items-center gap-2">
          <Calculator className="text-primary" style={{ width: '20px', height: '20px' }} />
          <h5 className="mb-0">Tablet Dissolution Test</h5>
        </div>
        <p className="text-muted small mb-0">
          Evaluate drug release profile and bioavailability compliance
        </p>
      </Card.Header>
      <Card.Body>
        <div className="row g-4">
          <div className="col-md-6">
            <Form.Label htmlFor="tab-dissolution">Dissolution Percentage (%)</Form.Label>
            <Form.Control
              id="tab-dissolution"
              type="number"
              step="0.1"
              min="0"
              max="100"
              placeholder="e.g., 85"
              value={inputs.dissolutionPercentage}
              onChange={(e) => setInputs({ ...inputs, dissolutionPercentage: e.target.value })}
              data-testid="input-dissolution-percentage"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="tab-time">Time (minutes)</Form.Label>
            <Form.Control
              id="tab-time"
              type="number"
              step="1"
              min="0"
              max="120"
              placeholder="e.g., 30"
              value={inputs.timeMinutes}
              onChange={(e) => setInputs({ ...inputs, timeMinutes: e.target.value })}
              data-testid="input-dissolution-time"
            />
          </div>
        </div>

        <div className="d-flex gap-3 mt-4">
          <Button variant="primary" onClick={calculateDissolutionCompliance} data-testid="button-calculate-dissolution">
            Evaluate Compliance
          </Button>
          <Button variant="outline-secondary" onClick={reset} data-testid="button-reset-dissolution">
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
                  <span className="fw-semibold" data-testid="text-dissolution-quality">{result.message}</span>
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

export default TabletDissolutionCalculator;