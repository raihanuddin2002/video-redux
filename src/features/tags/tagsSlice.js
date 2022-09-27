import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    isError: false,
    tags: [],
    error: ''
}

export const fetchtags = createAsyncThunk("tags/fetchtags", async () => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_API}/tags`)
    const data = await res.json()

    return data;
});

const tagsSlice = createSlice({
    name: "tags",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchtags.pending, (state, action) => {
                state.isLoading = true;
                state.isError = false;
                state.error = ""
            })
            .addCase(fetchtags.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.error = ''
                state.tags = action.payload
            })
            .addCase(fetchtags.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message
                state.tags = []
            })
    }
})

export default tagsSlice.reducer;