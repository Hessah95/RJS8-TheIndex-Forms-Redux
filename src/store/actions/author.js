import * as actionTypes from "./actionTypes";

import axios from "axios";
import { resetErrors } from "./errors";

const instance = axios.create({
  baseURL: "https://the-index-api.herokuapp.com"
});

export const fetchAuthorDetail = authorID => {
  return async dispatch => {
    dispatch({
      type: actionTypes.SET_AUTHOR_LOADING
    });
    try {
      const res = await instance.get(`/api/authors/${authorID}/`);
      const author = res.data;
      dispatch({
        type: actionTypes.FETCH_AUTHOR_DETAIL,
        payload: author
      });
    } catch (err) {}
  };
};

export const filterAuthors = query => {
  return {
    type: actionTypes.FILTER_AUTHORS,
    payload: query
  };
};

//POST THE BOOK TO https://the-index-api.herokuapp.com/api/books/
export const postBook = (book, author, closeModal) => {
  return async dispatch => {
    try {
      const res = await axios.post(
        "https://the-index-api.herokuapp.com/api/books/",
        {
          ...book,
          authors: author
        }
      );
      const Book = res.data;
      dispatch(resetErrors());
      dispatch({
        type: actionTypes.POST_BOOK,
        payload: Book
      });
      // dispatch(filterAuthors(""));
      closeModal();
    } catch (err) {
      dispatch({
        type: actionTypes.SET_ERRORS,
        payload: err.response.data
      });
    }
  };
};
