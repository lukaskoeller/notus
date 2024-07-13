import { createRootRoute, createRoute } from "@tanstack/react-router";
import { Root } from "./routes/Root";
import { Start } from "./components/Start/Start";
import { NewNote } from "./components/NewNote/NewNote";
import { Main } from "./components/Main/Main";

export const rootRoute = createRootRoute({
  component: Root,
});

export const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: Start,
});

export const newNoteRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/note",
  component: NewNote,
});

export type TNoteSearch = {
  mode: "view" | "edit";
};

export const noteRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/note/$noteId",
  validateSearch: (search: Record<string, unknown>): TNoteSearch => {
    return {
      mode: search.mode === "edit" ? "edit" : "view",
    };
  },
  component: Main,
});
