// src/WinXP/apps/GuestBook/index.js

import React, { useState } from 'react';
import styled from 'styled-components';
import ReCAPTCHA from 'react-google-recaptcha';

function ContactUs() {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null); // Ajout d'un état pour le message de retour

  const handleChangeMessage = e => setMessage(e.target.value);
  const handleChangeName = e => setName(e.target.value);
  const handleChangeEmail = e => setEmail(e.target.value);
  const handleCaptchaChange = value => setCaptchaValue(value);

  const handleSubmit = async e => {
    e.preventDefault();

    // Vérifier si tous les champs sont remplis et que le captcha est validé
    if (!name || !email || !message || !captchaValue) {
      setStatusMessage(
        'Veuillez remplir tous les champs et valider le captcha.',
      );
      return;
    }

    // Envoyer les données à la fonction Netlify
    try {
      const response = await fetch('/.netlify/functions/send-email', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message, captchaValue }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatusMessage('Votre message a été envoyé avec succès !');
      } else {
        setStatusMessage(
          result.message || 'Une erreur est survenue. Veuillez réessayer.',
        );
      }
    } catch (error) {
      setStatusMessage(
        'Une erreur est survenue. Veuillez vérifier votre connexion internet.',
      );
    }

    // Réinitialiser le formulaire
    setMessage('');
    setName('');
    setEmail('');
    setCaptchaValue(null);
  };

  return (
    <GuestBookContainer>
      <GuestBookTitle>📨 Contactez-nous 📨</GuestBookTitle>
      <Input
        type="text"
        placeholder="Votre nom"
        value={name}
        onChange={handleChangeName}
      />
      <Input
        type="email"
        placeholder="Votre adresse e-mail"
        value={email}
        onChange={handleChangeEmail}
      />
      <MessageArea
        placeholder="Écrivez votre message ici..."
        value={message}
        onChange={handleChangeMessage}
      />
      <CaptchaContainer>
        <ReCAPTCHA
          sitekey="6Le1NG0qAAAAAMcyks04MvBRUHdIZBVPk0H3maqw" // Remplacez par votre clé de site reCAPTCHA
          onChange={handleCaptchaChange}
        />
      </CaptchaContainer>
      <ButtonContainer>
        <SubmitButton onClick={handleSubmit}>Envoyer</SubmitButton>
      </ButtonContainer>
      {statusMessage && <StatusMessage>{statusMessage}</StatusMessage>}
      <BirdGif src="https://i.imgur.com/DzRsFAu.gif" alt="bird" />
    </GuestBookContainer>
  );
}

const GuestBookContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 20px;
  background: #f0f4ff;
  border: 2px solid #a3baff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  position: relative; /* Nécessaire pour positionner le gif */
`;

const GuestBookTitle = styled.h1`
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 15px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  font-size: 16px;
  margin-bottom: 15px;
  border-radius: 8px;
  border: 1px solid #a3baff;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  &:focus {
    outline: none;
    border-color: #5f87ff;
  }
`;

const MessageArea = styled.textarea`
  width: 100%;
  min-height: 150px;
  padding: 15px;
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #a3baff;
  resize: none;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  &:focus {
    outline: none;
    border-color: #5f87ff;
  }
`;

const CaptchaContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  margin-bottom: 20px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SubmitButton = styled.button`
  background-color: #5f87ff;
  color: white;
  font-size: 18px;
  border: none;
  border-radius: 8px;
  padding: 12px 24px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  &:hover {
    background-color: #4772e6;
  }
  &:active {
    background-color: #3a62c4;
  }
`;

const StatusMessage = styled.div`
  margin-top: 20px;
  text-align: center;
  font-size: 16px;
  color: #3a62c4;
  font-weight: bold;
`;

const BirdGif = styled.img`
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 200px;
  height: auto;
  pointer-events: none; /* Pour éviter l'interaction avec le gif */
`;

export default ContactUs;
