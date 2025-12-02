import { useState } from "react";
import React from 'react';
import { Calculator, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card, Form, Button, Badge, Alert } from "react-bootstrap";

function FoodShelfLifePredictor() {
  const [inputs, setInputs] = useState({ 
    foodType: "", 
    storageTemp: "", 
    packaging: "vacuum", 
    initialQuality: "excellent" 
  });
  const [result, setResult] = useState(null);

  const calculateShelfLife = () => {
    const storageTemp = parseFloat(inputs.storageTemp);
    
    if (isNaN(storageTemp) || !inputs.foodType) {
      return;
    }

    const baseLife = {
      "dairy": 7,
      "meat": 5,
      "produce": 10,
      "baked": 14,
      "leftovers": 3
    };

    const life = baseLife[inputs.foodType] || 7;
    const tempFactor = storageTemp <= 4 ? 1.0 : storageTemp <= 10 ? 0.7 : 0.4;
    const packageFactor = inputs.packaging === "vacuum" ? 1.5 : inputs.packaging === "sealed" ? 1.2 : 1.0;
    const qualityFactor = inputs.initialQuality === "excellent" ? 1.0 : inputs.initialQuality === "good" ? 0.9 : 0.7;

    const shelfLife = Math.round(life * tempFactor * packageFactor * qualityFactor);
    const details = [];
    let quality = "good";
    let message = "";

    details.push(`✓ Estimated shelf life: ${shelfLife} days`);
    details.push(`✓ Storage temperature: ${storageTemp}°C`);
    details.push(`✓ Packaging type: ${inputs.packaging}`);

    if (shelfLife >= 10) {
      quality = "good";
      message = `${inputs.foodType.charAt(0).toUpperCase() + inputs.foodType.slice(1)} will stay fresh for extended period`;
    } else if (shelfLife >= 5) {
      quality = "average";
      message = `${inputs.foodType.charAt(0).toUpperCase() + inputs.foodType.slice(1)} has moderate shelf life`;
    } else {
      quality = "poor";
      message = `${inputs.foodType.charAt(0).toUpperCase() + inputs.foodType.slice(1)} will spoil quickly`;
    }

    if (storageTemp > 4) {
      details.push("⚠ Warning: Temperature above 4°C increases spoilage risk");
    }

    setResult({ quality, message, details });
  };

  const reset = () => {
    setInputs({ foodType: "", storageTemp: "", packaging: "vacuum", initialQuality: "excellent" });
    setResult(null);
  };

  return (
    <Card>
      <Card.Header>
        <div className="d-flex align-items-center gap-2">
          <Calculator className="text-primary" style={{ width: '20px', height: '20px' }} />
          <h5 className="mb-0">Food Shelf Life Predictor</h5>
        </div>
        <p className="text-muted small mb-0">
          Estimate food freshness duration based on storage conditions
        </p>
      </Card.Header>
      <Card.Body>
        <div className="row g-4">
          <div className="col-md-6">
            <Form.Label htmlFor="shelf-food-type">Food Category</Form.Label>
            <Form.Select
              id="shelf-food-type"
              value={inputs.foodType}
              onChange={(e) => setInputs({ ...inputs, foodType: e.target.value })}
              data-testid="select-shelf-food-type"
            >
              <option value="">Select food type</option>
              <option value="dairy">Dairy Products</option>
              <option value="meat">Meat & Poultry</option>
              <option value="produce">Fresh Produce</option>
              <option value="baked">Baked Goods</option>
              <option value="leftovers">Cooked Leftovers</option>
            </Form.Select>
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="shelf-temp">Storage Temperature (°C)</Form.Label>
            <Form.Control
              id="shelf-temp"
              type="number"
              step="0.5"
              min="-20"
              max="50"
              placeholder="e.g., 4"
              value={inputs.storageTemp}
              onChange={(e) => setInputs({ ...inputs, storageTemp: e.target.value })}
              data-testid="input-shelf-temp"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="shelf-packaging">Packaging Type</Form.Label>
            <Form.Select
              id="shelf-packaging"
              value={inputs.packaging}
              onChange={(e) => setInputs({ ...inputs, packaging: e.target.value })}
              data-testid="select-shelf-packaging"
            >
              <option value="vacuum">Vacuum Sealed</option>
              <option value="sealed">Airtight Container</option>
              <option value="loose">Loose/Open</option>
            </Form.Select>
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="shelf-quality">Initial Quality</Form.Label>
            <Form.Select
              id="shelf-quality"
              value={inputs.initialQuality}
              onChange={(e) => setInputs({ ...inputs, initialQuality: e.target.value })}
              data-testid="select-shelf-quality"
            >
              <option value="excellent">Excellent</option>
              <option value="good">Good</option>
              <option value="fair">Fair</option>
            </Form.Select>
          </div>
        </div>

        <div className="d-flex gap-3 mt-4">
          <Button variant="primary" onClick={calculateShelfLife} data-testid="button-calculate-shelf-life">
            Predict Shelf Life
          </Button>
          <Button variant="outline-secondary" onClick={reset} data-testid="button-reset-shelf-life">
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
                  <span className="fw-semibold" data-testid="text-shelf-life">{result.message}</span>
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

export default FoodShelfLifePredictor;