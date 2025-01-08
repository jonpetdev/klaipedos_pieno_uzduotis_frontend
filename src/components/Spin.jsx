import PropTypes from "prop-types";

const Spin = ({ isLoading, children }) => {
    return (
        <div className="spin-wrapper">
            {isLoading ? (
                <div className="spin-container">
                    <div className="spinner"></div>
                </div>
            ) : (
                children
            )}
        </div>
    );
};

Spin.propTypes = {
    isLoading: PropTypes.bool.isRequired,
    children: PropTypes.node
};

export default Spin;