import React, { useState, useEffect } from 'react';
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
} from './styles';
import { StyledButton } from '~/global/styles';
import Pagination from '~/components/Pagination';
import ConfirmationDialog from '~/components/ConfirmationDialog';

import history from '~/services/history';
import api from '~/services/api';

export default function RecipientList() {
  const [page, setPage] = useState(1);
  const [searchName, setSearchName] = useState('');
  const [name, setName] = useState('');
  const [recipients, setRecipients] = useState([]);

  useEffect(() => {
    async function loadRecipientes() {
      const { data } = await api.get('/recipients', {
        params: {
          name: searchName,
          page,
          count: 10,
        },
      });
      setRecipients(
        data.map(recipient => ({
          ...recipient,
          selected: false,
        }))
      );
    }

    loadRecipientes();
  }, [page, searchName]);

  function handleKeyUp(e) {
    if (e.keyCode === 13) setSearchName(name);
  }

  function handleSelectDropdown(recipient) {
    setRecipients(
      recipients.map(item => {
        if (item === recipient) {
          item.selected = !item.selected;
        }

        return item;
      })
    );
  }

  async function handleEdit(recipient) {}

  async function deleteRecipient(recipient, onClose) {
    try {
      await api.delete(`/recipients/${recipient.id}`);

      setRecipients(recipients.filter(item => item.id !== recipient.id));

      toast.success('Destinatário foi removido com sucesso!');
    } catch (error) {
      const { response } = error;

      if (response && response.data && response.data.error) {
        toast.error(response.data.error);
      } else
        toast.error(
          'Não foi possível remover o destinatário, tente novamente mais tarde'
        );
    }

    onClose();
  }

  async function handleDelete(recipient) {
    confirmAlert({
      customUI: props => (
        <ConfirmationDialog
          {...props}
          text={`Você tem certeza que deseja remover o destinatário
      ${recipient.name.trim()}?`}
          onClickYes={onClose => deleteRecipient(recipient, onClose)}
        />
      ),
    });
  }

  return (
    <Container>
      <h2>Gerenciando destinatários</h2>
      <Header>
        <div>
          <MdSearch color="#999" size={24} />
          <input
            type="text"
            placeholder="Busca por destinatários"
            value={name}
            onChange={e => setName(e.target.value)}
            onKeyUp={handleKeyUp}
          />
        </div>
        <StyledButton
          colored
          onClick={() => history.push('/recipients/register')}
        >
          <MdAdd color="#fff" size={24} />
          Cadastrar
        </StyledButton>
      </Header>

      <StyledTable>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nome</th>
            <th>Endereço</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          {recipients.map(item => (
            <tr key={item.id}>
              <td>{`#${item.id}`}</td>
              <td>{item.name}</td>
              <td>{item.address.full_address}</td>
              <td>
                <DropDownContainer>
                  <Badge onClick={() => handleSelectDropdown(item)}>
                    <MdMoreHoriz color="#666" size={24} />
                  </Badge>
                  <DropDownButtons visible={item.selected}>
                    <MdEdit size={24} onClick={() => handleEdit(item)} />
                    <MdDelete size={24} onClick={() => handleDelete(item)} />
                  </DropDownButtons>
                </DropDownContainer>
              </td>
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
