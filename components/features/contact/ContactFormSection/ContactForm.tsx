"use client";

import React from 'react';
import Link from 'next/link';
import { INTERESTS_LIST, FORM_FIELDS } from './contactData';

type ContactFormProps = {
  formData: {
    firstName: string;
    lastName: string;
    email: string;
    company: string;
    jobTitle: string;
    phone: string;
    helpDetails: string;
    introCall: boolean;
    privacy: boolean;
  };
  selectedInterests: string[];
  errors: Record<string, string>;
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
}: Readonly<ContactFormProps>) {
  const inputClasses = (fieldName: string) =>
    `w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary bg-surface text-body-sm placeholder-ink-muted transition-colors ${
      errors[fieldName] ? 'border-error' : 'border-border-subtle'
    }`;

  return (
    <div className="w-full lg:w-5/12 rounded-card p-6 md:p-8 lg:p-10 bg-gradient-contact-soft shadow-sm">
      <form className="space-y-6" onSubmit={handleSubmit} noValidate>
        {/* Input Fields */}
        <div className="space-y-5">
          {FORM_FIELDS.map((field) => (
            <div key={field.name}>
              <label htmlFor={field.name} className="block text-sm font-medium text-gray-800 mb-1.5">
                {field.label}
                {field.required && <span className="text-error">*</span>}
              </label>
              <input
                id={field.name}
                type={field.type}
                name={field.name}
                value={formData[field.name]}
                onChange={handleInputChange}
                placeholder={field.placeholder}
                className={inputClasses(field.name)}
              />
            </div>
          ))}
        </div>

        {/* Area of Interest */}
        <div className={`pt-2 rounded-lg transition-colors ${errors.interests ? 'bg-red-50/50 p-2 -mx-2' : ''}`}>
          <p className="block text-[15px] md:text-sm font-medium text-gray-800 mb-3">What can we help you with?<span className="text-error">*</span></p>
          <div className="flex flex-wrap gap-2">
            {INTERESTS_LIST.map((item) => {
              const isSelected = selectedInterests.includes(item);
              
              let buttonStyle = 'bg-white border-gray-200 text-gray-700 hover:border-primary hover:text-primary';
              if (isSelected) {
                buttonStyle = 'bg-blue-50 border-primary text-primary';
              } else if (errors.interests) {
                buttonStyle = 'bg-white border-red-300 text-gray-700 hover:border-error';
              }

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleInterest(item)}
                  className={`px-3 md:px-4 py-1.5 md:py-2 border rounded-full text-[11px] md:text-xs transition-colors ${buttonStyle}`}
                >
                  {item}
                </button>
              );
            })}
          </div>
        </div>

        {/* Textarea */}
        <div className="pt-2">
          <label htmlFor="helpDetails" className="block text-[15px] md:text-sm font-medium text-gray-800 mb-1.5">Tell us about your requirement. <span className="text-error">*</span></label>
          <textarea id="helpDetails" name="helpDetails" value={formData.helpDetails} onChange={handleInputChange} placeholder="Briefly describe what you're looking to achieve..." rows={4} className={`${inputClasses('helpDetails')} resize-none`}></textarea>
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
          <button type="button" onClick={() => openModal()} className="w-full bg-white border border-primary text-primary hover:bg-primary-pale py-3 px-2 md:px-6 rounded-xl text-[15px] md:text-sm font-medium transition-colors">
            Schedule a Call
          </button>
        </div>
      </form>
    </div>
  );
}
