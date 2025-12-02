import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { Quote } from "lucide-react";

export default function MessageCard({ name, title, imageUrl, message }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <Card className="h-100">
      <Card.Body className="p-4 p-md-5">
        <Row className="flex-column flex-md-row g-4">
          <Col xs="auto">
            <div style={{ width: '128px', height: '128px' }}>
              <Card.Img
                src={imageUrl}
                alt={name}
                className="rounded border border-secondary w-100 h-100"
                style={{ 
                  filter: hovered ? 'grayscale(0%)' : 'grayscale(100%)',
                  transition: 'filter 0.3s'
                }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
              />
            </div>
          </Col>
          <Col>
            <div className="mb-3">
              <h3 className="h5 fw-bold mb-0" data-testid={`text-name-${name.toLowerCase().replace(/\s+/g, '-')}`}>
                {name}
              </h3>
              <p className="small fw-medium text-primary mb-0">{title}</p>
            </div>
            <div className="position-relative">
              <Quote className="position-absolute text-muted" style={{ top: '-8px', left: '-8px', width: '32px', height: '32px', opacity: 0.2 }} />
              <p className="small text-muted ps-4" style={{ lineHeight: 1.6 }}>
                {message}
              </p>
            </div>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
}