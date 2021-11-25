import React, { useState } from "react";
import {
  AnnotationBoxItem,
  BoxesDetails,
  BoxesIds,
  BoxesTimeline,
  Root,
} from "./SidebarInfo.ui";
import { Input } from "antd/";
import {
  useAnnotationSystemActions,
  useAnnotationSystemAnnotationBoxes,
} from "../../context";
import { AnnotationBoxProps } from "../../AnnotationSystem.types";

const { TextArea } = Input;

function SidebarInfo() {
  const annotationBoxes = useAnnotationSystemAnnotationBoxes();
  const { onSetCurSelBoxId } = useAnnotationSystemActions();

  const [
    annotationBoxData,
    setAnnotationBoxData,
  ] = useState<AnnotationBoxProps | null>(null);

  const handleGetAnnotationBoxData = (id: string) => {
    const annotationBox = annotationBoxes.find((box) => box.id === id);

    if (!annotationBox) {
      console.error(
        "Function handleOnGetAnnotationBoxData.\nCan not find annotation box with id " +
          id
      );
      return;
    }

    setAnnotationBoxData(annotationBox);
    onSetCurSelBoxId(id);
  };

  return (
    <Root>
      <BoxesIds>
        {annotationBoxes &&
          annotationBoxes.length > 0 &&
          annotationBoxes.map((box) => {
            return (
              <AnnotationBoxItem
                onClick={() => {
                  handleGetAnnotationBoxData(box.id);
                }}
                key={box.id}
              >
                {box.id}
              </AnnotationBoxItem>
            );
          })}
      </BoxesIds>
      <BoxesTimeline>Some text</BoxesTimeline>
      <BoxesDetails>{JSON.stringify(annotationBoxData)}</BoxesDetails>
    </Root>
  );
}

export default SidebarInfo;
