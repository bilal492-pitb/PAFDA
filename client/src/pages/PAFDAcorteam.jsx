import React from 'react';
import { Container, Carousel } from 'react-bootstrap';
import { ArrowLeft, ArrowRight } from 'lucide-react';
import './PAFDAcorteam.css'; // We'll create this CSS file

const teamMembers = [
    {
    id: 1,
    name: 'Dr. Talat Naseer Pasha',
    title: 'Director General [PAFDA]',
    image: '/pasha.JPG' // Replace with your image path
  },
  {
    id: 2,
    name: 'Dr Muhammad Nasir',
    title: 'Member [Food]',
    image: '/images/team1.jpg' // Replace with your image path
  },
  {
    id: 3,
    name: 'Dr Muhammad Irfan Ashiq',
    title: 'Member [R&T]',
    image: '/images/team2.jpg' // Replace with your image path
  },
  {
    id: 4,
    name: 'Dr Mazhar IQbal',
    title: 'Member [Pharma]',
    image: '/images/team3.jpg' // Replace with your image path
  },
  {
    id: 5,
    name: 'Dr Ihsan Ul Haq',
    title: 'Member [Agriculture]',
    image: '/images/team1.jpg' // Replace with your image path
  },
  // Add more team members as needed
];

const PAFDAcorteam = () => {
  return (
    <div className="team-page">
      <Container>
        <h1 className="text-center my-5">Our Core Team</h1>
        <div className="team-carousel-container">
          <Carousel 
            indicators={false}
            nextIcon={<span className="carousel-control-next-icon" aria-hidden="true"><ArrowRight size={30} /></span>}
            prevIcon={<span className="carousel-control-prev-icon" aria-hidden="true"><ArrowLeft size={30} /></span>}
            interval={3000}
            pause="hover"
          >
            {teamMembers.map((member) => (
              <Carousel.Item key={member.id}>
                <div className="team-member-card">
                  <div className="team-member-image">
                    <img
                      className="d-block w-100"
                      src={member.image}
                      alt={member.name}
                    />
                  </div>
                  <div className="team-member-info">
                    <h3>{member.name}</h3>
                    <p className="position">{member.title}</p>
                  </div>
                </div>
              </Carousel.Item>
            ))}
          </Carousel>
        </div>
      </Container>
    </div>
  );
};

export default PAFDAcorteam;