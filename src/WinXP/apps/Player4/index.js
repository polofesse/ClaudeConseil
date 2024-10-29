import React, { useState, useEffect, useCallback } from 'react';
import ReactPlayer from 'react-player/youtube';
import styled from 'styled-components';

const Beretta = () => {
  const [step, setStep] = useState(1);
  const [name, setName] = useState('');
  const [captchaPassed, setCaptchaPassed] = useState(false);
  const [captchaAnswer, setCaptchaAnswer] = useState('');
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

  useEffect(() => {
    const userAgent = navigator.userAgent || navigator.vendor || window.opera;
    if (/android|iPad|iPhone|iPod/.test(userAgent.toLowerCase())) {
      setIsMobile(true);
    }
  }, []);

  useEffect(() => {
    const fetchTextData = async () => {
      try {
        const response = await fetch(
          'https://docs.google.com/document/d/e/2PACX-1vT4xiLJstLDnXFPoliGUdduyDctBi3knkcNK_ApJ2yDmcHjxfYR6jzfRKIedy7bdb5BQXLc2wf5UIF6/pub',
        );
        const data = await response.text();

        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');

        // Log pour vérifier la structure du document
        console.log('Document:', doc);

        // Recherche des paragraphes contenant les sections identifiées par un "#"
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

          // Identifier les sections par le texte des balises <p> commençant par #
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
          console.error('Aucune question trouvée dans le document.');
        }

        setTexts(newTexts);
        setCurrentQuestion(
          newTexts.questions[
            Math.floor(Math.random() * newTexts.questions.length)
          ],
        );
      } catch (error) {
        console.error('Erreur lors du chargement du texte :', error);
      }
    };

    fetchTextData();
  }, []);

  const handleNextStep = useCallback(() => {
    if (step === 1 && !name) {
      alert('Veuillez entrer votre prénom !');
    } else if (step === 2 && !captchaPassed) {
      alert('Veuillez répondre correctement au quiz !');
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
      setErrorMessage(''); // Réinitialiser le message d'erreur en cas de succès
      handleNextStep(); // Appeler handleNextStep directement
    } else {
      setErrorMessage('Réponse incorrecte. Essayez encore !');
    }
  };

  // Utiliser un useEffect pour détecter les changements dans captchaPassed
  // useEffect(() => {
  //   if (captchaPassed) {
  //     handleNextStep();
  //   }
  // }, [captchaPassed, handleNextStep]);

  if (showSolitaire) {
    return <SolitaireGame />;
  }

  return (
    <Container>
      {isMobile && step !== 5 && (
        <MobileWarning>
          Attention : Il est déconseillé de regarder ce film sur un appareil
          mobile.
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
                placeholder="Entrez votre prénom ici"
              />
              <ButtonContainer>
                <Button onClick={handleNextStep}>Continuer</Button>
                <Button onClick={openSolitaire}>Annuler</Button>
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
                placeholder="Entrez votre réponse ici"
              />
              <ButtonContainer>
                <Button onClick={checkCaptcha}>Vérifier et Continuer</Button>
                <Button onClick={openSolitaire}>Annuler</Button>
              </ButtonContainer>
              {errorMessage && (
                <ErrorContainer>
                  <ErrorIcon
                    src="https://i.imgur.com/5DLQGeM.png"
                    alt="Erreur"
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
                Prêt.e.s à voir un film de 24 minutes, dans le calme, seul.e ou
                avec des amis ?
              </Text>
              <ButtonContainer>
                <Button onClick={handleNextStep}>Oui</Button>
                <Button onClick={openSolitaire}>Non</Button>
              </ButtonContainer>
            </StepContainer>
          )}
          {step === 4 && (
            <StepContainer>
              <Title>Les Mystérieuses Aventures de Claude Conseil</Title>
              <Text>{texts.finalMessage.replace('{name}', name)}</Text>
              <ButtonContainer>
                <Button onClick={handleNextStep}>Suivant</Button>
              </ButtonContainer>
            </StepContainer>
          )}
        </TextOverlay>
      )}
      {step === 5 && (
        <ReactPlayerContainer>
          <ReactPlayer
            url="https://youtu.be/IWL6c3zkJ_E"
            width="100%"
            height="100%"
          />
        </ReactPlayerContainer>
      )}
    </Container>
  );
};

const SolitaireGame = () => {
  return (
    <FullScreenContainer>
      <iframe
        src="https://www.squidbyte.com/games/spidersolitairewindowsxp/"
        title="Spider Solitaire Windows XP"
        width="100%"
        height="100%"
        style={{ border: 'none', display: 'block' }}
      ></iframe>
    </FullScreenContainer>
  );
};

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

export default Beretta;
