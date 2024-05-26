import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  accountBalance: 0,
};

export const accountSlice = createSlice({
  name: "account",
  initialState,
  reducers: {
    setAccountBalance: (state, action) => {
      state.accountBalance = action.payload;
    },
  },
});

export const { setAccountBalance } = accountSlice.actions;

export default accountSlice.reducer;
