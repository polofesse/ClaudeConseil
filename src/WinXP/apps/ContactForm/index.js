// src/WinXP/apps/GuestBook/index.js

import React, { useState } from 'react';
import styled from 'styled-components';
import ReCAPTCHA from 'react-google-recaptcha';

function ContactUs() {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [captchaValue, setCaptchaValue] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);

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

    // Netlify Forms gère la soumission
    setStatusMessage('Votre message a été envoyé avec succès !');

    // Réinitialiser le formulaire
    setMessage('');
    setName('');
    setEmail('');
    setCaptchaValue(null);
  };

  return (
    <GuestBookContainer>
      {/* Formulaire Netlify caché */}
      <form
        name="contact-hidden"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        hidden
      >
        <input type="text" name="name" />
        <input type="email" name="email" />
        <textarea name="message"></textarea>
        <button type="submit">Send</button>
      </form>

      {/* Formulaire principal visible */}
      <form
        name="contact"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        onSubmit={handleSubmit}
      >
        {/* Champ caché pour Netlify */}
        <input type="hidden" name="form-name" value="contact" />
        <GuestBookTitle>📨 Contactez-nous 📨</GuestBookTitle>
        <Input
          type="text"
          placeholder="Votre nom"
          name="name"
          value={name}
          onChange={handleChangeName}
        />
        <Input
          type="email"
          placeholder="Votre adresse e-mail"
          name="email"
          value={email}
          onChange={handleChangeEmail}
        />
        <MessageArea
          placeholder="Écrivez votre message ici..."
          name="message"
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
          <SubmitButton type="submit">Envoyer</SubmitButton>
        </ButtonContainer>
        {statusMessage && <StatusMessage>{statusMessage}</StatusMessage>}
      </form>
      <BirdGif src="https://i.imgur.com/DzRsFAu.gif" alt="bird" />
    </GuestBookContainer>
  );
}

const GuestBookContainer = styled.div`
  width: 100%;
  max-width: 500px;
  margin: 0 auto;
  padding: 15px; /* Réduit la taille du padding */
  background: #f0f4ff;
  border: 2px solid #a3baff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
  height: calc(100%); /* Réduction de la hauteur de 80px */
  position: relative; /* Nécessaire pour positionner le gif */
`;

const GuestBookTitle = styled.h1`
  text-align: center;
  font-size: 24px;
  color: #333;
  margin-bottom: 10px; /* Réduit l'espacement en dessous du titre */
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px; /* Réduit le padding des champs */
  font-size: 16px;
  margin-bottom: 10px; /* Réduit l'espacement entre les champs */
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
  min-height: 120px; /* Réduit la hauteur minimale du champ de message */
  padding: 10px; /* Réduit le padding du champ de message */
  font-size: 16px;
  border-radius: 8px;
  border: 1px solid #a3baff;
  resize: none;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 10px; /* Réduit l'espacement entre les champs */
  &:focus {
    outline: none;
    border-color: #5f87ff;
  }
`;

const CaptchaContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 15px;
  margin-bottom: 15px;
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
  padding: 10px 20px;
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
  margin-top: 15px;
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
