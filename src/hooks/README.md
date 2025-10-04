# Hooks do Formulário de Orçamento

Este diretório contém hooks customizados para gerenciar formulários na landing page da Azuton.

## 📁 Arquivos

### `useForm.js`
Hook base para gerenciar formulários com validação e estados.

**Funcionalidades:**
- ✅ Validação em tempo real
- ✅ Estados de loading e submissão
- ✅ Tratamento de erros
- ✅ Reset de formulário
- ✅ Validação customizada

**Uso:**
```javascript
const {
  formData,
  errors,
  isSubmitting,
  handleChange,
  handleSubmit,
  resetForm
} = useForm(initialValues, onSubmit, validationRules);
```

### `useBudgetForm.js`
Hook específico para o formulário de orçamento.

**Funcionalidades:**
- ✅ Formatação automática de telefone
- ✅ Validações específicas para orçamento
- ✅ Integração com múltiplos serviços
- ✅ Campos adicionais (empresa, cargo)

**Uso:**
```javascript
const {
  formData,
  errors,
  isSubmitting,
  handleChange,
  handlePhoneChange,
  handleSubmit
} = useBudgetForm();
```

### `useFormSubmission.js`
Hook para gerenciar envio de formulários para diferentes serviços.

**Serviços suportados:**
- ✅ Webhooks (Zapier, Make.com)
- ✅ EmailJS
- ✅ Google Sheets
- ✅ CRMs (HubSpot, Salesforce)

**Uso:**
```javascript
const { submitForm } = useFormSubmission();

const result = await submitForm(formData, {
  webhook: { url: 'https://webhook.url' },
  email: { service: 'emailjs', ... },
  googleSheets: { webhookUrl: 'https://sheets.webhook' }
});
```

## 🔧 Configuração

### Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com:

```env
# Webhook para Zapier/Make.com
REACT_APP_WEBHOOK_URL=https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID/

# EmailJS Configuration
REACT_APP_EMAILJS_SERVICE_ID=your_service_id
REACT_APP_EMAILJS_TEMPLATE_ID=your_template_id
REACT_APP_EMAILJS_PUBLIC_KEY=your_public_key

# Google Sheets Webhook
REACT_APP_GOOGLE_SHEETS_WEBHOOK=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
```

### Instalação de Dependências

Para usar EmailJS:
```bash
npm install @emailjs/browser
```

## 📋 Validações

### Campos Obrigatórios
- Nome (mínimo 2 caracteres)
- Email (formato válido)
- Telefone (formato brasileiro)

### Campos Opcionais
- Empresa
- Cargo
- Comentários (máximo 600 caracteres)

### Formatação Automática
- **Telefone**: `(11) 99999-9999`
- **Email**: Validação de formato
- **Nome**: Trim automático

## 🚀 Integrações

### 1. Zapier/Make.com
```javascript
// Configuração no hook
webhook: {
  url: 'https://hooks.zapier.com/hooks/catch/YOUR_WEBHOOK_ID/'
}
```

### 2. EmailJS
```javascript
// Configuração no hook
email: {
  service: 'emailjs',
  serviceId: 'your_service_id',
  templateId: 'your_template_id',
  publicKey: 'your_public_key'
}
```

### 3. Google Sheets
```javascript
// Configuração no hook
googleSheets: {
  webhookUrl: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'
}
```

### 4. CRM (HubSpot)
```javascript
// Configuração no hook
crm: {
  provider: 'hubspot',
  apiKey: 'your_api_key'
}
```

## 🎨 Estados Visuais

### Formulário
- ✅ Campos com erro (borda vermelha)
- ✅ Loading no botão de envio
- ✅ Mensagem de sucesso
- ✅ Mensagem de erro

### Botão de Envio
- ✅ Estado normal: "Solicitar orçamento"
- ✅ Estado loading: "Enviando..."
- ✅ Estado disabled durante envio

## 📱 Responsividade

Todos os hooks são otimizados para:
- ✅ Desktop
- ✅ Tablet
- ✅ Mobile

## 🔍 Debug

Para debug, verifique o console do navegador:
- ✅ Dados do formulário
- ✅ Erros de validação
- ✅ Status de envio
- ✅ Respostas das APIs

## 📞 Suporte

Para dúvidas sobre os hooks:
1. Verifique os logs do console
2. Teste as validações
3. Confirme as configurações de API
4. Verifique as variáveis de ambiente
