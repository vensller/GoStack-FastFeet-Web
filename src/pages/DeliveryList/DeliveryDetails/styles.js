import styled from 'styled-components';

export const DetailGroup = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 20px;

  div {
    padding: 10px 0;
    display: flex;
    flex-direction: column;

    & + div {
      border-top: 1px solid #eee;
    }

    strong {
      font-size: 16px;
    }

    p,
    span {
      font-size: 14px;
      color: #333;
      max-width: 300px;

      span {
        font-weight: bold;
      }
    }

    div + & {
      max-width: 300px;
    }

    img {
      max-width: 300px;
      height: auto;
      align-self: center;
    }
  }
`;
