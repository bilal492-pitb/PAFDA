
import { useState } from "react";
import React from 'react';
import { Apple, Leaf, Pill, Calculator, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card, Form, Button, Badge, Alert, Tabs, Tab } from "react-bootstrap";

// Pesticide Residue Checker Component
function PesticideResidueCalculator() {
  const [inputs, setInputs] = useState({ residueLevel: "", mrl: "" });
  const [result, setResult] = useState(null);

  const calculateResidueCompliance = () => {
    const residueLevel = parseFloat(inputs.residueLevel);
    const mrl = parseFloat(inputs.mrl);

    if (isNaN(residueLevel) || isNaN(mrl)) {
      return;
    }

    const details = [];
    let quality = "good";
    let message = "";
    const percentage = (residueLevel / mrl) * 100;

    details.push(`Detected: ${residueLevel} mg/kg`);
    details.push(`MRL (Maximum Residue Limit): ${mrl} mg/kg`);
    details.push(`Percentage of MRL: ${percentage.toFixed(1)}%`);

    if (residueLevel <= mrl * 0.5) {
      details.push("✓ Well below MRL - Excellent compliance");
      quality = "good";
      message = "Pesticide residue levels are SAFE and well within limits";
    } else if (residueLevel <= mrl) {
      details.push("✓ Below MRL - Acceptable level");
      quality = "average";
      message = "Pesticide residue levels are ACCEPTABLE but close to limit";
    } else {
      details.push("✗ Exceeds MRL - Non-compliant");
      quality = "poor";
      message = "Pesticide residue levels EXCEED maximum limit - UNSAFE";
    }

    setResult({ quality, message, details });
  };

  const reset = () => {
    setInputs({ residueLevel: "", mrl: "" });
    setResult(null);
  };

  return (
    <Card>
      <Card.Header>
        <div className="d-flex align-items-center gap-2">
          <Calculator className="text-primary" style={{ width: '20px', height: '20px' }} />
          <h5 className="mb-0">Pesticide Residue Checker</h5>
        </div>
        <p className="text-muted small mb-0">
          Compare detected residue levels with Maximum Residue Limits (MRL)
        </p>
      </Card.Header>
      <Card.Body>
        <div className="row g-4">
          <div className="col-md-6">
            <Form.Label htmlFor="pest-residue">Detected Residue Level (mg/kg)</Form.Label>
            <Form.Control
              id="pest-residue"
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g., 0.05"
              value={inputs.residueLevel}
              onChange={(e) => setInputs({ ...inputs, residueLevel: e.target.value })}
              data-testid="input-pesticide-residue"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="pest-mrl">MRL - Maximum Residue Limit (mg/kg)</Form.Label>
            <Form.Control
              id="pest-mrl"
              type="number"
              step="0.01"
              min="0"
              placeholder="e.g., 0.1"
              value={inputs.mrl}
              onChange={(e) => setInputs({ ...inputs, mrl: e.target.value })}
              data-testid="input-pesticide-mrl"
            />
          </div>
        </div>

        <div className="d-flex gap-3 mt-4">
          <Button variant="primary" onClick={calculateResidueCompliance} data-testid="button-calculate-pesticide">
            Check Compliance
          </Button>
          <Button variant="outline-secondary" onClick={reset} data-testid="button-reset-pesticide">
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
                  <span className="fw-semibold" data-testid="text-pesticide-quality">{result.message}</span>
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

export default PesticideResidueCalculator;

