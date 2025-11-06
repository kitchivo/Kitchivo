import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Logo from '../../assets/Logo_Full.png';

const VerifyOTP = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const email = location.state?.email || 'your email';
  
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [timer, setTimer] = useState(60);
  const [canResend, setCanResend] = useState(false);
  const inputRefs = useRef([]);

  useEffect(() => {
    // Focus first input on mount
    inputRefs.current[0]?.focus();
  }, []);

  useEffect(() => {
    if (timer > 0) {
      const interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
      return () => clearInterval(interval);
    } else {
      setCanResend(true);
    }
  }, [timer]);

  const handleChange = (index, value) => {
    // Only allow numbers
    if (!/^\d*$/.test(value)) return;

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyDown = (index, e) => {
    // Handle backspace
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handlePaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').slice(0, 6);
    if (!/^\d+$/.test(pastedData)) return;

    const newOtp = [...otp];
    pastedData.split('').forEach((char, index) => {
      if (index < 6) newOtp[index] = char;
    });
    setOtp(newOtp);

    // Focus last filled input or next empty
    const nextIndex = Math.min(pastedData.length, 5);
    inputRefs.current[nextIndex]?.focus();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length === 6) {
      console.log('OTP submitted:', otpValue);
      // Add your OTP verification logic here
      // On success, redirect to home or dashboard
      navigate('/');
    } else {
      alert('Please enter complete OTP');
    }
  };

  const handleResend = () => {
    if (canResend) {
      console.log('Resending OTP to:', email);
      setTimer(60);
      setCanResend(false);
      setOtp(['', '', '', '', '', '']);
      inputRefs.current[0]?.focus();
      // Add your resend OTP logic here
    }
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      {/* Left Side - Image (Hidden on mobile) */}
      <div className="hidden lg:flex lg:w-1/2 xl:w-2/5 relative bg-gradient-to-br from-lima-500 to-lima-700">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1556911220-bff31c812dba?w=1920&h=1080&fit=crop)',
            opacity: 0.3
          }}
        />
        <div className="relative z-10 flex flex-col justify-center items-center text-white p-8 lg:p-10 xl:p-12 w-full">
          <div className="max-w-lg w-full text-center">
            <div className="bg-white/20 w-20 h-20 lg:w-24 lg:h-24 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm">
              <svg className="w-10 h-10 lg:w-12 lg:h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
            </div>
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold mb-4 lg:mb-6 leading-tight">
              Secure Verification
            </h1>
            <p className="text-base lg:text-lg xl:text-xl text-lima-50 leading-relaxed">
              We've sent a verification code to your email to ensure your account security.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side - OTP Form */}
      <div className="w-full lg:w-1/2 xl:w-3/5 flex items-center justify-center p-4 sm:p-6 md:p-8 lg:p-10 xl:p-12 bg-white min-h-screen">
        <div className="max-w-md w-full space-y-6 md:space-y-8">
          {/* Logo and Header */}
          <div className="text-center">
            <Link to="/" className="inline-block">
              <img
                src={Logo}
                alt="Kitchivo Logo"
                className="h-10 sm:h-12 md:h-14 lg:h-16 w-auto mx-auto"
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/150x50/66d210/FFFFFF?text=KITCHIVO';
                }}
              />
            </Link>
            <h2 className="mt-4 sm:mt-6 text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900">
              Verify OTP
            </h2>
            <p className="mt-2 text-xs sm:text-sm text-gray-600">
              Enter the 6-digit code sent to
            </p>
            <p className="text-sm sm:text-base text-lima-600 font-medium break-all px-4">{email}</p>
          </div>

          {/* OTP Form */}
          <div className="bg-white lg:bg-gray-50 rounded-xl lg:rounded-2xl shadow-lg lg:shadow-xl p-5 sm:p-6 md:p-8 lg:p-10">
            <form onSubmit={handleSubmit} className="space-y-5 sm:space-y-6">
              {/* OTP Input Boxes */}
              <div>
                <label className="block text-xs sm:text-sm font-medium text-gray-700 mb-3 sm:mb-4 text-center">
                  Enter Verification Code
                </label>
                <div className="flex gap-1.5 sm:gap-2 md:gap-3 justify-center">
                  {otp.map((digit, index) => (
                    <input
                      key={index}
                      ref={(el) => (inputRefs.current[index] = el)}
                      type="text"
                      inputMode="numeric"
                      maxLength="1"
                      value={digit}
                      onChange={(e) => handleChange(index, e.target.value)}
                      onKeyDown={(e) => handleKeyDown(index, e)}
                      onPaste={index === 0 ? handlePaste : undefined}
                      className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14 text-center text-lg sm:text-xl md:text-2xl font-bold border-2 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-lima-500 focus:border-transparent transition-all"
                    />
                  ))}
                </div>
              </div>

              {/* Timer and Resend */}
              <div className="text-center">
                {!canResend ? (
                  <p className="text-xs sm:text-sm text-gray-600">
                    Resend code in{' '}
                    <span className="font-semibold text-lima-600">
                      {Math.floor(timer / 60)}:{(timer % 60).toString().padStart(2, '0')}
                    </span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResend}
                    className="text-xs sm:text-sm font-medium text-lima-600 hover:text-lima-700 transition-colors"
                  >
                    Resend Code
                  </button>
                )}
              </div>

              {/* Submit Button */}
              <div>
                <button
                  type="submit"
                  className="w-full flex justify-center py-2.5 sm:py-3 md:py-3.5 px-4 border border-transparent rounded-lg shadow-sm text-sm sm:text-base font-medium text-white bg-lima-600 hover:bg-lima-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-lima-500 transition-all duration-200 transform hover:scale-[1.02] active:scale-[0.98]"
                >
                  Verify & Continue
                </button>
              </div>
            </form>

            {/* Help Text */}
            <div className="mt-5 sm:mt-6 text-center">
              <p className="text-xs sm:text-sm text-gray-600">
                Didn't receive the code?{' '}
                <Link to="/login" className="font-medium text-lima-600 hover:text-lima-700 transition-colors">
                  Try another method
                </Link>
              </p>
            </div>
          </div>

          {/* Back to Login */}
          <div className="text-center">
            <Link to="/login" className="inline-flex items-center text-xs sm:text-sm text-gray-600 hover:text-lima-600 transition-colors">
              <svg className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Back to Login
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyOTP;
