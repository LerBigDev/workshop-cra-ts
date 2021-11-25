import React from "react";
import Col from "../../../../components/layout/Col";
import { Item, Root } from "./Toolbar.ui";
import AddBoxIcon from "@mui/icons-material/AddBox";
import ZoomInIcon from "@mui/icons-material/ZoomIn";
import ZoomOutIcon from "@mui/icons-material/ZoomOut";
import ZoomOutMapIcon from "@mui/icons-material/ZoomOutMap";
import AspectRatioIcon from "@mui/icons-material/AspectRatio";
import {
  useAnnotationSystemActions,
  useAnnotationSystemState,
} from "../../context";
import { AnnotationSystemEventsEnum } from "../../AnnotationSystem.types";

function Toolbar() {
  const { curEvent, isBoxCreatingProcess } = useAnnotationSystemState();
  const { onSetCurEvent } = useAnnotationSystemActions();

  const handleOnStartCreateMode = () => {
    if (isBoxCreatingProcess) {
      onSetCurEvent(null);
      return;
    }

    onSetCurEvent(AnnotationSystemEventsEnum.CREATE_MODE);
  };

  return (
    <Root>
      <Col gridGap="1rem" gridAutoColumns="max-content" alignItems="center">
        <Item
          isActive={curEvent === AnnotationSystemEventsEnum.CREATE_MODE}
          onClick={handleOnStartCreateMode}
        >
          <AddBoxIcon />
        </Item>
        <Item>
          <ZoomInIcon />
        </Item>
        <Item>1:1</Item>
        <Item>
          <ZoomOutIcon />
        </Item>
        <Item>
          <ZoomOutMapIcon />
        </Item>
        <Item>
          <AspectRatioIcon />
        </Item>
      </Col>
    </Root>
  );
}

export default Toolbar;
