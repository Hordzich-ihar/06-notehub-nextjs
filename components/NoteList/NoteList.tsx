import Link from "next/link";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { Note } from "../../types/note";
import { deleteNote } from "../../lib/api";
import { toast } from "react-hot-toast";
import css from "./NoteList.module.css";

interface NoteListProps {
  notes: Note[];
}

export default function NoteList({ notes }: NoteListProps) {
  const queryClient = useQueryClient();

  const deleteMutation = useMutation({
    mutationFn: (noteId: string) => deleteNote(noteId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["notes"] });
      toast.success("Note deleted");
    },
    onError: (err: unknown) => {
      const message = err instanceof Error ? err.message : "Failed to delete note";
      toast.error(message);
    },
  });

  const handleDeleteMutation = (noteId: string) => {
    deleteMutation.mutate(noteId);
  };

  return (
    <ul className={css.list}>
      {notes.map((note) => (
        <li className={css.listItem} key={note.id}>
          <h2 className={css.title}>{note.title}</h2>
          <p className={css.content}>{note.content}</p>
          <div className={css.footer}>
            <span className={css.tag}>{note.tag}</span>
            <div className={css.actions}>
              <Link className={css.link} href={`/notes/${note.id}`}>
                View details
              </Link>
              <button
                className={css.button}
                onClick={() => handleDeleteMutation(note.id || "")}
              >
                Delete
              </button>
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}
