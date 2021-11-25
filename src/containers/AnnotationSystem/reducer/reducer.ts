import {
  AnnotationSystemEventsEnum,
  AnnotationSystemProps,
} from "../AnnotationSystem.types";
import { REDUCER_INIT } from "./constants";
import { ReducerActions, ReducerActionTypes } from "./types";

export default function reducer(
  state = REDUCER_INIT,
  action: ReducerActionTypes
): AnnotationSystemProps {
  switch (action.type) {
    case ReducerActions.SET_H:
      return {
        ...state,
        h: action.payload,
      };
    case ReducerActions.SET_W:
      return {
        ...state,
        w: action.payload,
      };
    case ReducerActions.SET_X:
      return {
        ...state,
        x: action.payload,
      };
    case ReducerActions.SET_Y:
      return {
        ...state,
        y: action.payload,
      };
    case ReducerActions.ADD_ANNOTATION_BOX: {
      const newAnnotationBoxesArray = [
        action.payload,
        ...state.annotationBoxes,
      ];
      return {
        ...state,
        annotationBoxes: newAnnotationBoxesArray,
      };
    }
    case ReducerActions.MODIFY_ANNOTATION_BOX: {
      const annotationBoxIndex = state.annotationBoxes.findIndex(
        ({ id }) => id === action.payload.id
      );

      if (annotationBoxIndex < 0) {
        console.error(
          "Reduser action: ADD_ANNOTATION_BOX\n" +
            "Cant find annotation box with id: \n" +
            action.payload.id
        );
      }

      state.annotationBoxes[annotationBoxIndex] = {
        ...state.annotationBoxes[annotationBoxIndex],
        ...action.payload,
      };

      console.info(
        `Modify annotation box with ID ${action.payload.id}\n` +
          `With new data: ${action.payload}\n`
      );

      const newAnnotationBoxesArray = [...state.annotationBoxes];
      return {
        ...state,
        annotationBoxes: newAnnotationBoxesArray,
      };
    }
    case ReducerActions.DELETE_ANNOTATION_BOX: {
      const newAnnotationBoxesArray = state.annotationBoxes.filter(
        ({ id }) => id !== action.payload
      );
      return {
        ...state,
        annotationBoxes: newAnnotationBoxesArray,
      };
    }
    case ReducerActions.SET_ZOOM_LEVEL:
      return {
        ...state,
        curZoomLevel: action.payload,
      };
    case ReducerActions.ZOOM_IN:
      // TODO: Add limits max zoom in
      return {
        ...state,
        curZoomLevel: state.curZoomLevel + state.zoomStep,
      };
    case ReducerActions.ZOOM_OUT:
      // TODO: Add limits min zoom out
      return {
        ...state,
        curZoomLevel: state.curZoomLevel - state.zoomStep,
      };
    case ReducerActions.SET_CUR_EVENT: {
      switch (action.payload) {
        case null:
        case AnnotationSystemEventsEnum.CREATE_MODE: {
          return {
            ...state,
            curEvent: action.payload,
            curSelBoxId: null,
          };
        }
        default: {
          return {
            ...state,
            curEvent: action.payload,
          };
        }
      }
    }
    case ReducerActions.SET_INIT_SIZE: {
      return {
        ...state,
        initW: action.payload.w,
        initH: action.payload.h,
        w: action.payload.w,
        h: action.payload.h,
        isInitMediaLoading: false,
      };
    }
    case ReducerActions.SET_CUR_SEL_BOX_ID:
      return {
        ...state,
        curSelBoxId: action.payload,
        curEvent: action.payload
          ? AnnotationSystemEventsEnum.BOX_SELECTED_MODE
          : null,
      };
    case ReducerActions.SET_SVG_LAYER_REF:
      return {
        ...state,
        svgLayerRef: action.payload,
      };
    case ReducerActions.SET_MEDIA_REF:
      return {
        ...state,
        mediaRef: action.payload,
      };
    case ReducerActions.SET_VIEWPORT_SIZE: {
      return {
        ...state,
        viewportH: action.payload?.h ?? state.viewportH,
        viewportW: action.payload?.w ?? state.viewportW,
      };
    }
    case ReducerActions.SET_CUR_VIDEO_TIME: {
      return {
        ...state,
        curTime: action.payload,
      };
    }
    case ReducerActions.SET_CUR_VIDEO_STATUS: {
      return {
        ...state,
        curVideoStatus: action.payload,
      };
    }
    case ReducerActions.SET_CURSOR_INIT_POS: {
      return {
        ...state,
        cursorInitX: action.payload.x,
        cursorInitY: action.payload.y,
      };
    }
    default: {
      return state;
    }
  }
}
