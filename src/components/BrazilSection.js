import React from 'react';
import './BrazilSection.css';

const BrazilSection = () => {
  return (
    <section className="brazil-section bg-white">
      <div className="container">
        <div className="brazil-content">
          <div className="brazil-image">
            <img 
              src="https://lp.azuton.com/wp-content/uploads/2025/08/pretty-young-woman-enjoying-coffee-break.webp" 
              alt="Mulher com computador e fones de ouvido" 
              className="brazil-img"
            />
            
            {/* Ícones de redes sociais flutuantes */}
            <div className="floating-icons">
              <div className="social-icon facebook">
                <span>f</span>
              </div>
              <div className="social-icon whatsapp">
                <span>📱</span>
              </div>
              <div className="social-icon instagram">
                <span>📷</span>
              </div>
              <div className="social-icon telegram">
                <span>✈</span>
              </div>
              <div className="social-icon chat">
                <span>💬</span>
              </div>
            </div>
          </div>
          
          <div className="brazil-text">
            <h2 className="brazil-title">
              AZUTIX configurado especialmente para o Brasil. Pronto e disponível 100% para o mercado Brasileiro!
            </h2>
            
            <div className="brazil-features">
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <p>Os servidores estão totalmente no Brasil, reduzindo a latência.</p>
              </div>
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <p>Maior e melhor cobertura em todos estados nacionais.</p>
              </div>
            </div>
            
            <div className="brazil-cta">
              <button className="btn btn-success btn-large">
                Fale com um especialista hoje mesmo
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default BrazilSection;
