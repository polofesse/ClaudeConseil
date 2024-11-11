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
      const storageRef = ref(storage, 'STILLS/FULL'); // Chemin du dossier des images principales
      const result = await listAll(storageRef);

      result.items.forEach(async imageRef => {
        const url = await getDownloadURL(imageRef);

        // Construire le nom du fichier miniature en remplaçant '_1' par '_1thumb' avant l'extension
        const thumbnailName = imageRef.name.replace(
          /_1(\.[\w\d_-]+)$/i,
          '_1thumb$1',
        ); // Ajoute '_1thumb' avant l'extension
        const thumbnailRef = ref(
          storage,
          `STILLS/FULL/thumbnails/${thumbnailName}`,
        ); // Référence au sous-dossier thumbnails

        // Récupérer l'URL de la miniature, avec une solution de repli si non disponible
        let thumbnailUrl;
        try {
          thumbnailUrl = await getDownloadURL(thumbnailRef);
        } catch (error) {
          console.warn(
            `Miniature non trouvée pour ${imageRef.name}, utilisation de l'image complète.`,
          );
          thumbnailUrl = url; // Utilise l'image principale comme miniature si l'URL de la miniature est indisponible
        }

        // Ajouter l'image avec la miniature à la galerie
        setImages(prevImages => [
          ...prevImages,
          { original: url, thumbnail: thumbnailUrl },
        ]);
      });
    };

    loadImagesIncrementally().catch(error => {
      console.error('Erreur lors de la récupération des images:', error);
    });
  }, []);

  return <ImageGallery items={images} />;
};

export default GalleryComponent;
