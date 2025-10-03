import React from 'react';
import './ComparisonTable.css';

const ComparisonTable = () => {
  const comparisonData = [
    {
      feature: "Interface",
      chatbot: "Texto",
      aiAgent: "Voz (fala e escuta)"
    },
    {
      feature: "Canal principal",
      chatbot: "WhatsApp, site, redes sociais",
      aiAgent: "Telefone, PABX, URA"
    },
    {
      feature: "Nível de inteligência",
      chatbot: "Baixo (fluxos e regras)",
      aiAgent: "Alto (interpretação em tempo real)"
    },
    {
      feature: "Compreensão de contexto",
      chatbot: "Limitada",
      aiAgent: "Avançada, baseada em IA"
    },
    {
      feature: "Tipo de tarefas",
      chatbot: "Simples e repetitivas",
      aiAgent: "Complexas, com autonomia"
    },
    {
      feature: "Resposta a linguagem livre",
      chatbot: "Fraca",
      aiAgent: "Forte (entende variações naturais)"
    }
  ];

  return (
    <section className="comparison-section bg-white">
      <div className="container">
        <div className="section-header">
          <div className="comparison-title">
            <div className="ai-icon">🧠</div>
            <h2 className="section-title">
              Agente IA vs Chatbot: Comparativo Rápido
            </h2>
          </div>
        </div>
        
        <div className="comparison-table-container">
          <table className="comparison-table">
            <thead>
              <tr>
                <th>Recurso/Capacidade</th>
                <th>Chatbot Tradicional</th>
                <th>Agente IA AZUTIX (Azuton)</th>
              </tr>
            </thead>
            <tbody>
              {comparisonData.map((row, index) => (
                <tr key={index}>
                  <td className="feature-cell">{row.feature}</td>
                  <td className="chatbot-cell">{row.chatbot}</td>
                  <td className="ai-cell">{row.aiAgent}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};

export default ComparisonTable;

