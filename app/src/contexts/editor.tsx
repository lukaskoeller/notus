import Markdoc, { RenderableTreeNode, Tag } from "@markdoc/markdoc";
import { Dispatch, FC, SetStateAction, createContext, useEffect, useState } from "react";
import { useNotes } from "../data";

export type ViewMode = 'preview' | 'write';

type API = {
  setMode: Dispatch<SetStateAction<ViewMode>>;
  setText: Dispatch<SetStateAction<string>>;
  setActive: Dispatch<SetStateAction<number | undefined>>;
}

type State = {
  mode: ViewMode;
  text: string;
  treeNode: RenderableTreeNode;
  title: string;
  activeId: number | undefined;
};

type Context = API & State;

export const EditorContext = createContext<Context>({} as Context);

export const EditorProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ViewMode>('preview');
  const [text, setText] = useState<string>('');
  const [activeId, setActive] = useState<number | undefined>();
  const [title, setTitle] = useState<string>('');
  const [treeNode, setTreeNode] = useState<RenderableTreeNode>('');
  const { data: notes } = useNotes();
  

  useEffect(() => {
    const activeNote = (notes ?? []).find((note) => note.id === activeId);
    
    if (activeNote?.content) {
      setText(activeNote?.content)
    }
  }, [activeId, notes]);

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
    
  }, [text, title]);

  return (
    <EditorContext.Provider value={{ mode, text, setMode, setText, activeId, setActive, treeNode, title }}>
      {children}
    </EditorContext.Provider>
  )
};