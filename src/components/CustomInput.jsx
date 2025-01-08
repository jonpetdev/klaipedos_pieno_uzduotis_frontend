import PropTypes from 'prop-types';
import { useState } from 'react';
import "./CustomInput.css";

const CustomInput = ({
                   type,
                   value,
                   onChange,
                   placeholder = '',
                   className = '',
                   style= {},
                   isPasswordHidden = true,
                   title= '',
                   required = false,
                   name = ''
               }) => {
    const [isPasswordVisible, setIsPasswordVisible] = useState(!isPasswordHidden);
    const [isInvalidEmail, setIsInvalidEmail] = useState(false);

    const handleTogglePassword = () => {
        setIsPasswordVisible(!isPasswordVisible);
    };

    const handleChange = (e) => {
        if (type === 'number' && isNaN(e.target.value)) return;
        if (type === 'email') {
            setIsInvalidEmail(false); // Reset invalid email flag while typing
        }
        onChange(e, name);
    };

    const handleBlur = () => {
        if (type === 'email' && value && !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(value)) {
            setIsInvalidEmail(true);
        }
    };

    return (
        <div className={`input-container ${className}`} style={style}>
            {title && (
                <label className="input-title">
                    {required && <span className="required-marker">*</span>}
                    {title}
                </label>
            )}
            <input
                type={type === 'password' && isPasswordVisible ? 'text' : type}
                value={value}
                onChange={handleChange}
                placeholder={placeholder}
                onBlur={handleBlur}
                className={`input-field ${isInvalidEmail ? 'input-error' : ''}`}
                name={name}
            />
            {type === 'password' && (
                <span
                    className="password-toggle-icon"
                    onClick={handleTogglePassword}
                >
          {isPasswordVisible ? '🙈' : '👁️'}
        </span>
            )}
        </div>
    );
};

CustomInput.propTypes = {
    type: PropTypes.oneOf(['text', 'number', 'email', 'password']).isRequired,
    value: PropTypes.string,
    onChange: PropTypes.func.isRequired,
    placeholder: PropTypes.string,
    className: PropTypes.string,
    style: PropTypes.object,
    isPasswordHidden: PropTypes.bool,
    title: PropTypes.string,
    required: PropTypes.bool,
    name: PropTypes.string
};

export default CustomInput;
