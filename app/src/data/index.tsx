import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DefaultService, Note, NoteUpdate } from "../api";

export const useNotes = () => useQuery({ queryKey: ['notes'], queryFn: async () => await DefaultService.getNotesNotesGet() });

export const useNote = (idStr: string | undefined) => {
  const id = Number(idStr);
  if (!id) {
    throw new Error(`Could not find note "${id}"`, { cause: `'id' (${id}) is not defined but must be to query the note.` });
  }

  return useQuery({
    queryKey: ['note', id],
    queryFn: () => DefaultService.getNoteNoteIdGet(id),
  });
}

export const useUpdateNote = () => {
  const queryClient = useQueryClient();

  return useMutation({
  mutationFn: (note: NoteUpdate & Pick<Note, "id">) => {
    return DefaultService.updateNoteNoteIdPatch(Number(note.id), note)
  },
  onMutate: async (newNote: Note) => {
    // Cancel any outgoing refetches
    // (so they don't overwrite our optimistic update)
    await queryClient.cancelQueries({ queryKey: ['notes', 'note', newNote.id] });

    // Snapshot the previous value
    const previousNote = queryClient.getQueryData(['notes', 'note', newNote.id]);

    // Optimistically update to the new value
    queryClient.setQueryData(['notes', 'note', newNote.id], newNote)

    return { previousNote, newNote }
  },
  onError: (_err, newNote, context) => {
    queryClient.setQueryData(['notes', 'note', newNote.id], context?.previousNote)
  },
  onSettled: (note) => queryClient.invalidateQueries({ queryKey: ['notes', 'note', note.id] }),
});
};