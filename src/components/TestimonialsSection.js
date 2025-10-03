import React from 'react';
import './TestimonialsSection.css';

const TestimonialsSection = () => {
  const testimonials = [
    {
      name: "Rômulo Bianchi",
      company: "CABTEC",
      content: "A Azuton nos ajudou a superar os desafios do PABX durante a pandemia. Conseguimos manter nossa equipe trabalhando remotamente com todos os recursos necessários. A ativação foi rápida e a configuração flexível. Já recomendei e ainda recomendo a parceria com a AZUTON!"
    },
    {
      name: "Daniel Silva",
      company: "Rack Cobra",
      content: "Recomendo a Azuton pela praticidade técnica na gestão e configuração do PABX em nuvem. A comunicação interna e externa ficou muito mais eficiente. A implementação não exigiu grandes investimentos em infraestrutura. Estamos muito satisfeitos com os serviços ofertados pela Azuton."
    }
  ];

  return (
    <section className="testimonials-section bg-dark">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Depoimentos de nossos clientes
          </h2>
        </div>
        
        <div className="testimonials-grid grid grid-2">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="testimonial-card card">
              <div className="testimonial-content">
                <p className="testimonial-text">"{testimonial.content}"</p>
              </div>
              <div className="testimonial-author">
                <h4 className="author-name">{testimonial.name}</h4>
                <p className="author-company">{testimonial.company}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TestimonialsSection;

