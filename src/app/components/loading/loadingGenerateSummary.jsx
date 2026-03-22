import React from 'react';
import styled from 'styled-components';

const LoadingGenerateSummary   = () => {
  return (
    <StyledWrapper>
      <div className="spinnerContainer">
        <div className="spinner" />
        <div className="loader">
          <p>Carregando</p>
          <div className="words">
            <span className="word">Titulo</span>
            <span className="word">Imagem</span>
            <span className="word">Legenda</span>
            <span className="word">Resumo</span>
            <span className="word">Titulo</span>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  .spinnerContainer {
    display: flex;
    align-items: center;
    gap:10px;
  }

  .spinner {
    width: 26px;
    height: 26px;
    display: grid;
    border: 2px solid #0000;
    border-radius: 50%;
    border-right-color: #299fff;
    animation: tri-spinner 1s infinite linear;
  }

  .spinner::before,
  .spinner::after {
    content: "";
    grid-area: 1/1;
    margin: 2px;
    border: inherit;
    border-radius: 60%;
    animation: tri-spinner 2s infinite;
  }

  .spinner::after {
    margin: 8px;
    animation-duration: 5s;
  }

  @keyframes tri-spinner {
    100% {
      transform: rotate(1turn);
    }
  }

  .loader {
    color: #4a4a4a;
    font-family: "Poppins",sans-serif;
    font-weight: 500;
    font-size: 15px;
    -webkit-box-sizing: content-box;
    box-sizing: content-box;
    height: 20px;
    padding: 1px 1px;
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
    border-radius: 8px;
  }

  .words {
    overflow: hidden;
  }

  .word {
    display: block;
    height: 100%;
    padding-left: 5px;
    color: #299fff;
    animation: cycle-words 5s infinite;
  }

  @keyframes cycle-words {
    10% {
      -webkit-transform: translateY(-105%);
      transform: translateY(-105%);
    }

    25% {
      -webkit-transform: translateY(-100%);
      transform: translateY(-100%);
    }

    35% {
      -webkit-transform: translateY(-205%);
      transform: translateY(-205%);
    }

    50% {
      -webkit-transform: translateY(-200%);
      transform: translateY(-200%);
    }

    60% {
      -webkit-transform: translateY(-305%);
      transform: translateY(-305%);
    }

    75% {
      -webkit-transform: translateY(-300%);
      transform: translateY(-300%);
    }

    85% {
      -webkit-transform: translateY(-405%);
      transform: translateY(-405%);
    }

    100% {
      -webkit-transform: translateY(-400%);
      transform: translateY(-400%);
    }
  }`;

export default LoadingGenerateSummary;
