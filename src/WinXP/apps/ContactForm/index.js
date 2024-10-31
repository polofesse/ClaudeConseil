import React, { useState } from 'react';
import styled from 'styled-components';
import ReCAPTCHA from 'react-google-recaptcha';

function ContactUs() {
  const [message, setMessage] = useState('');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subscribeNewsletter, setSubscribeNewsletter] = useState(false);
  const [captchaValue, setCaptchaValue] = useState(null);
  const [statusMessage, setStatusMessage] = useState(null);

  const handleChangeMessage = e => setMessage(e.target.value);
  const handleChangeName = e => setName(e.target.value);
  const handleChangeEmail = e => setEmail(e.target.value);
  const handleSubscribeChange = e => setSubscribeNewsletter(e.target.checked);
  const handleCaptchaChange = value => setCaptchaValue(value);

  const handleSubmit = async e => {
    e.preventDefault();

    // Vérifiez que tous les champs sont remplis
    if (!name || !email || !message || !captchaValue) {
      setStatusMessage(
        'Veuillez remplir tous les champs et valider le captcha.',
      );
      return;
    }

    // Créez un objet FormData pour envoyer les données de formulaire
    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('message', message);
    formData.append('subscribeNewsletter', subscribeNewsletter);
    formData.append('bot-field', ''); // Champ honeypot
    formData.append('form-name', 'contact-hidden'); // Nom du formulaire caché

    // Envoyez les données de formulaire à Netlify
    try {
      const response = await fetch('/', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        setStatusMessage('Votre message a été envoyé avec succès !');
      } else {
        setStatusMessage('Une erreur est survenue. Veuillez réessayer.');
      }
    } catch (error) {
      setStatusMessage(
        'Une erreur est survenue. Veuillez vérifier votre connexion internet.',
      );
    }

    // Réinitialisez le formulaire
    setMessage('');
    setName('');
    setEmail('');
    setCaptchaValue(null);
    setSubscribeNewsletter(false);
  };

  return (
    <GuestBookContainer>
      <GuestBookTitle>📨 Contactez-nous 📨</GuestBookTitle>
      <form
        name="contact-hidden"
        method="POST"
        data-netlify="true"
        netlify-honeypot="bot-field"
        hidden
      >
        {/* Formulaire caché pour Netlify */}
        <input type="text" name="name" />
        <input type="email" name="email" />
        <textarea name="message"></textarea>
        <input type="checkbox" name="subscribeNewsletter" />
      </form>
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
      <CheckboxContainer>
        <label>
          <Checkbox
            type="checkbox"
            checked={subscribeNewsletter}
            onChange={handleSubscribeChange}
          />
          S'inscrire à la newsletter
        </label>
      </CheckboxContainer>
      <CaptchaContainer>
        <ReCAPTCHA
          sitekey="6Le1NG0qAAAAAMcyks04MvBRUHdIZBVPk0H3maqw"
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
  max-width: 450px;
  margin: 0 auto;
  padding: 15px;
  background: #f0f4ff;
  border: 2px solid #a3baff;
  border-radius: 12px;
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
`;

const GuestBookTitle = styled.h1`
  text-align: center;
  font-size: 22px;
  color: #333;
  margin-bottom: 8px;
  font-weight: bold;
`;

const Input = styled.input`
  width: 100%;
  padding: 6px;
  font-size: 14px;
  margin-bottom: 8px;
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
  min-height: 100px;
  padding: 8px;
  font-size: 14px;
  border-radius: 8px;
  border: 1px solid #a3baff;
  resize: none;
  box-shadow: inset 0 2px 4px rgba(0, 0, 0, 0.1);
  margin-bottom: 8px;
  &:focus {
    outline: none;
    border-color: #5f87ff;
  }
`;

const CheckboxContainer = styled.div`
  margin-bottom: 8px;
`;

const Checkbox = styled.input`
  margin-right: 5px;
  transform: scale(0.9);
`;

const CaptchaContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 10px;
  margin-bottom: 10px;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const SubmitButton = styled.button`
  background-color: #5f87ff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  padding: 8px 16px;
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
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
  color: #3a62c4;
  font-weight: bold;
`;

const BirdGif = styled.img`
  position: absolute;
  bottom: -20px;
  left: 50%;
  transform: translateX(-50%);
  width: 150px;
  height: auto;
  pointer-events: none;
`;

export default ContactUs;
