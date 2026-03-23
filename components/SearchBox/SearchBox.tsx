import { ChangeEvent } from 'react';
import css from './SearchBox.module.css';

interface SearchBoxProps {
  handleSearch: (event: ChangeEvent<HTMLInputElement>) => void;
}

export default function SearchBox({ handleSearch }: SearchBoxProps) {
  return (
    <input
      className={css.input}
      type="text"
      placeholder="Search notes"
      onChange={handleSearch}
    />
  );
}
