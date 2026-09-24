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
    <section className="w-full mx-auto bg-surface">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-6">
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
