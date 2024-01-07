import { RootRoute, Route } from "@tanstack/react-router";
import { Root } from "./routes/Root";
import { Start } from "./components/Start/Start";
import { NewNote } from "./components/NewNote/NewNote";
import { Main } from "./components/Main/Main";

export const rootRoute = new RootRoute({
    component: Root,
});
  
export const indexRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/",
    component: Start,
});

export const newNoteRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/note",
    component: NewNote,
});

export const noteRoute = new Route({
    getParentRoute: () => rootRoute,
    path: "/note/$noteId",
    component: Main,
});