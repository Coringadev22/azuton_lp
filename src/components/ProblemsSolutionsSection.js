import React from 'react';
import './ProblemsSolutionsSection.css';

const ProblemsSolutionsSection = () => {
  const problems = [
    {
      problem: "Gastos excessivos",
      solution: "Economia de até 50% dependendo do perfil de uso de empresa"
    },
    {
      problem: "Gastos com infraestrutura",
      solution: "PABX Virtual na Nuvem elimina a necessidade de hardware físico, reduzindo significativamente os custos iniciais e de manutenção"
    },
    {
      problem: "Desgaste com manutenção",
      solution: "A manutenção é feita 100% remota, sem necessidade de visitas presenciais"
    },
    {
      problem: "Problemas com gestão de atendimento",
      solution: "Facilita a supervisão da equipe em tempo real, mostrando o status dos agentes e melhorando a alocação para diminuir os tempos de espera."
    }
  ];

  return (
    <section className="problems-solutions-section bg-white">
      <div className="container">
        <div className="problems-content">
          <div className="problems-illustration">
            <div className="illustration-circle">
              <div className="illustration-woman agent">
                <div className="woman-head"></div>
                <div className="woman-body"></div>
                <div className="headset"></div>
                <div className="speech-bubble"></div>
              </div>
              <div className="illustration-woman customer">
                <div className="woman-head"></div>
                <div className="woman-body"></div>
                <div className="phone"></div>
              </div>
              <div className="plant"></div>
              <div className="floating-shapes">
                <div className="shape shape-1"></div>
                <div className="shape shape-2"></div>
                <div className="shape shape-3"></div>
              </div>
            </div>
          </div>
          
          <div className="problems-list">
            <h2 className="problems-title">
              Acabe com esses problemas de vez com o PABX Virtual em nuvem com IA integrada:
            </h2>
            
            <div className="problems-grid">
              {problems.map((item, index) => (
                <div key={index} className="problem-item">
                  <h3 className="problem-title">{item.problem}:</h3>
                  <p className="problem-solution">{item.solution}</p>
                </div>
              ))}
            </div>
            
            <div className="problems-cta">
              <button className="btn btn-primary btn-large">
                Fale com um especialista
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProblemsSolutionsSection;
