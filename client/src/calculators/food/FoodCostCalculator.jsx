import { useState } from "react";
import React from 'react';
import { Calculator, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card, Form, Button, Badge, Alert } from "react-bootstrap";

function FoodCostCalculator() {
  const [ingredients, setIngredients] = useState([{ name: "", quantity: 1, unitCost: 0 }]);
  const [servings, setServings] = useState(4);
  const [result, setResult] = useState(null);

  const calculateFoodCost = () => {
    const totalCost = ingredients.reduce((sum, ingredient) => {
      return sum + (parseFloat(ingredient.quantity) * parseFloat(ingredient.unitCost) || 0);
    }, 0);

    const costPerServing = totalCost / servings;
    const details = [];
    let quality = "good";
    let message = "";

    details.push(`✓ Total recipe cost: $${totalCost.toFixed(2)}`);
    details.push(`✓ Cost per serving: $${costPerServing.toFixed(2)}`);
    details.push(`✓ Number of servings: ${servings}`);

    if (costPerServing <= 2) {
      quality = "good";
      message = "Recipe is COST-EFFECTIVE";
    } else if (costPerServing <= 5) {
      quality = "average";
      message = "Recipe has moderate cost";
    } else {
      quality = "poor";
      message = "Recipe is expensive per serving";
    }

    setResult({ quality, message, details, totalCost, costPerServing });
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: 1, unitCost: 0 }]);
  };

  const updateIngredient = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const reset = () => {
    setIngredients([{ name: "", quantity: 1, unitCost: 0 }]);
    setServings(4);
    setResult(null);
  };

  return (
    <Card>
      <Card.Header>
        <div className="d-flex align-items-center gap-2">
          <Calculator className="text-primary" style={{ width: '20px', height: '20px' }} />
          <h5 className="mb-0">Food Cost Calculator</h5>
        </div>
        <p className="text-muted small mb-0">
          Calculate cost per serving and total cost for recipes
        </p>
      </Card.Header>
      <Card.Body>
        <div className="mb-3">
          <Form.Label htmlFor="cost-servings">Number of Servings</Form.Label>
          <Form.Control
            id="cost-servings"
            type="number"
            min="1"
            value={servings}
            onChange={(e) => setServings(parseInt(e.target.value) || 1)}
            data-testid="input-cost-servings"
          />
        </div>

        {ingredients.map((ingredient, index) => (
          <div key={index} className="row g-3 mb-3 align-items-end">
            <div className="col-md-4">
              <Form.Label>Ingredient Name</Form.Label>
              <Form.Control
                type="text"
                value={ingredient.name}
                onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                placeholder="e.g., Chicken"
              />
            </div>
            <div className="col-md-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                min="0.01"
                step="0.01"
                value={ingredient.quantity}
                onChange={(e) => updateIngredient(index, 'quantity', e.target.value)}
                placeholder="e.g., 1.5"
              />
            </div>
            <div className="col-md-3">
              <Form.Label>Unit Cost ($)</Form.Label>
              <Form.Control
                type="number"
                min="0"
                step="0.01"
                value={ingredient.unitCost}
                onChange={(e) => updateIngredient(index, 'unitCost', e.target.value)}
                placeholder="e.g., 5.99"
              />
            </div>
            <div className="col-md-2">
              <Button variant="outline-danger" onClick={() => setIngredients(ingredients.filter((_, i) => i !== index))}>
                Remove
              </Button>
            </div>
          </div>
        ))}

        <div className="d-flex gap-2 mb-4">
          <Button variant="outline-primary" onClick={addIngredient}>
            Add Ingredient
          </Button>
          <Button variant="primary" onClick={calculateFoodCost}>
            Calculate Cost
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
                  <span className="fw-semibold" data-testid="text-cost-quality">{result.message}</span>
                  <Badge bg={result.quality === 'good' ? 'success' : result.quality == 'average' ? 'warning' : 'danger'}>
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

export default FoodCostCalculator;