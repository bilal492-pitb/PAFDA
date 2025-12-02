import { useState } from "react";
import React from 'react';
import { Calculator, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card, Form, Button, Badge, Alert } from "react-bootstrap";

function SugarContentAnalyzer() {
  const [inputs, setInputs] = useState({ foodType: "", sugarPer100g: "", servingSize: "" });
  const [result, setResult] = useState(null);

  const calculateSugarContent = () => {
    const sugarPer100g = parseFloat(inputs.sugarPer100g);
    const servingSize = parseFloat(inputs.servingSize);

    if (isNaN(sugarPer100g) || isNaN(servingSize) || !inputs.foodType) {
      return;
    }

    const totalSugar = (sugarPer100g * servingSize) / 100;
    const dailyLimit = 25; // WHO recommended daily limit
    const percentage = (totalSugar / dailyLimit) * 100;
    
    const details = [];
    let quality = "good";
    let message = "";

    details.push(`✓ Total sugar in ${servingSize}g serving: ${totalSugar.toFixed(1)}g`);
    details.push(`✓ Percentage of daily recommended limit: ${percentage.toFixed(1)}%`);

    if (totalSugar <= 5) {
      details.push("✓ Low sugar content - Excellent choice");
      quality = "good";
    } else if (totalSugar <= 15) {
      details.push("⚠ Moderate sugar content - Consume in moderation");
      quality = "average";
    } else {
      details.push("✗ High sugar content - Exceeds healthy limits");
      quality = "poor";
    }

    if (percentage <= 20) {
      message = `${inputs.foodType} has LOW sugar content`;
    } else if (percentage <= 60) {
      message = `${inputs.foodType} has MODERATE sugar content`;
    } else {
      message = `${inputs.foodType} has HIGH sugar content`;
    }

    setResult({ quality, message, details });
  };

  const reset = () => {
    setInputs({ foodType: "", sugarPer100g: "", servingSize: "" });
    setResult(null);
  };

  return (
    <Card>
      <Card.Header>
        <div className="d-flex align-items-center gap-2">
          <Calculator className="text-primary" style={{ width: '20px', height: '20px' }} />
          <h5 className="mb-0">Sugar Content Analyzer</h5>
        </div>
        <p className="text-muted small mb-0">
          Analyze sugar content and compare with daily recommended values
        </p>
      </Card.Header>
      <Card.Body>
        <div className="row g-4">
          <div className="col-md-6">
            <Form.Label htmlFor="sugar-food-type">Food Type</Form.Label>
            <Form.Control
              id="sugar-food-type"
              type="text"
              placeholder="e.g., Yogurt, Juice"
              value={inputs.foodType}
              onChange={(e) => setInputs({ ...inputs, foodType: e.target.value })}
              data-testid="input-sugar-food-type"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="sugar-per-100g">Sugar per 100g (g)</Form.Label>
            <Form.Control
              id="sugar-per-100g"
              type="number"
              step="0.1"
              min="0"
              max="100"
              placeholder="e.g., 12.5"
              value={inputs.sugarPer100g}
              onChange={(e) => setInputs({ ...inputs, sugarPer100g: e.target.value })}
              data-testid="input-sugar-per-100g"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="sugar-serving-size">Serving Size (g)</Form.Label>
            <Form.Control
              id="sugar-serving-size"
              type="number"
              step="1"
              min="1"
              max="1000"
              placeholder="e.g., 150"
              value={inputs.servingSize}
              onChange={(e) => setInputs({ ...inputs, servingSize: e.target.value })}
              data-testid="input-sugar-serving-size"
            />
          </div>
        </div>

        <div className="d-flex gap-3 mt-4">
          <Button variant="primary" onClick={calculateSugarContent} data-testid="button-calculate-sugar">
            Analyze Sugar Content
          </Button>
          <Button variant="outline-secondary" onClick={reset} data-testid="button-reset-sugar">
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
                  <span className="fw-semibold" data-testid="text-sugar-quality">{result.message}</span>
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

export default SugarContentAnalyzer;