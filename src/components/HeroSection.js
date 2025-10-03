import React from 'react';
import './HeroSection.css';

const HeroSection = () => {
  return (
    <section className="hero-section bg-dark">
      <div className="container">
        <div className="hero-main">
          <div className="hero-text">
            <img src="/azuton.png" alt="Azuton" className="hero-logo-img" />
            <h1 className="hero-title">
              PABX Virtual com voz IA:
              <br />
              atendimento imediato,
              <br />
              humano e sem fila
            </h1>
            
            <div className="hero-subtitle">
              <p>Avance com seu canal de voz e melhore a comunicação com o cliente...</p>
              <blockquote>
                "Transforme ligações em conversões com voz que entende e resolve"
              </blockquote>
            </div>
            
            <div className="hero-cta">
              <button className="btn btn-futuristic btn-large" onClick={() => document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })}>
                <span className="btn-text">Fale com um especialista</span>
              </button>
            </div>
          </div>
          
          <div className="hero-image">
            <img 
              src="https://lp.azuton.com/wp-content/uploads/2025/08/pretty-young-woman-enjoying-coffee-break.webp" 
              alt="Mulher com computador e fones de ouvido" 
              className="hero-img"
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
            
            <div className="hero-quote">
              <p>Parece <span className="highlight">humano</span>. Faz <span className="highlight">diferença</span>.</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
