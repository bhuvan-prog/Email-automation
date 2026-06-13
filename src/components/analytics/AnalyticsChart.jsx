import React from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const data = [
  { day: "Mon", value: 120 },
  { day: "Tue", value: 240 },
  { day: "Wed", value: 180 },
  { day: "Thu", value: 300 },
  { day: "Fri", value: 420 },
  { day: "Sat", value: 280 },
  { day: "Sun", value: 350 },
];

const AnalyticsChart = ({
  title,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 h-[420px]">
      <div className="flex justify-between items-center mb-5">
        <div>
          <h2 className="text-xl font-bold text-gray-800">
            {title}
          </h2>

          <p className="text-sm text-gray-500 mt-1">
            Weekly performance overview
          </p>
        </div>

        <button className="bg-blue-50 text-blue-600 px-4 py-2 rounded-xl hover:bg-blue-100 transition">
          Last 7 Days
        </button>
      </div>

      <ResponsiveContainer
        width="100%"
        height="85%"
      >
        <LineChart data={data}>
          <CartesianGrid strokeDasharray="3 3" />

          <XAxis dataKey="day" />
          <YAxis />
          <Tooltip />

          <Line
            type="monotone"
            dataKey="value"
            stroke="#2563eb"
            strokeWidth={3}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AnalyticsChart;