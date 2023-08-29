import { Component } from 'react';
import PropTypes from 'prop-types';
import { ImgGallery } from './ImageGallery.styled';
import { ImageGalleryItem } from '../ImageGalleryItem/ImageGalleryItem';

import { fetchImages } from '../../FetchApi/FetchApi';
import { Button } from '../Button/Button';
import { Loader } from '../Loader/Loader';
import { ImageModal } from '../ImageModal/ImageModal';

export class ImageGallery extends Component {
  componentDidUpdate(prevProps, prevState, snapshot) {
    if (
      (prevProps.query !== this.props.query && this.props.query) ||
      prevState.page !== this.state.page
    ) {
      this.getSearchedImages();
    }
    if (prevState.images !== this.state.images && this.state.page !== 1) {
      window.scrollTo({
        top: snapshot,
        behavior: 'smooth',
      });
    }
  }

  render() {
    return (
      <>
        <ImgGallery className="gallery">
          {images.map(image => (
            <ImageGalleryItem
              key={image.id}
              image={image}
              openModal={this.openModal}
            />
          ))}
        </ImgGallery>
        {isLoading && <Loader />}
        {loadMore && <Button onClick={this.changePage} />}
        {isModalOpen && (
          <ImageModal image={dataModal} onClose={this.openModal} />
        )}
      </>
    );
  }
}

ImageGallery.propTypes = {
  query: PropTypes.string.isRequired,
};
