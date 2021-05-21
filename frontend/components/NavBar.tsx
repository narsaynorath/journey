import Link from 'next/link';
import styled from 'styled-components';

import { useUser } from '../lib/user';
import Logo from './Logo';
import Logout from './Logout';

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
  a {
    margin-left: 12px;
  }
`;

export default function NavBar() {
  const user = useUser();
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
          {user ? (
            <Logout />
          ) : (
            <>
              <Link href="/signup">
                <a className="p-button p-button-lg p-button-raised">
                  Sign Up Free
                </a>
              </Link>
              <Link href="/login">
                <a className="p-button p-button-lg p-button-secondary">Login</a>
              </Link>
            </>
          )}
        </NavLinkStyles>
      </NavBarInnerStyles>
    </NavBarStyles>
  );
}
