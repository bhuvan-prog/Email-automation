import React from "react";
import { Link, useLocation } from "react-router-dom";
import {
  Workflow,
  BarChart3,
  Mail,
  Settings,
  Plug,
} from "lucide-react";

const Sidebar = () => {
  const location = useLocation();

  const menuItems = [
    {
      name: "Workflow",
      path: "/workflow",
      icon: <Workflow size={20} />,
    },
    {
      name: "Analytics",
      path: "/analytics",
      icon: <BarChart3 size={20} />,
    },
    {
      name: "Email Tracking",
      path: "/email-tracking",
      icon: <Mail size={20} />,
    },
    {
      name: "SMTP Settings",
      path: "/smtp",
      icon: <Settings size={20} />,
    },
    {
      name: "Integrations",
      path: "/integrations",
      icon: <Plug size={20} />,
    },
  ];

  return (
    <div className="w-72 min-h-screen bg-white border-r border-gray-200 shadow-sm flex flex-col">
      {/* Logo */}
      <div className="px-8 py-8 border-b border-gray-100">
        <h1 className="text-2xl font-bold text-blue-600">
          LinkedIn CRM
        </h1>

        <p className="text-sm text-gray-500 mt-1">
          Automation Platform
        </p>
      </div>

      {/* Menu */}
      <div className="flex-1 p-5 space-y-2">
        {menuItems.map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={`flex items-center gap-4 px-5 py-4 rounded-2xl transition-all duration-300 font-medium ${
              location.pathname === item.path
                ? "bg-blue-600 text-white shadow-md"
                : "text-gray-700 hover:bg-blue-50 hover:text-blue-600"
            }`}
          >
            {item.icon}
            {item.name}
          </Link>
        ))}
      </div>

      {/* Bottom */}
      <div className="p-5 border-t border-gray-100">
        <div className="bg-blue-50 rounded-2xl p-4">
          <p className="text-sm text-gray-600">
            🚀 Automation Running
          </p>

          <h2 className="font-semibold text-blue-700 mt-1">
            12 Active Campaigns
          </h2>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;