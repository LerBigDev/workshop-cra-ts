import { createContext } from "react";
import { AnnotationSystemContext } from "../AnnotationSystem.types";
import { CONTEXT_INIT } from "./constants";

const context = createContext<AnnotationSystemContext>(CONTEXT_INIT);

export default context;
