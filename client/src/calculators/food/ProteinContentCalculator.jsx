import { useState } from "react";
import React from 'react';
import { Calculator, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card, Form, Button, Badge, Alert } from "react-bootstrap";

function ProteinContentCalculator() {
  const [foods, setFoods] = useState([{ name: "", quantity: 100, protein: 0 }]);
  const [dailyGoal, setDailyGoal] = useState(50);
  const [result, setResult] = useState(null);

  const calculateProteinContent = () => {
    const totalProtein = foods.reduce((sum, food) => {
      return sum + (parseFloat(food.protein) * parseInt(food.quantity) / 100 || 0);
    }, 0);

    const percentage = (totalProtein / dailyGoal) * 100;
    const details = [];
    let quality = "good";
    let message = "";

    details.push(`✓ Total protein: ${totalProtein.toFixed(1)}g`);
    details.push(`✓ Daily goal: ${dailyGoal}g (${percentage.toFixed(1)}%)`);

    if (percentage >= 80 && percentage <= 120) {
      quality = "good";
      message = "Protein intake is within optimal range";
    } else if (percentage >= 50 && percentage < 80) {
      quality = "average";
      message = "Protein intake is below optimal range";
    } else if (percentage > 120) {
      quality = "average";
      message = "Protein intake exceeds daily goal";
    } else {
      quality = "poor";
      message = "Protein intake is significantly low";
    }

    setResult({ quality, message, details, totalProtein });
  };

  const addFoodItem = () => {
    setFoods([...foods, { name: "", quantity: 100, protein: 0 }]);
  };

  const updateFoodItem = (index, field, value) => {
    const newFoods = [...foods];
    newFoods[index][field] = value;
    setFoods(newFoods);
  };

  const reset = () => {
    setFoods([{ name: "", quantity: 100, protein: 0 }]);
    setResult(null);
  };

  return (
    <Card>
      <Card.Header>
        <div className="d-flex align-items-center gap-2">
          <Calculator className="text-primary" style={{ width: '20px', height: '20px' }} />
          <h5 className="mb-0">Protein Content Calculator</h5>
        </div>
        <p className="text-muted small mb-0">
          Calculate protein content in meals and compare with dietary requirements
        </p>
      </Card.Header>
      <Card.Body>
        <div className="mb-3">
          <Form.Label htmlFor="protein-daily-goal">Daily Protein Goal (g)</Form.Label>
          <Form.Control
            id="protein-daily-goal"
            type="number"
            min="0"
            value={dailyGoal}
            onChange={(e) => setDailyGoal(parseInt(e.target.value) || 0)}
            data-testid="input-protein-daily-goal"
          />
        </div>

        {foods.map((food, index) => (
          <div key={index} className="row g-3 mb-3 align-items-end">
            <div className="col-md-4">
              <Form.Label>Food Name</Form.Label>
              <Form.Control
                type="text"
                value={food.name}
                onChange={(e) => updateFoodItem(index, 'name', e.target.value)}
                placeholder="e.g., Chicken breast"
              />
            </div>
            <div className="col-md-3">
              <Form.Label>Quantity (g)</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={food.quantity}
                onChange={(e) => updateFoodItem(index, 'quantity', e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <Form.Label>Protein per 100g (g)</Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="0.1"
                value={food.protein}
                onChange={(e) => updateFoodItem(index, 'protein', e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <Button variant="outline-danger" onClick={() => setFoods(foods.filter((_, i) => i !== index))}>
                Remove
              </Button>
            </div>
          </div>
        ))}

        <div className="d-flex gap-2 mb-4">
          <Button variant="outline-primary" onClick={addFoodItem}>
            Add Food Item
          </Button>
          <Button variant="primary" onClick={calculateProteinContent}>
            Calculate Protein
          </Button>
          <Button variant="outline-secondary" onClick={reset}>
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
                  <span className="fw-semibold" data-testid="text-protein-quality">{result.message}</span>
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

export default ProteinContentCalculator;