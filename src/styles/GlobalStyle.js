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
      color: #272733;
    }

    .testimg {
      width: 100%;
      margin-top: 1em;
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
          margin-bottom: 5px;
          line-height: 1.3;
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

      &.radioGroupWrapper {
        margin-bottom: 0.5em;
      }

      .half {
        display: flex;
        flex-direction: row;
        justify-content: space-between;

        input {
          width: 50%;
        }

        button {
          width: 40%;
        }
      }
    }

    .radioGroup {
      display: flex;
      align-items: center;

      input {
        margin: auto 0.5em 5px;
      }
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

    input,
    textarea {
      margin-bottom: 0;
      padding: 0.5em 0.75em;
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
