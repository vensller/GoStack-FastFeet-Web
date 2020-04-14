import styled, { createGlobalStyle } from 'styled-components';

import 'react-toastify/dist/ReactToastify.css';
import 'react-perfect-scrollbar/dist/css/styles.css';

export default createGlobalStyle`
  @import url('https://fonts.googleapis.com/css?family=Roboto:400,700&display=swap');

  * {
    margin: 0;
    padding: 0;
    outline: 0;
    box-sizing: border-box;
  }

  *:focus {
    outline: 0;
  }

  html, body, #root{
    height: 100%;
  }

  body {
    -webkit-font-smoothing: antialiased;
  }

  body, input, button {
    font: 14px 'Roboto', sans-serif;
  }

  a {
    text-decoration: none;
  }

  ul {
    list-style: none;
  }

  button {
    cursor: pointer;
  }

  form {
    span {
      color: #fb6f91;
      align-self: flex-start;
      margin: 0 0 10px;
      font-weight: bold;
    }
  }

`;

export const InputRow = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: 0;
`;

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;

  @media (min-width: 768px) {
    flex: 1 1 ${props => (props.flex ? props.flex : 'auto')};
    max-width: ${props => (props.flex ? props.flex : '100%')};

    & + div {
      padding-left: 15px;
    }
  }

  width: 100%;

  strong {
    font-size: 14px;
    align-self: flex-start;
    margin-bottom: 5px;
    color: #666;
  }

  input {
    background: #fff;
    border: 1px solid #eee;
    border-radius: 4px;
    height: 44px;
    padding: 0 15px;
    margin: 0 0 10px;
    color: #666;
    max-width: 100%;

    &::placeholder {
      color: #999;
    }
  }
`;
