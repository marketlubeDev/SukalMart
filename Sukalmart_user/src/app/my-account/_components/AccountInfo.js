"use client";

import React, { useState } from "react";
import Button from "@/app/_components/common/Button";

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
    <div className="bg-white rounded-lg p-3 sm:p-4 md:p-6">
      <div className="flex items-center justify-between mb-4 sm:mb-5 md:mb-6">
        <h2 className="text-lg sm:text-xl md:text-xl font-semibold text-gray-900">Personal Info</h2>
        <Button
          variant="primary"
          size="large"  

          onClick={() => setIsEditing(!isEditing)}
          className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-[var(--color-primary)] text-white rounded-md transition-colors cursor-pointer text-xs sm:text-sm md:text-base"
          style={{
            backgroundColor: "var(--color-primary)",
            transition: "background-color 0.2s"
          }}
          onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#520a1e")}
          onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--color-primary)")}
        >
          Edit Info
        </Button>
      </div>

      <div className="space-y-4 sm:space-y-5 md:space-y-6">
        {/* Avatar */}
        <div className="flex flex-col items-center">
          <div className="w-16 h-16 sm:w-18 sm:h-18 md:w-20 md:h-20 bg-gray-300 rounded-full flex items-center justify-center mb-3 sm:mb-4">
            <svg className="w-8 h-8 sm:w-9 sm:h-9 md:w-10 md:h-10 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
            </svg>
          </div>
        </div>

        {/* Email */}
        <div className="space-y-1 sm:space-y-2">
          <label className="block text-xs sm:text-sm font-medium text-gray-900">Email</label>
          <p className="text-sm sm:text-base text-gray-700">{userData.email}</p>
        </div>

        {/* Divider */}
        <hr className="border-gray-200" />

        {/* Logout Button */}
        <Button
          variant="secondary"
          size="large" 
           
          onClick={handleLogout}
          className="px-2 py-1 sm:px-3 sm:py-1.5 md:px-4 md:py-2 bg-transparent border border-[var(--color-primary)] text-[var(--color-primary)] rounded-md hover:bg-[var(--color-primary)]/10 transition-colors cursor-pointer text-xs sm:text-sm md:text-base"
        >
          Logout
        </Button>
      </div>
    </div>
  );
} 