import { create } from 'domain';
import { createGlobalStyle } from 'styled-components';

import NavBar from './NavBar';

const GlobalStyles = createGlobalStyle`
    html,
    body {
    padding: 0;
    margin: 0;
    font-family: -apple-system, BlinkMacSystemFont, Segoe UI, Roboto, Oxygen,
        Ubuntu, Cantarell, Fira Sans, Droid Sans, Helvetica Neue, sans-serif;
    background: beige;
    }

    a {
    color: inherit;
    text-decoration: none;
    }

    * {
    box-sizing: border-box;
    }
`;

export default function Page({ children }) {
  return (
    <div>
      <GlobalStyles />
      <NavBar />
      {children}
    </div>
  );
}
