import React from 'react';
import './AZUPhoneResources.css';

const AZUPhoneResources = () => {
  const resources = [
    {
      title: "Gravação de chamada",
      description: "Grave todas as ligações da sua empresa"
    },
    {
      title: "Disponível em nuvem",
      description: "Tenha todas as informações armazenadas em nuvem com opção de backup local"
    },
    {
      title: "Totalmente WEB",
      description: "Um sistema 100% Saas que permite o acesso de qualquer lugar"
    },
    {
      title: "URA personalizada",
      description: "URA bot que otimiza o seu atendimento e reduz custos com equipe"
    },
    {
      title: "Portabilidade",
      description: "Não perca o número que todos os seus clientes já conhecem"
    },
    {
      title: "Relatórios gerenciais",
      description: "Acesso fácil ao módulo de chamadas, gravações e métricas gerais, por setor ou ramal"
    },
    {
      title: "Ramais no celular",
      description: "Seus colaboradores poderão efetuar ligações de seu SmartPhone como se estivessem em seu Ramal"
    },
    {
      title: "Interligação com unidades",
      description: "A interligação das filiais de uma empresa, possibilitando que os ramais de todas as unidades falem entre si gratuitamente."
    }
  ];

  return (
    <section className="azuton-resources-section bg-light">
      <div className="container">
        <div className="section-header">
          <h2 className="section-title">
            Recursos do AZUPhone
          </h2>
        </div>
        
        <div className="resources-grid grid grid-4">
          {resources.map((resource, index) => (
            <div key={index} className="resource-card card">
              <h3 className="resource-title">{resource.title}</h3>
              <p className="resource-description">{resource.description}</p>
            </div>
          ))}
        </div>
        
        <div className="resources-cta">
          <button className="btn btn-primary btn-large">
            SOLICITE UM ORÇAMENTO
          </button>
        </div>
      </div>
    </section>
  );
};

export default AZUPhoneResources;
