import { useState } from "react";
import React from 'react';
import { Calculator, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card, Form, Button, Badge, Alert } from "react-bootstrap";

function WaterActivityCalculator() {
  const [inputs, setInputs] = useState({ 
    foodType: "", 
    moistureContent: "", 
    dissolvedSolids: "" 
  });
  const [result, setResult] = useState(null);

  const calculateWaterActivity = () => {
    const moistureContent = parseFloat(inputs.moistureContent);
    const dissolvedSolids = parseFloat(inputs.dissolvedSolids);

    if (isNaN(moistureContent) || isNaN(dissolvedSolids) || !inputs.foodType) {
      return;
    }

    // Simplified water activity calculation
    const aw = moistureContent / (moistureContent + dissolvedSolids);
    
    const details = [];
    let quality = "good";
    let message = "";

    details.push(`✓ Water activity (aw): ${aw.toFixed(3)}`);
    details.push(`✓ Moisture content: ${moistureContent}g`);
    details.push(`✓ Dissolved solids: ${dissolvedSolids}g`);

    if (aw <= 0.6) {
      details.push("✓ Microbial growth inhibited - Shelf stable");
      quality = "good";
      message = "Water activity is LOW - Food is shelf stable";
    } else if (aw <= 0.85) {
      details.push("⚠ Some mold growth possible - Requires careful handling");
      quality = "average";
      message = "Water activity is MODERATE - Limited shelf life";
    } else {
      details.push("✗ High microbial risk - Requires refrigeration");
      quality = "poor";
      message = "Water activity is HIGH - Perishable food";
    }

    if (aw > 0.9) {
      details.push("✗ Potential bacterial growth risk");
    }

    setResult({ quality, message, details, aw: aw.toFixed(3) });
  };

  const reset = () => {
    setInputs({ foodType: "", moistureContent: "", dissolvedSolids: "" });
    setResult(null);
  };

  return (
    <Card>
      <Card.Header>
        <div className="d-flex align-items-center gap-2">
          <Calculator className="text-primary" style={{ width: '20px', height: '20px' }} />
          <h5 className="mb-0">Water Activity Calculator</h5>
        </div>
        <p className="text-muted small mb-0">
          Calculate water activity for microbial safety assessment
        </p>
      </Card.Header>
      <Card.Body>
        <div className="row g-4">
          <div className="col-md-6">
            <Form.Label htmlFor="water-food-type">Food Type</Form.Label>
            <Form.Select
              id="water-food-type"
              value={inputs.foodType}
              onChange={(e) => setInputs({ ...inputs, foodType: e.target.value })}
              data-testid="select-water-food-type"
            >
              <option value="">Select food type</option>
              <option value="dried">Dried Foods</option>
              <option value="intermediate">Intermediate Moisture</option>
              <option value="high-moisture">High Moisture Foods</option>
              <option value="beverages">Beverages</option>
            </Form.Select>
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="water-moisture">Moisture Content (g/100g)</Form.Label>
            <Form.Control
              id="water-moisture"
              type="number"
              step="0.1"
              min="0"
              max="100"
              placeholder="e.g., 75.5"
              value={inputs.moistureContent}
              onChange={(e) => setInputs({ ...inputs, moistureContent: e.target.value })}
              data-testid="input-water-moisture"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="water-solids">Dissolved Solids (g/100g)</Form.Label>
            <Form.Control
              id="water-solids"
              type="number"
              step="0.1"
              min="0"
              max="100"
              placeholder="e.g., 24.5"
              value={inputs.dissolvedSolids}
              onChange={(e) => setInputs({ ...inputs, dissolvedSolids: e.target.value })}
              data-testid="input-water-solids"
            />
          </div>
        </div>

        <div className="d-flex gap-3 mt-4">
          <Button variant="primary" onClick={calculateWaterActivity} data-testid="button-calculate-water">
            Calculate Water Activity
          </Button>
          <Button variant="outline-secondary" onClick={reset} data-testid="button-reset-water">
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
                  <span className="fw-semibold" data-testid="text-water-quality">{result.message}</span>
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

export default WaterActivityCalculator;