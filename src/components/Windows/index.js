// src/components/Window.js

import React from 'react';
import styled from 'styled-components';

const Window = ({ title, children, onClose }) => {
  return (
    <WindowContainer>
      <Header>
        <Title>{title}</Title>
        <CloseButton onClick={onClose}>X</CloseButton>
      </Header>
      <Content>{children}</Content>
    </WindowContainer>
  );
};

const WindowContainer = styled.div`
  width: 80%;
  height: 70%;
  background: #fff;
  border: 1px solid #ccc;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.1);
  position: absolute;
  top: 50px;
  left: 50px;
  z-index: 10;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  background: #0078d7;
  color: #fff;
  padding: 10px;
  font-weight: bold;
`;

const Title = styled.div``;

const CloseButton = styled.button`
  background: none;
  border: none;
  color: #fff;
  cursor: pointer;
`;

const Content = styled.div`
  padding: 20px;
`;

export default Window;
