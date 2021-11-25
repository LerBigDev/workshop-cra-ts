import { useContext, useMemo } from "react";
import context from "./context";

export default function useAnnotationSystemAnnotationBoxes() {
  const { state } = useContext(context);

  const { annotationBoxes } = state;

  return useMemo(() => annotationBoxes, [annotationBoxes]);
}
