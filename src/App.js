import React, { useState } from 'react';
import Customers from './components/Customers';
import './CRM.css';

const App = () => {
  const [activeTab, setActiveTab] = useState('customers');

  const renderComponent = () => {
    switch (activeTab) {
      case 'customers':
        return <Customers />;
      default:
        return <Customers />;
    }
  };

  return (
    <div className="crm-container">
      <header>
        <div className="logo">CRM System</div>
        <nav>
          {['customers'].map((tab) => (
            <button
              key={tab}
              className={`nav-btn ${activeTab === tab ? 'active' : ''}`}
              onClick={() => setActiveTab(tab)}
            >
              {tab.charAt(0).toUpperCase() + tab.slice(1)}
            </button>
          ))}
        </nav>
      </header>
      <main>{renderComponent()}</main>
      <footer className="footer-banner">
        <div className="disclaimer">
          Disclaimer: This CRM system is provided "as is" without any representations or warranties, express or implied. Developer makes no representations or warranties in relation to this CRM system or the information and materials provided. Developer does not warrant that this CRM system will be constantly available, or available at all; or that the information in this CRM system is complete, true, accurate or non-misleading. Nothing on this CRM system constitutes, or is meant to constitute, advice of any kind. If you require advice in relation to any legal, financial or medical matter you should consult an appropriate professional.
        </div>
      </footer>
    </div>
  );
};

export default App;
