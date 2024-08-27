import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { fetchBooks } from "./bookApi";
import api from "../apiService";
import { toast } from "react-toastify";

const initialState = {
    books : [],
    readingBook : [],
    bookDetail : null,
    status : null,
    error : null,
}


export const getBooks = createAsyncThunk("books/getBooks", async (props) => {
    const response = await fetchBooks(props)
    return response.data
});

export const getBookDetail = createAsyncThunk("books/getBookDetail", async (bookId) => {
    const response = await api.get(`books/${bookId}`)
    return response.data
})
export const addToReadingList = createAsyncThunk("books/addToReadingList", async (book) => {
    const response = await api.post(`/favorites`, book)
    return response.data
})
export const getReadingList = createAsyncThunk("books/getReadingList", async () => {
    const response = await api.get(`/favorites`)
    return response.data
})
export const removeReadingList = createAsyncThunk("books/removeReadingList", async (removedBookId) => {
    const response = await api.delete(`/favorites/${removedBookId}`)
    return response.data
})


export const pageSlice = createSlice({
    name : "book",
    initialState,
    extraReducers: (builder) => {
        builder
        .addCase(getBooks.pending, (state) => {
            state.status = "loading"
        })
        .addCase(getBooks.fulfilled, (state,action) => {
            state.status = null
            state.books = action.payload

        })
        .addCase(getBooks.rejected, (state) => {
            state.status = "failed"
        })
        builder
        .addCase(getBookDetail.pending, (state) => {
            state.status = "loading"
        })
        .addCase(getBookDetail.fulfilled, (state,action) => {
            state.status = null
            state.bookDetail = action.payload
        })
        .addCase(getBookDetail.rejected, (state) => {
            state.status = "failed"
        })
        builder
        .addCase(addToReadingList.pending, (state) => {
            state.status = "loading";
        })
        .addCase(addToReadingList.fulfilled, (state, action) => {
            state.status = null;
            toast.success("The book has been added to the reading list!");
        })
        .addCase(addToReadingList.rejected, (state, action) => {
            state.status = "failed";
            toast.error(action.error.message);
        })
        builder
        .addCase(getReadingList.pending, (state) => {
            state.status = "loading"
        })
        .addCase(getReadingList.fulfilled, (state,action) => {
            state.status = null
            state.readingBook = action.payload
        })
        .addCase(getReadingList.rejected, (state) => {
            state.status = "failed"
        })
        builder
        .addCase(removeReadingList.pending, (state) => {
            state.status = "loading"
        })
        .addCase(removeReadingList.fulfilled, (state) => {
            state.status = null
            toast.success("The book has been removed")
        })
        .addCase(removeReadingList.rejected, (state) => {
            state.status = "failed"
        })
    }
})

export default pageSlice.reducer;