import React, {useState} from 'react';
import css from './AddPost.module.css'
import Input from "../UI/Input/Input";
import Button from "../UI/Button/Button";

const AddPost = ({ onKeyDown, onChange, onClick, text }) => {
  const [btnText, setBtnText] = useState('Add post');

  return (
    <div
      className={css.container}
    >
      <Input
        onKeyDown={onKeyDown}
        onChange={onChange}
        text={text}
        placeholder='Enter post'
      />
      <Button
        onClick={onClick}
        btnText={btnText}
      >

      </Button>
    </div>
  );
};

export default AddPost;
