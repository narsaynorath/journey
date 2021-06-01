import styled, { createGlobalStyle } from 'styled-components';

import NavBar from './NavBar';

const GlobalStyles = createGlobalStyle`
    html,
    body {
        padding: 0;
        margin: 0;
        font-family: -apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji,Segoe UI Symbol;
        background: beige;
        height: 100vh;
    }

    a {
        color: inherit;
        text-decoration: none;
    }

    h1,h2,h3,h4,h5,h6 {
      margin-top: 0;
    }

    * {
        box-sizing: border-box;
    }

    #__next {
        height: 100%
    }
`;

export default function Page({ children }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', height: '100vh' }}>
      <GlobalStyles />
      <NavBar />
      {children}
    </div>
  );
}
