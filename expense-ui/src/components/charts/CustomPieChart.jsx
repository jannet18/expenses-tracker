import React from "react";
import {
  Cell,
  Legend,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import CustomTooltip from "./CustomTooltip";
import CustomLegend from "./CustomLegend";

const CutomPieChart = ({
  data,
  label,
  totalAmount,
  colors,
  showTextAnchor,
}) => {
  return (
    <ResponsiveContainer width="100%" height={380}>
      <PieChart>
        <Pie
          data={data}
          dataKey="amount"
          nameKey="name"
          cx="50%"
          cy="50%"
          outerRadius={130}
          innerRadius={100}
          labelLine={false}
          label={({ name, percent }) =>
            `${name}: ${(percent * 100).toFixed(0)}%`
          }
        >
          {data.map((_, index) => (
            <Cell
              key={`cell-${index}`}
              fill={colors[index % colors?.length] || "#ccc"}
            />
          ))}
        </Pie>
        <Tooltip content={<CustomTooltip />} />
        <Legend content={<CustomLegend />} />
        {showTextAnchor && (
          <div className="text-center mt-2">
            <p className="text-sm font-medium">{label}</p>
            <p className="text-lg font-bold">{totalAmount}</p>
          </div>
          // <>
          //   <text
          //     x="50%"
          //     y="50%"
          //     dy={-25}
          //     textAnchor="middle"
          //     fill="#666"
          //     fontSize="14px"
          //   >
          //     {label}
          //   </text>
          //   <text
          //     x="50%"
          //     y="50%"
          //     dy={8}
          //     textAnchor="middle"
          //     fill="#333"
          //     fontSize="24px"
          //     fontWeight="semi-bold"
          //   >
          //     {totalAmount}
          //   </text>
          // </>
        )}
      </PieChart>
    </ResponsiveContainer>
  );
};

export default CutomPieChart;
