import React, { useEffect, useState } from 'react';
import './PartnersSection.css';

const PartnersSection = () => {
  const partners = [
    { name: "Canção Nova TV", logo: "https://lp.azuton.com/wp-content/uploads/2024/07/cancao-nova-1.png" },
    { name: "RANDON ICCAP", logo: "https://lp.azuton.com/wp-content/uploads/2024/07/p.randon-iccap.jpg" },
    { name: "ANDRITZ", logo: "https://lp.azuton.com/wp-content/uploads/2024/07/p.andritz.png" },
    { name: "AREA", logo: "https://lp.azuton.com/wp-content/uploads/2024/07/p.area_.webp" },
    { name: "FACULDADE CATÓLICA PAULISTA", logo: "https://lp.azuton.com/wp-content/uploads/2024/07/p.faculdade-catolica-paulista.png" },
    { name: "GRINGO APP", logo: "https://lp.azuton.com/wp-content/uploads/2024/07/p.gringo-app.png" },
    { name: "LIFE STRONG", logo: "https://lp.azuton.com/wp-content/uploads/2024/07/p.life_strong.png" },
    { name: "ORAL SIN", logo: "https://lp.azuton.com/wp-content/uploads/2024/07/p.oral-sin.png" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % partners.length);
    }, 3000);

    return () => clearInterval(interval);
  }, [partners.length]);

  return (
    <section className="partners-section bg-light">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Algumas das centenas de empresas que usam o Azuton
          </h2>
        </div>
        
        <div className="partners-carousel">
          <div className="partners-track" style={{ transform: `translateX(-${currentIndex * 25}%)` }}>
            {[...partners, ...partners].map((partner, index) => (
              <div key={index} className="partner-logo">
                <img src={partner.logo} alt={partner.name} />
                <span>{partner.name}</span>
              </div>
            ))}
          </div>
        </div>
        
        <div className="partners-pagination">
          <div className="pagination-dots">
            {partners.map((_, index) => (
              <span 
                key={index} 
                className={`dot ${index === currentIndex ? 'active' : ''}`}
                onClick={() => setCurrentIndex(index)}
              ></span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default PartnersSection;
