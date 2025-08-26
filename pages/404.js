// pages/404.js
import { useEffect } from 'react';
import Head from 'next/head';

export default function Custom404() {
  useEffect(() => {
    // Efek partikel untuk latar belakang
    const createParticle = () => {
      const particle = document.createElement('div');
      particle.classList.add('particle');
      
      // Properti acak untuk partikel
      const size = Math.random() * 5 + 2;
      const posX = Math.random() * 100;
      const duration = Math.random() * 10 + 5;
      
      particle.style.width = `${size}px`;
      particle.style.height = `${size}px`;
      particle.style.left = `${posX}%`;
      particle.style.animationDuration = `${duration}s`;
      particle.style.animationDelay = `${Math.random() * 5}s`;
      particle.style.backgroundColor = `hsl(${Math.random() * 360}, 70%, 60%)`;
      
      document.querySelector('.particles-container').appendChild(particle);
      
      // Hapus partikel setelah selesai animasi
      setTimeout(() => {
        particle.remove();
      }, duration * 1000);
    };
    
    // Buat partikel secara berkala
    const particleInterval = setInterval(createParticle, 300);
    
    return () => clearInterval(particleInterval);
  }, []);

  return (
    <>
      <Head>
        <title>Halaman Tidak Ditemukan | 404</title>
      </Head>
      
      <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white overflow-hidden relative">
        {/* Container untuk partikel latar belakang */}
        <div className="particles-container absolute inset-0 overflow-hidden"></div>
        
        {/* Glow efek */}
        <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-1/4 right-1/4 w-72 h-72 bg-blue-600 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
        
        <div className="flex items-center justify-center min-h-screen relative z-10">
          <div className="text-center max-w-2xl mx-auto px-4">
            {/* Icon animasi */}
            <div className="mb-8 mx-auto w-40 h-40 relative">
              <div className="absolute inset-0 border-4 border-blue-500 rounded-full animate-ping opacity-20"></div>
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="w-20 h-20 text-blue-500" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                </svg>
              </div>
            </div>
            
            <h1 className="text-9xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4">
              404
            </h1>
            
            <h2 className="text-3xl font-semibold mb-6">Halaman Tidak Ditemukan</h2>
            
            <p className="text-gray-400 mb-10 text-lg">
              Maaf, halaman yang Anda cari tidak ada atau telah dipindahkan. 
              Silakan kembali ke beranda atau jelajahi situs kami.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="px-8 py-4 rounded-xl bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl flex items-center justify-center gap-2 group"
              >
                <svg className="w-5 h-5 group-hover:animate-bounce" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path>
                </svg>
                Kembali ke Beranda
              </a>
              
              <button 
                onClick={() => window.history.back()} 
                className="px-8 py-4 rounded-xl border border-gray-700 hover:border-gray-500 bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 transform hover:-translate-y-1"
              >
                Kembali ke Sebelumnya
              </button>
            </div>
            
            {/* Navigasi cepat */}
            <div className="mt-12 pt-8 border-t border-gray-800">
              <p className="text-gray-500 mb-4">Jelajahi Halaman Populer:</p>
              <div className="flex flex-wrap justify-center gap-3">
                <a href="/tentang" className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-sm">Tentang Kami</a>
                <a href="/blog" className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-sm">Blog</a>
                <a href="/bantuan" className="px-4 py-2 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors text-sm">Bantuan</a>
              </div>
            </div>
          </div>
        </div>
        
        <style jsx global>{`
          @keyframes float {
            0% {
              transform: translateY(0) rotate(0deg);
              opacity: 1;
            }
            100% {
              transform: translateY(-100vh) rotate(360deg);
              opacity: 0;
            }
          }
          
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.3; }
          }
          
          .animate-pulse-slow {
            animation: pulse-slow 6s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          
          .particle {
            position: absolute;
            bottom: -10px;
            border-radius: 50%;
            animation-name: float;
            animation-timing-function: linear;
            animation-iteration-count: infinite;
          }
        `}</style>
      </div>
    </>
  );
            }
