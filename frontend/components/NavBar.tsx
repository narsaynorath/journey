import Link from 'next/link';

import styled from 'styled-components';

import Logo from './Logo';

const NavBarStyles = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  background-color: #fff;
  padding: 8px;
`;

const NavLinkStyles = styled.ul`
  a {
    margin-left: 8px;
  }
`;

export default function NavBar() {
  return (
    <NavBarStyles>
      <Link href="/">
        <a>
          <Logo />
        </a>
      </Link>
      <NavLinkStyles>
        <Link href="login">Login</Link>
        <Link href="signup">Sign Up</Link>
      </NavLinkStyles>
    </NavBarStyles>
  );
}
