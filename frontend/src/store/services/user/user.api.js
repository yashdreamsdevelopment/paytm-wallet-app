import { userApi } from "./user-base.api";

export const userServiceApi = userApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    createUser: builder.mutation({
      query: (data) => ({
        url: "/signup",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (data) => ({
        url: "/signin",
        method: "POST",
        body: data,
      }),
    }),
    updateUser: builder.mutation({
      query: (data) => ({
        url: "/",
        method: "PUT",
        body: data,
      }),
    }),
    searchUser: builder.query({
      query: (filter) => ({
        url: `/bulk?filter=${filter ? filter : ""}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        method: "GET",
      }),
    }),
    generateReferral: builder.query({
      query: () => "/generateReferral",
    }),
    getUserData: builder.query({
      query: (userId) => ({
        url: `/${userId}`,
        headers: {
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      }),
    }),
  }),
});

export const {
  useCreateUserMutation,
  useLoginUserMutation,
  useUpdateUserMutation,
  useSearchUserQuery,
  useLazySearchUserQuery,
  useLazyGenerateReferralQuery,
  useGetUserDataQuery,
} = userServiceApi;
