import { useState, useEffect } from "react";

export default function Home() {
  // State untuk mengontrol tahapan verifikasi: 'initial', 'loading', 'verified'
  const [verificationState, setVerificationState] = useState('initial');

  // useEffect untuk menangani redirect setelah verifikasi berhasil
  useEffect(() => {
    if (verificationState === 'verified') {
      const timer = setTimeout(() => {
        window.location.href = "/docs.html"; // Redirect ke public/docs.html
      }, 2000); // Redirect 2 detik setelah centang muncul

      return () => clearTimeout(timer); // Cleanup timer jika komponen unmount
    }
  }, [verificationState]);

  // Fungsi yang dijalankan saat tombol diklik
  const handleClick = () => {
    // 1. Ubah state ke 'loading' untuk menampilkan spinner
    setVerificationState('loading');

    // 2. Simulasi proses verifikasi (misal: 2 detik)
    setTimeout(() => {
      // 3. Setelah selesai, ubah state ke 'verified'
      setVerificationState('verified');
    }, 2000);
  };

  // Menentukan teks tombol berdasarkan state saat ini
  const getButtonText = () => {
    switch (verificationState) {
      case 'loading':
        return "Memverifikasi...";
      case 'verified':
        return "Berhasil Diverifikasi!";
      default:
        return "Klik untuk Verifikasi";
    }
  };

  return (
    <div className="container">
      <h1>Verifikasi User</h1>
      <p className="subtitle">
        Klik tombol di bawah untuk melanjutkan ke halaman dokumentasi.
      </p>

      <button
        onClick={handleClick}
        // Tambahkan class dinamis berdasarkan state & nonaktifkan saat loading/verified
        className={`verify-btn ${verificationState}`}
        disabled={verificationState !== 'initial'}
      >
        {/* Ikon dinamis: spinner atau checkmark */}
        {verificationState === 'loading' && <div className="spinner"></div>}
        {verificationState === 'verified' && <div className="checkmark"></div>}

        <span>{getButtonText()}</span>
      </button>

      <style jsx>{`
        .container {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          height: 100vh;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          background-color: #f0f2f5;
          text-align: center;
          padding: 20px;
        }

        h1 {
          font-size: 2.5rem;
          color: #1c1e21;
          margin-bottom: 8px;
        }
        
        .subtitle {
          font-size: 1rem;
          color: #606770;
          margin-bottom: 30px;
        }

        .verify-btn {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          min-width: 240px;
          padding: 14px 28px;
          background: linear-gradient(135deg, #0070f3, #005bb5);
          color: white;
          border: none;
          border-radius: 12px;
          cursor: pointer;
          font-size: 18px;
          font-weight: 600;
          transition: all 0.3s ease;
          box-shadow: 0 4px 15px rgba(0, 112, 243, 0.2);
          overflow: hidden;
          position: relative;
        }

        .verify-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 6px 20px rgba(0, 112, 243, 0.3);
        }

        .verify-btn:disabled {
          cursor: not-allowed;
          background: #ccc;
          box-shadow: none;
        }

        /* State saat loading */
        .verify-btn.loading {
          background: #555;
        }

        /* State saat terverifikasi */
        .verify-btn.verified {
          background: linear-gradient(135deg, #28a745, #218838);
          box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
        }

        /* Animasi Spinner */
        .spinner {
          width: 20px;
          height: 20px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top-color: #ffffff;
          border-radius: 50%;
          animation: spin 1s linear infinite;
        }

        @keyframes spin {
          to {
            transform: rotate(360deg);
          }
        }

        /* Custom Checkmark */
        .checkmark {
          width: 12px;
          height: 24px;
          border: solid white;
          border-width: 0 4px 4px 0;
          transform: rotate(45deg);
          animation: pop-in 0.4s ease-out;
        }
        
        @keyframes pop-in {
          0% {
            transform: rotate(45deg) scale(0);
            opacity: 0;
          }
          80% {
             transform: rotate(45deg) scale(1.2);
             opacity: 1;
          }
          100% {
            transform: rotate(45deg) scale(1);
            opacity: 1;
          }
        }
      `}</style>
    </div>
  );
        }
