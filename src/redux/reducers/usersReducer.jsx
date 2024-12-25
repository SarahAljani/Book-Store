import {
  ADD_USER,
  UPDATE_USER,
  UPDATE_CURRENT_USER,
  UPDATE_USER_CART_RETURN_DATE,
  UPDATE__USER_INFOS,
  REPLACE_USER_CASH, // Optional if you need to update existing user data
} from "../actions/types";

const initialState = {
  users: [], // Array to hold user data
  userInfos: {
    cart: [],
    firstName: "",
    lastName: "",
    phoneNumber: "",
    pages: "",
    address: "",
    userName: "",
    cardNumber: "",
    returnDate: "null",
  },
  currentUser: {
    cart: [],
    firstName: "",
    lastName: "",
    phoneNumber: "",
    pages: "",
    address: "",
    userName: "",
    cardNumber: "",
    returnDate: "",
  },
};

function usersReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_USER:
      return {
        ...state,
        users: [...state.users, { ...action.payload }],
      };

    // Optional: Handle user update if needed
    case UPDATE_USER:
      return {
        ...state,
        users: state.users.map((user) =>
          user.id === action.payload.id ? { ...action.payload } : user
        ),
      };
    case REPLACE_USER_CASH:
      console.log(state.userInfos);
      return {
        ...state,
        userInfos: { ...action.payload },
      };
    case UPDATE_USER_CART_RETURN_DATE:
      console.log("add return date");
      return {
        ...state,
        userInfos: {
          ...state.userInfos,
          cart: state.userInfos.cart.map((book) => ({
            ...book,
            returnDate: action.payload,
          })),
        },
      };
    case UPDATE__USER_INFOS:
      console.log(state.currentUser);
      return {
        ...state,
        currentUser: { ...action.payload },
      };
    case UPDATE_CURRENT_USER:
      console.log(state.currentUser);
      return {
        ...state,
        currentUser: { ...action.payload },
      };
    default:
      return state;
  }
}

export default usersReducer;
