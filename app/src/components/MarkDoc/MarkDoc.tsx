import Markdoc from "@markdoc/markdoc";
import React, { FC } from "react";
import styles from "./MarkDoc.module.css";
import { useEditor } from "../../hooks/useEditor";

export const MarkDoc: FC = () => {
  const { treeNode } = useEditor();

  return (
    <article className={styles.article}>{Markdoc.renderers.react(treeNode, React)}</article>
  );
};