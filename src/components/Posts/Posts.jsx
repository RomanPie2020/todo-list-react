import React from 'react';
import css from "./Posts.module.css";
import Button from "../UI/Button/Button";
import Checkbox from "../UI/Checkbox/Checkbox";

const Posts = ({
    posts,
    onClick,
    setCheckedCounter,
    searchedPosts,
    searchText,
    filtrationType,
    searchedAndFilteredPosts,
    selectedSort
  }) => {


  const postsRender = (renderingPosts) => {
    console.log(searchedAndFilteredPosts)
    return (
      renderingPosts.map((post, index) =>
        <div className={css.post} key={post.id}>
          <Checkbox
            setCheckedCounter={setCheckedCounter}
            index={index}
            post={post}
            posts={posts}
            searchedPosts={searchedPosts}
            searchedAndFilteredPosts={searchedAndFilteredPosts}
          />
          <Button post={post} btnText={'Delete'} onClick={onClick}/>
        </div>
      )
    )
  }

  function checkTypeOfRendering() {
    if (posts.length === 0) {
      return <h4>Post list is empty!</h4>
    } else {
      if (filtrationType == '' && searchText == '') {
        return postsRender(posts)
      }
      if (filtrationType && searchText) {
        return postsRender(searchedPosts)
      }
      if (filtrationType) {
        return postsRender(searchedAndFilteredPosts)
      }
      // if (searchText && selectedSort) {
      //   return postsRender(posts)
      // }
      if (searchText) {
        return postsRender(searchedPosts)
      }

    }
  }

  return (
    <div className={css.posts}>
      {
        checkTypeOfRendering()
      }
    </div>
  );
};

export default Posts;
