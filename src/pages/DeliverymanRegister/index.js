import React, { useState } from 'react';
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
import AvatarInput from '~/components/AvatarInput';

import api from '~/services/api';
import history from '~/services/history';

const schema = Yup.object().shape({
  name: Yup.string().required('O nome do destinatário é obrigatório'),
  email: Yup.string()
    .email('Informe um email válido')
    .required('O email é obrigatório'),
});

export default function DeliverymanRegister({ location }) {
  const { state: routeState } = location;
  const { deliveryman } = routeState || {};
  const [avatar_id, setAvatar] = useState();

  async function handleSubmit({ name, email }) {
    try {
      const data = {
        name,
        email,
        avatar_id,
      };

      if (deliveryman) {
        await api.put(`/couriers/${deliveryman.id}`, data);
      } else await api.post('/couriers', data);

      toast.success('Entregador salvo com sucesso!');
      history.push('/couriers');
    } catch (error) {
      const { response } = error;

      if (response && response.data && response.data.error) {
        toast.error(response.data.error);
      } else
        toast.error(
          'Não foi possível salvar o entregador, tente novamente mais tarde'
        );
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} schema={schema} initialData={deliveryman}>
        <Header>
          <strong>{deliveryman ? 'Edição ' : 'Cadastro '}de entregador</strong>
          <aside>
            <StyledButton
              type="button"
              onClick={() => history.push('/couriers')}
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
          <AvatarInput
            onChange={id => setAvatar(id)}
            defaultValue={deliveryman ? deliveryman.avatar : undefined}
          />
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
            <InputGroup>
              <strong>Email</strong>
              <Input name="email" type="email" placeholder="Digite o email" />
            </InputGroup>
          </InputRow>
        </InputContainer>
      </Form>
    </Container>
  );
}

DeliverymanRegister.propTypes = {
  location: PropTypes.oneOfType([PropTypes.object]),
};

DeliverymanRegister.defaultProps = {
  location: {
    state: {},
  },
};
