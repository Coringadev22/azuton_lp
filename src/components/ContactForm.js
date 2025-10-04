import React from 'react';
import useBudgetForm from '../hooks/useBudgetForm';
import './ContactForm.css';

const ContactForm = () => {
  const {
    formData,
    errors,
    isSubmitting,
    isSubmitted,
    handleChange,
    handlePhoneChange,
    handleSubmit,
    resetForm
  } = useBudgetForm();

  return (
    <section className="contact-section bg-white" id="contact">
      <div className="container">
        <div className="contact-content">
          <div className="contact-header">
            <h2 className="contact-title">
              Solicite seu orçamento
            </h2>
            <p className="contact-subtitle">
              Preencha o formulário abaixo e receba uma proposta personalizada!
            </p>
          </div>
          
          {isSubmitted ? (
            <div className="success-message">
              <div className="success-icon">✅</div>
              <h3>Solicitação enviada com sucesso!</h3>
              <p>Entraremos em contato em breve para apresentar sua proposta personalizada.</p>
              <button 
                type="button" 
                className="btn btn-secondary"
                onClick={resetForm}
              >
                Nova solicitação
              </button>
            </div>
          ) : (
            <form className="contact-form" onSubmit={handleSubmit}>
              {/* Erro geral do formulário */}
              {errors.submit && (
                <div className="error-message">
                  {errors.submit}
                </div>
              )}
              
              <div className="form-group">
                <label htmlFor="name" className="form-label">
                  Nome <span className="required">(obrigatório)</span>
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  className={`form-input ${errors.name ? 'error' : ''}`}
                  placeholder="Seu nome completo"
                />
                {errors.name && <span className="field-error">{errors.name}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="email" className="form-label">
                  E-mail <span className="required">(obrigatório)</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  className={`form-input ${errors.email ? 'error' : ''}`}
                  placeholder="seu@email.com"
                />
                {errors.email && <span className="field-error">{errors.email}</span>}
              </div>
              
              <div className="form-group">
                <label htmlFor="phone" className="form-label">
                  Telefone <span className="required">(obrigatório)</span>
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handlePhoneChange}
                  className={`form-input ${errors.phone ? 'error' : ''}`}
                  placeholder="(11) 99999-9999"
                />
                {errors.phone && <span className="field-error">{errors.phone}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="company" className="form-label">
                  Empresa
                </label>
                <input
                  type="text"
                  id="company"
                  name="company"
                  value={formData.company}
                  onChange={handleChange}
                  className={`form-input ${errors.company ? 'error' : ''}`}
                  placeholder="Nome da sua empresa"
                />
                {errors.company && <span className="field-error">{errors.company}</span>}
              </div>

              <div className="form-group">
                <label htmlFor="position" className="form-label">
                  Cargo
                </label>
                <input
                  type="text"
                  id="position"
                  name="position"
                  value={formData.position}
                  onChange={handleChange}
                  className="form-input"
                  placeholder="Seu cargo na empresa"
                />
              </div>
              
              <div className="form-group">
                <label htmlFor="comments" className="form-label">
                  Descreva sua necessidade
                </label>
                <p className="form-help">
                  Conte-nos sobre seu projeto e como podemos ajudar
                </p>
                <textarea
                  id="comments"
                  name="comments"
                  value={formData.comments}
                  onChange={handleChange}
                  className={`form-input form-textarea ${errors.comments ? 'error' : ''}`}
                  rows="5"
                  maxLength="600"
                  placeholder="Descreva sua necessidade, objetivos do projeto, prazo, orçamento estimado..."
                />
                <div className="character-count">
                  {formData.comments.length} de 600 caracteres
                </div>
                {errors.comments && <span className="field-error">{errors.comments}</span>}
              </div>
              
              <div className="form-submit">
                <button 
                  type="submit" 
                  className={`btn btn-primary btn-large ${isSubmitting ? 'submitting' : ''}`}
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <span className="btn-icon">⏳</span>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <span className="btn-icon">📋</span>
                      Solicitar orçamento
                    </>
                  )}
                </button>
              </div>
            </form>
          )}
        </div>
      </div>
    </section>
  );
};

export default ContactForm;