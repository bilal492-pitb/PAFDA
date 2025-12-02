import React from 'react';
import { Container, Button, Card } from 'react-bootstrap';
import { Download } from 'lucide-react';
import './Pafdaact.css'; // We'll create this CSS file

const Pafdaact = () => {
  const downloadPdf = () => {
    // Replace with your actual PDF path
    const pdfUrl = 'http://punjablaws.gov.pk/laws/2650.html';
    const link = document.createElement('a');
    link.href = pdfUrl;
    link.download = 'pafda-act.pdf';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="act-page">
      <Container>
        <div className="act-content">
          <h1 className="text-center my-5">PAFDA Act</h1>
          <Card className="act-card">
            <Card.Body>
              <Card.Title>About PAFDA Act</Card.Title>
              <Card.Text>
                The PAFDA Act establishes the legal framework for the operations and governance of the 
                Pesticides, Agriculture, Food and Drug Authority. It outlines the authority's mandate, 
                functions, and responsibilities in regulating and ensuring the safety and quality of 
                pesticides, agricultural products, food, and drugs in the region.
              </Card.Text>
              <Card.Text>
                The Act provides for the establishment of the PAFDA Board, defines its composition, 
                and sets out the terms of office and functions of the Board members. It also contains 
                provisions for the appointment of the Director-General and other staff of the Authority.
              </Card.Text>
              <div className="download-section text-center mt-5">
                <Button 
                  variant="primary" 
                  size="lg" 
                  onClick={downloadPdf}
                  className="download-button"
                >
                  <Download className="me-2" />
                  Download PAFDA Act (PDF)
                </Button>
                <p className="file-info mt-2">File size: 2.4 MB | Updated: January 2025</p>
              </div>
            </Card.Body>
          </Card>
        </div>
      </Container>
    </div>
  );
};

export default Pafdaact;