require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const axios = require('axios');

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware pour parser le JSON
app.use(bodyParser.json());

// Configuration du transporteur de mail (Gmail ici, ajustez selon votre besoin)
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

// Fonction de vérification reCAPTCHA
async function verifyRecaptcha(token) {
  const secretKey = process.env.RECAPTCHA_SECRET_KEY;
  const response = await axios.post(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
  );
  return response.data.success;
}

// Route POST pour recevoir les messages
app.post('/send-message', async (req, res) => {
  const { name, email, message, recaptchaToken } = req.body;

  // Vérifier le token reCAPTCHA
  try {
    const isHuman = await verifyRecaptcha(recaptchaToken);
    if (!isHuman) {
      return res.status(400).json({ error: 'reCAPTCHA validation failed.' });
    }
  } catch (error) {
    return res.status(500).json({ error: 'Failed to verify reCAPTCHA.' });
  }

  // Configuration de l'email à envoyer
  const mailOptions = {
    from: email,
    to: process.env.EMAIL_RECEIVER, // L'adresse email où les messages seront envoyés
    subject: `Nouveau message de ${name}`,
    text: message,
    html: `<p><strong>Nom :</strong> ${name}</p>
           <p><strong>Email :</strong> ${email}</p>
           <p><strong>Message :</strong> ${message}</p>`,
  };

  // Envoyer l'email
  transporter.sendMail(mailOptions, (error, info) => {
    if (error) {
      console.error(error);
      return res.status(500).json({ error: 'Failed to send the message.' });
    }
    res.status(200).json({ message: 'Message sent successfully!' });
  });
});

// Démarrer le serveur
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
