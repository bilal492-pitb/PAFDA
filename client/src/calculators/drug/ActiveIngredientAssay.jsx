import { useState } from "react";
import React from 'react';
import { Pill, Calculator, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card, Form, Button, Badge, Alert } from "react-bootstrap";

function ActiveIngredientAssay() {
  const [inputs, setInputs] = useState({ 
    labeledAmount: "", 
    foundAmount: "", 
    dosageForm: "tablet", 
    tolerance: "5.0" 
  });
  const [result, setResult] = useState(null);

  const calculateAssay = () => {
    const labeled = parseFloat(inputs.labeledAmount);
    const found = parseFloat(inputs.foundAmount);
    const tolerance = parseFloat(inputs.tolerance);

    if (isNaN(labeled) || isNaN(found) || isNaN(tolerance)) {
      return;
    }

    const assayPercentage = (found / labeled) * 100;
    const details = [];
    let quality = "good";
    let message = "";

    details.push(`✓ Labeled amount: ${labeled.toFixed(2)} mg`);
    details.push(`✓ Found amount: ${found.toFixed(2)} mg`);
    details.push(`✓ Assay: ${assayPercentage.toFixed(2)}%`);
    details.push(`✓ Tolerance limit: ±${tolerance}%`);

    if (assayPercentage >= (100 - tolerance) && assayPercentage <= (100 + tolerance)) {
      quality = "good";
      message = "Assay PASSED - Within specification limits";
      details.push("✓ Meets USP/NF requirements");
    } else if (assayPercentage >= (100 - tolerance * 1.5) && assayPercentage <= (100 + tolerance * 1.5)) {
      quality = "average";
      message = "Assay MARGINAL - Consider retesting";
      details.push("⚠ Borderline result - May require investigation");
    } else {
      quality = "poor";
      message = "Assay FAILED - Out of specification";
      details.push("✗ Does not meet pharmacopeial requirements");
      details.push("✗ Batch should be rejected");
    }

    setResult({ quality, message, details, assayPercentage: assayPercentage.toFixed(2) });
  };

  const reset = () => {
    setInputs({ labeledAmount: "", foundAmount: "", dosageForm: "tablet", tolerance: "5.0" });
    setResult(null);
  };

  return (
    <Card>
      <Card.Header>
        <div className="d-flex align-items-center gap-2">
          <Pill className="text-primary" style={{ width: '20px', height: '20px' }} />
          <h5 className="mb-0">Active Ingredient Assay Calculator</h5>
        </div>
        <p className="text-muted small mb-0">
          Calculate active ingredient content in drug formulations
        </p>
      </Card.Header>
      <Card.Body>
        <div className="row g-4">
          <div className="col-md-6">
            <Form.Label htmlFor="assay-labeled">Labeled Amount (mg)</Form.Label>
            <Form.Control
              id="assay-labeled"
              type="number"
              step="0.01"
              min="0.01"
              max="1000"
              placeholder="e.g., 500.00"
              value={inputs.labeledAmount}
              onChange={(e) => setInputs({ ...inputs, labeledAmount: e.target.value })}
              data-testid="input-assay-labeled"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="assay-found">Found Amount (mg)</Form.Label>
            <Form.Control
              id="assay-found"
              type="number"
              step="0.01"
              min="0"
              max="1000"
              placeholder="e.g., 495.25"
              value={inputs.foundAmount}
              onChange={(e) => setInputs({ ...inputs, foundAmount: e.target.value })}
              data-testid="input-assay-found"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="assay-dosage-form">Dosage Form</Form.Label>
            <Form.Select
              id="assay-dosage-form"
              value={inputs.dosageForm}
              onChange={(e) => setInputs({ ...inputs, dosageForm: e.target.value })}
              data-testid="select-assay-dosage-form"
            >
              <option value="tablet">Tablet</option>
              <option value="capsule">Capsule</option>
              <option value="suspension">Suspension</option>
              <option value="injection">Injection</option>
            </Form.Select>
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="assay-tolerance">Tolerance Limit (%)</Form.Label>
            <Form.Control
              id="assay-tolerance"
              type="number"
              step="0.1"
              min="1"
              max="20"
              placeholder="e.g., 5.0"
              value={inputs.tolerance}
              onChange={(e) => setInputs({ ...inputs, tolerance: e.target.value })}
              data-testid="input-assay-tolerance"
            />
          </div>
        </div>

        <div className="d-flex gap-3 mt-4">
          <Button variant="primary" onClick={calculateAssay} data-testid="button-calculate-assay">
            Calculate Assay
          </Button>
          <Button variant="outline-secondary" onClick={reset} data-testid="button-reset-assay">
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
                  <span className="fw-semibold" data-testid="text-assay-quality">{result.message}</span>
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

export default ActiveIngredientAssay;