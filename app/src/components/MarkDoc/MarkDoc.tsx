import Markdoc from "@markdoc/markdoc";
import React, { FC } from "react";
import styles from "./MarkDoc.module.css";
import { useParams } from "react-router-dom";
import { useNote } from "../../data";

export const MarkDoc: FC = () => {
  const { noteTitle } = useParams<{ noteTitle: string }>();
  const { data: note, isLoading } = useNote(noteTitle);

  if (isLoading) return null;

  const ast = Markdoc.parse(note?.content);
  const markdown = Markdoc.transform(ast);

  return (
    <article className={styles.article}>{Markdoc.renderers.react(markdown, React)}</article>
  );
};