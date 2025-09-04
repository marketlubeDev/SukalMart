"use client";

import React from "react";
import { useLanguage } from "@/app/_components/context/LanguageContext";
import { t } from "@/lib/translations";
import Button from "@/app/_components/common/Button";

export default function PrivacyPolicy() {
  const { language } = useLanguage();
  const privacySections = [
    {
      title: t("account.privacySections.dataCollection.title", language),
      content: t("account.privacySections.dataCollection.content", language),
    },
    {
      title: t("account.privacySections.dataUsage.title", language),
      content: t("account.privacySections.dataUsage.content", language),
    },
    {
      title: t("account.privacySections.dataSharing.title", language),
      content: t("account.privacySections.dataSharing.content", language),
    },
    {
      title: t("account.privacySections.dataSecurity.title", language),
      content: t("account.privacySections.dataSecurity.content", language),
    },
    {
      title: t("account.privacySections.yourRights.title", language),
      content: t("account.privacySections.yourRights.content", language),
    },
    {
      title: t("account.privacySections.cookies.title", language),
      content: t("account.privacySections.cookies.content", language),
    },
  ];

  return (
    <div className="bg-white rounded-lg p-4 sm:p-6">
      <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">{t("account.privacyPolicy", language)}</h2>

      <div className="space-y-4 sm:space-y-6">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-3 sm:p-4">
          <div className="flex items-start space-x-3">
            <span className="text-blue-600 text-lg sm:text-xl">ℹ️</span>
            <div>
              <h3 className="font-medium text-blue-900 mb-1 text-sm sm:text-base">{t("account.lastUpdatedLabel", language)}</h3>
              <p className="text-blue-700 text-xs sm:text-sm">{t("account.lastUpdatedDate", language)}</p>
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
          <h3 className="font-medium text-gray-900 mb-2 sm:mb-3 text-sm sm:text-base">{t("footer.contact", language)}</h3>
          <p className="text-gray-600 text-xs sm:text-sm mb-3">
            {t("account.privacyContactIntro", language)}
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

        {/* <div className="flex flex-col sm:flex-row sm:space-x-4 space-y-2 sm:space-y-0">
          <Button
          variant="primary"
            size="large"
           className="w-full sm:w-auto px-4 py-2 bg-[var(--color-primary)] text-white rounded-md transition-colors text-sm cursor-pointer" style={{ backgroundColor: "var(--color-primary)", transition: "background-color 0.2s" }} onMouseOver={(e) => (e.currentTarget.style.backgroundColor = "#520a1e")} onMouseOut={(e) => (e.currentTarget.style.backgroundColor = "var(--color-primary)")}>
          
            Download PDF
          </Button>
          <Button variant="secondary"
            size="large"
            className="w-full sm:w-auto px-4 py-2 border border-[var(--color-primary)] text-[var(--color-primary)] rounded-md hover:bg-[var(--color-primary)]/10 transition-colors text-sm cursor-pointer">
            Print Policy
          </Button>
        </div> */}
      </div>
    </div>
  );
} 