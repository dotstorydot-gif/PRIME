import React, { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check } from 'lucide-react';

export default function CustomDropdown({ 
  labelPrefix, 
  value, 
  onChange, 
  options, 
  align = 'right',
  className = '' 
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const selectedOption = options.find(opt => opt.value === value) || options[0];

  // Close when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Close on Escape key
  useEffect(() => {
    function handleKeyDown(event) {
      if (event.key === 'Escape') {
        setIsOpen(false);
      }
    }
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      return () => document.removeEventListener('keydown', handleKeyDown);
    }
  }, [isOpen]);

  return (
    <div className={`relative inline-block text-left ${className}`} ref={dropdownRef}>
      {/* Trigger Button */}
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="inline-flex items-center space-x-1.5 py-1 px-2 text-xs uppercase tracking-wider text-charcoal-800 hover:text-wood-800 font-medium transition-colors focus:outline-none group rounded-sm"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
      >
        {labelPrefix && (
          <span className="text-[10px] uppercase tracking-widest text-charcoal-500 font-normal">
            {labelPrefix}
          </span>
        )}
        
        {/* Color Swatch if present */}
        {selectedOption?.swatch && (
          <span 
            className="w-2.5 h-2.5 rounded-full border border-black/15 shrink-0" 
            style={{ backgroundColor: selectedOption.swatch }}
          />
        )}

        <span className="font-semibold text-charcoal-900 group-hover:text-wood-900">
          {selectedOption?.label}
        </span>

        <ChevronDown 
          className={`w-3.5 h-3.5 text-charcoal-500 transition-transform duration-200 ease-out group-hover:text-wood-700 ${
            isOpen ? 'rotate-180 text-wood-700' : ''
          }`} 
        />
      </button>

      {/* Dropdown Menu matching the Warm Luxury Theme */}
      {isOpen && (
        <div 
          className={`absolute ${align === 'right' ? 'right-0' : 'left-0'} mt-2 w-52 bg-[#FAF8F5] border border-[#E9E2D5] shadow-xl z-50 py-1.5 focus:outline-none transition-all duration-150 animate-fadeIn`}
          role="listbox"
        >
          {options.map((option) => {
            const isSelected = option.value === value;
            return (
              <button
                key={option.value}
                type="button"
                role="option"
                aria-selected={isSelected}
                onClick={() => {
                  onChange(option.value);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-3.5 py-2.5 text-xs uppercase tracking-wider flex items-center justify-between transition-colors ${
                  isSelected 
                    ? 'bg-wood-100 text-wood-950 font-semibold' 
                    : 'text-charcoal-700 hover:bg-[#F2ECE1] hover:text-charcoal-950 font-medium'
                }`}
              >
                <div className="flex items-center space-x-2.5 truncate">
                  {option.swatch && (
                    <span 
                      className="w-3 h-3 rounded-full border border-black/20 shrink-0" 
                      style={{ backgroundColor: option.swatch }}
                    />
                  )}
                  <span className="truncate">{option.label}</span>
                </div>
                {isSelected && (
                  <Check className="w-3.5 h-3.5 text-wood-700 shrink-0 ml-2" />
                )}
              </button>
            );
          })}
        </div>
      )}
    </div>
  );
}
