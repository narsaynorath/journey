import Link from 'next/link';
import styled from 'styled-components';

import { Button } from '@material-ui/core';

import { useUser } from '../lib/user';
import Logo from './Logo';
import { useRouter } from 'next/dist/client/router';

const NavBarStyles = styled.header`
  position: relative;
  display: block;
  width: 100%;
  background-color: #fff;
  padding: 12px 30px;
`;

const NavBarInnerStyles = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NavLinkStyles = styled.ul`
  margin: 0;
  button {
    margin-left: 12px;
  }
`;

export default function NavBar() {
  const user = useUser();
  const router = useRouter();

  return (
    <NavBarStyles>
      <NavBarInnerStyles>
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
        {user && <p>Welcome, {user?.name || user?.username}!</p>}
        <NavLinkStyles>
          {router.pathname !== '/signup' && (
            <Link href="/signup">
              <Button variant="contained">Sign Up Free</Button>
            </Link>
          )}
          {router.pathname !== '/login' && (
            <Link href="/login">
              <Button variant="outlined">Login</Button>
            </Link>
          )}
        </NavLinkStyles>
      </NavBarInnerStyles>
    </NavBarStyles>
  );
}
