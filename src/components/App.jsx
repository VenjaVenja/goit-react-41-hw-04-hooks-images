import { useState, useEffect } from "react";
// import { ToastContainer } from "react-toastify";
import { Searchbar } from "./Searchbar/Searchbar";
import { Modal } from "./Modal/Modal";
import { LoaderBars } from "./Loader/Loader";
import { ImageGallery } from "./ImageGallery/ImageGallery";
import { fetchAPI } from "services/api";
import { Button } from "./Button/Button";
import { HelloText } from "./HelloText/HelloText";
// import scrollSmooth from "../services/scrollSmooth"

export const App = () => {

  const [searchImg, setSearchImg] = useState('');
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [modalLargeImg, setModalLargeImg] = useState(null);

  useEffect(() => {
    if (searchImg === '') {
      return;
    }

    const fetchImages = () => {
      fetchAPI(searchImg, page)
        .then(response => {
          setImages(prevImages => [...prevImages, ...response]);
        })
        .catch(error => {
          setError(error);
          console.log(error);
        })
        .finally(() => setIsLoading(false));
    };

    if (page === 1) {
      setImages([]);
      setIsLoading(true);
      fetchImages();
    }
    else {
      setIsLoading(true);
      fetchImages();
    }
  }, [searchImg, page, error]);
  
  const onSearchImg = searchImg => {
    setSearchImg(searchImg);
    setPage(1);
  };

  const onNextPageSearch = () => {
    setPage(prevPage => prevPage + 1)
  };

  const openModalLargeImg = image => {
    setModalLargeImg(image);
  };

  const toggleModal = () => {
    setShowModal(!showModal);
  };
  

  return (
      <>
        <Searchbar onSubmit={onSearchImg} />

        {images.length === 0 && !isLoading && <HelloText text="Hai! What`s you looking for?" />}

        {images.length > 0 && <ImageGallery images={images} toggleModal={toggleModal} openModalLargeImg={openModalLargeImg} />}

        {isLoading && <LoaderBars />}

        {images.length > 0 && <Button onClick={onNextPageSearch} />}

        {showModal && (<Modal
          onClose={toggleModal}
          largeImage={modalLargeImg}
        />)}
      </>
    );
};