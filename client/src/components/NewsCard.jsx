import React from 'react';
import { Link } from "wouter";
import { Card, Badge } from 'react-bootstrap';
import { Calendar, ArrowRight } from 'lucide-react';

export default function NewsCard({ title, excerpt, imageUrl, date, slug }) {
  const [hovered, setHovered] = React.useState(false);

  return (
    <Card className="h-100 shadow-sm d-flex flex-column"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}>
      <div className="position-relative over overflow-hidden" style={{ height: '200px' }}>
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
        <Badge bg="primary" className="position-absolute top-0 end-0 m-3 bg-opacity-90" style={{ backdropFilter: 'blur(4px)' }}>
          <Calendar style={{ width: '12px', height: '12px', marginRight: '4px' }} />
          {date}
        </Badge>
      </div>
      <Card.Body className="p-4 d-flex flex-column flex-grow-1">
        <h4 className="h6 fw-semibold mb-2" style={{ 
          display: '-webkit-box', 
          WebkitLineClamp: 2, 
          WebkitBoxOrient: 'vertical', 
          overflow: 'hidden' 
        }} data-testid={`text-news-${slug}`}>
          {title}
        </h4>
        <p className="text-muted small flex-grow-1" style={{ 
          display: '-webkit-box', 
          WebkitLineClamp: 3, 
          WebkitBoxOrient: 'vertical', 
          overflow: 'hidden' 
        }}>
          {excerpt}
        </p>
        <Link href={`/news/${slug}`} className="text-decoration-none">
          <div className="d-inline-flex align-items-center gap-2 text-primary fw-medium small px-2 py-1 rounded" 
            style={{ marginLeft: '-8px' }} 
            data-testid={`link-read-more-${slug}`}>
            Read More
            <ArrowRight style={{ width: '16px', height: '16px' }} />
          </div>
        </Link>
      </Card.Body>
    </Card>
  );
}