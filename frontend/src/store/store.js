import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "./services/user/user-base.api";
import { accountApi } from "./services/account/account-base.api";
import userReducer from "./features/user/userSlice";
import accountReducer from "./features/account/accountSlice";

export const store = configureStore({
  reducer: {
    user: userReducer,
    account: accountReducer,
    [userApi.reducerPath]: userApi.reducer,
    [accountApi.reducerPath]: accountApi.reducer,
  },

  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(userApi.middleware)
      .concat(accountApi.middleware),
  devTools: true,
});
