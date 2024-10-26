// src/services/imgurService.js

export const fetchImgurAlbum = async () => {
  const albumId = '2YWeRM1'; // Utilisez l'ID de l'album obtenu depuis l'URL de votre album Imgur
  const clientId = 'VOTRE_CLIENT_ID'; // Remplacez par votre propre Client ID Imgur

  try {
    const response = await fetch(
      `https://api.imgur.com/3/album/${albumId}/images`,
      {
        headers: {
          Authorization: `Client-ID ${clientId}`,
        },
      },
    );

    const data = await response.json();
    if (data.success) {
      return data.data; // Retourne la liste des images
    } else {
      console.error('Erreur lors de la récupération de l’album', data);
      return [];
    }
  } catch (error) {
    console.error('Erreur lors de la requête à l’API Imgur', error);
    return [];
  }
};
