import "./App.css";
import { useState } from "react";
import ImageGallery from "./components/ImageGallery/ImageGallery";
import SearchBar from "./components/Searchbar/Searchbar";

export default function App() {
  const [searchValue, setSearchValue] = useState("");

  const getSearchValue = (searchValue) => {
    setSearchValue(searchValue);
  };

  return (
    <>
      <SearchBar getSearchValueBar={getSearchValue} />
      <ImageGallery searchValue={searchValue} />
    </>
  );
}
