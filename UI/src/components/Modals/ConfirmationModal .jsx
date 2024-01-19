import './ConfirmationModal.css';
import PropTypes from 'prop-types';
import { createPortal } from 'react-dom';

const ConfirmationModal = ({ isOpen, onClose, onConfirm }) => {
  console.log('ConfirmationModal isOpen:', isOpen);
  if (!isOpen) return null;

  return createPortal(
    <div className="modal">
      <div className="modal-content">
        <p>Are you sure you want to delete?</p>
        <button onClick={onConfirm}>Yes</button>
        <button onClick={onClose}>No</button>
      </div>
    </div>,
    document.body  // Specify the DOM element where the modal should be appended
  );
};

ConfirmationModal.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  onConfirm: PropTypes.func.isRequired,
};

export default ConfirmationModal;
