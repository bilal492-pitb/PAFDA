import React from 'react';
import { Target, Eye, Award, Users, TrendingUp, Globe } from "lucide-react";
import { Card, CardContent } from "../components/ui/card.jsx";
// Bootstrap CSS is imported in index.css

export default function About() {
  const values = [
    {
      icon: Target,
      title: "Our Mission",
      description: "To provide high standards of quality, accredited assurance and performance in testing of drugs, food and agriculture products through state-of-the-art facilities and expert scientific staff.",
    },
    {
      icon: Eye,
      title: "Our Vision",
      description: "By 2035, PAFDA will be a globally recognized authority in conformance and compliance assessment, providing critical services across food, pharmaceuticals, agriculture, feed, and cosmetics.",
    },
    {
      icon: Award,
      title: "Quality Assurance",
      description: "Maintaining international standards and best practices in laboratory testing, ensuring consumer safety and export competitiveness for Punjab's products.",
    },
    {
      icon: Users,
      title: "Expert Team",
      description: "Our scientists are trained according to international standards, continuously upgrading their skills to provide the most reliable testing services.",
    },
    {
      icon: TrendingUp,
      title: "Continuous Growth",
      description: "Committed to modernization of laboratories, foreign exchange savings, and alignment with global best practices from 2025 to 2035.",
    },
    {
      icon: Globe,
      title: "National Impact",
      description: "A provincial flagship project with national impact, setting an example for excellence and innovation in testing infrastructure across Pakistan.",
    },
  ];

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Hero Banner */}
      <section className="position-relative" style={{height: '300px'}}>
        <div className="position-absolute top-0 start-0 w-100 h-100 z-0">
          <img
            src="https://images.unsplash.com/photo-1532187643603-ba119ca4109e?w=1920&h=600&fit=crop"
            alt="About PAFDA"
            className="w-100 h-100 object-fit-cover"
          />
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient" style={{background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.5))'}} />
        </div>

        <div className="position-relative z-10 text-center text-white mx-auto px-4" style={{maxWidth: '64rem'}}>
          <h1 className="display-1 fw-bold mb-4" data-testid="text-page-title">About Us</h1>
          <p className="fs-4 text-white-90">
            Setting Standards for Food, Drug & Agriculture Excellence
          </p>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-5 bg-light">
        <div className="container" style={{maxWidth: '64rem'}}>
          <div className="text-muted space-y-4">
            <p className="fs-5" style={{lineHeight: '1.7'}}>
              The Punjab Agriculture, Food & Drug Authority (PAFDA) is envisioned as a provincial flagship project with national impact. By 2035, PAFDA will be a globally recognized authority in conformance and compliance assessment, providing critical services across food, pharmaceuticals, agriculture, feed, and cosmetics.
            </p>

            <p className="fs-5" style={{lineHeight: '1.7'}}>
              This strategy outlines PAFDA's journey from 2025 to 2035, emphasizing a fully functional and state-of-the-art main lab and modernization of laboratories, foreign exchange savings, export competitiveness, consumer safety, and alignment with global best practices. The roadmap positions Punjab as a leader within Pakistan with global testing outreach, setting an example for excellence and innovation in testing and conformance certification infrastructure.
            </p>

            <p className="fs-5" style={{lineHeight: '1.7'}}>
              The Authority will be established under the Punjab Agriculture, Food and Drug Act, 2024, and will operate as an autonomous body with a Board of Governors chaired by the Chief Secretary of Punjab. This governance structure ensures accountability and strategic oversight while maintaining operational independence.
            </p>

            <p className="fs-5" style={{lineHeight: '1.7'}}>
              PAFDA's establishment represents a significant step towards enhancing Pakistan's testing capabilities, reducing dependency on foreign testing services, and ensuring the safety and quality of products for both domestic consumption and export markets.
            </p>
          </div>
        </div>
      </section>

      {/* Values Grid */}
      <section className="py-5 bg-white">
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge bg-primary text-uppercase fw-semibold">Our Core Values</span>
            <h2 className="display-5 fw-semibold mt-3 mb-4">
              What Drives Us Forward
            </h2>
          </div>

          <div className="row g-4">
            {values.map((value, index) => (
              <div className="col-md-6 col-lg-4" key={index}>
                <div className="card h-100 shadow-sm transition-all duration-300 hover-shadow">
                  <div className="card-body p-4">
                    <div className="h-12 w-12 rounded bg-primary bg-opacity-10 d-flex align-items-center justify-content-center mb-3">
                      <value.icon className="text-primary" style={{width: '24px', height: '24px'}} />
                    </div>
                    <h3 className="h5 fw-semibold">{value.title}</h3>
                    <p className="small text-muted" style={{lineHeight: '1.6'}}>
                      {value.description}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Project Details */}
      <section className="py-5 bg-light">
        <div className="container">
          <div className="text-center mb-5">
            <span className="badge bg-primary text-uppercase fw-semibold">Infrastructure</span>
            <h2 className="display-5 fw-semibold mt-3 mb-4">
              PAFDA Project Complex
            </h2>
            <p className="text-muted mx-auto" style={{maxWidth: '32rem'}}>
              Establishment of a new complex for Punjab Agriculture, Food & Drug Authority containing three (03) labs on 64 kanals of land near Thokar Niaz Baig Flyover, Lahore.
            </p>
          </div>

          <div className="row g-4">
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body p-4">
                  <div className="rounded bg-light bg-opacity-5 d-flex align-items-center justify-content-center mb-4" style={{height: '192px'}}>
                    <div className="text-center">
                      <div className="text-5xl text-primary mb-2">56,160</div>
                      <div className="small text-muted">Square Feet</div>
                    </div>
                  </div>
                  <h3 className="h5 fw-semibold">Agriculture Lab</h3>
                  <p className="small text-muted">
                    State-of-the-art facility for testing pesticides and fertilizers with advanced equipment and methodologies.
                  </p>
                </div>
              </div>
            </div>

            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body p-4">
                  <div className="rounded bg-light bg-opacity-5 d-flex align-items-center justify-content-center mb-4" style={{height: '192px'}}>
                    <div className="text-center">
                      <div className="text-5xl text-primary mb-2">55,260</div>
                      <div className="small text-muted">Square Feet</div>
                    </div>
                  </div>
                  <h3 className="h5 fw-semibold">Food Lab</h3>
                  <p className="small text-muted">
                    Comprehensive testing facility for raw and processed foods, ensuring safety and quality standards.
                  </p>
                </div>
              </div>
            </div>
            <div className="col-md-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body p-4">
                  <div className="rounded bg-light bg-opacity-5 d-flex align-items-center justify-content-center mb-4" style={{height: '192px'}}>
                    <div className="text-center">
                      <div className="text-5xl text-primary mb-2">55,320</div>
                      <div className="small text-muted">Square Feet</div>
                    </div>
                  </div>
                  <h3 className="h5 fw-semibold">Drug Lab</h3>
                  <p className="small text-muted">
                    Advanced pharmaceutical testing laboratory for human and veterinary medicines.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
