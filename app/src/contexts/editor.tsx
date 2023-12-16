import { Dispatch, FC, SetStateAction, createContext, useState } from "react";

export type ViewMode = 'preview' | 'write';

type API = {
  setMode: Dispatch<SetStateAction<ViewMode>>;
}

type State = {
  mode: ViewMode;
};

type Context = API & State;

export const EditorContext = createContext<Context>({} as Context);

export const EditorProvider: FC<{ children: React.ReactNode }> = ({ children }) => {
  const [mode, setMode] = useState<ViewMode>('preview');

  return (
    <EditorContext.Provider value={{ mode, setMode }}>
      {children}
    </EditorContext.Provider>
  )
};