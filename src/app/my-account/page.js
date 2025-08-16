"use client";

import React, { useState, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import AccountInfo from "./_components/AccountInfo";
import SavedAddress from "./_components/SavedAddress";
import MyOrders from "./_components/MyOrders";
import HelpSupport from "./_components/HelpSupport";
import PrivacyPolicy from "./_components/PrivacyPolicy";

function MyAccountContent() {
  const searchParams = useSearchParams();
  const tabParam = (searchParams.get("tab") || "").toLowerCase();

  const mapParamToTab = (param) => {
    switch (param) {
      case "account":
      case "info":
        return "Account Info";
      case "addresses":
      case "saved-address":
      case "saved-addresses":
        return "Saved Address";
      case "orders":
      case "my-orders":
      case "order-history":
        return "My Orders";
      case "help":
      case "support":
        return "Help & Support";
      case "privacy":
      case "policy":
      case "privacy-policy":
        return "Privacy & Policy";
      default:
        return "Account Info";
    }
  };

  const [activeTab, setActiveTab] = useState(mapParamToTab(tabParam));

  const tabs = [
    "Account Info",
    "Saved Address", 
    "My Orders",
    "Help & Support",
    "Privacy & Policy"
  ];

  const renderTabContent = () => {
    switch (activeTab) {
      case "Account Info":
        return <AccountInfo />;
      case "Saved Address":
        return <SavedAddress />;
      case "My Orders":
        return <MyOrders />;
      case "Help & Support":
        return <HelpSupport />;
      case "Privacy & Policy":
        return <PrivacyPolicy />;
      default:
        return <AccountInfo />;
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-2">My account</h1>
          <p className="text-sm sm:text-base text-gray-600">
            Access and manage your personal information, orders, saved addresses, and support preferences.
          </p>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-4xl mx-auto px-4 sm:px-6">
          <div className="flex space-x-4 sm:space-x-8 overflow-x-auto scrollbar-hide">
            {tabs.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`py-3 sm:py-4 px-1 border-b-2 font-medium text-xs sm:text-sm whitespace-nowrap transition-colors ${
                  activeTab === tab
                    ? "border-[#035F0F] text-[#035F0F]"
                    : "border-transparent text-gray-500 hover:text-gray-700"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-4xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        <div className="bg-[#F5F5F5] rounded-lg p-4 sm:p-8">
          {renderTabContent()}
        </div>
      </div>
    </div>
  );
}

export default function MyAccountPage() {
  return (
    <Suspense fallback={
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#035F0F] mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    }>
      <MyAccountContent />
    </Suspense>
  );
} 