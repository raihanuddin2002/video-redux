import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    isError: false,
    video: [],
    error: ''
}

export const fetchSingleVideo = createAsyncThunk("video/fetchSingleVideo", async (videoId) => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_API}/videos?id=${videoId}`)
    const data = await res.json();

    return data;
});

const videoSlice = createSlice({
    name: "video",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchSingleVideo.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
                state.error = ""
            })
            .addCase(fetchSingleVideo.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.error = ''
                state.video = action.payload
            })
            .addCase(fetchSingleVideo.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message
                state.video = []
            })
    }
})

export default videoSlice.reducer;