import React from 'react';
import css from './MySelect.module.css'

const MySelect = ({ options, onChange, value, defaultValue }) => {
  return (
      <select
        className={css.select}
        onChange={event => onChange(event.target.value)}
        value={value}
      >
        <option value="" disabled>{defaultValue}</option>
        {options.map(option =>
          <option key={option.value} value={option.value}>
            {option.name}
          </option>
        )}
      </select>
  );
};

export default MySelect;
