import styles from "./ImageGalleryItem.module.css";

export default function ImageGalleryItem({ drawData, openModal }) {
  return (
    <>
      {drawData.map(({ id, webformatURL }) => {
        return (
          <li
            key={id}
            id={id}
            onClick={openModal}
            className={styles.image_gallery__item}
          >
            <img
              src={webformatURL}
              alt="some pic"
              className={styles.image_gallery_image}
            />
          </li>
        );
      })}
    </>
  );
}
