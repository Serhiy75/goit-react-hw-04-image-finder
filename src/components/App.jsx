import { useState, useEffect } from 'react';
import { AppDiv } from './App.styled';
import { ImageGallery } from './ImageGallery/ImageGallery';
import { Searchbar } from './Searchbar/Searchbar';
import { Loader } from './Loader/Loader';
import { Button } from './Button/Button';
import { ImageModal } from './ImageModal/ImageModal';
import { fetchImages } from 'FetchApi/FetchApi';
import Notiflix from 'notiflix';

export const App = () => {
  const [images, setImages] = useState([]);
  const [query, setQuery] = useState('');
  const [page, setPage] = useState(1);
  const [loadMore, setLoadMore] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataModal, setDataModal] = useState({
    image: '',
    alt: '',
  });

  useEffect(() => {
    if (!query) return;
    const getSearchedImages = async () => {
      setIsLoading(true);
      try {
        const data = await fetchImages(query, page);
        setImages(prevImages => [...prevImages, ...data.hits]);
        setLoadMore(page * 12 < data.totalHits);
      } catch (error) {
        Notiflix.Notify.failure(
          'Failed to fetch images. Please try again later.'
        );
      } finally {
        setIsLoading(false);
      }
    };
    getSearchedImages();
  }, [query, page]);

  const openModal = (image, alt) => {
    setIsModalOpen(prevIsModalOpen => !prevIsModalOpen);
    setDataModal({ image, alt });
  };
  const changePage = () => {
    setPage(prevPage => prevPage + 1);
  };
  const handleSubmit = query => {
    setQuery(query);
    setImages([]);
    setPage(1);
  };

  return (
    <AppDiv>
      <Searchbar setQuery={handleSubmit} />
      <ImageGallery images={images} openModal={openModal} />
      {isLoading && <Loader />}
      {loadMore && <Button onClick={changePage} />}
      {isModalOpen && <ImageModal image={dataModal} onClose={openModal} />}
    </AppDiv>
  );
};
