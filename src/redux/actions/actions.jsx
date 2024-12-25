import {
  ADD_BOOK,
  DELETE_BOOK,
  INCREMENT_BOOK_QUANTITY,
  DECREMENT_BOOK_QUANTITY,
  ADD_USER,
  REPLACE_USER_CASH,
  UPDATE_USER_CART_RETURN_DATE,
  UPDATE_CURRENT_USER,
  UPDATE__USER_INFOS,
} from "./types";

export const addBook = (book) => ({
  type: ADD_BOOK,
  payload: book,
});

export const deleteBook = (bookId) => ({
  type: DELETE_BOOK,
  payload: bookId,
});

export const incrementBookQuantity = (index) => ({
  type: INCREMENT_BOOK_QUANTITY,
  payload: index,
});

export const decrementBookQuantity = (index) => ({
  type: DECREMENT_BOOK_QUANTITY,
  payload: index,
});
export const addUser = (user) => ({
  type: ADD_USER,
  payload: user,
});
export const addUserInfos = (user) => ({
  type:REPLACE_USER_CASH,
  payload: user,
});
export const update_current_user = (date) => ({
  type: UPDATE_CURRENT_USER,
  payload: date,
});
export const update_user_infos = (user) => ({
  type: UPDATE__USER_INFOS,
  payload: user,
});
export const updateUserCartReturnDate = (returnDate) => {
  return {
    type: UPDATE_USER_CART_RETURN_DATE,
    payload: returnDate,
  };
};
