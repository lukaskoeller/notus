import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DefaultService, Note, UpdateNote } from "../api";

export const useNotes = () => useQuery({ queryKey: ['notes'], queryFn: async () => await DefaultService.getNotesNotesGet() });

export const useNote = (title: Note["title"] | undefined) => {
  if (!title) {
    throw new Error('Could not find note', { cause: `'title' (${title}) is not defined but must be to query the note.` });
  }

  return useQuery({
    queryKey: ['note', title],
    queryFn: () => DefaultService.getNoteNoteTitleGet(title),
  });
}

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
  mutationFn: (note: UpdateNote & Pick<Note, "title">) => {
    return DefaultService.updateNoteNoteTitlePatch(note.title, note)
  },
  onMutate: async (newNote: Note) => {
    // Cancel any outgoing refetches
    // (so they don't overwrite our optimistic update)
    await queryClient.cancelQueries({ queryKey: ['notes', 'note', newNote.title] });

    // Snapshot the previous value
    const previousNote = queryClient.getQueryData(['note', newNote.title]);

    // Optimistically update to the new value
    queryClient.setQueryData(['note', newNote.title], newNote)

    return { previousNote, newNote }
  },
  onError: (_err, newNote, context) => {
    queryClient.setQueryData(['note', newNote.title], context?.previousNote)
  },
  onSettled: (note) => queryClient.invalidateQueries({ queryKey: ['notes', 'note', note.title] }),
});
};