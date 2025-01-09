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
    onClick: PropTypes.func.isRequired,
    styles: PropTypes.object,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    disabled: PropTypes.bool,
};

export default Button;
