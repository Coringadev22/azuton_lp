# Azuton Landing Page

Landing page responsiva para a Azuton, empresa especializada em PABX Virtual com IA de voz.

## 🚀 Tecnologias

- React 18
- CSS3 com Grid e Flexbox
- Design responsivo (mobile-first)
- Componentes modulares

## 📱 Responsividade

A landing page foi desenvolvida com design responsivo para:
- 📱 Mobile (320px+)
- 📱 Tablet (768px+)
- 💻 Desktop (1024px+)

## 🏗️ Estrutura da Landing Page

1. **Header** - Logo e CTA superior
2. **Hero Section** - Título principal com imagem da menina
3. **Features Grid** - IA de voz HD, TTS, STT
4. **Partners Section** - Logos dos parceiros (8 empresas)
5. **CRM Integration** - Integração com Pipedrive, Exact Sales, Zoho
6. **Video Section** - Vídeo explicativo do YouTube
7. **Problems & Solutions** - Problemas resolvidos com ilustração
8. **Benefits Section** - Recursos do PABX Virtual
9. **AZUPhone Resources** - Funcionalidades específicas
10. **Testimonials** - Depoimentos de clientes
11. **Comparison Table** - IA vs Chatbot tradicional
12. **Brazil Section** - AZUTIX para o mercado brasileiro
13. **Guarantee Section** - Garantia Azuton
14. **Contact Form** - Formulário de contato

## 🎨 Design System

### Cores
- **Primária**: #00d4aa (Turquesa)
- **Secundária**: #1a1a2e (Azul escuro)
- **Texto**: #333 (Cinza escuro)
- **Fundo**: #fff (Branco)

### Tipografia
- **Fonte**: System fonts (San Francisco, Segoe UI, etc.)
- **Títulos**: 2.5rem - 3.5rem
- **Corpo**: 1rem - 1.2rem

## 🛠️ Como executar

### Pré-requisitos
- Node.js 16+ instalado
- npm ou yarn

### Instalação
```bash
# Instalar dependências
npm install

# Executar em modo desenvolvimento
npm start

# Build para produção
npm run build
```

### Estrutura de pastas
```
src/
├── components/          # Componentes React
│   ├── Header.js
│   ├── HeroSection.js
│   ├── FeaturesGrid.js
│   ├── PartnersSection.js
│   ├── BenefitsSection.js
│   ├── AZUPhoneResources.js
│   ├── TestimonialsSection.js
│   ├── ComparisonTable.js
│   ├── BrazilSection.js
│   ├── GuaranteeSection.js
│   └── ContactForm.js
├── App.js              # Componente principal
├── App.css             # Estilos globais
├── index.js            # Entry point
└── index.css           # Reset CSS
```

## ✅ Integração Completa

A landing page foi completamente integrada com todos os assets fornecidos:

1. **✅ Imagens integradas**:
   - Logo da Azuton: `https://lp.azuton.com/wp-content/uploads/2024/07/logotipo.png`
   - Foto da menina: `https://lp.azuton.com/wp-content/uploads/2025/08/pretty-young-woman-enjoying-coffee-break.webp`
   - Favicon: `https://lp.azuton.com/wp-content/uploads/2024/07/cropped-Favicon.png`
   - Logos dos parceiros (8 empresas)
   - Logos de integração CRM (Pipedrive, Exact Sales, Zoho)

2. **✅ Vídeo integrado**:
   - YouTube embed: `https://www.youtube.com/embed/Q7Yw5hrnV-M`

3. **📋 Próximo passo**:
   - Configuração do formulário de contato (backend)

## 🔧 Personalização

### Alterar cores
Edite as variáveis CSS em `src/index.css` e `src/App.css`

### Adicionar seções
Crie novos componentes em `src/components/` e importe em `src/App.js`

### Modificar textos
Edite diretamente nos arquivos dos componentes

## 📱 Teste de responsividade

Use as ferramentas de desenvolvedor do navegador para testar:
- iPhone SE (375px)
- iPad (768px)
- Desktop (1200px+)

## 🚀 Deploy

Para fazer deploy:

1. Execute `npm run build`
2. Faça upload da pasta `build/` para seu servidor
3. Configure o servidor para servir `index.html` em todas as rotas (SPA)

## 📞 Suporte

Para dúvidas ou modificações, entre em contato com a equipe de desenvolvimento.
