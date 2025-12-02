import { useState } from "react";
import React from 'react';
import { Apple, Leaf, Pill, Calculator, CheckCircle, AlertCircle, Info } from "lucide-react";
import { Card, Form, Button, Badge, Alert, Tabs, Tab, Accordion } from "react-bootstrap";

import MilkAnalysisCalculator from '../calculators/food/MilkAnalysisCalculator';
import HoneyPurityCalculator from '../calculators/food/HoneyPurityCalculator';
import FoodCalorieCounter from '../calculators/food/FoodCalorieCounter';
import SugarContentAnalyzer from '../calculators/food/SugarContentAnalyzer';
import FoodShelfLifePredictor from '../calculators/food/FoodShelfLifePredictor';
import ProteinContentCalculator from '../calculators/food/ProteinContentCalculator';
import FoodCostCalculator from '../calculators/food/FoodCostCalculator';
import RecipeScaler from '../calculators/food/RecipeScaler';
import FoodStorageCalculator from '../calculators/food/FoodStorageCalculator';
import AllergenRiskAssessment from '../calculators/food/AllergenRiskAssessment';
import FoodPhAnalyzer from '../calculators/food/FoodPhAnalyzer';
import WaterActivityCalculator from '../calculators/food/WaterActivityCalculator';
import BrixAcidRatioCalculator from '../calculators/food/BrixAcidRatioCalculator';
import PhLevelCalculator from '../calculators/drug/PhLevelCalculator';
import TabletDissolutionCalculator from '../calculators/drug/TabletDissolutionCalculator';
import ActiveIngredientAssay from '../calculators/drug/ActiveIngredientAssay';
import DrugStabilityChecker from '../calculators/drug/DrugStabilityChecker';
import TabletHardnessCalculator from '../calculators/drug/TabletHardnessCalculator';
import DrugDosageCalculator from '../calculators/drug/DrugDosageCalculator';
import DissolutionTimeEstimator from '../calculators/drug/DissolutionTimeEstimator';
// Agriculture Calculators
import SoilPhAnalyzer from '../calculators/agriculture/SoilPhAnalyzer';
import FertilizerMixCalculator from '../calculators/agriculture/FertilizerMixCalculator';
import PesticideDilutionCalculator from '../calculators/agriculture/PesticideDilutionCalculator';
import CropMaturityIndexCalculator from '../calculators/agriculture/CropMaturityIndexCalculator';
import IrrigationWaterQuality from '../calculators/agriculture/IrrigationWaterQuality';
// Keep existing imports for compatibility
import FertilizerAnalysisCalculator from '../calculators/agriculture/FertilizerAnalysisCalculator';
import PesticideResidueCalculator from '../calculators/agriculture/PesticideResidueCalculator';

