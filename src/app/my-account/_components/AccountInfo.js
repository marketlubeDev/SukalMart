"use client";

import React, { useState } from "react";

export default function AccountInfo() {
  const [isEditing, setIsEditing] = useState(false);
  const [userData, setUserData] = useState({
    email: "muhsinachachu8446@gmail.com",
    name: "Muhsina Chachu",
    phone: "+91 98765 43210"
  });

  const handleLogout = () => {
    // Handle logout logic here
    console.log("Logging out...");
  };

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Personal Info</h2>
        <button
          onClick={() => setIsEditing(!isEditing)}
          className="px-4 py-2 bg-[#035F0F] text-white rounded-md hover:bg-[#035F0F]/90 transition-colors"
        >
          Edit Info
        </button>
      </div>

      <div className="space-y-6">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="w-20 h-20 bg-gray-300 rounded-full flex items-center justify-center mb-4">
            <svg className="w-10 h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>

        {/* Email */}
        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-900">Email</label>
          <p className="text-gray-700">{userData.email}</p>
        </div>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* Logout Button */}
        <button
          onClick={handleLogout}
          className="px-4 py-2 bg-transparent border border-[#035F0F] text-[#035F0F] rounded-md hover:bg-[#035F0F]/10 transition-colors"
        >
          Logout
        </button>
      </div>
    </div>
  );
} 