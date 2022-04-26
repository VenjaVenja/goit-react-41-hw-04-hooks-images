import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import propTypes from 'prop-types';
import { Backdrop, ModalWindow, Img } from './Modal.styled';

const modalRoot = document.querySelector('#modal-root');

export const Modal = ({ onClose, largeImage }) => {

  useEffect(() => {
    const heandleKeyDown = event => {
      if (event.code === 'Escape') {
        onClose();
      }
    };

    window.addEventListener('keydown', heandleKeyDown);

    return () => {
      window.removeEventListener('keydown', heandleKeyDown);
    };
  });

  const heandleBackdropClose = ({ target, currentTarget }) => {
    if (currentTarget === target) {
      onClose();
    }
  };

  return createPortal(
    <Backdrop onClick={heandleBackdropClose}>
      <ModalWindow>
        <Img src={largeImage} loading="lazy" />
      </ModalWindow>
    </Backdrop>,
    modalRoot
  );
};

Modal.propTypes = {
    onClose: propTypes.func.isRequired,
    largeImage: propTypes.string.isRequired,
};