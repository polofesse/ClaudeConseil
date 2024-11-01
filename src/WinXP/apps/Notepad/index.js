import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next'; // Import du hook de traduction
import { WindowDropDowns } from 'components';
import dropDownData from './dropDownData';

export default function Prix_et_selections({ onClose }) {
  const [docText, setDocText] = useState('');
  const [wordWrap, setWordWrap] = useState(false);
  const { t, i18n } = useTranslation(); // Hook de traduction pour obtenir la langue

  useEffect(() => {
    // Détermine le lien à utiliser en fonction de la langue actuelle
    const documentUrl =
      i18n.language === 'en'
        ? 'https://docs.google.com/document/d/e/2PACX-1vSccKM5TGYcskrQa0YyDQz1EYbzXT_uuVzGGVmu4rdsD9O06H5P7G9kfsRx4ksHi3dmA_wXmIkruqXv/pub'
        : 'https://docs.google.com/document/d/e/2PACX-1vT3lwCXXX6AU1gOvGAV-e_MBaPHNvtf68Z1qW-on4gn5C48I13emfJr9mbHMHCjd6Vc9N69-vxv4P4R/pub';

    fetch(documentUrl)
      .then(response => response.text())
      .then(data => {
        const parser = new DOMParser();
        const doc = parser.parseFromString(data, 'text/html');

        let extractedText = '';

        doc.querySelectorAll('h1, h2, h3, p').forEach(element => {
          const tag = element.tagName.toLowerCase();
          const textContent = element.textContent.trim();

          if (textContent) {
            if (tag === 'h1') {
              extractedText += `### ${textContent}\n`;
            } else if (tag === 'h2') {
              extractedText += `## ${textContent}\n`;
            } else if (tag === 'h3') {
              extractedText += `# ${textContent}\n`;
            } else {
              extractedText += `${textContent}\n`;
            }
          }
        });

        setDocText(extractedText);
      })
      .catch(error =>
        console.error('Erreur lors du chargement du document :', error),
      );
  }, [i18n.language]); // Dépendance sur la langue pour déclencher le fetch lors du changement de langue

  function onClickOptionItem(item) {
    switch (item) {
      case 'Exit':
        onClose();
        break;
      case 'Word Wrap':
        setWordWrap(!wordWrap);
        break;
      case 'Time/Date':
        const date = new Date();
        setDocText(
          `${docText}${date.toLocaleTimeString()} ${date.toLocaleDateString()}`,
        );
        break;
      default:
    }
  }

  const renderText = text => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('### '))
        return <StyledH1 key={index}>{line.replace('### ', '')}</StyledH1>;
      if (line.startsWith('## '))
        return <StyledH2 key={index}>{line.replace('## ', '')}</StyledH2>;
      if (line.startsWith('# '))
        return <StyledH3 key={index}>{line.replace('# ', '')}</StyledH3>;
      return <p key={index}>{line}</p>;
    });
  };

  return (
    <Div>
      <section className="np__toolbar">
        <WindowDropDowns items={dropDownData} onClickItem={onClickOptionItem} />
      </section>
      <StyledContent wordWrap={wordWrap}>{renderText(docText)}</StyledContent>
    </Div>
  );
}

const Div = styled.div`
  height: 100%;
  background: linear-gradient(to right, #edede5 0%, #ede8cd 100%);
  display: flex;
  flex-direction: column;
  align-items: stretch;
  .np__toolbar {
    position: relative;
    height: 21px;
    flex-shrink: 0;
    border-bottom: 1px solid white;
  }
`;

const StyledContent = styled.div`
  flex: auto;
  padding: 10px;
  overflow-y: scroll;
  border: 1px solid #96abff;
  background: #fff;
  font-family: 'Lucida Console', monospace;
  font-size: 11px; /* Réduction à environ 3/4 (13px * 0.75) */
  line-height: 1.2em; /* Ajustement léger pour la réduction de taille */
  white-space: pre-wrap;

  p {
    margin-top: 0.1em;
    margin-bottom: 0.1em;
    line-height: inherit;
  }
`;

const StyledH1 = styled.h1`
  font-size: 1.5em; /* Taille réduite pour h1 (2em * 0.75) */
  margin-top: 0.5em;
  margin-bottom: 1.2em;
`;

const StyledH2 = styled.h2`
  font-size: 0.94em; /* Taille réduite pour h2 (1.25em * 0.75) */
  margin-top: 1em;
  margin-bottom: 0.4em;
  position: relative;
  padding-left: 15px; /* Ajustement pour la taille du point */

  &:before {
    content: '•';
    position: absolute;
    left: 0;
    font-size: 1.2em; /* Taille réduite du point */
    line-height: 1em;
  }
`;

const StyledH3 = styled.h3`
  font-size: 0.975em; /* Taille réduite pour h3 (1.3em * 0.75) */
  font-style: italic;
  margin-top: 0.4em;
  margin-bottom: 0.4em;
  position: relative;
  padding-left: 52px; /* Ajustement pour la taille du trophée */

  &::before {
    content: '🦉';
    position: absolute;
    left: 30px;
    top: 0;
    font-size: 1.2em; /* Taille réduite du trophée */
    line-height: 1em;
  }
`;
