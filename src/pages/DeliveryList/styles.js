import styled from 'styled-components';
import { lighten } from 'polished';

export const StyledStatus = styled.div`
  display: flex;
  flex-direction: row;
  height: 25px;
  max-width: 100px;
  border-radius: 10px;
  align-content: center;
  align-items: center;
  overflow-y: hidden;
  padding: 5px;
  background: ${props =>
    lighten(0.3, props.status ? props.status.color : '#070707')};
  color: ${props => (props.status ? props.status.color : '#070707')};

  div {
    width: 10px;
    height: 10px;
    border-radius: 50%;
    border: 0;
    background: ${props => (props.status ? props.status.color : '#070707')};
  }

  span {
    margin-left: 5px;
    overflow: hidden;
  }
`;
