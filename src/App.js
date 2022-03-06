import React, {useEffect, useState} from "react";
import AddPost from "./components/AddPost/AddPost";
import Posts from "./components/Posts/Posts";
import css from './App.module.css'
import MySelect from "./components/UI/MySelect/MySelect";
import Input from "./components/UI/Input/Input";

function App() {
  const [text, setText] = useState('')
  const [posts, setPosts] = useState([
    {id: 324, text: 't1', checked: false},
    {id: 323, text: 't2', checked: false},
    {id: 322, text: 't3', checked: false},
  ])
  const [checkedCounter, setCheckedCounter] = useState(0);
  const [selectedSort, setSelectedSort] = useState('');
  const [searchText, setSearchText] = useState('');
  const [searchedPosts, setSearchedPosts] = useState('');
  const [filtrationType, setFiltrationType] = useState('');
  const [filterOptions, setFilterOptions] = useState([
    {value: 'all', name: 'all'},
    {value: 'checked', name: 'checked'},
    {value: 'unchecked', name: 'unchecked'},
  ])
  const [searchedAndFilteredPosts, setSearchedAndFilteredPosts] = useState('');

  const changeHandler = val => {
    setText(val)
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
    setPosts([...posts, newPost]);
    setText('')
  }

  const enterKeyAdd = (key) => {
    if (key == 13) {
      addPost()
    }
  }

  const deletePost = (post) => {
    if (post.checked === true) {
      setCheckedCounter(s => s - 1)
    }
    if (searchedAndFilteredPosts) {
      setSearchedAndFilteredPosts(searchedAndFilteredPosts.filter(p => p.id !== post.id))
      setSearchedPosts(searchedPosts.filter(p => p.id !== post.id))
      setPosts(posts.filter(p => p.id !== post.id))
    } else if (searchedPosts) {
      setSearchedPosts(searchedPosts.filter(p => p.id !== post.id))
      setPosts(posts.filter(p => p.id !== post.id))
    } else {
      setPosts(posts.filter(p => p.id !== post.id))
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
    setSelectedSort(sort)
    if (searchedPosts) {
      if (sort === 'text') {
        setSearchedPosts(nameSorting(sort))
      }
      if (sort === 'id') {
        setSearchedPosts(dateSorting(sort))
      }
    } else {
      if (sort === 'text') {
        setPosts(nameSorting(sort))
      }
      if (sort === 'id') {
        setPosts(dateSorting(sort))
      }
    }

  }

  const searchTextHandler = (value) => {
    setSearchText(value)
    // console.log(value)
    if (value == '') {
      setSearchedPosts('')
      return
    }
    if (searchedAndFilteredPosts) {
      setSearchedPosts(
        [...searchedAndFilteredPosts]
          .filter(post => post.text.toLowerCase().includes(value.toLowerCase()))
      )
    } else {
      setSearchedPosts(
        [...posts]
          .filter(post => post.text.toLowerCase().includes(value.toLowerCase()))
      )
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
    setFiltrationType(value)
    if (searchedPosts.length !== 0) {
      setSearchedAndFilteredPosts(filteredAndSearchPosts(searchedPosts, value))
      // setSearchedAndFilteredPosts([
      //   {id: 14312, text: 'fasdf'}
      //   ]
      // )

    } else {
      setSearchedAndFilteredPosts(filteredAndSearchPosts(posts, value))
      // setSearchedAndFilteredPosts([
      //     {id: 14312, text: 'fasdf'}
      //   ]
      // )
    }

    console.log(posts)
    console.log(searchedPosts)
    // console.log(searchedAndFilteredPosts)
  }

  return (
    <div>
      <h6 className={css.title}>Post list</h6>
      <AddPost
        onKeyDown={enterKeyAdd}
        onChange={changeHandler}
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
