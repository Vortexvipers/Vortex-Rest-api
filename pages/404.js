// pages/404.js
import { useEffect } from 'react';
import Head from 'next/head';

export default function Custom404() {
  return (
    <>
      <Head>
        <title>Page Not Found | 404</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;700;900&display=swap" rel="stylesheet" />
      </Head>
      
      <div className="min-h-screen bg-[#0a0a2a] text-white font-sans overflow-hidden relative">
        {/* Starfield Background */}
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
        
        {/* Glow effects */}
        <div className="absolute top-[-10%] left-[-10%] w-96 h-96 bg-purple-600 rounded-full filter blur-3xl opacity-20 animate-pulse-slow"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-96 h-96 bg-blue-600 rounded-full filter blur-3xl opacity-20 animate-pulse-slow delay-3000"></div>
        
        <div className="flex items-center justify-center min-h-screen relative z-10 p-4">
          <div className="text-center max-w-3xl mx-auto">
            
            {/* Astronaut SVG */}
            <div className="mb-8 mx-auto w-48 h-48 animate-float">
                <svg viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg">
                    <g transform="translate(100 100)">
                        {/* Astronaut Body */}
                        <path d="M-30,-50 a50,50 0 0,1 60,0 l10,70 a40,40 0 0,1 -80,0 z" fill="#E5E7EB"/>
                        <path d="M-20,-40 a40,40 0 0,1 40,0 l5,60 a30,30 0 0,1 -50,0 z" fill="#F9FAFB"/>
                        
                        {/* Helmet */}
                        <circle cx="0" cy="-35" r="30" fill="#E5E7EB"/>
                        <circle cx="0" cy="-35" r="28" fill="#111827"/>
                        <path d="M-15,-30 a20,15 0 0,1 30,0 a20,15 0 0,1 -30,0" fill="#4B5563" opacity="0.3"/>
                        
                        {/* Backpack */}
                        <rect x="-35" y="-10" width="70" height="40" rx="10" fill="#9CA3AF"/>
                        <rect x="-30" y="-5" width="60" height="30" rx="5" fill="#6B7280"/>
                        
                        {/* Arms */}
                        <path d="M-30,0 c-20,0 -20,30 -40,30" stroke="#E5E7EB" strokeWidth="15" fill="none" strokeLinecap="round"/>
                        <path d="M30,0 c20,0 20,30 40,30" stroke="#E5E7EB" strokeWidth="15" fill="none" strokeLinecap="round"/>

                        {/* Legs */}
                         <path d="M-15,20 v30 a10,10 0 0,0 10,10 h10" stroke="#E5E7EB" strokeWidth="15" fill="none" strokeLinecap="round"/>
                         <path d="M15,20 v30 a10,10 0 0,1 -10,10 h-10" stroke="#E5E7EB" strokeWidth="15" fill="none" strokeLinecap="round"/>
                    </g>
                </svg>
            </div>
            
            <h1 className="text-7xl md:text-9xl font-black bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-purple-500 mb-4 tracking-tighter">
              404
            </h1>
            
            <h2 className="text-2xl md:text-4xl font-bold mb-6">Lost in Space</h2>
            
            <p className="text-gray-400 mb-10 text-lg max-w-xl mx-auto">
              Oops! It seems you've drifted into uncharted territory. 
              Let's get you back to familiar ground.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="/"
                className="px-8 py-4 rounded-full font-semibold bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 transform hover:scale-105 shadow-lg hover:shadow-purple-500/50 flex items-center justify-center gap-2 group"
              >
                <svg className="w-5 h-5 transition-transform group-hover:-rotate-12" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg>
                Return to Home Base
              </a>
              
              <button 
                onClick={() => window.history.back()} 
                className="px-8 py-4 rounded-full font-semibold border border-gray-700 hover:border-gray-500 bg-gray-800/50 hover:bg-gray-700/50 transition-all duration-300 transform hover:scale-105"
              >
                Go Back
              </button>
            </div>
          </div>
        </div>
        
        <style jsx global>{`
          body {
            font-family: 'Inter', sans-serif;
          }
          
          @keyframes float {
            0% { transform: translateY(0px) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
            100% { transform: translateY(0px) rotate(0deg); }
          }
          .animate-float {
            animation: float 6s ease-in-out infinite;
          }

          @keyframes pulse-slow {
            0%, 100% { opacity: 0.2; transform: scale(1); }
            50% { opacity: 0.3; transform: scale(1.05); }
          }
          .animate-pulse-slow {
            animation: pulse-slow 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
          }
          
          /* Starfield background styles */
          @function random_range($min, $max) {
            $rand: random();
            $random_range: $min + floor($rand * ($max - $min + 1));
            @return $random_range;
          }

          #stars, #stars2, #stars3 {
            position: absolute;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            overflow: hidden;
          }

          #stars {
            background-image: 
              radial-gradient(1px 1px at 20px 30px, #eee, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 40px 70px, #fff, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 50px 160px, #ddd, rgba(0,0,0,0)),
              radial-gradient(1px 1px at 90px 40px, #fff, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 130px 80px, #fff, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 160px 120px, #ddd, rgba(0,0,0,0));
            background-repeat: repeat;
            background-size: 200px 200px;
            animation: zoom 15s infinite;
            opacity: 0;
          }

          #stars2 {
            background-image: 
              radial-gradient(1px 1px at 10px 90px, #eee, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 80px 30px, #fff, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 120px 180px, #ddd, rgba(0,0,0,0));
            background-repeat: repeat;
            background-size: 300px 300px;
            animation: zoom 20s infinite;
            opacity: 0;
          }
          
          #stars3 {
            background-image: 
              radial-gradient(2px 2px at 50px 50px, #fff, rgba(0,0,0,0)),
              radial-gradient(2px 2px at 100px 100px, #ddd, rgba(0,0,0,0)),
              radial-gradient(3px 3px at 150px 150px, #fff, rgba(0,0,0,0));
            background-repeat: repeat;
            background-size: 400px 400px;
            animation: zoom 25s infinite;
            opacity: 0;
          }

          @keyframes zoom {
            0% {
              opacity: 0;
              transform: scale(0.5);
              animation-timing-function: ease-in;
            } 
            85% {
              opacity: 1;
              transform: scale(2.5);
              animation-timing-function: linear;
            }
            100% {
              opacity: 0;
              transform: scale(3);
            }
          }
        `}</style>
      </div>
    </>
  );
}

    
