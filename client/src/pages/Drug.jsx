import { Pill, TestTube, Shield, CheckCircle, Microscope, FlaskConical } from "lucide-react";
import { Link } from "wouter";
import { Card, CardContent, CardHeader, CardTitle } from "../components/ui/card.jsx";
import { Badge } from "../components/ui/badge.jsx";
import { Button } from "../components/ui/button.jsx";
import React from 'react';

export default function Drug() {
  const services = [
    {
      icon: TestTube,
      title: "Drug Quality Testing",
      description: "Comprehensive analysis of active pharmaceutical ingredients, excipients, and formulation quality.",
    },
    {
      icon: FlaskConical,
      title: "Dissolution Testing",
      description: "Evaluation of drug release profiles and bioavailability to ensure therapeutic effectiveness.",
    },
    {
      icon: Shield,
      title: "Stability Testing",
      description: "Assessment of drug stability under various storage conditions to determine shelf life and storage requirements.",
    },
    {
      icon: Microscope,
      title: "Contaminant Analysis",
      description: "Detection of impurities, heavy metals, and microbial contamination in pharmaceutical products.",
    },
  ];

  const features = [
    "HPLC and UPLC for drug analysis",
    "UV-Vis spectrophotometry equipment",
    "Dissolution apparatus for multiple tablets",
    "pH meters and conductivity meters",
    "WHO-GMP compliant testing procedures",
    "Expert pharmaceutical analysts",
  ];

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Hero Banner */}
      <section className="position-relative" style={{height: '300px'}}>
        <div className="position-absolute top-0 start-0 w-100 h-100 z-0">
          <img
            src="https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1920&h=600&fit=crop"
            alt="Drug Laboratory"
            className="w-100 h-100"
            style={{objectFit: 'cover'}}
          />
          <div className="position-absolute top-0 start-0 w-100 h-100" style={{background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.5))'}} />
        </div>

        <div className="position-relative z-10 text-center text-white mx-auto px-4" style={{maxWidth: '64rem'}}>
          <div className="d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill" style={{backgroundColor: 'hsl(var(--primary) / 0.2)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)'}}>
            <Pill style={{width: '20px', height: '20px'}} />
            <span className="fw-medium small">Pharmaceutical Testing Laboratory</span>
          </div>
          <h1 className="display-1 fw-bold mb-4" data-testid="text-page-title">Drug Lab</h1>
          <p className="fs-4 text-white-90">
            55,320 sq ft of Advanced Testing Facilities
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="row align-items-center mb-5">
            <div className="col-lg-6 mb-4 mb-lg-0">
              <img
                src="https://images.unsplash.com/photo-1585435557343-3b092031a831?w=800&h=600&fit=crop"
                alt="Drug Lab Equipment"
                className="img-fluid rounded shadow"
              />
            </div>
            <div className="col-lg-6">
              <div className="mb-4">
                <h2 className="display-5 fw-semibold">
                  Ensuring Pharmaceutical Safety & Efficacy
                </h2>
                <p className="text-muted" style={{lineHeight: '1.7'}}>
                  Our Drug Laboratory is dedicated to testing medicines and pharmaceuticals for both human and veterinary use. We ensure that all medications meet stringent quality, safety, and efficacy standards.
                </p>
                <p className="text-muted" style={{lineHeight: '1.7'}}>
                  Equipped with advanced analytical instruments, our laboratory performs comprehensive testing including assay determination, dissolution studies, impurity profiling, and stability testing. We follow WHO-GMP guidelines and international pharmacopeial standards.
                </p>
                <Link href="/tools" className="btn btn-primary btn-lg" data-testid="button-use-calculators">
                  Use Our Drug Testing Calculators
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
                    <div className="card h-100 shadow-sm">
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