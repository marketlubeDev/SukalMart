"use client";

import { useState } from "react";

export default function AddressForm({ onBack, initialData, onSave }) {
  const [formData, setFormData] = useState({
    email: initialData?.email || "",
    country: initialData?.country || "",
    firstName: initialData?.firstName || "",
    lastName: initialData?.lastName || "",
    address: initialData?.address || "",
    city: initialData?.city || "",
    state: initialData?.state || "",
    pincode: initialData?.pincode || "",
    phone: initialData?.phone || ""
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSave = () => {
    onSave(formData);
    onBack();
  };

  return (
    <div className="space-y-6">
      {/* Account Info */}
      <div className="bg-white rounded-lg">
        <div className="flex items-center justify-between px-4 pt-4 pb-2">
          <div className="flex items-center space-x-2">
            <h3 className="text-xl font-semibold text-gray-800">Account info</h3>
            <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <button className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 underline">
            Login
          </button>
        </div>
        <div className="px-4 pb-4">
          <div className="space-y-2">
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              placeholder="Email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
            />
          </div>
        </div>
      </div>

      {/* Deliver to */}
      <div className="bg-white rounded-lg">
        <div className="px-4 pt-4 pb-2">
          <h3 className="text-xl font-semibold text-gray-800">Deliver to</h3>
        </div>
        <div className="px-4 pb-4 space-y-4">
          {/* Country/Region */}
          <div className="space-y-2">
            <select
              name="country"
              value={formData.country}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] appearance-none bg-white"
            >
              <option value="">Select Country/Region</option>
              <option value="IN">India</option>
              <option value="US">United States</option>
              <option value="UK">United Kingdom</option>
            </select>
          </div>

          {/* First Name and Last Name */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                placeholder="First name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
              />
            </div>
            <div className="space-y-2">
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                placeholder="Last name"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
              />
            </div>
          </div>

          {/* Address */}
          <div className="space-y-2">
            <div className="relative">
              <input
                type="text"
                name="address"
                value={formData.address}
                onChange={handleInputChange}
                placeholder="Address (Please check your address to ensure before it's complete before you proceed)"
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
              />
              <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
          </div>

          {/* City, State, Pincode */}
          <div className="grid grid-cols-3 gap-4">
            <div className="space-y-2">
              <input
                type="text"
                name="city"
                value={formData.city}
                onChange={handleInputChange}
                placeholder="City"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
              />
            </div>
            <div className="space-y-2">
              <input
                type="text"
                name="state"
                value={formData.state}
                onChange={handleInputChange}
                placeholder="State"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
              />
            </div>
            <div className="space-y-2">
              <input
                type="text"
                name="pincode"
                value={formData.pincode}
                onChange={handleInputChange}
                placeholder="Pincode"
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
              />
            </div>
          </div>

          {/* Phone Number */}
          <div className="space-y-2">
            <div className="relative">
              <input
                type="tel"
                name="phone"
                value={formData.phone}
                onChange={handleInputChange}
                placeholder="Phone number"
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-1 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)]"
              />
              <img src="/iicon.svg" alt="Info" className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4" />
            </div>
          </div>

          {/* Save Button */}
          <button
            onClick={handleSave}
            className="mt-4 px-4 py-2 border border-[var(--color-primary)] text-[var(--color-primary)] rounded hover:bg-[var(--color-primary)]/10 transition-colors"
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
} 