import styled from 'styled-components';

const SidebarStyle = styled.nav`
  display: block;
  margin-top: 1rem;
  padding: 0 2rem 2rem 0;
  width: 20%;

  h1 {
    position: relative;
    font-size: 12px;
    line-height: 1.3;
    margin: 0 0 1.5rem;
    padding: 1rem 4.5rem 1rem 1rem;
    font-weight: 400;
    text-transform: uppercase;

    &:after {
      content: '';
      position: absolute;
      bottom: 0;
      left: 1rem;
      width: 2rem;
      height: 5px;
      background: ${(props) => props.theme.color.black};
    }
  }

  ul {
    list-style: none;

    li {
      margin-bottom: 0.5em;
    }
  }

  ul li a {
    display: block;
    padding: 0.5em 1em;
    text-decoration: none;
    font-weight: 700;
    text-transform: uppercase;
    color: ${(props) => props.theme.color.black};
    transition: all 0.2s linear;

    :hover {
      background: ${(props) => props.theme.color.white_darker};
      box-shadow: 0 20px 30px 0 rgb(12 0 46 / 5%);
      border-radius: 10px;
    }
  }

  ul li a.sidebar-selected {
    background: ${(props) => props.theme.color.white_dark};
    box-shadow: 0 20px 30px 0 rgb(12 0 46 / 5%);
    border-radius: 10px;
  }
`;

export default SidebarStyle;
