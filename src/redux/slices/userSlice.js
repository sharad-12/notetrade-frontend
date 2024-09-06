import { createSlice } from '@reduxjs/toolkit';

const user = createSlice({
    name: "user",
    initialState: {
        userData:{},
    },
    reducers: {
        setUser(state, action) {
            state.userData = action.payload;
        }
    },
});

export const { setUser } = user.actions;

export default user.reducer;
