import { useState } from "react";
import React from 'react';
import { Pill, Calculator, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card, Form, Button, Badge, Alert } from "react-bootstrap";

function DrugDosageCalculator() {
  const [inputs, setInputs] = useState({ 
    patientWeight: "", 
    drugConcentration: "", 
    dosagePerKg: "", 
    frequency: "once"
  });
  const [result, setResult] = useState(null);

  const calculateDosage = () => {
    const weight = parseFloat(inputs.patientWeight);
    const concentration = parseFloat(inputs.drugConcentration);
    const dosage = parseFloat(inputs.dosagePerKg);

    if (isNaN(weight) || isNaN(concentration) || isNaN(dosage)) {
      return;
    }

    const totalDose = dosage * weight;
    const volume = totalDose / concentration;
    const details = [];
    let quality = "good";
    let message = "";

    details.push(`✓ Total dose required: ${totalDose.toFixed(2)} mg`);
    details.push(`✓ Volume to administer: ${volume.toFixed(2)} mL`);
    details.push(`✓ Based on weight: ${weight} kg`);
    details.push(`✓ Dosage frequency: ${inputs.frequency}`);

    if (totalDose <= 0 || volume <= 0) {
      quality = "poor";
      message = "Invalid dosage calculation - check input values";
    } else if (totalDose > 1000) {
      quality = "average";
      message = "High dosage - verify prescription and patient tolerance";
      details.push("⚠ Warning: High dosage detected");
    } else {
      quality = "good";
      message = "Dosage calculation completed successfully";
      details.push("✓ Dosage is within standard therapeutic range");
    }

    setResult({ quality, message, details, totalDose: totalDose.toFixed(2), volume: volume.toFixed(2) });
  };

  const reset = () => {
    setInputs({ patientWeight: "", drugConcentration: "", dosagePerKg: "", frequency: "once" });
    setResult(null);
  };

  return (
    <Card>
      <Card.Header>
        <div className="d-flex align-items-center gap-2">
          <Pill className="text-primary" style={{ width: '20px', height: '20px' }} />
          <h5 className="mb-0">Drug Dosage Calculator</h5>
        </div>
        <p className="text-muted small mb-0">
          Calculate safe medication dosage based on patient weight
        </p>
      </Card.Header>
      <Card.Body>
        <div className="row g-4">
          <div className="col-md-6">
            <Form.Label htmlFor="dosage-weight">Patient Weight (kg)</Form.Label>
            <Form.Control
              id="dosage-weight"
              type="number"
              step="0.1"
              min="1"
              max="300"
              placeholder="e.g., 70.5"
              value={inputs.patientWeight}
              onChange={(e) => setInputs({ ...inputs, patientWeight: e.target.value })}
              data-testid="input-dosage-weight"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="dosage-concentration">Drug Concentration (mg/mL)</Form.Label>
            <Form.Control
              id="dosage-concentration"
              type="number"
              step="0.1"
              min="0.1"
              max="500"
              placeholder="e.g., 50"
              value={inputs.drugConcentration}
              onChange={(e) => setInputs({ ...inputs, drugConcentration: e.target.value })}
              data-testid="input-dosage-concentration"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="dosage-per-kg">Dosage per kg (mg/kg)</Form.Label>
            <Form.Control
              id="dosage-per-kg"
              type="number"
              step="0.01"
              min="0.01"
              max="100"
              placeholder="e.g., 5.5"
              value={inputs.dosagePerKg}
              onChange={(e) => setInputs({ ...inputs, dosagePerKg: e.target.value })}
              data-testid="input-dosage-per-kg"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="dosage-frequency">Frequency</Form.Label>
            <Form.Select
              id="dosage-frequency"
              value={inputs.frequency}
              onChange={(e) => setInputs({ ...inputs, frequency: e.target.value })}
              data-testid="select-dosage-frequency"
            >
              <option value="once">Once daily</option>
              <option value="twice">Twice daily</option>
              <option value="three">Three times daily</option>
              <option value="four">Four times daily</option>
            </Form.Select>
          </div>
        </div>

        <div className="d-flex gap-3 mt-4">
          <Button variant="primary" onClick={calculateDosage} data-testid="button-calculate-dosage">
            Calculate Dosage
          </Button>
          <Button variant="outline-secondary" onClick={reset} data-testid="button-reset-dosage">
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
                  <span className="fw-semibold" data-testid="text-dosage-quality">{result.message}</span>
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

export default DrugDosageCalculator;