import { useState } from "react";
import React from 'react';
import { Apple, Leaf, Pill, Calculator, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card, Form, Button, Badge, Alert, Tabs, Tab } from "react-bootstrap";



// Milk Analysis Calculator Component
function MilkAnalysisCalculator() {
  const [inputs, setInputs] = useState({ fat: "", protein: "", lactose: "", snf: "" });
  const [result, setResult] = useState(null);

  const calculateMilkQuality = () => {
    const fat = parseFloat(inputs.fat);
    const protein = parseFloat(inputs.protein);
    const lactose = parseFloat(inputs.lactose);
    const snf = parseFloat(inputs.snf);

    if (isNaN(fat) || isNaN(protein) || isNaN(lactose) || isNaN(snf)) {
      return;
    }

    const details = [];
    let quality = "good";
    let message = "";

     
    // Standard milk parameters
    if (fat >= 3.5 && fat <= 6.0) {
      details.push("✓ Fat content is within normal range (3.5-6.0%)");
    } else {
      details.push("✗ Fat content is outside normal range");
      quality = fat < 3.5 ? "poor" : "average";
    }

    if (protein >= 3.0 && protein <= 4.0) {
      details.push("✓ Protein content is within normal range (3.0-4.0%)");
    } else {
      details.push("✗ Protein content is outside normal range");
      quality = quality === "good" ? "average" : "poor";
    }

    if (lactose >= 4.4 && lactose <= 5.2) {
      details.push("✓ Lactose content is within normal range (4.4-5.2%)");
    } else {
      details.push("✗ Lactose content is outside normal range");
      quality = quality === "good" ? "average" : "poor";
    }

    if (snf >= 8.5 && snf <= 9.0) {
      details.push("✓ SNF content is within normal range (8.5-9.0%)");
    } else {
      details.push("✗ SNF content is outside normal range");
      quality = quality === "good" ? "average" : "poor";
    }

    if (quality === "good") {
      message = "Milk is of GOOD quality - meets all standard parameters";
    } else if (quality === "average") {
      message = "Milk is of AVERAGE quality - some parameters need attention";
    } else {
      message = "Milk is of POOR quality - does not meet quality standards";
    }

    

    setResult({ quality, message, details });
  };

  const reset = () => {
    setInputs({ fat: "", protein: "", lactose: "", snf: "" });
    setResult(null);
  };

  return (
    <Card>
      <Card.Header>
        <div className="d-flex align-items-center gap-2">
          <Calculator className="text-primary" style={{ width: '20px', height: '20px' }} />
          <h5 className="mb-0">Milk Quality Analysis</h5>
        </div>
        <p className="text-muted small mb-0">
          Enter milk composition parameters to determine quality grade
        </p>
      </Card.Header>
      <Card.Body>
        <div className="row g-4">
          <div className="col-md-6">
            <Form.Label htmlFor="milk-fat">Fat Percentage (%)</Form.Label>
            <Form.Control
              id="milk-fat"
              type="number"
              step="0.1"
              min="0"
              max="100"
              placeholder="e.g., 4.5"
              value={inputs.fat}
              onChange={(e) => setInputs({ ...inputs, fat: e.target.value })}
              data-testid="input-milk-fat"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="milk-protein">Protein Percentage (%)</Form.Label>
            <Form.Control
              id="milk-protein"
              type="number"
              step="0.1"
              min="0"
              max="100"
              placeholder="e.g., 3.2"
              value={inputs.protein}
              onChange={(e) => setInputs({ ...inputs, protein: e.target.value })}
              data-testid="input-milk-protein"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="milk-lactose">Lactose Percentage (%)</Form.Label>
            <Form.Control
              id="milk-lactose"
              type="number"
              step="0.1"
              min="0"
              max="100"
              placeholder="e.g., 4.7"
              value={inputs.lactose}
              onChange={(e) => setInputs({ ...inputs, lactose: e.target.value })}
              data-testid="input-milk-lactose"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="milk-snf">SNF Percentage (%)</Form.Label>
            <Form.Control
              id="milk-snf"
              type="number"
              step="0.1"
              min="0"
              max="100"
              placeholder="e.g., 8.7"
              value={inputs.snf}
              onChange={(e) => setInputs({ ...inputs, snf: e.target.value })}
              data-testid="input-milk-snf"
            />
          </div>
        </div>

        <div className="d-flex gap-3 mt-4">
          <Button variant="primary" onClick={calculateMilkQuality} data-testid="button-calculate-milk">
            Calculate Quality
          </Button>
          <Button variant="outline-secondary" onClick={reset} data-testid="button-reset-milk">
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
                  <span className="fw-semibold" data-testid="text-milk-quality">{result.message}</span>
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

export default MilkAnalysisCalculator;
