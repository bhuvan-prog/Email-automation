import React, { useState } from "react";
import {
  Mail,
  Lock,
  Server,
  Hash,
} from "lucide-react";

const SMTPForm = () => {
  const [smtpData, setSmtpData] =
    useState({
      host: "",
      port: "",
      username: "",
      password: "",
    });

  const handleChange = (e) => {
    setSmtpData({
      ...smtpData,
      [e.target.name]:
        e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(
      "SMTP Connected Successfully ✅"
    );
  };

  return (
    <div className="bg-white rounded-3xl border border-gray-100 shadow-sm p-8 max-w-3xl">
      {/* Header */}
      <div className="mb-8">
        <h2 className="text-2xl font-bold text-gray-800">
          SMTP Configuration
        </h2>

        <p className="text-gray-500 mt-2">
          Configure email server
          settings for automated
          outreach.
        </p>
      </div>

      <form
        onSubmit={handleSubmit}
        className="space-y-6"
      >
        {/* SMTP Host */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            SMTP Host
          </label>

          <div className="relative">
            <Server
              className="absolute left-4 top-4 text-gray-400"
              size={18}
            />

            <input
              type="text"
              name="host"
              placeholder="smtp.gmail.com"
              value={smtpData.host}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Port */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            SMTP Port
          </label>

          <div className="relative">
            <Hash
              className="absolute left-4 top-4 text-gray-400"
              size={18}
            />

            <input
              type="number"
              name="port"
              placeholder="587"
              value={smtpData.port}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Username */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Email Address
          </label>

          <div className="relative">
            <Mail
              className="absolute left-4 top-4 text-gray-400"
              size={18}
            />

            <input
              type="email"
              name="username"
              placeholder="admin@gmail.com"
              value={smtpData.username}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-medium text-gray-700 mb-2 block">
            Password
          </label>

          <div className="relative">
            <Lock
              className="absolute left-4 top-4 text-gray-400"
              size={18}
            />

            <input
              type="password"
              name="password"
              placeholder="••••••••"
              value={smtpData.password}
              onChange={handleChange}
              className="w-full pl-12 pr-4 py-4 rounded-2xl border border-gray-200 bg-gray-50 focus:ring-2 focus:ring-blue-500 outline-none"
            />
          </div>
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-4 rounded-2xl font-semibold hover:bg-blue-700 transition"
        >
          Connect SMTP
        </button>
      </form>
    </div>
  );
};

export default SMTPForm;