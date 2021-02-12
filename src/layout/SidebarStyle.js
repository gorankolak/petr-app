import styled from 'styled-components';

const SidebarStyle = styled.nav`
  display: block;
  margin-top: 0.5rem;
  padding: 0 3rem 2rem 0;
  width: 20%;
  border-right: 1px solid ${(props) => props.theme.color.eerie_black};

  ul {
    list-style: none;
  }

  ul li a {
    display: block;
    padding: 0.75rem;
    text-decoration: none;
    font-weight: 700;

    color: rgba(252, 247, 248, 1);
    border-left: 1px solid rgba(6, 122, 253, 1);
  }

  ul li a.sidebar-selected {
    color: rgba(39, 39, 39, 1);
    border-left: 1px solid ${(props) => props.theme.color.eerie_black};
  }
`;

export default SidebarStyle;
