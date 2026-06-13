import React, { useState } from "react";
import { Clock } from "lucide-react";

const DelayModal = () => {
  const [days, setDays] = useState(1);
  const [hours, setHours] = useState(0);

  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
      <div className="flex items-center gap-3 mb-5">
        <div className="bg-blue-100 p-3 rounded-xl">
          <Clock className="text-blue-600" />
        </div>

        <div>
          <h2 className="text-xl font-bold text-gray-800">
            Delay Settings
          </h2>

          <p className="text-gray-500 text-sm">
            Configure wait time
          </p>
        </div>
      </div>

      <div className="space-y-5">
        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Days
          </label>

          <input
            type="number"
            value={days}
            onChange={(e) =>
              setDays(e.target.value)
            }
            className="w-full border border-gray-200 rounded-2xl p-4 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <div>
          <label className="block mb-2 font-medium text-gray-700">
            Hours
          </label>

          <input
            type="number"
            value={hours}
            onChange={(e) =>
              setHours(e.target.value)
            }
            className="w-full border border-gray-200 rounded-2xl p-4 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
          />
        </div>

        <button className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold hover:bg-blue-700 transition">
          Save Delay
        </button>
      </div>
    </div>
  );
};

export default DelayModal;