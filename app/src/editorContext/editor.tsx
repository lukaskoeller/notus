import { FC, createContext, useMemo, useReducer } from "react";
import { Note } from "../api";
import { useUpdateNote } from "../shared/useUpdateNote";

export type ViewMode = "preview" | "write";

type TApi = {
  setMode: (mode: ViewMode) => void;
  updatePendingNote: (note: Note) => void;
  removePendingNote: (id: Required<Note["id"]>) => void;
};

type TState = {
  mode: ViewMode;
  pendingNotes: Note[];
};

type TActions =
  | {
      type: "save-pending-note";
      payload: {
        updateNote: TUpdateNote;
        removePendingNote: TApi["removePendingNote"];
      };
    }
  | { type: "update-pending-note"; note: Note }
  | { type: "remove-pending-note"; id: Required<Note["id"]> }
  | { type: "set-mode"; mode: ViewMode };

type Context = TApi & TState;

export const EditorContext = createContext<Context>({} as Context);

function reducer(state: TState, action: TActions) {
  switch (action.type) {
    case "save-pending-note": {
      state.pendingNotes.forEach((note) => {
        action.payload.updateNote(note.content, note.id)
          ?.catch(() => {
            // @todo Send error notification
            // action.payload.removePendingNote(note.id);
          })
      });

      return {
        ...state,
      };
    }
    case "update-pending-note":
      if (state.pendingNotes.length === 0) {
        return {
          ...state,
          pendingNotes: [action.note],
        };
      } else {
        return {
          ...state,
          pendingNotes: state.pendingNotes.map((note) =>
            note.id === action.note.id ? action.note : note
          ),
        };
      }
    case "remove-pending-note": {
      return {
        ...state,
        pendingNotes: state.pendingNotes.filter(
          (note) => note.id !== action.id
        ),
      };
    }
    // @todo case "save-pending-note":
    case "set-mode":
      return {
        ...state,
        mode: action.mode,
      };

    default:
      return state;
  }
}

export type TUpdateNote = ReturnType<typeof useUpdateNote>["updateNote"];

export const EditorProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { updateNote } = useUpdateNote();
  const [state, dispatch] = useReducer(reducer, {
    mode: "preview",
    pendingNotes: [],
  });

  const api = useMemo(() => {
    let timer: number;

    const setMode: TApi["setMode"] = (mode) => {
      dispatch({ type: "set-mode", mode });
    };

    const removePendingNote: TApi["removePendingNote"] = (id) => {
      dispatch({ type: "remove-pending-note", id });
    };

    const uploadPendingNotes = () => {
      return setTimeout(() => {
        dispatch({
          type: "save-pending-note",
          payload: { updateNote, removePendingNote },
        });
      }, 4000);
    };

    const updatePendingNote: TApi["updatePendingNote"] = (note) => {
      dispatch({ type: "update-pending-note", note });
      if (timer) clearTimeout(timer);
      timer = uploadPendingNotes();
    };

    return {
      setMode,
      updatePendingNote,
      removePendingNote,
    };
  }, [updateNote]);

  return (
    <EditorContext.Provider value={{ ...state, ...api }}>
      {children}
    </EditorContext.Provider>
  );
};
