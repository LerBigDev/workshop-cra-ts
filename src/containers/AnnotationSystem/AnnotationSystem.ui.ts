import styled, { css } from "styled-components";

export const Root = styled.div(
  ({ x, y }: { x: number; y: number }) => css`
    position: relative;
    left: ${x}px;
    top: ${y}px;
  `
);
