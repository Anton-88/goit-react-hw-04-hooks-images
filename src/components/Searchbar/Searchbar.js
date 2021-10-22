import { useState } from "react";
import styles from "./Searchbar.module.css";

export default function SearchBar({ getSearchValueBar }) {
  const [searchValue, setSearchValue] = useState("");
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    getSearchValueBar(searchValue);
    setSearchValue("");
  };

  return (
    <header className={styles.searchbar}>
      <form className={styles.search_form} onSubmit={handleSearchSubmit}>
        <button type="submit" className={styles.search_form__button}>
          <span className={styles.search_form__label}></span>
        </button>

        <input
          className={styles.search_form__input}
          name="searchValue"
          value={searchValue}
          type="text"
          autoComplete="off"
          autoFocus
          onChange={handleSearchChange}
          placeholder="Enter your goal ..."
        />
      </form>
    </header>
  );
}
