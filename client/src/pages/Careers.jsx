import React, { useState } from 'react';
import { Container, Row, Col, Card, Badge, Accordion } from 'react-bootstrap';
import { Download, FileText, FileType, ChevronDown, ChevronUp, Briefcase, MapPin, Clock, Building, Info, CheckCircle, ArrowRight } from 'lucide-react';
import { Link } from 'wouter';

export default function Careers() {
    const [currentPositionsOpen, setCurrentPositionsOpen] = useState(true);
    const [closedPositionsOpen, setClosedPositionsOpen] = useState(false);

    const getFileIcon = (fileName) => {
        if (!fileName) return <FileText className="h-4 w-4" />;
        return fileName.toLowerCase().endsWith('.pdf') ? (
            <FileType className="h-4 w-4" />
        ) : (
            <FileText className="h-4 w-4" />
        );
    };

    const currentPositions = [
        {
            id: 1,
            title: 'Senior Food Scientist',
            department: 'Food Laboratory',
            location: 'Islamabad',
            type: 'Full-time',
            description: 'We are seeking an experienced Food Scientist to lead our food testing laboratory team and ensure the highest quality standards in food safety analysis.',
            responsibilities: [
                'Oversee food testing procedures and ensure quality standards',
                'Develop and validate new testing methods',
                'Train and mentor junior staff',
                'Ensure compliance with national and international standards',
                'Prepare technical reports and documentation'
            ],
            requirements: [
                'PhD in Food Science or related field',
                '5+ years of experience in food testing',
                'Strong knowledge of food safety standards (ISO 17025)',
                'Excellent leadership and communication skills',
                'Published research in peer-reviewed journals preferred'
            ],
            terms: 'This is a full-time position with competitive salary, health benefits, and professional development opportunities. Only shortlisted candidates will be contacted for interview.',
            advertisement: '/advertisements/senior-food-scientist.pdf',
            lastDate: 'December 31, 2025'
        },
    ];

    const closedPositions = [
        {
            id: 2,
            title: 'Laboratory Technician',
            department: 'Drug Laboratory',
            location: 'Lahore',
            type: 'Contract',
            description: 'Position successfully filled. Thank you for your interest in PAFDA careers.',
            advertisement: '/advertisements/lab-technician-closed.doc',
            lastDate: 'November 15, 2025'
        },
    ];

    return (
        <div className="py-5">
            <Container className="py-5">
                {/* Header Section */}
                <div className="text-center mb-5">
                    <Badge bg="primary" className="text-uppercase mb-3">Careers</Badge>
                    <h1 className="display-5 fw-bold mb-3">Join Our Mission</h1>
                    <p className="lead text-muted mx-auto" style={{ maxWidth: '700px' }}>
                        Explore exciting career opportunities at PAFDA and contribute to food and drug safety across Pakistan
                    </p>
                </div>

                {/* Current Positions */}
                <div className="mb-5">
                    <h2 className="h3 fw-bold mb-4 d-flex align-items-center">
                        <Briefcase className="me-2" />
                        Current Openings
                    </h2>
                    
                    {currentPositions.length > 0 ? (
                        <Accordion defaultActiveKey="0" className="mb-4">
                            {currentPositions.map((position, index) => (
                                <Accordion.Item eventKey={index.toString()} key={position.id} className="mb-3 border-0 shadow-sm">
                                    <Accordion.Header className="bg-light">
                                        <div className="d-flex flex-column">
                                            <h3 className="h5 mb-1">{position.title}</h3>
                                            <div className="d-flex flex-wrap gap-2 mt-2">
                                                <Badge bg="primary" className="d-flex align-items-center">
                                                    <Building className="me-1" size={14} /> {position.department}
                                                </Badge>
                                                <Badge bg="secondary" className="d-flex align-items-center">
                                                    <MapPin className="me-1" size={14} /> {position.location}
                                                </Badge>
                                                <Badge bg="info" className="d-flex align-items-center">
                                                    <Clock className="me-1" size={14} /> {position.type}
                                                </Badge>
                                                <Badge bg="danger" className="d-flex align-items-center">
                                                    Apply by: {position.lastDate}
                                                </Badge>
                                            </div>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body className="p-4">
                                        <p className="mb-4">{position.description}</p>
                                        
                                        {position.responsibilities && (
                                            <div className="mb-4">
                                                <h4 className="h5 text-primary mb-3">
                                                    <Briefcase className="me-2" size={18} />
                                                    Key Responsibilities
                                                </h4>
                                                <ul className="list-unstyled">
                                                    {position.responsibilities.map((item, i) => (
                                                        <li key={i} className="mb-2 d-flex">
                                                            <ArrowRight size={16} className="text-primary mt-1 me-2 flex-shrink-0" />
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {position.requirements && (
                                            <div className="mb-4">
                                                <h4 className="h5 text-success mb-3">
                                                    <CheckCircle className="me-2" size={18} />
                                                    Requirements & Qualifications
                                                </h4>
                                                <ul className="list-unstyled">
                                                    {position.requirements.map((item, i) => (
                                                        <li key={i} className="mb-2 d-flex">
                                                            <ArrowRight size={16} className="text-success mt-1 me-2 flex-shrink-0" />
                                                            <span>{item}</span>
                                                        </li>
                                                    ))}
                                                </ul>
                                            </div>
                                        )}

                                        {position.terms && (
                                            <div className="alert alert-warning mb-0">
                                                <h5 className="alert-heading d-flex align-items-center">
                                                    <Info className="me-2" size={18} />
                                                    Terms & Conditions
                                                </h5>
                                                <p className="mb-0">{position.terms}</p>
                                            </div>
                                        )}

                                        {position.advertisement && (
                                            <div className="mt-4 text-end">
                                                <a 
                                                    href={position.advertisement}
                                                    download
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-primary"
                                                >
                                                    <Download className="me-2" size={18} />
                                                    Download Advertisement (PDF)
                                                </a>
                                            </div>
                                        )}
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    ) : (
                        <Card className="text-center py-5">
                            <Card.Body>
                                <Briefcase size={48} className="text-muted mb-3" />
                                <h3 className="h5 text-muted">No current openings at this time</h3>
                                <p className="text-muted">Please check back later for new opportunities.</p>
                            </Card.Body>
                        </Card>
                    )}
                </div>

                {/* Closed Positions */}
                <div className="mt-5">
                    <h2 className="h3 fw-bold mb-4 d-flex align-items-center">
                        <Briefcase className="me-2" />
                        Closed Positions
                    </h2>
                    
                    {closedPositions.length > 0 ? (
                        <Accordion className="mb-4">
                            {closedPositions.map((position, index) => (
                                <Accordion.Item eventKey={index.toString()} key={position.id} className="mb-3 border-0 shadow-sm">
                                    <Accordion.Header className="bg-light">
                                        <div className="d-flex flex-column">
                                            <h3 className="h5 mb-1">{position.title}</h3>
                                            <div className="d-flex flex-wrap gap-2 mt-2">
                                                <Badge bg="secondary" className="d-flex align-items-center">
                                                    <Building className="me-1" size={14} /> {position.department}
                                                </Badge>
                                                <Badge bg="secondary" className="d-flex align-items-center">
                                                    <MapPin className="me-1" size={14} /> {position.location}
                                                </Badge>
                                                <Badge bg="secondary" className="d-flex align-items-center">
                                                    <Clock className="me-1" size={14} /> {position.type}
                                                </Badge>
                                                <Badge bg="danger" className="d-flex align-items-center">
                                                    Closed on: {position.lastDate}
                                                </Badge>
                                            </div>
                                        </div>
                                    </Accordion.Header>
                                    <Accordion.Body className="p-4">
                                        <p className="mb-4">{position.description}</p>
                                        {position.advertisement && (
                                            <div className="mt-4 text-end">
                                                <a 
                                                    href={position.advertisement}
                                                    download
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="btn btn-outline-secondary"
                                                >
                                                    <Download className="me-2" size={18} />
                                                    View Previous Advertisement
                                                </a>
                                            </div>
                                        )}
                                    </Accordion.Body>
                                </Accordion.Item>
                            ))}
                        </Accordion>
                    ) : (
                        <div className="alert alert-info mb-0">
                            <Info className="me-2" size={18} />
                            No closed positions to display at this time.
                        </div>
                    )}
                </div>

                {/* Application Process */}
                <Card className="mt-5 border-0 shadow-sm">
                    <Card.Body className="text-center p-4">
                        <div className="d-flex justify-content-center mb-3">
                            <div className="bg-primary bg-opacity-10 p-3 rounded-circle d-inline-flex">
                                <Info size={32} className="text-primary" />
                            </div>
                        </div>
                        <h3 className="h4 mb-3">Application Process</h3>
                        <p className="text-muted mb-0">
                            Download the job advertisement for detailed requirements and application instructions. 
                            All applications must be submitted before the closing date specified in the advertisement.
                        </p>
                    </Card.Body>
                </Card>
            </Container>
        </div>
    );
}