import React from 'react';
import './BenefitsSection.css';

const BenefitsSection = () => {
  const benefits = [
    {
      title: "Atendimento Imediato com IA de Voz",
      description: "Chega de chamadas perdidas ou filas de espera. A IA atende instantaneamente, entende o cliente e direciona com precisão – 24 horas por dia."
    },
    {
      title: "IA que Fala, Ouve e Resolve",
      description: "Seu novo atendente nunca tira folga. Com linguagem natural, a IA responde dúvidas, coleta dados e inicia processos em tempo real."
    },
    {
      title: "Vendas Automatizadas com Inteligência",
      description: "A IA identifica oportunidades e conduz o cliente até a conversão. Mais agilidade, mais vendas e mais performance com zero intervenção humana."
    },
    {
      title: "Redução de Custos com Atendimento Inteligente",
      description: "Automatize tarefas repetitivas e economize em equipe e estrutura. A IA assume a linha de frente e libera sua equipe para o que importa."
    },
    {
      title: "Experiência do Cliente Personalizada por IA",
      description: "Cada ligação vira uma experiência única. A IA reconhece padrões, histórico e preferências, oferecendo respostas mais humanas e eficazes."
    },
    {
      title: "Escalabilidade com Inteligência Real",
      description: "Cresça sem travar o atendimento. A IA aprende e se adapta ao volume de chamadas, mantendo a qualidade em qualquer cenário."
    }
  ];

  return (
    <section className="benefits-section bg-white">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Recursos que conquistam clientes.
          </h2>
          <p className="section-subtitle">
            Benefícios do PABX Virtual da Azuton
          </p>
        </div>
        
        <div className="benefits-grid grid grid-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="benefit-card card">
              <h3 className="benefit-title">{benefit.title}</h3>
              <p className="benefit-description">{benefit.description}</p>
            </div>
          ))}
        </div>
        
        <div className="benefits-cta">
          <button className="btn btn-primary btn-large">
            SOLICITE UM ORÇAMENTO
          </button>
        </div>
      </div>
    </section>
  );
};

export default BenefitsSection;
