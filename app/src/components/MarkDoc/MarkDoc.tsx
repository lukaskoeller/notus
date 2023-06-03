import Markdoc from "@markdoc/markdoc";
import React, { FC } from "react";

export type MarkDocProps = {
  /**
   * Markdown as string that will be parsed to DOM.
   */
  markdown: string;
}

export const MarkDoc: FC<MarkDocProps> = (props) => {
  const { markdown } = props;
  const ast = Markdoc.parse(markdown);
  const content = Markdoc.transform(ast);

  return (
    <>{Markdoc.renderers.react(content, React)}</>
  );
};