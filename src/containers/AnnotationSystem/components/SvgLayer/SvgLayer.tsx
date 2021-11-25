import React, { useEffect, useRef } from "react";
import {
  useAnnotationSystemActions,
  useAnnotationSystemAnnotationBoxes,
  useAnnotationSystemState,
} from "../../context";
import CreateBox from "../CreateBox";
import AnnotationBox from "../AnnotationBox";
import { Root } from "./SvgLayer.ui";
import { AnnotationSystemEventsEnum } from "../../AnnotationSystem.types";

export default function SvgLayer() {
  const rootRef = useRef<SVGSVGElement>(null);
  const { w, h, curEvent, isBoxCreatingProcess } = useAnnotationSystemState();
  const annotationBoxes = useAnnotationSystemAnnotationBoxes();
  const { onSetSvgLayerRef, onSetCurEvent } = useAnnotationSystemActions();

  const isShowCreateBox = isBoxCreatingProcess;

  useEffect(() => {
    if (!rootRef.current) {
      return;
    }
    onSetSvgLayerRef(rootRef.current);
  }, [onSetSvgLayerRef]);

  const handleMouseDown = (event: React.MouseEvent) => {
    if (event?.target !== rootRef.current) return;
    switch (curEvent) {
      case AnnotationSystemEventsEnum.BOX_SELECTED_MODE: {
        onSetCurEvent(null);
        return;
      }
    }
  };

  const handleMouseMove = (event: React.MouseEvent) => {};

  return (
    <Root
      onMouseMove={handleMouseMove}
      onMouseDown={handleMouseDown}
      currentEvent={curEvent}
      ref={rootRef}
      width={w}
      height={h}
    >
      {isShowCreateBox && <CreateBox />}
      {annotationBoxes &&
        annotationBoxes.map((annotationBoxProps) => {
          return (
            <AnnotationBox
              key={annotationBoxProps.id}
              {...annotationBoxProps}
            />
          );
        })}
    </Root>
  );
}
