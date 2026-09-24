import React from 'react';

interface ContactModalProgressProps {
  step: 1 | 2;
}

export function ContactModalProgress({ step }: Readonly<ContactModalProgressProps>) {
  return (
    <div className="contact-stepper w-full flex justify-center mb-8 z-20 relative">
      <div className="flex justify-between w-[260px] sm:w-[300px] relative">

        {/* Step 1 */}
        <div className="contact-step flex flex-col items-center z-10 w-24">
          <div className={`step-circle step-active w-10 h-10 rounded-full flex items-center justify-center font-bold text-base shadow-glow-primary ${step === 1 ? 'bg-primary text-white' : 'bg-primary text-white'}`}>
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
          <div className={`step-circle step-inactive w-10 h-10 rounded-full flex items-center justify-center font-bold text-base ${step === 2 ? 'bg-primary text-white shadow-glow-primary' : 'bg-white text-primary shadow-[0_0_20px_rgba(255,255,255,0.1)]'}`}>
            2
          </div>
          <span className="text-gray-200 text-[12px] font-medium tracking-wide whitespace-nowrap mt-2.5 text-center">
            Schedule a call
          </span>
        </div>

      </div>
    </div>
  );
}
