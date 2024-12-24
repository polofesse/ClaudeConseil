// src/WinXP/apps/Solitaire/index.js
import React from 'react';
import ReactSolitaireApp from './src/react/App/index.tsx'; // Spécifiez le fichier index.tsx
import './src/styles/index.less';

const Solitaire = () => {
  return (
    <div className="solitaire-container">
      <ReactSolitaireApp />
    </div>
  );
};

export default Solitaire;
