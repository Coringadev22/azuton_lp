import React, { useState } from 'react';
import './ContactForm.css';

const ContactForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    comments: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aqui você pode adicionar a lógica para enviar o formulário
    console.log('Form submitted:', formData);
    alert('Formulário enviado com sucesso!');
  };

  return (
    <section className="contact-section bg-white" id="contact">
      <div className="container">
        <div className="contact-content">
          <div className="contact-header">
            <h2 className="contact-title">
              Fale com um especialista
            </h2>
            <p className="contact-subtitle">
              Um membro da nossa equipe entrará em contato com você!
            </p>
          </div>
          
          <form className="contact-form" onSubmit={handleSubmit}>
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
                className="form-input"
                required
              />
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
                className="form-input"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="phone" className="form-label">
                (DDD) Telefone: <span className="required">(obrigatório)</span>
              </label>
              <input
                type="tel"
                id="phone"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                className="form-input"
                placeholder="(11) 99999-9999"
                required
              />
            </div>
            
            <div className="form-group">
              <label htmlFor="comments" className="form-label">
                Comentários
              </label>
              <p className="form-help">
                Por favor, deixe-nos saber a sua demanda, por favor.
              </p>
              <textarea
                id="comments"
                name="comments"
                value={formData.comments}
                onChange={handleChange}
                className="form-input form-textarea"
                rows="5"
                maxLength="600"
                placeholder="Descreva sua necessidade..."
              />
              <div className="character-count">
                {formData.comments.length} de 600 máx. de caracteres
              </div>
            </div>
            
            <div className="form-submit">
              <button type="submit" className="btn btn-primary btn-large">
                Enviar
              </button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactForm;

