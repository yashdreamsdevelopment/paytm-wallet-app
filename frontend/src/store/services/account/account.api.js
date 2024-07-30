import { accountApi } from "./account-base.api";

export const accountServiceApi = accountApi.injectEndpoints({
  overrideExisting: true,
  endpoints: (builder) => ({
    getAccountBalance: builder.query({
      query: () => "/balance",
    }),
    transferAmount: builder.mutation({
      query: (data) => ({
        url: "/transfer",
        method: "POST",
        body: data,
      }),
    }),
    getTransactions: builder.query({
      query: () => "/transactions-history",
    }),
  }),
});

export const {
  useGetAccountBalanceQuery,
  useTransferAmountMutation,
  useLazyGetAccountBalanceQuery,
  useGetTransactionsQuery,
} = accountServiceApi;
