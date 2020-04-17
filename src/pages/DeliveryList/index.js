import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar';
import { confirmAlert } from 'react-confirm-alert'; // Import
import { toast } from 'react-toastify';
import {
  MdAdd,
  MdSearch,
  MdMoreHoriz,
  MdEdit,
  MdDelete,
  MdVisibility,
} from 'react-icons/md';

import {
  Container,
  Header,
  StyledTable,
  DropDownContainer,
  Badge,
  DropDownButtons,
  StyledCell,
  StyledHeader,
} from '~/global/QueryPages/styles';
import { StyledButton } from '~/global/styles';
import { StyledStatus } from './styles';
import Pagination from '~/components/Pagination';
import ConfirmationDialog from '~/components/ConfirmationDialog';

import history from '~/services/history';
import api from '~/services/api';

export default function DeliveryList() {
  const [page, setPage] = useState(1);
  const [searchProduct, setSearchProduct] = useState('');
  const [product, setProduct] = useState('');
  const [deliveries, setDeliveries] = useState([]);

  useEffect(() => {
    async function loadDeliveries() {
      const { data } = await api.get('/deliveries', {
        params: {
          product: searchProduct,
          page,
          count: 10,
        },
      });
      setDeliveries(
        data.map(delivery => ({
          ...delivery,
          selected: false,
        }))
      );
    }

    loadDeliveries();
  }, [page, searchProduct]);

  function handleKeyUp(e) {
    if (e.keyCode === 13) setSearchProduct(product);
  }

  function handleSelectDropdown(delivery) {
    setDeliveries(
      deliveries.map(item => {
        if (item === delivery) {
          item.selected = !item.selected;
        }

        return item;
      })
    );
  }

  async function handleEdit(delivery) {
    history.push('/deliveries/register', { delivery });
  }

  async function cancelDelivery(delivery, onClose) {
    try {
      const { data } = await api.delete(`/deliveries/${delivery.id}`);

      setDeliveries(
        deliveries.map(item => {
          if (item === delivery) {
            return data;
          }

          return item;
        })
      );

      toast.success('Encomenda foi cancelada com sucesso!');
    } catch (error) {
      const { response } = error;

      if (response && response.data && response.data.error) {
        toast.error(response.data.error);
      } else
        toast.error(
          'Não foi possível cancelar a encomenda, tente novamente mais tarde'
        );
    }

    onClose();
  }

  async function handleCancel(delivery) {
    confirmAlert({
      customUI: props => (
        <ConfirmationDialog
          {...props}
          text={`Você tem certeza que deseja cancelar a encomenda do produto
      ${delivery.product.trim()} para o destinatário ${delivery.recipient.name.trim()}?`}
          onClickYes={onClose => cancelDelivery(delivery, onClose)}
        />
      ),
    });
  }

  function handleShow(delivery) {}

  return (
    <Container>
      <h2>Gerenciando encomendas</h2>
      <Header>
        <div>
          <MdSearch color="#999" size={24} />
          <input
            type="text"
            placeholder="Busca por produto"
            value={product}
            onChange={e => setProduct(e.target.value)}
            onKeyUp={handleKeyUp}
          />
        </div>
        <StyledButton
          colored
          onClick={() => history.push('/deliveries/register')}
        >
          <MdAdd color="#fff" size={24} />
          Cadastrar
        </StyledButton>
      </Header>

      <StyledTable>
        <thead>
          <tr>
            <StyledHeader>ID</StyledHeader>
            <StyledHeader>Produto</StyledHeader>
            <StyledHeader>Destinatário</StyledHeader>
            <StyledHeader>Entregador</StyledHeader>
            <StyledHeader>Cidade</StyledHeader>
            <StyledHeader>Estado</StyledHeader>
            <StyledHeader>Status</StyledHeader>
            <StyledHeader>Ações</StyledHeader>
          </tr>
        </thead>

        <tbody>
          {deliveries.map(item => (
            <tr key={item.id}>
              <StyledCell width="5%">{`#${item.id}`}</StyledCell>
              <StyledCell width="15%">{item.product}</StyledCell>
              <StyledCell width="15%">{item.recipient.name}</StyledCell>
              <StyledCell width="20%">
                <Avatar
                  name={item.deliveryman.name}
                  src={
                    item.deliveryman.avatar ? item.deliveryman.avatar.url : ''
                  }
                  textSizeRatio={1}
                  maxInitials={2}
                  size={40}
                  round="50%"
                />
                <span>{item.deliveryman.name}</span>
              </StyledCell>
              <StyledCell width="10%">{item.recipient.address.city}</StyledCell>
              <StyledCell width="15%">
                {item.recipient.address.state}
              </StyledCell>
              <StyledCell width="10%">
                <StyledStatus status={item.status} />
              </StyledCell>
              <StyledCell width="10%">
                <DropDownContainer>
                  <Badge onClick={() => handleSelectDropdown(item)}>
                    <MdMoreHoriz color="#666" size={24} />
                  </Badge>
                  <DropDownButtons visible={item.selected}>
                    <MdVisibility size={24} onClick={() => handleShow(item)} />
                    <MdEdit size={24} onClick={() => handleEdit(item)} />
                    <MdDelete size={24} onClick={() => handleCancel(item)} />
                  </DropDownButtons>
                </DropDownContainer>
              </StyledCell>
            </tr>
          ))}
        </tbody>
      </StyledTable>
      <Pagination
        page={page}
        onPageChange={increase => setPage(page + increase)}
      />
    </Container>
  );
}
