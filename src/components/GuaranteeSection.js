import React from 'react';
import './GuaranteeSection.css';

const GuaranteeSection = () => {
  return (
    <section className="guarantee-section bg-dark">
      <div className="container">
        <div className="guarantee-content">
          <h2 className="guarantee-title">
            Garantia Azuton: Resultados Reais ou Seu Dinheiro de Volta
          </h2>
          
          <div className="guarantee-text">
            <p>
              Acreditamos tanto na eficiência da nossa solução que você testa sem risco. 
              Se em até 7 dias úteis você não perceber ganhos reais em agilidade, 
              atendimento ou performance, cancelamos sem questionamentos.
            </p>
            
            <p>
              Nossa instalação é rápida, a integração com IA é imediata e o impacto 
              é perceptível desde o primeiro dia. Você só paga quando a solução estiver 
              instalada, funcionando e gerando resultados.
            </p>
            
            <p>
              Se em 7 dias úteis você não sentir uma melhoria real na sua operação, 
              não há cobrança. Simples assim.
            </p>
            
            <p className="guarantee-highlight">
              Sem risco. Sem letra miúda. Só resultado.
            </p>
          </div>
          
          <div className="guarantee-cta">
            <button className="btn btn-primary btn-large">
              Fale com um especialista
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default GuaranteeSection;

