import Link from 'next/link';
import { Button } from 'primereact/button';
import styled from 'styled-components';

import Logo from './Logo';

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

const SloganStyles = styled.p`
  font-family: 'Dancing Script', cursive;
  font-size: 24px;
  margin: 0;
`;

export default function NavBar() {
  return (
    <NavBarStyles>
      <NavBarInnerStyles>
        <Link href="/">
          <a>
            <Logo />
          </a>
        </Link>
        <SloganStyles>Your journey starts with one step</SloganStyles>
        <NavLinkStyles>
          <Link href="/signup">
            <a>
              <Button
                className="p-button-raised p-button-lg"
                label="Sign Up Free"
              />
            </a>
          </Link>
          <Link href="/login">
            <a>
              <Button
                className="p-button-lg p-button-secondary"
                label="Login"
              />
            </a>
          </Link>
        </NavLinkStyles>
      </NavBarInnerStyles>
    </NavBarStyles>
  );
}
