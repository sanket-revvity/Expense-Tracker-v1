import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";
import IncomeForm from "./IncomeForm";
import TransactionList from "./TransactionList";
import PaginationControls from "./PaginationControls";

function Income() {
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [alert, setAlert] = useState({
    open: false,
    message: "",
    severity: "success",
  });
  const transactionsPerPage = 4;
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setIsAuthenticated(false);
      navigate("/login");
      return;
    }

    axios
      .get("https://localhost:44374/api/category")
      .then((response) => setCategories(response.data))
      .catch((error) => console.error("Error fetching categories:", error));

    axios
      .get("https://localhost:44374/api/transaction/income", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => setTransactions(response.data))
      .catch((error) => console.error("Error fetching transactions:", error));
  }, [navigate]);

  const handleDelete = (id) => {
    const token = localStorage.getItem("accessToken");
    axios
      .delete(`https://localhost:44374/api/transaction/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setAlert({
          open: true,
          message: "Transaction deleted successfully",
          severity: "success",
        });
        setTransactions(transactions.filter((item) => item.id !== id));
      })
      .catch((error) => {
        console.error("Error deleting transaction:", error);
        setAlert({
          open: true,
          message: "Error deleting transaction",
          severity: "error",
        });
      });
  };

  const handleUpdate = async (id, updatedTransaction) => {
    const token = localStorage.getItem("accessToken");
    console.log("Updating transaction:", updatedTransaction); // Log the data being sent
    try {
      const response = await axios.put(
        `https://localhost:44374/api/transaction/${id}`,
        { ...updatedTransaction, type: String(updatedTransaction.type) },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const updatedTransactions = transactions.map((transaction) =>
        transaction.id === id
          ? {
              ...response.data,
              categoryName: categories.find(
                (cat) => cat.id === response.data.categoryId
              )?.name,
            }
          : transaction
      );
      setTransactions(updatedTransactions);
      setAlert({
        open: true,
        message: "Transaction updated successfully!",
        severity: "success",
      });
    } catch (error) {
      console.error("Error updating transaction:", error);
      setAlert({
        open: true,
        message: "Error updating transaction",
        severity: "error",
      });
    }
  };

  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(
    indexOfFirstTransaction,
    indexOfLastTransaction
  );
  const totalPages = Math.ceil(transactions.length / transactionsPerPage);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  const nextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const prevPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  return isAuthenticated ? (
    <div className="bg-gray-100 rounded-2xl shadow-md h-full p-6">
      <div className="grid grid-cols-[40%_60%] h-full">
        <IncomeForm
          categories={categories}
          setTransactions={setTransactions}
          setAlert={setAlert}
        />
        <div className="bg-gray-300 m-2 p-2 rounded-2xl">
          <TransactionList
            transactions={currentTransactions}
            categories={categories}
            onDelete={handleDelete}
            onUpdate={handleUpdate}
          />
          <PaginationControls
            currentPage={currentPage}
            totalPages={totalPages}
            paginate={paginate}
            prevPage={prevPage}
            nextPage={nextPage}
          />
        </div>
      </div>

      <Snackbar
        open={alert.open}
        autoHideDuration={2000}
        onClose={() => setAlert({ ...alert, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
      >
        <Alert
          onClose={() => setAlert({ ...alert, open: false })}
          severity={alert.severity}
          variant="filled"
        >
          {alert.message}
        </Alert>
      </Snackbar>
    </div>
  ) : (
    <p className="text-red-500 text-center">You are not authorized.</p>
  );
}

export default Income;
