"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";


export default function LoginPage() {
  const [emailOrPhone, setEmailOrPhone] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle OTP sending logic here
      console.log("OTP sent to:", emailOrPhone);
      // Redirect to OTP verification page
      router.push("/login/otp");
    }, 1000);
  };

  return (
    <div className="bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8" style={{ height: "calc(100vh - 80px)" }}>
      <div
        className="max-w-md w-full space-y-4 sm:space-y-5 flex flex-col items-center justify-center"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto"
        }}
      >
        {/* Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              {/* Shield Icon */}
              <div className="w-6 h-6 sm:w-8 sm:h-8 bg-gray-700 rounded-md flex items-center justify-center">
                <svg
                  className="w-4 h-4 sm:w-5 sm:h-5 text-white"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
              <span className="text-xl sm:text-2xl font-bold text-gray-700">
                Logoipsum
              </span>
            </div>
          </div>
        </div>

        {/* Welcome Message */}
        <div className="text-center">
          <h2
            style={{
              color: "#333333",
              textAlign: "center",
              leadingTrim: "both",
              textEdge: "cap",
              fontSize: "28px",
              fontStyle: "normal",
              fontWeight: 600,
              lineHeight: "normal",
              letterSpacing: "-1.6px",
            }}
            className="sm:text-[40px]"
          >
            Welcome <span style={{ color: "#035F0F" }}>Audiophiles</span>
          </h2>
          <p
            style={{
              color: "rgba(51, 51, 51, 0.80)",
              textAlign: "center",
              leadingTrim: "both",
              textEdge: "cap",
              fontSize: "14px",
              fontStyle: "normal",
              fontWeight: 500,
              lineHeight: "normal",
              letterSpacing: "-0.64px"
            }}
            className="sm:text-[16px]"
          >
            Login / signup with your email or mobile number.
          </p>
        </div>

        {/* Login Form */}
        <form className="mt-6 sm:mt-8 space-y-4 sm:space-y-6 w-full" onSubmit={handleSubmit}>
          <div className="space-y-3 sm:space-y-4">
            {/* Email/Phone Input */}
            <div>
              <label
                htmlFor="emailOrPhone"
                className="block mb-2 sm:text-[18px]"
                style={{
                  color: "#333333",
                  leadingTrim: "both",
                  textEdge: "cap",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "normal",
                  letterSpacing: "-0.52px"
                }}
              >
                Enter your email or phone
              </label>
              <input
                id="emailOrPhone"
                name="emailOrPhone"
                type="text"
                required
                value={emailOrPhone}
                onChange={(e) => setEmailOrPhone(e.target.value)}
                className="appearance-none relative block w-full px-3 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 sm:text-[16px]"
                style={{
                  color: "rgba(51, 51, 51, 0.60)",
                  fontSize: "14px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "normal",
                  letterSpacing: "-0.64px",
                  boxShadow: "none",
                  transition: "border-color 0.2s, box-shadow 0.2s"
                }}
                onFocus={e => e.target.style.borderColor = "#035F0F"}
                onBlur={e => e.target.style.borderColor = "#d1d5db"}
                placeholder="Email or phone number"
              />
              <style jsx>{`
                #emailOrPhone::placeholder {
                  color: rgba(51, 51, 51, 0.60);
                  /* font-family: 'Nunito Sans', sans-serif; */
                  font-size: 14px;
                  font-style: normal;
                  font-weight: 500;
                  line-height: normal;
                  letter-spacing: -0.64px;
                }
                @media (min-width: 640px) {
                  #emailOrPhone::placeholder {
                    font-size: 16px;
                  }
                }
              `}</style>
            </div>
          </div>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              disabled={isLoading || !emailOrPhone.trim()}
              className="w-full flex justify-center items-center gap-2 py-3 px-4 sm:py-4 sm:px-6 sm:text-[16px]"
              style={{
                display: "flex",
                padding: "12px 16px",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                alignSelf: "stretch",
                borderRadius: "4px",
                background: "#035F0F",
                border: "none",
                transition: "background-color 0.2s",
                color: "#FFF",
                textAlign: "center",
                fontSize: "14px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal",
                letterSpacing: "-0.48px",
                leadingTrim: "both",
                textEdge: "cap"
              }}
              onMouseOver={e => e.currentTarget.style.background = "#02490C"}
              onMouseOut={e => e.currentTarget.style.background = "#035F0F"}
              onFocus={e => e.currentTarget.style.boxShadow = "0 0 0 2px #035F0F33"}
              onBlur={e => e.currentTarget.style.boxShadow = "none"}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-4 w-4 sm:h-5 sm:w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                    ></path>
                  </svg>
                  Sending OTP...
                </div>
              ) : (
                "Send OTP"
              )}
            </button>
          </div>

          {/* Legal Text */}
          <div className="text-center">
            <p
              style={{
                color: "rgba(51, 51, 51, 0.60)",
                textAlign: "center",
                fontSize: "12px",
                fontStyle: "normal",
                fontWeight: 500,
                lineHeight: "normal",
                letterSpacing: "-0.56px",
                leadingTrim: "both",
                textEdge: "cap",
              }}
              className="sm:text-[14px]"
            >
              By continuing, you agree to our{" "}
              <Link
                href="/terms"
                className="underline font-medium"
                style={{ color: "#035F0F" }}
                onMouseOver={e => e.currentTarget.style.color = "#035F0F"}
                onMouseOut={e => e.currentTarget.style.color = "rgba(51, 51, 51, 0.60)"}
              >
                Terms
              </Link>{" "}
              and{" "}
              <Link
                href="/privacy"
                className="underline font-medium"
                style={{ color: "#035F0F" }}
                onMouseOver={e => e.currentTarget.style.color = "#035F0F"}
                onMouseOut={e => e.currentTarget.style.color = "rgba(51, 51, 51, 0.60)"}
              >
                Privacy Policy
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>


  );
  
}
