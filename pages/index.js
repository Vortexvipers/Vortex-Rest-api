import React, { useState, useEffect } from 'react';

// Main component for the verification screen
export default function App() {
  // State to track the verification process. It can be 'verifying' or 'verified'.
  const [verificationStatus, setVerificationStatus] = useState('verifying');

  // This effect runs once when the component mounts.
  // It simulates a network request for verification.
  useEffect(() => {
    // Set a timer to change the status from 'verifying' to 'verified' after 3 seconds.
    const verificationTimer = setTimeout(() => {
      setVerificationStatus('verified');
    }, 3000); // 3-second delay for simulation

    // Cleanup function to clear the timer if the component unmounts.
    return () => clearTimeout(verificationTimer);
  }, []); // Empty dependency array means this effect runs only once.

  // This effect runs when the verificationStatus changes to 'verified'.
  useEffect(() => {
    if (verificationStatus === 'verified') {
      // After verification is successful, wait 1.5 seconds before redirecting.
      const redirectTimer = setTimeout(() => {
        // You can change this URL to your desired destination.
        // window.location.href = 'https://example.com';
        console.log("Redirecting..."); // Placeholder for actual redirection
      }, 1500);

      // Cleanup function for the redirect timer.
      return () => clearTimeout(redirectTimer);
    }
  }, [verificationStatus]); // This effect depends on the verificationStatus state.

  return (
    <div className="bg-[#202020] text-gray-300 font-sans flex items-center justify-center min-h-screen w-full">
      <div className="text-center w-full max-w-lg mx-auto p-4">
        {/* Header Section */}
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl text-white font-light">
            Verifying you are human. This may take a few seconds.
          </h1>
        </header>

        {/* Verification Status Box */}
        <div className="bg-[#333333] border border-gray-600 rounded-lg p-6 flex items-center justify-between transition-all duration-500 ease-in-out">
          <div className="flex items-center space-x-4">
            {/* Conditional rendering: show spinner or checkmark based on status */}
            {verificationStatus === 'verifying' ? (
              <Spinner />
            ) : (
              <Checkmark />
            )}
            <span className="text-white text-lg">
              {verificationStatus === 'verifying' ? 'Verifying...' : 'Verified!'}
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <CloudflareLogo />
            <div className="text-left text-xs">
              <a href="#" className="text-blue-400 hover:underline">Privacy</a>
              <span className="text-gray-400 mx-1">•</span>
              <a href="#" className="text-blue-400 hover:underline">Terms</a>
            </div>
          </div>
        </div>

        {/* Footer Section */}
        <footer className="mt-8">
          <p className="text-gray-400">
            ytsave.authero.online needs to review the security of your connection before proceeding.
          </p>
        </footer>
      </div>
    </div>
  );
}

// SVG Spinner Component
const Spinner = () => (
  <svg className="animate-spin h-8 w-8 text-green-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
  </svg>
);

// SVG Checkmark Component for success state
const Checkmark = () => (
  <div className="h-8 w-8 flex items-center justify-center">
    <svg className="h-7 w-7 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
    </svg>
  </div>
);

// SVG Cloudflare Logo Component
const CloudflareLogo = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-gray-400">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm0 22C6.48 22 2 17.52 2 12S6.48 2 12 2s10 4.48 10 10-4.48 10-10 10z" fill="currentColor"/>
        <path d="M15.22 15.22c-1.13 1.13-2.63 1.78-4.22 1.78s-3.09-.65-4.22-1.78c-.2-.2-.2-.51 0-.71l.71-.71c.2-.2.51-.2.71 0 .83.83 1.94 1.31 3.1 1.31s2.27-.48 3.1-1.31c.2-.2.51-.2.71 0l.71.71c.2.2.2.51 0 .71zM8.78 8.78c1.13-1.13 2.63-1.78 4.22-1.78s3.09.65 4.22 1.78c.2.2.2.51 0 .71l-.71.71c-.2.2-.51.2-.71 0-1.03-1.03-2.6-1.03-3.63 0-.2.2-.51.2-.71 0l-.71-.71c-.2-.2-.2-.51 0-.71z" fill="currentColor"/>
    </svg>
);

    
