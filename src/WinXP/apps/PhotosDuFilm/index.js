import React, { useState, useEffect } from 'react';
import ImageGallery from 'react-image-gallery';
import { getStorage, ref, listAll, getDownloadURL } from 'firebase/storage';
import { app } from '../../../firebaseConfig';
import 'react-image-gallery/styles/css/image-gallery.css';

const GalleryComponent = () => {
  const [images, setImages] = useState([]);
  const storage = getStorage(app);

  useEffect(() => {
    const loadImagesIncrementally = async () => {
      const storageRef = ref(storage, 'STILLS/FULL');
      const result = await listAll(storageRef);

      result.items.forEach(async imageRef => {
        const url = await getDownloadURL(imageRef);

        const thumbnailName = imageRef.name.replace(
          /_1(\.[\w\d_-]+)$/i,
          '_1thumb$1',
        );
        const thumbnailRef = ref(
          storage,
          `STILLS/FULL/thumbnails/${thumbnailName}`,
        );

        let thumbnailUrl;
        try {
          thumbnailUrl = await getDownloadURL(thumbnailRef);
        } catch (error) {
          console.warn(
            `Miniature non trouvée pour ${imageRef.name}, utilisation de l'image complète.`,
          );
          thumbnailUrl = url;
        }

        setImages(prevImages => [
          ...prevImages,
          { original: url, thumbnail: thumbnailUrl },
        ]);
      });
    };

    loadImagesIncrementally().catch(error => {
      console.error('Erreur lors de la récupération des images:', error);
    });
  }, [storage]);

  return (
    <div
      style={{
        // maxWidth: '90vw',
        maxHeight: '80vh',
        // margin: '0',
        backgroundColor: 'black', // Fond noir pour éviter le bleu
        padding: '10px', // Optionnel : pour éviter que les images collent aux bords
      }}
    >
      <ImageGallery items={images} additionalClass="custom-gallery" />
    </div>
  );
};

export default GalleryComponent;
