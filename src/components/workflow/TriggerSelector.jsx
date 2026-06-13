import React from "react";
import {
  UserPlus,
  Mail,
  MessageCircle,
  Rocket,
  User,
} from "lucide-react";

const triggers = [
  {
    id: 1,
    name: "Connection Accepted",
    icon: <UserPlus size={20} />,
  },
  {
    id: 2,
    name: "Email Opened",
    icon: <Mail size={20} />,
  },
  {
    id: 3,
    name: "Message Replied",
    icon: <MessageCircle size={20} />,
  },
  {
    id: 4,
    name: "Campaign Started",
    icon: <Rocket size={20} />,
  },
  {
    id: 5,
    name: "New Lead Added",
    icon: <User size={20} />,
  },
];

const TriggerSelector = () => {
  return (
    <div className="bg-white rounded-3xl shadow-sm border border-gray-100 p-6">
      <h2 className="text-xl font-bold text-gray-800">
        Triggers
      </h2>

      <p className="text-gray-500 text-sm mt-1 mb-5">
        Choose workflow trigger
      </p>

      <div className="space-y-3">
        {triggers.map((trigger) => (
          <button
            key={trigger.id}
            className="w-full flex items-center gap-4 p-4 rounded-2xl border border-gray-200 hover:border-blue-500 hover:bg-blue-50 transition"
          >
            <div className="bg-blue-100 text-blue-600 p-3 rounded-xl">
              {trigger.icon}
            </div>

            <span className="font-medium text-gray-700">
              {trigger.name}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
};

export default TriggerSelector;