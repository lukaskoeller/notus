import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DefaultService, Note } from "../api";
import { useNavigate } from "@tanstack/react-router";
import { noteRoute } from "../router";

export const useNotes = () =>
  useQuery({
    queryKey: ["notes"],
    queryFn: async () => await DefaultService.getNotesNotesGet(),
  });

export const useNote = () => {
  const { noteId } = noteRoute.useParams();
  if (!noteId) {
    throw new Error(`Could not find note "${noteId}"`, {
      cause: `'id' (${noteId}) is not defined but must be to query the note.`,
    });
  }

  return useQuery({
    queryKey: ["note", noteId],
    queryFn: () => DefaultService.getNoteNoteIdGet({ id: Number(noteId) }),
  });
};

export const useCreateNote = () => {
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

export type TUseUpdateNoteArgs = Parameters<
  typeof DefaultService.updateNoteNoteIdPatch
>[0];

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (args: TUseUpdateNoteArgs) => {
      return DefaultService.updateNoteNoteIdPatch(args);
    },
    // onMutate: async (args: TUseUpdateNoteArgs) => {
    //   // Cancel any outgoing re-fetches
    //   // (so they don't overwrite our optimistic update)
    //   await queryClient.cancelQueries({
    //     queryKey: ["notes", "note", args.id],
    //   });

    //   // Snapshot the previous value
    //   const previousNote = queryClient.getQueryData([
    //     "notes",
    //     args.id,
    //   ]);

    //   // Optimistically update to the new value
    //   queryClient.setQueryData(["notes", "note", args.id], args);

    //   return { previousNote, args };
    // },
    // onError: (_err, newNote, context) => {
    //   queryClient.setQueryData(
    //     ["notes", "note", newNote.id],
    //     context?.previousNote
    //   );
    // },
    onSuccess: (note) =>
      queryClient.invalidateQueries({ queryKey: ["notes", "note", note.id] }),
  });
};
