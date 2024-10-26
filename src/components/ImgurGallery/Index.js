// src/components/ImgurGallery.js

import React, { useState, useEffect } from 'react';
import { fetchImgurAlbum } from '../services/imgurService';

const ImgurGallery = () => {
  const [photos, setPhotos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getPhotos = async () => {
      setLoading(true);
      const albumPhotos = await fetchImgurAlbum();
      setPhotos(albumPhotos);
      setLoading(false);
    };

    getPhotos();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
      {photos.map(photo => (
        <img
          key={photo.id}
          src={photo.link}
          alt={photo.title || 'Imgur photo'}
          style={{ width: '200px', height: 'auto', borderRadius: '8px' }}
        />
      ))}
    </div>
  );
};

export default ImgurGallery;
