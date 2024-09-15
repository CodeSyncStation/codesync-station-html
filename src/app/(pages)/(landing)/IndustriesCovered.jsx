// components/IndustriesCovered.js
import { Col, Container, Row } from 'react-bootstrap';

const industries = [
  { name: 'Transportation', icon: '🚐' },
  { name: 'Healthcare', icon: '❤️' },
  { name: 'BPO', icon: '🎧' },
  { name: 'Finance', icon: '💸' },
  { name: 'Agriculture', icon: '🌱' },
  { name: 'Energy', icon: '💡' },
  { name: 'Government', icon: '🏛️' },
  { name: 'Education', icon: '📘' },
  { name: 'Manufacturing', icon: '🏭' },
  { name: 'Retail', icon: '🏪' },
  { name: 'Hospitality', icon: '🏨' },
  { name: 'Real Estate', icon: '🏠' },
  { name: 'Entertainment', icon: '🎵' },
  { name: 'Nonprofit', icon: '💰' },
];

const IndustriesCovered = () => {
  return (
    <section className="industries-covered py-5">
      <Container>
        <div className="section-title">
          <h6 className="sub-title">industries we covered</h6>
          <h2 className="title">
            Custom Software Solutions for Diverse Industries
          </h2>
        </div>
      
        <Row className="text-center">
          {industries.map((industry, index) => (
            <Col key={index} xs={6} md={4} lg={3} className="mb-4">
              <div className="industry-card">
                <div className="industry-icon">{industry.icon}</div>
                <p>{industry.name}</p>
              </div>
            </Col>
          ))}
        </Row>
      </Container>
    </section>
  );
};

export default IndustriesCovered;
