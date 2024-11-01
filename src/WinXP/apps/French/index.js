import React, { useEffect } from 'react';
import { useTranslation } from 'react-i18next';

export default function French({ onClose }) {
  const { i18n } = useTranslation();

  useEffect(() => {
    console.log('Changing language to French...');
    i18n
      .changeLanguage('fr') // Changer la langue à 'fr' pour le français
      .then(() => {
        console.log('Language changed to French');
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
      <h1>Langue modifiée</h1>
      <p>
        Le site a été basculé en français. Vous devrez peut-être actualiser ou
        naviguer pour voir le contenu mis à jour.
      </p>
    </div>
  );
}
