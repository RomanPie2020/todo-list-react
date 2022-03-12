import React from "react";
import AddPost from "./components/AddPost/AddPost";
import Posts from "./components/Posts/Posts";
import css from './App.module.css'
import MySelect from "./components/UI/MySelect/MySelect";
import Input from "./components/UI/Input/Input";
import {useDispatch, useSelector} from "react-redux";
import {
  addPostInputChangeAction,
  setCheckedCounterAction,
  setFiltrationTypeAction,
  setPostsAction,
  setSearchedAndFilteredPostsAction,
  setSearchedPostsAction,
  setSearchTextAction,
  setSelectedSortAction
} from "./store";

const App = () => {
  const dispatch = useDispatch()
  const text = useSelector(state => state.text)
  const posts = useSelector(state => state.posts)
  const checkedCounter = useSelector(state => state.checkedCounter)
  const selectedSort = useSelector(state => state.selectedSort)
  const searchText = useSelector(state => state.searchText)
  const searchedPosts = useSelector(state => state.searchedPosts)
  const filtrationType = useSelector(state => state.filtrationType)
  const filterOptions = useSelector(state => state.filterOptions)
  const searchedAndFilteredPosts = useSelector(state => state.searchedAndFilteredPosts)
  console.log(text)

  const addPostInputHandler = val => {
    dispatch(addPostInputChangeAction(val))
  }

  const addPost = () => {
    if (text == '') {
      return
    }
    if (text.length > 50) {
      alert('max string length is 50')
      return
    }
    const newPost = {
      id: Date.now(),
      text,
      checked: false
    }
    dispatch(setPostsAction([...posts, newPost]))
    if (searchText == newPost.text) {
      dispatch(setSearchedPostsAction([...searchedPosts, newPost]))
    }
    if (searchedAndFilteredPosts) {
      dispatch(setSearchedAndFilteredPostsAction([...searchedAndFilteredPosts, newPost]))
    }
    dispatch(addPostInputChangeAction(''))
    console.log(searchedAndFilteredPosts)
  }

  const setCheckedCounter = (val) => {
      dispatch(setCheckedCounterAction(val))
  }

  const enterKeyAdd = (key) => {
    if (key == 13) {
      addPost()
    }
  }

  const deletePost = (post) => {
    if (post.checked === true) {
      setCheckedCounter(-1)
    }
    dispatch(setPostsAction(posts.filter(p => p.id !== post.id)))
    if (searchedAndFilteredPosts) {
      dispatch(
        setSearchedAndFilteredPostsAction(searchedAndFilteredPosts.filter(p => p.id !== post.id))
      )
    }
    if (searchedPosts) {
      dispatch(setSearchedPostsAction(searchedPosts.filter(p => p.id !== post.id)))
    }
  }

  const dateSorting = (sort) => {
    if (searchedAndFilteredPosts) {
      return [...searchedAndFilteredPosts].sort((a, b) => a[sort] - b[sort])
    }
    if (searchedPosts) {
      console.log(1)
      return [...searchedPosts].sort((a, b) => a[sort] - b[sort])
    }
    return [...posts].sort((a, b) => a[sort] - b[sort])
  }

  const nameSorting = (sort) => {
    if (searchedAndFilteredPosts) {
      return [...searchedAndFilteredPosts].sort((a, b) => a[sort].localeCompare(b[sort]))
    }
    if (searchedPosts) {
      return [...searchedPosts].sort((a, b) => a[sort].localeCompare(b[sort]))
    }
    return [...posts].sort((a, b) => a[sort].localeCompare(b[sort]))
  }

  const sortPosts = (sort) => {
    dispatch(setSelectedSortAction(sort))
    if (searchedPosts) {
      if (sort === 'text') {
        dispatch(setSearchedPostsAction(nameSorting(sort)))
      }
      if (sort === 'id') {
        dispatch(setSearchedPostsAction(dateSorting(sort)))
      }
    } else if (searchedAndFilteredPosts) {
      if (sort === 'text') {
        dispatch(setSearchedAndFilteredPostsAction(nameSorting(sort)))

      }
      if (sort === 'id') {
        dispatch(setSearchedAndFilteredPostsAction(dateSorting(sort)))
      }
    } else {
      if (sort === 'text') {
        dispatch(setPostsAction((nameSorting(sort))))
      }
      if (sort === 'id') {
        dispatch(setPostsAction((dateSorting(sort))))
      }
    }

  }

  const searchTextHandler = (value) => {
    dispatch(setSearchTextAction(value))
    // console.log(value)
    if (value == '') {
      dispatch(setSearchedPostsAction(''))
      return
    }
    if (searchedAndFilteredPosts) {
      dispatch(setSearchedPostsAction(
        [...searchedAndFilteredPosts]
          .filter(post => post.text.toLowerCase().includes(value.toLowerCase()))
      ))
    } else {
      dispatch(setSearchedPostsAction(
        [...posts]
          .filter(post => post.text.toLowerCase().includes(value.toLowerCase()))
      ))
    }
  }

  function filteredAndSearchPosts(posts, value) {
    console.log(value)
    if (value === 'checked') {
      return [...posts].filter(post => post.checked === true)
    }
    if (value === 'unchecked') {
      return [...posts].filter(post => post.checked === false)
    }
    return posts
  }

  const filtrationTypeHandler = (value) => {
    dispatch(setFiltrationTypeAction(value))

    if (searchedPosts.length !== 0) {
      dispatch(setSearchedAndFilteredPostsAction(filteredAndSearchPosts(searchedPosts, value)))
    } else {
      dispatch(setSearchedAndFilteredPostsAction(filteredAndSearchPosts(posts, value)))
    }
  }

  return (
    <div>
      <h6 className={css.title}>Post list</h6>
      <AddPost
        onKeyDown={enterKeyAdd}
        onChange={addPostInputHandler}
        onClick={addPost}
        text={text}
      />
      <div className={css.checkCounter}>
        <div>
          Number: {posts.length}
        </div>
        <div>
          checked: {checkedCounter} unchecked: {posts.length - checkedCounter}
        </div>
      </div>
      <div className={css.search_input}>
        <Input
          placeholder="Search ..."
          value={searchText}
          onChange={searchTextHandler}
          onKeyDown={key => key}
        />
      </div>
      <div className={css.select_div}>
        <MySelect
          defaultValue={'сортировка'}
          value={selectedSort}
          onChange={sortPosts}
          options={[
            {value: 'id', name: 'по дате'},
            {value: 'text', name: 'по названию'}
          ]}
        />
        <MySelect
          defaultValue={'фильтрация'}
          value={filtrationType}
          onChange={filtrationTypeHandler}
          options={filterOptions}
        />
      </div>

      <Posts
        setCheckedCounter={setCheckedCounter}
        onClick={deletePost}
        posts={posts}
        searchedPosts={searchedPosts}
        searchText={searchText}
        filtrationType={filtrationType}
        searchedAndFilteredPosts={searchedAndFilteredPosts}
        selectedSort={selectedSort}
      />

    </div>
  );
}

export default App;
