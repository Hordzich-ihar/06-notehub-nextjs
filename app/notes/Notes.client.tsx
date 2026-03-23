"use client";

import { useState, type ChangeEvent } from "react";
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { useDebouncedCallback } from "use-debounce";
import { Toaster } from "react-hot-toast";
import { fetchNotes, type FetchNotesResponse } from "../../lib/api";
import NoteList from "../../components/NoteList/NoteList";
import Pagination from "../../components/Pagination/Pagination";
import Modal from "../../components/Modal/Modal";
import SearchBox from "../../components/SearchBox/SearchBox";
import Loader from "../../components/Loader/Loader";
import ErrorMessage from "../../components/ErrorMessage/ErrorMessage";
import NoteForm from "../../components/NoteForm/NoteForm";
import css from "../App.module.css";

export default function NotesClient() {
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false);
  const [query, setQuery] = useState<string>("");

  const { data, isLoading, isFetched } = useQuery<FetchNotesResponse>({
    queryKey: ["notes", currentPage, query],
    queryFn: () => fetchNotes(query, currentPage),
    placeholderData: keepPreviousData,
  });

  const handleQueryChange = useDebouncedCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      setQuery(event.target.value);
      setCurrentPage(1);
    },
    500,
  );

  const onClose = () => {
    setModalIsOpen(false);
  };

  const openModal = () => {
    setModalIsOpen(true);
  };

  const totalPages = data?.totalPages ?? 1;
  const notes = data?.notes ?? [];
  const hasNotes = notes.length > 0;
  const showEmptyState = isFetched && notes.length === 0;

  return (
    <div className={css.app}>
      <Toaster position="top-right" />
      <header className={css.toolbar}>
        <SearchBox handleSearch={handleQueryChange} />
        {totalPages > 1 && (
          <Pagination
            totalPages={totalPages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
        <button className={css.button} onClick={openModal}>
          Create note +
        </button>
      </header>
      {modalIsOpen && (
        <Modal onClose={onClose}>
          <NoteForm onClose={onClose} />
        </Modal>
      )}
      {isLoading && <Loader />}
      {showEmptyState && <ErrorMessage />}
      {hasNotes && <NoteList notes={notes} />}
    </div>
  );
}
