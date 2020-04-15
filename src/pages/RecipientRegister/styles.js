import styled from 'styled-components';

export const Container = styled.div`
  max-width: 800px;
  margin: 20px auto;
  display: flex;
  flex-direction: column;
  padding: 10px;
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
