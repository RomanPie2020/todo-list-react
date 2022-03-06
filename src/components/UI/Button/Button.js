import React from 'react';

const Button = ({ onClick, btnText, post }) => {
  const addPostCall = () => {
    onClick(post)
  }

  return (
      <button
        className="waves-effect waves-teal btn"
        onClick={addPostCall}
      >
        {btnText}
      </button>
  );
};

export default Button;

