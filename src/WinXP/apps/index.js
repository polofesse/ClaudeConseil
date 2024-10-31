import InternetExplorer from './InternetExplorer';
import Minesweeper from './Minesweeper';
import ErrorBox from './ErrorBox';
import MyComputer from './MyComputer';
import Notepad from './Notepad';
import Winamp from './Winamp';
import Paint from './Paint';
// import iePaper from 'assets/windowsIcons/ie-paper.png';
// import ie from 'assets/windowsIcons/ie.png';
import mail from 'assets/windowsIcons/mail.png';
import mine from 'assets/minesweeper/mine-icon.png';
import error from 'assets/windowsIcons/897(16x16).png';
import computer from 'assets/windowsIcons/676(16x16).png';
import computerLarge from 'assets/windowsIcons/676(32x32).png';
import notepad from 'assets/windowsIcons/327(16x16).png';
import notepadLarge from 'assets/windowsIcons/327(32x32).png';
import winamp from 'assets/windowsIcons/winamp.png';
import paintLarge from 'assets/windowsIcons/680(32x32).png';
import paint from 'assets/windowsIcons/680(16x16).png';
import GalleryIco from 'assets/windowsIcons/GalleryIco.png';
import PhotosDuFilm from './PhotosDuFilm';
import PhotosDuTournage from './PhotosDuTournage';
import BerettaIco from 'assets/windowsIcons/beretta.png';
import Beretta from './Player';
import BANDEANNONCE from './Player3';
import generiqueIco from 'assets/windowsIcons/generiqueIco.png';
import Générique from './Player2';
import FilmComplet from './Player4';
import playerico from 'assets/windowsIcons/playerico.png';
import Prix_et_selections from './Noteprix';
import Critiques from './Notecrit';
import Projections from './Notediff';
import ContactForm from './ContactForm';
import SolitaireGame from './Solitaire/Solitaire';
import spiderico from 'assets/windowsIcons/iconsolitaire.png';
import filmico from 'assets/windowsIcons/filmico.png';
import baico from 'assets/windowsIcons/baico.png';

const gen = () => {
  let id = -1;
  return () => {
    id += 1;
    return id;
  };
};
const genId = gen();
const genIndex = gen();
export const defaultAppState = [
  // {
  //   component: InternetExplorer,
  //   header: {
  //     title: 'Internet Explorer',
  //     icon: iePaper,
  //   },
  //   defaultSize: {
  //     width: 700,
  //     height: 500,
  //   },
  //   defaultOffset: {
  //     x: 130,
  //     y: 20,
  //   },
  {
    component: Notepad,
    header: {
      title: 'Bienvenue!',
      icon: notepad,
    },
    defaultSize: {
      width: 310,
      height: 450,
    },
    defaultOffset: {
      x: 70,
      y: 20,
    },
    resizable: true,
    minimized: false,
    // maximized: window.innerWidth < 450,
    id: genId(),
    zIndex: genIndex(),
  },
  // {
  //   component: Gallery,
  //   header: {
  //     title: 'Photos',
  //     icon: GalleryIco,
  //   },
  //   defaultSize: {
  //     width: window.innerWidth,
  //     height: window.innerWidth * (1 / 1.48),
  //   },
  //   defaultOffset: {
  //     x: (window.innerWidth - window.innerWidth) / 2,
  //     y: 0,
  //   },
  //   resizable: true,
  //   minimized: true,
  //   // maximized: window.innerWidth < 800,
  //   id: genId(),
  //   zIndex: genIndex(),
  // },
  // {
  //   component: Minesweeper,
  //   header: {
  //     title: 'Minesweeper',
  //     icon: mine,
  //   },
  //   defaultSize: {
  //     width: 0,
  //     height: 0,
  //   },
  //   defaultOffset: {
  //     x: 180,
  //     y: 170,
  //   },
  //   resizable: false,
  //   minimized: false,
  //   maximized: false,
  //   id: genId(),
  //   zIndex: genIndex(),
  // },
  // {
  //   component: Winamp,
  //   header: {
  //     title: 'Winamp',
  //     icon: winamp,
  //     invisible: true,
  //   },
  //   defaultSize: {
  //     width: 0,
  //     height: 0,
  //   },
  //   defaultOffset: {
  //     x: 0,
  //     y: 0,
  //   },
  //   resizable: false,
  //   minimized: false,
  //   maximized: false,
  //   id: genId(),
  //   zIndex: genIndex(),
  // },
  // {
  //   component: MyComputer,
  //   header: {
  //     title: 'My Computer',
  //     icon: computer,
  //   },
  //   defaultSize: {
  //     width: 660,
  //     height: 500,
  //   },
  //   defaultOffset: {
  //     x: 250,
  //     y: 40,
  //   },
  //   resizable: true,
  //   minimized: false,
  //   maximized: window.innerWidth < 800,
  //   id: genId(),
  //   zIndex: genIndex(),
  // },
];

