import React, { useState } from "react";  // Added React import here
import { Card, Form, Button, Alert, Badge } from "react-bootstrap";
import { CheckCircle, AlertCircle } from "lucide-react";

function FoodCalorieCounter() {
  const [foods, setFoods] = useState([{ name: "", quantity: 1, calories: 0 }]);
  const [totalCalories, setTotalCalories] = useState(0);
  const [dailyGoal, setDailyGoal] = useState(2000);

  const calculateTotalCalories = () => {
    const total = foods.reduce((sum, food) => {
      return sum + (parseFloat(food.calories) * parseInt(food.quantity) || 0);
    }, 0);
    setTotalCalories(total);
  };

  const addFoodItem = () => {
    setFoods([...foods, { name: "", quantity: 1, calories: 0 }]);
  };

  const updateFoodItem = (index, field, value) => {
    const newFoods = [...foods];
    newFoods[index][field] = value;
    setFoods(newFoods);
  };

  const removeFoodItem = (index) => {
    const newFoods = foods.filter((_, i) => i !== index);
    setFoods(newFoods);
  };

  const getCalorieStatus = () => {
    const percentage = (totalCalories / dailyGoal) * 100;
    if (percentage < 70) return { status: "Good", variant: "success", message: "You're under your daily goal" };
    if (percentage < 100) return { status: "Moderate", variant: "warning", message: "Approaching daily limit" };
    return { status: "High", variant: "danger", message: "You've exceeded your daily goal" };
  };

  const status = getCalorieStatus();

  return (
    <Card>
      <Card.Header>
        <div className="d-flex align-items-center gap-2">
          <div className="bg-primary bg-opacity-10 p-2 rounded-circle">
            <div className="text-primary">🍎</div>
          </div>
          <div>
            <h5 className="mb-0">Food Calorie Counter</h5>
            <small className="text-muted">Track your daily calorie intake</small>
          </div>
        </div>
      </Card.Header>
      <Card.Body>
        <div className="mb-3">
          <Form.Label>Daily Calorie Goal</Form.Label>
          <Form.Control
            type="number"
            value={dailyGoal}
            onChange={(e) => setDailyGoal(parseInt(e.target.value) || 0)}
            min="0"
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
                placeholder="e.g., Apple"
              />
            </div>
            <div className="col-md-3">
              <Form.Label>Quantity</Form.Label>
              <Form.Control
                type="number"
                min="1"
                value={food.quantity}
                onChange={(e) => updateFoodItem(index, 'quantity', e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <Form.Label>Calories (per unit)</Form.Label>
              <Form.Control
                type="number"
                min="0"
                value={food.calories}
                onChange={(e) => updateFoodItem(index, 'calories', e.target.value)}
              />
            </div>
            <div className="col-md-2">
              <Button variant="outline-danger" onClick={() => removeFoodItem(index)}>
                Remove
              </Button>
            </div>
          </div>
        ))}

        <div className="d-flex gap-2 mb-4">
          <Button variant="outline-primary" onClick={addFoodItem}>
            Add Food Item
          </Button>
          <Button variant="primary" onClick={calculateTotalCalories}>
            Calculate Total
          </Button>
        </div>

        {totalCalories > 0 && (
          <Alert variant={status.variant} className="mt-3">
            <div className="d-flex align-items-start gap-3">
              {status.variant === 'success' ? (
                <CheckCircle className="flex-shrink-0 mt-1" style={{ width: '20px', height: '20px' }} />
              ) : (
                <AlertCircle className="flex-shrink-0 mt-1" style={{ width: '20px', height: '20px' }} />
              )}
              <div>
                <div className="d-flex align-items-center gap-2">
                  <h5 className="mb-1">Total Calories: {totalCalories}</h5>
                  <Badge bg={status.variant}>{status.status}</Badge>
                </div>
                <p className="mb-0">{status.message}</p>
                <div className="progress mt-2" style={{ height: '10px' }}>
                  <div
                    className={`progress-bar bg-${status.variant}`}
                    role="progressbar"
                    style={{ width: `${Math.min(100, (totalCalories / dailyGoal) * 100)}%` }}
                    aria-valuenow={totalCalories}
                    aria-valuemin="0"
                    aria-valuemax={dailyGoal}
                  ></div>
                </div>
                <div className="d-flex justify-content-between mt-1 small text-muted">
                  <span>0 cal</span>
                  <span>{dailyGoal} cal</span>
                </div>
              </div>
            </div>
          </Alert>
        )}
      </Card.Body>
    </Card>
  );
}

export default FoodCalorieCounter;