import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  @media (min-width: 680px) {
    max-width: 80%;
  }
  @media (max-width: 680px) {
    padding: 10px;
  }
  margin: 20px auto;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  margin-top: 10px;
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;

  div {
    width: 350px;
    display: flex;
    flex-direction: row;
    background: #fff;
    border-radius: 4px;
    align-content: center;
    align-items: center;

    svg {
      margin-left: 5px;
    }

    input {
      border: 0;
      height: 32px;
      width: 300px;
      background: none;
      padding: 0 5px;
      color: #666;
      max-width: 90%;

      &::placeholder {
        color: #999;
      }
    }
  }

  button {
    margin-top: 10px;

    @media (max-width: 680px) {
      margin-left: 0px;
    }
  }
`;

export const StyledTable = styled.table`
  margin-top: 20px;
  border: none;
  border-collapse: separate;
  width: 100%;
  border-spacing: 0 0.8em;
  max-width: 100%;

  th,
  td {
    text-align: left;
    padding: 0 10px;

    &:last-child {
      text-align: center;
    }

    &:first-child {
      text-align: left;
    }
  }

  tbody {
    tr {
      background: #fff;
      padding: 0;
      margin: 10px 0;
      border: 0;
      height: 50px;
      color: #666;

      & td:first-child {
        border-top-left-radius: 4px;
      }
      & td:last-child {
        border-top-right-radius: 4px;
      }
      & td:first-child {
        border-bottom-left-radius: 4px;
      }
      & td:last-child {
        border-bottom-right-radius: 4px;
      }

      td {
        svg {
          cursor: pointer;
        }
      }
    }
  }
`;

export const StyledCell = styled.td`
  width: ${props => (props.width ? props.width : '')};
  max-width: 1px;
  white-space: nowrap;
  overflow: hidden;
  &:last-child {
    overflow: visible;
  }
  text-overflow: ellipsis;

  span {
    margin-left: 10px;
  }
`;

export const StyledHeader = styled.th`
  width: ${props => (props.width ? props.width : '')};
  max-width: 1px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`;

export const DropDownContainer = styled.div`
  position: relative;
`;

export const Badge = styled.button`
  background: none;
  border: 0;
  position: relative;
`;

export const DropDownButtons = styled.div`
  position: absolute;
  width: 80px;
  left: calc(50% - 40px);
  top: calc(100%);
  background: rgba(125, 64, 231, 0.8);
  border-radius: 4px;
  padding: 15px 5px;
  display: ${props => (props.visible ? 'flex' : 'none')};
  flex-direction: row;
  justify-content: space-between;

  svg {
    color: #fff;

    &:hover {
      color: ${darken(0.2, '#fff')};
    }
  }

  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 10px);
    top: -10px;
    width: 0;
    height: 0;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid rgba(125, 64, 231, 0.8);
  }
`;
