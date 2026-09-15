"use client";

import React from 'react';
import { useLeadForm } from '../../../../hooks/useLeadForm';
import { useContactModal } from '../ContactModal/ContactModalProvider';
import ContactForm from './ContactForm';
import ContactInfoGrid from './ContactInfoGrid';
import SuccessModal from './SuccessModal';

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

  return (
    <section className="w-full pt-4 sm:pt-6 pb-12 sm:pb-16 px-4 xs:px-5 sm:px-6 lg:px-8 max-w-container 2xl:max-w-container-xl 3xl:max-w-container-2xl mx-auto bg-surface mb-16">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-16">
        <ContactForm 
          formData={formData}
          selectedInterests={selectedInterests}
          errors={errors}
          isSubmitting={isSubmitting}
          submitError={submitError}
          handleInputChange={handleInputChange}
          toggleInterest={toggleInterest}
          handleSubmit={handleSubmit}
          openModal={openModal}
        />
        <ContactInfoGrid />
      </div>

      <SuccessModal isSuccess={isSuccess} setIsSuccess={setIsSuccess} />
    </section>
  );
}
