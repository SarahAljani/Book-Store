import { createSlice } from "@reduxjs/toolkit";
import { books as initialBooks } from "../../assests/data"; // استيراد الكتب الأولية

const booksSlice = createSlice({
  name: "books",
  initialState: initialBooks.map((book) => ({
    ...book,
    added: book.added ?? false, // تأكد أن `added` موجود دائماً
  })),
  reducers: {
    toggleAddedInv: (state, action) => {
      return state.map((book) =>
        book.id === action.payload ? { ...book, added: !book.added } : book
      );
    },
  },
});


export const { toggleAddedInv } = booksSlice.actions;
export default booksSlice.reducer;
