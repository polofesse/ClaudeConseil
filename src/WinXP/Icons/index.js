import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { useTranslation } from 'react-i18next';

function Icons({
  icons,
  onMouseDown,
  setSelectedIcons,
  displayFocus,
  mouse,
  selecting,
}) {
  const [iconsRect, setIconsRect] = useState([]);
  const [message, setMessage] = useState('');

  const { i18n } = useTranslation(); // Import du hook de traduction

  function measure(rect) {
    if (iconsRect.find(r => r.id === rect.id)) return;
    setIconsRect(iconsRect => [...iconsRect, rect]);
  }

  useEffect(() => {
    if (!selecting) return;
    const sx = Math.min(selecting.x, mouse.docX);
    const sy = Math.min(selecting.y, mouse.docY);
    const sw = Math.abs(selecting.x - mouse.docX);
    const sh = Math.abs(selecting.y - mouse.docY);
    const selectedIds = iconsRect
      .filter(rect => {
        const { x, y, w, h } = rect;
        return x - sx < sw && sx - x < w && y - sy < sh && sy - y < h;
      })
      .map(icon => icon.id);
    setSelectedIcons(selectedIds);
  }, [iconsRect, setSelectedIcons, selecting, mouse.docX, mouse.docY]);

  function handleClickIcon(iconId) {
    if (iconId === 17) {
      // ID pour l'icône anglaise
      i18n.changeLanguage('en');
      setMessage('Language switched to English');
    } else if (iconId === 18) {
      // ID pour l'icône française
      i18n.changeLanguage('fr');
      setMessage('Langue changée en français');
    }

    // Affiche le message pendant 2 secondes
    setTimeout(() => {
      setMessage('');
    }, 2000);
  }

  return (
    <IconsContainer>
      {icons.map(icon => (
        <StyledIcon
          key={icon.id}
          className={
            icon.isLanguageIcon
              ? `language-icon ${
                  icon.id === 17 ? 'icon-en' : icon.id === 18 ? 'icon-fr' : ''
                }`
              : ''
          }
          onClick={() => handleClickIcon(icon.id)} // Utilise un simple clic
          {...icon}
          displayFocus={displayFocus}
          onMouseDown={onMouseDown}
          measure={measure}
        />
      ))}
      {message && <Message>{message}</Message>}
    </IconsContainer>
  );
}

function Icon({
  title,
  onMouseDown,
  icon,
  className,
  id,
  component,
  measure,
  onClick, // Ajoute la propriété onClick
}) {
  const ref = useRef(null);
  function _onMouseDown() {
    onMouseDown(id);
  }
  useEffect(() => {
    const target = ref.current;
    if (!target) return;
    const { left, top, width, height } = ref.current.getBoundingClientRect();
    const posX = left + window.scrollX;
    const posY = top + window.scrollY;
    measure({ id, x: posX, y: posY, w: width, h: height });
  }, [id, measure]);
  return (
    <div
      className={className}
      onMouseDown={_onMouseDown}
      onClick={onClick} // Ajoute l'événement onClick au conteneur de l'icône
      ref={ref}
    >
      <div className={`${className}__img__container`}>
        <img src={icon} alt={title} className={`${className}__img`} />
      </div>
      <div className={`${className}__text__container`}>
        <div className={`${className}__text`}>{title}</div>
      </div>
    </div>
  );
}

const IconsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr); // Adaptation de la grille des icônes
  align-items: top;
  gap: 6px;
  position: absolute;
  margin-top: 20px;
  margin-left: 30px;
`;

const StyledIcon = styled(Icon)`
  width: 70px;
  margin-bottom: 5px;
  display: flex;
  flex-direction: column;
  align-items: center;

  &.language-icon {
    width: 30px;
    height: 30px;
    position: fixed; /* Position relative à la fenêtre */
    bottom: 50px; /* Position de base */
    margin: 0;
  }

  &.icon-en {
    right: 10px; /* Position de l'icône anglaise */
  }

  &.icon-fr {
    right: 40px; /* Position de l'icône française */
  }

  &__text__container {
    width: 100%;
    font-size: 12px;
    color: white;
    text-shadow: 0 1px 1px black;
    margin-top: 5px;
    display: flex;
    justify-content: center;
  }

  &__text {
    padding: 0 3px 2px;
    background-color: ${({ isFocus, displayFocus }) =>
      isFocus && displayFocus ? '#0b61ff' : 'transparent'};
    text-align: center;
    flex-shrink: 1;
  }

  &__img__container {
    width: 40px;
    height: 40px;
    filter: ${({ isFocus, displayFocus }) =>
      isFocus && displayFocus ? 'drop-shadow(0 0 blue)' : ''};
  }

  &__img {
    width: 45px;
    height: 45px;
    opacity: ${({ isFocus, displayFocus }) =>
      isFocus && displayFocus ? 0.5 : 1};
  }
`;
const Message = styled.div`
  position: fixed;
  bottom: 90px; /* Ajuste cette valeur pour la position exacte */
  right: 50px; /* Ajuste cette valeur pour l'alignement horizontal */
  background-color: rgba(0, 0, 0, 0.7);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  font-size: 12px;
  z-index: 1000;
`;

export default Icons;
