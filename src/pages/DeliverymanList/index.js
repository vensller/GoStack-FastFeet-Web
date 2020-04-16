import React, { useState, useEffect } from 'react';
import Avatar from 'react-avatar';
import { confirmAlert } from 'react-confirm-alert'; // Import
import { toast } from 'react-toastify';
import { MdAdd, MdSearch, MdMoreHoriz, MdEdit, MdDelete } from 'react-icons/md';

import {
  Container,
  Header,
  StyledTable,
  DropDownContainer,
  Badge,
  DropDownButtons,
  StyledCell,
} from '~/global/QueryPages/styles';
import { StyledButton } from '~/global/styles';
import Pagination from '~/components/Pagination';
import ConfirmationDialog from '~/components/ConfirmationDialog';

import history from '~/services/history';
import api from '~/services/api';

export default function DeliverymanList() {
  const [page, setPage] = useState(1);
  const [searchName, setSearchName] = useState('');
  const [name, setName] = useState('');
  const [couriers, setCouriers] = useState([]);

  useEffect(() => {
    async function loadCouriers() {
      const { data } = await api.get('/couriers', {
        params: {
          name: searchName,
          page,
          count: 10,
        },
      });
      setCouriers(
        data.map(deliveryman => ({
          ...deliveryman,
          selected: false,
        }))
      );
    }

    loadCouriers();
  }, [page, searchName]);

  function handleKeyUp(e) {
    if (e.keyCode === 13) setSearchName(name);
  }

  function handleSelectDropdown(deliveryman) {
    setCouriers(
      couriers.map(item => {
        if (item === deliveryman) {
          item.selected = !item.selected;
        }

        return item;
      })
    );
  }

  async function handleEdit(deliveryman) {
    history.push('/couriers/register', { deliveryman });
  }

  async function deleteDeliveryman(deliveryman, onClose) {
    try {
      await api.delete(`/couriers/${deliveryman.id}`);

      setCouriers(couriers.filter(item => item.id !== deliveryman.id));

      toast.success('Entregador foi removido com sucesso!');
    } catch (error) {
      const { response } = error;

      if (response && response.data && response.data.error) {
        toast.error(response.data.error);
      } else
        toast.error(
          'Não foi possível remover o entregador, tente novamente mais tarde'
        );
    }

    onClose();
  }

  async function handleDelete(deliveryman) {
    confirmAlert({
      customUI: props => (
        <ConfirmationDialog
          {...props}
          text={`Você tem certeza que deseja remover o entregador
      ${deliveryman.name.trim()}?`}
          onClickYes={onClose => deleteDeliveryman(deliveryman, onClose)}
        />
      ),
    });
  }

  return (
    <Container>
      <h2>Gerenciando entregadores</h2>
      <Header>
        <div>
          <MdSearch color="#999" size={24} />
          <input
            type="text"
            placeholder="Busca por entregador"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyUp={handleKeyUp}
          />
        </div>
        <StyledButton
          colored
          onClick={() => history.push('/couriers/register')}
        >
          <MdAdd color="#fff" size={24} />
          Cadastrar
        </StyledButton>
      </Header>

      <StyledTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Foto</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {couriers.map(item => (
            <tr key={item.id}>
              <StyledCell width="15%">{`#${item.id}`}</StyledCell>
              <StyledCell width="15%">
                <Avatar
                  name={item.name}
                  src={item.avatar ? item.avatar.url : ''}
                  textSizeRatio={1}
                  maxInitials={2}
                  size={40}
                  round="50%"
                />
              </StyledCell>
              <StyledCell width="30%">{item.name}</StyledCell>
              <StyledCell width="40%">{item.email}</StyledCell>
              <StyledCell width="10%">
                <DropDownContainer>
                  <Badge onClick={() => handleSelectDropdown(item)}>
                    <MdMoreHoriz color="#666" size={24} />
                  </Badge>
                  <DropDownButtons visible={item.selected}>
                    <MdEdit size={24} onClick={() => handleEdit(item)} />
                    <MdDelete size={24} onClick={() => handleDelete(item)} />
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
