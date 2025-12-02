import { useState } from "react";
import React from 'react';
import { Pill, Calculator, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card, Form, Button, Badge, Alert } from "react-bootstrap";

function DrugStabilityChecker() {
  const [inputs, setInputs] = useState({ 
    drugType: "", 
    storageTemp: "", 
    humidity: "", 
    storageDuration: "", 
    manufacturingDate: "" 
  });
  const [result, setResult] = useState(null);

  const checkStability = () => {
    const temp = parseFloat(inputs.storageTemp);
    const humidity = parseFloat(inputs.humidity);
    const duration = parseInt(inputs.storageDuration);

    if (isNaN(temp) || isNaN(humidity) || isNaN(duration)) {
      return;
    }

    const details = [];
    let quality = "good";
    let message = "";

    details.push(`✓ Storage temperature: ${temp}°C`);
    details.push(`✓ Relative humidity: ${humidity}%`);
    details.push(`✓ Storage duration: ${duration} months`);

    // Stability assessment
    if (temp <= 25 && humidity <= 60) {
      details.push("✓ Storage conditions are optimal");
    } else if (temp <= 30 && humidity <= 70) {
      details.push("⚠ Storage conditions are acceptable but not ideal");
      quality = "average";
    } else {
      details.push("✗ Poor storage conditions detected");
      quality = "poor";
    }

    if (duration <= 24) {
      details.push("✓ Within typical shelf life period");
    } else {
      details.push("⚠ Extended storage beyond recommended period");
      quality = quality === "good" ? "average" : "poor";
    }

    const stabilityScore = temp <= 25 ? 1 : temp <= 30 ? 0.7 : 0.5;
    const humidityScore = humidity <= 60 ? 1 : humidity <= 70 ? 0.8 : 0.6;
    const durationScore = duration <= 12 ? 1 : duration <= 24 ? 0.9 : 0.7;

    const overallStability = (stabilityScore + humidityScore + durationScore) / 3;

    if (overallStability >= 0.9) {
      quality = "good";
      message = "Drug is STABLE with high confidence";
    } else if (overallStability >= 0.7) {
      quality = "average";
      message = "Drug is MODERATELY stable - monitor closely";
    } else {
      quality = "poor";
      message = "Drug STABILITY COMPROMISED - do not dispense";
      details.push("✗ Do not use - potential degradation");
    }

    setResult({ quality, message, details, overallStability: (overallStability * 100).toFixed(1) });
  };

  const reset = () => {
    setInputs({ drugType: "", storageTemp: "", humidity: "", storageDuration: "", manufacturingDate: "" });
    setResult(null);
  };

  return (
    <Card>
      <Card.Header>
        <div className="d-flex align-items-center gap-2">
          <Pill className="text-primary" style={{ width: '20px', height: '20px' }} />
          <h5 className="mb-0">Drug Stability Checker</h5>
        </div>
        <p className="text-muted small mb-0">
          Assess medication stability based on storage conditions
        </p>
      </Card.Header>
      <Card.Body>
        <div className="row g-4">
          <div className="col-md-6">
            <Form.Label htmlFor="stability-drug-type">Drug Formulation</Form.Label>
            <Form.Select
              id="stability-drug-type"
              value={inputs.drugType}
              onChange={(e) => setInputs({ ...inputs, drugType: e.target.value })}
              data-testid="select-stability-drug-type"
            >
              <option value="">Select drug type</option>
              <option value="tablet">Tablet</option>
              <option value="capsule">Capsule</option>
              <option value="suspension">Liquid Suspension</option>
              <option value="injection">Injectable</option>
            </Form.Select>
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="stability-temp">Storage Temperature (°C)</Form.Label>
            <Form.Control
              id="stability-temp"
              type="number"
              step="0.5"
              min="0"
              max="50"
              placeholder="e.g., 25"
              value={inputs.storageTemp}
              onChange={(e) => setInputs({ ...inputs, storageTemp: e.target.value })}
              data-testid="input-stability-temp"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="stability-humidity">Relative Humidity (%)</Form.Label>
            <Form.Control
              id="stability-humidity"
              type="number"
              step="1"
              min="0"
              max="100"
              placeholder="e.g., 45"
              value={inputs.humidity}
              onChange={(e) => setInputs({ ...inputs, humidity: e.target.value })}
              data-testid="input-stability-humidity"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="stability-duration">Storage Duration (months)</Form.Label>
            <Form.Control
              id="stability-duration"
              type="number"
              step="1"
              min="1"
              max="60"
              placeholder="e.g., 18"
              value={inputs.storageDuration}
              onChange={(e) => setInputs({ ...inputs, storageDuration: e.target.value })}
              data-testid="input-stability-duration"
            />
          </div>
        </div>

        <div className="d-flex gap-3 mt-4">
          <Button variant="primary" onClick={checkStability} data-testid="button-check-stability">
            Check Stability
          </Button>
          <Button variant="outline-secondary" onClick={reset} data-testid="button-reset-stability">
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
                  <span className="fw-semibold" data-testid="text-stability-quality">{result.message}</span>
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

export default DrugStabilityChecker;