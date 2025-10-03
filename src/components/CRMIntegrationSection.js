import React from 'react';
import './CRMIntegrationSection.css';

const CRMIntegrationSection = () => {
  const crmPartners = [
    {
      name: "Pipedrive",
      description: "CRM e Vendas",
      logo: "https://lp.azuton.com/wp-content/uploads/2024/07/pipedrive-P.png"
    },
    {
      name: "Exact Sales",
      description: "Marketing e Vendas",
      logo: "https://lp.azuton.com/wp-content/uploads/2024/07/exact_sales_logo.png"
    },
    {
      name: "Zoho",
      description: "CRM, Vendas e Suporte",
      logo: "https://lp.azuton.com/wp-content/uploads/2024/07/zoho-1.png"
    }
  ];

  return (
    <section className="crm-integration-section bg-dark">
      <div className="container">
        <div className="crm-content">
          <div className="crm-header">
            <h2 className="crm-title">
              O AZUPhone torna muito fácil conectar seu sistema de CRM presente nas melhores ferramentas.
            </h2>
            <p className="crm-subtitle">
              Integração perfeita com seu CRM.
            </p>
          </div>
          
          <div className="crm-partners">
            {crmPartners.map((partner, index) => (
              <div key={index} className="crm-partner-card">
                <div className="crm-partner-logo">
                  <img src={partner.logo} alt={partner.name} />
                </div>
                <h3 className="crm-partner-name">{partner.name}</h3>
                <p className="crm-partner-description">{partner.description}</p>
              </div>
            ))}
          </div>
          
          <div className="crm-cta">
            <button className="btn btn-primary btn-large">
              CONSULTE SUA INTEGRAÇÃO E FALE COM UM ESPECIALISTA
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CRMIntegrationSection;

