import React from 'react';
import { Leaf, TestTube, Shield, CheckCircle, Microscope, FlaskConical } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { Button } from "../components/ui/button.jsx";

export default function Agriculture() {
  const services = [
    {
      icon: TestTube,
      title: "Pesticide Testing",
      description: "Comprehensive analysis of pesticide residues, active ingredients, and formulation quality to ensure agricultural safety standards.",
    },
    {
      icon: FlaskConical,
      title: "Fertilizer Analysis",
      description: "Testing of NPK values, micronutrients, and quality parameters to verify fertilizer composition and effectiveness.",
    },
    {
      icon: Shield,
      title: "Quality Assurance",
      description: "Verification of agricultural inputs against national and international quality standards for farmer protection.",
    },
    {
      icon: Microscope,
      title: "Contaminant Detection",
      description: "Advanced testing for heavy metals, adulterants, and harmful substances in agricultural products.",
    },
  ];

  const features = [
    "Advanced chromatography equipment for pesticide analysis",
    "Atomic absorption spectroscopy for heavy metal detection",
    "NIR spectroscopy for rapid quality assessment",
    "Microbiology lab for pathogen testing",
    "ISO/IEC 17025 accredited procedures",
    "Expert agricultural chemists and technicians",
  ];

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Hero Banner */}
      <section className="position-relative" style={{height: '300px'}}>
        <div className="position-absolute top-0 start-0 w-100 h-100 z-0">
          <img
            src="https://images.unsplash.com/photo-1625246333195-78d9c38ad1b49?w=1920&h=600&fit=crop"
            alt="Agriculture Laboratory"
            className="w-100 h-100"
            style={{objectFit: 'cover'}}
          />
          <div className="position-absolute top-0 start-0 w-100 h-100" style={{background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.5))'}} />
        </div>

        <div className="position-relative z-10 text-center text-white mx-auto px-4" style={{maxWidth: '64rem'}}>
          <div className="d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill bg-primary" style={{backgroundColor: 'hsl(var(--primary) / 0.2)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)'}}>
            <Leaf style={{width: '20px', height: '20px'}} />
            <span className="fw-medium small">Agriculture Testing Laboratory</span>
          </div>
          <h1 className="display-1 fw-bold mb-4" data-testid="text-page-title">Agriculture Lab</h1>
          <p className="fs-4 text-white-90">
            56,160 sq ft of Advanced Testing Facilities
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img
                src="https://images.unsplash.com/photo-1574943320219-553eb213f72d?w=800&h=600&fit=crop"
                alt="Agriculture Lab Equipment"
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-lg-6">
              <div className="mb-4">
                <h2 className="display-5 fw-semibold">
                  Ensuring Agricultural Safety & Quality
                </h2>
                <p className="text-muted" style={{lineHeight: '1.7'}}>
                  Our Agriculture Laboratory is equipped with state-of-the-art testing facilities to analyze pesticides and fertilizers. We ensure that agricultural inputs meet the highest quality standards, protecting farmers and consumers alike.
                </p>
                <p className="text-muted" style={{lineHeight: '1.7'}}>
                  The laboratory performs comprehensive testing including chemical composition analysis, residue detection, quality verification, and compliance assessment against regulatory standards. Our expert team uses advanced analytical techniques to provide accurate and reliable results.
                </p>
                <Link href="/tools" className="btn btn-primary btn-lg" data-testid="button-use-calculators">
                  Use Our Testing Calculators
                </Link>
              </div>
            </div>
          </div>

          {/* Services Grid */}
          <div className="mb-5">
            <h3 className="display-6 fw-semibold mb-4 text-center">Our Testing Services</h3>
            <div className="row g-4">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <div className="col-md-6" key={index}>
                    <div className="card h-100 shadow-sm transition-all duration-300">
                      <div className="card-body p-4">
                        <div className="d-flex align-items-center justify-content-center mb-3" style={{width: '48px', height: '48px', backgroundColor: 'hsl(var(--primary) / 0.1)', borderRadius: '12px'}}>
                          <Icon className="text-primary" style={{width: '24px', height: '24px'}} />
                        </div>
                        <h4 className="h5 fw-semibold">{service.title}</h4>
                        <p className="small text-muted" style={{lineHeight: '1.6'}}>
                          {service.description}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Features List */}
          <div className="bg-white rounded p-4 p-md-5 shadow-sm">
            <h3 className="display-6 fw-semibold mb-4">Laboratory Capabilities</h3>
            <div className="row g-3">
              {features.map((feature, index) => (
                <div className="col-md-6" key={index}>
                  <div className="d-flex align-items-start gap-3">
                    <CheckCircle className="text-primary flex-shrink-0 mt-1" style={{width: '24px', height: '24px'}} />
                    <span className="text-muted">{feature}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}