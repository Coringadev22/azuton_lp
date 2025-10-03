import React from 'react';
import './FeaturesGrid.css';

const FeaturesGrid = () => {
  return (
    <section className="features-section bg-white">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Construa Sua Rede de Voz Com Mais Eficiência e Segurança
          </h2>
        </div>
        
        <div className="features-grid grid grid-3">
          <div className="feature-card card">
            <div className="feature-header">
              <h3 className="feature-title">IA DE VOZ HD</h3>
              <h4 className="feature-subtitle">Voz HD verdadeira, de ponta a ponta</h4>
            </div>
            <p className="feature-description">
              As vozes NaturalHD internas e os codecs de voz HD são alimentados por nossa rede global privada para proporcionar conversas mais naturais com clareza de chamada incomparável.
            </p>
            <button className="btn btn-secondary">
              LIGUE PARA NOSSO AGENTE
            </button>
          </div>
          
          <div className="feature-card card">
            <div className="feature-header">
              <h3 className="feature-title">TEXTO PARA FALA</h3>
              <h4 className="feature-subtitle">Conversão de texto em voz</h4>
            </div>
            <p className="feature-description">
              Desfrute de vozes claras e naturais para uma melhor experiência na ligação com seus clientes.
            </p>
            <div className="demo-input">
              <input 
                type="text" 
                placeholder="Digite sua mensagem aqui..." 
                className="form-input"
              />
            </div>
          </div>
          
          <div className="feature-card card">
            <div className="feature-header">
              <h3 className="feature-title">FALA PARA TEXTO</h3>
              <h4 className="feature-subtitle">Transcrição em tempo real</h4>
            </div>
            <p className="feature-description">
              Transforme áudio em texto com precisão natural para conteúdo, comunicação e acessibilidade.
            </p>
            <div className="demo-buttons">
              <button className="btn btn-secondary">
                GRAVAR ÁUDIO
              </button>
              <button className="btn btn-secondary">
                CARREGAR ARQUIVO
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturesGrid;

