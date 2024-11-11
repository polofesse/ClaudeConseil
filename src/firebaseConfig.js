// src/firebaseConfig.js
import { initializeApp } from 'firebase/app';

const firebaseConfig = {
  apiKey: 'AIzaSyCYg0P6QTC__YxysxzF8WbGt-tpzk5NTSM',
  authDomain: 'claude-conseil.firebaseapp.com',
  projectId: 'claude-conseil',
  storageBucket: 'claude-conseil.firebasestorage.app',
  messagingSenderId: '510107326568',
  appId: '1:510107326568:web:4d4b06bf6140ac761dc3dd',
  measurementId: 'G-H5RX76XB34',
};

const app = initializeApp(firebaseConfig);

export { app };
