import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { USER_URL } from "../../../constants/api.constants";

export const userApi = createApi({
  reducerPath: "userApi",
  baseQuery: fetchBaseQuery({
    baseUrl: USER_URL,
    prepareHeaders: () => {},
  }),
  endpoints: (_) => ({}),
});
