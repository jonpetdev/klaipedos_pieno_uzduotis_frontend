import React from 'react';
import PropTypes from 'prop-types';
import './SearchInput.css';

const SearchInput = ({
                         style = {},
                         className = '',
                         onChange,
                         onDelete,
                         value
}) => {
    return (
        <div className={`search-input-container ${className || ''}`} style={style}>
            <span className="search-icon">🔍</span>
            <input
                type="text"
                className="search-input"
                value={value}
                onChange={(e) => onChange && onChange(e.target.value)}
                placeholder="Search..."
            />
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
    style: PropTypes.object,
    className: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    onDelete: PropTypes.func.isRequired,
    value: PropTypes.string.isRequired,
};


export default SearchInput;

