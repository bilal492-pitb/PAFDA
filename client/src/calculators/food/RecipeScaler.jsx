import { useState } from "react";
import React from 'react';
import { Calculator, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card, Form, Button, Badge, Alert } from "react-bootstrap";

function RecipeScaler() {
  const [originalServings, setOriginalServings] = useState(4);
  const [targetServings, setTargetServings] = useState(6);
  const [ingredients, setIngredients] = useState([{ name: "", quantity: 1, unit: "g" }]);
  const [result, setResult] = useState(null);

  const scaleRecipe = () => {
    const factor = targetServings / originalServings;
    const scaledIngredients = ingredients.map(ing => ({
      ...ing,
      scaledQuantity: (parseFloat(ing.quantity) * factor).toFixed(2)
    }));

    const details = [];
    details.push(`✓ Scaling factor: ${factor.toFixed(2)}x`);
    details.push(`✓ ${originalServings} servings → ${targetServings} servings`);

    scaledIngredients.forEach(ing => {
      details.push(`✓ ${ing.name}: ${ing.scaledQuantity} ${ing.unit}`);
    });

    let quality = "good";
    let message = `Recipe scaled successfully from ${originalServings} to ${targetServings} servings`;

    setResult({ quality, message, details, scaledIngredients });
  };

  const addIngredient = () => {
    setIngredients([...ingredients, { name: "", quantity: 1, unit: "g" }]);
  };

  const updateIngredient = (index, field, value) => {
    const newIngredients = [...ingredients];
    newIngredients[index][field] = value;
    setIngredients(newIngredients);
  };

  const reset = () => {
    setOriginalServings(4);
    setTargetServings(6);
    setIngredients([{ name: "", quantity: 1, unit: "g" }]);
    setResult(null);
  };

  return (
    <Card>
      <Card.Header>
        <div className="d-flex align-items-center gap-2">
          <Calculator className="text-primary" style={{ width: '20px', height: '20px' }} />
          <h5 className="mb-0">Recipe Scaler</h5>
        </div>
        <p className="text-muted small mb-0">
          Adjust ingredient quantities based on desired number of servings
        </p>
      </Card.Header>
      <Card.Body>
        <div className="row g-4 mb-4">
          <div className="col-md-6">
            <Form.Label htmlFor="recipe-original">Original Servings</Form.Label>
            <Form.Control
              id="recipe-original"
              type="number"
              min="1"
              value={originalServings}
              onChange={(e) => setOriginalServings(parseInt(e.target.value) || 1)}
              data-testid="input-original-servings"
            />
          </div>

          <div className="col-md-6">
            <Form.Label htmlFor="recipe-target">Target Servings</Form.Label>
            <Form.Control
              id="recipe-target"
              type="number"
              min="1"
              value={targetServings}
              onChange={(e) => setTargetServings(parseInt(e.target.value) || 1)}
              data-testid="input-target-servings"
            />
          </div>
        </div>

        {ingredients.map((ingredient, index) => (
          <div key={index} className="row g-3 mb-3 align-items-end">
            <div className="col-md-5">
              <Form.Label>Ingredient Name</Form.Label>
              <Form.Control
                type="text"
                value={ingredient.name}
                onChange={(e) => updateIngredient(index, 'name', e.target.value)}
                placeholder="e.g., Flour"
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
                placeholder="e.g., 500"
              />
            </div>
            <div className="col-md-2">
              <Form.Label>Unit</Form.Label>
              <Form.Control
                type="text"
                value={ingredient.unit}
                onChange={(e) => updateIngredient(index, 'unit', e.target.value)}
                placeholder="e.g., g"
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
          <Button variant="primary" onClick={scaleRecipe}>
            Scale Recipe
          </Button>
          <Button variant="outline-secondary" onClick={reset}>
            Reset
          </Button>
        </div>

        {result && (
          <Alert variant="success" className="mt-4">
            <div className="d-flex align-items-start gap-3">
              <CheckCircle className="flex-shrink-0 mt-1" style={{ width: '20px', height: '20px' }} />
              <div className="flex-grow-1">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="fw-semibold" data-testid="text-recipe-scaled">{result.message}</span>
                  <Badge bg="success">SCALED</Badge>
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

export default RecipeScaler;