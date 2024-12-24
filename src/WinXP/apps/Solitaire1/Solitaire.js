// src/Solitaire.js
import React from 'react';

const SolitaireGame = () => {
  return (
    <div>
      <iframe
        src="https://www.jeusolitaire.fr/jouerausolitaire/solitairewindows.php"
        title="Solitaire Windows XP"
        width="590"
        height="380"
        style={{ border: 'none' }}
      ></iframe>
    </div>
  );
};

export default SolitaireGame;
