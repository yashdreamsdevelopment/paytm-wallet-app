import React, { useState, useEffect } from "react";
import { useGetTransactionsQuery } from "../store/services/account/account.api";

const Transactions = () => {
  const { data, isLoading, isSuccess, refetch } = useGetTransactionsQuery();

  const [transactionsList, setTransactionsList] = useState([]);

  useEffect(() => {
    refetch();
    if (isSuccess) {
      setTransactionsList(data.data);
    }
  }, [isLoading]);

  return (
    <div class="max-w-4xl mx-auto bg-white shadow-lg rounded-lg p-6 my-5">
      <h2 class="text-3xl font-bold text-gray-800 mb-6">Transaction List</h2>
      <div class="space-y-6">
        {transactionsList?.map((transaction) => (
          <div class="bg-white border border-gray-200 p-5 rounded-lg shadow-sm flex items-center hover:shadow-md transition-shadow duration-200">
            <div class="flex-shrink-0 w-12 h-12 rounded-full bg-blue-500 flex items-center justify-center text-white text-lg font-semibold">
              SM
            </div>
            <div class="ml-4 flex-1">
              <p class="text-sm text-gray-600">
                {transaction.type === "DR" ? "Sent To" : "Received From"}:{" "}
                <span class="font-semibold text-gray-800">
                  {transaction.to.firstName.concat(
                    " ",
                    transaction.to.lastName
                  )}
                </span>
              </p>
              <p class="text-sm text-gray-500">
                Transaction ID:{" "}
                <span class="font-mono text-gray-700">{transaction._id}</span>
              </p>
              <p class="text-sm text-gray-500">Date: {transaction.createdAt}</p>
            </div>
            <div class="text-right">
              <p
                class={`text-xl font-semibold text-${
                  transaction.type === "DR" ? "red" : "green"
                }-600`}
              >
                {transaction.type === "DR" ? "-" : "+"} ₹{transaction.amount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Transactions;
