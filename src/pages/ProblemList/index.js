import React, { useState, useEffect } from 'react';
import { confirmAlert } from 'react-confirm-alert'; // Import
import { toast } from 'react-toastify';
import { MdMoreHoriz, MdDelete, MdVisibility } from 'react-icons/md';

import {
  Container,
  StyledTable,
  DropDownContainer,
  Badge,
  DropDownButtons,
  StyledCell,
  StyledHeader,
} from '~/global/QueryPages/styles';
import Pagination from '~/components/Pagination';
import ConfirmationDialog from '~/components/ConfirmationDialog';
import ProblemDetails from './ProblemDetails';

import api from '~/services/api';

export default function ProblemList() {
  const [page, setPage] = useState(1);
  const [problems, setProblems] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [showProblem, setShowProblem] = useState(undefined);

  useEffect(() => {
    async function loadProblems() {
      const { data } = await api.get('/problems/deliveries', {
        params: {
          page,
          count: 10,
        },
      });
      setProblems(
        data.map(item => ({
          ...item,
          selected: false,
        }))
      );
    }

    loadProblems();
  }, [page]);

  function handleSelectDropdown(problem) {
    setProblems(
      problems.map(item => {
        if (item === problem) {
          item.selected = !item.selected;
        }

        return item;
      })
    );
  }

  async function cancelDelivery(problem, onClose) {
    try {
      await api.delete(`/deliveries/${problem.delivery.id}`);

      setProblems(
        problems.filter(item => item.delivery.id !== problem.delivery.id)
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

  async function handleCancel(problem) {
    confirmAlert({
      customUI: props => (
        <ConfirmationDialog
          {...props}
          text={`Você tem certeza que deseja cancelar a encomenda ${problem.delivery.id}?`}
          onClickYes={onClose => cancelDelivery(problem, onClose)}
        />
      ),
    });
  }

  function handleShow(problem) {
    setProblems(
      problems.map(item => {
        if (item === problem) {
          item.selected = false;
        }

        return item;
      })
    );
    setShowProblem(problem);
    setModalVisible(true);
  }

  return (
    <Container>
      <ProblemDetails
        visible={modalVisible}
        toggle={() => setModalVisible(false) && setShowProblem(undefined)}
        problem={showProblem}
      />
      <h2>Problemas na entrega</h2>
      <StyledTable>
        <thead>
          <tr>
            <StyledHeader>Encomenda</StyledHeader>
            <StyledHeader>Problema</StyledHeader>
            <StyledHeader>Ações</StyledHeader>
          </tr>
        </thead>

        <tbody>
          {problems.map(item => (
            <tr key={item.id}>
              <StyledCell width="10%">{`#${item.delivery.id}`}</StyledCell>
              <StyledCell width="80%">{item.description}</StyledCell>
              <StyledCell width="10%">
                <DropDownContainer>
                  <Badge onClick={() => handleSelectDropdown(item)}>
                    <MdMoreHoriz color="#666" size={24} />
                  </Badge>
                  <DropDownButtons visible={item.selected}>
                    <MdVisibility size={24} onClick={() => handleShow(item)} />
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
