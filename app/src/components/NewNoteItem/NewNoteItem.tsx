import { FC } from "react";
import { Link } from "@tanstack/react-router";

export const NewNoteItem: FC = () => {
  return (
    <Link to="/note" className={"btn"}>
      Add Note
    </Link>
  );
};
