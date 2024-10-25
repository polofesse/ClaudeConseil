import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { WindowDropDowns } from 'components';
import dropDownData from './dropDownData';

export default function Prix_et_selections({ onClose }) {
  const [docText, setDocText] = useState(
    "Bienvenue sur le site du film\nLes Mystérieuses Aventures de Claude Conseil \nLe site est encore en construction, \net l'affichage est adapté à un ordinateur de bureau \nBonne visite!",
  );
  const [wordWrap, setWordWrap] = useState(false);

  useEffect(() => {
    fetch(process.env.PUBLIC_URL + '/selections.html')
      .then(response => response.text())
      .then(data => {
        setDocText(data);
      });
  }, []);

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

  // Fonction pour convertir le texte en HTML structuré
  const renderText = text => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('# '))
        return <StyledH3 key={index}>{line.replace('# ', '')}</StyledH3>;
      if (line.startsWith('## '))
        return <StyledH2 key={index}>{line.replace('## ', '')}</StyledH2>;
      if (line.startsWith('### '))
        return <StyledH1 key={index}>{line.replace('### ', '')}</StyledH1>;
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
  font-size: 13px;
  line-height: 14px;
  white-space: pre-wrap;

  p {
    margin-top: 0.25em;
    margin-bottom: 0.25em;
  }
`;

// Style pour h1 plus grand
const StyledH1 = styled.h1`
  font-size: 2em; /* Taille plus grande pour h1 */
  margin-top: 0.5em;
  margin-bottom: 1.5em;
`;

// Style pour h2 avec un point devant
const StyledH2 = styled.h2`
  font-size: 1.25em;
  margin-top: 1.2em;
  margin-bottom: 0.5em;
  position: relative;
  padding-left: 20px; /* Espace pour le point */

  &:before {
    content: '•';
    position: absolute;
    left: 0;
    font-size: 1.5em; /* Taille du point */
    line-height: 1em;
  }
`;

// Style pour h3 avec un trophée devant
const StyledH3 = styled.h3`
  font-size: 1.3em; /* Taille plus petite pour h3 */
  font-style: italic; /* Italique pour h3 */
  margin-top: 0.5em;
  margin-bottom: 0.5em;
  position: relative;
  padding-left: 30px; /* Espace pour le trophée */

  &::before {
    content: '🏆';
    position: absolute;
    left: 30px;
    top: 0;
    font-size: 1.5em; /* Taille du trophée */
    line-height: 1em;
  }
`;
