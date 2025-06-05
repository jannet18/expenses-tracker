import React from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";

const CustomBarChart = ({ data }) => {
  const getBarColor = (index) => {
    return index % 2 === 0 ? "#1fcf31" : "#cfbefb";
  };

  const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-white shadow-md rounded-lg p-2 border-gray-300">
          <p className="text-xs font-semibold text-green-800 mb-1">
            {payload[0].payload.category}
          </p>
          <p className="text-sm font-bold text-green-600">
            Amount:{" "}
            <span className="text-sm font-medium text-gray-800">
              Ksh. {payload[0].payload.amount}
            </span>
          </p>
        </div>
      );
    }
    return null;
  };
  return (
    <ResponsiveContainer width="100%" height={300} className="">
      <BarChart data={data}>
        <CartesianGrid stroke="none" />
        <XAxis dataKey="month" tick={{ fontsize: 12, fill: "#555" }} />
        <YAxis tick={{ fontsize: 12, fill: "#555" }} stroke="none" />
        <Tooltip content={<CustomTooltip />} />
        <Bar
          dataKey="amount"
          fill="#FF8042"
          radius={[10, 10, 0, 0]}
          activeDot={{ r: 8, fill: "yellow" }}
          activeStyle={{ fill: "green" }}
        >
          {data.map((_, index) => (
            <Cell key={index} fill={getBarColor(index)} />
          ))}
        </Bar>
      </BarChart>
    </ResponsiveContainer>
  );
};

export default CustomBarChart;
