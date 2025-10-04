import React, { useState, useEffect } from 'react';
import './TestSection.css';

const TestSection = () => {
  const [activeTab, setActiveTab] = useState('hd-voice');
  const [isCalling, setIsCalling] = useState(false);
  const [isInCall, setIsInCall] = useState(false);
  
  // Estados para Texto para Voz
  const [textInput, setTextInput] = useState('');
  const [isConverting, setIsConverting] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);

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

  // Função para converter texto em voz usando Web Speech API (com fallback para Gemini)
  const handleTextToSpeech = async () => {
    if (!textInput.trim()) {
      alert('Por favor, digite uma mensagem para converter em voz.');
      return;
    }

    setIsConverting(true);

    try {
      console.log('Convertendo texto para voz:', textInput);
      
      // Usa Web Speech API como padrão
      if (window.speechSynthesis && window.speechSynthesis.speak) {
        await convertWithWebSpeech();
      } else {
        // Fallback para Google TTS se Web Speech não estiver disponível
        await convertWithGoogleTTS();
      }

    } catch (error) {
      console.error('Erro ao converter texto para voz:', error);
      alert(`Erro ao converter texto para voz: ${error.message}`);
    } finally {
      setIsConverting(false);
    }
  };

  // Função para converter usando Web Speech API
  const convertWithWebSpeech = () => {
    return new Promise((resolve, reject) => {
      const synthesis = window.speechSynthesis;
      
      // Para o áudio anterior se estiver tocando
      synthesis.cancel();

      // Cria um novo utterance
      const utterance = new SpeechSynthesisUtterance(textInput);
      
      // Configurações da voz
      utterance.lang = 'pt-BR';
      utterance.rate = 0.9;
      utterance.pitch = 1.0;
      utterance.volume = 1.0;

      // Tenta usar uma voz em português
      const voices = synthesis.getVoices();
      const portugueseVoice = voices.find(voice => 
        voice.lang.startsWith('pt') || voice.lang.includes('Brazil')
      );
      
      if (portugueseVoice) {
        utterance.voice = portugueseVoice;
        console.log('Usando voz em português:', portugueseVoice.name);
      }

      // Event listeners
      utterance.onstart = () => {
        console.log('Iniciando reprodução de áudio');
        setIsPlaying(true);
      };

      utterance.onend = () => {
        console.log('Reprodução de áudio finalizada');
        setIsPlaying(false);
        resolve();
      };

      utterance.onerror = (event) => {
        console.error('Erro na síntese de voz:', event.error);
        setIsPlaying(false);
        reject(new Error(`Erro na síntese: ${event.error}`));
      };

      // Inicia a síntese
      synthesis.speak(utterance);
    });
  };

  // Função para converter usando API externa (Google Text-to-Speech ou similar)
  const convertWithExternalAPI = async () => {
    try {
      // Para demonstração, vamos usar uma API de TTS gratuita
      const response = await fetch('https://api.voicerss.org/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: new URLSearchParams({
          key: 'demo', // Chave demo - para produção usar uma chave real
          src: textInput,
          hl: 'pt-br',
          f: '44khz_16bit_mono',
          c: 'mp3'
        })
      });

      if (!response.ok) {
        throw new Error('Erro na API de TTS externa');
      }

      const audioBlob = await response.blob();
      const audioUrl = URL.createObjectURL(audioBlob);
      
      // Cria elemento de áudio
      const audio = new Audio(audioUrl);
      
      audio.onplay = () => {
        console.log('Iniciando reprodução de áudio externo');
        setIsPlaying(true);
      };

      audio.onended = () => {
        console.log('Reprodução de áudio externo finalizada');
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl); // Limpa a URL
      };

      audio.onerror = (event) => {
        console.error('Erro na reprodução de áudio externo:', event);
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
        throw new Error('Erro ao reproduzir áudio externo');
      };

      // Inicia a reprodução
      await audio.play();
      
    } catch (error) {
      console.error('Erro na API externa:', error);
      // Se a API externa falhar, tenta novamente com Web Speech
      console.log('Tentando fallback para Web Speech API...');
      await convertWithWebSpeech();
    }
  };

  // Função para parar o áudio
  const stopAudio = () => {
    if (window.speechSynthesis) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
    }
  };

  // Função alternativa usando Google Text-to-Speech API (com a chave do Gemini fornecida)
  const convertWithGoogleTTS = async () => {
    try {
      // Usando Google Cloud Text-to-Speech API
      const response = await fetch('https://texttospeech.googleapis.com/v1/text:synthesize', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Goog-Api-Key': 'AIzaSyAWcHbTlao3QeZ91t28uk4_CUMu_9Li-E0'
        },
        body: JSON.stringify({
          input: { text: textInput },
          voice: {
            languageCode: 'pt-BR',
            name: 'pt-BR-Wavenet-A', // Voz feminina brasileira
            ssmlGender: 'FEMALE'
          },
          audioConfig: {
            audioEncoding: 'MP3',
            speakingRate: 0.9,
            pitch: 0.0,
            volumeGainDb: 0.0
          }
        })
      });

      if (!response.ok) {
        throw new Error(`Erro na API Google TTS: ${response.status}`);
      }

      const data = await response.json();
      const audioData = data.audioContent;
      
      // Converte base64 para blob
      const audioBlob = new Blob([
        Uint8Array.from(atob(audioData), c => c.charCodeAt(0))
      ], { type: 'audio/mp3' });
      
      const audioUrl = URL.createObjectURL(audioBlob);
      const audio = new Audio(audioUrl);
      
      audio.onplay = () => {
        console.log('Iniciando reprodução com Google TTS');
        setIsPlaying(true);
      };

      audio.onended = () => {
        console.log('Reprodução com Google TTS finalizada');
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
      };

      audio.onerror = (event) => {
        console.error('Erro na reprodução Google TTS:', event);
        setIsPlaying(false);
        URL.revokeObjectURL(audioUrl);
        throw new Error('Erro ao reproduzir áudio Google TTS');
      };

      await audio.play();
      
    } catch (error) {
      console.error('Erro na Google TTS API:', error);
      throw error;
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
                value={textInput}
                onChange={(e) => setTextInput(e.target.value)}
                disabled={isConverting}
              />
              <button 
                className={`btn btn-secondary ${isConverting ? 'converting' : ''}`}
                onClick={handleTextToSpeech}
                disabled={isConverting || !textInput.trim()}
              >
                <span className="btn-icon">
                  {isConverting ? '⏳' : '🔊'}
                </span>
                {isConverting ? 'CONVERTENDO...' : 'CONVERTER PARA VOZ'}
              </button>
            </div>
            
            {/* Controles de áudio */}
            {audioUrl && (
              <div className="audio-controls">
                <audio 
                  src={audioUrl} 
                  controls 
                  className="audio-player"
                />
              </div>
            )}
            
            {isPlaying && (
              <div className="audio-status">
                <p className="playing-text">🎵 Reproduzindo áudio...</p>
                <button 
                  className="btn btn-secondary btn-small"
                  onClick={stopAudio}
                >
                  ⏹️ PARAR
                </button>
              </div>
            )}
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
