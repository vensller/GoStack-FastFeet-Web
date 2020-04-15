import React from 'react';
import { MdNavigateNext, MdNavigateBefore } from 'react-icons/md';
import PropTypes from 'prop-types';
import { PaginationDiv } from './styles';

export default function Pagination({ onPageChange, page }) {
  return (
    <PaginationDiv>
      <button
        type="button"
        disabled={page === 1}
        onClick={() => onPageChange(-1)}
      >
        <MdNavigateBefore color="#fff" />
      </button>
      <strong>{`Página ${page}`}</strong>
      <button type="button" onClick={() => onPageChange(+1)}>
        <MdNavigateNext color="#fff" />
      </button>
    </PaginationDiv>
  );
}

Pagination.propTypes = {
  onPageChange: PropTypes.func.isRequired,
  page: PropTypes.number.isRequired,
};
