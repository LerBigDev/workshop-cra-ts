import { PropsWithChildren, useEffect, useMemo, useReducer } from "react";
import reducer, { REDUCER_INIT, setViewportSize } from "../reducer";
import context from "./context";
import { AnnotationSystemProps } from "../AnnotationSystem.types";

export default function ContextProvider({
  children,
  ...restProps
}: PropsWithChildren<Partial<AnnotationSystemProps>>) {
  const [state, dispatch] = useReducer(reducer, {
    ...REDUCER_INIT,
    ...restProps,
  });

  const { viewportW, viewportH } = restProps;

  useEffect(() => {
    dispatch(setViewportSize({ w: viewportW, h: viewportH }));
  }, [viewportW, viewportH]);

  const value = useMemo(
    () => ({
      state,
      dispatch,
    }),
    [state]
  );

  return <context.Provider value={value}>{children}</context.Provider>;
}
