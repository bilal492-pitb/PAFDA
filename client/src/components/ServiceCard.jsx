import React from 'react';
import { Link } from "wouter";
import { Card, Button } from 'react-bootstrap';
import { ArrowRight } from 'lucide-react';

export default function ServiceCard({ title, description, icon: Icon, href, imageUrl }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <Card className="h-100 shadow-sm" 
      onMouseEnter={() => setHovered(true)} 
      onMouseLeave={() => setHovered(false)}
      style={{ transition: 'transform 0.3s, box-shadow 0.3s' }}>
      <div className="position-relative overflow-hidden" style={{ height: '200px' }}>
        <Card.Img 
          src={imageUrl} 
          alt={title}
          className="h-100 w-100"
          style={{ 
            objectFit: 'cover', 
            transform: hovered ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 0.3s'
          }} 
        />
        <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient-to-top from-black/60 to-transparent" />
        <div className="position-absolute top-0 start-0 m-3 rounded-circle bg-primary bg-opacity-90 d-flex align-items-center justify-content-center" 
          style={{ width: '48px', height: '48px', backdropFilter: 'blur(4px)' }}>
          <Icon className="text-white" style={{ width: '24px', height: '24px' }} />
        </div>
      </div>
      <Card.Body className="p-4">
        <h3 className="h5 fw-semibold mb-3" data-testid={`text-service-${title.toLowerCase().replace(/\s+/g, '-')}`}>
          {title}
        </h3>
        <p className="text-muted small mb-4" style={{ 
          display: '-webkit-box', 
          WebkitLineClamp: 3, 
          WebkitBoxOrient: 'vertical', 
          overflow: 'hidden' 
        }}>
          {description}
        </p>
        <Link href={href} className="text-decoration-none">
          <Button variant="outline-primary" className="w-100" data-testid={`button-learn-more-${title.toLowerCase().replace(/\s+/g, '-')}`}>
            Learn More
          </Button>
        </Link>
      </Card.Body>
    </Card>
  );
}