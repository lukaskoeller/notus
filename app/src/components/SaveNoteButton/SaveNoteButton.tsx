import { FC } from "react";
import { useUpdateNote } from "../../shared/useUpdateNote";

export const SaveNoteButton: FC = () => {
    const { updateNote, mutation } = useUpdateNote();
    const { isPending } = mutation;
    return (
        <button type="button" className="btn" onClick={updateNote}>Save</button>
    )
}