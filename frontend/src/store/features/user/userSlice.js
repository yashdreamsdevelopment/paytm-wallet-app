import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userId: null,
  userData: null,
  transferToUserData: null,
};

export const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUserId: (state, action) => {
      state.userId = action.payload;
    },

    setUserData: (state, action) => {
      state.userData = action.payload;
    },

    setTransferToUserData: (state, action) => {
      state.transferToUserData = action.payload;
    },
  },
});

export const { setUserData, setUserId, setTransferToUserData } =
  userSlice.actions;

export default userSlice.reducer;
