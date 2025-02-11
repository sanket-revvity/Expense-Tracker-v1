import React from "react";
import TransactionCard from "../Card/TransactionCard";
import {
  Banknote,
  Bitcoin,
  Building,
  Calendar,
  CreditCard,
  DollarSign,
  FileText,
  Fuel,
  Landmark,
  Luggage,
  School,
  Trash2,
  Utensils,
  Youtube,
} from "lucide-react";

function ExpenseTransactionList({
  transactions,
  categories,
  onDelete,
  onUpdate,
}) {
  const categoryIcon = (category) => {
    console.log("Category:", category);
    console.log(transactions);

    switch (category) {
      case "Education":
        return <School />;
      case "Fees":
        return <Banknote />;
      case "Food":
        return <Utensils />;
      case "Travelling":
        return <Luggage />;
      case "Fuel":
        return <Fuel />;
      case "Rent":
        return <Building />;
      case "other":
      default:
        return <CreditCard />;
    }
  };
  return (
    <div className="bg-gray-300 m-2 p-2 rounded-2xl">
      <h2 className="text-xl font-semibold mb-4 text-center">
        Expense Transactions
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
              onUpdate={onUpdate}
              categoryIcon={categoryIcon}
              categories={categories}
            />
          ))
        )}
      </div>
    </div>
  );
}

export default ExpenseTransactionList;
