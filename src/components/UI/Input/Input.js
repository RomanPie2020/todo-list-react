import React from 'react';
import css from './Input.module.css'

const Input = ({ onKeyDown, onChange, text, placeholder }) => {
  const changeHandler = (e) => {
    onChange(e.target.value)
  }

  const enterAdd = (e) => {
    onKeyDown(e.keyCode)
  }

  return (
    <input
      className={`browser-default ${css.input}`}
      type="text"
      placeholder={placeholder}
      value={text}
      onKeyDown={enterAdd}
      onChange={changeHandler}
    />
  );
};

export default Input;

