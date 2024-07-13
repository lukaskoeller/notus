import { FC } from "react";
import { MarkDoc } from "../MarkDoc/MarkDoc";
import { NoteTextArea } from "../NoteTextArea/NoteTextArea";
import { useSearch } from "@tanstack/react-router";

export const Editor: FC = () => {
  const { mode } = useSearch({ from: "/note/$noteId" })
  
  return (
    mode === 'view'
      ? <MarkDoc />
      : <NoteTextArea />
  );
};
