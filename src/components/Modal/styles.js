import styled from 'styled-components';

export const Container = styled.div`
  position: absolute;
  display: ${props => (props.visible ? 'flex' : 'none')};
  height: 100%;
  width: 100%;
  opacity: 1;
  top: 0;
  left: 0;
  background: none;
  justify-content: center;
  align-items: center;
`;

export const Fade = styled.div`
  position: absolute;
  display: ${props => (props.visible ? 'flex' : 'none')};
  height: 100%;
  width: 100%;
  opacity: 0.7;
  top: 0;
  left: 0;
  background: black;
  justify-content: center;
  align-items: center;
`;

export const ModalBody = styled.div`
  background: #fff;
  border-radius: 4px;
  max-width: 600px;
  max-height: 600px;
  width: 100%;
`;
