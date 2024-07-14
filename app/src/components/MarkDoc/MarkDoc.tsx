import Markdoc from "@markdoc/markdoc";
import React, { FC } from "react";
import styles from "./MarkDoc.module.css";
import { useApiReadNote } from "../../data";

export const MarkDoc: FC = () => {
  const { data: note, isLoading, isSuccess } = useApiReadNote();
  
  if (isLoading) return null;

  if (isSuccess) {
    const ast = Markdoc.parse(note.content);
    const markdown = Markdoc.transform(ast);
  
    return (
      <article className={styles.article}>{Markdoc.renderers.react(markdown, React)}</article>
    );
  }

  return null;
}
