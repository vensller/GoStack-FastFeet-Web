import React from 'react';
import PropTypes from 'prop-types';

import { Container, ConfirmationButton } from './styles';

export default function ConfirmationDialog({ onClose, text, onClickYes }) {
  return (
    <Container>
      <p>{text}</p>
      <div>
        <ConfirmationButton type="button" onClick={onClose}>
          Não
        </ConfirmationButton>
        <ConfirmationButton
          type="button"
          onClick={() => {
            onClickYes(onClose);
          }}
          yes
        >
          Sim
        </ConfirmationButton>
      </div>
    </Container>
  );
}

ConfirmationDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
  onClickYes: PropTypes.func.isRequired,
};
