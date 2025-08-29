"use client";

import { useState } from "react";
import Link from "next/link";

export default function TermsConditions() {
  const [expandedSections, setExpandedSections] = useState({
    general: true,
    orders: false,
    returns: false,
    privacy: false,
    liability: false,
    contact: false
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="max-w-6xl mx-auto">
      <div className="bg-white rounded-lg p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Terms and Conditions</h2>
        <p className="text-gray-600 mb-6">
          Last updated: {new Date().toLocaleDateString()}
        </p>

        {/* General Terms */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('general')}
            className="w-full flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900">1. General Terms</h3>
            <span className="text-gray-500">
              {expandedSections.general ? '−' : '+'}
            </span>
          </button>
          {expandedSections.general && (
            <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
              <p className="text-gray-700 mb-4">
                By accessing and using Souqalmart's website and services, you agree to be bound by these Terms and Conditions. 
                These terms apply to all users of the site, including without limitation users who are browsers, vendors, customers, merchants, and/or contributors of content.
              </p>
              <p className="text-gray-700 mb-4">
                We reserve the right to update, change or replace any part of these Terms and Conditions by posting updates and/or changes to our website. 
                It is your responsibility to check this page periodically for changes.
              </p>
              <p className="text-gray-700">
                Your continued use of or access to the website following the posting of any changes constitutes acceptance of those changes.
              </p>
            </div>
          )}
        </div>

        {/* Orders and Payment */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('orders')}
            className="w-full flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900">2. Orders and Payment</h3>
            <span className="text-gray-500">
              {expandedSections.orders ? '−' : '+'}
            </span>
          </button>
          {expandedSections.orders && (
            <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
              <p className="text-gray-700 mb-4">
                All orders are subject to acceptance and availability. We reserve the right to refuse service to anyone for any reason at any time.
              </p>
              <p className="text-gray-700 mb-4">
                Prices for our products are subject to change without notice. We reserve the right to modify or discontinue any product at any time.
              </p>
              <p className="text-gray-700 mb-4">
                Payment must be made at the time of ordering. We accept various payment methods including credit cards, debit cards, and digital wallets.
              </p>
              <p className="text-gray-700">
                Orders are confirmed via email once payment is processed successfully.
              </p>
            </div>
          )}
        </div>

        {/* Returns and Refunds */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('returns')}
            className="w-full flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900">3. Returns and Refunds</h3>
            <span className="text-gray-500">
              {expandedSections.returns ? '−' : '+'}
            </span>
          </button>
          {expandedSections.returns && (
            <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
              <p className="text-gray-700 mb-4">
                We accept returns within 30 days of delivery for most products. Items must be unused, unopened, and in their original packaging.
              </p>
              <p className="text-gray-700 mb-4">
                Certain products may not be eligible for returns due to hygiene reasons or manufacturer restrictions.
              </p>
              <p className="text-gray-700 mb-4">
                Return shipping costs are the responsibility of the customer unless the item was received damaged or incorrect.
              </p>
              <p className="text-gray-700">
                Refunds will be processed within 5-7 business days after we receive the returned item.
              </p>
            </div>
          )}
        </div>

        {/* Privacy and Data Protection */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('privacy')}
            className="w-full flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900">4. Privacy and Data Protection</h3>
            <span className="text-gray-500">
              {expandedSections.privacy ? '−' : '+'}
            </span>
          </button>
          {expandedSections.privacy && (
            <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
              <p className="text-gray-700 mb-4">
                Your privacy is important to us. Please review our Privacy Policy, which also governs your use of the website, to understand our practices.
              </p>
              <p className="text-gray-700 mb-4">
                We collect, use, and protect your personal information in accordance with applicable data protection laws.
              </p>
              <p className="text-gray-700">
                By using our services, you consent to the collection and use of information in accordance with our Privacy Policy.
              </p>
            </div>
          )}
        </div>

        {/* Limitation of Liability */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('liability')}
            className="w-full flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900">5. Limitation of Liability</h3>
            <span className="text-gray-500">
              {expandedSections.liability ? '−' : '+'}
            </span>
          </button>
          {expandedSections.liability && (
            <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
              <p className="text-gray-700 mb-4">
                In no case shall Souqalmart, our directors, officers, employees, affiliates, agents, contractors, interns, suppliers, service providers or licensors be liable for any injury, loss, claim, or any direct, indirect, incidental, punitive, special, or consequential damages of any kind.
              </p>
              <p className="text-gray-700 mb-4">
                Our liability is limited to the amount paid for the specific product or service in question.
              </p>
              <p className="text-gray-700">
                We do not warrant that the quality of any products, services, information, or other material purchased or obtained by you will meet your expectations.
              </p>
            </div>
          )}
        </div>

        {/* Contact Information */}
        <div className="mb-6">
          <button
            onClick={() => toggleSection('contact')}
            className="w-full flex justify-between items-center p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors"
          >
            <h3 className="text-lg font-semibold text-gray-900">6. Contact Information</h3>
            <span className="text-gray-500">
              {expandedSections.contact ? '−' : '+'}
            </span>
          </button>
          {expandedSections.contact && (
            <div className="mt-4 p-4 bg-white border border-gray-200 rounded-lg">
              <p className="text-gray-700 mb-4">
                Questions about the Terms and Conditions should be sent to us at:
              </p>
              <div className="space-y-2 text-gray-700">
                <p><strong>Email:</strong> legal@souqalmart.com</p>
                <p><strong>Phone:</strong> +91-1800-XXX-XXXX</p>
                <p><strong>Address:</strong> Souqalmart Legal Department, [Address]</p>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="mt-8 pt-6 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-sm text-gray-600">
              By using our services, you acknowledge that you have read and understood these Terms and Conditions.
            </p>
            <Link 
              href="/terms" 
              className="inline-flex items-center text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 font-medium"
            >
              View Full Terms
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
} 