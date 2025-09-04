"use client";

import { useState } from "react";
import Link from "next/link";
import { useLanguage } from "@/app/_components/context/LanguageContext";
import { t } from "@/lib/translations";

export default function TermsConditions() {
  const { language } = useLanguage();
  const [expandedSections, setExpandedSections] = useState({
    general: true,
    orders: false,
    returns: false,
    privacy: false,
    liability: false,
    contact: false,
  });

  const toggleSection = (section) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  return (
    <div className="bg-[#F5F5F5] rounded-lg p-0">
      <div className="bg-white rounded-lg p-4 sm:p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">
          {t("account.termsConditions", language)}
        </h2>
        <p className="text-gray-600 mb-6">
          {t("account.lastUpdatedLabel", language)}: {new Date().toLocaleDateString()}
        </p>

        {/* General Terms */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection("general")}
            className="w-full flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              {t("account.terms.generalTitle", language)}
            </h3>
            <span className="text-gray-500">
              {expandedSections.general ? "−" : "+"}
            </span>
          </button>
          {expandedSections.general && (
            <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
              <p className="text-gray-700 mb-4">
                {t("account.terms.generalP1", language)}
              </p>
              <p className="text-gray-700 mb-4">
                {t("account.terms.generalP2", language)}
              </p>
              <p className="text-gray-700">
                {t("account.terms.generalP3", language)}
              </p>
            </div>
          )}
        </div>

        {/* Orders and Payment */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection("orders")}
            className="w-full flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              {t("account.terms.ordersTitle", language)}
            </h3>
            <span className="text-gray-500">
              {expandedSections.orders ? "−" : "+"}
            </span>
          </button>
          {expandedSections.orders && (
            <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
              <p className="text-gray-700 mb-4">
                {t("account.terms.ordersP1", language)}
              </p>
              <p className="text-gray-700 mb-4">
                {t("account.terms.ordersP2", language)}
              </p>
              <p className="text-gray-700 mb-4">
                {t("account.terms.ordersP3", language)}
              </p>
              <p className="text-gray-700">
                {t("account.terms.ordersP4", language)}
              </p>
            </div>
          )}
        </div>

        {/* Returns and Refunds */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection("returns")}
            className="w-full flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              {t("account.terms.returnsTitle", language)}
            </h3>
            <span className="text-gray-500">
              {expandedSections.returns ? "−" : "+"}
            </span>
          </button>
          {expandedSections.returns && (
            <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
              <p className="text-gray-700 mb-4">
                {t("account.terms.returnsP1", language)}
              </p>
              <p className="text-gray-700 mb-4">
                {t("account.terms.returnsP2", language)}
              </p>
              <p className="text-gray-700 mb-4">
                {t("account.terms.returnsP3", language)}
              </p>
              <p className="text-gray-700">
                {t("account.terms.returnsP4", language)}
              </p>
            </div>
          )}
        </div>

        {/* Privacy and Data Protection */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection("privacy")}
            className="w-full flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              {t("account.terms.privacyTitle", language)}
            </h3>
            <span className="text-gray-500">
              {expandedSections.privacy ? "−" : "+"}
            </span>
          </button>
          {expandedSections.privacy && (
            <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
              <p className="text-gray-700 mb-4">
                {t("account.terms.privacyP1", language)}
              </p>
              <p className="text-gray-700 mb-4">
                {t("account.terms.privacyP2", language)}
              </p>
              <p className="text-gray-700">
                {t("account.terms.privacyP3", language)}
              </p>
            </div>
          )}
        </div>

        {/* Limitation of Liability */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection("liability")}
            className="w-full flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              {t("account.terms.liabilityTitle", language)}
            </h3>
            <span className="text-gray-500">
              {expandedSections.liability ? "−" : "+"}
            </span>
          </button>
          {expandedSections.liability && (
            <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
              <p className="text-gray-700 mb-4">
                {t("account.terms.liabilityP1", language)}
              </p>
              <p className="text-gray-700 mb-4">
                {t("account.terms.liabilityP2", language)}
              </p>
              <p className="text-gray-700">
                {t("account.terms.liabilityP3", language)}
              </p>
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection("contact")}
            className="w-full flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900">
              {t("account.terms.contactTitle", language)}
            </h3>
            <span className="text-gray-500">
              {expandedSections.contact ? "−" : "+"}
            </span>
          </button>
          {expandedSections.contact && (
            <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
              <p className="text-gray-700 mb-4">
                {t("account.terms.contactIntro", language)}
              </p>
              <div className="space-y-2 text-gray-700">
                <p>
                  <strong>{t("account.terms.emailLabel", language)}</strong> legal@souqalmart.com
                </p>
                <p>
                  <strong>{t("account.terms.phoneLabel", language)}</strong> +91-1800-XXX-XXXX
                </p>
                <p>
                  <strong>{t("account.terms.addressLabel", language)}</strong> Souqalmart Legal Department,
                  [Address]
                </p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              {t("account.terms.footerAck", language)}
            </p>
            <Link
              href="/terms"
              className="inline-flex items-center text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 font-medium"
            >
              {t("account.terms.viewFullTerms", language)}
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
