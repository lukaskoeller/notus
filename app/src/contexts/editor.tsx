import { Dispatch, FC, SetStateAction, createContext, useState } from "react";

export type ViewMode = 'preview' | 'write';

type API = {
  setMode: Dispatch<SetStateAction<ViewMode>>;
  setText: Dispatch<SetStateAction<string>>;
}

type State = {
  mode: ViewMode;
  text: string;
};

type Context = API & State;

export const EditorContext = createContext<Context>({} as Context);

export const EditorProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ViewMode>('preview');
  const [text, setText] = useState<string>('');

  return (
    <EditorContext.Provider value={{ mode, text, setMode, setText }}>
      {children}
    </EditorContext.Provider>
  )
};