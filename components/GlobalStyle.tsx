import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  main {
    flex: 1;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  footer {
    width: 100%;
    height: 100px;
    border-top: 1px solid #eaeaea;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  footer img {
    margin-left: 0.5rem;
  }

  footer a {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  a {
    color: inherit;
    text-decoration: none;
  }

  .logo {
    height: 1em;
  }

  html,
  body {
    color: lightgrey;
    padding: 0;
    margin: 0;
    font-family: monospace;
    font-size: 16px;
    z-index: -2;

    @media (prefers-color-scheme: light) {
      body {
        background-color: #e1e1e1;
        color: #333;
      }
    }

    @media (prefers-color-scheme: dark) {
      body {
        background-color: #1f1c1c;
        color: #fff;
      }
    }
  }

  * {
    box-sizing: border-box;
  }
`
