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
}: Readonly<ContactModalSchedulerProps>) {
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
      <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-6 md:gap-8 mb-6">
        {/* Left: Calendar */}
        <div className="bg-transparent p-0 flex flex-col">
          <div className="flex justify-between items-center mb-4">
            <div className="flex items-center gap-2">
              <button onClick={handlePrevMonth} className="text-gray-500 hover:text-gray-900 transition-colors">
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="text-base md:text-lg text-gray-900 font-medium min-w-[120px] text-center">
                {currentMonth.toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
              </div>
              <button onClick={handleNextMonth} className="text-gray-500 hover:text-gray-900 transition-colors">
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
            <button
              onClick={() => {
                setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
                setSelectedDate(today);
              }}
              className="text-[11px] px-3 py-1 rounded-full border border-primary text-primary hover:bg-primary/10 transition-colors"
            >
              Today
            </button>
          </div>

          <div className="w-full h-px bg-gray-200 mb-4"></div>

          <div className="grid grid-cols-7 gap-y-4 mb-2 text-center text-[11px] text-gray-500 font-medium uppercase">
            <div>Sun</div><div>Mon</div><div>Tue</div><div>Wed</div><div>Thu</div><div>Fri</div><div>Sat</div>
          </div>

          <div className="grid grid-cols-7 gap-y-2 text-center text-[13px] text-gray-700">
            {daysArray.map((item, idx) => {
              const isPast = item.date < today;
              const isSelected = selectedDate && item.date.getTime() === selectedDate.getTime();
              return (
                <div key={idx} className={`py-1.5 relative ${!item.isCurrentMonth ? 'opacity-40' : ''}`}>
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
                    className={`w-8 h-8 mx-auto rounded-lg flex items-center justify-center transition-colors ${isSelected
                      ? 'bg-primary text-white shadow-glow-primary'
                      : isPast
                        ? 'cursor-not-allowed text-gray-400'
                        : 'hover:bg-gray-200 cursor-pointer text-gray-900'
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

        {/* Vertical Divider */}
        <div className="hidden md:block w-px bg-gray-200"></div>

        {/* Right: Available times */}
        <div className="flex flex-col">
          <h4 className="text-gray-900 text-lg md:text-xl font-medium mb-1">Available times</h4>
          <p className="text-gray-600 text-sm mb-6">
            {selectedDate ? selectedDate.toLocaleDateString('en-US', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' }) : 'Select a date'}
          </p>

          <div className="grid grid-cols-2 gap-3 mb-auto">
            {['09:00 AM', '10:00 AM', '11:00 AM', '11:30 AM', '02:00 PM', '02:30 PM', '03:00 PM', '03:30 PM', '04:00 PM', '04:30 PM'].map((time) => (
              <button
                key={time}
                onClick={() => setScheduledTime(time)}
                className={`py-2.5 px-3 rounded-full text-sm font-medium border transition-colors ${scheduledTime === time
                  ? 'bg-primary border-primary text-white shadow-glow-primary'
                  : 'bg-transparent border-gray-300 text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                  }`}
              >
                {time}
              </button>
            ))}
          </div>

          <div className="w-full h-px bg-gray-200 mt-6 mb-4"></div>

          <div className="text-gray-500 text-[11px] flex items-center">
            <svg className="w-3.5 h-3.5 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9"></path></svg>
            All times are in India Standard Time (IST) <ChevronDown className="w-3.5 h-3.5 ml-1" />
          </div>
        </div>
      </div>

      {/* Bottom section */}
      <div className="bg-transparent rounded-[24px] border border-gray-200 p-5 md:p-6 flex flex-col md:flex-row gap-6 mb-6">
        <div className="flex-[1.5] flex gap-4">
          <div className="mt-0.5">
            <Calendar className="w-6 h-6 text-gray-700" />
          </div>
          <div>
            <h4 className="text-base text-gray-900 font-medium mb-2">30-minute consultation</h4>
            <p className="text-sm text-gray-600 leading-relaxed pr-4">A focused discussion with our experts to understand your goals and explore how Cordinit can help.</p>
          </div>
        </div>

        <div className="flex-1 flex flex-col justify-center gap-3 border-t md:border-t-0 md:border-l border-gray-200 pt-4 md:pt-0 md:pl-8">
          <div className="flex items-center text-sm text-gray-700">
            <div className="bg-primary rounded-full p-0.5 mr-3 shrink-0"><CheckCircle2 className="w-3.5 h-3.5 text-white" /></div> Talk to a solution expert
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <div className="bg-primary rounded-full p-0.5 mr-3 shrink-0"><CheckCircle2 className="w-3.5 h-3.5 text-white" /></div> Get tailored recommendations
          </div>
          <div className="flex items-center text-sm text-gray-700">
            <div className="bg-primary rounded-full p-0.5 mr-3 shrink-0"><CheckCircle2 className="w-3.5 h-3.5 text-white" /></div> No obligation
          </div>
        </div>
      </div>

      {submitError && (
        <div className="p-3 text-[13px] text-red-400 bg-red-900/20 border border-error/50 rounded-lg mb-6">
          {submitError}
        </div>
      )}

      <div className="flex justify-between items-center mt-4">
        <button onClick={handleBack} className="bg-transparent border border-gray-300 hover:bg-gray-100 text-gray-700 hover:text-gray-900 py-2.5 px-8 rounded-lg text-sm font-medium transition-colors flex items-center">
          <ChevronLeft className="w-4 h-4 mr-1" /> Back
        </button>
        <button onClick={handleBookCall} disabled={isSubmitting} className={`bg-primary hover:bg-primary/90 text-white py-2.5 px-12 rounded-lg text-sm font-medium transition-colors shadow-glow-primary ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
          {isSubmitting ? 'Booking...' : 'Book a call'}
        </button>
      </div>
    </div>
  );
}
