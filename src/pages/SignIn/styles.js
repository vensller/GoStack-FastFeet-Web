import styled from 'styled-components';

export const InputGroup = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 10px 30px;

  strong {
    font-size: 14px;
    align-self: flex-start;
    margin-bottom: 5px;
    color: #666;
  }
`;

export const Container = styled.div`
  background: #fff;
  border-radius: 4px;
  display: flex;
  flex-direction: column;

  img {
    width: 250px;
    align-self: center;
    margin-top: 50px;
  }
`;
