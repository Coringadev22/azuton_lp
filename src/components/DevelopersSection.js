import React, { useState } from 'react';
import './DevelopersSection.css';

const DevelopersSection = () => {
  const [activeTab, setActiveTab] = useState('create-agent');
  const [copyFeedback, setCopyFeedback] = useState(false);

  const codeExamples = {
    'create-agent': {
      title: 'Criar um agente IA',
      code: `curl -X POST https://api.azuton.com/v1/agents \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_AZUTON_API_KEY" \\
  -d '{
    "name": "Agente de Vendas IA",
    "voice": {
      "provider": "elevenlabs",
      "voice_id": "21m00Tcm4TlvDq8ikWAM"
    },
    "model": {
      "provider": "openai",
      "model": "gpt-4"
    },
    "system_prompt": "Você é um agente de vendas especializado em PABX Virtual.",
    "webhook_url": "https://your-app.com/webhook/azuton"
  }'`
    },
    'make-call': {
      title: 'Fazer uma chamada',
      code: `curl -X POST https://api.azuton.com/v1/calls \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_AZUTON_API_KEY" \\
  -d '{
    "agent_id": "agent_123456789",
    "customer_phone": "+5511999999999",
    "company_phone": "+5511888888888"
  }'`
    },
    'webhook-setup': {
      title: 'Configurar webhook',
      code: `curl -X POST https://api.azuton.com/v1/webhooks \\
  -H "Content-Type: application/json" \\
  -H "Authorization: Bearer YOUR_AZUTON_API_KEY" \\
  -d '{
    "url": "https://your-app.com/webhook/azuton",
    "events": ["call.started", "call.ended"],
    "secret": "your_webhook_secret_key"
  }'`
    }
  };

  const copyToClipboard = (code) => {
    navigator.clipboard.writeText(code).then(() => {
      setCopyFeedback(true);
      setTimeout(() => setCopyFeedback(false), 2000);
    }).catch(err => {
      console.error('Erro ao copiar código:', err);
    });
  };

  return (
    <section className="developers-section bg-dark">
      <div className="container">
        <div className="developers-content">
          <div className="developers-text">
            <div className="developers-header">
              <span className="developers-badge">PARA DESENVOLVEDORES</span>
              <h2 className="developers-title">
                Simplifique a configuração do seu Agente IA
              </h2>
              <p className="developers-description">
                Deixe a gestão de conexões complexas de operadoras e infraestrutura de voz para os especialistas. 
                Nossas APIs e SDKs fornecem todos os blocos de construção que você precisa. Pegue sua chave API e veja como 
                é simples criar agentes de voz inteligentes e integrá-los em suas aplicações.
              </p>
              <button 
                className="btn btn-outline btn-large"
                onClick={() => window.open('https://docs.azuton.com', '_blank')}
              >
                EXPLORAR DOCS →
              </button>
            </div>
          </div>
          
          <div className="developers-code">
            <div className="code-editor">
              <div className="code-header">
                <span className="code-tab-title">
                  {codeExamples[activeTab].title}
                </span>
                <button 
                  className={`copy-button ${copyFeedback ? 'copied' : ''}`}
                  onClick={() => copyToClipboard(codeExamples[activeTab].code)}
                  title="Copiar código"
                >
                  {copyFeedback ? (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <polyline points="20,6 9,17 4,12"></polyline>
                    </svg>
                  ) : (
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                      <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                    </svg>
                  )}
                </button>
              </div>
              
              <div className="code-content">
                <pre className="code-snippet">
                  <code className="language-bash">{codeExamples[activeTab].code}</code>
                </pre>
              </div>
              
              <div className="code-navigation">
                <button 
                  className="nav-arrow"
                  onClick={() => {
                    const tabs = Object.keys(codeExamples);
                    const currentIndex = tabs.indexOf(activeTab);
                    const prevIndex = currentIndex > 0 ? currentIndex - 1 : tabs.length - 1;
                    setActiveTab(tabs[prevIndex]);
                  }}
                >
                  ←
                </button>
                
                {Object.keys(codeExamples).map((tabKey) => (
                  <button
                    key={tabKey}
                    className={`nav-tab ${activeTab === tabKey ? 'active' : ''}`}
                    onClick={() => setActiveTab(tabKey)}
                  >
                    {codeExamples[tabKey].title}
                  </button>
                ))}
                
                <button 
                  className="nav-arrow"
                  onClick={() => {
                    const tabs = Object.keys(codeExamples);
                    const currentIndex = tabs.indexOf(activeTab);
                    const nextIndex = currentIndex < tabs.length - 1 ? currentIndex + 1 : 0;
                    setActiveTab(tabs[nextIndex]);
                  }}
                >
                  →
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DevelopersSection;
