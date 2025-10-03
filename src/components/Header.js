import React from 'react';
import './Header.css';

const Header = () => {
  return (
    <header className="header">
      <div className="header-top">
        <div className="container">
          <div className="header-content">
            <div className="logo">
              <img src="/azuton.png" alt="Azuton" className="logo-img" />
            </div>
            <div className="header-cta">
              <a href="#contact" className="btn btn-primary">
                Teste Agora
              </a>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
