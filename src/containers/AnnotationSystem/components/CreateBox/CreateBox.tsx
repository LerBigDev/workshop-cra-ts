import React, { useCallback, useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";
import {
  useAnnotationSystemActions,
  useAnnotationSystemState,
} from "../../context";
import {
  AnnotationBoxProps,
  AnnotationSystemEventsEnum,
  TimelineTransition,
} from "../../AnnotationSystem.types";
import { preventResizeInverse } from "../../AnnotationSystem.utils";
import InputLabel from "../InputLabel";
import { Foreign, Rect, SvgRoot } from "./CreateBox.ui";
import useMousePosition from "../../hooks/useMousePosition";

export default function CreateBox() {
  const { curEvent, curTime, type, svgLayerRef } = useAnnotationSystemState();
  const { onSetCurEvent, onAddAnnotationBox } = useAnnotationSystemActions();
  const { onReset, onStart, state: mouseState, onUpdate } = useMousePosition();

  const [isClicked, setIsClicked] = useState(false);

  const [showLabel, setShowLabel] = useState(false);

  const [finalBoxSize, setFinalBoxSize] = useState<
    Pick<AnnotationBoxProps, "x" | "y" | "w" | "h"> | undefined
  >();

  useEffect(() => {
    onReset();
  }, [onReset]);

  const handleSuccess = (labelProp: string) => {
    let timelineTransitions: TimelineTransition[] = [];

    if (!finalBoxSize) {
      return;
    }

    if (type === "video") {
      timelineTransitions = [
        {
          ...finalBoxSize,
          timestamp: curTime,
        },
      ];
    }

    if (!labelProp) {
      alert("Label required");
      return;
    }

    onAddAnnotationBox({
      ...finalBoxSize,
      id: uuidv4(),
      label: labelProp,
      timelineTransitions,
      isLabelSetDropdownOpen: false,
    });
    onSetCurEvent(null);
    onReset();
  };

  const handleMouseDown = useCallback(
    (event: React.MouseEvent) => {
      switch (curEvent) {
        case null: {
          return;
        }
        case AnnotationSystemEventsEnum.CREATE_MODE: {
          onStart(event);
          setIsClicked(true);
          onSetCurEvent(
            AnnotationSystemEventsEnum.ANNOTATION_BOX_CREATING_SIZE
          );
          return;
        }
        case AnnotationSystemEventsEnum.ANNOTATION_BOX_CREATING_SIZE: {
          setFinalBoxSize(
            preventResizeInverse({
              initX: mouseState.startX,
              initY: mouseState.startY,
              dY: mouseState.dY,
              dX: mouseState.dX,
            })
          );
          onSetCurEvent(
            AnnotationSystemEventsEnum.ANNOTATION_BOX_CREATING_LABEL
          );
          setShowLabel(true);
          return;
        }
        case AnnotationSystemEventsEnum.ANNOTATION_BOX_CREATING_LABEL: {
          return;
        }
      }
    },
    [
      curEvent,
      mouseState.startX,
      mouseState.startY,
      mouseState.x,
      mouseState.y,
      onSetCurEvent,
      onStart,
    ]
  );

  const handleLabelSave = (labelProp: string) => {
    handleSuccess(labelProp);
  };

  const handleSvgLayerMouseMove = useCallback(
    (event: React.MouseEvent) => {
      onUpdate(event);

      switch (curEvent) {
        case AnnotationSystemEventsEnum.CREATE_MODE: {
          // onUpdate(event);
          return;
        }
      }
    },
    [curEvent, onUpdate]
  );

  useEffect(() => {
    // @ts-ignore
    svgLayerRef?.addEventListener("mousedown", handleMouseDown);
    // @ts-ignore
    svgLayerRef?.addEventListener("mousemove", handleSvgLayerMouseMove);
    return () => {
      // @ts-ignore
      svgLayerRef?.removeEventListener("mousedown", handleMouseDown);
      // @ts-ignore
      svgLayerRef?.removeEventListener("mousemove", handleSvgLayerMouseMove);
    };
  }, [curEvent, handleMouseDown, handleSvgLayerMouseMove, svgLayerRef]);

  if (!isClicked) return null;

  const svgSize =
    finalBoxSize ??
    preventResizeInverse({
      initX: mouseState.startX,
      initY: mouseState.startY,
      dX: mouseState.dX,
      dY: mouseState.dY,
    });

  return (
    <SvgRoot {...svgSize}>
      <Rect width="100%" height="100%" x={0} y={0} />
      {showLabel && (
        <Foreign x="50%" y="calc(100% + .5rem)" width={150} height="100%">
          <InputLabel
            onSave={handleLabelSave}
            onCancel={() => {
              onSetCurEvent(null);
            }}
          />
        </Foreign>
      )}
    </SvgRoot>
  );
}
