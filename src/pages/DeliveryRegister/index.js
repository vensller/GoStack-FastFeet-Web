import React, { useState, useEffect } from 'react';
import { Form, Input, Select } from '@rocketseat/unform';
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
  product: Yup.string().required('O produto é obrigatório'),
  deliveryman_id: Yup.number()
    .required('O entregador deve ser selecionado')
    .typeError('O entregador deve ser selecionado'),
  recipient_id: Yup.number()
    .required('O destinatário deve ser selecionado')
    .typeError('O destinatário deve ser selecionado'),
});

export default function DeliveryRegister({ location }) {
  const { state: routeState } = location;
  const { delivery } = routeState || {};

  const [couriers, setCouriers] = useState([]);
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    async function loadCouriers() {
      setCouriers(
        (await api.get('/couriers')).data.map(item => ({
          id: item.id,
          title: item.name,
        }))
      );
    }

    async function loadRecipients() {
      setRecipients(
        (await api.get('/recipients')).data.map(item => ({
          id: item.id,
          title: item.name,
        }))
      );
    }

    loadCouriers();
    loadRecipients();
  }, []);

  async function handleSubmit({ product, deliveryman_id, recipient_id }) {
    const data = {
      product,
      deliveryman_id,
      recipient_id,
    };

    try {
      if (delivery) {
        await api.put(`/deliveries/${delivery.id}`, data);
      } else await api.post('/deliveries', data);

      toast.success('Encomenda salva com sucesso!');
      history.push('/deliveries');
    } catch (error) {
      const { response } = error;

      if (response && response.data && response.data.error) {
        toast.error(response.data.error);
      } else
        toast.error(
          'Não foi possível salvar a encomenda, tente novamente mais tarde'
        );
    }
  }

  return (
    <Container>
      <Form onSubmit={handleSubmit} schema={schema} initialData={delivery}>
        <Header>
          <strong>{delivery ? 'Edição ' : 'Cadastro '}de encomenda</strong>
          <aside>
            <StyledButton
              type="button"
              onClick={() => history.push('/deliveries')}
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
            <InputGroup flex="50%">
              <strong>Destinatário</strong>
              <Select name="recipient_id" options={recipients} />
            </InputGroup>
            <InputGroup flex="50%">
              <strong>Entregador</strong>
              <Select name="deliveryman_id" options={couriers} />
            </InputGroup>
          </InputRow>

          <InputRow>
            <InputGroup>
              <strong>Produto</strong>
              <Input
                name="product"
                type="text"
                placeholder="Digite o nome do produto"
              />
            </InputGroup>
          </InputRow>
        </InputContainer>
      </Form>
    </Container>
  );
}

DeliveryRegister.propTypes = {
  location: PropTypes.oneOfType([PropTypes.object]),
};

DeliveryRegister.defaultProps = {
  location: {
    state: {},
  },
};
