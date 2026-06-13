import React from "react";
import { Bell, Search } from "lucide-react";

const Navbar = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-8 py-5 flex justify-between items-center shadow-sm">
      {/* Left */}
      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          Dashboard
        </h1>

        <p className="text-gray-500 text-sm">
          Welcome back 👋
        </p>
      </div>

      {/* Right */}
      <div className="flex items-center gap-5">
        {/* Search */}
        <div className="relative">
          <Search
            className="absolute left-3 top-3 text-gray-400"
            size={18}
          />

          <input
            type="text"
            placeholder="Search..."
            className="pl-10 pr-4 py-2 rounded-xl border border-gray-200 bg-gray-50 outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Notification */}
        <button className="bg-blue-50 p-3 rounded-xl hover:bg-blue-100 transition">
          <Bell
            className="text-blue-600"
            size={20}
          />
        </button>

        {/* Profile */}
        <div className="flex items-center gap-3 bg-gray-50 px-4 py-2 rounded-xl">
          <img
            src="https://i.pravatar.cc/45"
            alt="profile"
            className="rounded-full"
          />

          <div>
            <h3 className="font-semibold text-gray-800">
              Admin
            </h3>

            <p className="text-xs text-gray-500">
              Team Manager
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;