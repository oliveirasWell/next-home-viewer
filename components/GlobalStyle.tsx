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
  background-color: #2d2f33;
  padding: 0;
  margin: 0;
  font-family: monospace;
  font-size: 16px;
}

* {
  box-sizing: border-box;
}
`
