import React from "react";
import { TrendingUp, ArrowDownCircle, DollarSign } from "lucide-react";
import { Skeleton } from "antd";
import CountUp from "react-countup";

function StatsCard({ income, expense, balance, loading }) {
  return (
    <div className="grid grid-cols-3 gap-4 mt-8">
      {[
        {
          label: "Income",
          value: income,
          icon: <TrendingUp />,
          color: "text-green-400",
        },
        {
          label: "Expense",
          value: expense,
          icon: <ArrowDownCircle />,
          color: "text-red-400",
        },
        {
          label: "Balance",
          value: balance,
          icon: <DollarSign />,
          color: "text-yellow-400",
        },
      ].map(({ label, value, icon, color }, index) => (
        <div
          key={index}
          className="flex items-center gap-4 p-7 rounded-2xl shadow-lg bg-gradient-to-br from-gray-800 to-gray-700 text-white"
        >
          <div className={`p-3 rounded-full bg-gray-900 ${color}`}>{icon}</div>
          <div className="flex flex-col">
            <p className="text-gray-300">{label}</p>
            <Skeleton loading={loading} active>
              <p className="text-xl font-semibold">
                <CountUp
                  start={0}
                  end={value || 0}
                  duration={3}
                  separator=","
                />
              </p>
            </Skeleton>
          </div>
        </div>
      ))}
    </div>
  );
}

export default StatsCard;
