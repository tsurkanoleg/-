import "./index.css";

import React from 'react';

const Field = ({ name, label, type, action, placeholder }) => {
  const handleInput = (e) => {
    action(e.target.name, e.target.value);
  };

  return (
    <div className="field">
      <label htmlFor={name} className="field__label">
        {label}
      </label>
      <input
        onInput={handleInput}
        type={type}
        className="field__input validation"
        name={name}
        placeholder={placeholder}
      />
    </div>
  );
};

export default Field;
