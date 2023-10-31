import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        user: null,
        userAddedRooms:[],
        roomsCreatedByAdmin:[],
    },
    reducers: {
        setUser:(state,action) => {
            state.user = action.payload;
        },
        setUserAddedRooms: (state, action) => {
            state.userAddedRooms = action.payload;
        },
        setRoomsCreatedByAdmin: (state, action) => {
            state.roomsCreatedByAdmin = action.payload;
        },
    },
});

export const { setUser, setUserAddedRooms, setRoomsCreatedByAdmin } = userSlice.actions;
export default userSlice.reducer;