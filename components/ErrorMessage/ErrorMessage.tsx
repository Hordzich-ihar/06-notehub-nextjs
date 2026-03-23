import css from './ErrorMessage.module.css';

type ErrorMessageProps = {
  message?: string;
};

export default function ErrorMessage({ message = 'No notes found.' }: ErrorMessageProps) {
  return (
    <div className={css.wrapper} role="alert">
      {message}
    </div>
  );
}
