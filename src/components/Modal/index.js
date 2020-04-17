import React, { useRef, useEffect } from 'react';
import PropTypes from 'prop-types';

import { Container, Fade, ModalBody } from './styles';

export default function Modal({ children, visible, toggle }) {
  const bodyRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (bodyRef.current && !bodyRef.current.contains(event.target)) {
        toggle();
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [bodyRef, toggle]);

  return (
    <>
      <Fade visible={visible} />
      <Container visible={visible}>
        <ModalBody ref={bodyRef}>{children}</ModalBody>
      </Container>
    </>
  );
}

Modal.propTypes = {
  children: PropTypes.oneOfType([PropTypes.element, PropTypes.func]).isRequired,
  visible: PropTypes.bool.isRequired,
  toggle: PropTypes.func.isRequired,
};
