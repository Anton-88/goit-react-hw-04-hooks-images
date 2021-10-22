import styles from "./ImageGallery.module.css";
import ImageGalleryItem from "../ImageGalleryItem/ImageGalleryItem";
import Modal from "../Modal/Modal";
import Button from "../Button/Button";
import ApiService from "../../apiService/apiService";
import Loader from "react-loader-spinner";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import { useEffect, useState } from "react";

//ApiService
const URL = "https://pixabay.com/api/";
const key = "23099756-b59a1c1cdbe94bc1dac04ed03";
const ApiServiceObj = new ApiService(URL, key);

export default function ImageGallery({ searchValue }) {
  const [fetchedImgs, setFetchedImgs] = useState([]);
  const [status, setStatus] = useState("init");
  const [modalImgId, setModalImgId] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [loadMoreParam, setLoadMoreParam] = useState(false);

  const doLoadMore = (pageNum, perPageVal, totalPics) => {
    pageNum * perPageVal < totalPics
      ? setLoadMoreParam(true)
      : setLoadMoreParam(false);
  };

  useEffect(() => {
    if (!searchValue.trim()) return;
    setStatus("pending");
    ApiServiceObj.resetPage();
    ApiServiceObj.searchQuery = searchValue;
    console.log(`searchValue in useEffect`, searchValue);
    ApiServiceObj.fetchImages()
      .then((res) => {
        doLoadMore(ApiServiceObj._page, ApiServiceObj._perPage, res.total);
        setFetchedImgs(res.hits);
        setStatus("success");
      })
      .catch((err) => {
        console.log(err);
        setStatus("error");
      });
  }, [searchValue]);

  const handleClick = () => {
    ApiServiceObj.searchQuery = searchValue;
    console.log(`page in loadMore before`, ApiServiceObj._page);
    ApiServiceObj.incPageNumber();
    console.log(`searchValue in loadMore`, ApiServiceObj._searchValue);
    console.log(`page in loadMore after`, ApiServiceObj._page);
    ApiServiceObj.fetchImages()
      .then((searchResults) => {
        doLoadMore(
          ApiServiceObj._page,
          ApiServiceObj._perPage,
          searchResults.total
        );
        console.log(`searchResults.hits`, searchResults.hits);
        setFetchedImgs((prev) => [...prev, ...searchResults.hits]);
        setStatus("success");
      })
      .then(() => {
        window.scrollTo({
          top: document.documentElement.scrollHeight,
          behavior: "smooth",
        });
      })
      .catch((err) => {
        console.log(err);
        setStatus("error");
      });
  };

  //Modal handling
  const modalImg = () => {
    const modalImg = fetchedImgs.find((fetchedImgs) => {
      return fetchedImgs.id === modalImgId;
    });
    console.log(`modalImg`, modalImg.largeImageURL);
    return modalImg.largeImageURL;
  };

  const openModal = (e) => {
    setIsModalOpen(true);
    setModalImgId(Number(e.currentTarget.id));
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  // return (
  if (status === "init") {
    return <h2>Awaiting for your query...</h2>;
  }
  if (status === "pending") {
    return (
      <div>
        <Loader
          type="BallTriangle"
          color="yellowgreen"
          height={200}
          width={200}
          timeout={3000}
        />
      </div>
    );
  }
  if (status === "success") {
    return (
      <>
        <ul className={styles.image_gallery}>
          <ImageGalleryItem drawData={fetchedImgs} openModal={openModal} />
        </ul>
        {loadMoreParam ? <Button onClick={handleClick} /> : ""}
        {isModalOpen && (
          <Modal modalImgId={modalImgId} onClose={closeModal}>
            <img src={modalImg()} alt="some pic" />
          </Modal>
        )}
      </>
    );
  }
  // )
}
