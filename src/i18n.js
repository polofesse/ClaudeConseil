import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Configuration de la traduction
i18n.use(initReactI18next).init({
  resources: {
    en: {
      translation: {
        'Contact & Newsletter': 'Contact & Newsletter',
        'My Computer': 'My Computer',
        'Chants Oiseaux': 'Bird Songs',
        'Prix du Public': 'Audience Award',
        'Voir le film!': 'Watch it!',
        Générique: 'Credits',
        Photos: 'Photos',
        'Photos tournage': 'Behind the Scenes',
        'Sélections et Prix': 'Selections & Awards',
        Critiques: 'Reviews',
        Projections: 'Screenings',
        Solitaire: 'Solitaire',
        Minesweeper: 'Minesweeper',
        'Bande-annonce': 'Trailer',
        Paint: 'Paint',
        'Bienvenue!': 'Welcome!',
        'Veuillez entrer votre prénom !': 'Please enter your name!',
        'Veuillez répondre correctement au quiz !':
          'Please answer the quiz correctly!',
        'Réponse incorrecte. Essayez encore !': 'Incorrect answer. Try again!',
        'Entrez votre prénom ici': 'Enter your name here',
        'Entrez votre réponse ici': 'Enter your answer here',
        'Attention : Il est déconseillé de regarder ce film sur un appareil mobile.':
          'Warning: It is not recommended to watch this movie on a mobile device.',
        Continuer: 'Continue',
        Annuler: 'Cancel',
        'Vérifier et Continuer': 'Check and Continue',
        'Prêt.e.s à voir un film de 24 minutes, dans le calme, seul.e ou avec des amis ?':
          'Ready to watch a 24-minute film, in peace, alone or with friends?',
        'Les Mystérieuses Aventures de Claude Conseil':
          'The Mysterious Adventures of Claude Conseil',
        Suivant: 'Next',
        Erreur: 'Error',
        oui: 'yes',
        non: 'no',
      },
    },
    fr: {
      translation: {
        'Contact & Newsletter': 'Contact & Newsletter',
        'My Computer': 'Mon Ordinateur',
        'Chants Oiseaux': 'Chants Oiseaux',
        'Voir le film!': 'Voir le film!',
        Générique: 'Générique',
        Photos: 'Photos',
        'Photos tournage': 'Photos tournage',
        'Sélections et Prix': 'Sélections et Prix',
        Critiques: 'Critiques',
        Projections: 'Projections',
        Solitaire: 'Solitaire',
        Minesweeper: 'Démineur',
        'Bande-annonce': 'Bande-annonce',
        Paint: 'Paint',
        'Bienvenue!': 'Bienvenue!',
        'Veuillez entrer votre prénom !': 'Veuillez entrer votre prénom !',
        'Veuillez répondre correctement au quiz !':
          'Veuillez répondre correctement au quiz !',
        'Réponse incorrecte. Essayez encore !':
          'Réponse incorrecte. Essayez encore !',
        'Entrez votre prénom ici': 'Entrez votre prénom ici',
        'Entrez votre réponse ici': 'Entrez votre réponse ici',
        'Attention : Il est déconseillé de regarder ce film sur un appareil mobile.':
          'Attention : Il est déconseillé de regarder ce film sur un appareil mobile.',
        Continuer: 'Continuer',
        Annuler: 'Annuler',
        'Vérifier et Continuer': 'Vérifier et Continuer',
        'Prêt.e.s à voir un film de 24 minutes, dans le calme, seul.e ou avec des amis ?':
          'Prêt.e.s à voir un film de 24 minutes, dans le calme, seul.e ou avec des amis ?',
        'Les Mystérieuses Aventures de Claude Conseil':
          'Les Mystérieuses Aventures de Claude Conseil',
        Suivant: 'Next',
        Erreur: 'Error',
        oui: 'oui',
        non: 'non',
      },
    },
  },
  lng: 'fr', // Langue par défaut
  fallbackLng: 'en', // Langue de secours
  interpolation: {
    escapeValue: false, // React déjà sûr contre XSS
  },
});

export default i18n;
