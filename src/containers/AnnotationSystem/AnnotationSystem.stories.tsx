import React, { ChangeEventHandler, useState } from "react";
import AnnotationSystemBase from "./AnnotationSystem";
import mediaSrcUrl_imageExample_001 from "./stories/mediaExamples/footballMatch-3k-001.jpg";

interface ControlProps {
  w: number;
  h: number;
}

interface ControlReturnProps extends ControlProps {
  render: React.ReactNode;
}

const CONTROL_PROPS_INIT: ControlProps = {
  w: 1000,
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

export function AnnotationSystem_Image_Example_001() {
  const { render: renderControlElems, h, w } = useControl();

  return (
    <>
      {renderControlElems}
      <AnnotationSystemBase
        type="image"
        mediaSrcUrl={mediaSrcUrl_imageExample_001}
        viewportH={h}
        viewportW={w}
        labels={["Cat", "Dog"]}
      />
    </>
  );
}

export function AnnotationSystem_Video_Example_001() {
  const { render: renderControlElems, h, w } = useControl();

  return (
    <>
      {renderControlElems}
      <AnnotationSystemBase
        type="video"
        mediaSrcUrl="https://file-examples-com.github.io/uploads/2020/03/file_example_WEBM_640_1_4MB.webm"
        viewportH={h}
        viewportW={w}
        labels={["Cat", "Dog"]}
      />
    </>
  );
}

export default {
  title: "Containers/Annotation System",
  component: AnnotationSystemBase,
};
