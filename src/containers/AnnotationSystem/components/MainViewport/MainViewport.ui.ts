import styled, { css } from "styled-components";
import { MainViewportProps } from "./MainViewport.types";

export const Root = styled.div(
  ({ h, w }: MainViewportProps) => css`
    overflow: scroll;
    position: relative;
    width: ${w}px;
    height: ${h}px;
    border: 3px solid aqua;
  `
);
