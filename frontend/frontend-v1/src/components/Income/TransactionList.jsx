import React from "react";
import TransactionCard from "../Card/TransactionCard";
import {
  Banknote,
  Bitcoin,
  DollarSign,
  FileText,
  Gift,
  Wallet,
  Landmark,
  PenTool,
  PiggyBank,
  Youtube,
} from "lucide-react";
function TransactionList({ transactions, categories, onDelete, onUpdate }) {
  const categoryIcon = (category) => {
    switch (category) {
      case "Salary":
        return <Wallet />;
      case "Investments":
        return <Landmark />;
      case "Stocks":
        return <DollarSign />;
      case "Bitcoin":
        return <Bitcoin />;
      case "Freelancing":
        return <PenTool />;
      case "Bank":
        return <Landmark />;
      case "Youtube":
        return <Youtube />;
      case "Bonus":
        return <Gift />;
      case "Pension":
        return <PiggyBank />;
      case "Interest Income":
        return <Banknote />;
      default:
        return <FileText />;
    }
  };

  return (
    <div>
      <h2 className="text-xl font-semibold mb-4 text-center">
        Income Transactions
      </h2>
      <div className="max-h-[450px] overflow-y-auto">
        {transactions.length === 0 ? (
          <p className="text-center text-gray-600">No transactions found</p>
        ) : (
          transactions.map((transaction) => (
            <TransactionCard
              key={transaction.id}
              transaction={transaction}
              onDelete={onDelete}
              categoryIcon={categoryIcon}
              categories={categories}
              onUpdate={onUpdate}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default TransactionList;
