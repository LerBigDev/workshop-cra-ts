import React, { PropsWithChildren } from "react";
import { MainViewportProps } from "./MainViewport.types";
import { Root } from "./MainViewport.ui";

export default function MainViewport({
  children,
  w = 0,
  h = 0,
}: PropsWithChildren<MainViewportProps>) {
  return (
    <Root w={w} h={h}>
      {children}
    </Root>
  );
}
