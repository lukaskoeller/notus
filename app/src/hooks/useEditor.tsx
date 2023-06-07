import { useContext } from "react";
import { EditorContext } from "../contexts/editor";

export const useEditor = () => useContext(EditorContext);