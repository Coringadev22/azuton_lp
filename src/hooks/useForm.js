import { useState, useCallback } from 'react';

/**
 * Hook customizado para gerenciar formulários
 * @param {Object} initialValues - Valores iniciais do formulário
 * @param {Function} onSubmit - Função chamada ao submeter o formulário
 * @param {Object} validationRules - Regras de validação para cada campo
 * @returns {Object} - Estado e funções do formulário
 */
const useForm = (initialValues = {}, onSubmit, validationRules = {}) => {
  const [formData, setFormData] = useState(initialValues);
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Função para validar um campo específico
  const validateField = useCallback((name, value) => {
    const rules = validationRules[name];
    if (!rules) return '';

    // Validação obrigatória
    if (rules.required && (!value || value.trim() === '')) {
      return `${rules.required}`;
    }

    // Validação de email
    if (rules.email && value) {
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(value)) {
        return 'Por favor, insira um email válido';
      }
    }

    // Validação de telefone
    if (rules.phone && value) {
      const phoneRegex = /^\(\d{2}\)\s\d{4,5}-\d{4}$/;
      if (!phoneRegex.test(value)) {
        return 'Por favor, insira um telefone válido (ex: (11) 99999-9999)';
      }
    }

    // Validação de tamanho mínimo
    if (rules.minLength && value && value.length < rules.minLength) {
      return `Mínimo de ${rules.minLength} caracteres`;
    }

    // Validação de tamanho máximo
    if (rules.maxLength && value && value.length > rules.maxLength) {
      return `Máximo de ${rules.maxLength} caracteres`;
    }

    // Validação customizada
    if (rules.custom && typeof rules.custom === 'function') {
      const customError = rules.custom(value);
      if (customError) {
        return customError;
      }
    }

    return '';
  }, [validationRules]);

  // Função para validar todo o formulário
  const validateForm = useCallback(() => {
    const newErrors = {};
    let isValid = true;

    Object.keys(validationRules).forEach(fieldName => {
      const error = validateField(fieldName, formData[fieldName]);
      if (error) {
        newErrors[fieldName] = error;
        isValid = false;
      }
    });

    setErrors(newErrors);
    return isValid;
  }, [formData, validateField, validationRules]);

  // Função para atualizar um campo
  const handleChange = useCallback((e) => {
    const { name, value } = e.target;
    
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));

    // Validação em tempo real (opcional)
    if (errors[name]) {
      const error = validateField(name, value);
      setErrors(prev => ({
        ...prev,
        [name]: error
      }));
    }
  }, [errors, validateField]);

  // Função para submeter o formulário
  const handleSubmit = useCallback(async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);
    setErrors({});

    try {
      if (onSubmit && typeof onSubmit === 'function') {
        await onSubmit(formData);
        setIsSubmitted(true);
      }
    } catch (error) {
      console.error('Erro ao submeter formulário:', error);
      setErrors({ 
        submit: error.message || 'Erro ao enviar formulário. Tente novamente.' 
      });
    } finally {
      setIsSubmitting(false);
    }
  }, [formData, validateForm, onSubmit]);

  // Função para resetar o formulário
  const resetForm = useCallback(() => {
    setFormData(initialValues);
    setErrors({});
    setIsSubmitting(false);
    setIsSubmitted(false);
  }, [initialValues]);

  // Função para definir um erro manualmente
  const setFieldError = useCallback((fieldName, error) => {
    setErrors(prev => ({
      ...prev,
      [fieldName]: error
    }));
  }, []);

  // Função para limpar um erro específico
  const clearFieldError = useCallback((fieldName) => {
    setErrors(prev => {
      const newErrors = { ...prev };
      delete newErrors[fieldName];
      return newErrors;
    });
  }, []);

  return {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    handleChange,
    handleSubmit,
    resetForm,
    setFieldError,
    clearFieldError,
    validateField,
    validateForm
  };
};

export default useForm;
