import styled, { css } from "styled-components";
import { AnnotationSystemEventsEnum } from "../../AnnotationSystem.types";

export const Root = styled.svg(
  ({
    currentEvent,
  }: {
    currentEvent?: AnnotationSystemEventsEnum | null;
  }) => css`
    position: absolute;
    top: 0;
    left: 0;

    ${currentEvent === AnnotationSystemEventsEnum.CREATE_MODE &&
    css`
      cursor: crosshair;
    `}
  `
);
