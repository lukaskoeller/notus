import { useContext } from "react";
import { EditorContext } from "./editor";

export const useEditor = () => useContext(EditorContext);