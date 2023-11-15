import Markdoc, { RenderableTreeNode, Tag } from "@markdoc/markdoc";
import { Dispatch, FC, SetStateAction, createContext, useEffect, useState } from "react";

export type ViewMode = 'preview' | 'write';

type API = {
  setMode: Dispatch<SetStateAction<ViewMode>>;
  setText: Dispatch<SetStateAction<string>>;
}

type State = {
  mode: ViewMode;
  text: string;
  treeNode: RenderableTreeNode;
  title: string;
};

type Context = API & State;

export const EditorContext = createContext<Context>({} as Context);

export const EditorProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ViewMode>('preview');
  const [text, setText] = useState<string>('');
  const [title, setTitle] = useState<string>('');
  const [treeNode, setTreeNode] = useState<RenderableTreeNode>('');

  useEffect(() => {
    const ast = Markdoc.parse(text);
    const content = Markdoc.transform(ast);
    if (content instanceof Tag) {
      const firstTag = content?.children?.[0];
      if (firstTag instanceof Tag && firstTag?.name === 'h1' && typeof firstTag?.children[0] === 'string') {
        setTitle(firstTag?.children[0])
      }
    }
    setTreeNode(content);
    console.log({ title });
    
  }, [text]);

  return (
    <EditorContext.Provider value={{ mode, text, setMode, setText, treeNode, title }}>
      {children}
    </EditorContext.Provider>
  )
};