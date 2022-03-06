import React, {useEffect, useMemo, useRef} from 'react';
import css from './Checkbox.module.css'

const Checkbox = ({ index, post, setCheckedCounter, posts, searchedPosts, searchedAndFilteredPosts }) => {
  const label = useRef();
  const checkbox = useRef();

  const checkForPostsInstalling = useEffect(() => {
    if (post.checked === true) {
      label.current.style.textDecoration = 'line-through'
      checkbox.current.checked = true

    } else {
      label.current.style.textDecoration = 'none'
      checkbox.current.checked = false
    }
  }, [posts, searchedPosts, searchedAndFilteredPosts]);

  const checkBoxHandler = (e) => {
    if (post.checked === true) {
      label.current.style.textDecoration = 'none'
      console.log(checkbox.current.checked)
      // checkbox.current.checked = false
      post.checked = false
      setCheckedCounter(s => s - 1)

    } else {
      label.current.style.textDecoration = 'line-through'
      post.checked = true
      // checkbox.current.checked = true
      setCheckedCounter(s => s + 1)
    }
    console.log(posts)
  }

  return (
    <div className={css.checkbox_container}>
      <input
        style={{
          opacity: 1,
          pointerEvents: 'all' ,
        }}
        className={`browser-default ${css.checkbox}`}
        id={`checkbox${index}`}
        type="checkbox"
        ref={checkbox}
        onClick={checkBoxHandler}
      />
      <label
        htmlFor={`checkbox${index}`}
        className={`browser-default ${css.label}`}
        ref={label}
      >
        {index + 1}. {post.text}
      </label>
    </div>
  );
};

export default Checkbox;
