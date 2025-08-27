import { useState, useEffect } from "react";

export default function Home() {
  // State to manage verification stages
  const [verificationState, setVerificationState] = useState('initial');

  // Redirect after verification
  useEffect(() => {
    if (verificationState === 'verified') {
      const timer = setTimeout(() => {
        window.location.href = "/docs.html"; // Redirect to public/docs.html
      }, 2000); // 2 seconds delay

      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [verificationState]);

  // Function executed on button click
  const handleClick = () => {
    setVerificationState('loading'); // Show spinner
    setTimeout(() => {
      setVerificationState('verified'); // Change state to 'verified'
    }, 2000); // Simulated verification time
  };

  // Dynamic button text based on state
  const getButtonText = () => {
    switch (verificationState) {
      case 'loading':
        return "Verifying...";
      case 'verified':
        return "Verification Successful!";
      default:
        return "Click to Verify";
    }
  };

  return (
    <div className="container">
      <h1>Verifying you are human</h1>
      <p>This may take a few seconds.</p>

      <div className="loading-container">
        {verificationState === 'loading' && <div className="spinner"></div>}
        {verificationState === 'verified' && <div className="checkmark"></div>}
      </div>

      <button
        onClick={handleClick}
        className={`verify-btn ${verificationState}`}
        disabled={verificationState !== 'initial'}
      >
        <span>{getButtonText()}</span>
      </button>

      <p className="info-text">
        yt.save.authre.online needs to review the security of your connection before proceeding.
      </p>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #181818;
          color: white;
          text-align: center;
          padding: 20px;
        }

        h1 {
          font-size: 2.5rem;
          margin-bottom: 8px;
        }

        .loading-container {
          margin: 20px 0;
        }

        .verify-btn {
          padding: 14px 28px;
          background-color: #0070f3;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
          font-size: 18px;
          font-weight: 600;
          transition: all 0.3s ease;
        }

        .verify-btn:disabled {
          cursor: not-allowed;
          background: #555;
        }

        /* Spinner and Checkmark Styles */
        .spinner {
          width: 24px;
          height: 24px;
          border: 4px solid rgba(255, 255, 255, 0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }

        .checkmark {
          width: 24px;
          height: 24px;
          border: solid white;
          border-width: 0 4px 4px 0;
          transform: rotate(45deg);
          margin: 0 auto;
        }

        .info-text {
          margin-top: 20px;
          font-size: 14px;
          color: #ccc;
        }
        
        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }
      `}</style>
    </div>
  );
         }
         
