import React from 'react';
import styled, { css } from 'styled-components';

const Button = styled.button`
  padding: 0.5em 1em;
  margin: 0.5em 0 0 0.5em;
  color: ${(props) => props.theme.color.white};
  background-color: ${(props) => props.theme.color.black};
  font-weight: bold;
  border-radius: 10px;
  cursor: pointer;

  border: 2px solid ${(props) => props.theme.color.black};
  box-shadow: 0 20px 30px 0 rgb(12 0 46 / 10%);
  transition: all 0.2s linear;

  &:not(:disabled):hover {
    background-color: ${(props) => props.theme.color.white};
    color: ${(props) => props.theme.color.black};
    border: 2px solid ${(props) => props.theme.color.black};
  }

  :disabled {
    color: ${(props) => props.theme.color.black_disabled};
    background: ${(props) => props.theme.color.grey};
    border: 2px solid ${(props) => props.theme.color.grey};
    cursor: initial;
  }

  ${(props) =>
    props.tableBtn &&
    css`
      margin-right: 0;
      padding: 0 1rem;
      background: transparent;
      color: ${(props) => props.theme.color.black};
      border: none;
      outline: none;
      box-shadow: none;
      text-decoration: underline;

      :first-child {
        padding-right: 0;
      }

      &:not(:disabled):hover {
        text-decoration: none;
        background: transparent;
        border: none;
      }

      &:disabled {
        background: transparent;
        border: none;
        color: ${(props) => props.theme.color.black_disabled};
        cursor: initial;
      }
    `}
`;

export { Button };
