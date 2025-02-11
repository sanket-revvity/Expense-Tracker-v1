import React, { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import axios from "axios";
import "chart.js/auto";
import DashboardTable from "./DashboardTable";
import StatsCard from "./StatsCard";
import Charts from "./Charts";

function Dashboard() {
  const [username, setUsername] = useState("");
  const [income, setIncome] = useState(null);
  const [expense, setExpense] = useState(null);
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      navigate("/login");
      return;
    }

    try {
      const decoded = jwtDecode(token);
      setUsername(decoded.Username);
    } catch (error) {
      console.error("Error decoding token", error);
    }
  }, []);

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        const summaryResponse = await axios.get(
          "https://localhost:44374/api/transaction/summary",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const { totalIncome, totalExpense, balance } = summaryResponse.data;

        setIncome(totalIncome);
        setExpense(totalExpense);
        setBalance(balance);
      } catch (error) {
        console.error("Error fetching summary data:", error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const transactionResponse = await axios.get(
          "https://localhost:44374/api/transaction",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        const sortedTransactions = transactionResponse.data.sort(
          (a, b) => new Date(b.date) - new Date(a.date)
        );
        setTransactions(sortedTransactions);
      } catch (error) {
        console.error("Error fetching transactions:", error);
      }
    };

    fetchSummaryData();
    fetchTransactions();
    setLoading(false);
  }, []);

  return (
    <div className="h-full bg-gray-50 text-gray-800 min-h-screen">
      {/* Header Section */}
      <div className="border-b bg-white shadow-md rounded-lg py-4 px-6 mb-1">
        <div className="container mx-auto flex flex-wrap items-center justify-between gap-3">
          <p className="text-3xl font-bold text-gray-700">
            Hello, {username}! 👋
          </p>
        </div>
      </div>

      <div className="p-2 max-w-7xl mx-auto">
        {/* Stats Cards */}
        <StatsCard
          income={income}
          expense={expense}
          balance={balance}
          loading={loading}
        />

        {/* Charts Section */}
        <div className="mt-8 bg-white shadow-md rounded-lg p-6">
          <Charts />
        </div>

        {/* Recent Transactions Section */}
        <h2 className="text-2xl font-semibold text-gray-700 mt-8 mb-5">
          Recent Transactions
        </h2>
        <div className="bg-white shadow-md rounded-lg p-6">
          <DashboardTable transactions={transactions} />
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
