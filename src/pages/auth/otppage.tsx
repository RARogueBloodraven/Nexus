import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const OtpPage: React.FC = () => {
  const [otp, setOtp] = useState('');
  const navigate = useNavigate();

  const verifyOtp = () => {
    const role = localStorage.getItem('userRole') || 'entrepreneur';;

    if (otp === '123456') {
      navigate(
        role === 'entrepreneur'
          ? '/dashboard/entrepreneur'
          : '/dashboard/investor'
      );
    } else {
      alert('Invalid OTP');
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-96">
        <h1 className="text-2xl font-bold text-center mb-4">
          Two Factor Authentication
        </h1>

        <p className="text-gray-600 text-center mb-6">
          Enter the 6-digit OTP code
        </p>

        <input
          type="text"
          value={otp}
          onChange={(e) => setOtp(e.target.value)}
          placeholder="Enter OTP"
          className="w-full border border-gray-300 p-3 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
        />

        <button
          onClick={verifyOtp}
          className="w-full mt-4 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-md"
        >
          Verify OTP
        </button>

        <p className="text-sm text-gray-500 mt-4 text-center">
          Demo OTP: <strong>123456</strong>
        </p>
      </div>
    </div>
  );
};

export default OtpPage;