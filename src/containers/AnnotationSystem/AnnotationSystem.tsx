import React, {
  DetailedHTMLProps,
  HTMLAttributes,
  MutableRefObject,
  PropsWithChildren,
  useRef,
  useState,
} from "react";

import styled, { css } from "styled-components";
import footballMatchImg from "./stories/mediaExamples/footballMatch-3k-001.jpg";

type MainViewportProps = {
  w?: number;
  h?: number;
};

const MainViewportUi = {
  Root: styled.div(
    ({ h, w }: MainViewportProps) => css`
      overflow: scroll;
      width: ${w}px;
      height: ${h}px;
    `
  ),
};

function MainViewport({
  children,
  w = 300,
  h = 300,
}: PropsWithChildren<MainViewportProps>) {
  return (
    <MainViewportUi.Root w={w} h={h}>
      {children}
    </MainViewportUi.Root>
  );
}

type MediaType = HTMLImageElement;

type SvgLayerProps = {};

const SvgLayerUi = {
  Root: styled.div(
    ({ x, y }: Partial<SvgLayerPosition>) => css`
      position: relative;
      left: ${x}px;
      top: ${y}px;
    `
  ),
  Svg: styled.svg(
    () => css`
      position: absolute;
      top: 0;
      left: 0;
    `
  ),
};

interface SvgLayerPosition {
  w: number;
  h: number;
  x: number;
  y: number;
}

interface SvgLayerState extends SvgLayerPosition {
  curAction: string;
  curSelBox: number;
  aspectRatio: number;
  curZoomLevel: number;
  zoomStep: number;
}

const SVG_LAYER_STATE_INIT = {
  w: 0,
  h: 0,
  x: 0,
  y: 0,
  aspectRatio: 1,
  curAction: "",
  curSelBox: 0,
  curZoomLevel: 1,
  zoomStep: 0.1,
};

function SvgLayer({}: SvgLayerProps) {
  const mediaRef = useRef<MediaType | null>(null);
  const [state, setState] = useState<SvgLayerState>(SVG_LAYER_STATE_INIT);
  const { w, h, x, y } = state;
  const [annotationBoxes, setAnnotationBoxes] = useState<
    React.ReactElement<AnnotationBoxProps>[]
  >([]);

  const handleSetSvgLayerPosition = (
    newPosition: Partial<SvgLayerPosition>
  ) => {
    setState((prevState) => ({
      ...prevState,
      ...newPosition,
    }));
  };

  const handleOnMediaLoad: React.ReactEventHandler<MediaType> = (event) => {
    console.log("Image load finished");
    console.log(event);
    const img: MediaType = event.currentTarget;

    if (!img) return;

    handleSetSvgLayerPosition({
      w: img.naturalWidth as number,
      h: img.naturalHeight as number,
    });
  };

  const handleOnSvgLayerClick: React.MouseEventHandler<SVGSVGElement> = (
    event
  ) => {
    const e = event.currentTarget;
    const dim = e.getBoundingClientRect();
    const x = event.clientX - dim.left;
    const y = event.clientY - dim.top;

    const relPosX = x;
    const relPosY = y;

    if (!relPosX || !relPosY) return;
    setAnnotationBoxes((prevState) => [
      ...prevState,
      <AnnotationBox label="123" x={relPosX} y={relPosY} h={100} w={100} />,
    ]);
  };

  return (
    <SvgLayerUi.Root x={x} y={y}>
      <MediaLayer w={w} h={h} mediaRef={mediaRef} onLoad={handleOnMediaLoad} />
      <SvgLayerUi.Svg onClick={handleOnSvgLayerClick} width={w} height={h}>
        {annotationBoxes}
      </SvgLayerUi.Svg>
    </SvgLayerUi.Root>
  );
}

interface MediaLayerProps extends HTMLAttributes<MediaType>, ImgProps {
  mediaRef: MutableRefObject<MediaType | null>;
}

interface ImgProps {
  w: number;
  h: number;
}

const ImgStyled = styled.img(
  ({ w, h }: ImgProps) => css`
    width: ${w}px;
    height: ${h}px;
  `
);

function MediaLayer({ onLoad, mediaRef, w, h, ...restProps }: MediaLayerProps) {
  return (
    <ImgStyled
      h={h}
      w={w}
      src={footballMatchImg}
      onLoad={onLoad}
      ref={mediaRef}
    />
  );
}

const AnnotationBoxUi = {
  Root: styled.svg(() => css``),
  Rect: styled.rect(
    () => css`
      border: 3px;
    `
  ),
};

interface AnnotationBoxProps {
  x: number;
  y: number;
  w: number;
  h: number;
  label: string;
}

interface CreateBoxProps {
  initX: number;
  initY: number;
  onCreate: () => void;
}

interface AnnotationBoxState {
  x: number;
  y: number;
}

const ANNOTATION_BOX_STATE_INIT: AnnotationBoxState = {
  x: 0,
  y: 0,
};

function CreateBox({ initX, initY, onCreate }: CreateBoxProps) {}

function AnnotationBox(props: AnnotationBoxProps) {
  const { Rect, Root } = AnnotationBoxUi;
  const [state, setState] = useState<AnnotationBoxState>({
    ...ANNOTATION_BOX_STATE_INIT,
    x: props.x,
    y: props.y,
  });

  const { x, y } = state;

  return (
    <Root x={x} y={y} width="30" height="30">
      <Rect height="100%" width="100%"></Rect>
    </Root>
  );
}

/*
 * Annotation System
 * -----------------
 */

interface AnnotationSystemProps {
  mainViewportProps?: MainViewportProps;
}

function AnnotationSystem({ mainViewportProps }: AnnotationSystemProps) {
  return (
    <div>
      <MainViewport {...mainViewportProps}>
        <SvgLayer />
      </MainViewport>
    </div>
  );
}

export default AnnotationSystem;
