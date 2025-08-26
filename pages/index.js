import { useState, useEffect } from "react";

export default function Home() {
  const [verified, setVerified] = useState(false);

  useEffect(() => {
    if (verified) {
      const timer = setTimeout(() => {
        window.location.href = "/docs.html"; // redirect ke public/docs.html
      }, 3000); // 3 detik setelah klik
      return () => clearTimeout(timer);
    }
  }, [verified]);

  const handleClick = () => {
    setVerified(true);
  };

  return (
    <div className="container">
      <h1>Verifikasi User</h1>

      {!verified ? (
        <button onClick={handleClick} className="verify-btn">
          Klik untuk Verifikasi
        </button>
      ) : (
        <p className="verified">
          ✅ Kamu terverifikasi<br />Mengalihkan ke docs.html ...
        </p>
      )}

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          font-family: sans-serif;
        }
        h1 {
          margin-bottom: 20px;
        }
        .verify-btn {
          padding: 12px 20px;
          background: #0070f3;
          color: white;
          border: none;
          border-radius: 8px;
          cursor: pointer;
          font-size: 16px;
        }
        .verify-btn:hover {
          background: #005bb5;
        }
        .verified {
          font-size: 18px;
          color: green;
          font-weight: bold;
          text-align: center;
        }
      `}</style>
    </div>
  );
        }
