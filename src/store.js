import { configureStore, createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from 'axios'


const dataSlice = createSlice({
    name: "data",
    initialState: { value: {}, skip: 2, fetchMore: true, firstFetch: true, savedScroll: 0 },
    reducers: {
        setSkip: (state, action) => {
            state.skip = state.skip + 2
        },
        addData: (state, action) => {
            state.value = action.payload
        },
        RefreshAllData: (state, action) => {
            state.value = [];
            state.skip = 0;
            state.fetchMore = true;
            state.firstFetch = true;

        },

        removeData: (state, action) => {
            state.value = []
        },
        concatData: (state, action) => {
            state.value = state.value.concat(action.payload)
        },

        like: (state, action) => {
            const { key, userid } = action.payload;
            state.value[key] = {
                ...state.value[key],
                likes: [...state.value[key].likes, userid],
            };
            // state.value[action.payload.key].likes = state.value[action.payload.key].likes.concat(action.payload.userid)
            // state.value.likes = state.value.likes.concat(action.payload)
        },
        dislike: (state, action) => {
            const { key, userid } = action.payload;
            state.value[key] = {
                ...state.value[key],
                likes: state.value[key].likes.filter((val) => val !== userid),
            };

            // state.value[action.payload.key].likes = state.value[action.payload.key].likes.filter((val) =>
            //     val != action.payload.userid
            // )
        },
        fetchMoreData: (state, action) => {
            state.fetchMore = false
        },
        fetchFirstData: (state, action) => {
            state.firstFetch = false
        },
        setsavedScroll: (state, action) => {
            state.savedScroll = action.payload
        }
    }
})

export const { addData, removeData, concatData, like, dislike, fetchMoreData, fetchFirstData, setSkip, RefreshAllData, setsavedScroll } = dataSlice.actions;



const friendInitialState = { value: {}, loading: false, text: "", error: "" }

const fetchFriends = createAsyncThunk(
    "friend/fetchFriends",
    async (prop) => {
        const res = await axios.get(`https://nice-plum-panda-tam.cyclic.app/myFriends/${prop.id}`, {
            headers: {
                Authorization: prop.authtoken
            }
        })
        return res.data

    }
)

const friendSlice = createSlice({

    name: "friend",
    initialState: friendInitialState,
    reducers: {
        setFriends: (state, action) => {
            state.value = action.payload
        },
        deleteFriend: (state, action) => {
            state.value = state.value.filter((val, index) => index != action.payload.index)
            //state.value = state.value.filter((val) => val._id != action.payload)
        }
    },
    extraReducers: (builder) => {
        builder.addCase(fetchFriends.pending, (state, action) => {
            state.loading = true
            state.text = "loading"
            state.value = {}
        })
        builder.addCase(fetchFriends.fulfilled, (state, action) => {
            state.loading = false
            state.text = "success"

            state.value = action.payload

        })
        builder.addCase(fetchFriends.rejected, (state, action) => {
            state.loading = false
            state.text = "error"
            state.error = action.error.message
            state.value = {}
        })

    }
})

export { fetchFriends }
export const { setFriends, deleteFriend } = friendSlice.actions;
export const store = configureStore({
    reducer: {
        data: dataSlice.reducer,
        friend: friendSlice.reducer
    },
})
// The store now has redux-thunk added and the Redux DevTools Extension is turned on