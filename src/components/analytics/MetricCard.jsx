import React from "react";

const MetricCard = ({
  title,
  value,
  growth,
}) => {
  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <p className="text-gray-500 text-sm font-medium">
            {title}
          </p>

          <h2 className="text-4xl font-bold text-gray-800 mt-3">
            {value}
          </h2>
        </div>

        <div className="bg-blue-100 text-blue-600 px-3 py-2 rounded-xl text-sm font-semibold">
          {growth}
        </div>
      </div>
    </div>
  );
};

export default MetricCard;