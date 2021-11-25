import React, { useState } from "react";
import { Root } from "./InputLabel.ui";
import useAnnotationSystemLabels from "../../context/useAnnotationSystemLabels";
import { Button, Select } from "antd";
import { Col, Row } from "../../../../components/layout";

function InputLabel({
  onSave,
  onCancel,
}: {
  onSave: (label: string) => void;
  onCancel: () => void;
}) {
  const labels = useAnnotationSystemLabels();
  const [isOpen, setIsOpen] = useState(true);
  const [label, setLabel] = useState<string>();

  const handleSave = () => {
    if (label) {
      onSave(label);
    }
  };

  const handleCancel = () => {
    onCancel();
  };

  const handleSelectClick = () => {
    setIsOpen((prevState) => !prevState);
  };

  const handleSelect = (value: string) => {
    setLabel(value as string);
  };

  return (
    <Root>
      <Row gridGap=".5rem">
        <Select
          defaultOpen={true}
          autoFocus={true}
          open={isOpen}
          onSelect={handleSelect}
          onClick={handleSelectClick}
          getPopupContainer={(triggerNode) => triggerNode.parentElement}
        >
          {labels &&
            labels.length > 0 &&
            labels.map((label) => {
              return <Select.Option value={label}>{label}</Select.Option>;
            })}
        </Select>
        <Col gridGap="2rem">
          <Button type="primary" onClick={handleSave}>
            Save
          </Button>
          <Button onClick={handleCancel}>Cancel</Button>
        </Col>
      </Row>
    </Root>
  );
}

export default InputLabel;
