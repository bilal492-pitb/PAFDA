import React from 'react';
import { Container, Carousel } from 'react-bootstrap';



const NeedofPafda = () => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Hero Banner */}
      <section className="position-relative" style={{ height: '300px' }}>
        <div className="position-absolute top-0 start-0 w-100 h-100 z-0">
          <img
            src="/pafdalab.JPG"
            alt="PAFDA Lab"
            className="w-100 h-100 object-fit-cover"
          />
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.5))' }} />
        </div>

        <div className="position-relative z-10 text-center text-white mx-auto px-4" style={{ maxWidth: '64rem' }}>
          <h1 className="display-1 fw-bold mb-4" data-testid="text-page-title">PAFDA LAB</h1>
          
        </div>
      </section>
    <div className="needofpafda">
      <Container>
       <h1 className="text-center">Need of PAFDA</h1>
       <p className="text-center">
        Current issues in food, drugs and agriculture input raised the need of 
        state of art, international level laboratory on the pattern of FDA USA,
         Korea and Punjab Forensic Science Agency, Lahore, equipped with highly
          sophisticated equipment, advanced testing facilities, well trained & 
          specialized scientists, unified cross testing, updated quality management 
          system (QMS), standard operating procedures (SOP’s) and safety manuals etc.
           The idea turns to establishment of Punjab Agriculture, Food and 
           Drug Authority (PAFDA) to provide world class facility with highest 
           standards of professionalism, integrity and neutrality to ensure
            availability of quality medicines, food, pesticides and fertilizers to
             the public at par with any advanced country in the world. Most of
              important there is a real need of time to establish a lab like PAFDA
               which shall also contribute in revenue generation for economy by
                enhancing exports of raw and processed food.
       </p>
       </Container>
    </div>
    </div>
  );
};
export default NeedofPafda;