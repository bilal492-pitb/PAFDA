import React from 'react';
import { Container, Carousel } from 'react-bootstrap';



const Overview = () => {
  return (
    <div className="min-vh-100 d-flex flex-column">
      {/* Hero Banner */}
      <section className="position-relative" style={{ height: '300px' }}>
        <div className="position-absolute top-0 start-0 w-100 h-100 z-0">
          <img
            src="/pafda1.png"
            alt="PAFDA Lab"
            className="w-100 h-100 object-fit-cover"
          />
          <div className="position-absolute top-0 start-0 w-100 h-100 bg-gradient" style={{ background: 'linear-gradient(to right, rgba(0,0,0,0.7), rgba(0,0,0,0.5))' }} />
        </div>

        <div className="position-relative z-10 text-center text-black mx-auto px-4" style={{ maxWidth: '64rem' }}>
          <h1 className="display-1 fw-bold mb-4" data-testid="text-page-title">PAFDA Overview</h1>
          
        </div>
      </section>
    <div className="overview">
      <Container>
       <h1 className="text-center">Overview</h1>
       <p className="text-center">
        Adulteration is a new-fangled marketing strategy for many suppliers
         who increase their product’s sale by mixing or treating food & Drugs
          with adulterants which is profitable but risks human health. Vegetables,
           fruits, meat, milk four primitive food items used in daily life by all
            the standard of living is compromised nowadays. A seemingly healthy food
             which is supposed to augment growth and development of the human body
              in reality gives catastrophic effects on the health. This opinion highlights these factors and focus on the need to avoid indulging in such practices in Pakistan as the country is on the verge of a nutritional crisis due to food adulteration. The situation has worsened which has plunged the country towards the abyss of a nutritional crisis and the authorities need to focus on the issue as half of the population of the country appears malnourished, the matter needs to the countered with strong footing otherwise the results would be detrimental. Government of the Punjab intends to establish a world class facility with highest standards of professionalism and integrity to ensure availability of quality medicine, food and pesticides to the public, at par with any advanced country in the world under one roof of Science Enclave. The major purpose fulfills that the Govt. an accredited laboratory with authentic results which can stand up to legal scrutiny.
       </p>
       </Container>
    </div>
    </div>
  );
};
export default Overview;