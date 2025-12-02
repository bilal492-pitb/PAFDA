import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Button, Card, Badge, Alert, Carousel } from 'react-bootstrap';
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import { Microscope, Leaf, Pill, ArrowRight, TestTube } from "lucide-react";
import ServiceCard from "../components/ServiceCard.jsx";
import NewsCard from "../components/NewsCard.jsx";
import MessageCard from "../components/MessageCard.jsx";

export default function Home() {
  const { data: newsArticles, isLoading: newsLoading, error: newsError } = useQuery({
    queryKey: ["/api/news"],
    queryFn: () => fetch("/api/news").then(res => res.json()),
  });

  const services = [
    {
      title: "Agriculture Lab",
      description: "Laboratory for testing agriculture inputs: pesticides and fertilizers. We ensure quality and safety of agricultural products through comprehensive testing.",
      icon: Leaf,
      href: "/agriculture",
      imageUrl: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&h=600&fit=crop",
    },
    {
      title: "Food Lab",
      description: "Laboratory for testing foods, raw food and processed food. Comprehensive analysis for food safety, nutritional content, and quality assurance.",
      icon: TestTube,
      href: "/food",
      imageUrl: "https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=800&h=600&fit=crop",
    },
    {
      title: "Drug Lab",
      description: "Laboratory for testing medicines and drugs both for human consumption and veterinary purpose. Ensuring pharmaceutical safety and efficacy.",
      icon: Pill,
      href: "/drug",
      imageUrl: "https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=800&h=600&fit=crop",
    },
  ];

  const slides = [
    {
      title: 'Science for Safety, Innovation for Health',
      description: 'Ensuring quality and safety in food, agriculture, and pharmaceuticals',
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=1920&h=1080&fit=crop',
      buttonText: 'Learn More About Us',
      buttonHref: '/about'
    },
    {
      title: 'Advanced Testing Facilities',
      description: 'State-of-the-art laboratories for comprehensive analysis',
      image: 'https://images.unsplash.com/photo-1532187863486-abf9dbad1b69?w=1920&h=1080&fit=crop',
      buttonText: 'Our Services',
      buttonHref: '/services'
    },
    {
      title: 'Research & Development',
      description: 'Leading innovation in food and drug safety standards',
      image: 'https://images.unsplash.com/photo-1584308666744-24d5c474f2ae?w=1920&h=1080&fit=crop',
      buttonText: 'Contact Us',
      buttonHref: '/contact'
    }
  ];

  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Hero Section */}
      <section className="position-relative min-vh-100 d-flex align-items-center justify-content-center overflow-hidden">
        <div className="position-absolute top-0 start-0 w-100 h-50 z-1">
          <Carousel
            fade
            controls={true}
            indicators={true}
            interval={5000}
            nextIcon={
              <span
                aria-hidden="true"
                className="carousel-control-next-icon"
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708z'/%3e%3c/svg%3e")`,
                  filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.3))',
                  position: 'absolute',
                  right: '1.5rem',
                  top: '50%',
                  marginTop: '15rem',
                  transform: 'translateY(-50%)',
                }}
              />
            }
            prevIcon={
              <span
                aria-hidden="true"
                className="carousel-control-prev-icon"
                style={{
                  width: '2.5rem',
                  height: '2.5rem',
                  backgroundImage: `url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 16 16' fill='%23fff'%3e%3cpath d='M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0z'/%3e%3c/svg%3e")`,
                  filter: 'drop-shadow(0 0 8px rgba(0,0,0,0.3))',
                  position: 'absolute',
                  left: '1.5rem',
                  top: '50%',
                  marginTop: '15rem',
                  transform: 'translateY(-50%)',
                }}
              />
            }
            className="h-100"
          >
            {slides.map((slide, index) => (
              <Carousel.Item key={index} className="h-100">
                <div
                  className="w-100 h-100"
                  style={{
                    backgroundImage: `url(${slide.image})`,
                    backgroundSize: 'cover',
                    backgroundPosition: 'center',
                    height: '100%',
                    minHeight: '100vh',
                  }}
                >
                  <div className="position-absolute top-0 start-0 w-100 h-100" style={{
                    background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.5))'
                  }} />
                  <div className="position-relative z-10 h-100 d-flex align-items-center justify-content-center">
                    <div className="text-center text-white px-4" style={{ maxWidth: '64rem' }}>
                      <div className="d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill mb-4" style={{
                        backgroundColor: 'hsl(var(--primary) / 0.2)',
                        backdropFilter: 'blur(8px)',
                        border: '1px solid rgba(255,255,255,0.2)'
                      }}>
                        <Microscope style={{ width: '20px', height: '20px' }} />
                        <span className="fw-medium">Testing, Training, Research & Development Organisation</span>
                      </div>
                      <h1 className="display-1 fw-bold mb-4" data-testid="text-hero-title">
                        {slide.title}
                      </h1>
                      <p className="fs-5 mb-5 mx-auto text-white-90" style={{ maxWidth: '32rem' }}>
                        {slide.description}
                      </p>
                      <div className="d-flex flex-wrap gap-3 justify-content-center">
                        <Link href={slide.buttonHref} className="btn btn-primary btn-lg">
                          {slide.buttonText}
                          <ArrowRight className="ms-2" style={{ width: '20px', height: '20px' }} />
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>

        {/* Remove the duplicate content that was outside the carousel */}
        {/* <div className="position-relative z-10 text-center text-white mx-auto px-4" style={{ maxWidth: '64rem' }}>
          <div className="d-inline-flex align-items-center gap-2 px-4 py-2 rounded-pill" style={{ backgroundColor: 'hsl(var(--primary) / 0.2)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}>
            <Microscope style={{ width: '20px', height: '20px' }} />
            <span className="fw-medium">Testing, Training, Research & Development Organisation</span>
          </div>
          <h1 className="display-1 fw-bold mb-4" data-testid="text-hero-title">
            Science for Safety,
            <br />
            Innovation for Health
          </h1>

          <p className="fs-5 mb-5 mx-auto text-white-90" style={{ maxWidth: '32rem' }}>
            Being a highly sophisticated lab, PAFDA has a mandate to do research and development in the area of food, agriculture inputs, pharma and allied areas as a main activity.
          </p>

          <div className="d-flex flex-wrap gap-3 justify-content-center">
            <Link href="/about" className="btn btn-primary btn-lg" data-testid="button-learn-more">
              Learn More About Us
              <ArrowRight className="ms-2" style={{ width: '20px', height: '20px' }} />
            </Link>
            <Link href="/tools" className="btn btn-outline-light btn-lg" style={{ backgroundColor: 'rgba(255,255,255,0.1)', borderColor: 'rgba(255,255,255,0.3)' }} data-testid="button-quality-tools">
              Quality Testing Tools
            </Link>
          </div>
        </div> */}
      </section>

      {/* About Preview Section */}
      <section className="py-5 bg-light">
        <Container>
          <Row className="align-items-center">
            <Col lg={6} className="mb-4 mb-lg-0">
              <Badge bg="primary" className="text-uppercase mb-3">About PAFDA</Badge>
              <h2 className="display-5 fw-bold mb-4" data-testid="text-about-title">
                Setting Standards for Food, Drug & Agriculture Excellence
              </h2>
              <p className="text-muted mb-4">
                The Punjab Agriculture, Food & Drug Authority (PAFDA) is envisioned as a provincial flagship project with national impact. By 2035, PAFDA will be a globally recognized authority in conformance and compliance assessment, providing critical services across food, pharmaceuticals, agriculture, feed, and cosmetics.
              </p>
              <p className="text-muted mb-4">
                This strategy outlines PAFDA's journey from 2025 to 2035, emphasizing a fully functional and state-of-the-art main lab and modernization of laboratories, foreign exchange savings, export competitiveness, consumer safety, and alignment with global best practices.
              </p>
              <Link href="/about" className="btn btn-primary" data-testid="button-read-full-about">
                Read Full Story
                <ArrowRight className="ms-2" style={{ width: '16px', height: '16px' }} />
              </Link>
            </Col>

            <Col lg={6}>
              <img
                src="/pafdalab.JPG"
                alt="PAFDA Laboratory"
                className="img-fluid rounded shadow"
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Services Section */}
      <section className="py-5 bg-white">
        <Container>
          <div className="text-center mb-5">
            <Badge bg="primary" className="text-uppercase">Our Services</Badge>
            <h2 className="display-5 fw-bold mt-3 mb-4">
              Three Specialized Laboratories
            </h2>
            <p className="text-muted mx-auto" style={{ maxWidth: '32rem' }}>
              State-of-the-art testing facilities ensuring the safety and quality of agriculture, food, and pharmaceutical products.
            </p>
          </div>

          <Row className="g-4">
            {services.map((service) => (
              <Col lg={4} key={service.title}>
                <ServiceCard {...service} />
              </Col>
            ))}
          </Row>
        </Container>
      </section>

      {/* News & Highlights Section */}
      <section className="py-5 bg-light">
        <Container>
          <div className="d-flex justify-content-between align-items-end mb-5">
            <div>
              <Badge bg="primary" className="text-uppercase">Latest Updates</Badge>
              <h2 className="display-5 fw-bold mt-3">
                News & Highlights
              </h2>
            </div>
            <Link href="/news" className="btn btn-outline-primary" data-testid="button-view-all-news">
              View All News
              <ArrowRight className="ms-2" style={{ width: '16px', height: '16px' }} />
            </Link>
          </div>

          {newsLoading ? (
            <Row className="g-4">
              {[...Array(3)].map((_, i) => (
                <Col lg={4} key={i}>
                  <div className="placeholder-glow">
                    <div className="placeholder bg-secondary rounded" style={{ height: '200px', width: '100%' }}></div>
                    <div className="placeholder bg-secondary rounded mt-3" style={{ height: '24px', width: '75%' }}></div>
                    <div className="placeholder bg-secondary rounded mt-2" style={{ height: '16px', width: '100%' }}></div>
                    <div className="placeholder bg-secondary rounded mt-2" style={{ height: '16px', width: '66%' }}></div>
                  </div>
                </Col>
              ))}
            </Row>
          ) : newsError ? (
            <div className="text-center py-5">
              <p className="text-muted">Failed to load news articles. Please try again later.</p>
            </div>
          ) : newsArticles && newsArticles.length > 0 ? (
            <Row className="g-4">
              {newsArticles.slice(0, 3).map((item) => (
                <Col lg={4} key={item.slug}>
                  <NewsCard {...item} />
                </Col>
              ))}
            </Row>
          ) : (
            <div className="text-center py-5">
              <p className="text-muted">No news articles available at the moment.</p>
            </div>
          )}
        </Container>
      </section>

      {/* Leadership Messages Section */}
      <section className="py-5 bg-white">
        <Container>
          <div className="text-center mb-5">
            <Badge bg="primary" className="text-uppercase">Leadership</Badge>
            <h2 className="display-5 fw-bold mt-3">
              Message from Our Leaders
            </h2>
          </div>

          <Row className="g-4">
            <Col lg={6}>
              <MessageCard
                name="Dr. Talat Naseer Pasha"
                title="Director General (Hilal-i-Imtiaz, Sitara-i-Imtiaz)"
                imageUrl="/pasha.JPG"
                message="As the Director General of PAFDA, I am proud to lead an organization dedicated to ensuring the safety and quality of food, drugs, and agricultural products in Punjab. Our state-of-the-art laboratories and highly skilled team are committed to upholding the highest standards of testing and research, protecting public health and promoting consumer confidence."
              />
            </Col>
            <Col lg={6}>
              <MessageCard
                name="Miss. Sidrah Unis"
                title="Project Director"
                imageUrl="/sidra.JPG"
                message="As the Project Director of PAFDA, I emphasise the paramount importance of ensuring the safety and quality of public life in our province. By conducting comprehensive food, drug, and agriculture testing, we can evaluate products for their nutritive and safety values. Our commitment is resolute in safeguarding the health and well-being of our citizens through robust testing practices and adherence to global standards."
              />
            </Col>
          </Row>
        </Container>
      </section>

      {/* Project Stats Section */}
      <section className="py-5 bg-primary text-white text-primary-foreground">
        <Container>
          <div className="text-center mb-5">
            <h2 className="display-5 fw-bold mb-4">
              PAFDA Project Overview
            </h2>
            <p className="text-white-90 mx-auto" style={{ maxWidth: '48rem' }}>
              Establishment of a new complex for Punjab Agriculture, Food & Drug Authority containing three (03) labs on 64 kanals of land near Thokar Niaz Baig Flyover, Lahore.
            </p>
          </div>

          <Row className="g-4">
            <Col md={6} lg={3}>
              <Card className="bg-white bg-opacity-10 border-white border-opacity-20">
                <Card.Body className="text-center p-4">
                  <div className="fs-1 fw-bold mb-2">319,925</div>
                  <div className="small text-white-80">Total Area (Sft)</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="bg-white bg-opacity-10 border-white border-opacity-20">
                <Card.Body className="text-center p-4">
                  <div className="fs-1 fw-bold mb-2">56,160</div>
                  <div className="small text-white-80">Agriculture Lab (Sft)</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="bg-white bg-opacity-10 border-white border-opacity-20">
                <Card.Body className="text-center p-4">
                  <div className="fs-1 fw-bold mb-2">55,260</div>
                  <div className="small text-white-80">Food Lab (Sft)</div>
                </Card.Body>
              </Card>
            </Col>
            <Col md={6} lg={3}>
              <Card className="bg-white bg-opacity-10 border-white border-opacity-20">
                <Card.Body className="text-center p-4">
                  <div className="fs-1 fw-bold mb-2">55,320</div>
                  <div className="small text-white-80">Drug Lab (Sft)</div>
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </section>
    </div>
  );
}