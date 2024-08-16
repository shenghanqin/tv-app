import { useReducer } from "react";
import axios from "axios";
import ShowsContext from "./showsContext";
import ShowsReducer from "./showsReducer";
import {
  SEARCH_SHOWS,
  SET_LOADING,
  SET_SINGLE_SHOW,
  CLEAR_SINGLE_SHOW,
  SET_LOADING_MORE,
  SEARCH_SHOWS_MORE,
} from "../types";

const ShowsState = (props) => {
  const initialState = {
    shows: [],
    singleShow: {},
    loading: false,
    loadingMore: false,
    searchTerm: '',
    currentPage: 1,
  };

  const [state, dispatch] = useReducer(ShowsReducer, initialState);

  /**
   * search something content
   * @param {string} searchTerm input words
   */
  const searchShows = async (searchTerm) => {
    dispatch({ type: SET_LOADING });

    const { data } = await axios.get(
      `https://api.tvmaze.com/search/shows?q=${searchTerm}&page=1`
    );

    dispatch({
      type: SEARCH_SHOWS,
      payload: {
        shows: data,
        searchTerm: searchTerm,
        currentPage: 1,
      },
    });
  };

  /**
   * homepage default content
   * @param {string} searchTerm input words
   */
  const homeShows = async () => {
    dispatch({ type: SET_LOADING });

    const { data } = await axios.get(
      `https://api.tvmaze.com/shows?page=1`
    );
    dispatch({
      type: SEARCH_SHOWS,
      payload: {
        shows: data,
        searchTerm: '',
        currentPage: 1,
      },
    });
  };

  const loadMoreShows = async () => {
    dispatch({ type: SET_LOADING_MORE });

    const { currentPage, searchTerm } = state
    console.log(currentPage)
    const newPage = currentPage + 1

    const { data } = await axios.get(
      searchTerm
        ? `https://api.tvmaze.com/search/shows?q=${searchTerm}&page==${newPage}`
        : `https://api.tvmaze.com/shows?page=${newPage}`
    );
    dispatch({
      type: SEARCH_SHOWS_MORE,
      payload: {
        shows: data,
        currentPage: newPage,
      },
    });
  };

  const getSingleShow = async (id) => {
    dispatch({
      type: SET_LOADING,
    });

    const { data } = await axios.get(`https://api.tvmaze.com/shows/${id}`);

    console.log(data);

    dispatch({
      type: SET_SINGLE_SHOW,
      payload: data,
    });
  };

  const clearSingleShow = () => {
    dispatch({
      type: CLEAR_SINGLE_SHOW,
    });
  };

  return (
    <ShowsContext.Provider
      value={{
        shows: state.shows,
        singleShow: state.singleShow,
        loading: state.loading,
        loadingMore: state.loadingMore,
        currentPage: state.currentPage,
        homeShows,
        searchShows,
        getSingleShow,
        clearSingleShow,
        loadMoreShows,
      }}
    >
      {props.children}
    </ShowsContext.Provider>
  );
};

export default ShowsState;
