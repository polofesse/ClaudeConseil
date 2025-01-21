import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';
import { WindowDropDowns } from 'components';
import dropDownData from './dropDownData';

export default function Prix_et_selections({ onClose }) {
  const [firstText, setFirstText] = useState('');
  const [secondText, setSecondText] = useState('');
  const [wordWrap, setWordWrap] = useState(false);
  const { t, i18n } = useTranslation();

  useEffect(() => {
    const firstDocumentUrl =
      i18n.language === 'en'
        ? 'https://docs.google.com/document/d/e/2PACX-1vSccKM5TGYcskrQa0YyDQz1EYbzXT_uuVzGGVmu4rdsD9O06H5P7G9kfsRx4ksHi3dmA_wXmIkruqXv/pub'
        : 'https://docs.google.com/document/d/e/2PACX-1vT3lwCXXX6AU1gOvGAV-e_MBaPHNvtf68Z1qW-on4gn5C48I13emfJr9mbHMHCjd6Vc9N69-vxv4P4R/pub';

    const secondDocumentUrl =
      i18n.language === 'en'
        ? 'https://docs.google.com/document/d/e/2PACX-1vQMLp0EljpZIcubvnzVF_uDmYIODLGz1sGxcioeabKNwXWlNAIajY3qqMeRhwQnd9YOiTZt3H8QklDF/pub'
        : 'https://docs.google.com/document/d/e/2PACX-1vRjJI-pnzzgt9N1mY4Us2V4oFWdYLx9MfDphQWXQjcg2FVRQj8IBX9Pe0UKIpyeGd2G6rrWvh4gPVib/pub';

    const fetchText = async (url, setText) => {
      try {
        const response = await fetch(url);
        const data = await response.text();
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
        setText(extractedText);
      } catch (error) {
        console.error('Erreur lors du chargement du document :', error);
      }
    };

    fetchText(firstDocumentUrl, setFirstText);
    fetchText(secondDocumentUrl, setSecondText);
  }, [t, i18n.language]);

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
        setFirstText(
          `${firstText}${date.toLocaleTimeString()} ${date.toLocaleDateString()}`,
        );
        break;
      default:
    }
  }

  const renderText = text => {
    return text.split('\n').map((line, index) => {
      if (line.startsWith('### ')) {
        const isLink = line.includes('<a');
        return (
          <StyledH1 key={index}>
            {isLink ? (
              <span
                dangerouslySetInnerHTML={{
                  __html: line.replace('### ', ''),
                }}
              />
            ) : (
              line.replace('### ', '')
            )}
          </StyledH1>
        );
      }
      if (line.startsWith('## ')) {
        return <StyledH2 key={index}>{line.replace('## ', '')}</StyledH2>;
      }
      if (line.startsWith('# ')) {
        return <StyledH3 key={index}>{line.replace('# ', '')}</StyledH3>;
      }
      return <p key={index}>{line}</p>;
    });
  };

  return (
    <Div>
      <section className="np__toolbar">
        <WindowDropDowns items={dropDownData} onClickItem={onClickOptionItem} />
      </section>
      <StyledContent wordWrap={wordWrap}>
        <StyledH1
          dangerouslySetInnerHTML={{
            __html: t('movieAvailable', { link: t('linkText') }),
          }}
        />
        {renderText(firstText)}
        <StyledImage src="https://i.imgur.com/rUs7GBA.jpg" alt="Illustration" />
        {renderText(secondText)}
      </StyledContent>
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
  font-size: 11px;
  line-height: 1.2em;
  white-space: pre-wrap;

  p {
    margin-top: 1em;
    margin-bottom: 1em;
    line-height: 1.5em;
  }
`;

const StyledImage = styled.img`
  display: block;
  max-width: 100%;
  margin: 2em auto;
  border-radius: 8px;
  border: 1px solid #ccc;
`;

const StyledH1 = styled.h1`
  font-size: 1.5em;
  margin-top: 0.5em;
  margin-bottom: 1.2em;
  line-height: 1.2em; /* Interligne normal */
`;

const StyledH2 = styled.h2`
  font-size: 0.94em;
  margin-top: 1em;
  margin-bottom: 0.4em;
  position: relative;
  padding-left: 15px;

  &:before {
    content: '•';
    position: absolute;
    left: 0;
    font-size: 1.2em;
    line-height: 1em;
  }
`;

const StyledH3 = styled.h3`
  font-size: 0.975em;
  font-style: italic;
  margin-top: 0.4em;
  margin-bottom: 0.4em;
  position: relative;
  padding-left: 52px;

  &::before {
    content: '🦉';
    position: absolute;
    left: 30px;
    top: 0;
    font-size: 1.2em;
    line-height: 1em;
  }
`;
