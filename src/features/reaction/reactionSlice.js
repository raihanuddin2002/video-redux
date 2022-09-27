import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"

const initialState = {
    isLoading: false,
    isError: false,
    totalLike: 0,
    totalDislike: 0,
    error: ''
}

export const updateReaction = createAsyncThunk("reaction/updateReaction", async ({ updatedData, id }) => {
    const res = await fetch(`${process.env.REACT_APP_SERVER_API}/videos/${id}`, {
        method: 'PATCH',
        headers: {
            'Content-type': 'application/json; charset=UTF-8',
        },
        body: JSON.stringify(updatedData),
    })
    const data = await res.json()

    return data;
});

const reactionSlice = createSlice({
    name: "reaction",
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(updateReaction.fulfilled, (state, action) => {
                state.isLoading = false;
                state.isError = false;
                state.error = ''
                state.totalLike = action.payload.likes
                state.totalDislike = action.payload.unlikes
            })
            .addCase(updateReaction.rejected, (state, action) => {
                state.isLoading = false;
                state.isError = true;
                state.error = action.error.message
            })
    }
})

export default reactionSlice.reducer;