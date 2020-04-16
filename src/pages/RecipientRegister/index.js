import React from 'react';
import { Form, Input } from '@rocketseat/unform';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import PropTypes from 'prop-types';

import { MdKeyboardArrowLeft, MdCheck } from 'react-icons/md';

import { Container, Header } from '~/global/RegisterPages/styles';
import {
  InputGroup,
  InputRow,
  InputContainer,
  StyledButton,
} from '~/global/styles';

import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome do destinatário é obrigatório'),
  street: Yup.string().required('O nome da rua é obrigatório'),
  house_number: Yup.string().required('O número é obrigatório'),
  complement: Yup.string(),
  city: Yup.string().required('A cidade é obrigatória'),
  state: Yup.string().required('O estado é obrigatório'),
  zip_code: Yup.string().required('O CEP é obrigatório'),
});

export default function RecipientRegister({ location }) {
  const { state: routeState } = location;
  const { recipient } = routeState || {};

  const initialData = {
    name: recipient ? recipient.name : '',
    street: recipient && recipient.address ? recipient.address.street : '',
    house_number:
      recipient && recipient.address ? recipient.address.house_number : '',
    city: recipient && recipient.address ? recipient.address.city : '',
    state: recipient && recipient.address ? recipient.address.state : '',
    zip_code: recipient && recipient.address ? recipient.address.zip_code : '',
    complement:
      recipient && recipient.address ? recipient.address.complement : '',
  };

  async function handleSubmit({
    name,
    street,
    house_number,
    complement,
    city,
    state,
    zip_code,
  }) {
    try {
      const data = {
        name,
        street,
        house_number,
        complement,
        city,
        state,
        zip_code,
      };

      if (recipient) {
        await api.put(`/recipients/${recipient.id}`, {
          ...data,
          address_id: recipient.address.id,
        });
      } else await api.post('/recipients', data);

      toast.success('Destinatário salvo com sucesso!');
      history.push('/recipients');
    } catch (error) {
      const { response } = error;

      if (response && response.data && response.data.error) {
        toast.error(response.data.error);
      } else
        toast.error(
          'Não foi possível salvar o destinatário, tente novamente mais tarde'
        );
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} schema={schema} initialData={initialData}>
        <Header>
          <strong>{recipient ? 'Edição ' : 'Cadastro '}de destinatário</strong>
          <aside>
            <StyledButton
              type="button"
              onClick={() => history.push('/recipients')}
            >
              <MdKeyboardArrowLeft color="#fff" size={24} />
              VOLTAR
            </StyledButton>
            <StyledButton type="submit" colored>
              <MdCheck color="#fff" size={24} />
              SALVAR
            </StyledButton>
          </aside>
        </Header>
        <InputContainer>
          <InputRow>
            <InputGroup>
              <strong>Nome</strong>
              <Input
                name="name"
                type="text"
                placeholder="Digite seu nome completo"
              />
            </InputGroup>
          </InputRow>

          <InputRow>
            <InputGroup flex="50%">
              <strong>Rua</strong>
              <Input name="street" type="text" placeholder="Nome da rua" />
            </InputGroup>
            <InputGroup flex="25%">
              <strong>Número</strong>
              <Input name="house_number" type="text" placeholder="" />
            </InputGroup>
            <InputGroup flex="25%">
              <strong>Complemento</strong>
              <Input name="complement" type="text" placeholder="" />
            </InputGroup>
          </InputRow>

          <InputRow>
            <InputGroup flex="34%">
              <strong>Cidade</strong>
              <Input name="city" type="text" placeholder="Nome da cidade" />
            </InputGroup>
            <InputGroup flex="33%">
              <strong>Estado</strong>
              <Input name="state" type="text" placeholder="Nome do estado" />
            </InputGroup>
            <InputGroup flex="33%">
              <strong>CEP</strong>
              <Input name="zip_code" type="text" placeholder="" />
            </InputGroup>
          </InputRow>
        </InputContainer>
      </Form>
    </Container>
  );
}

RecipientRegister.propTypes = {
  location: PropTypes.oneOfType([PropTypes.object]),
};

RecipientRegister.defaultProps = {
  location: {
    state: {},
  },
};