export const defaultIconState = [
  {
    id: 13,
    icon: mail,
    title: 'Contact & Newsletter',
    component: ContactForm,
    isFocus: false,
  },
  {
    id: 2,
    icon: computerLarge,
    title: 'My Computer',
    component: MyComputer,
    isFocus: false,
  },
  // {
  //   id: 11,
  //   icon: ie,
  //   title: 'Internet Explorer',
  //   component: InternetExplorer,
  //   isFocus: false,
  // },
  {
    id: 3,
    icon: winamp,
    title: 'Chants Oiseaux',
    component: Winamp,
    isFocus: false,
  },
  {
    id: 16,
    icon: playerico,
    title: 'Voir le film!',
    component: FilmComplet,
    isFocus: false,
  },
  {
    id: 8,
    icon: generiqueIco,
    title: 'Générique',
    component: Générique,
    isFocus: false,
  },
  {
    id: 6,
    icon: GalleryIco,
    title: 'Photos',
    component: PhotosDuFilm,
    isFocus: false,
  },
  {
    id: 9,
    icon: GalleryIco,
    title: 'Photos tournage',
    component: PhotosDuTournage,
    isFocus: false,
  },
  {
    id: 7,
    icon: BerettaIco,
    title: 'Beretta',
    component: Beretta,
    isFocus: false,
  },
  {
    id: 15,
    icon: baico,
    title: 'Bande-annonce',
    component: BANDEANNONCE,
    isFocus: false,
  },
  {
    id: 0,
    icon: notepadLarge,
    title: 'Bienvenue!',
    component: Notepad,
    isFocus: false,
  },
  {
    id: 5,
    icon: notepadLarge,
    title: 'Sélections et Prix',
    component: Prix_et_selections,
    isFocus: false,
  },
  {
    id: 4,
    icon: notepadLarge,
    title: 'Critiques',
    component: Critiques,
    isFocus: false,
  },
  {
    id: 14,
    icon: filmico,
    title: 'Projections',
    component: Projections,
    isFocus: false,
  },
  {
    id: 12,
    icon: spiderico,
    title: 'Solitaire',
    component: SolitaireGame,
    isFocus: false,
  },
  {
    id: 1,
    icon: mine,
    title: 'Minesweeper',
    component: Minesweeper,
    isFocus: false,
  },

  {
    id: 10,
    icon: paintLarge,
    title: 'Paint',
    component: Paint,
    isFocus: false,
  },
];

