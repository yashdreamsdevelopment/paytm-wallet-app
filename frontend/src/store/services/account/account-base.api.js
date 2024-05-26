import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ACCOUNT_URL } from "../../../constants/api.constants";

export const accountApi = createApi({
  reducerPath: "accountApi",
  baseQuery: fetchBaseQuery({
    baseUrl: ACCOUNT_URL,
    prepareHeaders: (headers) => {
      headers.set("Authorization", `Bearer ${localStorage.getItem("token")}`);
    },
  }),
  endpoints: (_) => ({}),
});
