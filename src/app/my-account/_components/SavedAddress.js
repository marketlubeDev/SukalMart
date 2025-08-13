"use client";

import React from "react";

export default function SavedAddress() {
  const savedAddresses = [
    {
      id: 1,
      name: "Sample Username",
      address: "House No. 12, Vattiyoorkavu, 695013, Thiruvananthapuram, KL, IN",
      phone: "+91 9999 444 555",
      isDefault: true
    },
    {
      id: 2,
      name: "Work Address",
      address: "Office Building, Technopark, 695581, Thiruvananthapuram, KL, IN",
      phone: "+91 8888 777 666",
      isDefault: false
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-gray-900">Saved Addresses</h2>
        <button className="px-4 py-2 bg-[#035F0F] text-white rounded-md hover:bg-[#035F0F]/90 transition-colors">
          Add New Address
        </button>
      </div>

      <div className="space-y-4">
        {savedAddresses.map((address) => (
          <div key={address.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <div className="flex items-center space-x-2 mb-2">
                  <h3 className="font-medium text-gray-900">{address.name}</h3>
                  {address.isDefault && (
                    <span className="px-2 py-1 bg-green-100 text-green-800 text-xs rounded-full">
                      Default
                    </span>
                  )}
                </div>
                <p className="text-gray-600 text-sm mb-1">{address.address}</p>
                <p className="text-gray-600 text-sm">{address.phone}</p>
              </div>
              <div className="flex space-x-2">
                <button className="text-[#035F0F] hover:text-[#035F0F]/80 text-sm">
                  Edit
                </button>
                <button className="text-red-600 hover:text-red-700 text-sm">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
} 