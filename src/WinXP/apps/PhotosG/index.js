import React, { useState, useCallback } from 'react';
import { render } from 'react-dom';
import Gallery from 'react-photo-gallery';
import Carousel, { Modal, ModalGateway } from 'react-images';
import { photos } from './photos';
import styled from 'styled-components';

const Div = styled.div`
  height: 42vh; /* Change this to 100vh to make the div fill the viewport height */
  overflow: auto; /* Add this to enable scrolling */
  width: 100%;
  position: absolute;
  display: flex;
  flex-direction: column;
  background: linear-gradient(to right, #edede5 0%, #ede8cd 100%);
`;

function App() {
  const [showApp, setShowApp] = useState(false);
  const [currentImage, setCurrentImage] = useState(0);
  const [viewerIsOpen, setViewerIsOpen] = useState(false);

  const openLightbox = useCallback((event, { photo, index }) => {
    setCurrentImage(index);
    setViewerIsOpen(true);
  }, []);

  const closeLightbox = () => {
    setCurrentImage(0);
    setViewerIsOpen(false);
  };

  return (
    <Div>
      <Gallery photos={photos} onClick={openLightbox} />
      <ModalGateway>
        {viewerIsOpen ? (
          <Modal onClose={closeLightbox}>
            <Carousel
              currentIndex={currentImage}
              views={photos.map(x => ({
                ...x,
                srcset: x.srcSet,
                caption: x.title,
              }))}
            />
          </Modal>
        ) : null}
      </ModalGateway>
    </Div>
  );
}

export default App;
