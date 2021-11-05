import styled from 'styled-components';

const InvoiceStyle = styled.div`
  /* xx */
  h2 {
    margin-bottom: 2rem;
  }

  .formWrapper {
    /* width: 75%; */
    max-height: 460px;
    /* margin-bottom: 20px; */
    overflow: auto;
    /* outline: 2px solid ${(props) => props.theme.color.black}; */

    &.editInvoice {
      width: 100%;
    }

    .formItem {
      ul li {
        list-style: none;
      }
    }
  }
`;

export default InvoiceStyle;
