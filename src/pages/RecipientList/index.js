import React from 'react';
import { MdAdd } from 'react-icons/md';

import { Container } from './styles';
import { StyledButton } from '~/global/styles';

import history from '~/services/history';

export default function RecipientList() {
  return (
    <Container>
      <StyledButton
        colored
        onClick={() => history.push('/recipients/register')}
      >
        <MdAdd color="#fff" size={24} />
        Cadastrar
      </StyledButton>
    </Container>
  );
}
