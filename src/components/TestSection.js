import React, { useState } from 'react';
import './TestSection.css';

const TestSection = () => {
  const [activeTab, setActiveTab] = useState('hd-voice');
  const [isCalling, setIsCalling] = useState(false);

  const handleCall = async () => {
    if (isCalling) return;
    
    setIsCalling(true);
    
    try {
      console.log('Procurando botão circular do Vapi...');
      
      // Aguarda um pouco para o botão circular aparecer
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Procura pelo botão circular do Vapi
      const vapiButtonSelectors = [
        'button[data-vapi-widget]',
        '.vapi-widget-button',
        'button[style*="position: fixed"]',
        'button[style*="bottom"]',
        'button[style*="right"]',
        'button[class*="vapi"]',
        'button[class*="call"]'
      ];
      
      let vapiButton = null;
      
      // Tenta encontrar o botão circular
      for (const selector of vapiButtonSelectors) {
        vapiButton = document.querySelector(selector);
        if (vapiButton) {
          console.log('Botão Vapi encontrado:', vapiButton);
          break;
        }
      }
      
      // Se não encontrou com seletores, busca por posição
      if (!vapiButton) {
        console.log('Buscando botão por posição...');
        const allButtons = document.querySelectorAll('button');
        for (const button of allButtons) {
          const style = window.getComputedStyle(button);
          const position = style.position;
          const bottom = style.bottom;
          const right = style.right;
          
          // Botão fixo no canto inferior direito
          if (position === 'fixed' && (bottom.includes('px') || right.includes('px'))) {
            vapiButton = button;
            console.log('Botão encontrado por posição:', button);
            break;
          }
        }
      }
      
      // Se não encontrou, busca por atributos
      if (!vapiButton) {
        console.log('Buscando botão por atributos...');
        const allButtons = document.querySelectorAll('button');
        for (const button of allButtons) {
          // Verifica se tem atributos relacionados ao Vapi
          if (button.hasAttribute('data-vapi') || 
              button.className.includes('vapi') ||
              button.id.includes('vapi') ||
              button.getAttribute('aria-label')?.includes('call') ||
              button.getAttribute('title')?.includes('call')) {
            vapiButton = button;
            console.log('Botão encontrado por atributos:', button);
            break;
          }
        }
      }
      
      // Se ainda não encontrou, busca por elementos que não sejam o botão atual
      if (!vapiButton) {
        console.log('Buscando botão circular específico...');
        const allButtons = document.querySelectorAll('button');
        for (const button of allButtons) {
          // Pula o botão atual (LIGAR AGORA)
          if (button.textContent.includes('LIGAR AGORA') || 
              button.textContent.includes('CONECTANDO')) {
            continue;
          }
          
          const style = window.getComputedStyle(button);
          const position = style.position;
          const bottom = style.bottom;
          const right = style.right;
          const width = style.width;
          const height = style.height;
          
          // Botão circular pequeno (provavelmente o Vapi)
          if (position === 'fixed' && 
              (bottom.includes('px') || right.includes('px')) &&
              width === height && 
              parseInt(width) < 100) {
            vapiButton = button;
            console.log('Botão circular encontrado:', button);
            break;
          }
        }
      }
      
      if (vapiButton) {
        vapiButton.click();
        console.log('Botão circular Vapi clicado com sucesso!');
      } else {
        console.log('Botão Vapi não encontrado, tentando usar SDK diretamente...');
        
        // Fallback: usar SDK diretamente
        if (window.vapiReady && window.vapiSDK) {
          const vapiInstance = window.vapiSDK.run({
            apiKey: "5bf919cf-4f0b-4219-ab02-74722fbc0eb5",
            assistant: "3a43dfa8-674a-4976-964b-c6729ecccad3",
            config: {
              position: "bottom-right",
              size: "small",
              theme: "light",
              offset: "20px"
            }
          });
          
          await vapiInstance.start();
          console.log('Chamada iniciada via SDK!');
        } else {
          throw new Error('Botão circular do Vapi não encontrado e SDK não disponível');
        }
      }
      
    } catch (error) {
      console.error('Erro ao iniciar chamada:', error);
      alert(`Erro ao conectar com o agente: ${error.message}`);
    } finally {
      setTimeout(() => setIsCalling(false), 3000);
    }
  };

  const tabs = [
    { id: 'hd-voice', label: 'Voz HD IA' },
    { id: 'text-to-speech', label: 'Texto para Voz' },
    { id: 'speech-to-text', label: 'Voz para Texto' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'hd-voice':
        return (
          <div className="test-content">
            <div className="test-header">
              <h3 className="test-title">VOZ HD IA</h3>
              <h4 className="test-subtitle">Voz HD verdadeira, ponta a ponta</h4>
            </div>
            <p className="test-description">
              Vozes NaturalHD próprias e codecs de voz HD são alimentados por nossa rede global privada para entregar conversas mais naturais com clareza de chamada incomparável.
            </p>
            <p className="test-highlight">Experimente a diferença na qualidade da voz</p>
            <div className="test-options">
              <button className="option-btn active">Vozes HD+ NaturalHD</button>
              <button className="option-btn">Codec padrão</button>
            </div>
            <button 
              className={`btn btn-primary btn-large ${isCalling ? 'calling' : ''}`} 
              onClick={handleCall}
              disabled={isCalling}
            >
              <span className="btn-icon">{isCalling ? '⏳' : '📞'}</span>
              {isCalling ? 'CONECTANDO...' : 'LIGAR AGORA'}
            </button>
          </div>
        );
      
      case 'text-to-speech':
        return (
          <div className="test-content">
            <div className="test-header">
              <h3 className="test-title">TEXTO PARA VOZ</h3>
              <h4 className="test-subtitle">Conversão de texto para voz</h4>
            </div>
            <p className="test-description">
              Aproveite vozes claras e naturais para uma melhor experiência de chamada com seus clientes.
            </p>
            <div className="test-input">
              <input 
                type="text" 
                placeholder="Digite sua mensagem aqui..." 
                className="form-input"
              />
              <button className="btn btn-secondary">Converter para Voz</button>
            </div>
            <button 
              className={`btn btn-primary btn-large ${isCalling ? 'calling' : ''}`} 
              onClick={handleCall}
              disabled={isCalling}
            >
              <span className="btn-icon">{isCalling ? '⏳' : '🎤'}</span>
              {isCalling ? 'CONECTANDO...' : 'LIGAR AGORA'}
            </button>
          </div>
        );
      
      case 'speech-to-text':
        return (
          <div className="test-content">
            <div className="test-header">
              <h3 className="test-title">VOZ PARA TEXTO</h3>
              <h4 className="test-subtitle">Transcrição em tempo real</h4>
            </div>
            <p className="test-description">
              Transforme áudio em texto com precisão natural para conteúdo, comunicação e acessibilidade.
            </p>
            <div className="test-buttons">
              <button className="btn btn-secondary">
                <span className="btn-icon">🔴</span>
                GRAVAR ÁUDIO
              </button>
              <button className="btn btn-secondary">
                <span className="btn-icon">📁</span>
                ENVIAR ARQUIVO
              </button>
            </div>
            <button 
              className={`btn btn-primary btn-large ${isCalling ? 'calling' : ''}`} 
              onClick={handleCall}
              disabled={isCalling}
            >
              <span className="btn-icon">{isCalling ? '⏳' : '📞'}</span>
              {isCalling ? 'CONECTANDO...' : 'LIGAR AGORA'}
            </button>
          </div>
        );
      
      default:
        return null;
    }
  };

  return (
    <section className="test-section bg-white">
      <div className="container">
        <div className="test-container">
          <div className="test-tabs">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                className={`test-tab ${activeTab === tab.id ? 'active' : ''}`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </div>
          
          <div className="test-card">
            {renderContent()}
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestSection;
