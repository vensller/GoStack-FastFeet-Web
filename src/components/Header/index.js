import React from 'react';
import { useDispatch } from 'react-redux';
import logo from '~/assets/fastfeet-logo.svg';

import { Container, Content, StyledLink } from './styles';

import { signOut } from '~/store/modules/auth/actions';
import history from '~/services/history';

export default function Header() {
  const dispatch = useDispatch();

  return (
    <Container>
      <Content history={history.location.pathname}>
        <nav>
          <img src={logo} alt="FastFeetHeader" />
          <StyledLink history={history.location.pathname} to="/deliveries">
            ENCOMENDAS
          </StyledLink>
          <StyledLink history={history.location.pathname} to="/couriers">
            ENTREGADORES
          </StyledLink>
          <StyledLink history={history.location.pathname} to="/recipients">
            DESTINATÁRIOS
          </StyledLink>
          <StyledLink history={history.location.pathname} to="/problems">
            PROBLEMAS
          </StyledLink>
        </nav>

        <aside>
          <strong>Admin FastFeet</strong>
          <button type="button" onClick={() => dispatch(signOut())}>
            sair do sistema
          </button>
        </aside>
      </Content>
    </Container>
  );
}
