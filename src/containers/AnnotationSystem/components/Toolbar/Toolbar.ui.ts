import styled, { css } from "styled-components";

export const Root = styled.div`
  border-radius: 5px;
  padding: 5px;
`;

export const Item = styled.div(
  ({ isActive }: { isActive?: boolean }) => css`
    padding: 5px;
    border-radius: 5px;
    cursor: pointer;

    ${isActive &&
    css`
      background-color: #7accff;
    `}
  `
);
