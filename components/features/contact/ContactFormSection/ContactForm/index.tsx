"use client";
import { useLeadForm } from '../../../../../hooks/useLeadForm';
import { useContactModal } from '../../ContactModal/ContactModalProvider';
import ContactForm from './ContactForm';
import SuccessModal from '../SuccessModal';
import { useAnalyticsVisibility } from '@/lib/analytics/useAnalyticsVisibility';

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
  const formRef = useAnalyticsVisibility('contact_form_view', { location: 'contact-page' });
  const {
    formData,
    selectedInterests,
    errors,
    isSubmitting,
    submitError,
    isSuccess,
    honeypotProps,
    handleInputChange,
    handleBlur,
    toggleInterest,
    handleSubmit,
    setIsSuccess
  } = useLeadForm('contact', { ctaLocation: 'Contact Page' });

  return (
    <>
      <ContactForm 
        formData={formData}
        selectedInterests={selectedInterests}
        errors={errors}
        isSubmitting={isSubmitting}
        submitError={submitError}
        handleInputChange={handleInputChange}
        handleBlur={handleBlur}
        honeypotProps={honeypotProps}
        toggleInterest={toggleInterest}
        handleSubmit={handleSubmit}
        openModal={() => openModal({ ctaLocation: 'contact-page' })}
        cmsData={cmsData}
        formRef={formRef}
      />
      <SuccessModal isSuccess={isSuccess} setIsSuccess={setIsSuccess} />
    </>
  );
}
