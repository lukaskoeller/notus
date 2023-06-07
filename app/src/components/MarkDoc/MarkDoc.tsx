import Markdoc from "@markdoc/markdoc";
import React, { FC } from "react";
import styles from "./MarkDoc.module.css";
import { useEditor } from "../../hooks/useEditor";

export const MarkDoc: FC = () => {
  const { text } = useEditor();
  const ast = Markdoc.parse(text);
  const content = Markdoc.transform(ast);

  return (
    <article className={styles.article}>{Markdoc.renderers.react(content, React)}</article>
  );
};