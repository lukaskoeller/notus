import { useCallback } from "react";
import { useApiUpdateNote } from "../data";
import { noteRoute } from "../router";

export const useUpdateNote = () => {
    const { noteId } = noteRoute.useParams();
    const { mutate: mutateNote } = useApiUpdateNote();

    const updateNote = useCallback((text: string) => {
        const title = text.split("\n")?.[0]?.slice(2) ?? "";
        if (noteId && text) {
          mutateNote({
            requestBody: {
              content: text,
              title: title,
            },
            id: Number(noteId),
          });
        }
    }, [mutateNote, noteId]);

    return updateNote;
};