import { useCallback } from 'react';
import useForm from './useForm';
import useFormSubmission from './useFormSubmission';

/**
 * Hook específico para o formulário de orçamento/contato
 */
const useBudgetForm = () => {
  // Valores iniciais do formulário
  const initialValues = {
    name: '',
    email: '',
    phone: '',
    company: '',
    position: '',
    comments: '',
    budget: '',
    timeline: '',
    interestedIn: []
  };

  // Regras de validação
  const validationRules = {
    name: {
      required: 'Nome é obrigatório',
      minLength: 2,
      custom: (value) => {
        if (value && value.trim().length < 2) {
          return 'Nome deve ter pelo menos 2 caracteres';
        }
        return '';
      }
    },
    email: {
      required: 'Email é obrigatório',
      email: true
    },
    phone: {
      required: 'Telefone é obrigatório',
      phone: true
    },
    company: {
      minLength: 2,
      custom: (value) => {
        if (value && value.trim().length < 2) {
          return 'Nome da empresa deve ter pelo menos 2 caracteres';
        }
        return '';
      }
    },
    comments: {
      maxLength: 600,
      custom: (value) => {
        if (value && value.length > 600) {
          return 'Comentários não podem exceder 600 caracteres';
        }
        return '';
      }
    }
  };

  // Hook para envio de formulário
  const { submitForm } = useFormSubmission();

  // Função para submeter o formulário
  const handleSubmit = useCallback(async (formData) => {
    try {
      console.log('Dados do formulário de orçamento:', formData);
      
      // Configuração dos serviços de envio
      const submissionConfig = {
        // Webhook para Zapier/Make.com (substitua pela sua URL)
        webhook: {
          url: process.env.REACT_APP_WEBHOOK_URL || 'https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID/'
        },
        
        // Email via EmailJS (configure suas credenciais)
        email: {
          service: 'emailjs',
          serviceId: process.env.REACT_APP_EMAILJS_SERVICE_ID || 'your_service_id',
          templateId: process.env.REACT_APP_EMAILJS_TEMPLATE_ID || 'your_template_id',
          publicKey: process.env.REACT_APP_EMAILJS_PUBLIC_KEY || 'your_public_key'
        },
        
        // Google Sheets (via webhook do Google Apps Script)
        googleSheets: {
          webhookUrl: process.env.REACT_APP_GOOGLE_SHEETS_WEBHOOK || 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'
        }
      };

      // Enviar formulário
      const result = await submitForm(formData, submissionConfig);
      
      console.log('Resultado do envio:', result);
      
      // Sucesso
      return result;
      
    } catch (error) {
      console.error('Erro ao enviar solicitação de orçamento:', error);
      throw new Error('Erro ao enviar solicitação. Tente novamente.');
    }
  }, [submitForm]);

  // Usar o hook base
  const form = useForm(initialValues, handleSubmit, validationRules);

  // Funções específicas para o formulário de orçamento
  const formatPhone = useCallback((value) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Aplica a máscara (XX) XXXXX-XXXX ou (XX) XXXX-XXXX
    if (numbers.length <= 2) {
      return numbers;
    } else if (numbers.length <= 6) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2)}`;
    } else if (numbers.length <= 10) {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 6)}-${numbers.slice(6)}`;
    } else {
      return `(${numbers.slice(0, 2)}) ${numbers.slice(2, 7)}-${numbers.slice(7, 11)}`;
    }
  }, []);

  // Handler customizado para o telefone com formatação
  const handlePhoneChange = useCallback((e) => {
    const formattedValue = formatPhone(e.target.value);
    const syntheticEvent = {
      ...e,
      target: {
        ...e.target,
        value: formattedValue
      }
    };
    form.handleChange(syntheticEvent);
  }, [formatPhone, form.handleChange]);

  // Função para adicionar/remover interesses
  const toggleInterest = useCallback((interest) => {
    const currentInterests = form.formData.interestedIn || [];
    const newInterests = currentInterests.includes(interest)
      ? currentInterests.filter(i => i !== interest)
      : [...currentInterests, interest];
    
    const syntheticEvent = {
      target: {
        name: 'interestedIn',
        value: newInterests
      }
    };
    form.handleChange(syntheticEvent);
  }, [form.formData.interestedIn, form.handleChange]);

  return {
    ...form,
    handlePhoneChange,
    toggleInterest,
    formatPhone
  };
};

export default useBudgetForm;
