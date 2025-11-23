import React, { useState, useRef, useEffect } from 'react';
import { X, ChevronDown, Search } from 'lucide-react';

export default function MultiSelectDropdown() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedItems, setSelectedItems] = useState(['Office Space', 'Plot']);
  const [searchTerm, setSearchTerm] = useState('');
  const [options, setOptions] = useState(['Office Space','Plot','Apartment','Villa','Shop','Warehouse','Land','Building']);
  const [isLoading, setIsLoading] = useState(false);
  const dropdownRef = useRef(null);
  const searchInputRef = useRef(null);

  // Simulate async data loading
  useEffect(() => {
    if (isOpen && options.length === 0) {
      setIsLoading(true);
      setTimeout(() => {
        setOptions(['Office Space','Plot','Apartment','Villa','Shop','Warehouse','Land','Building']);
        setIsLoading(false);
      }, 1000);
    }
  }, [isOpen, options.length]);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Focus search input when dropdown opens
  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  const handleRemoveItem = (item, e) => {
    e.stopPropagation();
    setSelectedItems(selectedItems.filter(i => i !== item));
  };

  const handleToggleItem = (item) => {
    if (selectedItems.includes(item)) {
      setSelectedItems(selectedItems.filter(i => i !== item));
    } else {
      setSelectedItems([...selectedItems, item]);
    }
  };

  const handleClearAll = () => {
    setSelectedItems([]);
  };

  const filteredOptions = options.filter(option =>
    option.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleKeyDown = (e) => {
    if (e.key === 'Escape') {
      setIsOpen(false);
    } else if (e.key === 'Enter' && filteredOptions.length > 0) {
      handleToggleItem(filteredOptions[0]);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50 p-8">
      <div className="w-full max-w-lg">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">
            Property Sub-Type <span className="text-red-500">*</span>
          </label>
          
          <div className="relative" ref={dropdownRef}>
            {/* Selected Items Display */}
            <div
              onClick={() => setIsOpen(!isOpen)}
              className="min-h-[44px] w-full px-3 py-2 bg-white border-2 border-teal-500 rounded cursor-pointer flex flex-wrap gap-2 items-center"
              role="combobox"
              aria-expanded={isOpen}
              aria-haspopup="listbox"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  setIsOpen(!isOpen);
                }
              }}
            >
              {selectedItems.length > 0 ? (
                <>
                  {selectedItems.map(item => (
                    <span
                      key={item}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-gray-200 text-gray-700 text-sm rounded"
                    >
                      <X size={14} />
                      <span>{item}</span>
                      <button
                        onClick={(e) => handleRemoveItem(item, e)}
                        className="hover:text-red-600"
                        aria-label={`Remove ${item}`}
                      >
                      </button>
                    </span>
                  ))}
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleClearAll();
                    }}
                    className="ml-auto text-gray-500 hover:text-gray-700"
                    aria-label="Clear all selections"
                  >
                    <X size={16} />
                  </button>
                </>
              ) : (
                <span className="text-gray-400">Select property types...</span>
              )}
              
              <ChevronDown
                size={20}
                className={`ml-auto text-gray-500 transition-transform ${isOpen ? 'rotate-180' : ''}`}
              />
            </div>

            {/* CLEAR ALL Button */}
            {selectedItems.length > 0 && (
              <button
                onClick={handleClearAll}
                className="mt-2 text-xs text-blue-600 hover:text-blue-800 underline"
              >
                CLEAR ALL
              </button>
            )}

            {/* Dropdown Menu */}
            {isOpen && (
              <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded shadow-lg max-h-60 overflow-hidden">
                {/* Search Input */}
                <div className="p-2 border-b border-gray-200">
                  <div className="relative">
                    <Search size={16} className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" />
                    <input ref={searchInputRef} type="text" value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      onKeyDown={handleKeyDown}
                      placeholder="Search..."
                      className="w-full pl-8 pr-2 py-1.5 text-sm border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-teal-500"
                      aria-label="Search options"
                    />
                  </div>
                </div>

                {/* Options List */}
                <div className="overflow-y-auto max-h-48" role="listbox">
                  {isLoading ? (
                    <div className="p-4 text-center text-gray-500">
                      <div className="animate-spin inline-block w-5 h-5 border-2 border-teal-500 border-t-transparent rounded-full"></div>
                      <p className="mt-2 text-sm">Loading options...</p>
                    </div>
                  ) : filteredOptions.length > 0 ? (
                    filteredOptions.map(option => (
                      <div
                        key={option}
                        onClick={() => handleToggleItem(option)}
                        className={`px-4 py-2 cursor-pointer hover:bg-gray-100 flex items-center gap-2 ${
                          selectedItems.includes(option) ? 'bg-teal-50' : ''
                        }`}
                        role="option"
                        aria-selected={selectedItems.includes(option)}
                        tabIndex={0}
                        onKeyDown={(e) => {
                          if (e.key === 'Enter' || e.key === ' ') {
                            e.preventDefault();
                            handleToggleItem(option);
                          }
                        }}>
                        <input
                          type="checkbox"
                          checked={selectedItems.includes(option)}
                          onChange={() => {}}
                          className="w-4 h-4 text-teal-600 border-gray-300 rounded focus:ring-teal-500"
                          tabIndex={-1}
                        />
                        <span className="text-sm">{option}</span>
                      </div>
                    ))
                  ) : (
                    <div className="p-4 text-center text-gray-500 text-sm">
                      No options found
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Display Selected Values */}
        <div className="mt-4 p-4 bg-gray-100 rounded">
          <h4 className="font-semibold text-sm mb-2">Selected Values:</h4>
          {selectedItems.length > 0 ? (
            <p className="text-sm text-gray-700">{selectedItems.join(', ')}</p>
          ) : (
            <p className="text-sm text-gray-500">No selections</p>
          )}
        </div>
      </div>
    </div>
  );
}