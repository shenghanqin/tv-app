import {
  SEARCH_SHOWS,
  SEARCH_SHOWS_MORE,
  SET_LOADING,
  SET_LOADING_MORE,
  SET_SINGLE_SHOW,
  CLEAR_SINGLE_SHOW,
} from "../types";

const showsReducer = (state, action) => {
  switch (action.type) {
    case SET_LOADING:
      return {
        ...state,
        loading: true,
      };
    case SET_LOADING_MORE:
      return {
        ...state,
        loadingMore: true,
      };
    case SEARCH_SHOWS:
      return {
        ...state,
        shows: action.payload.shows,
        searchTerm: action.payload.searchTerm,
        loading: false,
        currentPage: action.payload.currentPage,
      };
    case SEARCH_SHOWS_MORE:
      return {
        ...state,
        shows: state.shows.concat(action.payload.shows),
        loadingMore: false,
        currentPage: action.payload.currentPage,
      };
    case SET_SINGLE_SHOW:
      return {
        ...state,
        singleShow: action.payload,
        loading: false,
      };
    case CLEAR_SINGLE_SHOW:
      return {
        ...state,
        singleShow: {},
      };
    default:
      return state;
  }
};

export default showsReducer;
