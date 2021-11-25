import React from "react";
import InputLabelBase from "./InputLabel";
import ContextProvider from "../../context";

export function InputLabel() {
  return (
    <ContextProvider mediaSrcUrl={null} type={"image"} labels={["Car", "Cat"]}>
      <InputLabelBase onSave={() => {}} onCancel={() => {}} />
    </ContextProvider>
  );
}

export default {
  component: InputLabel,
  title: "Containers/Annotation System/Input Label",
};
