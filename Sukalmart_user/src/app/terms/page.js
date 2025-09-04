"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { useLanguage } from "@/app/_components/context/LanguageContext";
import { t } from "@/lib/translations";

export default function TermsPage() {
  const [lastUpdated, setLastUpdated] = useState("");
  const { language } = useLanguage();

  useEffect(() => {
    setLastUpdated(new Date().toLocaleDateString());
  }, []);

  return (
    <div className="min-h-screen bg-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold text-gray-900 mb-4">
            {t("termsPage.title", language)}
          </h1>
          <p className="text-gray-600" suppressHydrationWarning>
            {t("account.lastUpdatedLabel", language)}: {lastUpdated}
          </p>
        </div>

        {/* Content */}
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t("termsPage.acceptanceTitle", language)}
          </h2>
          <p className="text-gray-700 mb-6">
            {t("termsPage.acceptanceBody", language)}
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t("termsPage.useLicenseTitle", language)}
          </h2>
          <p className="text-gray-700 mb-6">
            {t("termsPage.useLicenseBody", language)}
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t("termsPage.disclaimerTitle", language)}
          </h2>
          <p className="text-gray-700 mb-6">
            {t("termsPage.disclaimerBody", language)}
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t("termsPage.limitationsTitle", language)}
          </h2>
          <p className="text-gray-700 mb-6">
            {t("termsPage.limitationsBody", language)}
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t("termsPage.revisionsTitle", language)}
          </h2>
          <p className="text-gray-700 mb-6">
            {t("termsPage.revisionsBody", language)}
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t("termsPage.linksTitle", language)}
          </h2>
          <p className="text-gray-700 mb-6">
            {t("termsPage.linksBody", language)}
          </p>

          <h2 className="text-2xl font-semibold text-gray-900 mb-4">
            {t("termsPage.siteTermsTitle", language)}
          </h2>
          <p className="text-gray-700 mb-6">
            {t("termsPage.siteTermsBody", language)}
          </p>
        </div>

        {/* Back to Login */}
        <div className="text-center mt-12">
          <Link
            href="/login"
            className="inline-flex items-center text-[var(--color-primary)] hover:text-[var(--color-primary)] font-medium"
          >
            {t("termsPage.backToLogin", language)}
          </Link>
        </div>
      </div>
    </div>
  );
}
