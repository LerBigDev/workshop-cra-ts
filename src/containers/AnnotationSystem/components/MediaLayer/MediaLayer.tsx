import React, { HTMLAttributes } from "react";
import { MediaTypeImage, MediaTypeVideo } from "../../AnnotationSystem.types";
import { ImgStyled } from "./MediaLayer.ui";
import VideoPlayer from "../../../VideoPlayer";
import { useAnnotationSystemActions } from "../../context";

interface MediaLayerImageProps {
  w: number;
  h: number;
  src: string;
  onLoad: React.ReactEventHandler<MediaTypeImage>;
}

interface MediaLayerVideoProps extends HTMLAttributes<MediaTypeVideo> {
  src: string;
  w: number;
  h: number;
  onStop?: () => void;
  onPlay?: () => void;
  onLoad: React.ReactEventHandler<MediaTypeVideo>;
}

export function MediaLayerVideo({
  w,
  h,
  onLoad,
  src,
  onStop,
  onPlay,
}: MediaLayerVideoProps) {
  const { onSetCurVideoTime } = useAnnotationSystemActions();

  return (
    <VideoPlayer
      w={w}
      h={h}
      onStop={onStop}
      onPlay={onPlay}
      startTime={0}
      endTime={10}
      src={src}
      onTimeChange={onSetCurVideoTime}
      type="video/webm"
      onLoad={onLoad}
    />
  );
}

export function MediaLayerImage({ onLoad, w, h, src }: MediaLayerImageProps) {
  return <ImgStyled h={h} w={w} src={src} onLoad={onLoad} />;
}
