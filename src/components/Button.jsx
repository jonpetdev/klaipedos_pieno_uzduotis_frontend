import React from 'react';
import PropTypes from 'prop-types';
import "./Button.css";

const Button = ({
                    onClick,
                    styles = {},
                    className = '',
                    children,
                    disabled = false
}) => {
    return (
        <button
            onClick={!disabled ? onClick : undefined}
            style={styles}
            className={`custom-button ${className || ''} ${disabled ? 'disabled' : ''}`}
            disabled={disabled}
        >
            {children}
        </button>
    );
};

Button.propTypes = {
    onClick: PropTypes.func.isRequired, // Function to handle click events
    styles: PropTypes.object, // Inline styles for the button
    className: PropTypes.string, // Additional class names for styling
    children: PropTypes.node.isRequired, // Content inside the button (e.g., text or icons)
    disabled: PropTypes.bool, // Disable the button when true
};

export default Button;
