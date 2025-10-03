import React, { useState, useEffect } from 'react';
import './TestSection.css';

const TestSection = () => {
  const [activeTab, setActiveTab] = useState('hd-voice');
  const [isCalling, setIsCalling] = useState(false);
  const [isInCall, setIsInCall] = useState(false);

  // Move o botão circular para baixo quando o componente carregar
  useEffect(() => {
    const moveButton = () => {
      if (window.moveVapiButtonToBottom) {
        window.moveVapiButtonToBottom();
      }
    };

    // Move imediatamente
    moveButton();
    
    // Move a cada 3 segundos
    const interval = setInterval(moveButton, 3000);
    
    return () => clearInterval(interval);
  }, []);

  const handleCall = async () => {
    if (isCalling) return;
    
    // Se já está em chamada, desliga
    if (isInCall) {
      handleEndCall();
      return;
    }
    
    // Move o botão circular para baixo antes de iniciar (não esconde completamente)
    if (window.moveVapiButtonToBottom) {
      window.moveVapiButtonToBottom();
    }
    
    setIsCalling(true);
    
    try {
      console.log('Botão LIGAR AGORA: Tentando iniciar chamada...');
      
      // Tenta usar o SDK diretamente primeiro
      if (window.startVapiCall) {
        console.log('Tentando via startVapiCall...');
        try {
          await window.startVapiCall();
          console.log('Chamada iniciada via SDK!');
          
          // Marca como em chamada após 2 segundos
          setTimeout(() => {
            setIsInCall(true);
            setIsCalling(false);
            console.log('Estado alterado para: em chamada');
          }, 2000);
          return;
        } catch (sdkError) {
          console.log('SDK falhou, tentando fallback:', sdkError);
        }
      }
      
      console.log('Fallback: Procurando botão circular do Vapi...');
      
      // Aguarda um pouco para o botão circular aparecer
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Procura pelo botão circular do Vapi que funciona
      let vapiButton = null;
      
      // Busca por todos os botões na página
      const allButtons = document.querySelectorAll('button');
      console.log('Total de botões encontrados:', allButtons.length);
      
      for (const button of allButtons) {
        // Pula o botão atual (LIGAR AGORA)
        if (button.textContent.includes('LIGAR AGORA') || 
            button.textContent.includes('CONECTANDO') ||
            button.textContent.includes('DESLIGAR')) {
          continue;
        }
        
        const style = window.getComputedStyle(button);
        const position = style.position;
        const bottom = style.bottom;
        const right = style.right;
        const width = style.width;
        const height = style.height;
        
        // Botão circular pequeno fixo (provavelmente o Vapi)
        if (position === 'fixed' && 
            (bottom.includes('px') || right.includes('px')) &&
            width === height && 
            parseInt(width) < 100 &&
            parseInt(width) > 40) {
          vapiButton = button;
          console.log('Botão circular Vapi encontrado:', button);
          break;
        }
      }
      
      if (vapiButton) {
        console.log('Clicando no botão circular do Vapi...');
        vapiButton.click();
        console.log('Botão circular Vapi clicado com sucesso!');
        
        // Marca como em chamada após 2 segundos
        setTimeout(() => {
          setIsInCall(true);
          setIsCalling(false);
          console.log('Estado alterado para: em chamada');
        }, 2000);
        
      } else {
        console.log('Botão circular não encontrado, tentando buscar por outros seletores...');
        
        // Busca por seletores específicos do Vapi
        const vapiSelectors = [
          'button[data-vapi-widget]',
          '.vapi-widget-button',
          'button[style*="position: fixed"]',
          'button[style*="bottom"]',
          'button[style*="right"]',
          'button[class*="vapi"]',
          'button[class*="call"]'
        ];
        
        for (const selector of vapiSelectors) {
          const button = document.querySelector(selector);
          if (button && !button.textContent.includes('LIGAR AGORA')) {
            console.log('Botão encontrado com seletor:', selector, button);
            button.click();
            console.log('Botão clicado com sucesso via seletor!');
            
            // Marca como em chamada
            setTimeout(() => {
              setIsInCall(true);
              setIsCalling(false);
              console.log('Estado alterado para: em chamada');
            }, 2000);
            return;
          }
        }
        
        throw new Error('Botão circular do Vapi não encontrado');
      }
      
    } catch (error) {
      console.error('Erro ao iniciar chamada:', error);
      console.error('Erro completo:', {
        message: error.message,
        stack: error.stack,
        name: error.name
      });
      alert(`Erro ao conectar com o agente: ${error.message || 'Erro desconhecido'}`);
      setIsCalling(false);
    }
  };

  const handleEndCall = async () => {
    try {
      console.log('Desligando chamada...');
      
      // Procura pelo botão de desligar ou fecha a interface
      if (window.vapiInstance) {
        // Tenta usar o método stop se disponível
        if (window.vapiInstance.stop) {
          await window.vapiInstance.stop();
          console.log('Chamada desligada via stop()');
        } else if (window.vapiInstance.end) {
          await window.vapiInstance.end();
          console.log('Chamada desligada via end()');
        } else {
          console.log('Método de desligar não encontrado');
        }
      }
      
      // Procura por botão de fechar/desligar na interface
      const closeButtons = document.querySelectorAll('button[aria-label*="close"], button[title*="close"], button[aria-label*="end"], button[title*="end"]');
      for (const button of closeButtons) {
        button.click();
        console.log('Botão de fechar clicado');
        break;
      }
      
      setIsInCall(false);
      console.log('Estado alterado para: não em chamada');
      
    } catch (error) {
      console.error('Erro ao desligar:', error);
      // Mesmo com erro, marca como não em chamada
      setIsInCall(false);
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
              className={`btn btn-primary btn-large ${isCalling ? 'calling' : ''} ${isInCall ? 'in-call' : ''}`} 
              onClick={handleCall}
              disabled={isCalling}
            >
              <span className="btn-icon">
                {isCalling ? '⏳' : isInCall ? '📵' : '📞'}
              </span>
              {isCalling ? 'CONECTANDO...' : isInCall ? 'DESLIGAR' : 'LIGAR AGORA'}
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
              className={`btn btn-primary btn-large ${isCalling ? 'calling' : ''} ${isInCall ? 'in-call' : ''}`} 
              onClick={handleCall}
              disabled={isCalling}
            >
              <span className="btn-icon">
                {isCalling ? '⏳' : isInCall ? '📵' : '📞'}
              </span>
              {isCalling ? 'CONECTANDO...' : isInCall ? 'DESLIGAR' : 'LIGAR AGORA'}
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
