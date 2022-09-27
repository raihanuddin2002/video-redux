import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    isError: false,
    videos: [],
    error: '',
}

export const fetchVideos = createAsyncThunk("videos/fetchVideos", async ({ tags, searchText, searchAuthor, pageNo }) => {
    let queryString = ''

    // Pagination
    const limit = 5
    queryString += `_page=${pageNo}&_limit=${limit}`

    if (tags.length > 0) queryString += tags.map(tag => `tags_like=${tag}`).join("&")
    if (searchText !== '') queryString += `&q=${searchText}`
    if (searchAuthor !== '') queryString += `&author=${searchAuthor}`

    // Fetch Videos
    const res = await fetch(`${process.env.REACT_APP_SERVER_API}/videos?${queryString}`)
    const data = await res.json()

    return data;
});

const videosSlice = createSlice({
    name: "videos",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchVideos.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
                state.error = ""
            })
            .addCase(fetchVideos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.error = ''
                state.videos = action.payload
                state.filterDataCount = action.payload.length
            })
            .addCase(fetchVideos.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message
                state.videos = []
            })
    }
})

export default videosSlice.reducer;