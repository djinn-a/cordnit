import React, { useState } from 'react';
import { X } from 'lucide-react';
import { useLeadForm } from '../../../../hooks/useLeadForm';
import { ContactModalProgress } from './components/ContactModalProgress';
import { ContactModalStatus } from './components/ContactModalStatus';
import { ContactModalForm } from './components/ContactModalForm';
import { ContactModalScheduler } from './components/ContactModalScheduler';
import { useContactModal, ModalContext } from './ContactModalProvider';

const POPUP_BG = '/popup-bg.webp';

export function ContactModal({ isEntered, modalContext }: Readonly<{ isEntered: boolean; modalContext: ModalContext }>) {
  const { closeModal } = useContactModal();

  const {
    formData,
    selectedInterests,
    errors,
    isSubmitting,
    submitError,
    isSuccess,
    isFormValid,
    handleInputChange,
    handleBlur,
    toggleInterest,
    validateForm,
    handleSubmit,
  } = useLeadForm(modalContext, { requiresPhone: true });

  const [step, setStep] = useState<1 | 2>(1);

  const handleContinue = (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateForm()) {
      setStep(2);
    }
  };

  const handleBack = () => setStep(1);

  const handleBookCall = (formattedDate: string, time: string) => {
    handleSubmit(undefined, `${formattedDate} at ${time}`);
  };

  return (
    <div className="fixed inset-0 z-100 flex items-center justify-center p-4 sm:p-6 overflow-y-auto">
      {/* Overlay */}
      <div
        role="button"
        tabIndex={-1}
        aria-label="Close modal"
        className={`fixed inset-0 bg-surface-darker/70 transition-opacity duration-300 ${isEntered ? 'opacity-100' : 'opacity-0'}`}
        onClick={closeModal}
        onKeyDown={(e) => e.key === 'Escape' && closeModal()}
      ></div>

      {/* Modal Container */}
      <div
        role="presentation"
        className={`relative w-full max-w-250 bg-surface-dark bg-cover bg-center rounded-[2rem] shadow-2xl flex flex-col items-center my-auto border border-white/5 max-h-[min(900px,calc(100dvh-2rem))] overflow-y-auto transition-[opacity,transform] duration-300 ${isEntered ? 'opacity-100 scale-100' : 'opacity-0 scale-[0.98]'}`}
        style={{ backgroundImage: `url(${POPUP_BG})` }}
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          onClick={closeModal}
          className="absolute top-6 right-6 z-50 p-2 text-white/50 hover:text-white bg-white/5 hover:bg-white/10 rounded-full backdrop-blur-md transition-colors"
          aria-label="Close modal"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="w-full max-w-200 relative z-20 flex flex-col py-12 px-4 sm:px-6">
          <ContactModalProgress step={step} />

          {/* Form Card */}
          <div className="bg-white/2 backdrop-blur-xl border border-white/10 rounded-2xl p-6 md:p-10 shadow-[0_8px_32px_rgba(0,0,0,0.3)]">
            {(() => {
              if (isSuccess || isSubmitting) {
                return <ContactModalStatus isSuccess={isSuccess} isSubmitting={isSubmitting} closeModal={closeModal} />;
              }
              if (step === 1) {
                return (
                  <ContactModalForm
                    formData={formData}
                    errors={errors}
                    handleInputChange={handleInputChange}
                    handleBlur={handleBlur}
                    selectedInterests={selectedInterests}
                    toggleInterest={toggleInterest}
                    isFormValid={isFormValid}
                    handleContinue={handleContinue}
                  />
                );
              }
              return (
                <ContactModalScheduler
                  isSubmitting={isSubmitting}
                  submitError={submitError}
                  handleBack={handleBack}
                  onSubmit={handleBookCall}
                />
              );
            })()}
          </div>
        </div>
      </div>
    </div>
  );
}
