"use client";

import { useState } from "react";
import AddressForm from "./AddressForm";

export default function CheckoutRight() {
  const [paymentMethod, setPaymentMethod] = useState("cod");
  const [showAddressForm, setShowAddressForm] = useState(false);

  // Current address data
  const [currentAddressData, setCurrentAddressData] = useState({
    email: "Sampleuser@gmail.com",
    country: "IN",
    firstName: "Sample",
    lastName: "Username",
    address: "House No. 12, Vattiyoorkavu, 695013, Thiruvananthapuram, KL, IN",
    city: "Thiruvananthapuram",
    state: "Kerala",
    pincode: "695013",
    phone: "+91 9999 444 555"
  });

  return (
    <div className="space-y-6">
      {!showAddressForm ? (
        <>
          {/* Account Info */}
          <div className="bg-white rounded-lg">
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
              <h3 className="text-xl font-semibold text-gray-800">Account info</h3>
              <button className="text-sm text-[#035F0F] hover:text-[#035F0F]/80 underline">
                Logout
              </button>
            </div>
            <div className="px-4 pb-4 border-b border-gray-200">
              <p className="text-gray-800">Sampleuser@gmail.com</p>
            </div>
          </div>

          {/* Deliver to */}
          <div className="bg-white rounded-lg">
            <div className="px-4 pt-4 pb-2">
              <h3 className="text-xl font-semibold text-gray-800">Deliver to</h3>
            </div>
            <div className="pb-4 space-y-2">
              <div className="flex items-center justify-between px-6">
                <p className="font-medium text-gray-800">{currentAddressData.firstName} {currentAddressData.lastName}</p>
                <img src="/threedoticon.svg" alt="More options" className="w-6 h-6" />
              </div>
              <p className="text-sm text-gray-600 px-6">
                {currentAddressData.address}
              </p>
              <p className="text-sm text-gray-600 px-6">{currentAddressData.phone}</p>
              <div className="border-b border-gray-200 mt-4 px-6"></div>
              <button 
                onClick={() => setShowAddressForm(true)}
                className="ml-4 px-4 py-2 border border-[#035F0F] text-[#035F0F] rounded hover:bg-[#035F0F]/10 transition-colors" 
                style={{ marginTop: 0, alignSelf: "flex-start" }}
              >
                Edit Address
              </button>
            </div>
          </div>
        </>
      ) : (
        <AddressForm 
          onBack={() => setShowAddressForm(false)} 
          initialData={currentAddressData}
          onSave={(newData) => setCurrentAddressData(newData)}
        />
      )}

      {/* Payment Method */}
      <div className="bg-white rounded-lg">
        <div className="px-4 pt-4 pb-3">
          <h3 className="text-xl font-semibold text-gray-800">Payment Method</h3>
        </div>
        <div className="px-4 pb-5 space-y-3">
          {/* Cash On Delivery */}
          <div className="flex items-start space-x-3 pl-4">
            <input
              type="radio"
              id="cod"
              name="payment"
              value="cod"
              checked={paymentMethod === "cod"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mt-1"
            />
            <div className="flex-1">
              <label htmlFor="cod" className="block font-medium text-gray-800 cursor-pointer">
                Cash On Delivery
              </label>
              <p className="text-sm text-gray-600 mt-1">
                Cash, UPI and cards are accepted on delivery
              </p>
            </div>
          </div>

          {/* Online Payment */}
          <div className="flex items-start space-x-3 pl-4">
            <input
              type="radio"
              id="online"
              name="payment"
              value="online"
              checked={paymentMethod === "online"}
              onChange={(e) => setPaymentMethod(e.target.value)}
              className="mt-1"
            />
            <div className="flex-1">
              <label htmlFor="online" className="block font-medium text-gray-800 cursor-pointer">
                Online Payment
              </label>
              <div className="flex items-center justify-between mt-1">
                <p className="text-sm text-gray-600">
                  UPI, Netbanking, Debit Card/Credit Card can be used
                </p>
                <div className="flex items-center space-x-2">
                  <img src="/upi.png" alt="UPI" className="h-6 w-auto" />
                  <img src="/rupay.png" alt="RuPay" className="h-6 w-auto" />
                  <span className="text-xs text-gray-500">+more</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 