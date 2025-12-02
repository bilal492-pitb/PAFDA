import { useState } from "react";
import React from 'react';
import { Pill, Calculator, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card, Form, Button, Badge, Alert } from "react-bootstrap";

function DissolutionTimeEstimator() {
  const [inputs, setInputs] = useState({ 
    tabletWeight: "", 
    dissolutionMedium: "water", 
    temperature: "", 
    agitation: "medium" 
  });
  const [result, setResult] = useState(null);

  const estimateDissolution = () => {
    const weight = parseFloat(inputs.tabletWeight);
    const temp = parseFloat(inputs.temperature);

    if (isNaN(weight) || isNaN(temp)) {
      return;
    }

    const details = [];
    let quality = "good";
    let message = "";

    // Dissolution time estimation based on parameters
    let baseTime = 30; // minutes
    const tempFactor = temp >= 37 ? 1.0 : temp >= 30 ? 1.5 : 2.0;
    const weightFactor = weight > 500 ? 1.3 : 1.0;
    const agitationFactor = inputs.agitation === "low" ? 1.5 : inputs.agitation === "medium" ? 1.0 : 0.8;

    const dissolutionTime = Math.round(baseTime * tempFactor * weightFactor * agitationFactor);

    details.push(`✓ Estimated dissolution time: ${dissolutionTime} minutes`);
    details.push(`✓ Tablet weight: ${weight} mg`);
    details.push(`✓ Medium: ${inputs.dissolutionMedium.charAt(0).toUpperCase() + inputs.dissolutionMedium.slice(1)}`);
    details.push(`✓ Temperature: ${temp}°C`);
    details.push(`✓ Agitation: ${inputs.agitation} speed`);

    if (dissolutionTime <= 30) {
      quality = "good";
      message = "Rapid dissolution - Meets USP standards";
      details.push("✓ Dissolution is within 30 minutes - Complies with pharmacopeia");
    } else if (dissolutionTime <= 45) {
      quality = "average";
      message = "Moderate dissolution rate";
      details.push("⚠ Consider formulation optimization");
    } else {
      quality = "poor";
      message = "Slow dissolution - May affect bioavailability";
      details.push("✗ Exceeds standard dissolution time limits");
    }

    setResult({ quality, message, details, dissolutionTime });
  };

  const reset = () => {
    setInputs({ tabletWeight: "", dissolutionMedium: "water", temperature: "", agitation: "medium" });
    setResult(null);
  };

  return (
    <Card>
      <Card.Header>
        <div className="d-flex align-items-center gap-2">
          <Pill className="text-primary" style={{ width: '20px', height: '20px' }} />
          <h5 className="mb-0">Dissolution Time Estimator</h5>
        </div>
        <p className="text-muted small mb-0">
          Estimate tablet dissolution time under various conditions
        </p>
      </Card.Header>
      <Card.Body>
        <div className="row g-4">
          <div className="col-md-6">
            <Form.Label htmlFor="dissolution-weight">Tablet Weight (mg)</Form.Label>
            <Form.Control
              id="dissolution-weight"
              type="number"
              step="1"
              min="50"
              max="1000"
              placeholder="e.g., 500"
              value={inputs.tabletWeight}
              onChange={(e) => setInputs({ ...inputs, tabletWeight: e.target.value })}
              data-testid="input-dissolution-weight"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="dissolution-medium">Dissolution Medium</Form.Label>
            <Form.Select
              id="dissolution-medium"
              value={inputs.dissolutionMedium}
              onChange={(e) => setInputs({ ...inputs, dissolutionMedium: e.target.value })}
              data-testid="select-dissolution-medium"
            >
              <option value="water">Water</option>
              <option value="hcl">0.1N HCl</option>
              <option value="phosphate">Phosphate Buffer</option>
              <option value="acetate">Acetate Buffer</option>
            </Form.Select>
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="dissolution-temperature">Temperature (°C)</Form.Label>
            <Form.Control
              id="dissolution-temperature"
              type="number"
              step="0.5"
              min="25"
              max="40"
              placeholder="e.g., 37"
              value={inputs.temperature}
              onChange={(e) => setInputs({ ...inputs, temperature: e.target.value })}
              data-testid="input-dissolution-temperature"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="dissolution-agitation">Agitation Speed</Form.Label>
            <Form.Select
              id="dissolution-agitation"
              value={inputs.agitation}
              onChange={(e) => setInputs({ ...inputs, agitation: e.target.value })}
              data-testid="select-dissolution-agitation"
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
            </Form.Select>
          </div>
        </div>

        <div className="d-flex gap-3 mt-4">
          <Button variant="primary" onClick={estimateDissolution} data-testid="button-calculate-dissolution">
            Estimate Dissolution
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

export default DissolutionTimeEstimator;