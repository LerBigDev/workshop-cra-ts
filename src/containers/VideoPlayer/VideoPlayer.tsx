import React, { useEffect, useLayoutEffect, useRef, useState } from "react";
import { Root } from "./VideoPlayer.ui";
import { PlayButton, ProgressBar } from "./components";
import { Col, Row } from "../../components/layout";
import { MediaTypeVideo } from "../AnnotationSystem/AnnotationSystem.types";

function VideoPlayer({
  startTime,
  endTime,
  src,
  type,
  onLoad,
  onTimeChange,
  w,
  h,
  onPlay,
  onStop,
}: {
  w: number;
  h: number;
  startTime: number;
  endTime: number;
  src: string;
  onPlay?: () => void;
  onStop?: () => void;
  onTimeChange: (time: number) => void;
  onLoad: React.ReactEventHandler<MediaTypeVideo>;
  type: "video/webm" | "video/avi" | "video/mp4";
}) {
  const myVidRef = useRef<MediaTypeVideo>(null);
  const [curTimeVal, setCurTimeVal] = useState(startTime);
  const [isEndReached, setIsEndReached] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

  useLayoutEffect(() => {
    const vid = myVidRef.current;
    if (!vid) {
      return;
    }

    setCurTimeVal(startTime);
    vid.currentTime = startTime;
    vid.pause();
  }, [startTime]);

  useEffect(() => {
    if (isPlaying) {
      onPlay && onPlay();
      return;
    }

    onStop && onStop();
  }, [isPlaying, onPlay, onStop]);

  return (
    <Root width={w} height={h}>
      <Row>
        <video
          onLoadedMetadata={(event) => {
            onLoad(event);
          }}
          ref={myVidRef}
          width="100%"
          id="myVid"
          controls={false}
          preload="metadata"
          onPlay={() => {
            setIsPlaying(true);
          }}
          onPause={() => {
            setIsPlaying(false);
          }}
          onPlaying={(event) => {
            const vid = event.currentTarget;
          }}
          onTimeUpdate={(event) => {
            const vid = event.currentTarget;
            if (vid.currentTime >= endTime) {
              vid.pause();
              setIsEndReached(true);
            }
            if (vid.currentTime < startTime) {
              vid.pause();
            }
            setCurTimeVal(vid.currentTime);
            onTimeChange(vid.currentTime);
          }}
        >
          <source src={src} type={type} />
          Your browser does not support HTML video.
        </video>
        <Col width="100%" gridTemplateColumns="max-content 1fr">
          <PlayButton
            isPlaying={isPlaying}
            onClick={() => {
              const vid = myVidRef.current;

              if (!vid) return;

              if (isPlaying) {
                vid.pause();
                return;
              }

              if (isEndReached) {
                vid.currentTime = startTime;
                vid.play();
                setIsEndReached(false);
                return;
              }
              vid.play();
            }}
          />
          <Col width="100%">
            <ProgressBar
              min={startTime}
              max={endTime}
              step={0.1}
              value={curTimeVal}
              onChange={(time) => {
                const value = time;
                const vid = myVidRef.current;

                if (!value || !vid) return;

                if (isPlaying) {
                  vid.pause();
                }

                vid.currentTime = value;
              }}
            />
          </Col>
        </Col>
      </Row>
    </Root>
  );
}

export default VideoPlayer;
