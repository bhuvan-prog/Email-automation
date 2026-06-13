import React, { useState } from "react";

const ProviderCard = ({
  name,
  description,
}) => {
  const [connected, setConnected] =
    useState(false);

  const handleConnect = () => {
    setConnected(!connected);
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-6 hover:shadow-md transition">
      <div className="flex justify-between items-start">
        <div>
          <h2 className="text-2xl font-bold text-gray-800">
            {name}
          </h2>

          <p className="text-gray-500 mt-2">
            {description}
          </p>
        </div>

        <div
          className={`px-4 py-2 rounded-xl text-sm font-semibold ${
            connected
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {connected
            ? "Connected"
            : "Disconnected"}
        </div>
      </div>

      <button
        onClick={handleConnect}
        className={`mt-6 w-full py-4 rounded-2xl font-semibold transition ${
          connected
            ? "bg-gray-200 text-gray-700"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {connected
          ? "Disconnect"
          : "Connect"}
      </button>
    </div>
  );
};

export default ProviderCard;