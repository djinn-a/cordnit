"use client";

import React from 'react';
import Link from 'next/link';
import { INTERESTS_LIST } from './contactData';

type ContactFormProps = {
  formData: any;
  selectedInterests: string[];
  errors: any;
  isSubmitting: boolean;
  submitError: string | null;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  toggleInterest: (interest: string) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  openModal: () => void;
};

export default function ContactForm({
  formData,
  selectedInterests,
  errors,
  isSubmitting,
  submitError,
  handleInputChange,
  toggleInterest,
  handleSubmit,
  openModal
}: ContactFormProps) {
  const inputClasses = (fieldName: string) =>
    `w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary bg-surface text-body-sm transition-colors ${
      errors[fieldName] ? 'border-error' : 'border-border-subtle'
    }`;

  return (
    <div className="w-full lg:w-5/12 rounded-card p-6 md:p-8 lg:p-10 bg-gradient-contact-soft shadow-sm">
      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        {/* Input Fields */}
        <div className="space-y-5">
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1.5">First Name<span className="text-error">*</span></label>
            <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Enter First Name" className={inputClasses('firstName')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1.5">Last Name<span className="text-error">*</span></label>
            <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Enter Last Name" className={inputClasses('lastName')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1.5">Enter Work Email<span className="text-error">*</span></label>
            <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter Work Email" className={inputClasses('email')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1.5">Company<span className="text-error">*</span></label>
            <input type="text" name="company" value={formData.company} onChange={handleInputChange} placeholder="Enter Company" className={inputClasses('company')} />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-800 mb-1.5">Job Title</label>
            <input type="text" name="jobTitle" value={formData.jobTitle} onChange={handleInputChange} placeholder="Enter Job Title" className="w-full px-4 py-3 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm" />
          </div>
        </div>

        {/* Area of Interest */}
        <div className={`pt-2 rounded-lg transition-colors ${errors.interests ? 'bg-red-50/50 p-2 -mx-2' : ''}`}>
          <label className="block text-[15px] md:text-sm font-medium text-gray-800 mb-3">What can we help you with?<span className="text-error">*</span></label>
          <div className="flex flex-wrap gap-2">
            {INTERESTS_LIST.map((item) => {
              const isSelected = selectedInterests.includes(item);
              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleInterest(item)}
                  className={`px-3 md:px-4 py-1.5 md:py-2 border rounded-full text-[11px] md:text-xs transition-colors ${
                    isSelected
                      ? 'bg-blue-50 border-primary text-primary'
                      : errors.interests
                        ? 'bg-white border-red-300 text-gray-700 hover:border-error'
                        : 'bg-white border-gray-200 text-gray-700 hover:border-primary hover:text-primary'
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
          <label className="block text-[15px] md:text-sm font-medium text-gray-800 mb-1.5">Tell us about your requirement. <span className="text-error">*</span></label>
          <textarea name="helpDetails" value={formData.helpDetails} onChange={handleInputChange} placeholder="Briefly describe what you're looking to achieve..." rows={4} className={`${inputClasses('helpDetails')} resize-none`}></textarea>
        </div>

        {/* Checkboxes */}
        <div className="pt-2 space-y-4">
          <div className={`flex items-start p-2 -mx-2 rounded-lg transition-colors ${errors.introCall ? 'bg-red-50/50 border border-red-200' : 'border border-transparent'}`}>
            <input type="checkbox" name="introCall" checked={formData.introCall} onChange={handleInputChange} id="intro-call" className={`mt-0.5 w-5 h-5 text-primary rounded focus:ring-blue-500 bg-white shrink-0 ${errors.introCall ? 'border-error' : 'border-gray-300'}`} />
            <label htmlFor="intro-call" className={`ml-3 text-[13px] md:text-sm ${errors.introCall ? 'text-red-700' : 'text-gray-800'}`}>
              I would like to book a brief introductory call to discuss this.
            </label>
          </div>

          <hr className="border-gray-200" />

          <div className={`flex items-start p-2 -mx-2 rounded-lg transition-colors ${errors.privacy ? 'bg-red-50/50 border border-red-200' : 'border border-transparent'}`}>
            <input type="checkbox" name="privacy" checked={formData.privacy} onChange={handleInputChange} id="privacy" className={`mt-0.5 w-5 h-5 text-primary rounded focus:ring-blue-500 bg-white shrink-0 ${errors.privacy ? 'border-error' : 'border-gray-300'}`} />
            <label htmlFor="privacy" className={`ml-3 text-[13px] md:text-sm leading-snug ${errors.privacy ? 'text-red-700' : 'text-gray-800'}`}>
              I agree that Cordinit may use my details to process my enquiry in accordance with the <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
            </label>
          </div>
        </div>

        {/* Error Message */}
        {submitError && (
          <div className="p-3 text-[13px] md:text-sm text-red-600 bg-red-50 border border-red-200 rounded-lg">
            {submitError}
          </div>
        )}

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 pt-4">
          <button type="submit" disabled={isSubmitting} className={`w-full bg-primary hover:bg-primary-hover text-white py-3 px-2 md:px-6 rounded-xl text-[15px] md:text-sm font-medium transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
            {isSubmitting ? 'Submitting...' : 'Submit'}
          </button>
          <button type="button" onClick={openModal} className="w-full bg-white border border-primary text-primary hover:bg-primary-pale py-3 px-2 md:px-6 rounded-xl text-[15px] md:text-sm font-medium transition-colors">
            Schedule a Call
          </button>
        </div>
      </form>
    </div>
  );
}
