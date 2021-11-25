import React, { useCallback, useEffect, useRef, useState } from "react";
import {
  AnnotationBoxProps,
  AnnotationSystemEventsEnum,
} from "../../AnnotationSystem.types";
import {
  useAnnotationSystemActions,
  useAnnotationSystemState,
} from "../../context";
import ResizeRect from "./ResizeRect";
import { MergeState, ResizePosition } from "./AnnotationBox.types";
import {
  InnerStroke,
  LabelTag,
  MainBorderRect,
  Root,
} from "./AnnotationBox.ui";
import { useDebouncedCallback } from "use-debounce";
import handleUpdateWithTimeline from "./handlers/handleUpdateWithTimeline";
import handleMouseDown from "./handlers/handleMouseDown";
import useMousePosition from "../../hooks/useMousePosition";
import handleCoordsUpdate from "./handlers/handleCoordsUpdate";
import handleMouseMoveBoxResizeMode from "./handlers/handleMouseMoveBoxResizeMode";
import handleAnimateTransitions from "./handlers/handleTransAnimation";

export default function AnnotationBox(props: AnnotationBoxProps) {
  const [state, setState] = useState<AnnotationBoxProps>(props);
  const [
    isEnd,
    // setIsEnd
  ] = useState<boolean>(false);
  const prevTime = useRef<number>(0);
  // const rootRef = useRef();
  const [resizePosition, setResizePosition] = useState<ResizePosition | null>(
    null
  );
  const {
    curSelBoxId,
    svgLayerRef,
    curEvent,
    curTime,
    type,
  } = useAnnotationSystemState();
  const {
    onSetCurSelBoxId,
    onSetCurEvent,
    onModifyAnnotationBox,
  } = useAnnotationSystemActions();

  const [innerRectClickRelPos, setInnerRectClickRelPos] = useState<{
    x: number;
    y: number;
  }>({
    x: 0,
    y: 0,
  });

  const { label, x, y, w, h, timelineTransitions, id } = state;

  const mergeState: MergeState = (newState) => {
    setState((prevState) => ({
      ...prevState,
      ...newState,
    }));
  };

  /** Do animation */
  useEffect(() => {
    if (type !== "video") {
      return;
    }

    handleAnimateTransitions({
      setState,
      curTime,
      state,
      prevTime,
    });
  }, [curTime, timelineTransitions, x, y, type, state]);

  const handleUpdate = (newStage: Partial<AnnotationBoxProps>) => {
    const onUpdate = (newState: Partial<AnnotationBoxProps>) => {
      const finalState: AnnotationBoxProps = {
        ...state,
        ...newState,
      };
      setState(finalState);
      onModifyAnnotationBox(finalState);
    };

    if (type === "video") {
      handleUpdateWithTimeline({
        newState: newStage,
        onUpdate,
        prevState: props,
        curTime,
        isEnd,
      });
      return;
    }

    onUpdate(newStage);
  };

  const debouncedUpdate = useDebouncedCallback(handleUpdate, 200);

  const isActive = curSelBoxId === id;

  const { onStart, state: mouseState, onUpdate } = useMousePosition();
  const { x: innerX, y: innerY } = innerRectClickRelPos;

  const handleSvgLayerMouseMove = useCallback(
    (event: React.MouseEvent) => {
      const { x, dX, startY, y, startX, dY } = mouseState;

      switch (curEvent) {
        case AnnotationSystemEventsEnum.BOX_DRAG_MODE: {
          onUpdate(event);
          handleCoordsUpdate({
            mergeState,
            debouncedUpdate,
            newCoords: { x: startX + dX - innerX, y: startY + dY - innerY },
          });
          return;
        }
        case AnnotationSystemEventsEnum.BOX_RESIZE_MODE: {
          onUpdate(event);
          handleMouseMoveBoxResizeMode({
            relPosX: x,
            relPosY: y,
            resizePosition,
            state,
            onResize: (newCoords) => {
              handleCoordsUpdate({
                mergeState,
                debouncedUpdate,
                newCoords,
              });
            },
          });
          return;
        }
      }
    },
    [
      curEvent,
      debouncedUpdate,
      innerX,
      innerY,
      mouseState,
      onUpdate,
      resizePosition,
      state,
    ]
  );

  const handleSvgLayerMouseDown = useCallback(
    (event: React.MouseEvent) => {
      onStart(event);

      if (event?.target !== svgLayerRef) return;

      switch (curEvent) {
        case AnnotationSystemEventsEnum.BOX_DRAG_MODE: {
          onSetCurEvent(AnnotationSystemEventsEnum.BOX_SELECTED_MODE);
          return;
        }
        case AnnotationSystemEventsEnum.BOX_RESIZE_MODE: {
          onSetCurEvent(AnnotationSystemEventsEnum.BOX_SELECTED_MODE);
          return;
        }
      }
    },
    [curEvent, onSetCurEvent, onStart, svgLayerRef]
  );

  useEffect(() => {
    if (!isActive) return;

    // @ts-ignore
    svgLayerRef?.addEventListener("mousemove", handleSvgLayerMouseMove);
    // @ts-ignore
    svgLayerRef?.addEventListener("mousedown", handleSvgLayerMouseDown);
    return () => {
      // @ts-ignore
      svgLayerRef?.removeEventListener("mousemove", handleSvgLayerMouseMove);
      // @ts-ignore
      svgLayerRef?.removeEventListener("mousedown", handleSvgLayerMouseDown);
    };
  }, [
    curEvent,
    debouncedUpdate,
    handleSvgLayerMouseDown,
    handleSvgLayerMouseMove,
    innerRectClickRelPos,
    isActive,
    onSetCurEvent,
    resizePosition,
    state,
    svgLayerRef,
  ]);

  const onMouseDown = handleMouseDown({
    curEvent,
    curSelBoxId,
    onSetCurEvent,
    onSetCurSelBoxId,
    id,
    setInnerRectClickRelPos,
  });

  return (
    <Root
      isActive={isActive}
      x={x}
      isDrag={isActive && curEvent === AnnotationSystemEventsEnum.BOX_DRAG_MODE}
      y={y}
      width={w}
      height={h}
    >
      <LabelTag x="0" y="0" width="100%" height="22px">
        {label}
      </LabelTag>
      <MainBorderRect width="100%" height="100%" onMouseDown={onMouseDown} />
      <InnerStroke width="100%" height="100%" />
      {isActive &&
        curEvent !== AnnotationSystemEventsEnum.BOX_RESIZE_MODE &&
        curEvent !== AnnotationSystemEventsEnum.BOX_DRAG_MODE && (
          <ResizeRect onSetResizePosition={setResizePosition} />
        )}
    </Root>
  );
}
