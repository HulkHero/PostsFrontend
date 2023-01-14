import { configureStore, createSlice } from '@reduxjs/toolkit'


const dataSlice = createSlice({
    name: "data",
    initialState: { value: {}, fetchMore: true },
    reducers: {
        addData: (state, action) => {
            state.value = action.payload
        },
        removeData: (state, action) => {
            state.value = []
        },
        concatData: (state, action) => {
            state.value = state.value.concat(action.payload)
        },
        like: (state, action) => {
            state.value[action.payload.key].likes = state.value[action.payload.key].likes.concat(action.payload.userid)
            // state.value.likes = state.value.likes.concat(action.payload)
        },
        dislike: (state, action) => {
            state.value[action.payload.key].likes = state.value[action.payload.key].likes.filter((val) => {
                return val != action.payload.userid
            })
        },
        fetchMoreData: (state, action) => {
            state.fetchMore = false
        }
    }
})

export const { addData, removeData, concatData, like, dislike, fetchMoreData } = dataSlice.actions;

export const store = configureStore({
    reducer: {
        data: dataSlice.reducer,
    },
})
// The store now has redux-thunk added and the Redux DevTools Extension is turned on