"use client";

import React from 'react';
import { Mail, PhoneCall, MapPin, Clock } from 'lucide-react';
import Link from 'next/link';
import { useLeadForm } from '../../../../hooks/useLeadForm';

export default function ContactFormSection() {
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
    `w-full px-4 py-3 rounded-lg border focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white text-sm transition-colors ${
      errors[fieldName] ? 'border-red-500' : 'border-gray-200'
    }`;

  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto bg-white mb-16">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        
        {/* Left Form Area */}
        <div className="w-full lg:w-5/12 rounded-[24px] p-6 md:p-8 lg:p-10" style={{ background: 'linear-gradient(166.84deg, rgba(164, 183, 255, 0.2) 0%, rgba(142, 163, 240, 0.2) 16.69%, rgba(20, 49, 153, 0) 100.03%)', boxShadow: '0px 4px 2px 0px #00000014' }}>
          <form className="space-y-6" onSubmit={handleSubmit} noValidate>
            
            {/* Input Fields */}
            <div className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-gray-800 mb-1.5">Full Name<span className="text-red-500">*</span></label>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleInputChange} placeholder="Enter Name" className={inputClasses('firstName')} />
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
                <input type="checkbox" name="introCall" checked={formData.introCall} onChange={handleInputChange} id="intro-call" className={`mt-0.5 w-5 h-5 text-blue-600 rounded focus:ring-blue-500 bg-white shrink-0 ${errors.introCall ? 'border-red-500' : 'border-gray-300'}`} />
                <label htmlFor="intro-call" className={`ml-3 text-[13px] md:text-sm ${errors.introCall ? 'text-red-700' : 'text-gray-800'}`}>
                  I would like to book a brief introductory call to discuss this.
                </label>
              </div>
              
              <hr className="border-gray-200" />
              
              <div className={`flex items-start p-2 -mx-2 rounded-lg transition-colors ${errors.privacy ? 'bg-red-50/50 border border-red-200' : 'border border-transparent'}`}>
                <input type="checkbox" name="privacy" checked={formData.privacy} onChange={handleInputChange} id="privacy" className={`mt-0.5 w-5 h-5 text-blue-600 rounded focus:ring-blue-500 bg-white shrink-0 ${errors.privacy ? 'border-red-500' : 'border-gray-300'}`} />
                <label htmlFor="privacy" className={`ml-3 text-[13px] md:text-sm leading-snug ${errors.privacy ? 'text-red-700' : 'text-gray-800'}`}>
                  I agree that Cordinit may use my details to process my enquiry in accordance with the <Link href="/privacy" className="text-blue-600 hover:underline">Privacy Policy</Link>.
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
              <button type="submit" disabled={isSubmitting} className={`w-full bg-[#2b5cff] hover:bg-blue-700 text-white py-3 px-2 md:px-6 rounded-xl text-[15px] md:text-sm font-medium transition-colors ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}>
                {isSubmitting ? 'Submitting...' : 'Submit'}
              </button>
              <button type="button" className="w-full bg-white border border-[#2b5cff] text-[#2b5cff] hover:bg-blue-50 py-3 px-2 md:px-6 rounded-xl text-[15px] md:text-sm font-medium transition-colors">
                Book a call
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
            <div className="rounded-[16px] md:rounded-[24px] p-4 md:p-8" style={{ background: 'linear-gradient(166.84deg, rgba(164, 183, 255, 0.2) 0%, rgba(142, 163, 240, 0.2) 16.69%, rgba(20, 49, 153, 0) 100.03%)', boxShadow: '0px 4px 2px 0px #00000014' }}>
              <div className="flex items-start gap-2 md:gap-3">
                <Mail className="w-4 h-4 md:w-5 md:h-5 text-gray-800 mt-0.5 shrink-0" />
                <div>
                  <h4 className="font-medium text-gray-800 text-[13px] md:text-base mb-1">Email</h4>
                  <p className="text-gray-600 text-[11px] md:text-sm leading-relaxed">hello@cordinit.com</p>
                </div>
              </div>
            </div>
            
            {/* Contact Numbers Card */}
            <div className="rounded-[16px] md:rounded-[24px] p-4 md:p-8" style={{ background: 'linear-gradient(166.84deg, rgba(164, 183, 255, 0.2) 0%, rgba(142, 163, 240, 0.2) 16.69%, rgba(20, 49, 153, 0) 100.03%)', boxShadow: '0px 4px 2px 0px #00000014' }}>
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
            <div className="rounded-[16px] md:rounded-[24px] p-4 md:p-8" style={{ background: 'linear-gradient(166.84deg, rgba(164, 183, 255, 0.2) 0%, rgba(142, 163, 240, 0.2) 16.69%, rgba(20, 49, 153, 0) 100.03%)', boxShadow: '0px 4px 2px 0px #00000014' }}>
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
            <div className="rounded-[16px] md:rounded-[24px] p-4 md:p-8" style={{ background: 'linear-gradient(166.84deg, rgba(164, 183, 255, 0.2) 0%, rgba(142, 163, 240, 0.2) 16.69%, rgba(20, 49, 153, 0) 100.03%)', boxShadow: '0px 4px 2px 0px #00000014' }}>
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
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/20 backdrop-blur-sm">
          <div 
            className="w-full max-w-2xl rounded-[28px] p-10 md:p-14 text-center relative border border-[#DCE5FF]/50"
            style={{ 
              background: `
                radial-gradient(circle at 0% 0%, rgba(220, 229, 255, 0.8) 0%, transparent 60%),
                radial-gradient(circle at 100% 0%, rgba(232, 234, 245, 0.4) 0%, transparent 50%),
                linear-gradient(145deg, #F8F9FC 0%, #ffffff 100%)
              `, 
              boxShadow: '0 20px 40px -10px rgba(0, 0, 10, 0.05)' 
            }}
          >
            <div className="mx-auto w-[56px] h-[56px] bg-[#2b5cff] rounded-full flex items-center justify-center mb-6 shadow-md shadow-blue-500/10">
              <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                 <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
              </svg>
            </div>
            
            <h2 className="text-[26px] md:text-[32px] font-semibold text-gray-900 mb-4 tracking-tight flex flex-col">
              <span>Thank you</span>
              <span className="mt-1">We have received your enquiry</span>
            </h2>
            <p className="text-gray-600/90 text-[15px] md:text-base mb-10 font-medium">
              We will be in touch soon. A copy of your request has been sent<br className="hidden sm:block" /> to your email.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button onClick={() => setIsSuccess(false)} className="px-6 py-2.5 bg-[#2b5cff] text-white rounded-[12px] text-[15px] font-medium hover:bg-blue-700 transition-colors flex items-center shadow-md shadow-blue-500/20">
                Explore solutions <span className="ml-2 font-bold text-lg leading-none">→</span>
              </button>
              <button onClick={() => setIsSuccess(false)} className="px-6 py-2.5 bg-transparent border border-[#2b5cff] text-[#2b5cff] rounded-[12px] text-[15px] font-medium hover:bg-blue-50 transition-colors flex items-center">
                View insights <span className="ml-2 font-bold text-lg leading-none">→</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
