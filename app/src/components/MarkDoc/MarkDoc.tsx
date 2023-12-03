import Markdoc from "@markdoc/markdoc";
import React, { FC } from "react";
import styles from "./MarkDoc.module.css";
import { Note } from "../../api";

export type MarkDocProps = Pick<Note, 'content'>;

export const MarkDoc: FC<MarkDocProps> = ({ content = '' }) => {
  const ast = Markdoc.parse(content);
  const markdown = Markdoc.transform(ast);

  return (
    <article className={styles.article}>{Markdoc.renderers.react(markdown, React)}</article>
  );
};