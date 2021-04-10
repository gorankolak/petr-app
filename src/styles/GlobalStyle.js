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
      background: linear-gradient(to right top, #E0CCCF, #d5cbee);
      /* #d5cbee */
      /* #E0CCCF */
      color: #272733;
      /* #ADF7B6 */
      /* #74D3AE */
      /* #c5b2f2 */
    }

    .testimg {
      width: 100%;
      margin-top: 1em;
    }

    button {
      padding: .5em 1em;
      color: ${(props) => props.theme.color.white};
      background-color: ${(props) => props.theme.color.black};
      font-weight: bold;
      border: none;
      border-radius: 10px;
      cursor: pointer;


      border: 2px solid ${(props) => props.theme.color.black};
      box-shadow: 0 20px 30px 0 rgb(12 0 46 / 10%);
      transition: all .2s linear;

      &:not(:disabled):hover {
        background-color: ${(props) => props.theme.color.white};
        color: ${(props) => props.theme.color.black};
        border: 2px solid ${(props) => props.theme.color.black};
      }
    }

    .formWrapper {
      display: flex;
      width: 100%;
      justify-content: space-between;
      padding-bottom: 1.5rem;
    }

    .formColumn {
      width: 240px;

      &:nth-child(3) {
        padding: 1rem;
        background-color: ${(props) => props.theme.color.dust};
        box-shadow: 0 20px 30px 0 rgb(12 0 46 / 5%);
        border-radius: 20px;

        p {
          margin-bottom: 0;
        }

        span {
          font-size: 14px;

          &:nth-child(1) {
            margin-right: 0.5em;
            font-weight: 300;
          }

          &:nth-child(2) {
            font-weight: bold;
          }
        }
      }
    }

    .formItem {
      display: flex;
      flex-direction: column;
      margin-bottom: 0.5em;
    }

    .formItemAdd {
      text-align: right;

      button {
        margin-left: 0.5rem;
      }
    }

    label {
      margin-bottom: 0.25em;
      font-size: 12px;
      font-weight: 300;
    }

    input {
      margin-bottom: 0;
      padding: .5em 1em;
      border-radius: 10px;
      border: 1px solid ${(props) => props.theme.color.black_disabled};
    }

    select  {
      margin-bottom: 0;
      padding: .5em;
      border-radius: 10px;
      border: 1px solid ${(props) => props.theme.color.black_disabled};
    }

    h2 {
      font-size: 28px;
      line-height: 1.6;
      margin: 0 0 .75rem;
      font-weight: 700;
      text-transform: uppercase;
    }

    h3 {
      /* font-size: 21px; */
      font-size: 17px;
      line-height: 1.6;
      margin: 0 0 .25rem;
      text-transform: uppercase;
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