export default function UsefulTools() {
  // const { toast } = useToast(); // Add this here
  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Hero Banner */}
      <section className="position-relative" style={{height: '300px'}}>
        <div className="position-absolute top-0 start-0 w-100 h-100">
          <img
            src="https://images.unsplash.com/photo-1532094349884-543bc11b234d?w=1920&h=600&fit=crop"
            alt="Quality Testing Tools"
            className="w-100 h-100"
            style={{objectFit: 'cover'}}
          />
          <div className="position-absolute top-0 start-0 w-100 h-100" style={{background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.5))'}} />
        </div>

        <div className="position-relative z-10 text-center text-white mx-auto px-4" style={{maxWidth: '64rem'}}>
          <div className="d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill" style={{backgroundColor: 'hsl(var(--primary) / 0.2)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)'}}>
            <Calculator style={{width: '20px', height: '20px'}} />
            <span className="fw-medium small">Quality Testing Calculators</span>
          </div>
          <h1 className="display-1 fw-bold mb-4" data-testid="text-page-title">Useful Tools</h1>
          <p className="fs-4 text-white-90">
            Professional quality testing calculators for Food, Agriculture, and Drug analysis
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-5 bg-light">
        <div className="container">
          <Alert variant="info" className="mb-4">
            <div className="d-flex align-items-start gap-2">
              <Info style={{width: '20px', height: '20px'}} className="flex-shrink-0 mt-1" />
              <p className="mb-0 small">
                These calculators provide quick quality assessments based on standard parameters. For official testing and certification, please contact PAFDA laboratories.
              </p>
            </div>
          </Alert>

          <Tabs defaultActiveKey="food" className="mb-4">
            <Tab eventKey="food" title={<span className="d-flex align-items-center gap-1"><Apple style={{width: '16px', height: '16px'}} /><span className="d-none d-sm-inline">Food Testing</span></span>}>
              <Accordion defaultActiveKey={null} alwaysOpen>
                <div className="row g-4">
                  {[
                    { component: MilkAnalysisCalculator, title: "Milk Quality Analysis", eventKey: "0" },
                    { component: HoneyPurityCalculator, title: "Honey Purity Test", eventKey: "1" },
                    { component: FoodCalorieCounter, title: "Food Calorie Counter", eventKey: "2" },
                    { component: SugarContentAnalyzer, title: "Sugar Content Analyzer", eventKey: "3" },
                    { component: FoodShelfLifePredictor, title: "Food Shelf Life Predictor", eventKey: "4" },
                    { component: ProteinContentCalculator, title: "Protein Content Calculator", eventKey: "5" },
                    { component: FoodCostCalculator, title: "Food Cost Calculator", eventKey: "6" },
                    { component: RecipeScaler, title: "Recipe Scaler", eventKey: "7" },
                    { component: FoodStorageCalculator, title: "Food Storage Calculator", eventKey: "8" },
                    { component: AllergenRiskAssessment, title: "Allergen Risk Assessment", eventKey: "9" },
                    { component: FoodPhAnalyzer, title: "Food pH Analyzer", eventKey: "10" },
                    { component: WaterActivityCalculator, title: "Water Activity Calculator", eventKey: "11" },
                    { component: BrixAcidRatioCalculator, title: "Brix/Acid Ratio Calculator", eventKey: "12" }
                  ].map((calc, index) => (
                    <div key={index} className="col-lg-6">
                      <Accordion.Item eventKey={calc.eventKey}>
                        <Accordion.Header>
                          <div className="d-flex align-items-center gap-2">
                            <Calculator className="text-primary" style={{ width: '20px', height: '20px' }} />
                            <span className="fw-semibold">{calc.title}</span>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <calc.component />
                        </Accordion.Body>
                      </Accordion.Item>
                    </div>
                  ))}
                </div>
              </Accordion>
            </Tab>


            
            <Tab eventKey="agriculture" title={<span className="d-flex align-items-center gap-1"><Leaf style={{width: '16px', height: '16px'}} /><span className="d-none d-sm-inline">Agriculture</span></span>}>
              <Accordion defaultActiveKey={null} alwaysOpen>
                <div className="row g-4">
                  {[
                    { component: SoilPhAnalyzer, title: "Soil pH Analyzer", eventKey: "0" },
                    { component: FertilizerMixCalculator, title: "Fertilizer Mix Ratio Calculator", eventKey: "1" },
                    { component: PesticideDilutionCalculator, title: "Pesticide Dilution Calculator", eventKey: "2" },
                    { component: CropMaturityIndexCalculator, title: "Crop Maturity Index Calculator", eventKey: "3" },
                    { component: IrrigationWaterQuality, title: "Irrigation Water Quality Analyzer", eventKey: "4" },
                    // Keep existing calculators for compatibility
                    { component: FertilizerAnalysisCalculator, title: "Fertilizer Analysis Calculator", eventKey: "5" },
                    { component: PesticideResidueCalculator, title: "Pesticide Residue Calculator", eventKey: "6" }
                  ].map((calc, index) => (
                    <div key={index} className="col-lg-6">
                      <Accordion.Item eventKey={calc.eventKey}>
                        <Accordion.Header>
                          <div className="d-flex align-items-center gap-2">
                            <Calculator className="text-primary" style={{ width: '20px', height: '20px' }} />
                            <span className="fw-semibold">{calc.title}</span>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <calc.component />
                        </Accordion.Body>
                      </Accordion.Item>
                    </div>
                  ))}
                </div>
              </Accordion>
            </Tab>

             <Tab eventKey="drug" title={<span className="d-flex align-items-center gap-1"><Pill style={{width: '16px', height: '16px'}} /><span className="d-none d-sm-inline">Drug Testing</span></span>}>
              <Accordion defaultActiveKey={null} alwaysOpen>
                <div className="row g-4">
                  {[
                    { component: TabletHardnessCalculator, title: "Tablet Hardness Calculator", eventKey: "0" },
                    { component: DrugDosageCalculator, title: "Drug Dosage Calculator", eventKey: "1" },
                    { component: DissolutionTimeEstimator, title: "Dissolution Time Estimator", eventKey: "2" },
                    { component: DrugStabilityChecker, title: "Drug Stability Checker", eventKey: "3" },
                    { component: ActiveIngredientAssay, title: "Active Ingredient Assay Calculator", eventKey: "4" },
                    // Keep existing calculators for compatibility
                    { component: TabletDissolutionCalculator, title: "Tablet Dissolution Calculator", eventKey: "5" },
                    { component: PhLevelCalculator, title: "pH Level Calculator", eventKey: "6" }
                  ].map((calc, index) => (
                    <div key={index} className="col-lg-6">
                      <Accordion.Item eventKey={calc.eventKey}>
                        <Accordion.Header>
                          <div className="d-flex align-items-center gap-2">
                            <Calculator className="text-primary" style={{ width: '20px', height: '20px' }} />
                            <span className="fw-semibold">{calc.title}</span>
                          </div>
                        </Accordion.Header>
                        <Accordion.Body>
                          <calc.component />
                        </Accordion.Body>
                      </Accordion.Item>
                    </div>
                  ))}
                </div>
              </Accordion>
            </Tab>
          </Tabs>
        </div>
      </section>
    </div>
  );
}