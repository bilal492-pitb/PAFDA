import { useState } from "react";
import React from 'react';
import { Leaf, Calculator, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card, Form, Button, Badge, Alert } from "react-bootstrap";

function PesticideDilutionCalculator() {
  const [inputs, setInputs] = useState({ 
    concentration: "", 
    targetRate: "", 
    tankSize: "", 
    area: "" 
  });
  const [result, setResult] = useState(null);

  const calculateDilution = () => {
    const concentration = parseFloat(inputs.concentration);
    const targetRate = parseFloat(inputs.targetRate);
    const tankSize = parseFloat(inputs.tankSize);
    const area = parseFloat(inputs.area);

    if (isNaN(concentration) || isNaN(targetRate) || isNaN(tankSize) || isNaN(area)) {
      return;
    }

    const details = [];
    let quality = "good";
    let message = "";

    // Calculate amount of pesticide needed
    const pesticideAmount = (targetRate * tankSize) / concentration;
    const totalVolume = targetRate * area;
    const sprayVolume = tankSize * area;

    details.push(`✓ Pesticide required: ${pesticideAmount.toFixed(3)} L per ${tankSize} L tank`);
    details.push(`✓ Total spray volume: ${totalVolume.toFixed(2)} L`);
    details.push(`✓ Coverage area: ${area} hectares`);
    details.push(`✓ Dilution ratio: 1:${Math.round(concentration / targetRate)}`);

    if (pesticideAmount > 1) {
      details.push("⚠ High pesticide concentration - ensure proper PPE");
      quality = "average";
      message = "High concentration dilution - Safety precautions required";
    } else {
      quality = "good";
      message = "Dilution calculated successfully";
      details.push("✓ Safe application rate");
    }

    setResult({ quality, message, details, pesticideAmount: pesticideAmount.toFixed(3) });
  };

  const reset = () => {
    setInputs({ concentration: "", targetRate: "", tankSize: "", area: "" });
    setResult(null);
  };

  return (
    <Card>
      <Card.Header>
        <div className="d-flex align-items-center gap-2">
          <Leaf className="text-primary" style={{ width: '20px', height: '20px' }} />
          <h5 className="mb-0">Pesticide Dilution Calculator</h5>
        </div>
        <p className="text-muted small mb-0">
          Calculate proper dilution rates for safe pesticide application
        </p>
      </Card.Header>
      <Card.Body>
        <div className="row g-4">
          <div className="col-md-6">
            <Form.Label htmlFor="pesticide-concentration">Product Concentration (g/L or %)</Form.Label>
            <Form.Control
              id="pesticide-concentration"
              type="number"
              step="0.1"
              min="0.1"
              max="1000"
              placeholder="e.g., 250"
              value={inputs.concentration}
              onChange={(e) => setInputs({ ...inputs, concentration: e.target.value })}
              data-testid="input-pesticide-concentration"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="pesticide-target-rate">Target Application Rate (L/ha)</Form.Label>
            <Form.Control
              id="pesticide-target-rate"
              type="number"
              step="0.01"
              min="0.01"
              max="10"
              placeholder="e.g., 0.5"
              value={inputs.targetRate}
              onChange={(e) => setInputs({ ...inputs, targetRate: e.target.value })}
              data-testid="input-pesticide-target-rate"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="pesticide-tank-size">Spray Tank Size (L)</Form.Label>
            <Form.Control
              id="pesticide-tank-size"
              type="number"
              step="1"
              min="10"
              max="10000"
              placeholder="e.g., 200"
              value={inputs.tankSize}
              onChange={(e) => setInputs({ ...inputs, tankSize: e.target.value })}
              data-testid="input-pesticide-tank-size"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="pesticide-area">Area to Treat (hectares)</Form.Label>
            <Form.Control
              id="pesticide-area"
              type="number"
              step="0.1"
              min="0.1"
              max="1000"
              placeholder="e.g., 2.5"
              value={inputs.area}
              onChange={(e) => setInputs({ ...inputs, area: e.target.value })}
              data-testid="input-pesticide-area"
            />
          </div>
        </div>

        <div className="d-flex gap-3 mt-4">
          <Button variant="primary" onClick={calculateDilution} data-testid="button-calculate-pesticide-dilution">
            Calculate Dilution
          </Button>
          <Button variant="outline-secondary" onClick={reset} data-testid="button-reset-pesticide-dilution">
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
                  <span className="fw-semibold" data-testid="text-pesticide-dilution-quality">{result.message}</span>
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

export default PesticideDilutionCalculator;