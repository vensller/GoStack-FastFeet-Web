import styled from 'styled-components';
import { darken } from 'polished';

export const PaginationDiv = styled.div`
  margin-top: 10px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 50px;
  border-radius: 4px;
  button {
    border: 0;
    background: #7d40e7;
    border-radius: 50px;
    display: flex;
    justify-content: center;
    align-items: center;
    width: 32px;
    height: 32px;
    &:hover {
      background: ${darken(0.1, '#7D40E7')};
    }
    &[disabled] {
      cursor: not-allowed;
      opacity: 0.6;
    }
  }
  strong {
    text-transform: capitalize;
  }
`;
