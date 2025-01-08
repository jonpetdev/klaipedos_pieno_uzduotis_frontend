import React from 'react';
import PropTypes from 'prop-types';
import './Modal.css';

const Modal = ({ open, width, title, children, onClose }) => {
    if (!open) return null;

    return (
        <div className="modal-overlay" >
            <div
                className="modal-container"
                style={{ width: width || '50%' }}
                onClick={(e) => e.stopPropagation()} // Prevent overlay click from closing the modal
            >
                <div className="modal-header">
                    <div className="modal-title">{title}</div>
                    <button className="modal-close" onClick={onClose} aria-label="Close">
                        ✖
                    </button>
                </div>
                <div className="modal-content">{children}</div>
            </div>
        </div>
    );
};

Modal.propTypes = {
    open: PropTypes.bool.isRequired, // Whether the modal is visible or hidden
    width: PropTypes.string, // Width of the modal (e.g., '80%', '400px')
    title: PropTypes.node.isRequired, // Content of the modal header title
    children: PropTypes.node, // Content inside the modal
    onClose: PropTypes.func.isRequired, // Function to handle closing the modal
};

export default Modal;

