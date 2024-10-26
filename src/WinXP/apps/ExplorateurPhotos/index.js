// src/WinXP/apps/ExplorateurPhotos/index.js
import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { WindowDropDowns } from 'components';
import dropDownData from './dropDownData';
import { fetchImgurAlbum } from 'services/imgurService';
import folderIcon from 'assets/windowsIcons/318(48x48).png'; // Placeholder icon

export default function ExplorateurPhotos({ onClose }) {
  const [photos, setPhotos] = useState([]);
  const [selectedPhoto, setSelectedPhoto] = useState(null);

  useEffect(() => {
    // Fetch photos from the Imgur album
    const loadPhotos = async () => {
      try {
        const albumPhotos = await fetchImgurAlbum();
        setPhotos(albumPhotos);
      } catch (error) {
        console.error('Failed to fetch photos', error);
      }
    };
    loadPhotos();
  }, []);

  const handlePhotoClick = photo => {
    setSelectedPhoto(photo);
  };

  return (
    <Div>
      <section className="com__toolbar">
        <div className="com__options">
          <WindowDropDowns items={dropDownData} onClickItem={() => onClose()} />
        </div>
        <img className="com__windows-logo" src={folderIcon} alt="Explorer" />
      </section>
      <section className="com__function_bar">
        <div className="com__function_bar__text">Explorer Bar</div>
      </section>
      <div className="com__content">
        <div className="com__content__inner">
          {photos.map((photo, index) => (
            <div
              key={index}
              className="com__content__right__card__item"
              onClick={() => handlePhotoClick(photo)}
            >
              <img
                src={photo.thumbnailUrl || folderIcon}
                alt={photo.title || 'Photo'}
                className="com__content__right__card__img"
              />
              <div className="com__content__right__card__text">
                {photo.title}
              </div>
            </div>
          ))}
        </div>
      </div>
      {selectedPhoto && (
        <div className="photo-modal">
          <img
            src={selectedPhoto.url}
            alt={selectedPhoto.title}
            className="photo-modal__img"
            onClick={() => setSelectedPhoto(null)}
          />
        </div>
      )}
    </Div>
  );
}

const Div = styled.div`
  height: 100%;
  width: 100%;
  position: absolute;
  display: flex;
  overflow: hidden;
  flex-direction: column;
  background: linear-gradient(to right, #edede5 0%, #ede8cd 100%);

  .com__toolbar {
    position: relative;
    display: flex;
    align-items: center;
    height: 24px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.7);
    flex-shrink: 0;
  }

  .com__content {
    flex: 1;
    background-color: #f1f1f1;
    overflow: auto;
    font-size: 11px;
  }

  .com__content__inner {
    display: flex;
    flex-wrap: wrap;
    padding: 15px;
  }

  .com__content__right__card__item {
    display: flex;
    align-items: center;
    margin: 10px;
    width: 150px;
    cursor: pointer;
  }

  .com__content__right__card__img {
    width: 60px;
    height: 60px;
    margin-right: 10px;
  }

  .photo-modal {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.8);
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .photo-modal__img {
    max-width: 80%;
    max-height: 80%;
    cursor: pointer;
  }
`;
