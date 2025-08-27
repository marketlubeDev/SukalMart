"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function OTPPage() {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const [isLoading, setIsLoading] = useState(false);
  const [timer, setTimer] = useState(30);
  const [canResend, setCanResend] = useState(false);
  const router = useRouter();

  // Timer countdown
  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleOtpChange = (index, value) => {
    if (value.length <= 1 && /^\d*$/.test(value)) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      // Auto-focus next input
      if (value && index < 3) {
        const nextInput = document.getElementById(`otp-${index + 1}`);
        if (nextInput) nextInput.focus();
      }
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const otpString = otp.join("");

    if (otpString.length !== 4) {
      // Removed alert to avoid error
      return;
    }

    setIsLoading(true);

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false);
      // Handle OTP verification logic here
      console.log("OTP verified:", otpString);
      router.push("/"); // Redirect to home page after successful verification
    }, 1000);
  };

  const handleResendOTP = () => {
    setTimer(30);
    setCanResend(false);
    // Handle resend OTP logic here
    console.log("Resending OTP...");
  };

  const onEditEmail = () => {
    // Navigate back to login page to edit email
    router.push("/login");
  };

  return (
    <div
      className="bg-white flex items-center justify-center px-4 sm:px-6 lg:px-8"
      style={{ height: "calc(100vh - 80px)" }}
    >
      <div
        className="max-w-md w-full space-y-4 sm:space-y-5 flex flex-col items-center justify-center"
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          margin: "0 auto",
        }}
      >
        {/* Logo */}
        <div className="text-center">
          <div className="flex items-center justify-center">
            <div className="flex items-center space-x-2">
              
              <img src="/souqalmart-logo-name.svg" alt="Souqalmart" className="h-10 sm:h-12 w-auto" />
            </div>
          </div>
        </div>

        {/* OTP Message */}
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
            Verify{" "}
            <span
              style={{
                color: "#6D0D26",
                fontSize: "28px",
                fontWeight: 600,
                letterSpacing: "-1.6px",
                lineHeight: "normal",
                fontStyle: "normal",
                textEdge: "cap",
                leadingTrim: "both",
              }}
              className="sm:text-[40px]"
            >
              OTP
            </span>
          </h2>
          <div className="text-center">
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
                letterSpacing: "-0.64px",
              }}
              className="sm:text-[16px]"
            >
              We&apos;ve sent a 6-digit code to{" "}
              <span
                className="text-[var(--color-primary)] font-medium"
                style={{
                  fontWeight: 500,
                  letterSpacing: "-0.64px",
                }}
              >
                you@example.com
              </span>
              <button
                type="button"
                className="inline-flex items-center ml-2 text-[#6D0D26] font-medium text-xs hover:underline focus:outline-none"
                style={{
                  fontWeight: 500,
                  fontSize: "14px",
                  lineHeight: "16px",
                }}
                onClick={onEditEmail}
              >
                <img
                  src="/editbutton.svg"
                  alt="Edit"
                  className="inline-block w-4 h-4 mr-1 align-text-bottom"
                  style={{ marginRight: "2px" }}
                />
                Edit
              </button>
            </p>
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
                letterSpacing: "-0.64px",
              }}
              className="sm:text-[16px]"
            >
              Please enter it below to continue.
            </p>
          </div>
        </div>

        {/* OTP Form */}
        <form
          className="mt-6 sm:mt-8 space-y-4 sm:space-y-6 w-full"
          onSubmit={handleSubmit}
        >
          <div className="space-y-3 sm:space-y-4">
            {/* OTP Input */}
            <div>
              <div className="flex justify-center">
                <div
                  style={{
                    width: "calc(4 * 64px + 3 * 12px)",
                    maxWidth: "292px",
                  }}
                >
                  <label
                    htmlFor="otp-0"
                    className="block mb-2 sm:text-[18px] text-left"
                    style={{
                      color: "#333333",
                      leadingTrim: "both",
                      textEdge: "cap",
                      fontSize: "16px",
                      fontStyle: "normal",
                      fontWeight: 500,
                      lineHeight: "normal",
                      letterSpacing: "-0.52px",
                    }}
                  >
                    Enter OTP
                  </label>
                  <div className="flex justify-center space-x-3">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleKeyDown(index, e)}
                        placeholder="0"
                        className="w-16 h-12 sm:w-16 sm:h-12 text-center text-lg font-semibold border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[var(--color-primary)] focus:border-[var(--color-primary)] transition-colors duration-200"
                        style={{
                          color: "rgba(51, 51, 51, 0.60)",
                          fontSize: "14px",
                          fontStyle: "normal",
                          fontWeight: 500,
                          lineHeight: "normal",
                          letterSpacing: "-0.64px",
                          boxShadow: "none",
                          transition: "border-color 0.2s, box-shadow 0.2s",
                        }}
                        onFocus={(e) =>
                          (e.target.style.borderColor = "var(--color-primary)")
                        }
                        onBlur={(e) => (e.target.style.borderColor = "#d1d5db")}
                      />
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-center">
            <button
              type="submit"
              disabled={isLoading || otp.join("").length !== 4}
              className="flex justify-center items-center gap-2 py-3 px-4 sm:py-4 sm:px-6 sm:text-[16px]"
              style={{
                width: "calc(4 * 64px + 3 * 12px)", // 4 input boxes (64px each) + 3 gaps (12px each) = 292px
                maxWidth: "292px",
                display: "flex",
                padding: "12px 16px",
                justifyContent: "center",
                alignItems: "center",
                gap: "8px",
                alignSelf: "stretch",
                borderRadius: "4px",
                background: "var(--color-primary)",
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
                textEdge: "cap",
              }}
              onMouseOver={(e) =>
                (e.currentTarget.style.background = "#520A1E")
              }
              onMouseOut={(e) => (e.currentTarget.style.background = "var(--color-primary)")}
              onFocus={(e) =>
                (e.currentTarget.style.boxShadow = "0 0 0 2px #6D0D26")
              }
              onBlur={(e) => (e.currentTarget.style.boxShadow = "none")}
            >
              {isLoading ? (
                <div className="flex items-center">
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
                  Verifying...
                </div>
              ) : (
                "Verify OTP"
              )}
            </button>
          </div>

          {/* Resend OTP */}
          <div className="text-center">
            {canResend ? (
              <button
                type="button"
                onClick={handleResendOTP}
                className="text-sm text-gray-600 hover:text-gray-700 font-medium"
              >
                Resend OTP
              </button>
            ) : (
              <p className="text-sm text-gray-600">
                Resend OTP in <span className="text-black">{timer} Sec</span>
              </p>
            )}
          </div>
        </form>

        {/* Back to Login
        <div className="text-center mt-6">
          <Link
            href="/login"
            className="text-sm text-green-600 hover:text-green-700 font-medium"
          >
            ← Back to Login
          </Link>
        </div> */}
      </div>
    </div>
  );
}
