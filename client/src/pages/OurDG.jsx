import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import './OurDG.css';

const OurDG = () => {
  const dgProfiles = [
    {
      id: 1,
      name: "Dr. Talat Naseer Pasha",
      title: "Director General",
      period: "2024 - Till Date",
      honors: "Hilal-i-Imtiaz, Sitara-i-Imtiaz",
      image: "/pasha.JPG", // Make sure to add this image to your public folder
      description: "Dr. Talat Naseer Pasha is a distinguished professional with extensive experience in the field of agriculture and food sciences. His leadership has been instrumental in advancing PAFDA's mission."
    },
    {
      id: 2,
      name: "Dr. Muhammad Amjad",
      title: "Former Director General",
      period: "2023 - 2024",
      honors: " Tamgha-e-Imtiaz ",
      image: "/amjad.JPG", // Add placeholder image
      description: "Led the organization through significant growth and development phase, establishing key partnerships and programs."
    },
    {
      id: 3,
      name: "Dr. Muhammad Ashraf Tahir",
      title: "Founding Director General",
      period: "2016 - 2023",
      honors: "Pride of Performance, Sitara-i-Imtiaz",
      image: "/ashraf.JPG", // Add placeholder image
      description: "Established the foundation of PAFDA and set the strategic direction for the organization's growth and impact."
    }
  ];

  return (
    <div className="our-dg-page">
      {/* Hero Section */}
      <section className="dg-hero">
        <div className="dg-hero-overlay"></div>
        <Container>
          <h1 className="text-center text-white">Our Director Generals</h1>
        </Container>
      </section>

      {/* DG Profiles Section */}
      <section className="dg-profiles py-5">
        <Container>
          <Row className="justify-content-center">
            {dgProfiles.map((dg) => (
              <Col key={dg.id} lg={4} md={6} className="mb-4">
                <div className="dg-card">
                  <div className="dg-image-container">
                    <img 
                      src={dg.image} 
                      alt={dg.name} 
                      className="dg-profile-image"
                      onError={(e) => {
                        e.target.onerror = null; 
                        e.target.src = "/placeholder-dg.jpg"
                      }}
                    />
                  </div>
                  <div className="dg-info">
                    <h3>{dg.name}</h3>
                    <p className="dg-title">{dg.title}</p>
                    <p className="dg-period">{dg.period}</p>
                    <p className="dg-honors">{dg.honors}</p>
                    <p className="dg-description">{dg.description}</p>
                  </div>
                </div>
              </Col>
            ))}
          </Row>
        </Container>
      </section>
    </div>
  );
};

export default OurDG;