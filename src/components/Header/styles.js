import styled from 'styled-components';
import { Link } from 'react-router-dom';

export const Container = styled.div`
  background: #fff;
  padding: 0 30px;
`;

export const Content = styled.div`
  height: 64px;
  margin: 0 auto;
  display: flex;
  justify-content: space-between;
  align-items: center;

  nav {
    display: flex;
    align-items: center;
    flex-wrap: wrap;

    @media (max-width: 800px) {
      font-size: 12px;
    }

    img {
      margin-right: 20px;
      padding-right: 20px;
      border-right: 1px solid #eee;
      width: 200px;

      @media (max-width: 800px) {
        display: none;
      }
    }
  }

  aside {
    display: flex;

    @media (min-width: 800px) {
      flex-direction: column;
    }

    align-items: center;
    align-content: center;

    strong {
      color: #666;
    }

    button {
      @media (min-width: 800px) {
        margin-top: 5px;
      }
      @media (max-width: 800px) {
        margin-left: 5px;
      }
      border: 0;
      background: none;
      color: #de3b3b;
    }
  }
`;

export const StyledLink = styled(Link)`
  font-weight: bold;
  color: ${props =>
    props.history === props.to || props.history === `${props.to}/register`
      ? '#333'
      : '#999'};
  transition: color 0.2s;

  @media (max-width: 800px) {
    margin-left: 5px;
  }

  &:hover {
    color: #333;
  }

  & + a {
    margin-left: 10px;
  }
`;
