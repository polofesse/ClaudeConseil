import React, { useState, useEffect, useCallback } from 'react';
import ReactPlayer from 'react-player';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

const FilmComplet = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [captchaPassed, setCaptchaPassed] = useState(false);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
  const [captchaSuccess, setCaptchaSuccess] = useState(false);
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');
  const [texts, setTexts] = useState({
    intro: '',
    askName: '',
    quizIntro: '',
    questions: [],
    comfortQuestion: '',
    finalMessage: '',
  });
  const [showSolitaire, setShowSolitaire] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const { i18n } = useTranslation(); // Ajoutez ceci pour gérer la langue

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android|iPad|iPhone|iPod/.test(userAgent.toLowerCase())) {
      setIsMobile(true);
    }
  }, []);

  useEffect(() => {
    const fetchTextData = async () => {
      try {
        // Choisissez l'URL en fonction de la langue actuelle
        const documentUrl =
          i18n.language === 'en'
            ? 'https://docs.google.com/document/d/e/2PACX-1vSPx3QbG1g7oH2WnKoajEf7jKiRAR7Ep5NGKWeS23sB6f17-gIUO8EHp1KRBBjutdM6dzPdFRHKI2ze/pub'
            : 'https://docs.google.com/document/d/e/2PACX-1vT4xiLJstLDnXFPoliGUdduyDctBi3knkcNK_ApJ2yDmcHjxfYR6jzfRKIedy7bdb5BQXLc2wf5UIF6/pub';

        const data = await (await fetch(documentUrl)).text();
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');
        let extractedText = '';

        const paragraphs = Array.from(doc.querySelectorAll('p'));
        const newTexts = {
          intro: '',
          askName: '',
          quizIntro: '',
          questions: [],
          comfortQuestion: '',
          finalMessage: '',
        };

        let currentSection = '';
        paragraphs.forEach(p => {
          const text = p.textContent.trim();
          if (text.startsWith('# Introduction')) {
            currentSection = 'intro';
            newTexts.intro = p.nextElementSibling?.textContent || '';
          } else if (text.startsWith('# Demande de prénom')) {
            currentSection = 'askName';
            newTexts.askName = p.nextElementSibling?.textContent || '';
          } else if (text.startsWith('# Quiz')) {
            currentSection = 'quizIntro';
            newTexts.quizIntro = p.nextElementSibling?.textContent || '';
          } else if (text.startsWith('# Questions')) {
            currentSection = 'questions';
          } else if (currentSection === 'questions' && text.includes('=')) {
            const [question, answer] = text.split('=').map(str => str.trim());
            newTexts.questions.push({ question, answer });
          } else if (text.startsWith('# Question confort')) {
            currentSection = 'comfortQuestion';
            newTexts.comfortQuestion = p.nextElementSibling?.textContent || '';
          } else if (text.startsWith('# Message final')) {
            currentSection = 'finalMessage';
            newTexts.finalMessage = p.nextElementSibling?.textContent || '';
          }
        });

        if (newTexts.questions.length === 0) {
          console.error('No questions found in the document.');
        }

        setTexts(newTexts);
        setCurrentQuestion(
          newTexts.questions[
            Math.floor(Math.random() * newTexts.questions.length)
          ],
        );
      } catch (error) {
        console.error('Error loading text:', error);
      }
    };

    fetchTextData();
  }, [i18n.language]); // Dépendance sur la langue

  const handleNextStep = useCallback(() => {
    if (step === 1 && !name) {
      alert('Please enter your name!');
    } else if (step === 2 && !captchaPassed) {
      alert('Please answer the quiz correctly!');
    } else {
      setStep(step + 1);
    }
  }, [step, name, captchaPassed]);

  const openSolitaire = () => {
    setShowSolitaire(true);
  };

  const checkCaptcha = () => {
    if (
      currentQuestion &&
      captchaAnswer.toLowerCase().trim() ===
        currentQuestion.answer.toLowerCase().trim()
    ) {
      setCaptchaPassed(true);
      setCaptchaSuccess(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Incorrect answer. Try again!');
    }
  };

  useEffect(() => {
    if (captchaSuccess) {
      handleNextStep();
      setCaptchaSuccess(false);
    }
  }, [captchaSuccess, handleNextStep]);

  if (showSolitaire) {
    return <SolitaireGame />;
  }

  // Définir l'URL de la vidéo selon la langue
  const videoUrl =
    i18n.language === 'en'
      ? 'URL_OF_THE_ENGLISH_VIMEO_VIDEO'
      : 'https://youtu.be/IWL6c3zkJ_E';

  return (
    <Container>
      {isMobile && step !== 5 && (
        <MobileWarning>
          Warning: Watching this film on a mobile device is not recommended.
        </MobileWarning>
      )}
      {step < 5 && (
        <TextOverlay>
          {step === 1 && (
            <StepContainer>
              <Title>{texts.intro}</Title>
              <Text>{texts.askName}</Text>
              <Input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                placeholder="Enter your name here"
              />
              <ButtonContainer>
                <Button onClick={handleNextStep}>Continue</Button>
                <Button onClick={openSolitaire}>Cancel</Button>
              </ButtonContainer>
            </StepContainer>
          )}
          {step === 2 && currentQuestion && (
            <StepContainer>
              <Title>{texts.quizIntro}</Title>
              <Text>{currentQuestion.question}</Text>
              <Input
                type="text"
                value={captchaAnswer}
                onChange={e => setCaptchaAnswer(e.target.value)}
                placeholder="Enter your answer here"
              />
              <ButtonContainer>
                <Button onClick={checkCaptcha}>Verify and Continue</Button>
                <Button onClick={openSolitaire}>Cancel</Button>
              </ButtonContainer>
              {errorMessage && (
                <ErrorContainer>
                  <ErrorIcon
                    src="https://i.imgur.com/5DLQGeM.png"
                    alt="Error"
                  />
                  <ErrorText>{errorMessage}</ErrorText>
                </ErrorContainer>
              )}
            </StepContainer>
          )}
          {step === 3 && (
            <StepContainer>
              <Title>{texts.comfortQuestion.replace('{name}', name)}</Title>
              <Text>
                Ready to watch a 24-minute movie in peace, alone or with
                friends?
              </Text>
              <ButtonContainer>
                <Button onClick={handleNextStep}>Yes</Button>
                <Button onClick={openSolitaire}>No</Button>
              </ButtonContainer>
            </StepContainer>
          )}
          {step === 4 && (
            <StepContainer>
              <Title>The Mysterious Adventures of Claude Conseil</Title>
              <Text>{texts.finalMessage.replace('{name}', name)}</Text>
              <ButtonContainer>
                <Button onClick={handleNextStep}>Next</Button>
              </ButtonContainer>
            </StepContainer>
          )}
        </TextOverlay>
      )}
      {step === 5 && (
        <ReactPlayerContainer>
          <ReactPlayer url={videoUrl} width="100%" height="100%" />
        </ReactPlayerContainer>
      )}
    </Container>
  );
};

