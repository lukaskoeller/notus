import { useCallback } from "react";
import { useApiUpdateNote } from "../data";
import { Note } from "../api";

export const useUpdateNote = () => {
  const mutation = useApiUpdateNote();
  const { mutateAsync: mutateNote } = mutation;

  const updateNote = useCallback(
    (text: string, id: Note["id"]) => {
      const title = text.split("\n")?.[0]?.slice(2) ?? "";

      if (id && text) {
        return mutateNote({
          requestBody: {
            content: text,
            title: title,
          },
          id: Number(id),
        });
      }
    },
    [mutateNote]
  );

  return { updateNote, mutation };
};
