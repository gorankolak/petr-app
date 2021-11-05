import styled from 'styled-components';

const AddInvoiceStyle = styled.div`
  .search {
    display: none;
  }

  .articlesTable {
    max-height: 280px;
    overflow: auto;
  }

  .formWrapper.addArticles {
    /* justify-content: left; */
    justify-content: space-between;

    button {
      margin: 0;
    }

    .formColumn {
      width: 185px;
    }
  }
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
`;

export default AddInvoiceStyle;
