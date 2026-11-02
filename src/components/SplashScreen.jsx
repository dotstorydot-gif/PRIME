import React, { useState, useEffect } from 'react';

export default function SplashScreen() {
  const [isVisible, setIsVisible] = useState(true);
  const [isFading, setIsFading] = useState(false);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    // Smooth progress bar animation
    const progressInterval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        return Math.min(prev + 5, 100);
      });
    }, 70);

    // Fade out after 2.1 seconds
    const fadeTimer = setTimeout(() => {
      setIsFading(true);
    }, 2100);

    // Completely unmount splash screen from DOM after fade completes
    const finishTimer = setTimeout(() => {
      setIsVisible(false);
    }, 2700);

    return () => {
      clearInterval(progressInterval);
      clearTimeout(fadeTimer);
      clearTimeout(finishTimer);
    };
  }, []);

  const handleSkip = () => {
    setIsFading(true);
    setTimeout(() => {
      setIsVisible(false);
    }, 200);
  };

  if (!isVisible) return null;

  return (
    <div
      onClick={handleSkip}
      className={`fixed inset-0 z-[99999] flex flex-col items-center justify-center bg-[#1D2743] transition-opacity duration-600 ease-out select-none cursor-pointer ${
        isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
      aria-label="Prime Wood Arthouse Loading Screen"
      role="dialog"
      aria-modal="true"
    >
      {/* Subtle background ambient gold vignette */}
      <div className="absolute inset-0 bg-radial-gradient pointer-events-none opacity-40 bg-[radial-gradient(circle_at_center,_rgba(241,231,204,0.08)_0%,_transparent_70%)]" />

      <div className="relative z-10 flex flex-col items-center text-center px-6 max-w-md w-full animate-fade-in">
        {/* PRIME Official Light Logo */}
        <div className="relative mb-6 transform transition-transform duration-1000 ease-out scale-100">
          <img
            src="/images/prime-logo-light@2x.png"
            onError={(e) => {
              e.target.src = '/images/prime-logo-light.png';
            }}
            alt="PRIME Wood Arthouse"
            className="h-16 sm:h-20 md:h-24 w-auto object-contain drop-shadow-lg"
          />
        </div>

        {/* Brand Heritage Sub-caption */}
        <div className="flex items-center space-x-3 text-[#F1E7CC]/85 text-xs sm:text-sm tracking-[0.3em] uppercase font-light mb-8">
          <span>WOOD ARTHOUSE</span>
          <span className="w-1.5 h-1.5 rounded-full bg-[#F1E7CC]/50" />
          <span>EST. 1948</span>
        </div>

        {/* Minimalist Hairline Progress Bar */}
        <div className="w-48 sm:w-60 h-[1.5px] bg-[#F1E7CC]/20 rounded-full overflow-hidden">
          <div
            className="h-full bg-[#F1E7CC] transition-all duration-100 ease-out rounded-full"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="mt-4 text-[10px] sm:text-xs tracking-[0.2em] text-[#D8D2C2]/50 uppercase font-light">
          Cairo, Egypt
        </p>
      </div>
    </div>
  );
}