// Reste des styles inchangés

// Styles
// ... (les styles existants restent inchangés)

// Styles
const Container = styled.div`
  position: relative;
  text-align: center;
  width: 100%;
  height: 100vh; /* Prend toute la hauteur de l'écran */
  background: url('https://i.imgur.com/1dpCjEF.jpg') no-repeat center center; /* URL de ton poster */
  background-size: cover; /* S'assure que l'image couvre toute la zone */
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StepContainer = styled.div`
  margin: 20px auto;
  z-index: 2;
  max-width: 90%;
  padding-right: 0px; /* Ajout d'un padding pour ajuster l'affiche */
  text-align: left;
`;
const TextOverlay = styled.div`
  background-color: rgba(255, 255, 255, 0.8); /* Fond blanc semi-transparent */
  padding: 20px;
  border-radius: 12px;
  max-width: 70%; /* Largeur maximale du conteneur */
  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.2);
`;

const Title = styled.h2`
  font-size: 20px;
  margin-bottom: 15px;
`;

const Text = styled.p`
  font-size: 14px;
  margin-bottom: 15px;
`;

const Input = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 15px;
  font-size: 14px;
  border-radius: 5px;
  border: 1px solid #a3baff;
`;

const ButtonContainer = styled.div`
  display: flex;
  justify-content: center;
`;

const Button = styled.button`
  background-color: #5f87ff;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 8px;
  padding: 10px 20px;
  cursor: pointer;
  transition: background-color 0.3s ease;
  margin: 0 10px;
  &:hover {
    background-color: #4772e6;
  }
`;

const ReactPlayerContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const ErrorContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: 15px;
  background-color: #ffe6e6;
  border: 2px solid #ff4c4c;
  border-radius: 8px;
  padding: 10px;
`;

const ErrorIcon = styled.img`
  width: 24px;
  height: 24px;
  margin-right: 10px;
`;

const ErrorText = styled.p`
  color: #ff4c4c;
  font-size: 16px;
  font-weight: bold;
`;
const MobileWarning = styled.div`
  position: fixed;
  top: 10px;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(255, 0, 0, 0.8);
  color: white;
  padding: 10px 20px;
  border-radius: 8px;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  z-index: 10;
  text-align: center;
  font-size: 14px;
`;

const FullScreenContainer = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  z-index: 1000; /* Assurez-vous qu'il est au-dessus de tout autre contenu */
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #000; /* Optionnel : un fond pour l'iframe */
`;

export default FilmComplet;
