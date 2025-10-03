import React from 'react';
import HeroSection from './components/HeroSection';
import TestSection from './components/TestSection';
import PartnersSection from './components/PartnersSection';
import CRMIntegrationSection from './components/CRMIntegrationSection';
import VideoSection from './components/VideoSection';
import ProblemsSolutionsSection from './components/ProblemsSolutionsSection';
import BenefitsSection from './components/BenefitsSection';
import AZUPhoneResources from './components/AZUPhoneResources';
import TestimonialsSection from './components/TestimonialsSection';
import ComparisonTable from './components/ComparisonTable';
import GuaranteeSection from './components/GuaranteeSection';
import ContactForm from './components/ContactForm';
import './App.css';

function App() {
  return (
    <div className="App">
      <HeroSection />
      <TestSection />
      <PartnersSection />
      <CRMIntegrationSection />
      <VideoSection />
      <ProblemsSolutionsSection />
      <BenefitsSection />
      <AZUPhoneResources />
      <TestimonialsSection />
      <ComparisonTable />
      <GuaranteeSection />
      <ContactForm />
    </div>
  );
}

export default App;
