import React, { useEffect, useState } from "react";
import axios from "axios";
import { Line, Doughnut } from "react-chartjs-2";

function Charts() {
  const [chartData, setChartData] = useState(null);
  const [pieChartData, setPieChartData] = useState(null);
  useEffect(() => {
    const fetchChartData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          "https://localhost:44374/api/transaction",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const sortedData = response.data.sort(
          (a, b) => new Date(a.date) - new Date(b.date)
        );
        const labels = sortedData.map((t) =>
          new Date(t.date).toLocaleDateString()
        );
        const incomeData = sortedData.map((t) =>
          t.type === "Income" ? t.amount : 0
        );
        const expenseData = sortedData.map((t) =>
          t.type === "Expense" ? t.amount : 0
        );

        setChartData({
          labels,
          datasets: [
            {
              label: "Income",
              data: incomeData,
              borderColor: "rgba(34, 197, 94, 1)",
              backgroundColor: "rgba(34, 197, 94, 0.2)",
              fill: true,
              tension: 0.4,
              pointRadius: 6,
              pointHoverRadius: 8,
            },
            {
              label: "Expense",
              data: expenseData,
              borderColor: "rgba(239, 68, 68, 1)",
              backgroundColor: "rgba(239, 68, 68, 0.2)",
              fill: true,
              tension: 0.4,
              pointRadius: 6,
              pointHoverRadius: 8,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching chart data:", error);
      }
    };

    const fetchPieChartData = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await axios.get(
          "https://localhost:44374/api/transaction/cat-spend",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );

        const labels = response.data.map((item) => item.categoryName);
        const data = response.data.map((item) => item.totalAmount);
        const backgroundColors = [
          "rgba(255, 99, 132, 0.7)",
          "rgba(54, 162, 235, 0.7)",
          "rgba(255, 206, 86, 0.7)",
          "rgba(75, 192, 192, 0.7)",
          "rgba(153, 102, 255, 0.7)",
          "rgba(255, 159, 64, 0.7)",
        ];

        setPieChartData({
          labels,
          datasets: [
            {
              label: "Category Spending",
              data,
              backgroundColor: backgroundColors,
              hoverBackgroundColor: backgroundColors.map((color) =>
                color.replace("0.7", "1")
              ),
              borderWidth: 2,
              hoverOffset: 20,
            },
          ],
        });
      } catch (error) {
        console.error("Error fetching pie chart data:", error);
      }
    };

    fetchChartData();
    fetchPieChartData();
  }, []);
  return (
    <div className="flex justify-center gap-3 mt-8">
      {chartData && (
        <div style={{ width: "65%", height: "400px" }}>
          <Line data={chartData} />
        </div>
      )}
      {pieChartData && (
        <div style={{ width: "35%", height: "400px" }}>
          <Doughnut data={pieChartData} />
        </div>
      )}
    </div>
  );
}

export default Charts;
