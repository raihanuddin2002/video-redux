import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    isError: false,
    relatedVideos: [],
    error: ''
}

export const fetchRelatedVideos = createAsyncThunk("RelatedVideos/fetchRelatedVideos", async ({ tags, id }) => {
    const limit = 5;
    let queryString = tags.length > 0 ? tags.map(tag => `tags_like=${tag}`).join("&") + `&id_ne=${id}&_limit=${limit}`
        : `id_ne=${id}&_limit=${limit}`;

    const res = await fetch(`${process.env.REACT_APP_SERVER_API}/videos?${queryString}`)
    const data = await res.json()

    return data;
});

const RelatedVideosSlice = createSlice({
    name: "RelatedVideos",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchRelatedVideos.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
                state.error = ""
            })
            .addCase(fetchRelatedVideos.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.error = ''
                state.relatedVideos = action.payload
            })
            .addCase(fetchRelatedVideos.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message
                state.relatedVideos = []
            })
    }
})

export default RelatedVideosSlice.reducer;