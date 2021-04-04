import styled from 'styled-components';

const MainStyle = styled.main`
  display: flex;
  min-height: 88vh;
  padding: 2rem;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(1px);
  box-shadow: 0 20px 30px 0 rgb(12 0 46 / 10%);
  border-radius: 20px;

  .main-section {
    width: 80%;
    padding: 1rem 2rem;
    background: ${(props) => props.theme.color.white_dark};
    /* background: ${(props) => props.theme.color.dust}; */
    box-shadow: 0 20px 30px 0 rgb(12 0 46 / 10%);
    border-radius: 20px;
  }
`;

export default MainStyle;