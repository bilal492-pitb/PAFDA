import { useState } from "react";
import React from 'react';
import { Leaf, Calculator, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card, Form, Button, Badge, Alert } from "react-bootstrap";

function IrrigationWaterQuality() {
  const [inputs, setInputs] = useState({ 
    ec: "", 
    ph: "", 
    sodium: "", 
    chloride: "", 
    waterSource: "" 
  });
  const [result, setResult] = useState(null);

  const analyzeWaterQuality = () => {
    const ec = parseFloat(inputs.ec);
    const ph = parseFloat(inputs.ph);
    const sodium = parseFloat(inputs.sodium);
    const chloride = parseFloat(inputs.chloride);

    if (isNaN(ec) || isNaN(ph) || isNaN(sodium) || isNaN(chloride)) {
      return;
    }

    const details = [];
    let quality = "good";
    let message = "";

    details.push(`✓ Electrical Conductivity: ${ec.toFixed(2)} dS/m`);
    details.push(`✓ pH: ${ph.toFixed(2)}`);
    details.push(`✓ Sodium: ${sodium.toFixed(2)} meq/L`);
    details.push(`✓ Chloride: ${chloride.toFixed(2)} meq/L`);

    // Water quality criteria
    if (ec <= 0.7) {
      details.push("✓ Salinity is low - suitable for all crops");
    } else if (ec <= 2.0) {
      details.push("⚠ Moderate salinity - may affect sensitive crops");
      quality = "average";
    } else {
      details.push("✗ High salinity - requires salt-tolerant crops or leaching");
      quality = "poor";
    }

    if (ph >= 6.5 && ph <= 8.0) {
      details.push("✓ pH is optimal");
    } else {
      details.push("⚠ pH is outside optimal range");
      quality = quality === "good" ? "average" : quality;
    }

    if (sodium <= 3.0) {
      details.push("✓ Sodium level is acceptable");
    } else if (sodium <= 9.0) {
      details.push("⚠ Moderate sodium - monitor soil sodicity");
      quality = quality === "good" ? "average" : quality;
    } else {
      details.push("✗ High sodium - risk of soil structure degradation");
      quality = "poor";
    }

    if (chloride <= 4.0) {
      details.push("✓ Chloride level is acceptable");
    } else {
      details.push("⚠ High chloride - may be toxic to sensitive crops");
      quality = quality === "good" ? "average" : quality;
    }

    if (quality === "good") {
      message = "Water quality is SUITABLE for irrigation";
    } else if (quality === "average") {
      message = "Water is MODERATELY suitable - monitor regularly";
    } else {
      message = "Water quality is POOR - requires treatment";
    }

    setResult({ quality, message, details });
  };

  const reset = () => {
    setInputs({ ec: "", ph: "", sodium: "", chloride: "", waterSource: "" });
    setResult(null);
  };

  return (
    <Card>
      <Card.Header>
        <div className="d-flex align-items-center gap-2">
          <Leaf className="text-primary" style={{ width: '20px', height: '20px' }} />
          <h5 className="mb-0">Irrigation Water Quality Analyzer</h5>
        </div>
        <p className="text-muted small mb-0">
          Test water suitability for irrigation and identify potential risks
        </p>
      </Card.Header>
      <Card.Body>
        <div className="row g-4">
          <div className="col-md-6">
            <Form.Label htmlFor="water-ec">Electrical Conductivity (dS/m)</Form.Label>
            <Form.Control
              id="water-ec"
              type="number"
              step="0.01"
              min="0"
              max="10"
              placeholder="e.g., 1.2"
              value={inputs.ec}
              onChange={(e) => setInputs({ ...inputs, ec: e.target.value })}
              data-testid="input-water-ec"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="water-ph">pH Value</Form.Label>
            <Form.Control
              id="water-ph"
              type="number"
              step="0.1"
              min="4.0"
              max="10.0"
              placeholder="e.g., 7.5"
              value={inputs.ph}
              onChange={(e) => setInputs({ ...inputs, ph: e.target.value })}
              data-testid="input-water-ph"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="water-sodium">Sodium (meq/L)</Form.Label>
            <Form.Control
              id="water-sodium"
              type="number"
              step="0.1"
              min="0"
              max="50"
              placeholder="e.g., 4.5"
              value={inputs.sodium}
              onChange={(e) => setInputs({ ...inputs, sodium: e.target.value })}
              data-testid="input-water-sodium"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="water-chloride">Chloride (meq/L)</Form.Label>
            <Form.Control
              id="water-chloride"
              type="number"
              step="0.1"
              min="0"
              max="50"
              placeholder="e.g., 3.0"
              value={inputs.chloride}
              onChange={(e) => setInputs({ ...inputs, chloride: e.target.value })}
              data-testid="input-water-chloride"
            />
          </div>

          <div className="col-md-12">
            <Form.Label htmlFor="water-source">Water Source</Form.Label>
            <Form.Select
              id="water-source"
              value={inputs.waterSource}
              onChange={(e) => setInputs({ ...inputs, waterSource: e.target.value })}
              data-testid="select-water-source"
            >
              <option value="">Select water source</option>
              <option value="well">Groundwater Well</option>
              <option value="river">River/Stream</option>
              <option value="canal">Irrigation Canal</option>
              <option value="recycled">Recycled Water</option>
            </Form.Select>
          </div>
        </div>

        <div className="d-flex gap-3 mt-4">
          <Button variant="primary" onClick={analyzeWaterQuality} data-testid="button-analyze-water-quality">
            Analyze Water Quality
          </Button>
          <Button variant="outline-secondary" onClick={reset} data-testid="button-reset-water-quality">
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

export default IrrigationWaterQuality;