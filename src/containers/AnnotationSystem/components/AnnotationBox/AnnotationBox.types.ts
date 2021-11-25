import { AnnotationBoxProps } from "../../AnnotationSystem.types";

export type ResizePositionNullable = ResizePosition | null;

export enum ResizePosition {
  "TOP_LEFT",
  "TOP_CENTER",
  "TOP_RIGHT",
  "LEFT_CENTER",
  "RIGHT_CENTER",
  "BOTTOM_LEFT",
  "BOTTOM_CENTER",
  "BOTTOM_RIGHT",
}

export type MergeState = (state: Partial<AnnotationBoxProps>) => void;
export type DebouncedUpdate = (newState: Partial<AnnotationBoxProps>) => void;
