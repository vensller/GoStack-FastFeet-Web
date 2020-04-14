import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 30px auto;
  display: flex;
  flex-direction: column;
`;

export const Header = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-content: space-between;
  justify-content: space-between;
  align-items: center;

  strong {
    font-size: 24px;
  }

  aside {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
  }
`;

export const StyledButton = styled.button`
  margin-left: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${props => (props.colored ? '#7D40E7' : '#CCCCCC')};
  border-radius: 4px;
  color: #fff;
  padding: 3px 15px;
  border: 0;
  font-size: 14px;
  font-weight: bold;
`;

export const InputContainer = styled.div`
  box-sizing: border-box;
  background: #fff;
  margin-top: 15px;
  border-radius: 5px;
  padding: 25px;
`;
