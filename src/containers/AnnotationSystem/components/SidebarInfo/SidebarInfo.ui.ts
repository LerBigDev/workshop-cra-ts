import styled from "styled-components";

export const Root = styled.div`
  padding: 1rem;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr 1fr;
  grid-template-areas:
    "boxesIds boxesTimeline"
    "boxesIds boxesDetails";
`;

export const BoxesIds = styled.div`
  grid-area: boxesIds;
  background-color: rgba(138, 43, 226, 0.2);
`;

export const BoxesTimeline = styled.div`
  grid-area: boxesTimeline;
  background-color: rgba(115, 255, 156, 0.27);
`;

export const BoxesDetails = styled.div`
  grid-area: boxesDetails;
  background-color: rgba(255, 172, 208, 0.2);
`;

export const AnnotationBoxItem = styled.div`
  cursor: pointer;
  white-space: nowrap;
  text-overflow: ellipsis;
  max-width: 200px;
  overflow: hidden;
`;
