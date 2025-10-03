import React from 'react';
import './VideoSection.css';

const VideoSection = () => {
  return (
    <section className="video-section bg-white">
      <div className="container">
        <div className="video-content">
          <div className="video-text">
            <h2 className="video-title">
              Como implantar a API de voz na sua plataforma
            </h2>
            
            <p className="video-description">
              Neste vídeo, você vai descobrir como a Voice AI (inteligência artificial por voz) está 
              transformando o atendimento ao cliente com mais agilidade, escala e humanização e muito mais:
            </p>
            
            <div className="video-features">
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <p>O que é Voice AI</p>
              </div>
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <p>Como funciona no atendimento por telefone e WhatsApp</p>
              </div>
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <p>Benefícios para empresas e consumidores</p>
              </div>
              <div className="feature-item">
                <span className="checkmark">✓</span>
                <p>Como implementar Voice AI de forma eficiente</p>
              </div>
            </div>
          </div>
          
          <div className="video-player">
            <div className="video-container">
              <iframe
                width="560"
                height="315"
                src="https://www.youtube.com/embed/Q7Yw5hrnV-M?si=dlz4Gp8V5WDw_Pd2"
                title="YouTube video player"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                referrerPolicy="strict-origin-when-cross-origin"
                allowFullScreen
              ></iframe>
            </div>
            
            <div className="video-cta">
              <a 
                href="https://www.youtube.com/watch?v=Q7Yw5hrnV-M" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn btn-secondary"
              >
                Assistir no YouTube
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VideoSection;

