import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { DefaultService, Note } from "../api";

export const useNotes = () => useQuery({ queryKey: ['notes'], queryFn: async () => await DefaultService.getNotesNotesGet() });

export const useNote = (title: Note["title"] | undefined) => {
  if (!title) {
    throw new Error('Could not find note', { cause: `'title' (${title}) is not defined but must be to query the note.` });
  }
  return useQuery({ queryKey: ['note', title], queryFn: async () => await DefaultService.getNoteNoteTitleGet(title) });
}

export const useUpdateNote = (note: Note) => {
  const queryClient = useQueryClient();

  return useMutation({
  mutationFn: () => {
    return DefaultService.updateNoteNoteIdPut(note)
  },
  onSettled: () => queryClient.invalidateQueries({ queryKey: ['notes', `note${note.id}`] }),
});
};