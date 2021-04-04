import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MainFooterStyle = styled.div`
  text-align: right;
  /* background: red; */
`;

export const MainFooter = (props) => {
  return (
    <MainFooterStyle>
      <Link to={props.link}>
        <button>{props.btnText}</button>
      </Link>
    </MainFooterStyle>
  );
};
