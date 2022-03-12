import {createStore} from "redux";
import {composeWithDevTools} from 'redux-devtools-extension'

const defaultState = {
  text: '',
  posts: [
    {id: 1647, text: "roman", checked: false},
    {id: 1648, text: "ostap", checked: false},
    {id: 1646, text: "fafa", checked: false},

  ],
  checkedCounter: 0,
  selectedSort: '',
  searchText: '',
  searchedPosts: '',
  filtrationType: '',
  filterOptions: [
    {value: 'all', name: 'all'},
    {value: 'checked', name: 'checked'},
    {value: 'unchecked', name: 'unchecked'},
  ],
  searchedAndFilteredPosts: '',
}

// Action types
const addPostInputChange = 'addPostInputChange'
const setPosts = 'setPosts'
const setCheckedCounter = 'setCheckedCounter'
const setSelectedSort = 'setSelectedSort'
const setSearchText = 'setSearchText'
const setSearchedPosts = 'setSearchedPosts'
const setFiltrationType = 'setFiltrationType'
const setFilterOptions = 'setFilterOptions'
const setSearchedAndFilteredPosts = 'setSearchedAndFilteredPosts'

const reducer = (state = defaultState, action) => {
  switch (action.type) {
    case addPostInputChange:
      return {...state, text: action.payload}
    case setPosts:
      return {...state, posts: action.payload}
    case setCheckedCounter:
      return {...state, checkedCounter: state.checkedCounter + action.payload}
    case setSelectedSort:
      return {...state, selectedSort: action.payload}
    case setSearchText:
      return {...state, searchText: action.payload}
    case setSearchedPosts:
      return {...state, searchedPosts: action.payload}
    case setFiltrationType:
      return {...state, filtrationType: action.payload}
    case setFilterOptions:
      return {...state, filterOptions: action.payload}
    case setSearchedAndFilteredPosts:
      return {...state, searchedAndFilteredPosts: action.payload}

    default:
      return state
  }
}

export const store = createStore(reducer, composeWithDevTools())

export const addPostInputChangeAction = payload => ({ type: addPostInputChange, payload })
export const setPostsAction = payload => ({ type: setPosts, payload })
export const setCheckedCounterAction = payload => ({ type: setCheckedCounter, payload })
export const setSelectedSortAction = payload => ({ type: setSelectedSort, payload })
export const setSearchTextAction = payload => ({ type: setSearchText, payload })
export const setSearchedPostsAction = payload => ({ type: setSearchedPosts, payload })
export const setFiltrationTypeAction = payload => ({ type: setFiltrationType, payload })
// export const setFilterOptionsAction = payload => ({ type: setFilterOptions, payload })
export const setSearchedAndFilteredPostsAction = payload => ({ type: setSearchedAndFilteredPosts, payload })



