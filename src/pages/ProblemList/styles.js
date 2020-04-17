import styled from 'styled-components';

export const StyledStatus = styled.div`
  width: 15px;
  height: 15px;
  border-radius: 50%;
  border: 0;
  background: ${props => (props.status ? props.status.color : '#070707')};
`;
