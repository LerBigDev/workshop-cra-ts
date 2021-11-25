import React, { PropsWithChildren } from "react";
import { Box } from "../../../components/layout";
import { BoxProps } from "../../../components/layout/Box";
import styled, { css } from "styled-components";

const RoundButtonStyled = styled(Box)(
  () => css`
    svg {
      width: 40px;
    }
  `
);

export default function RoundButton({
  children,
  onClick,
  ...restProps
}: PropsWithChildren<
  BoxProps & {
    onClick?: React.MouseEventHandler;
  }
>) {
  return (
    <RoundButtonStyled {...(restProps as BoxProps)} onClick={onClick}>
      {children}
    </RoundButtonStyled>
  );
}
