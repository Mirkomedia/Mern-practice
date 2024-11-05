import React from 'react';

const InputField = ({ value, onChange, type, placeholder, name }) => {
  return (
    <input
      className="product-info-input"
      onChange={onChange}
      type={type}
      placeholder={placeholder}
      name={name}
      value={value}
    />
  );
};

export default InputField;
