import styled, { css } from "styled-components";
import { ImgProps } from "./MediaLayer.types";

export const ImgStyled = styled.img(
  ({ w, h }: ImgProps) => css`
    width: ${w}px;
    height: ${h}px;
  `
);
