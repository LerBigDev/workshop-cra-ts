import React, { MutableRefObject } from "react";
import { ReducerActionTypes } from "./reducer";

export type MediaType = MediaTypeImage | MediaTypeVideo;

export type MediaTypeVideo = HTMLVideoElement;

export type MediaTypeImage = HTMLImageElement;

export type VideoStatus = "play" | "stop";

export type StringNullable = string | null;

export interface SvgLayerState {
  cursorInitX: number;
  cursorInitY: number;
  curVideoStatus: VideoStatus | null;
  curTime: number;
  annotationBoxes: AnnotationBoxes;
  mediaSrcUrl: StringNullable;
  type: AnnotationSystemType;
  curHoverBoxId: StringNullable;
  labels: string[];
  w: number;
  h: number;
  x: number;
  y: number;
  mediaRef: MediaType | null;
  svgLayerRef: SVGSVGElement | null;
  mouseDX: number;
  mouseDY: number;
  mouseInitX: number;
  mouseInitY: number;
  initH: number;
  initW: number;
  viewportW: number;
  viewportH: number;
  isInitMediaLoading: boolean;
  curEvent: AnnotationSystemEvents;
  curSelBoxId: StringNullable;
  aspectRatio: number;
  curZoomLevel: number;
  zoomStep: number;
}

export interface TimelineTransition {
  x: number;
  y: number;
  w: number;
  h: number;
  timestamp: number;
  isEnd?: boolean;
}

export interface AnnotationBoxCoords {
  x: number;
  y: number;
  w: number;
  h: number;
}

export interface AnnotationBoxProps extends AnnotationBoxCoords {
  id: string;
  label: string;
  timelineTransitions: TimelineTransition[];
  isLabelSetDropdownOpen?: boolean;
}

export type AnnotationSystemEvents = AnnotationSystemEventsEnum | null;

export type VideoAnnotationBoxes = Record<string, AnnotationBoxes>;

export type AnnotationSystemType = "video" | "image";

export enum AnnotationSystemEventsEnum {
  "ANNOTATION_BOX_CREATING_SIZE" = "ANNOTATION_BOX_CREATING_SIZE",
  "ANNOTATION_BOX_CREATING_LABEL" = "ANNOTATION_BOX_CREATING_LABEL",
  "CREATE_MODE" = "CREATE_MODE",
  "DRAG_MODE" = "DRAG_MODE",
  "ZOOM_MODE" = "ZOOM_MODE",
  "BOX_RESIZE_MODE" = "BOX_RESIZE_MODE",
  "BOX_DRAG_MODE" = "BOX_DRAG_MODE",
  "SELECT_MODE" = "SELECT_MODE",
  "BOX_SELECTED_MODE" = "BOX_SELECTED_MODE",
}

export type AnnotationBoxes = AnnotationBoxProps[];

export type AnnotationSystemProps = SvgLayerState;

export interface AnnotationSystemContext {
  state: AnnotationSystemProps;
  dispatch: React.Dispatch<ReducerActionTypes>;
}

export interface SvgLayerContextState {
  mouseRelY: number;
  mouseRelX: number;
  mousePressInitX: number;
  mousePressInitY: number;
  mouseDX: number;
  mouseDY: number;
}
export interface SvgLayerContext {
  svgLayerState: SvgLayerContextState;
  setSvgLayerState: React.Dispatch<
    React.SetStateAction<SvgLayerContextState> | SvgLayerContextState
  >;
}
