import styles from "./Button.module.css";

export default function Button({ onClick }) {
  return (
    <button type="button" onClick={onClick} className={styles.button_more}>
      Load more
    </button>
  );
}
