import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function English({ onClose }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    console.log('Changing language to English...');
    i18n
      .changeLanguage('en')
      .then(() => {
        console.log('Language changed to English');
        // Optionnel : Fermer l'application après le changement de langue
        if (onClose) {
          onClose();
        }
      })
      .catch(error => {
        console.error('Error changing language:', error);
      });
  }, [i18n, onClose]);

  return (
    <div>
      <h1>Language Changed</h1>
      <p>
        The site has been switched to English. You may need to refresh or
        navigate to see the updated content.
      </p>
    </div>
  );
}
