import React from 'react';
import ImageGallery from 'react-image-gallery';
import 'react-image-gallery/styles/css/image-gallery.css';
import './MyGallery.css';

const newImages = [
  'https://i.imgur.com/5n6g7yj.jpg',
  'https://i.imgur.com/UQ7piBz.jpg',
  'https://i.imgur.com/mvpGBFH.jpg',
  'https://i.imgur.com/LdQe4Jz.jpg',
  'https://i.imgur.com/s7LjKLv.jpg',
  'https://i.imgur.com/hw0J06X.jpg',
  'https://i.imgur.com/CfrplRl.jpg',
  'https://i.imgur.com/YvU5Vpf.jpg',
].map(url => ({
  original: url,
  thumbnail: url.replace('.jpg', 't.jpg'),
}));

const GalleryComponent = () => {
  return (
    <div
      style={{
        backgroundColor: 'black', // Fond noir pour la galerie
        padding: '10px', // Optionnel : pour éviter que les images collent aux bords
      }}
    >
      <ImageGallery items={newImages} additionalClass="custom-gallery" />
    </div>
  );
};

export default GalleryComponent;
