"use client";

import React from "react";
import { useLanguage } from "@/app/_components/context/LanguageContext";
import { t } from "@/lib/translations";

export default function HelpSupport() {
  const { language } = useLanguage();
  const supportTopics = [
    {
      title: t("account.support.orderIssues.title", language),
      description: t("account.support.orderIssues.description", language),
      icon: "📦"
    },
    {
      title: t("account.support.accountPayment.title", language),
      description: t("account.support.accountPayment.description", language),
      icon: "👤"
    },
    {
      title: t("account.support.productInformation.title", language),
      description: t("account.support.productInformation.description", language),
      icon: "ℹ️"
    },
    {
      title: t("account.support.shippingDelivery.title", language),
      description: t("account.support.shippingDelivery.description", language),
      icon: "🚚"
    }
  ];

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">{t("account.helpSupport", language)}</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-3 sm:gap-4 mb-6 sm:mb-8">
        {supportTopics.map((topic, index) => (
          <div key={index} className="border border-gray-200 rounded-lg p-3 sm:p-4 hover:border-[var(--color-primary)] transition-colors cursor-pointer">
            <div className="flex items-start space-x-3">
              <span className="text-xl sm:text-2xl">{topic.icon}</span>
              <div>
                <h3 className="font-medium text-gray-900 mb-1 text-sm sm:text-base">{topic.title}</h3>
                <p className="text-xs sm:text-sm text-gray-600">{topic.description}</p>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="border-t border-gray-200 pt-4 sm:pt-6">
        <h3 className="font-medium text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">{t("footer.contact", language)}</h3>
        <div className="space-y-2 sm:space-y-3">
          <div className="flex items-center space-x-3">
            <span className="text-[var(--color-primary)]">📧</span>
            <span className="text-gray-700 text-sm sm:text-base">support@souqalmart.com</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-[var(--color-primary)]">📞</span>
            <span className="text-gray-700 text-sm sm:text-base">+91 1800-123-4567</span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="text-[var(--color-primary)]">💬</span>
            <span className="text-gray-700 text-sm sm:text-base">Live Chat (Available 24/7)</span>
          </div>
        </div>
      </div>
    </div>
  );
} 