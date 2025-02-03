import React, { useEffect, useState } from 'react';
import { jwtDecode } from 'jwt-decode';
import { Skeleton, Card, Table, Tag } from 'antd';
import { TrendingUp, ArrowDownCircle, DollarSign } from 'lucide-react';
import axios from 'axios';
import { Line } from 'react-chartjs-2';
import 'chart.js/auto';

function Dashboard() {
  const [username, setUsername] = useState("");
  const [income, setIncome] = useState(null);
  const [expense, setExpense] = useState(null);
  const [balance, setBalance] = useState(null);
  const [transactions, setTransactions] = useState([]);
  const [chartData, setChartData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("accessToken");
    if (!token) {
      setIsAuthenticated(false);
      navigate("/login");
      return;
    }

    if (token) {
      try {
        const decoded = jwtDecode(token);
        setUsername(decoded.Username);
      } catch (error) {
        console.error("Error decoding token", error);
      }
    }
  }, []);

  useEffect(() => {
    const fetchSummaryData = async () => {
      try {
        setLoading(true);
        const token = localStorage.getItem("accessToken");
        const summaryResponse = await axios.get('https://localhost:44374/api/transaction/summary', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const { totalIncome, totalExpense, balance } = summaryResponse.data;

        setIncome(totalIncome);
        setExpense(totalExpense);
        setBalance(balance);
      } catch (error) {
        console.error('Error fetching summary data:', error);
      }
    };

    const fetchTransactions = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const transactionResponse = await axios.get('https://localhost:44374/api/transaction', {
          headers: { Authorization: `Bearer ${token}` },
        });
        const sortedTransactions = transactionResponse.data.sort((a, b) => new Date(b.date) - new Date(a.date));
        setTransactions(sortedTransactions.slice(0, 3));
      } catch (error) {
        console.error('Error fetching transactions:', error);
      }
    };

    const fetchChartData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get('https://localhost:44374/api/transaction', {
          headers: { Authorization: `Bearer ${token}` },
        });

        const sortedData = response.data.sort((a, b) => new Date(a.date) - new Date(b.date));
        const labels = sortedData.map((t) => new Date(t.date).toLocaleDateString());
        const incomeData = sortedData.map((t) => (t.type === 'Income' ? t.amount : 0));
        const expenseData = sortedData.map((t) => (t.type === 'Expense' ? t.amount : 0));

        setChartData({
          labels,
          datasets: [
            { label: 'Income', data: incomeData, borderColor: 'green', fill: false, tension: 0.4, pointRadius: 5 },
            { label: 'Expense', data: expenseData, borderColor: 'red', fill: false, tension: 0.4, pointRadius: 5 },],
        });
      } catch (error) {
        console.error('Error fetching chart data:', error);
      }
    };

    fetchSummaryData();
    fetchTransactions();
    fetchChartData();
    setLoading(false);
  }, []);

  return (
    <div className="h-full bg-gray-200">
      <div className='border-b bg-card'>
        <div className='container flex flex-wrap items-center justify-between gap-3 py-3'>
          <p className='text-3xl font-bold'>&nbsp;Hello, {username}! 👋</p>
        </div>
      </div>
      <div style={{ padding: '5px' }}>
        {/* Stats Cards */}
        <div className="flex justify-between gap-4 mt-8 ">
          {/* Income Card */}
          <Card className='flex flex-1 items-center gap-4 p-4' style={{ background: '#536878', color: 'white' }}>
            <div className="flex items-center gap-4">
              <TrendingUp size={40} className="text-blue-500" />
              <div className='flex flex-col'>
                <p className='text-muted-foreground'>Income</p>
                <Skeleton loading={loading} active>
                  <p className='text-xl font-semibold'>₹{income?.toLocaleString()}</p>
                </Skeleton>
              </div>
            </div>
          </Card>

          {/* Expense Card */}
          <Card className='flex flex-1 items-center gap-4 p-4' style={{ background: '#536878', color: 'white' }}>
            <div className="flex items-center gap-4">
              <ArrowDownCircle size={40} className="text-blue-500" />
              <div className='flex flex-col'>
                <p className='text-muted-foreground'>Expense</p>
                <Skeleton loading={loading} active>
                  <p className='text-xl font-semibold'>₹{expense?.toLocaleString()}</p>
                </Skeleton>
              </div>
            </div>
          </Card>

          {/* Balance Card */}
          <Card className='flex flex-1 items-center gap-4 p-4' style={{ background: '#536878', color: 'white' }}>
            <div className="flex items-center gap-4">
              <DollarSign size={40} className="text-blue-500" />
              <div className='flex flex-col'>
                <p className='text-muted-foreground'>Balance</p>
                <Skeleton loading={loading} active>
                  <p className='text-xl font-semibold'>₹{balance?.toLocaleString()}</p>
                </Skeleton>
              </div>
            </div>
          </Card>
        </div>
        <div className='max-h-auto w-full'>
          {chartData && (
            <div style={{ width: '80%', height: '450px', margin: '0 auto' }}>
              <Line data={chartData} />
            </div>
          )}
        </div>
        

        <h2 className='mt-8'>Recent Transactions</h2>
        <Table dataSource={transactions} rowKey="id">
          <Table.Column  title="Description" dataIndex="description" key="description" />
          <Table.Column title="Amount" dataIndex="amount" key="amount" render={(amount) => `₹${amount}`} />
          <Table.Column title="Type" dataIndex="type" key="type" render={(type) => (
            <Tag color={type === 'Income' ? 'green' : 'red'}>{type}</Tag>
          )} />
          <Table.Column title="Date" dataIndex="date" key="date" render={(date) => new Date(date).toLocaleDateString()} />
        </Table>
      </div>
    </div>
  );
}

export default Dashboard;
