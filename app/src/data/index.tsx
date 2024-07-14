import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DefaultService, Note } from "../api";
import { useNavigate } from "@tanstack/react-router";
import { noteRoute } from "../router";

export const useApiReadNotes = () =>
  useQuery({
    queryKey: ["notes"],
    queryFn: async () => await DefaultService.getNotesNotesGet(),
  });

export const useApiReadNote = () => {
  const { noteId } = noteRoute.useParams();
  if (!noteId) {
    throw new Error(`Could not find note "${noteId}"`, {
      cause: `'id' (${noteId}) is not defined but must be to query the note.`,
    });
  }

  return useQuery({
    queryKey: ["notes", "note", noteId],
    queryFn: () => DefaultService.getNoteNoteIdGet({ id: Number(noteId) }),
  });
};

export const useApiCreateNote = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate({ from: "/note" });

  return useMutation({
    mutationFn: (title: Note["title"]) => {
      return DefaultService.createNoteNotePost({
        requestBody: {
          title,
          content: `# ${title}`,
        },
      });
    },
    onMutate: async (newNote: Note["title"]) => {
      await queryClient.cancelQueries({ queryKey: ["notes"] });
      const previousNotes = queryClient.getQueryData(["notes"]);
      queryClient.setQueryData(["notes"], (oldNotes: Note[]) => [
        ...oldNotes,
        newNote,
      ]);
      return { previousNotes };
    },
    onSettled: async (note) => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      await navigate({ to: `/note/${note.id}`, search: { mode: "edit" } });
    },
  });
};

export type TUseApiUpdateNoteArgs = Parameters<
  typeof DefaultService.updateNoteNoteIdPatch
>[0];

export const useApiUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: TUseApiUpdateNoteArgs) => {
      return DefaultService.updateNoteNoteIdPatch(args);
    },
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["notes"] }),
  });
};
