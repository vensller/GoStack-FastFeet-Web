import styled from 'styled-components';

export const Container = styled.div`
  max-width: 80%;
  margin: 20px auto;
  display: flex;
  flex-direction: column;

  div {
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
  }
`;

export const StyledTable = styled.table`
  margin-top: 20px;
  border: none;
  border-collapse: separate;
  width: 100%;
  border-spacing: 0 0.8em;

  th,
  td {
    text-align: left;

    &:last-child {
      width: 50px;
      max-width: 20%;
      text-align: center;
    }

    &:first-child {
      width: 50px;
      text-align: left;
      padding-left: 10px;
    }
  }

  tbody {
    tr {
      background: #fff;
      padding: 0;
      margin: 10px 0;
      border: 0;
      height: 50px;

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
    }
  }
`;
