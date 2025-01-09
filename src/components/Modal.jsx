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
                onClick={(e) => e.stopPropagation()}
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
    open: PropTypes.bool.isRequired,
    width: PropTypes.string,
    title: PropTypes.node.isRequired,
    children: PropTypes.node,
    onClose: PropTypes.func.isRequired,
};

export default Modal;

