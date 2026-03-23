import { RotatingLines } from 'react-loader-spinner';
import css from './Loader.module.css';

export default function Loader() {
  return (
    <div className={css.loader} role="status" aria-label="Loading">
      <RotatingLines strokeColor="#0d6efd" width="32" />
    </div>
  );
}
