import styled from 'styled-components';
import { darken } from 'polished';

export const Container = styled.div`
  max-width: 400px;
  background: rgba(125, 64, 231, 0.8);
  border-radius: 4px;
  display: flex;
  flex-direction: column;
  align-content: center;

  p {
    padding: 20px;
    font-size: 20px;
    color: #fff;
  }

  div {
    margin-top: 20px;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-content: center;
    align-items: center;
  }
`;

export const ConfirmationButton = styled.button`
  background: ${props => (props.yes ? '#de3b3b' : '#666')};
  margin: 10px;
  height: 32px;
  width: 100px;
  font-weight: bold;
  color: #fff;
  border: 0;
  border-radius: 4px;
  font-size: 14px;
  transition: background 0.2s;

  &:hover {
    background: ${props => darken(0.1, props.yes ? '#de3b3b' : '#666')};
  }
`;
