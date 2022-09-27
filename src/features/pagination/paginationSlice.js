import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    isError: false,
    dataCount: 0,
    pageNo: 1,
    error: ''
}

export const fetchVideosForPagination = createAsyncThunk("pagination/fetchVideos", async ({ tags, searchText, searchAuthor }) => {
    let queryString = ''
    if (tags.length > 0) queryString += tags.map(tag => `tags_like=${tag}`).join("&")
    if (searchText !== '') queryString += `&q=${searchText}`
    if (searchAuthor !== '') queryString += `&author=${searchAuthor}`

    const res = await fetch(`${process.env.REACT_APP_SERVER_API}/videos?${queryString}`)
    const data = await res.json()

    return data;
});

const paginationSlice = createSlice({
    name: "pagination",
    initialState,
    reducers: {
        selectedPage: (state, action) => {
            state.pageNo = action.payload
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideosForPagination.fulfilled, (state, action) => {
                state.isError = false;
                state.error = ''
                state.dataCount = action.payload.length
            })
            .addCase(fetchVideosForPagination.rejected, (state, action) => {
                state.isError = true;
                state.error = action.error.message
                state.dataCount = 0
            })
    }
})

export default paginationSlice.reducer;
export const { selectedPage } = paginationSlice.actions;