import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const MainFooterStyle = styled.div`
  position: absolute;
  bottom: 2rem;
  right: 2rem;
  text-align: right;

  button {
    margin-left: 1rem;
  }
`;

export const MainFooter = ({ children }) => {
  return <MainFooterStyle>{children}</MainFooterStyle>;
};
