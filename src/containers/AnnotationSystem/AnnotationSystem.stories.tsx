import React, { ChangeEventHandler, useState } from "react";
import AnnotationSystemBase from "./AnnotationSystem";

interface ControlProps {
  w: number;
  h: number;
}

interface ControlReturnProps extends ControlProps {
  render: React.ReactNode;
}

const CONTROL_PROPS_INIT: ControlProps = {
  w: 500,
  h: 500,
};

function useControl() {
  const [state, setState] = useState<ControlProps>(CONTROL_PROPS_INIT);

  const { w, h } = state;

  const handleChangeW: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = parseInt(e?.currentTarget?.value, 10);

    if (!newValue) return;

    setState((prevState) => ({
      ...prevState,
      w: newValue,
    }));
  };

  const handleChangeH: ChangeEventHandler<HTMLInputElement> = (e) => {
    const newValue = parseInt(e?.currentTarget?.value, 10);

    if (!newValue) return;

    setState((prevState) => ({
      ...prevState,
      h: newValue,
    }));
  };

  const render = (
    <>
      <label>Width</label>
      <input value={w} onChange={handleChangeW} />
      <label>Height</label>
      <input value={h} onChange={handleChangeH} />
    </>
  );

  return { w, h, render };
}

export function AnnotationSystem() {
  const { render: renderControlElems, h, w } = useControl();

  return (
    <>
      {renderControlElems}
      <AnnotationSystemBase
        mainViewportProps={{
          h,
          w,
        }}
      />
    </>
  );
}

export default {
  title: "Containers/Annotation System",
  component: AnnotationSystemBase,
};
