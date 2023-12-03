import { FC } from "react";
import { MarkDoc } from "../MarkDoc/MarkDoc";
import { useEditor } from "../../hooks/useEditor";
import { NoteTextArea } from "../NoteTextArea/NoteTextArea";
import { Note } from "../../api";

export type EditorProps = Partial<Pick<Note, 'content'>>;

export const Editor: FC<EditorProps> = ({ content = '' }) => {
  const { mode } = useEditor();
  
  return (
    mode === 'preview'
      ? <MarkDoc content={content} />
      : <NoteTextArea content={content} />
  );
};
