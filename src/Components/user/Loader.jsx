import React from 'react';
import styled, { keyframes } from 'styled-components';

const fade458 = keyframes`
  from {
    opacity: 1;
  }
  to {
    opacity: 0.25;
  }
`;

const LoaderContainer = styled.div`
  position: relative;
  width: 54px;
  height: 54px;
  border-radius: 10px;
`;

const LoaderBar = styled.div`
  width: 8%;
  height: 24%;
  background: rgb(128, 128, 128);
  position: absolute;
  left: 50%;
  top: 30%;
  opacity: 0;
  border-radius: 50px;
  box-shadow: 0 0 3px rgba(0, 0, 0, 0.2);
  animation: ${fade458} 1s linear infinite;
`;

const Loader = () => (
  <LoaderContainer>
    <LoaderBar style={{ transform: 'rotate(0deg) translate(0, -130%)', animationDelay: '0s' }} />
    <LoaderBar style={{ transform: 'rotate(30deg) translate(0, -130%)', animationDelay: '-1.1s' }} />
    <LoaderBar style={{ transform: 'rotate(60deg) translate(0, -130%)', animationDelay: '-1s' }} />
    <LoaderBar style={{ transform: 'rotate(90deg) translate(0, -130%)', animationDelay: '-0.9s' }} />
    <LoaderBar style={{ transform: 'rotate(120deg) translate(0, -130%)', animationDelay: '-0.8s' }} />
    <LoaderBar style={{ transform: 'rotate(150deg) translate(0, -130%)', animationDelay: '-0.7s' }} />
    <LoaderBar style={{ transform: 'rotate(180deg) translate(0, -130%)', animationDelay: '-0.6s' }} />
    <LoaderBar style={{ transform: 'rotate(210deg) translate(0, -130%)', animationDelay: '-0.5s' }} />
    <LoaderBar style={{ transform: 'rotate(240deg) translate(0, -130%)', animationDelay: '-0.4s' }} />
    <LoaderBar style={{ transform: 'rotate(270deg) translate(0, -130%)', animationDelay: '-0.3s' }} />
    <LoaderBar style={{ transform: 'rotate(300deg) translate(0, -130%)', animationDelay: '-0.2s' }} />
    <LoaderBar style={{ transform: 'rotate(330deg) translate(0, -130%)', animationDelay: '-0.1s' }} />
  </LoaderContainer>
);

export default Loader;
