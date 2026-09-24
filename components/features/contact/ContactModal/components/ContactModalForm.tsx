import React from 'react';
import Link from 'next/link';
import { interestsList, inputClasses, textFields } from './contactFormConstants';
import { FormInput } from './FormInput';

export interface LeadFormData {
  firstName: string;
  lastName: string;
  email: string;
  company: string;
  jobTitle: string;
  phone: string;
  helpDetails: string;
  introCall: boolean;
  privacy: boolean;
}

interface ContactModalFormProps {
  formData: LeadFormData;
  errors: Record<string, string>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  handleBlur: (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  selectedInterests: string[];
  toggleInterest: (interest: string) => void;
  isFormValid: boolean;
  handleContinue: (e: React.FormEvent<HTMLFormElement>) => void;
}

export function ContactModalForm({
  formData,
  errors,
  handleInputChange,
  handleBlur,
  selectedInterests,
  toggleInterest,
  isFormValid,
  handleContinue
}: Readonly<ContactModalFormProps>) {
  return (
    <form className="space-y-8" onSubmit={handleContinue} noValidate>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-7">
        {textFields.map((field) => (
          <FormInput
            key={field.name}
            label={field.label}
            name={field.name}
            type={field.type}
            value={formData[field.name]}
            onChange={handleInputChange}
            onBlur={handleBlur}
            placeholder={field.placeholder}
            error={errors[field.name]}
            required={field.required}
          />
        ))}
        <div>
          <label className="block text-[13px] text-white/80 mb-2">Area of Interest<span className="text-error ml-0.5">*</span></label>
          <div className="flex flex-wrap gap-2.5">
            {interestsList.map((item) => {
              const isSelected = selectedInterests.includes(item);

              let dynamicClasses = 'bg-transparent border-white/20 text-gray-400';
              if (isSelected) {
                dynamicClasses = 'bg-primary border-0 text-white';
              } else if (errors.interests) {
                dynamicClasses = 'bg-transparent border-error/50 text-gray-400';
              }

              return (
                <button
                  key={item}
                  type="button"
                  onClick={() => toggleInterest(item)}
                  className={`px-4 py-1.5 rounded-full text-[11px] transition-colors border ${dynamicClasses}`}
                >
                  {item}
                </button>
              );
            })}
          </div>
          {errors.interests && <p className="mt-1.5 text-[11px] text-error/90">{errors.interests}</p>}
        </div>
      </div>

      <div>
        <label className="block text-[13px] text-white/80 mb-2">Tell us about your requirement. <span className="text-error ml-0.5">*</span></label>
        <textarea name="helpDetails" value={formData.helpDetails} onChange={handleInputChange} onBlur={handleBlur} placeholder="Enter details..." rows={4} className={`${inputClasses('helpDetails', errors)} resize-none`}></textarea>
        {errors.helpDetails && <p className="mt-1 text-[11px] text-error/90">{errors.helpDetails}</p>}
      </div>

      <div className="pt-2">
        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center">
            <input type="checkbox" name="introCall" checked={formData.introCall} onChange={handleInputChange} id="modal-intro-call" className="w-4 h-4 rounded-sm border-white/30 bg-transparent text-primary focus:ring-0 focus:ring-offset-0 cursor-pointer" />
          </div>
          <label htmlFor="modal-intro-call" className="text-[12px] text-white/90 leading-snug cursor-pointer hover:text-white transition-colors">
            I would like to book a brief introductory call to discuss this.
          </label>
        </div>

        <div className="w-full h-px bg-white/20 my-5"></div>

        <div className="flex items-center gap-3">
          <div className="flex items-center justify-center">
            <input type="checkbox" name="privacy" checked={formData.privacy} onChange={handleInputChange} id="modal-privacy" className="w-4 h-4 rounded-sm border-white/30 bg-transparent text-primary focus:ring-0 focus:ring-offset-0 cursor-pointer" />
          </div>
          <label htmlFor="modal-privacy" className="text-[12px] text-white/90 leading-snug cursor-pointer hover:text-white transition-colors">
            I agree that Cordinit may use my details to process my enquiry in accordance with the <Link href="/privacy" className="text-primary hover:underline">Privacy Policy</Link>.
          </label>
        </div>
      </div>

      <div className="flex justify-end pt-4">
        <button
          type="submit"
          disabled={!isFormValid}
          className={`py-2.5 px-12 rounded-lg text-[13px] font-medium transition-all ${isFormValid
            ? 'bg-primary text-white cursor-pointer'
            : 'bg-surface-dark border border-white/20 text-white/40 cursor-not-allowed'
            }`}
        >
          Continue
        </button>
      </div>
    </form>
  );
}
