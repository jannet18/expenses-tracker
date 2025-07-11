import React from "react";
import { LuDownload } from "react-icons/lu";
import TransactionInfoCard from "../cards/TransactionInfoCard";
import moment from "moment";

const IncomeList = ({ transactions = [], onDelete, onDownload }) => {
  // console.log("transactions:", transactions);
  return (
    <div className="card">
      <div className="flex items-center justify-between">
        <h5 className="text-lg">Income Sources</h5>
        <button className="card-btn" onClick={onDownload}>
          <LuDownload className="text-base" />
        </button>
      </div>
      <div className="grid- grid-cols-1 md:grid-cols-2">
        {transactions?.length > 0 ? (
          transactions.map((income, _) => (
            <TransactionInfoCard
              key={income._id}
              title={income.source}
              icon={income.icon}
              date={moment(income.date).format("Do MM YYYY")}
              amount={income.amount}
              type="income"
              onDelete={() => onDelete(income._id)}
            />
          ))
        ) : (
          <p>No Income Found.</p>
        )}
      </div>
    </div>
  );
};

export default IncomeList;
