import { useCallback } from 'react';

/**
 * Hook para gerenciar envio de formulários para diferentes serviços
 */
const useFormSubmission = () => {
  
  // Função para enviar para webhook (Zapier, Make.com, etc.)
  const sendToWebhook = useCallback(async (formData, webhookUrl) => {
    try {
      const response = await fetch(webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          timestamp: new Date().toISOString(),
          source: 'azuton-landing-page'
        })
      });

      if (!response.ok) {
        throw new Error(`Erro no webhook: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao enviar para webhook:', error);
      throw error;
    }
  }, []);

  // Função para enviar email via API (EmailJS, SendGrid, etc.)
  const sendEmail = useCallback(async (formData, emailConfig) => {
    try {
      // Exemplo usando EmailJS
      if (emailConfig.service === 'emailjs') {
        const emailjs = await import('@emailjs/browser');
        
        const templateParams = {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone,
          company: formData.company,
          position: formData.position,
          message: formData.comments,
          to_name: 'Equipe Azuton'
        };

        await emailjs.send(
          emailConfig.serviceId,
          emailConfig.templateId,
          templateParams,
          emailConfig.publicKey
        );
      }

      return { success: true };
    } catch (error) {
      console.error('Erro ao enviar email:', error);
      throw error;
    }
  }, []);

  // Função para salvar no Google Sheets
  const saveToGoogleSheets = useCallback(async (formData, sheetsConfig) => {
    try {
      const response = await fetch(sheetsConfig.webhookUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          timestamp: new Date().toISOString(),
          name: formData.name,
          email: formData.email,
          phone: formData.phone,
          company: formData.company,
          position: formData.position,
          comments: formData.comments
        })
      });

      if (!response.ok) {
        throw new Error(`Erro ao salvar no Google Sheets: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao salvar no Google Sheets:', error);
      throw error;
    }
  }, []);

  // Função para enviar para CRM (HubSpot, Salesforce, etc.)
  const sendToCRM = useCallback(async (formData, crmConfig) => {
    try {
      let endpoint = '';
      let headers = {};
      let body = {};

      switch (crmConfig.provider) {
        case 'hubspot':
          endpoint = `https://api.hubapi.com/crm/v3/objects/contacts`;
          headers = {
            'Authorization': `Bearer ${crmConfig.apiKey}`,
            'Content-Type': 'application/json'
          };
          body = {
            properties: {
              firstname: formData.name.split(' ')[0],
              lastname: formData.name.split(' ').slice(1).join(' '),
              email: formData.email,
              phone: formData.phone,
              company: formData.company,
              jobtitle: formData.position,
              message: formData.comments
            }
          };
          break;

        case 'salesforce':
          endpoint = `${crmConfig.instanceUrl}/services/data/v52.0/sobjects/Lead/`;
          headers = {
            'Authorization': `Bearer ${crmConfig.accessToken}`,
            'Content-Type': 'application/json'
          };
          body = {
            FirstName: formData.name.split(' ')[0],
            LastName: formData.name.split(' ').slice(1).join(' '),
            Email: formData.email,
            Phone: formData.phone,
            Company: formData.company,
            Title: formData.position,
            Description: formData.comments
          };
          break;

        default:
          throw new Error('Provedor de CRM não suportado');
      }

      const response = await fetch(endpoint, {
        method: 'POST',
        headers,
        body: JSON.stringify(body)
      });

      if (!response.ok) {
        throw new Error(`Erro no CRM: ${response.status}`);
      }

      return await response.json();
    } catch (error) {
      console.error('Erro ao enviar para CRM:', error);
      throw error;
    }
  }, []);

  // Função principal que coordena todos os envios
  const submitForm = useCallback(async (formData, config = {}) => {
    const results = {};
    const errors = [];

    try {
      // Enviar para webhook se configurado
      if (config.webhook) {
        try {
          results.webhook = await sendToWebhook(formData, config.webhook.url);
        } catch (error) {
          errors.push({ service: 'webhook', error: error.message });
        }
      }

      // Enviar email se configurado
      if (config.email) {
        try {
          results.email = await sendEmail(formData, config.email);
        } catch (error) {
          errors.push({ service: 'email', error: error.message });
        }
      }

      // Salvar no Google Sheets se configurado
      if (config.googleSheets) {
        try {
          results.googleSheets = await saveToGoogleSheets(formData, config.googleSheets);
        } catch (error) {
          errors.push({ service: 'googleSheets', error: error.message });
        }
      }

      // Enviar para CRM se configurado
      if (config.crm) {
        try {
          results.crm = await sendToCRM(formData, config.crm);
        } catch (error) {
          errors.push({ service: 'crm', error: error.message });
        }
      }

      // Se houve erros em alguns serviços mas pelo menos um funcionou
      if (errors.length > 0 && Object.keys(results).length > 0) {
        console.warn('Alguns serviços falharam:', errors);
        return { success: true, results, warnings: errors };
      }

      // Se todos os serviços falharam
      if (errors.length > 0 && Object.keys(results).length === 0) {
        throw new Error('Falha em todos os serviços de envio');
      }

      return { success: true, results };
    } catch (error) {
      console.error('Erro geral no envio:', error);
      throw error;
    }
  }, [sendToWebhook, sendEmail, saveToGoogleSheets, sendToCRM]);

  return {
    submitForm,
    sendToWebhook,
    sendEmail,
    saveToGoogleSheets,
    sendToCRM
  };
};

export default useFormSubmission;
