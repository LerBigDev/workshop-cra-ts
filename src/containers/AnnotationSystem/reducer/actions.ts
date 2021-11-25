import {
  AnnotationBoxProps,
  AnnotationSystemEvents,
  MediaType,
  VideoStatus,
} from "../AnnotationSystem.types";
import {
  AddAnnotationBox,
  DeleteAddAnnotationBox,
  ModifyAnnotationBox,
  ReducerActions,
  SetCurEvent,
  SetCurHoverBoxId,
  SetCurSelBoxId,
  SetCursorInitPos,
  SetCurVideoStatus,
  SetCurVideoTime,
  SetH,
  SetInitSize,
  SetMediaRef,
  SetSvgLayerRef,
  SetViewportSize,
  SetW,
  SetX,
  SetZoomLevel,
  ZoomIn,
  ZoomOut,
} from "./types";

export function setMediaRef(ref: MediaType | null): SetMediaRef {
  return {
    payload: ref,
    type: ReducerActions.SET_MEDIA_REF,
  };
}

export function setSvgLayerRef(ref: SVGSVGElement | null): SetSvgLayerRef {
  return {
    payload: ref,
    type: ReducerActions.SET_SVG_LAYER_REF,
  };
}

export function setCurEvent(event: AnnotationSystemEvents): SetCurEvent {
  return {
    payload: event,
    type: ReducerActions.SET_CUR_EVENT,
  };
}

export function setH(h: number): SetH {
  return {
    payload: h,
    type: ReducerActions.SET_H,
  };
}

export function setW(w: number): SetW {
  return {
    payload: w,
    type: ReducerActions.SET_W,
  };
}

export function setX(x: number): SetX {
  return {
    payload: x,
    type: ReducerActions.SET_X,
  };
}

export function setY(y: number) {
  return {
    payload: y,
    type: ReducerActions.SET_Y,
  };
}

export function addAnnotationBox(
  annotationBox: AnnotationBoxProps
): AddAnnotationBox {
  return {
    payload: annotationBox,
    type: ReducerActions.ADD_ANNOTATION_BOX,
  };
}

export function modifyAnnotationBox(
  annotationBox: AnnotationBoxProps
): ModifyAnnotationBox {
  return {
    payload: annotationBox,
    type: ReducerActions.MODIFY_ANNOTATION_BOX,
  };
}

export function deleteAddAnnotationBox(id: string): DeleteAddAnnotationBox {
  return {
    payload: id,
    type: ReducerActions.DELETE_ANNOTATION_BOX,
  };
}

export function zoomIn(): ZoomIn {
  return {
    type: ReducerActions.ZOOM_IN,
  };
}

export function zoomOut(): ZoomOut {
  return {
    type: ReducerActions.ZOOM_OUT,
  };
}

export function setZoomLevel(zoomLevel: number): SetZoomLevel {
  return {
    payload: zoomLevel,
    type: ReducerActions.SET_ZOOM_LEVEL,
  };
}

export function setInitSize({ w, h }: { w: number; h: number }): SetInitSize {
  return {
    payload: {
      w,
      h,
    },
    type: ReducerActions.SET_INIT_SIZE,
  };
}

export function setViewportSize({
  w,
  h,
}: {
  w?: number;
  h?: number;
}): SetViewportSize {
  return {
    payload: {
      w,
      h,
    },
    type: ReducerActions.SET_VIEWPORT_SIZE,
  };
}

export function setCurSelBoxId(id: string | null): SetCurSelBoxId {
  return {
    payload: id,
    type: ReducerActions.SET_CUR_SEL_BOX_ID,
  };
}

export function setCurHoverBoxId(id: string | null): SetCurHoverBoxId {
  return {
    payload: id,
    type: ReducerActions.SET_CUR_HOVER_BOX_ID,
  };
}

export function setCurVideoTime(time: number): SetCurVideoTime {
  return {
    payload: time,
    type: ReducerActions.SET_CUR_VIDEO_TIME,
  };
}

export function setCurVideoStatus(status: VideoStatus): SetCurVideoStatus {
  return {
    payload: status,
    type: ReducerActions.SET_CUR_VIDEO_STATUS,
  };
}

export function setCursorInitPos(props: {
  x: number;
  y: number;
}): SetCursorInitPos {
  return {
    payload: props,
    type: ReducerActions.SET_CURSOR_INIT_POS,
  };
}
