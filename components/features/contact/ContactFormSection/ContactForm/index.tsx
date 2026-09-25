"use client";
import { useLeadForm } from '../../../../../hooks/useLeadForm';
import { useContactModal } from '../../ContactModal/ContactModalProvider';
import ContactForm from './ContactForm';
import SuccessModal from '../SuccessModal';

type ContactFormWrapperProps = { 
  cmsData: {
    interestTitle: string;
    requirementLabel: string;
    requirementPlaceholder: string;
    introCallLabel: string;
    privacyLabelPart1: string;
    privacyLabelLink: string;
    privacyLabelPart2: string;
    submitButtonIdle: string;
    submitButtonSubmitting: string;
    scheduleCallButton: string;
    interestsList: string[];
  };
};

export default function ContactFormWrapper({ cmsData }: Readonly<ContactFormWrapperProps>) {
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
    <>
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
        cmsData={cmsData}
      />
      <SuccessModal isSuccess={isSuccess} setIsSuccess={setIsSuccess} />
    </>
  );
}
