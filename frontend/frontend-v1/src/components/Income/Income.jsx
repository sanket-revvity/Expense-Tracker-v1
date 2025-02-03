import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { Banknote,Pencil, Bitcoin, Calendar, DollarSign, FileText, Landmark, Trash2, Youtube } from "lucide-react";
import { format } from "date-fns";

function Income() {
  const [categories, setCategories] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [description, setDescription] = useState("");
  const [amount, setAmount] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [date, setDate] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);
  const [modalVisibility, setModalVisibility] = useState(false) // state for whether the modal dialog box should be visible or not
  const [editTransaction, seteditTransaction] = useState(null) // it is new state to track the transaction that is being updated
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
      type: "Income",
    };

    axios
      .post("https://localhost:44374/api/transaction", transactionData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        alert("Transaction added successfully");
        setTransactions([...transactions, response.data]);
        setDescription("");
        setAmount("");
        setCategoryId("");
        setDate("");
      })
      .catch((error) => {
        console.error("Error adding transaction:", error);
        alert("Error adding transaction");
      });
  };


  const handleDelete = (id) => {
    const token = localStorage.getItem("accessToken");
    axios
      .delete(`https://localhost:44374/api/transaction/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(() => {
        setTransactions(transactions.filter((item) => item.id !== id));
      })
      .catch((error) => console.error("Error deleting transaction:", error));
  };

  const handleUpdate = () => {
      const token = localStorage.getItem("accessToken");
      if(!token){
        alert("User not authorized");
        return
      }

      const updatedTransaction = {
        categoryId,
        amount: parseFloat(amount),
        description,
        date,
        type: "Income"
      }
      
      axios.put(`https://localhost:44374/api/transaction/${editTransaction.id}`, updatedTransaction,{
        headers :{
          Authorization : `Bearer ${token}`,
        }  
      }).then((res) => {
        setTransactions(transactions.map((item) => {
            item.id === editTransaction.id ? response.data : item
        }))
        setModalVisibility(false)
        alert("Updated Successfully....")

      }).catch((error) =>{
        console.error("Error Updating transaction ", error);
        alert("Update not successful");
        
      })
  }

  // Pagination Logic
  const indexOfLastTransaction = currentPage * transactionsPerPage;
  const indexOfFirstTransaction = indexOfLastTransaction - transactionsPerPage;
  const currentTransactions = transactions.slice(indexOfFirstTransaction, indexOfLastTransaction);
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

  const categoryIcon = (category) => {
    console.log("Category:", category);
    console.log(transactions);
    
    switch (category) {
      case "Salary":
        return <Banknote/>
      case "Investments":
        return <Landmark />
      case "Stocks":
        return <DollarSign />;
      case "Bitcoin":
        return <Bitcoin />;
      case "Freelancing":
        return <Banknote />
      case "Bank":
        return <Landmark/>
      case "Youtube":
        return <Youtube/>
      case "other":
      default:
        return <FileText />;
    }
  };

  return isAuthenticated ? (
    <div className="bg-gray-100 rounded-2xl shadow-md h-full p-6">
      <div className="grid grid-cols-[40%_60%] h-full">
        {/* Income Form */}
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
                  <option key={category.id} value={category.id}>{category.name}</option>
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
            <button type="submit" className="w-full bg-gray-700 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
              Add Transaction
            </button>
          </form>
        </div>

        {/* Display Transactions with Pagination */}
        <div className="bg-gray-300 m-2 p-2 rounded-2xl">
          <h2 className="text-xl font-semibold mb-4 text-center">Income Transactions</h2>
          <div className="max-h-[450px] overflow-y-auto">
            {currentTransactions.length === 0 ? (
              <p className="text-center text-gray-600">No transactions found</p>
            ) : (
              currentTransactions.map((transaction) => (
                <div key={transaction.id} className="flex justify-between items-center p-3 border-b bg-white rounded-lg mb-2 shadow-md">
                  <div className="flex items-center gap-4">
                    <span className="text-gray-600 text-2xl">{categoryIcon(transaction.categoryName)}</span>
                    <div>
                      <p className="text-lg font-medium">{transaction.description}</p>
                      <p className="text-gray-500 flex items-center">₹{transaction.amount}</p>
                      <p className="text-gray-500 flex items-center"><Calendar size={14} className="mr-1" />{format(new Date(transaction.date), "yyyy-MM-dd HH:mm")}</p>
                    </div>
                  </div>
                  <main>
                  {/* <button className="hover:text-green-400"><Pencil size={18} className="mr-1" /></button> */}
                  <button onClick={() => handleDelete(transaction.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button>
                  </main>
                  {/* <button><Pencil size={18} /></button>
                  <button onClick={() => handleDelete(transaction.id)} className="text-red-500 hover:text-red-700"><Trash2 size={18} /></button> */}
                </div>
              ))
            )}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-4">
            <button onClick={prevPage} disabled={currentPage === 1} className="px-3 py-1 mx-1 bg-gray-700 text-white rounded">Prev</button>
            
            {/* Page Numbers */}
            {[...Array(totalPages)].map((_, index) => (
              <button
                key={index + 1}
                onClick={() => paginate(index + 1)}
                className={`px-3 py-1 mx-1 ${currentPage === index + 1 ? "bg-gray-400 text-white" : "bg-gray-300 text-black"} rounded`}
              >
                {index + 1}
              </button>
            ))}
            
            <button onClick={nextPage} disabled={currentPage >= totalPages} className="px-3 py-1 mx-1 bg-gray-700 text-white rounded">Next</button>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <p className="text-red-500 text-center">You are not authorized.</p>
  );
}

export default Income;
