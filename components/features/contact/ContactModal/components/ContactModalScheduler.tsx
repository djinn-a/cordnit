import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, ChevronDown, Calendar, CheckCircle2 } from 'lucide-react';

interface ContactModalSchedulerProps {
  isSubmitting: boolean;
  submitError: string | null;
  handleBack: () => void;
  onSubmit: (formattedDate: string, scheduledTime: string) => void;
}

export function ContactModalScheduler({
  isSubmitting,
  submitError,
  handleBack,
  onSubmit
}: ContactModalSchedulerProps) {
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);
  const [scheduledTime, setScheduledTime] = useState<string>('02:00 PM');

  const getDaysInMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate();
  const getFirstDayOfMonth = (date: Date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay();

  const handlePrevMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
  const handleNextMonth = () => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1));

  const generateDays = () => {
    const daysInMonth = getDaysInMonth(currentMonth);
    const firstDay = getFirstDayOfMonth(currentMonth);
    const prevMonthDays = getDaysInMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1));
    const daysArray = [];

    for (let i = firstDay - 1; i >= 0; i--) {
      daysArray.push({
        day: prevMonthDays - i,
        isCurrentMonth: false,
        date: new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, prevMonthDays - i)
      });
    }

    for (let i = 1; i <= daysInMonth; i++) {
      daysArray.push({
        day: i,
        isCurrentMonth: true,
        date: new Date(currentMonth.getFullYear(), currentMonth.getMonth(), i)
      });
    }

    const remainingCells = 42 - daysArray.length;
    for (let i = 1; i <= remainingCells; i++) {
      daysArray.push({
        day: i,
        isCurrentMonth: false,
        date: new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, i)
      });
    }

    return daysArray;
  };

  const daysArray = generateDays();

  const handleBookCall = () => {
    if (!selectedDate) return;
    const formattedDate = selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    onSubmit(formattedDate, scheduledTime);
  };

  return (
    <div className="flex flex-col">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
        {/* Left: Calendar */}
        <div className="bg-surface-dark/50 rounded-xl border border-gray-700/50 p-5">
          <div className="flex justify-between items-center mb-6">
            <div className="flex items-center gap-2">
              <button onClick={handlePrevMonth} className="text-gray-400 hover:text-white transition-colors">
                <ChevronLeft className="w-4 h-4" />
              </button>
              <div className="text-sm text-gray-300 font-medium min-w-[100px] text-center">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>
              <button onClick={handleNextMonth} className="text-gray-400 hover:text-white transition-colors">
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => {
                setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
                setSelectedDate(today);
              }}
              className="text-[10px] px-2 py-0.5 rounded border border-primary/50 text-primary hover:bg-primary-pale0/10 transition-colors"
            >
              Today
            </button>
          </div>

          <div className="grid grid-cols-7 gap-y-4 mb-2 text-center text-[10px] text-gray-500 font-medium uppercase">
            <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
          </div>

          <div className="grid grid-cols-7 gap-y-2 text-center text-xs text-gray-300">
            {daysArray.map((item, idx) => {
              const isPast = item.date < today;
              const isSelected = selectedDate && item.date.getTime() === selectedDate.getTime();
              return (
                <div key={idx} className={`py-1.5 relative ${!item.isCurrentMonth ? 'opacity-30' : ''}`}>
                  <button
                    disabled={isPast}
                    onClick={() => {
                      if (!isPast) {
                        setSelectedDate(item.date);
                        if (!item.isCurrentMonth) {
                          setCurrentMonth(new Date(item.date.getFullYear(), item.date.getMonth(), 1));
                        }
                      }
                    }}
                    className={`w-7 h-7 mx-auto rounded-lg flex items-center justify-center transition-colors ${isSelected
                      ? 'bg-primary text-white shadow-[0_0_10px_rgba(43,92,255,0.4)] opacity-100'
                      : isPast
                        ? 'cursor-not-allowed text-gray-600'
                        : 'hover:bg-white/5 cursor-pointer'
                      }`}
                  >
                    {item.day}
                  </button>
                  {isSelected && <div className="absolute bottom-1 left-1/2 -translate-x-1/2 w-1 h-1 bg-white rounded-full"></div>}
                </div>
              );
            })}
          </div>
        </div>

        {/* Right: Available times */}
        <div className="flex flex-col">
          <h4 className="text-gray-200 font-medium mb-1">Available times</h4>
          <p className="text-gray-500 text-[11px] mb-4">
            {selectedDate ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : 'Select a date'}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-auto">
            {['09:00 AM', '10:00 AM', '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'].map((time) => (
              <button
                key={time}
                onClick={() => setScheduledTime(time)}
                className={`py-2 px-3 rounded-full text-[11px] font-medium border transition-colors ${scheduledTime === time
                  ? 'bg-primary border-primary text-white shadow-glow-primary'
                  : 'bg-transparent border-gray-700/80 text-gray-300 hover:border-gray-500'
                  }`}
              >
                {time}
              </button>
            ))}
          </div>

          <div className="text-gray-500 text-[10px] mt-4 flex items-center">
            <svg className="w-3 h-3 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
            All times are in India Standard Time (IST) <ChevronDown className="w-3 h-3 ml-1" />
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="bg-surface-dark/40 rounded-xl border border-gray-700/50 p-4 md:p-5 flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-1 flex gap-4">
          <div className="mt-0.5">
            <Calendar className="w-5 h-5 text-gray-300" />
          </div>
          <div>
            <h4 className="text-sm text-gray-200 font-medium mb-1">30-minute consultation</h4>
            <p className="text-xs text-gray-400 leading-relaxed pr-4">A focused discussion with our experts to understand your goals and explore how Cordinit can help.</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center gap-2 border-t md:border-t-0 md:border-l border-gray-700/50 pt-4 md:pt-0 md:pl-6">
          <div className="flex items-center text-[11px] text-gray-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary mr-2 shrink-0" /> Talk to a solution expert
          </div>
          <div className="flex items-center text-[11px] text-gray-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary mr-2 shrink-0" /> Get tailored recommendations
          </div>
          <div className="flex items-center text-[11px] text-gray-400">
            <CheckCircle2 className="w-3.5 h-3.5 text-primary mr-2 shrink-0" /> No obligation
          </div>
        </div>
      </div>

      {submitError && (
        <div className="p-3 text-[13px] text-red-400 bg-red-900/20 border border-error/50 rounded-lg mb-6">
          {submitError}
        </div>
      )}

      <div className="flex justify-between items-center">
        <button onClick={handleBack} className="bg-transparent border border-gray-600 hover:bg-white/5 text-gray-300 py-2.5 px-6 rounded-lg text-[13px] font-medium transition-colors flex items-center">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back
        </button>
        <button onClick={handleBookCall} disabled={isSubmitting} className={`bg-primary hover:bg-primary text-white py-2.5 px-10 rounded-lg text-[13px] font-medium transition-colors shadow-[0_0_15px_rgba(43,92,255,0.4)] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
          {isSubmitting ? 'Booking...' : 'Book a call'}
        </button>
      </div>
    </div>
  );
}
