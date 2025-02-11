import React from "react";
import { Table, Tag } from "antd";
function DashboardTable({ transactions }) {
  return (
    <Table
      dataSource={transactions}
      rowKey="id"
      bordered
      pagination={{ pageSize: 5 }}
      className="rounded-lg overflow-hidden bg-gray-900 text-white"
      components={{
        header: {
          cell: (props) => (
            <th
              {...props}
              style={{
                background: "linear-gradient(to right, #4a5568, #2d3748)",
                color: "white",
                textAlign: "center",
                padding: "12px",
                borderRadius: "6px",
              }}
            />
          ),
        },
      }}
      style={{
        backgroundColor: "transparent",
        color: "white",
      }}
    >
      <Table.Column
        title="Description"
        dataIndex="description"
        key="description"
        render={(text) => <span className="text-slate-700">{text}</span>}
      />
      <Table.Column
        title="Amount"
        dataIndex="amount"
        key="amount"
        render={(amount, record) => (
          <span
            className={`font-semibold ${
              record.type === "Income" ? "text-green-600" : "text-red-600"
            }`}
          >
            ₹{amount.toLocaleString()}
          </span>
        )}
      />
      <Table.Column
        title="Type"
        dataIndex="type"
        key="type"
        render={(type) => (
          <Tag
            color={type === "Income" ? "green" : "red"}
            className="px-2 py-1 font-medium"
          >
            {type}
          </Tag>
        )}
      />
      <Table.Column
        title="Date"
        dataIndex="date"
        key="date"
        render={(date) => (
          <span className="text-slate-700">
            {new Date(date).toLocaleDateString()}
          </span>
        )}
      />
    </Table>
  );
}

export default DashboardTable;
