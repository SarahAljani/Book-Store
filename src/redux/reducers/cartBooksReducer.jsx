import {
  ADD_BOOK,
  DELETE_BOOK,
  INCREMENT_BOOK_QUANTITY,
  DECREMENT_BOOK_QUANTITY,
} from "../actions/types";

const initialState = {
  books: [],
};

function cartBooksReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_BOOK:
      return {
        ...state,
        books: [...state.books, { ...action.payload, number: 1 }],
      };

    case DELETE_BOOK:
      return {
        ...state,
        books: state.books.filter((e, i) => i !== action.payload),
      };

    case INCREMENT_BOOK_QUANTITY:
      return {
        ...state,
        books: state.books.map((book,i) =>
          i === action.payload
            ? { ...book, number: book.number + 1 }
            : book
        ),
      };

    case DECREMENT_BOOK_QUANTITY:
      return {
        ...state,
        books: state.books.map((book,i) =>
          i === action.payload && book.number > 1
            ? { ...book, number: book.number - 1 }
            : book
        ),
      };

    default:
      return state;
  }
}

export default cartBooksReducer;
