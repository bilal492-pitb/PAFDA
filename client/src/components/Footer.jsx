import { Link } from "wouter";
import React from 'react';
import { Mail, Phone, MapPin, Facebook, Twitter, Linkedin } from "lucide-react";
import { Container, Row, Col } from 'react-bootstrap';

export default function Footer() {
  return (
    <footer className="bg-light border-top mt-auto">
      <Container className="py-5">
        <Row>
          {/* About Section */}
          <Col md={3} className="mb-4">
            <div className="d-flex align-items-center gap-3 mb-3">
              <div className="d-flex align-items-center justify-content-center rounded-circle bg-primary" style={{ width: '48px', height: '48px' }}>
                <span className="text-white fw-bold fs-4">P</span>
              </div>
              <div>
                <h3 className="fs-5 fw-bold mb-0">PAFDA</h3>
                <p className="small text-muted mb-0">Punjab Agriculture, Food & Drug Authority</p>
              </div>
            </div>
            <p className="small text-muted">
              Science for Safety, Innovation for Health. Setting Standards for Food, Drug & Agriculture Excellence.
            </p>
          </Col>

          {/* Quick Links */}
          <Col md={3} className="mb-4">
            <h4 className="small fw-semibold text-uppercase mb-3">Quick Links</h4>
            <ul className="list-unstyled">
              {[
                { title: "Home", href: "/" },
                { title: "About Us", href: "/about" },
                { title: "News & Highlights", href: "/news" },
                { title: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.href} className="mb-2">
                  <Link href={link.href} className="text-decoration-none">
                    <span className="text-secondary cursor-pointer small" data-testid={`link-footer-${link.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      {link.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Services */}
          <Col md={3} className="mb-4">
            <h4 className="small fw-semibold text-uppercase mb-3">Services</h4>
            <ul className="list-unstyled">
              {[
                { title: "Agriculture Testing", href: "/agriculture" },
                { title: "Food Testing", href: "/food" },
                { title: "Drug Testing", href: "/drug" },
                { title: "Quality Calculators", href: "/tools" },
              ].map((link) => (
                <li key={link.href} className="mb-2">
                  <Link href={link.href} className="text-decoration-none">
                    <span className="text-secondary cursor-pointer small" data-testid={`link-footer-${link.title.toLowerCase().replace(/\s+/g, '-')}`}>
                      {link.title}
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </Col>

          {/* Contact Info */}
          <Col md={3} className="mb-4">
            <h4 className="small fw-semibold text-uppercase mb-3">Contact</h4>
            <ul className="list-unstyled">
              <li className="d-flex align-items-start gap-3 mb-3">
                <MapPin className="text-primary flex-shrink-0 mt-1" style={{ width: '20px', height: '20px' }} />
                <span className="small text-muted">
                  Near Thokar Niaz Baig Flyover, Lahore, Punjab, Pakistan
                </span>
              </li>
              <li className="d-flex align-items-center gap-3 mb-3">
                <Phone className="text-primary flex-shrink-0" style={{ width: '20px', height: '20px' }} />
                <span className="small text-muted">+92 (042) 111-PAFDA</span>
              </li>
              <li className="d-flex align-items-center gap-3 mb-3">
                <Mail className="text-primary flex-shrink-0" style={{ width: '20px', height: '20px' }} />
                <span className="small text-muted">info@pafda.gop.pk</span>
              </li>
            </ul>
            <div className="d-flex gap-3 pt-2">
              <a href="https://www.facebook.com/profile.php?id=61574167736174" className="d-flex align-items-center justify-content-center rounded-circle bg-secondary text-white text-decoration-none" style={{ width: '36px', height: '36px' }} data-testid="link-social-facebook">
                <Facebook style={{ width: '16px', height: '16px' }} />
              </a>
              <a href="https://www.youtube.com/@pafdaofficial" className="d-flex align-items-center justify-content-center rounded-circle bg-secondary text-white text-decoration-none" style={{ width: '36px', height: '36px' }} data-testid="link-social-twitter">
                <Twitter style={{ width: '16px', height: '16px' }} />
              </a>
              <a href="https://www.linkedin.com/company/punjab-agriculture-food-and-drug-authority/posts/?feedView=all" className="d-flex align-items-center justify-content-center rounded-circle bg-secondary text-white text-decoration-none" style={{ width: '36px', height: '36px' }} data-testid="link-social-linkedin">
                <Linkedin style={{ width: '16px', height: '16px' }} />
              </a>
            </div>
          </Col>
        </Row>
      </Container>

      <Container>
        <div className="mt-4" style={{ width: '35%', height: 'auto' }}>
          <img src="/pafda1.png" alt="" style={{ width: '35%', height: 'auto' }} />
        </div>
      </Container>

      {/* Copyright Bar */}
      <div className="border-top mt-4 pt-4 bg-primary">
        <Container>
          <p className="text-center small text-white mb-0">
            © {new Date().getFullYear()} Punjab Agriculture, Food & Drug Authority. All rights reserved.
          </p>
        </Container>
      </div>
    </footer>
  );
}