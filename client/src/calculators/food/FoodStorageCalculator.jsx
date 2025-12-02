import { useState } from "react";
import React from 'react';
import { Calculator, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card, Form, Button, Badge, Alert } from "react-bootstrap";

function FoodStorageCalculator() {
  const [inputs, setInputs] = useState({ 
    foodType: "", 
    storageMethod: "refrigerated", 
    temperature: "", 
    humidity: "moderate" 
  });
  const [result, setResult] = useState(null);

  const calculateStorage = () => {
    const temperature = parseFloat(inputs.temperature);
    
    if (isNaN(temperature) || !inputs.foodType) {
      return;
    }

    const storageGuidelines = {
      "dairy": { refrigerated: 4, frozen: -18, room: 20 },
      "meat": { refrigerated: 4, frozen: -18, room: "Not recommended" },
      "produce": { refrigerated: 4, frozen: -18, room: 18 },
      "grains": { refrigerated: 4, frozen: -18, room: 20 },
      "leftovers": { refrigerated: 4, frozen: -18, room: "Not recommended" }
    };

    const optimalTemp = storageGuidelines[inputs.foodType]?.[inputs.storageMethod];
    const details = [];
    let quality = "good";
    let message = "";

    details.push(`✓ Optimal temperature: ${optimalTemp}°C`);
    details.push(`✓ Current temperature: ${temperature}°C`);
    details.push(`✓ Storage method: ${inputs.storageMethod}`);
    details.push(`✓ Humidity level: ${inputs.humidity}`);

    if (temperature === optimalTemp) {
      details.push("✓ Temperature is optimal");
      quality = "good";
      message = "Storage conditions are OPTIMAL";
    } else if (Math.abs(temperature - optimalTemp) <= 2) {
      details.push("⚠ Temperature is slightly off");
      quality = "average";
      message = "Storage conditions are ACCEPTABLE";
    } else {
      details.push("✗ Temperature is not suitable");
      quality = "poor";
      message = "Storage conditions are SUBOPTIMAL";
    }

    if (inputs.humidity === "high" && inputs.foodType === "grains") {
      details.push("⚠ High humidity may cause mold growth");
      quality = "poor";
    }

    setResult({ quality, message, details });
  };

  const reset = () => {
    setInputs({ foodType: "", storageMethod: "refrigerated", temperature: "", humidity: "moderate" });
    setResult(null);
  };

  return (
    <Card>
      <Card.Header>
        <div className="d-flex align-items-center gap-2">
          <Calculator className="text-primary" style={{ width: '20px', height: '20px' }} />
          <h5 className="mb-0">Food Storage Calculator</h5>
        </div>
        <p className="text-muted small mb-0">
          Get optimal storage conditions for different food types
        </p>
      </Card.Header>
      <Card.Body>
        <div className="row g-4">
          <div className="col-md-6">
            <Form.Label htmlFor="storage-food-type">Food Type</Form.Label>
            <Form.Select
              id="storage-food-type"
              value={inputs.foodType}
              onChange={(e) => setInputs({ ...inputs, foodType: e.target.value })}
              data-testid="select-storage-food-type"
            >
              <option value="">Select food type</option>
              <option value="dairy">Dairy Products</option>
              <option value="meat">Meat & Poultry</option>
              <option value="produce">Fresh Produce</option>
              <option value="grains">Dry Grains</option>
              <option value="leftovers">Cooked Leftovers</option>
            </Form.Select>
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="storage-method">Storage Method</Form.Label>
            <Form.Select
              id="storage-method"
              value={inputs.storageMethod}
              onChange={(e) => setInputs({ ...inputs, storageMethod: e.target.value })}
              data-testid="select-storage-method"
            >
              <option value="refrigerated">Refrigerated</option>
              <option value="frozen">Frozen</option>
              <option value="room">Room Temperature</option>
            </Form.Select>
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="storage-temperature">Current Temperature (°C)</Form.Label>
            <Form.Control
              id="storage-temperature"
              type="number"
              step="0.5"
              min="-30"
              max="50"
              placeholder="e.g., 4"
              value={inputs.temperature}
              onChange={(e) => setInputs({ ...inputs, temperature: e.target.value })}
              data-testid="input-storage-temperature"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="storage-humidity">Humidity Level</Form.Label>
            <Form.Select
              id="storage-humidity"
              value={inputs.humidity}
              onChange={(e) => setInputs({ ...inputs, humidity: e.target.value })}
              data-testid="select-storage-humidity"
            >
              <option value="low">Low (40%)</option>
              <option value="moderate">Moderate (40-60%)</option>
              <option value="high">High (60%)</option>
            </Form.Select>
          </div>
        </div>

        <div className="d-flex gap-3 mt-4">
          <Button variant="primary" onClick={calculateStorage} data-testid="button-calculate-storage">
            Check Storage
          </Button>
          <Button variant="outline-secondary" onClick={reset} data-testid="button-reset-storage">
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
                  <span className="fw-semibold" data-testid="text-storage-quality">{result.message}</span>
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

export default FoodStorageCalculator;