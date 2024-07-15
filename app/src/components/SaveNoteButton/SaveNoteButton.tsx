import { FC } from "react";
import { useUpdateNote } from "../../shared/useUpdateNote";

export const SaveNoteButton: FC = () => {
    const { updateNote } = useUpdateNote();
    return (
        <button type="button" className="btn">Save</button>
    )
}