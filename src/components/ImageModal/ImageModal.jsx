import PropTypes from 'prop-types';
import { Component } from 'react';
import { Modal, Overlay } from './ImageModal.styled';

export class ImageModal extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    if (e.code === 'Escape') this.props.onClose();
  };

  handleBackdropClick = e => {
    if (e.currentTarget === e.target) this.props.onClose();
  };

  render() {
    const { image, alt } = this.props.image;
    return (
      <Overlay className="overlay" onClick={this.handleBackdropClick}>
        <Modal className="modal">
          <img src={image} alt={alt} />
        </Modal>
      </Overlay>
    );
  }
}

ImageModal.propTypes = {
  image: PropTypes.shape({
    image: PropTypes.string.isRequired,
    alt: PropTypes.string.isRequired,
  }).isRequired,
  onClose: PropTypes.func.isRequired,
};
