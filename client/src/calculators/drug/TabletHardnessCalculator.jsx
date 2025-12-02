import { useState } from "react";
import React from 'react';
import { Pill, Calculator, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card, Form, Button, Badge, Alert } from "react-bootstrap";

function TabletHardnessCalculator() {
  const [inputs, setInputs] = useState({ diameter: "", thickness: "", hardness: "", weight: "" });
  const [result, setResult] = useState(null);

  const calculateTabletHardness = () => {
    const diameter = parseFloat(inputs.diameter);
    const thickness = parseFloat(inputs.thickness);
    const hardness = parseFloat(inputs.hardness);
    const weight = parseFloat(inputs.weight);

    if (isNaN(diameter) || isNaN(thickness) || isNaN(hardness) || isNaN(weight)) {
      return;
    }

    const details = [];
    let quality = "good";
    let message = "";

    // Standard tablet parameters
    if (hardness >= 4 && hardness <= 8) {
      details.push("✓ Hardness is within acceptable range (4-8 kp)");
    } else {
      details.push(`✗ Hardness is ${hardness < 4 ? "too low (<4 kp) - may cause friability" : "too high (>8 kp) - may affect dissolution"}`);
      quality = hardness < 4 ? "poor" : "average";
    }

    if (diameter >= 8 && diameter <= 12) {
      details.push("✓ Diameter is within standard range (8-12 mm)");
    } else {
      details.push("⚠ Diameter is outside typical range");
      quality = quality === "good" ? "average" : quality;
    }

    if (thickness / diameter >= 0.2 && thickness / diameter <= 0.4) {
      details.push("✓ Aspect ratio is acceptable");
    } else {
      details.push("⚠ Aspect ratio may affect tablet stability");
      quality = quality === "good" ? "average" : quality;
    }

    if (quality === "good") {
      message = "Tablet meets all hardness specifications";
    } else if (quality === "average") {
      message = "Tablet has minor deviations from standards";
    } else {
      message = "Tablet fails hardness quality standards";
    }

    setResult({ quality, message, details });
  };

  const reset = () => {
    setInputs({ diameter: "", thickness: "", hardness: "", weight: "" });
    setResult(null);
  };

  return (
    <Card>
      <Card.Header>
        <div className="d-flex align-items-center gap-2">
          <Pill className="text-primary" style={{ width: '20px', height: '20px' }} />
          <h5 className="mb-0">Tablet Hardness Calculator</h5>
        </div>
        <p className="text-muted small mb-0">
          Test tablet mechanical strength and durability
        </p>
      </Card.Header>
      <Card.Body>
        <div className="row g-4">
          <div className="col-md-6">
            <Form.Label htmlFor="tablet-diameter">Diameter (mm)</Form.Label>
            <Form.Control
              id="tablet-diameter"
              type="number"
              step="0.1"
              min="5"
              max="20"
              placeholder="e.g., 10.0"
              value={inputs.diameter}
              onChange={(e) => setInputs({ ...inputs, diameter: e.target.value })}
              data-testid="input-tablet-diameter"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="tablet-thickness">Thickness (mm)</Form.Label>
            <Form.Control
              id="tablet-thickness"
              type="number"
              step="0.1"
              min="2"
              max="10"
              placeholder="e.g., 4.5"
              value={inputs.thickness}
              onChange={(e) => setInputs({ ...inputs, thickness: e.target.value })}
              data-testid="input-tablet-thickness"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="tablet-hardness">Hardness (kp)</Form.Label>
            <Form.Control
              id="tablet-hardness"
              type="number"
              step="0.1"
              min="1"
              max="15"
              placeholder="e.g., 6.5"
              value={inputs.hardness}
              onChange={(e) => setInputs({ ...inputs, hardness: e.target.value })}
              data-testid="input-tablet-hardness"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="tablet-weight">Weight (mg)</Form.Label>
            <Form.Control
              id="tablet-weight"
              type="number"
              step="1"
              min="100"
              max="1000"
              placeholder="e.g., 500"
              value={inputs.weight}
              onChange={(e) => setInputs({ ...inputs, weight: e.target.value })}
              data-testid="input-tablet-weight"
            />
          </div>
        </div>

        <div className="d-flex gap-3 mt-4">
          <Button variant="primary" onClick={calculateTabletHardness} data-testid="button-calculate-tablet-hardness">
            Calculate Hardness
          </Button>
          <Button variant="outline-secondary" onClick={reset} data-testid="button-reset-tablet-hardness">
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
                  <span className="fw-semibold" data-testid="text-tablet-quality">{result.message}</span>
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

export default TabletHardnessCalculator;