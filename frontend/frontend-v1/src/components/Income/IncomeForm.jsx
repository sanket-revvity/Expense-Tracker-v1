import React, { useState } from "react";
import axios from "axios";

function IncomeForm({ categories, setTransactions, setAlert }) {
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [date, setDate] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setAlert({
        open: true,
        message: "User not authorized",
        severity: "error",
      });
      return;
    }

    const transactionData = {
      categoryId,
      amount: parseFloat(amount),
      description,
      date,
      type: "Income",
    };

    axios
      .post("https://localhost:44374/api/transaction", transactionData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        setAlert({
          open: true,
          message: "Transaction added successfully",
          severity: "success",
        });
        setTransactions((prevTransactions) => [
          ...prevTransactions,
          response.data,
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
      <h2 className="text-xl font-semibold mb-4">Add Income</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <input
            type="text"
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-400 shadow-sm"
            required
          />
        </div>
        <div>
          <input
            type="number"
            placeholder="Amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-400 shadow-sm"
            required
          />
        </div>
        <div>
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
        </div>
        <div>
          <input
            type="datetime-local"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full p-2 rounded-lg border border-gray-400 shadow-sm"
            required
          />
        </div>
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

export default IncomeForm;
