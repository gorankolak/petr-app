import styled from 'styled-components';

const AddInvoiceStyle = styled.div`
  /* max-width: 300px;

  form {
    display: flex;
    flex-direction: column;
  }

  label {
    margin-bottom: 0.25em;
  }

  input {
    margin-bottom: 1em;
  } */

  .disabledBtn {
    background: transparent;
    border: none;
    color: ${(props) => props.theme.color.black_disabled};
    cursor: initial;

    &:hover,
    &:active,
    &:visited,
    &:focus {
      color: ${(props) => props.theme.color.black_disabled};
      text-decoration: none;
      background: transparent;
      border: none;
      outline: none;
    }
  }
`;

export default AddInvoiceStyle;
