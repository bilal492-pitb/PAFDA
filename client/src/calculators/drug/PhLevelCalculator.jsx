import { useState } from "react";
import React from 'react';
import { Apple, Leaf, Pill, Calculator, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card, Form, Button, Badge, Alert, Tabs, Tab } from "react-bootstrap";


// pH Level Validator Component
function PhLevelCalculator() {
  const [inputs, setInputs] = useState({ phValue: "", productType: "" });
  const [result, setResult] = useState(null);

  const calculatePhCompliance = () => {
    const ph = parseFloat(inputs.phValue);
    const productType = inputs.productType;

    if (isNaN(ph) || !productType) {
      return;
    }

    const details = [];
    let quality = "good";
    let message = "";

    details.push(`pH Value: ${ph.toFixed(2)}`);
    details.push(`Product Type: ${productType.charAt(0).toUpperCase() + productType.slice(1)}`);

    // pH ranges for different product types
    const ranges = {
      tablet: { min: 6.0, max: 8.0, name: "Tablets" },
      syrup: { min: 4.0, max: 7.0, name: "Syrups" },
      injection: { min: 6.5, max: 7.5, name: "Injections" },
      suspension: { min: 5.0, max: 8.0, name: "Suspensions" },
    };

    const range = ranges[productType];

    if (ph >= range.min && ph <= range.max) {
      details.push(`✓ pH is within acceptable range for ${range.name} (${range.min}-${range.max})`);
      quality = "good";
      message = `pH level is ACCEPTABLE for ${range.name}`;
    } else if (ph >= range.min - 0.5 && ph <= range.max + 0.5) {
      details.push(`~ pH is close to acceptable range (${range.min}-${range.max})`);
      quality = "average";
      message = `pH level is BORDERLINE for ${range.name}`;
    } else {
      details.push(`✗ pH is outside acceptable range (${range.min}-${range.max})`);
      quality = "poor";
      message = `pH level is UNACCEPTABLE for ${range.name}`;
    }

    setResult({ quality, message, details });
  };

  const reset = () => {
    setInputs({ phValue: "", productType: "" });
    setResult(null);
  };

  return (
    <Card>
      <Card.Header>
        <div className="d-flex align-items-center gap-2">
          <Calculator className="text-primary" style={{ width: '20px', height: '20px' }} />
          <h5 className="mb-0">pH Level Validator</h5>
        </div>
        <p className="text-muted small mb-0">
          Check if pH value is within acceptable pharmaceutical range
        </p>
      </Card.Header>
      <Card.Body>
        <div className="row g-4">
          <div className="col-md-6">
            <Form.Label htmlFor="ph-value">pH Value</Form.Label>
            <Form.Control
              id="ph-value"
              type="number"
              step="0.01"
              min="0"
              max="14"
              placeholder="e.g., 7.2"
              value={inputs.phValue}
              onChange={(e) => setInputs({ ...inputs, phValue: e.target.value })}
              data-testid="input-ph-value"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="ph-product">Product Type</Form.Label>
            <Form.Select
              id="ph-product"
              value={inputs.productType}
              onChange={(e) => setInputs({ ...inputs, productType: e.target.value })}
              data-testid="select-product-type"
            >
              <option value="">Select product type</option>
              <option value="tablet">Tablet</option>
              <option value="syrup">Syrup</option>
              <option value="injection">Injection</option>
              <option value="suspension">Suspension</option>
            </Form.Select>
          </div>
        </div>

        <div className="d-flex gap-3 mt-4">
          <Button variant="primary" onClick={calculatePhCompliance} data-testid="button-calculate-ph">
            Validate pH
          </Button>
          <Button variant="outline-secondary" onClick={reset} data-testid="button-reset-ph">
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
                  <span className="fw-semibold" data-testid="text-ph-quality">{result.message}</span>
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

export default PhLevelCalculator;
