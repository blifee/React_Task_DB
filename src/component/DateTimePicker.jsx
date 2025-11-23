import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function DateTimePicker() {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date(2025, 11, 1)); // Dec 2025
  const [hour, setHour] = useState(10);
  const [minute, setMinute] = useState(29);
  const [period, setPeriod] = useState('AM');
  const [showQuickRanges, setShowQuickRanges] = useState(false);

  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();
    
    const days = [];
    
    // Previous month days
    const prevMonthLastDay = new Date(year, month, 0).getDate();
    for (let i = startingDayOfWeek - 1; i >= 0; i--) {
      days.push({
        day: prevMonthLastDay - i,
        isCurrentMonth: false,
        isPrevMonth: true
      });
    }
    
    // Current month days
    for (let i = 1; i <= daysInMonth; i++) {
      days.push({
        day: i,
        isCurrentMonth: true,
        isPrevMonth: false
      });
    }
    
    // Next month days
    const remainingDays = 42 - days.length; // 6 rows × 7 days
    for (let i = 1; i <= remainingDays; i++) {
      days.push({
        day: i,
        isCurrentMonth: false,
        isPrevMonth: false
      });
    }
    
    return days;
  };

  const handlePrevMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  };

  const handleNextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));
  };

  const handleDateClick = (day) => {
    if (day.isCurrentMonth) {
      setSelectedDate(day.day);
    }
  };

  const handleSet = () => {
    const dateTime = `${monthNames[currentMonth.getMonth()]} ${selectedDate || '?'}, ${currentMonth.getFullYear()} ${hour}:${minute.toString().padStart(2, '0')} ${period}`;
    alert(`Selected: ${dateTime}`);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setIsOpen(false);
  };

  const handleQuickRange = (range) => {
    const today = new Date();
    let startDate, endDate;

    if (range === 'today') {
      startDate = endDate = today;
      setSelectedDate(today.getDate());
      setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
      alert(`Selected: Today - ${monthNames[today.getMonth()]} ${today.getDate()}, ${today.getFullYear()}`);
    } else if (range === 'last7days') {
      endDate = today;
      startDate = new Date(today);
      startDate.setDate(today.getDate() - 7);
      alert(`Selected: Last 7 Days - ${monthNames[startDate.getMonth()]} ${startDate.getDate()} to ${monthNames[endDate.getMonth()]} ${endDate.getDate()}, ${endDate.getFullYear()}`);
    } else if (range === 'thisMonth') {
      startDate = new Date(today.getFullYear(), today.getMonth(), 1);
      endDate = new Date(today.getFullYear(), today.getMonth() + 1, 0);
      setCurrentMonth(startDate);
      alert(`Selected: This Month - ${monthNames[today.getMonth()]} ${today.getFullYear()}`);
    }
    
    setShowQuickRanges(false);
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <div className="flex items-center justify-center bg-white-100 min-h-[10vh]">
       

      <div className="relative">                                                                   
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="px-3 py-1.5 bg-white border border-gray-400 text-sm hover:bg-gray-50"
        >
          Open DateTime Picker
        </button>

        {isOpen && (
          <div className="absolute top-10 left-0 w-48 bg-white border border-gray-400 shadow-lg p-2 z-10">
            {/* Quick Range Toggle */}
            <div className="mb-2">
              <button
                onClick={() => setShowQuickRanges(!showQuickRanges)}
                className="text-[10px] text-blue-600 hover:text-blue-800 underline"
              >
                {showQuickRanges ? 'Hide Quick Ranges' : 'Quick Ranges'}
              </button>
            </div>

            {/* Quick Range Options */}
            {showQuickRanges && (
                <div className="mb-2 pb-2 border-b border-gray-300">
                <button
                  onClick={() => handleQuickRange('today')}
                  className="block w-full text-left text-[10px] py-1 px-2 hover:bg-gray-100"
                >
                  Today
                </button>
                <button
                  onClick={() => handleQuickRange('last7days')}
                  className="block w-full text-left text-[10px] py-1 px-2 hover:bg-gray-100"
                >
                  Last 7 Days
                </button>
                <button
                  onClick={() => handleQuickRange('thisMonth')}
                  className="block w-full text-left text-[10px] py-1 px-2 hover:bg-gray-100"
                >
                  This Month
                </button>
              </div>
            )}

            {/* Month Navigation */}
            {/* Header */}
            <div className="flex items-center justify-between mb-2">
              <button onClick={handlePrevMonth} className="p-1 hover:bg-gray-100 rounded">
                <ChevronLeft size={16} />
              </button>
              <div className="text-sm font-semibold">
                {monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}
              </div>
              <button onClick={handleNextMonth} className="p-1 hover:bg-gray-100 rounded">
                <ChevronRight size={16} />
              </button>
            </div>

            {/* Calendar Icon */}
            <div className="flex justify-center mb-2">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <rect x="2" y="3" width="12" height="11" stroke="currentColor" strokeWidth="1.5" fill="none"/>
                <line x1="2" y1="6" x2="14" y2="6" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="5" y1="1" x2="5" y2="4" stroke="currentColor" strokeWidth="1.5"/>
                <line x1="11" y1="1" x2="11" y2="4" stroke="currentColor" strokeWidth="1.5"/>
              </svg>
            </div>

            {/* Day names */}
            <div className="grid grid-cols-7 gap-1 mb-1">
              {dayNames.map(day => (
                <div key={day} className="text-xs text-center font-medium text-gray-600">
                  {day}
                </div>
              ))}
            </div>

            {/* Calendar days */}
            <div className="grid grid-cols-7 gap-1 mb-3">
              {days.map((dayObj, idx) => (
                <button
                  key={idx}
                  onClick={() => handleDateClick(dayObj)}
                  className={`text-xs py-1 text-center hover:bg-blue-100 rounded ${
                    !dayObj.isCurrentMonth ? 'text-gray-400' : 'text-gray-900'
                  } ${
                    selectedDate === dayObj.day && dayObj.isCurrentMonth ? 'bg-blue-500 text-white hover:bg-blue-600' : ''
                  }`}
                >
                  {dayObj.day}
                </button>
              ))}
            </div>

            {/* Time selectors */}
            <div className="flex gap-2 mb-3">
              <select
                value={hour}
                onChange={(e) => setHour(parseInt(e.target.value))}
                className="flex-1 text-xs border border-gray-300 rounded px-1 py-1"
              >
                {Array.from({ length: 12 }, (_, i) => i + 1).map(h => (
                  <option key={h} value={h}>{h}</option>
                ))}
              </select>

              <select
                value={minute}
                onChange={(e) => setMinute(parseInt(e.target.value))}
                className="flex-1 text-xs border border-gray-300 rounded px-1 py-1"
              >
                {Array.from({ length: 60 }, (_, i) => i).map(m => (
                  <option key={m} value={m}>{m.toString().padStart(2, '0')}</option>
                ))}
              </select>

              <select
                value={period}
                onChange={(e) => setPeriod(e.target.value)}
                className="flex-1 text-xs border border-gray-300 rounded px-1 py-1"
              >
                <option value="AM">AM</option>
                <option value="PM">PM</option>
              </select>
            </div>

            {/* Action buttons */}
            <div className="flex gap-2">
              <button
                onClick={handleCancel}
                className="flex-1 text-xs py-1.5 border border-gray-300 rounded hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={handleSet}
                className="flex-1 text-xs py-1.5 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Set
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}