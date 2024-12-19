import React from 'react';
import ReactDOM from 'react-dom/client'; // Use 'react-dom/client' in React 18
import App from './App';
import WalletProvider from './Context/WalletProvider';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <WalletProvider>
      <App />
    </WalletProvider>
  </React.StrictMode>
);
