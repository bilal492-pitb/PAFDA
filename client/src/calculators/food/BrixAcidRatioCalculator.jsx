import { useState } from "react";
import React from 'react';
import { Calculator, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card, Form, Button, Badge, Alert } from "react-bootstrap";

function BrixAcidRatioCalculator() {
  const [inputs, setInputs] = useState({ 
    foodType: "", 
    brix: "", 
    acidity: "", 
    acidType: "citric" 
  });
  const [result, setResult] = useState(null);

  const calculateBrixAcidRatio = () => {
    const brix = parseFloat(inputs.brix);
    const acidity = parseFloat(inputs.acidity);

    if (isNaN(brix) || isNaN(acidity) || acidity === 0) {
      return;
    }

    const ratio = brix / acidity;
    
    const details = [];
    let quality = "good";
    let message = "";

    details.push(`✓ Brix/Acid ratio: ${ratio.toFixed(2)}`);
    details.push(`✓ Total soluble solids: ${brix}°Brix`);
    details.push(`✓ Titratable acidity: ${acidity}%`);
    details.push(`✓ Acid type: ${inputs.acidType.charAt(0).toUpperCase() + inputs.acidType.slice(1)}`);

    // Quality thresholds for fruits
    if (inputs.foodType === "citrus" && ratio >= 8 && ratio <= 12) {
      quality = "good";
      message = "OPTIMAL maturity index for citrus fruits";
    } else if (inputs.foodType === "apple" && ratio >= 15 && ratio <= 25) {
      quality = "good";
      message = "OPTIMAL maturity index for apples";
    } else if (inputs.foodType === "grape" && ratio >= 20 && ratio <= 35) {
      quality = "good";
      message = "OPTIMAL maturity index for grapes";
    } else {
      quality = "average";
      message = "Maturity index is outside optimal range";
      details.push("⚠ May affect taste and quality");
    }

    setResult({ quality, message, details, ratio: ratio.toFixed(2) });
  };

  const reset = () => {
    setInputs({ foodType: "", brix: "", acidity: "", acidType: "citric" });
    setResult(null);
  };

  return (
    <Card>
      <Card.Header>
        <div className="d-flex align-items-center gap-2">
          <Calculator className="text-primary" style={{ width: '20px', height: '20px' }} />
          <h5 className="mb-0">Brix/Acid Ratio Calculator</h5>
        </div>
        <p className="text-muted small mb-0">
          Calculate maturity index for fruits and beverages
        </p>
      </Card.Header>
      <Card.Body>
        <div className="row g-4">
          <div className="col-md-6">
            <Form.Label htmlFor="brix-food-type">Food Type</Form.Label>
            <Form.Select
              id="brix-food-type"
              value={inputs.foodType}
              onChange={(e) => setInputs({ ...inputs, foodType: e.target.value })}
              data-testid="select-brix-food-type"
            >
              <option value="">Select food type</option>
              <option value="citrus">Citrus Fruits</option>
              <option value="apple">Apples</option>
              <option value="grape">Grapes</option>
              <option value="juice">Fruit Juice</option>
              <option value="beverage">Beverages</option>
            </Form.Select>
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="brix-value">Total Soluble Solids (°Brix)</Form.Label>
            <Form.Control
              id="brix-value"
              type="number"
              step="0.1"
              min="0"
              max="100"
              placeholder="e.g., 12.5"
              value={inputs.brix}
              onChange={(e) => setInputs({ ...inputs, brix: e.target.value })}
              data-testid="input-brix-value"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="brix-acidity">Titratable Acidity (%)</Form.Label>
            <Form.Control
              id="brix-acidity"
              type="number"
              step="0.001"
              min="0.001"
              max="10"
              placeholder="e.g., 0.85"
              value={inputs.acidity}
              onChange={(e) => setInputs({ ...inputs, acidity: e.target.value })}
              data-testid="input-brix-acidity"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="brix-acid-type">Primary Acid Type</Form.Label>
            <Form.Select
              id="brix-acid-type"
              value={inputs.acidType}
              onChange={(e) => setInputs({ ...inputs, acidType: e.target.value })}
              data-testid="select-brix-acid-type"
            >
              <option value="citric">Citric Acid</option>
              <option value="malic">Malic Acid</option>
              <option value="tartaric">Tartaric Acid</option>
              <option value="acetic">Acetic Acid</option>
              <option value="lactic">Lactic Acid</option>
            </Form.Select>
          </div>
        </div>

        <div className="d-flex gap-3 mt-4">
          <Button variant="primary" onClick={calculateBrixAcidRatio} data-testid="button-calculate-brix">
            Calculate Ratio
          </Button>
          <Button variant="outline-secondary" onClick={reset} data-testid="button-reset-brix">
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
                  <span className="fw-semibold" data-testid="text-brix-quality">{result.message}</span>
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

export default BrixAcidRatioCalculator;