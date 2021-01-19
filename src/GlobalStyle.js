import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    font-family: TitilliumWeb;

    body {
      /* background: ${(props) => props.theme.color.azure}; */
      background: linear-gradient(to right top, ${(props) =>
        props.theme.color.brick_red}, ${(props) => props.theme.color.azure});
      color: ${(props) => props.theme.color.snow};
    }

    h1 {
      font-size: 50px;
      line-height: 1;
      margin: 0 0 1rem;
      font-weight: 700;
      text-transform: uppercase;
    }

    h2 {
      font-size: 28px;
      line-height: 1.6;
      margin: 0 0 .5rem;
      font-weight: 700;
      text-transform: uppercase;
    }

    h3 {
      font-size: 21px;
      line-height: 1.6;
      margin: 0 0 .25rem;
    }

    p {
      font-size: 16px; 
      font-weight: normal;
      line-height: 1.6;
      margin-bottom: .5rem;
    }

    .secondary-font {
      font-size: 12px;
      font-weight: normal;
      line-height: 1.6;
      margin-bottom: .5rem;
    }
  }
`;

export default GlobalStyle;
