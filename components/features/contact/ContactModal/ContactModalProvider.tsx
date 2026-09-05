"use client";

import React, { createContext, useContext, useState, useEffect } from 'react';
import { X } from 'lucide-react';
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
    handleSubmit,
    resetForm
  } = useLeadForm(modalContext);

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
    }, 300);
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
    `w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm transition-colors ${
      errors[fieldName] ? 'border-red-500' : 'border-gray-200'
    }`;

  return (
    <ContactModalContext.Provider value={{ isOpen, openModal, closeModal }}>
      {children}
      
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
          {/* Click away overlay */}
          <div className="fixed inset-0" onClick={closeModal}></div>
          
          <div 
            className="w-full max-w-xl rounded-2xl relative z-10 shadow-2xl my-8 flex flex-col max-h-[90vh] bg-[#f2f4f8]"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex justify-between items-center p-6 border-b border-gray-200/50 bg-white rounded-t-2xl shrink-0">
              <h2 className="text-xl font-semibold text-gray-900">Get in touch</h2>
              <button 
                onClick={closeModal}
                className="p-2 bg-gray-100 hover:bg-gray-200 rounded-full transition-colors"
                aria-label="Close modal"
              >
                <X className="w-5 h-5 text-gray-600" />
              </button>
            </div>

            {/* Content Area */}
            <div className="p-6 overflow-y-auto custom-scrollbar">
              {!isSuccess ? (
                <form className="space-y-6" onSubmit={handleSubmit} noValidate>
                  {/* Input Fields */}
                  <div className="space-y-5">
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1.5">First Name<span className="text-red-500">*</span></label>
                      <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Enter First Name" className={inputClasses('firstName')} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1.5">Last Name<span className="text-red-500">*</span></label>
                      <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Enter Last Name" className={inputClasses('lastName')} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1.5">Enter Email<span className="text-red-500">*</span></label>
                      <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter Email" className={inputClasses('email')} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1.5">Company<span className="text-red-500">*</span></label>
                      <input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="Enter Company" className={inputClasses('company')} />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-800 mb-1.5">Job Title</label>
                      <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} placeholder="Enter Job Title" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" />
                    </div>
                  </div>

                  {/* Area of Interest */}
                  <div className={`pt-2 rounded-lg transition-colors ${errors.interests ? 'bg-red-50/50 p-2 -mx-2' : ''}`}>
                    <label className="block text-[15px] md:text-sm font-medium text-gray-800 mb-3">Area of Interest<span className="text-red-500">*</span></label>
                    <div className="flex flex-wrap gap-2">
                      {interestsList.map((item) => {
                        const isSelected = selectedInterests.includes(item);
                        return (
                          <button 
                            key={item} 
                            type="button" 
                            onClick={() => toggleInterest(item)}
                            className={`px-3 md:px-4 py-1.5 md:py-2 border rounded-full text-[11px] md:text-xs transition-colors ${
                              isSelected 
                                ? 'bg-blue-50 border-blue-500 text-blue-700' 
                                : errors.interests 
                                  ? 'bg-white border-red-300 text-gray-700 hover:border-red-500'
                                  : 'bg-white border-gray-200 text-gray-700 hover:border-blue-500 hover:text-blue-600'
                            }`}
                          >
                            {item}
                          </button>
                        );
                      })}
                    </div>
                  </div>

                  {/* Textarea */}
                  <div className="pt-2">
                    <label className="block text-[15px] md:text-sm font-medium text-gray-800 mb-1.5">What would you like help with? <span className="text-red-500">*</span></label>
                    <textarea name="helpDetails" value={formData.helpDetails} onChange={handleInputChange} placeholder="Enter details..." rows={4} className={`${inputClasses('helpDetails')} resize-none`}></textarea>
                  </div>

                  {/* Checkboxes */}
                  <div className="pt-2 space-y-4">
                    <div className={`flex items-start p-2 -mx-2 rounded-lg transition-colors ${errors.introCall ? 'bg-red-50/50 border border-red-200' : 'border border-transparent'}`}>
                      <input type="checkbox" name="introCall" checked={formData.introCall} onChange={handleInputChange} id="modal-intro-call" className={`mt-0.5 w-5 h-5 text-blue-600 rounded focus:ring-blue-500 bg-white shrink-0 ${errors.introCall ? 'border-red-500' : 'border-gray-300'}`} />
                      <label htmlFor="modal-intro-call" className={`ml-3 text-[13px] md:text-sm ${errors.introCall ? 'text-red-700' : 'text-gray-800'}`}>
                        I would like to book a brief introductory call to discuss this.
                      </label>
                    </div>
                    
                    <hr className="border-gray-200" />
                    
                    <div className={`flex items-start p-2 -mx-2 rounded-lg transition-colors ${errors.privacy ? 'bg-red-50/50 border border-red-200' : 'border border-transparent'}`}>
                      <input type="checkbox" name="privacy" checked={formData.privacy} onChange={handleInputChange} id="modal-privacy" className={`mt-0.5 w-5 h-5 text-blue-600 rounded focus:ring-blue-500 bg-white shrink-0 ${errors.privacy ? 'border-red-500' : 'border-gray-300'}`} />
                      <label htmlFor="modal-privacy" className={`ml-3 text-[13px] md:text-sm leading-snug ${errors.privacy ? 'text-red-700' : 'text-gray-800'}`}>
                        I agree that Cordinit may use my details to process my enquiry in accordance with the <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
                      </label>
                    </div>
                  </div>

                  {submitError && (
                    <div className="p-3 text-[13px] md:text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
                      {submitError}
                    </div>
                  )}

                  {/* Action Buttons */}
                  <div className="grid grid-cols-2 gap-3 pt-4 pb-2">
                    <button type="submit" disabled={isSubmitting} className={`w-full bg-[#2b5cff] hover:bg-blue-700 text-white py-3 px-2 md:px-6 rounded-xl text-[15px] md:text-sm font-medium transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                      {isSubmitting ? 'Submitting...' : 'Submit'}
                    </button>
                    <button type="button" className="w-full bg-white border border-[#2b5cff] text-[#2b5cff] hover:bg-blue-50 py-3 px-2 md:px-6 rounded-xl text-[15px] md:text-sm font-medium transition-colors">
                      Book a call
                    </button>
                  </div>
                </form>
              ) : (
                <div className="py-12 px-4 text-center">
                  <div className="mx-auto w-[56px] h-[56px] bg-[#2b5cff] rounded-full flex items-center justify-center mb-6 shadow-md shadow-blue-500/10">
                    <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-semibold text-gray-900 mb-2">Thank you!</h3>
                  <p className="text-gray-600 mb-8">We have received your enquiry and will be in touch soon.</p>
                  <button onClick={closeModal} className="px-6 py-2.5 bg-[#2b5cff] text-white rounded-xl text-sm font-medium hover:bg-blue-700 transition-colors">
                    Close
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </ContactModalContext.Provider>
  );
}
