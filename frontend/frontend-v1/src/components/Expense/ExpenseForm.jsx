import React, { useState } from "react";
import axios from "axios";

function ExpenseForm({ categories, setTransactions, setAlert }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [date, setDate] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    if (!token) {
      alert("User not authorized");
      return;
    }

    const transactionData = {
      categoryId,
      amount: parseFloat(amount),
      description,
      date,
      type: "Expense",
    };

    axios
      .post("https://localhost:44374/api/transaction", transactionData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        const updatedTransaction = {
          ...response.data,
          categoryName: categories.find(
            (cat) => cat.id === response.data.categoryId
          )?.name,
        };
        setAlert({
          open: true,
          message: "Expense added successful!",
          severity: "success",
        });
        setTransactions((prevTransactions) => [
          ...prevTransactions,
          updatedTransaction,
        ]);
        setDescription("");
        setAmount("");
        setCategoryId("");
        setDate("");
      })
      .catch((error) => {
        console.error("Error adding transaction:", error);
        setAlert({
          open: true,
          message: "Error adding transaction",
          severity: "error",
        });
      });
  };
  return (
    <div className="bg-gray-300 m-2 rounded-2xl p-6">
      <h2 className="text-xl font-semibold mb-4">Add Expense</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-400 shadow-sm"
          required
        />
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-400 shadow-sm"
          required
        />
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-400 shadow-sm"
          required
        >
          <option value="">Select Category</option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <input
          type="datetime-local"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          className="w-full p-2 rounded-lg border border-gray-400 shadow-sm"
          required
        />
        <button
          type="submit"
          className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-slate-800 transition duration-300"
        >
          Add Transaction
        </button>
      </form>
    </div>
  );
}

export default ExpenseForm;
