import { FC } from "react";
import { MarkDoc } from "../MarkDoc/MarkDoc";
import { useEditor } from "../../hooks/useEditor";
import { NoteTextArea } from "../NoteTextArea/NoteTextArea";

export const Note: FC = () => {
  const { mode } = useEditor();
  
  return (
    mode === 'preview'
      ? <MarkDoc />
      : <NoteTextArea />
  );
};
