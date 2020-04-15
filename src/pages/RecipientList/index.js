import React, { useState, useEffect } from 'react';
import { MdAdd, MdSearch, MdMoreHoriz } from 'react-icons/md';

import { Container, StyledTable } from './styles';
import { StyledButton } from '~/global/styles';
import Pagination from '~/components/Pagination';

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
      setRecipients(data);
    }

    loadRecipientes();
  }, [page, searchName]);

  function handleKeyUp(e) {
    if (e.keyCode === 13) setSearchName(name);
  }

  return (
    <Container>
      <h2>Gerenciando destinatários</h2>
      <div>
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
      </div>

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
                <MdMoreHoriz color="#666" size={24} />
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
