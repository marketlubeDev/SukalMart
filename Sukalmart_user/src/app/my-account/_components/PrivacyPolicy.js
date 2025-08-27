"use client";

import React from "react";

export default function PrivacyPolicy() {
  const privacySections = [
    {
      title: "Data Collection",
      content: "We collect information you provide directly to us, such as when you create an account, make a purchase, or contact us for support."
    },
    {
      title: "Data Usage",
      content: "We use your information to process orders, provide customer support, send you updates about your orders, and improve our services."
    },
    {
      title: "Data Sharing",
      content: "We do not sell your personal information. We may share your information with third-party service providers who assist us in operating our website and providing services."
    },
    {
      title: "Data Security",
      content: "We implement appropriate security measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction."
    },
    {
      title: "Your Rights",
      content: "You have the right to access, update, or delete your personal information. You can also opt out of marketing communications at any time."
    },
    {
      title: "Cookies",
      content: "We use cookies and similar technologies to enhance your browsing experience, analyze site traffic, and understand where our visitors are coming from."
    }
  ];

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">Privacy & Policy</h2>

      <div className="space-y-4 sm:space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
          <div className="flex items-start space-x-3">
            <span className="text-blue-600 text-lg sm:text-xl">ℹ️</span>
            <div>
              <h3 className="font-medium text-blue-900 mb-1 text-sm sm:text-base">Last Updated</h3>
              <p className="text-blue-700 text-xs sm:text-sm">January 15, 2024</p>
            </div>
          </div>
        </div>

        <div className="space-y-4 sm:space-y-6">
          {privacySections.map((section, index) => (
            <div key={index} className="border-b border-gray-200 pb-4 sm:pb-6 last:border-b-0">
              <h3 className="font-medium text-gray-900 mb-2 text-sm sm:text-base">{section.title}</h3>
              <p className="text-gray-600 text-xs sm:text-sm leading-relaxed">{section.content}</p>
            </div>
          ))}
        </div>

        <div className="bg-gray-50 rounded-lg p-3 sm:p-4">
          <h3 className="font-medium text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">Contact Us</h3>
          <p className="text-gray-600 text-xs sm:text-sm mb-3">
            If you have any questions about this Privacy Policy, please contact us:
          </p>
          <div className="space-y-2 text-xs sm:text-sm">
            <div className="flex items-center space-x-2">
              <span className="text-[var(--color-primary)]">📧</span>
              <span className="text-gray-700">privacy@souqalmart.com</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[var(--color-primary)]">📞</span>
              <span className="text-gray-700">+91 1800-123-4567</span>
            </div>
            <div className="flex items-center space-x-2">
              <span className="text-[var(--color-primary)]">📍</span>
              <span className="text-gray-700">Souqalmart, Kerala, India</span>
            </div>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
          <button className="w-full sm:w-auto px-4 py-2 bg-[var(--color-primary)] text-white rounded-md hover:bg-[var(--color-primary)]/90 transition-colors text-sm cursor-pointer">
            Download PDF
          </button>
          <button className="w-full sm:w-auto px-4 py-2 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-md hover:bg-[var(--color-primary)]/10 transition-colors text-sm cursor-pointer">
            Print Policy
          </button>
        </div>
      </div>
    </div>
  );
} 