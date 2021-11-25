import React from "react";
import { PauseCircleOutlined, PlayCircleOutlined } from "@ant-design/icons";
import RoundButton from "./RoundButton";

function PlayButton({
  isPlaying,
  onClick,
}: {
  isPlaying: boolean;
  onClick: React.MouseEventHandler;
}) {
  return (
    <RoundButton onClick={onClick}>
      {isPlaying ? <PauseCircleOutlined /> : <PlayCircleOutlined />}
    </RoundButton>
  );
}

export default PlayButton;
