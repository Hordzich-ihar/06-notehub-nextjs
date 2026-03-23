import css from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={css.footer}>
      <p>&copy; {new Date().getFullYear()} NoteHub. All rights reserved.</p>
      <div className={css.wrap}>
        <p>Developer: Ihar</p>
        <p>
          Contact us: <a href="mailto:Garik666770@gmail.com">Garik666770@gmail.com</a>
        </p>
      </div>
    </footer>
  );
}
