import React from 'react';
import PropTypes from 'prop-types';
import './SearchInput.css'; // Add custom styles for the component

const SearchInput = ({
                         style = {},
                         className = '',
                         onChange,
                         onDelete,
                         value
}) => {
    return (
        <div className={`search-input-container ${className || ''}`} style={style}>
            {/* Search Icon */}
            <span className="search-icon">🔍</span>

            {/* Text Input */}
            <input
                type="text"
                className="search-input"
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
                placeholder="Search..."
            />

            {/* Clear Icon */}
            {value && (
                <button
                    className="clear-icon"
                    onClick={onDelete}
                    aria-label="Clear search"
                >
                    ✖
                </button>
            )}
        </div>
    );
};

SearchInput.propTypes = {
    style: PropTypes.object, // Inline styles for the container
    className: PropTypes.string, // Additional class names for styling
    onChange: PropTypes.func.isRequired, // Function to handle input changes
    onDelete: PropTypes.func.isRequired, // Function to handle clearing the input
    value: PropTypes.string.isRequired, // Current value of the input
};


export default SearchInput;

