"use client";

import React from "react";

export default function HelpSupport() {
  const supportTopics = [
    {
      title: "Order Issues",
      description: "Track orders, returns, and refunds",
      icon: "📦"
    },
    {
      title: "Account & Payment",
      description: "Manage account settings and payment methods",
      icon: "👤"
    },
    {
      title: "Product Information",
      description: "Get details about products and availability",
      icon: "ℹ️"
    },
    {
      title: "Shipping & Delivery",
      description: "Information about shipping options and delivery",
      icon: "🚚"
    }
  ];

  return (
    <div className="bg-white rounded-lg p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-6">Help & Support</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
        {supportTopics.map((topic, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-4 hover:border-[#035F0F] transition-colors cursor-pointer">
            <div className="flex items-start space-x-3">
              <span className="text-2xl">{topic.icon}</span>
              <div>
                <h3 className="font-medium text-gray-900 mb-1">{topic.title}</h3>
                <p className="text-sm text-gray-600">{topic.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-6">
        <h3 className="font-medium text-gray-900 mb-4">Contact Us</h3>
        <div className="space-y-3">
          <div className="flex items-center space-x-3">
            <span className="text-[#035F0F]">📧</span>
            <span className="text-gray-700">support@souqalmart.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-[#035F0F]">📞</span>
            <span className="text-gray-700">+91 1800-123-4567</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-[#035F0F]">💬</span>
            <span className="text-gray-700">Live Chat (Available 24/7)</span>
          </div>
        </div>
      </div>
    </div>
  );
} 