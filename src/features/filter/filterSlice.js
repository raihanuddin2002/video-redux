import { createSlice } from "@reduxjs/toolkit"

const initialState = {
    tags: [],
    searchText: '',
    searchAuthor: ''
}

const filterSlice = createSlice({
    name: "filter",
    initialState,
    reducers: {
        tagSelected: (state, action) => {
            state.tags.push(action.payload)
        },
        tagRemoved: (state, action) => {
            const indexToRemove = state.tags.indexOf(action.payload)
            if (indexToRemove !== -1) state.tags.splice(indexToRemove, 1)
        },
        search: (state, action) => {
            state.searchText = action.payload
        },
        searchAuthor: (state, action) => {
            state.searchAuthor = action.payload
        },
        resetSearchFilter: (state, action) => {
            state.tags = []
            state.searchText = ''
            state.searchAuthor = ''
        },

    }
})

export default filterSlice.reducer;
export const {
    tagSelected,
    tagRemoved,
    search,
    searchAuthor,
    resetSearchFilter
} = filterSlice.actions