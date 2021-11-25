import React from "react";
import styled, { css } from "styled-components";
import {
  useAnnotationSystemActions,
  useAnnotationSystemState,
} from "../../context";
import { AnnotationSystemEventsEnum } from "../../AnnotationSystem.types";
import { ResizePosition } from "./AnnotationBox.types";

const SIZE = 7;

const RectSvg = styled.svg(
  ({ cursor }: { cursor: string }) => css`
    pointer-events: all;
    overflow: visible;
    cursor: ${cursor};
    &:hover {
      ${RectInnerStyled} {
        fill: #fff;
      }

      ${RectStyled} {
        fill: blueviolet;
      }
    }
  `
);

const RectInnerStyled = styled.circle(
  () => css`
    pointer-events: all;
    overflow: visible;
    fill: black;
    z-index: 10;
  `
);
const RectStyled = styled.circle(
  () => css`
    overflow: visible;

    fill: rgba(251, 0, 130, 0.79);
    position: relative;
    z-index: 2;
  `
);

function Rect({
  onMouseDown,
  ...restProps
}: {
  x: string;
  y: string;
  cursor: string;
  onMouseDown: React.MouseEventHandler<SVGElement>;
}) {
  return (
    <RectSvg {...restProps} width={SIZE} height={SIZE}>
      <RectStyled
        onMouseDown={onMouseDown}
        r="100%"
        cx="0"
        cy="0"
        width="100%"
        height="100%"
      />
      <RectInnerStyled onMouseDown={onMouseDown} cx="0" cy="0" r="25%" />
    </RectSvg>
  );
}

function ResizeRect({
  onSetResizePosition,
}: {
  onSetResizePosition: (position: ResizePosition) => void;
}) {
  const { curEvent } = useAnnotationSystemState();
  const { onSetCurEvent } = useAnnotationSystemActions();

  const handleOnRectMouseDown = (
    position: ResizePosition
  ): React.MouseEventHandler<SVGRectElement> => (event) => {
    switch (curEvent) {
      case AnnotationSystemEventsEnum.BOX_SELECTED_MODE: {
        onSetResizePosition(position);
        onSetCurEvent(AnnotationSystemEventsEnum.BOX_RESIZE_MODE);
        return;
      }
      case AnnotationSystemEventsEnum.BOX_RESIZE_MODE: {
        onSetCurEvent(AnnotationSystemEventsEnum.BOX_SELECTED_MODE);
        return;
      }
    }
  };

  return (
    <>
      <Rect
        y="0%"
        x="0%"
        onMouseDown={handleOnRectMouseDown(ResizePosition.TOP_LEFT)}
        cursor="nwse-resize"
      />
      <Rect
        y="0%"
        x="50%"
        onMouseDown={handleOnRectMouseDown(ResizePosition.TOP_CENTER)}
        cursor="ns-resize"
      />
      <Rect
        y="0%"
        x="100%"
        cursor="nesw-resize"
        onMouseDown={handleOnRectMouseDown(ResizePosition.TOP_RIGHT)}
      />
      <Rect
        x="0%"
        y="50%"
        cursor="ew-resize"
        onMouseDown={handleOnRectMouseDown(ResizePosition.LEFT_CENTER)}
      />
      <Rect
        y="100%"
        x="0%"
        cursor="nesw-resize"
        onMouseDown={handleOnRectMouseDown(ResizePosition.BOTTOM_LEFT)}
      />
      <Rect
        x="100%"
        y="50%"
        cursor="ew-resize"
        onMouseDown={handleOnRectMouseDown(ResizePosition.RIGHT_CENTER)}
      />
      <Rect
        x="100%"
        y="100%"
        cursor="nwse-resize"
        onMouseDown={handleOnRectMouseDown(ResizePosition.BOTTOM_RIGHT)}
      />
      <Rect
        x="50%"
        y="100%"
        cursor="ns-resize"
        onMouseDown={handleOnRectMouseDown(ResizePosition.BOTTOM_CENTER)}
      />
    </>
  );
}

export default ResizeRect;
