import Markdoc from "@markdoc/markdoc";
import React, { FC } from "react";
import styles from "./MarkDoc.module.css";
import { useNote } from "../../data";
import { useParams } from "react-router-dom";

export const MarkDoc: FC = () => {
  const { noteId } = useParams<{ noteId: string }>();
  const { data: note, isLoading, isSuccess } = useNote(Number(noteId));
  
  if (isLoading) return (
    <h2>Loading…</h2>
  )

  if (isSuccess) {
    const ast = Markdoc.parse(note.content);
    const markdown = Markdoc.transform(ast);
  
    return (
      <article className={styles.article}>{Markdoc.renderers.react(markdown, React)}</article>
    );
  }

  return null;
}
