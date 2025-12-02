import { useState } from "react";
import React from 'react';
import { Calculator, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card, Form, Button, Badge, Alert } from "react-bootstrap";

function AllergenRiskAssessment() {
  const [ingredients, setIngredients] = useState("");
  const [allergens, setAllergens] = useState([]);
  const [result, setResult] = useState(null);
  
  const allergenList = [
    "Milk", "Eggs", "Fish", "Shellfish", "Tree Nuts", 
    "Peanuts", "Wheat", "Soybeans", "Sesame", "Mustard"
  ];

  const toggleAllergen = (allergen) => {
    setAllergens(prev => 
      prev.includes(allergen) 
        ? prev.filter(a => a !== allergen)
        : [...prev, allergen]
    );
  };

  const assessAllergenRisk = () => {
    if (!ingredients.trim() || allergens.length === 0) {
      return;
    }

    const ingredientList = ingredients.toLowerCase().split(',').map(i => i.trim());
    const details = [];
    let quality = "good";
    let message = "";

    const foundAllergens = allergens.filter(allergen => {
      const allergenLower = allergen.toLowerCase();
      return ingredientList.some(ing => ing.includes(allergenLower) || 
        (allergenLower === "milk" && ing.includes("dairy")) ||
        (allergenLower === "peanuts" && ing.includes("groundnut"))
      );
    });

    if (foundAllergens.length === 0) {
      details.push("✓ No major allergens detected");
      quality = "good";
      message = "LOW allergen risk - Safe for most consumers";
    } else {
      foundAllergens.forEach(allergen => {
        details.push(`✗ CONTAINS: ${allergen}`);
      });
      quality = "poor";
      message = `HIGH allergen risk - Contains ${foundAllergens.length} major allergen(s)`;
    }

    setResult({ quality, message, details, foundAllergens });
  };

  const reset = () => {
    setIngredients("");
    setAllergens([]);
    setResult(null);
  };

  return (
    <Card>
      <Card.Header>
        <div className="d-flex align-items-center gap-2">
          <Calculator className="text-primary" style={{ width: '20px', height: '20px' }} />
          <h5 className="mb-0">Allergen Risk Assessment</h5>
        </div>
        <p className="text-muted small mb-0">
          Identify potential allergen risks in food products
        </p>
      </Card.Header>
      <Card.Body>
        <div className="mb-4">
          <Form.Label htmlFor="allergen-ingredients">Product Ingredients (comma-separated)</Form.Label>
          <Form.Control
            id="allergen-ingredients"
            as="textarea"
            rows={3}
            placeholder="e.g., Milk, Wheat flour, Eggs, Sugar"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
            data-testid="textarea-allergen-ingredients"
          />
        </div>

        <div className="mb-4">
          <Form.Label>Check for Allergens:</Form.Label>
          <div className="row g-2">
            {allergenList.map(allergen => (
              <div key={allergen} className="col-md-6">
                <Form.Check
                  type="checkbox"
                  id={`allergen-${allergen.toLowerCase().replace(/\s+/g, '-')}`}
                  label={allergen}
                  checked={allergens.includes(allergen)}
                  onChange={() => toggleAllergen(allergen)}
                  data-testid={`checkbox-allergen-${allergen.toLowerCase().replace(/\s+/g, '-')}`}
                />
              </div>
            ))}
          </div>
        </div>

        <div className="d-flex gap-3 mt-4">
          <Button variant="primary" onClick={assessAllergenRisk} data-testid="button-assess-allergens">
            Assess Allergen Risk
          </Button>
          <Button variant="outline-secondary" onClick={reset} data-testid="button-reset-allergens">
            Reset
          </Button>
        </div>

        {result && (
          <Alert variant={result.quality === 'good' ? 'success' : 'danger'} className="mt-4">
            <div className="d-flex align-items-start gap-3">
              {result.quality === 'good' ? (
                <CheckCircle className="flex-shrink-0 mt-1" style={{ width: '20px', height: '20px' }} />
              ) : (
                <AlertCircle className="flex-shrink-0 mt-1" style={{ width: '20px', height: '20px' }} />
              )}
              <div className="flex-grow-1">
                <div className="d-flex align-items-center gap-2 mb-2">
                  <span className="fw-semibold" data-testid="text-allergen-quality">{result.message}</span>
                  <Badge bg={result.quality === 'good' ? 'success' : 'danger'}>
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

export default AllergenRiskAssessment;