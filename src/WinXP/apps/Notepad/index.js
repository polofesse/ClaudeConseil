import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

import { WindowDropDowns } from 'components';
import dropDownData from './dropDownData';

export default function Notepad({ onClose }) {
  const [docText, setDocText] = useState('');
  const [wordWrap, setWordWrap] = useState(true);

  useEffect(() => {
    fetch('/presentation.html')
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
        return <h1 key={index}>{line.replace('# ', '')}</h1>;
      if (line.startsWith('## '))
        return <h2 key={index}>{line.replace('## ', '')}</h2>;
      if (line.startsWith('### '))
        return <h3 key={index}>{line.replace('### ', '')}</h3>;
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
  background: #fff;
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

  h1 {
    font-size: 1.5em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }

  h2 {
    font-size: 1.25em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }

  h3 {
    font-size: 1.1em;
    margin-top: 0.5em;
    margin-bottom: 0.5em;
  }

  p {
    margin-top: 0.25em;
    margin-bottom: 0.25em;
  }
`;
