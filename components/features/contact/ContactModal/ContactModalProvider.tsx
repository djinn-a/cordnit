"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { X, Calendar, CheckCircle2, ChevronLeft, ChevronDown, ChevronRight } from 'lucide-react';
import Link from 'next/link';
import { useLeadForm } from '../../../../hooks/useLeadForm';

interface ModalContext {
  ctaLocation?: string;
  source?: string;
  service?: string;
  solution?: string;
  [key: string]: any;
}

interface ContactModalContextType {
  isOpen: boolean;
  openModal: (context?: ModalContext) => void;
  closeModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error('useContactModal must be used within a ContactModalProvider');
  }
  return context;
}

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [modalContext, setModalContext] = useState<ModalContext>({});

  const {
    formData,
    selectedInterests,
    errors,
    isSubmitting,
    submitError,
    isSuccess,
    handleInputChange,
    toggleInterest,
    validateForm,
    handleSubmit,
    resetForm
  } = useLeadForm(modalContext);

  const [step, setStep] = useState<1 | 2>(1);
  const [scheduledTime, setScheduledTime] = useState<string>('02:00 PM');

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const [currentMonth, setCurrentMonth] = useState(new Date(today.getFullYear(), today.getMonth(), 1));
  const [selectedDate, setSelectedDate] = useState<Date | null>(today);

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

  const openModal = (context?: any) => {
    // Prevent React SyntheticEvents from being stored as context
    if (context && typeof context === 'object' && !('nativeEvent' in context) && !('preventDefault' in context)) {
      setModalContext(context);
    } else {
      setModalContext({});
    }
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
    // Reset form after closing animation (approx 300ms)
    setTimeout(() => {
      resetForm();
      setModalContext({});
      setStep(1);
      setScheduledTime('02:00 PM');
      setCurrentMonth(new Date(today.getFullYear(), today.getMonth(), 1));
      setSelectedDate(today);
    }, 300);
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setStep(2);
    }
  };

  const handleBack = () => setStep(1);

  const handleBookCall = () => {
    if (!selectedDate) return;
    const formattedDate = selectedDate.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' });
    handleSubmit(undefined, `${formattedDate} at ${scheduledTime}`);
  };

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const interestsList = [
    'Cybersecurity', 'Managed Services', 'AI & Automation',
    'Application Engineering', 'Data & Integration',
    'Salesforce', 'Cloud & Infrastructure', 'Something else'
  ];

  const inputClasses = (fieldName: string) =>
    `w-full px-4 py-3.5 rounded-lg border bg-white/[0.03] text-white text-[13px] placeholder:text-gray-400 transition-colors focus:outline-none focus:border-white/40 focus:ring-1 focus:ring-white/20 ${errors[fieldName] ? 'border-red-500/80' : 'border-white/20'}`;

  return (
    <ContactModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}

      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
          {/* Overlay */}
          <div
            className="fixed inset-0 bg-[#050811]/70 transition-opacity"
            onClick={closeModal}
          ></div>

          {/* Modal Container */}
          <div
            className="relative w-full max-w-[1000px] bg-cover bg-center rounded-[2rem] overflow-hidden shadow-2xl flex flex-col items-center justify-center min-h-[600px] my-auto border border-white/5 py-12"
            style={{ backgroundImage: 'url(/popup-bg.jpg)' }}
            onClick={(e) => e.stopPropagation()}
          >

            {/* Close button */}
            <button
              onClick={closeModal}
              className="absolute top-6 right-6 z-50 p-2 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-md transition-colors"
              aria-label="Close modal"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="w-full max-w-[800px] relative z-20 flex flex-col">

              {/* Stepper */}
              <div className="contact-stepper w-full flex justify-center mb-8 z-20 relative">
                <div className="flex justify-between w-[260px] sm:w-[300px] relative">

                  {/* Step 1 */}
                  <div className="contact-step flex flex-col items-center z-10 w-24">
                    <div className={`step-circle step-active w-10 h-10 rounded-full flex items-center justify-center font-bold text-base shadow-[0_0_20px_rgba(43,92,255,0.4)] ${step === 1 ? 'bg-[#2b5cff] text-white' : 'bg-[#2b5cff] text-white'}`}>
                      1
                    </div>
                    <span className="text-gray-200 text-[12px] font-medium tracking-wide whitespace-nowrap mt-2.5 text-center">
                      Enter Details
                    </span>
                  </div>

                  {/* Connector */}
                  <div className="step-connector flex-1 h-[2px] bg-white/20 mx-2 mt-5 z-0"></div>

                  {/* Step 2 */}
                  <div className="contact-step flex flex-col items-center z-10 w-24">
                    <div className={`step-circle step-inactive w-10 h-10 rounded-full flex items-center justify-center font-bold text-base ${step === 2 ? 'bg-[#2b5cff] text-white shadow-[0_0_20px_rgba(43,92,255,0.4)]' : 'bg-white text-[#2251ff] shadow-[0_0_20px_rgba(255,255,255,0.1)]'}`}>
                      2
                    </div>
                    <span className="text-gray-200 text-[12px] font-medium tracking-wide whitespace-nowrap mt-2.5 text-center">
                      Schedule a call
                    </span>
                  </div>

                </div>
              </div>

              {/* Form Card */}
              <div className="bg-white/[0.02] backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
                {isSuccess ? (
                  <div className="py-12 px-4 flex flex-col items-center text-center">
                    <div className="mx-auto mb-6 relative w-16 h-16">
                      <svg width="50" height="50" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="absolute top-0 left-2">
                        <path d="M4 8C4 5.79086 5.79086 4 8 4H16C18.2091 4 20 5.79086 20 8V10H4V8Z" stroke="#00d95f" strokeWidth="2" strokeLinecap="round" />
                        <path d="M4 10V16C4 18.2091 5.79086 20 8 20H11" stroke="#00d95f" strokeWidth="2" strokeLinecap="round" />
                      </svg>
                      <div className="absolute bottom-0 right-0 w-[26px] h-[26px] bg-[#00d95f] rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,217,95,0.4)] ring-4 ring-[#0a1122]">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M5 13L9 17L19 7" stroke="#0a1122" strokeWidth="3.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </div>
                    </div>

                    <div className="text-[#00d95f] text-[11px] font-bold tracking-widest uppercase mb-3">CALL IS BOOKED</div>
                    <h3 className="text-[32px] font-semibold text-white mb-4">Call Scheduled</h3>

                    <p className="text-gray-300 text-[14px] mb-8">
                      Thank you for scheduling a call with us.
                    </p>

                    <p className="text-[11px] text-gray-500 leading-relaxed max-w-sm mx-auto mb-10">
                      You'll receive the latest insights and perspectives<br />straight to your inbox.
                    </p>

                    <div className="flex flex-col sm:flex-row gap-4 w-full max-w-md mx-auto">
                      <Link href="/solutions" onClick={closeModal} className="flex-1 bg-[#2b5cff] hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-[13px] font-medium transition-colors flex items-center justify-center shadow-lg shadow-blue-500/20">
                        Explore solution <span className="ml-2 font-bold">→</span>
                      </Link>
                      <Link href="/insights" onClick={closeModal} className="flex-1 bg-[#2b5cff] hover:bg-blue-600 text-white py-3 px-6 rounded-lg text-[13px] font-medium transition-colors flex items-center justify-center shadow-lg shadow-blue-500/20">
                        View latest insights <span className="ml-2 font-bold">→</span>
                      </Link>
                    </div>
                  </div>
                ) : isSubmitting ? (
                  <div className="py-16 px-4 flex flex-col items-center text-center">
                    <div className="w-[46px] h-[46px] border-[3px] border-[#2b5cff]/20 border-t-[#2b5cff] rounded-full animate-spin mb-8"></div>
                    <div className="text-[#2251ff] text-[11px] font-bold tracking-widest uppercase mb-3">SCHEDULING</div>
                    <h3 className="text-[28px] font-semibold text-white mb-2">Almost there...</h3>
                    <p className="text-gray-400 text-[13px] mb-10">We're just scheduling your meeting</p>

                    <div className="flex flex-col gap-3.5 mb-12 text-left">
                      <div className="flex items-center text-[13px] text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-[#2251ff] mr-3" /> Email format looks good.
                      </div>
                      <div className="flex items-center text-[13px] text-gray-300">
                        <CheckCircle2 className="w-4 h-4 text-[#2251ff] mr-3" /> Consent confirmed
                      </div>
                    </div>

                    <p className="text-[10px] text-gray-500 leading-relaxed">
                      This will only take a moment. Please don't<br />refresh or close this window
                    </p>
                  </div>
                ) : step === 1 ? (
                  <form className="space-y-8" onSubmit={handleContinue} noValidate>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
                      {/* Row 1 */}
                      <div>
                        <label className="block text-[13px] text-white/80 mb-2">First Name<span className="text-red-500 ml-0.5">*</span></label>
                        <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Enter First Name" className={inputClasses('firstName')} />
                      </div>
                      <div>
                        <label className="block text-[13px] text-white/80 mb-2">Last Name<span className="text-red-500 ml-0.5">*</span></label>
                        <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Enter Last Name" className={inputClasses('lastName')} />
                      </div>

                      {/* Row 2 */}
                      <div>
                        <label className="block text-[13px] text-white/80 mb-2">Enter Email<span className="text-red-500 ml-0.5">*</span></label>
                        <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter Email" className={inputClasses('email')} />
                      </div>
                      <div>
                        <label className="block text-[13px] text-white/80 mb-2">Company<span className="text-red-500 ml-0.5">*</span></label>
                        <input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="Enter Company" className={inputClasses('company')} />
                      </div>

                      {/* Row 3 */}
                      <div>
                        <label className="block text-[13px] text-white/80 mb-2">Job Title</label>
                        <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} placeholder="Enter Job Title" className={inputClasses('jobTitle')} />
                      </div>
                      <div>
                        <label className="block text-[13px] text-white/80 mb-2">Area of Interest<span className="text-red-500 ml-0.5">*</span></label>
                        <div className="flex flex-wrap gap-2.5">
                          {interestsList.map((item) => {
                            const isSelected = selectedInterests.includes(item);
                            return (
                              <button
                                key={item}
                                type="button"
                                onClick={() => toggleInterest(item)}
                                className={`px-4 py-1.5 rounded-full text-[11px] transition-colors border ${isSelected
                                  ? 'bg-white/10 border-white/40 text-white'
                                  : errors.interests
                                    ? 'bg-transparent border-red-500/50 text-gray-400 hover:border-red-500'
                                    : 'bg-transparent border-white/20 text-gray-400 hover:border-white/40 hover:text-gray-300'
                                  }`}
                              >
                                {item}
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    </div>

                    <div>
                      <label className="block text-[13px] text-white/80 mb-2">What would you like help with? <span className="text-red-500 ml-0.5">*</span></label>
                      <textarea name="helpDetails" value={formData.helpDetails} onChange={handleInputChange} placeholder="Enter details..." rows={4} className={`${inputClasses('helpDetails')} resize-none`}></textarea>
                    </div>

                    <div className="pt-2">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center">
                          <input type="checkbox" name="introCall" checked={formData.introCall} onChange={handleInputChange} id="modal-intro-call" className="w-4 h-4 rounded-sm border-white/30 bg-transparent text-[#2251ff] focus:ring-0 focus:ring-offset-0 cursor-pointer" />
                        </div>
                        <label htmlFor="modal-intro-call" className="text-[12px] text-white/90 leading-snug cursor-pointer hover:text-white transition-colors">
                          I would like to book a brief introductory call to discuss this.
                        </label>
                      </div>

                      <div className="w-full h-px bg-white/20 my-5"></div>

                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center">
                          <input type="checkbox" name="privacy" checked={formData.privacy} onChange={handleInputChange} id="modal-privacy" className="w-4 h-4 rounded-sm border-white/30 bg-transparent text-[#2251ff] focus:ring-0 focus:ring-offset-0 cursor-pointer" />
                        </div>
                        <label htmlFor="modal-privacy" className="text-[12px] text-white/90 leading-snug cursor-pointer hover:text-white transition-colors">
                          I agree that Cordinit may use my details to process my enquiry in accordance with the <Link href="/privacy" className="text-[#2251ff] hover:underline">Privacy Policy</Link>.
                        </label>
                      </div>
                    </div>

                    <div className="flex justify-end pt-4">
                      <button type="submit" className="bg-[#131b2c] border border-white/20 hover:bg-white/10 text-white py-2.5 px-12 rounded-lg text-[13px] font-medium transition-all">
                        Continue
                      </button>
                    </div>
                  </form>
                ) : (
                  <div className="flex flex-col">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-6">
                      {/* Left: Calendar */}
                      <div className="bg-[#111827]/50 rounded-xl border border-gray-700/50 p-5">
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
                            className="text-[10px] px-2 py-0.5 rounded border border-blue-500/50 text-[#2251ff] hover:bg-blue-500/10 transition-colors"
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
                                    ? 'bg-[#2b5cff] text-white shadow-[0_0_10px_rgba(43,92,255,0.4)] opacity-100'
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
                                ? 'bg-[#2b5cff] border-[#2b5cff] text-white shadow-[0_0_10px_rgba(43,92,255,0.3)]'
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
                    <div className="bg-[#111827]/40 rounded-xl border border-gray-700/50 p-4 md:p-5 flex flex-col md:flex-row gap-6 mb-6">
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
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2251ff] mr-2 shrink-0" /> Talk to a solution expert
                        </div>
                        <div className="flex items-center text-[11px] text-gray-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2251ff] mr-2 shrink-0" /> Get tailored recommendations
                        </div>
                        <div className="flex items-center text-[11px] text-gray-400">
                          <CheckCircle2 className="w-3.5 h-3.5 text-[#2251ff] mr-2 shrink-0" /> No obligation
                        </div>
                      </div>
                    </div>

                    {submitError && (
                      <div className="p-3 text-[13px] text-red-400 bg-red-900/20 border border-red-500/50 rounded-lg mb-6">
                        {submitError}
                      </div>
                    )}

                    <div className="flex justify-between items-center">
                      <button onClick={handleBack} className="bg-transparent border border-gray-600 hover:bg-white/5 text-gray-300 py-2.5 px-6 rounded-lg text-[13px] font-medium transition-colors flex items-center">
                        <ChevronLeft className="w-4 h-4 mr-1" /> Back
                      </button>
                      <button onClick={handleBookCall} disabled={isSubmitting} className={`bg-[#2b5cff] hover:bg-blue-600 text-white py-2.5 px-10 rounded-lg text-[13px] font-medium transition-colors shadow-[0_0_15px_rgba(43,92,255,0.4)] ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                        {isSubmitting ? 'Booking...' : 'Book a call'}
                      </button>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </ContactModalContext.Provider>
  );
}


