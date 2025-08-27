"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import AddressForm from "./AddressForm";

export default function CheckoutRight() {
  const router = useRouter();
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

  const handleLogout = () => {
    // Clear any stored authentication data
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('selectedCategory');
    localStorage.removeItem('cartItems');
    sessionStorage.clear();
    router.push('/login');
  };

  return (
    <div className="space-y-6">
      {!showAddressForm ? (
        <>
          {/* Account Info */}
          <div className="bg-white rounded-lg">
            <div className="flex items-center justify-between px-4 pt-4 pb-2">
              <h3 className="text-xl font-semibold text-gray-800">Account info</h3>
              <button 
                onClick={handleLogout}
                className="text-sm text-[var(--color-primary)] hover:text-[var(--color-primary)]/80 underline cursor-pointer"
              >
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
                className="ml-4 px-4 py-2 border border-[var(--color-primary)] text-[var(--color-primary)] rounded hover:bg-[var(--color-primary)]/10 transition-colors cursor-pointer" 
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
              style={{ accentColor: "#6D0D26" }}
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
              style={{ accentColor: "#6D0D26" }}
            />
            <div className="flex-1">
              <label htmlFor="online" className="block font-medium text-gray-800 cursor-pointer">
                Online Payment
              </label>
              <div className="flex flex-col md:flex-row md:items-center md:justify-between mt-1 gap-2">
                <p className="text-sm text-gray-600">
                  UPI, Netbanking, Debit Card/Credit Card can be used
                </p>
                <div className="flex items-center space-x-2 md:justify-end">
                  <img src="/upi.png" alt="UPI" className="h-4 w-auto md:h-6" />
                  <img src="/rupay.png" alt="RuPay" className="h-4 w-auto md:h-6" />
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