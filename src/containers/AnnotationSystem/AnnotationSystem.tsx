import React, { useCallback } from "react";
import MainViewport from "./components/MainViewport";
import SvgLayer from "./components/SvgLayer";
import { MediaTypeImage, MediaTypeVideo } from "./AnnotationSystem.types";
import ContextProvider, {
  useAnnotationSystemActions,
  useAnnotationSystemState,
} from "./context";
import { MediaLayerVideo, MediaLayerImage } from "./components/MediaLayer";
import { Root } from "./AnnotationSystem.ui";
import Toolbar from "./components/Toolbar";
import { Col, Row, Box } from "../../components/layout";
import SidebarInfo from "./components/SidebarInfo";
import { AnnotationSystemProps } from "./AnnotationSystem.types";
import ShowCurMode from "./components/ShowCurMode";

/*
 * Annotation System
 * -----------------
 */

function AnnotationSystemContext({
  type = "image",
  mediaSrcUrl,
  viewportW,
  viewportH,
  ...restProps
}: Partial<AnnotationSystemProps>) {
  return (
    <div>
      <ContextProvider
        viewportW={viewportW}
        viewportH={viewportH}
        type={type}
        mediaSrcUrl={mediaSrcUrl}
        {...restProps}
      >
        <AnnotationSystem />
      </ContextProvider>
    </div>
  );
}

function AnnotationSystem() {
  const {
    x,
    y,
    w,
    h,
    viewportW,
    viewportH,
    mediaSrcUrl,
    type,
  } = useAnnotationSystemState();
  const { onSetInitSize, onSetCurVideoStatus } = useAnnotationSystemActions();

  const handleOnMediaImageLoad: React.ReactEventHandler<MediaTypeImage> = (
    event
  ) => {
    const img: MediaTypeImage = event.currentTarget;

    if (!img) {
      console.error(
        "Function: handleOnMediaImageLoad\n No image current target"
      );
    }

    onSetInitSize({
      w: img.naturalWidth as number,
      h: img.naturalHeight as number,
    });
  };

  const handleOnMediaVideoLoad: React.ReactEventHandler<MediaTypeVideo> = (
    event
  ) => {
    const vid: MediaTypeVideo = event.currentTarget;

    if (!vid) {
      console.error("Function: handleOnMediaVideoLoad\n No video target");
      return;
    }

    onSetInitSize({
      w: vid.videoWidth as number,
      h: vid.videoHeight as number,
    });
  };

  const handleOnMediaVideoPlay = useCallback(() => {
    onSetCurVideoStatus("play");
  }, [onSetCurVideoStatus]);

  const handleOnMediaVideoStop = useCallback(() => {
    onSetCurVideoStatus("stop");
  }, [onSetCurVideoStatus]);

  return (
    <div>
      <Col>
        <Row>
          <Toolbar />
          <Box position="relative">
            <ShowCurMode />
            <MainViewport w={viewportW} h={viewportH}>
              <Root x={x} y={y}>
                {mediaSrcUrl &&
                  (type === "video" ? (
                    <MediaLayerVideo
                      w={w}
                      h={h}
                      src={mediaSrcUrl}
                      onPlay={handleOnMediaVideoPlay}
                      onStop={handleOnMediaVideoStop}
                      onLoad={handleOnMediaVideoLoad}
                    />
                  ) : (
                    <MediaLayerImage
                      src={mediaSrcUrl}
                      w={w}
                      h={h}
                      onLoad={handleOnMediaImageLoad}
                    />
                  ))}
                <SvgLayer />
              </Root>
            </MainViewport>
          </Box>
        </Row>
        <Row>
          <SidebarInfo />
        </Row>
      </Col>
    </div>
  );
}

export default AnnotationSystemContext;
