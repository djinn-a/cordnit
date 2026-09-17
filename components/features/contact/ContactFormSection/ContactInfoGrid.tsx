"use client";

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { PROCESS_STEPS } from './contactData';

export default function ContactInfoGrid() {
  return (
    <div className="w-full lg:w-7/12 flex flex-col gap-6 md:gap-8">

      {/* What happens next Card */}
      <div className="bg-white border border-border-card rounded-3xl p-6 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        <h3 className="text-2xl font-semibold text-gray-800 mb-6">What happens next</h3>
        <hr className="border-border-card mb-8" />

        <div className="space-y-8">
          {PROCESS_STEPS.map((step) => (
            <div key={step.id}>
              <h4 className="text-eyebrow-desktop md:text-help-card-title-desktop font-semibold text-gray-900 mb-2">{step.number}. {step.title}</h4>
              <p className="text-gray-600 text-card-desc-mobile md:text-section-title-h leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Header */}
      <div className="mb-2 mt-4 md:mt-8">
        <h3 className="text-gray-900 text-section-title-head mb-4">
          Work With Cordinit
        </h3>
        <p className="text-gray-700 md:text-section-subtitle leading-relaxed mb-6 md:mb-8">
          We work with organisations to build, secure and transform their digital future.
        </p>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-3 md:gap-6">

        {/* Email Card */}
        <div className="rounded-card p-4 md:p-8 bg-gradient-contact-soft shadow-sm">
          <div className="flex items-start gap-2 md:gap-3">
            <Image src="/icons/contactus/business.svg" alt="New Business" width={20} height={20} className="w-4 h-4 md:w-5 md:h-5 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-medium text-gray-800 text-card-desc-mobile md:text-section-title-h mb-1">New Business</h4>
              <p className="text-gray-600 text-card-detail-mobile md:text-card-desc leading-relaxed">Mohd. Rashid Khan</p>
              <p className="text-gray-600 text-card-detail-mobile md:text-card-desc leading-relaxed">Chief Growth Officer</p>
              <p className="text-gray-600 text-card-detail-mobile md:text-card-desc font-bold leading-relaxed mb-4">business@cordinit.co.in</p>
              <Link href="#" className="text-primary text-link-card-mobile md:text-link-desktop hover:underline inline-flex items-center">
                Book a Call <span className="ml-1">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Contact Numbers Card */}
        <div className="rounded-card p-4 md:p-8 bg-gradient-contact-soft shadow-sm">
          <div className="flex items-start gap-2 md:gap-3">
            <Image src="/icons/contactus/outline.svg" alt="Media & Press Inquiries" width={20} height={20} className="w-4 h-4 md:w-5 md:h-5 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-medium text-gray-800 text-card-desc-mobile md:text-section-title-h mb-1">Media & Press Inquiries</h4>
              <div className="text-gray-600 text-card-detail-mobile md:text-card-desc leading-relaxed space-y-0.5 mb-4">
                <p>Christina Adams</p>
                <p>EVP, Marketing & Communications</p>
                <p className="text-gray-800 font-bold">media@cordinit.co.in</p>
              </div>
              <Link href="#" className="text-primary text-link-card-mobile md:text-link-desktop hover:underline inline-flex items-center">
                Book a Call <span className="ml-1">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Corporate Address Card */}
        <div className="rounded-card p-4 md:p-8 bg-gradient-contact-soft shadow-sm">
          <div className="flex items-start gap-2 md:gap-3">
            <Image src="/icons/contactus/handshake.svg" alt="Partnerships" width={20} height={20} className="w-4 h-4 md:w-5 md:h-5 mt-0.5 shrink-0" />
            <div>
              <h4 className="font-medium text-gray-800 text-card-desc-mobile md:text-section-title-h mb-1">Partnerships</h4>
              <p className="text-gray-600 text-card-detail-mobile md:text-card-desc leading-relaxed mb-2">
                For technology partners, strategic partners and business collaborations.
              </p>
              <p className="text-gray-800 text-card-detail-mobile md:text-card-desc font-bold leading-relaxed mb-4">partnerships@cordinit.co.in</p>
              <Link href="#" className="text-primary text-link-card-mobile md:text-link-desktop hover:underline inline-flex items-center">
                Book a Call <span className="ml-1">&rarr;</span>
              </Link>
            </div>
          </div>
        </div>

        {/* Hours Card */}
        <div className="rounded-card p-4 md:p-8 bg-gradient-contact-soft shadow-sm">
          <div className="flex items-start gap-2 md:gap-3">
            <Image src="/icons/contactus/paper-plane.svg" alt="Careers" width={20} height={20} className="w-4 h-4 md:w-5 md:h-5 mt-0.5 shrink-0" />
            <div className="w-full">
              <h4 className="font-medium text-gray-800 text-card-desc-mobile md:text-section-title-h mb-4">Careers</h4>
              <div className="flex flex-col gap-3">
                <Link href="#" className="text-primary text-link-card-mobile md:text-link-desktop hover:underline inline-flex items-center">
                  View Open Roles <span className="ml-1">&rarr;</span>
                </Link>
                <Link href="#" className="text-primary text-link-card-mobile md:text-link-desktop hover:underline inline-flex items-center">
                  View Internships <span className="ml-1">&rarr;</span>
                </Link>
              </div>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
}