export const appSettings = {
  // 'Internet Explorer': {
  //   header: {
  //     icon: iePaper,
  //     title: 'InternetExplorer',
  //   },
  //   component: InternetExplorer,
  //   defaultSize: {
  //     width: 700,
  //     height: 500,
  //   },
  //   defaultOffset: {
  //     x: 140,
  //     y: 30,
  //   },
  //   resizable: true,
  //   minimized: false,
  //   maximized: window.innerWidth < 800,
  //   multiInstance: true,
  // },
  Minesweeper: {
    header: {
      icon: mine,
      title: 'Minesweeper',
    },
    component: Minesweeper,
    defaultSize: {
      width: 0,
      height: 0,
    },
    defaultOffset: {
      x: 190,
      y: 180,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: true,
  },
  PhotosDuFilm: {
    header: {
      icon: GalleryIco,
      title: 'PhotosDuFilm',
    },
    component: PhotosDuFilm,
    defaultSize: {
      width: window.innerWidth,
      height: window.innerWidth * (9 / 16) + 94,
    },
    defaultOffset: {
      x: (window.innerWidth - window.innerWidth) / 2,
      y: 0,
    },
    resizable: true,
    minimized: false,
    // maximized: window.innerWidth < 800,
  },
  PhotosDuTournage: {
    header: {
      icon: GalleryIco,
      title: 'Photos Tournage',
    },
    component: PhotosDuTournage,
    defaultSize: {
      width: window.innerWidth,
      height: window.innerHeight - 100,
    },
    defaultOffset: {
      x: (window.innerWidth - window.innerWidth) / 2,
      y: 0,
    },
    resizable: true,
    minimized: false,
    // maximized: window.innerWidth < 800,
  },
  Beretta: {
    header: {
      icon: BerettaIco,
      title: 'Beretta',
    },
    component: Beretta,
    defaultSize: {
      width: 646,
      height: 392,
    },
    defaultOffset: {
      x: (window.innerWidth - window.innerWidth) / 2,
      y: 0,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
  },
  BandeAnnonce: {
    header: {
      icon: baico,
      title: 'Bande-Annonce',
    },
    component: BANDEANNONCE,
    defaultSize: {
      width: 646,
      height: 392,
    },
    defaultOffset: {
      x: (window.innerWidth - window.innerWidth) / 2,
      y: 0,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
  },
  ContactForm: {
    header: {
      icon: mail,
      title: 'Un petit mess pour CC?',
    },
    component: ContactForm,
    defaultSize: {
      width: 450,
      height: 440,
    },
    defaultOffset: {
      x: (window.innerWidth - window.innerWidth) / 2,
      y: 0,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
  },
  Solitaire: {
    header: {
      icon: BerettaIco,
      title: 'Solitaire',
    },
    component: SolitaireGame,
    defaultSize: {
      width: 597,
      height: 409,
    },
    defaultOffset: {
      x: (window.innerWidth - window.innerWidth) / 2,
      y: 0,
    },
    resizable: true,
    minimized: false,
    //maximized: window.innerWidth < 800,
  },
  Générique: {
    header: {
      icon: generiqueIco,
      title: 'Générique',
    },
    component: Générique,
    defaultSize: {
      width: 646,
      height: 392,
    },
    defaultOffset: {
      x: (window.innerWidth - window.innerWidth) / 2,
      y: 0,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
  },
  FilmComplet: {
    header: {
      icon: playerico,
      title: 'Film Complet',
    },
    component: FilmComplet,
    defaultSize: {
      width: 646,
      height: 392,
    },
    defaultOffset: {
      x: (window.innerWidth - window.innerWidth) / 2,
      y: 0,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
  },
  Error: {
    header: {
      icon: error,
      title: 'C:\\',
      buttons: ['close'],
      noFooterWindow: true,
    },
    component: ErrorBox,
    defaultSize: {
      width: 380,
      height: 0,
    },
    defaultOffset: {
      x: window.innerWidth / 2 - 190,
      y: window.innerHeight / 2 - 60,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: true,
  },
  'My Computer': {
    header: {
      icon: computer,
      title: 'My Computer',
    },
    component: MyComputer,
    defaultSize: {
      width: 660,
      height: 650,
    },
    defaultOffset: {
      x: 260,
      y: 50,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: false,
  },
  Notepad: {
    header: {
      icon: notepad,
      title: 'Bienvenue!',
    },
    component: Notepad,
    defaultSize: {
      width: 400,
      height: 400,
    },
    defaultOffset: {
      x: 70,
      y: 60,
    },
    resizable: true,
    minimized: false,
    // maximized: window.innerWidth < 500,
    multiInstance: true,
  },
  Diffusions: {
    header: {
      icon: filmico,
      title: 'Projections et diffusions à venir',
    },
    component: Projections,
    defaultSize: {
      width: 400,
      height: 400,
    },
    defaultOffset: {
      x: 70,
      y: 60,
    },
    resizable: true,
    minimized: false,
    // maximized: window.innerWidth < 500,
    multiInstance: true,
  },
  Prix_et_selections: {
    header: {
      icon: notepad,
      title: 'Séléctions et Prix',
    },
    component: Prix_et_selections,
    defaultSize: {
      width: 460,
      height: 600,
    },
    defaultOffset: {
      x: 270,
      y: 60,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: true,
  },
  Critiques: {
    header: {
      icon: notepad,
      title: 'Critiques',
    },
    component: Critiques,
    defaultSize: {
      width: 460,
      height: 600,
    },
    defaultOffset: {
      x: 270,
      y: 60,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: true,
  },
  Winamp: {
    header: {
      icon: winamp,
      title: 'Winamp',
      invisible: true,
    },
    component: Winamp,
    defaultSize: {
      width: 0,
      height: 0,
    },
    defaultOffset: {
      x: 10,
      y: 20,
    },
    resizable: false,
    minimized: false,
    maximized: false,
    multiInstance: false,
  },
  Paint: {
    header: {
      icon: paint,
      title: 'Untitled - Paint',
    },
    component: Paint,
    defaultSize: {
      width: 660,
      height: 500,
    },
    defaultOffset: {
      x: 280,
      y: 70,
    },
    resizable: true,
    minimized: false,
    maximized: window.innerWidth < 800,
    multiInstance: true,
  },
};

export {
  InternetExplorer,
  Minesweeper,
  ErrorBox,
  MyComputer,
  Notepad,
  Projections,
  Winamp,
  PhotosDuFilm,
  PhotosDuTournage,
  Beretta,
  Générique,
  Prix_et_selections,
  Critiques,
  SolitaireGame,
  ContactForm,
  BANDEANNONCE,
  FilmComplet,
};
