import { useQuery } from "@tanstack/react-query";
import { DefaultService } from "../api";

export const useNotes = () => useQuery({ queryKey: ['notes'], queryFn: async () => await DefaultService.getNotesNotesGet() });