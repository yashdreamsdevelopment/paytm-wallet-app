import React, { useState, useEffect } from "react";
import { useGetTransactionsQuery } from "../store/services/account/account.api";
import Avatar from "../components/Avatar";

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
    <>
      <h2 className="text-3xl font-bold text-gray-800 mb-6">
        Transaction List
      </h2>
      <div className="space-y-6">
        {transactionsList?.map((transaction) => (
          <div className="bg-white border border-gray-200 p-3 rounded-lg shadow-sm flex items-center hover:shadow-md transition-shadow duration-200">
            <Avatar
              contents={[transaction.to.firstName, transaction.to.lastName]}
            />
            <div className="ml-4 flex-1">
              <p className="text-sm text-gray-600">
                {transaction.type === "DR" ? "Sent To" : "Received From"}:{" "}
                <span className="font-semibold text-gray-800">
                  {transaction.to.firstName.concat(
                    " ",
                    transaction.to.lastName
                  )}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Transaction ID:{" "}
                <span className="font-mono text-gray-700">
                  {transaction._id}
                </span>
              </p>
              <p className="text-sm text-gray-500">
                Date: {transaction.createdAt}
              </p>
            </div>
            <div className="text-right">
              <p
                className={`text-xl font-semibold ${
                  transaction.type === "DR" ? "text-red-600" : "text-green-600"
                }`}
              >
                {transaction.type === "DR" ? "-" : "+"}₹{transaction.amount}
              </p>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Transactions;
