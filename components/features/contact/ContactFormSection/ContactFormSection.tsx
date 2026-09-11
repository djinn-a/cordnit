"use client";

import React from 'react';
import { Mail, PhoneCall, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import { useLeadForm } from '../../../../hooks/useLeadForm';
import { useContactModal } from '../ContactModal/ContactModalProvider';

export default function ContactFormSection() {
  const { openModal } = useContactModal();
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
    setIsSuccess
  } = useLeadForm({ ctaLocation: 'Contact Page' });

  const interestsList = [
    'Cybersecurity', 'Managed Services', 'AI & Automation',
    'Application Engineering', 'Data & Integration',
    'Salesforce', 'Cloud & Infrastructure', 'Something else'
  ];

  const inputClasses = (fieldName: string) =>
    `w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-primary bg-surface text-body-sm transition-colors ${errors[fieldName] ? 'border-error' : 'border-border-subtle'
    }`;

  return (
    <section className="w-full py-12 sm:py-16 px-4 xs:px-5 sm:px-6 lg:px-8 max-w-container 2xl:max-w-container-xl 3xl:max-w-container-2xl mx-auto bg-surface mb-16">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">

        {/* Left Form Area */}
        <div className="w-full lg:w-5/12 rounded-card p-6 md:p-8 lg:p-10 bg-gradient-contact-soft shadow-sm">
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>

            {/* Input Fields */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1.5">Full Name<span className="text-error">*</span></label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Enter Name" className={inputClasses('firstName')} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1.5">Last Name<span className="text-error">*</span></label>
                <input type="text" name="lastName" value={formData.lastName} onChange={handleInputChange} placeholder="Enter Last Name" className={inputClasses('lastName')} />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1.5">Enter Email<span className="text-error">*</span></label>
                <input type="email" name="email" value={formData.email} onChange={handleInputChange} placeholder="Enter Email" className={inputClasses('email')} />
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
              <label className="block text-[15px] md:text-sm font-medium text-gray-800 mb-3">Area of Interest<span className="text-error">*</span></label>
              <div className="flex flex-wrap gap-2">
                {interestsList.map((item) => {
                  const isSelected = selectedInterests.includes(item);
                  return (
                    <button
                      key={item}
                      type="button"
                      onClick={() => toggleInterest(item)}
                      className={`px-3 md:px-4 py-1.5 md:py-2 border rounded-full text-[11px] md:text-xs transition-colors ${isSelected
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
              <label className="block text-[15px] md:text-sm font-medium text-gray-800 mb-1.5">What would you like help with? <span className="text-error">*</span></label>
              <textarea name="helpDetails" value={formData.helpDetails} onChange={handleInputChange} placeholder="Enter details..." rows={4} className={`${inputClasses('helpDetails')} resize-none`}></textarea>
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

        {/* Right Info Area */}
        <div className="w-full lg:w-7/12 flex flex-col gap-6 md:gap-8">

          {/* What happens next Card */}
          <div className="bg-white border border-gray-100 rounded-3xl p-6 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
            <h3 className="text-2xl font-normal text-gray-800 mb-6">What happens next</h3>
            <hr className="border-gray-100 mb-8" />

            <div className="space-y-8">
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">1. Review</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  Our technical team reviews your submission to identify the right specialists.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">2. Connect</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We reach out within 24 hours to schedule an initial consultation or provide information.
                </p>
              </div>
              <div>
                <h4 className="text-lg font-medium text-gray-900 mb-2">3. Discover</h4>
                <p className="text-gray-600 text-sm leading-relaxed">
                  A detailed discovery session to map out solutions and timelines.
                </p>
              </div>
            </div>
          </div>

          {/* Info Grid */}
          <div className="grid grid-cols-2 gap-3 md:gap-6">

            {/* Email Card */}
            <div className="rounded-card p-4 md:p-8 bg-gradient-contact-soft shadow-sm">
              <div className="flex items-start gap-2 md:gap-3">
                <Mail className="w-4 h-4 md:w-5 md:h-5 text-gray-800 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800 text-[13px] md:text-base mb-1">Email</h4>
                  <p className="text-gray-600 text-[11px] md:text-sm leading-relaxed">hello@cordinit.com</p>
                </div>
              </div>
            </div>

            {/* Contact Numbers Card */}
            <div className="rounded-card p-4 md:p-8 bg-gradient-contact-soft shadow-sm">
              <div className="flex items-start gap-2 md:gap-3">
                <PhoneCall className="w-4 h-4 md:w-5 md:h-5 text-gray-800 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800 text-[13px] md:text-base mb-1">Contact Numbers</h4>
                  <div className="text-gray-600 text-[11px] md:text-sm leading-relaxed space-y-0.5">
                    <p>+91 9996490061</p>
                    <p>+91 7988951210</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Corporate Address Card */}
            <div className="rounded-card p-4 md:p-8 bg-gradient-contact-soft shadow-sm">
              <div className="flex items-start gap-2 md:gap-3">
                <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gray-800 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800 text-[13px] md:text-base mb-1">Corporate Address</h4>
                  <p className="text-gray-600 text-[11px] md:text-sm leading-relaxed">
                    Corp. Off. : 10th Floor, Imperia Mindspace, Sec-62, Golf Course Ext Road, Gurgaon, Haryana - 122001
                  </p>
                </div>
              </div>
            </div>

            {/* Hours Card */}
            <div className="rounded-card p-4 md:p-8 bg-gradient-contact-soft shadow-sm">
              <div className="flex items-start gap-2 md:gap-3">
                <Clock className="w-4 h-4 md:w-5 md:h-5 text-gray-800 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800 text-[13px] md:text-base mb-1">Hours</h4>
                  <div className="text-gray-600 text-[11px] md:text-sm leading-relaxed space-y-0.5">
                    <p>Mon-Fri</p>
                    <p>8 AM - 6 PM</p>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>

      </div>

      {/* Thank you Modal */}
      {isSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-[2px]">
          <div className="w-full max-w-[800px] rounded-card p-10 md:p-14 text-center relative border border-white bg-gradient-success-panel shadow-card">
            <div className="mx-auto w-[44px] h-[44px] bg-primary rounded-full flex items-center justify-center mb-6 shadow-md shadow-glow-primary">
              <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3.5} d="M5 13l4 4L19 7" />
              </svg>
            </div>

            <h2 className="text-[24px] md:text-[28px] font-bold text-ink mb-3 tracking-tight">
              Thank you — we have received your enquiry
            </h2>
            <p className="text-ink-muted text-[13px] md:text-[14px] mb-8 font-medium">
              We will be in touch soon. A copy of your request has been sent to your email.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
              <Link href="/solutions" onClick={() => setIsSuccess(false)} className="w-full sm:w-auto px-6 py-2.5 bg-primary text-white rounded-lg text-[13px] font-medium hover:bg-primary-hover transition-colors flex items-center justify-center shadow-md shadow-glow-primary">
                Explore Solutions <span className="ml-1.5 font-bold">→</span>
              </Link>
              <Link href="/insights" onClick={() => setIsSuccess(false)} className="w-full sm:w-auto px-6 py-2.5 bg-primary-pale border border-primary-muted text-primary rounded-lg text-[13px] font-medium hover:bg-primary-muted transition-colors flex items-center justify-center">
                View Insights <span className="ml-1.5 font-bold">→</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}


