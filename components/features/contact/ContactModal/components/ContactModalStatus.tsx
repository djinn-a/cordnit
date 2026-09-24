import Link from 'next/link';
import Image from 'next/image';
import { CheckCircle2 } from 'lucide-react';
import { contactStatusData } from './contactStatusData';

interface ContactModalStatusProps {
  isSuccess: boolean;
  isSubmitting: boolean;
  closeModal: () => void;
}

export function ContactModalStatus({ isSuccess, isSubmitting, closeModal }: Readonly<ContactModalStatusProps>) {
  if (isSuccess) {
    return (
      <div className="py-space-48 px-space-16 flex flex-col items-center text-center">
        <div className="mx-auto mb-space-24 relative w-space-64 h-space-64">
          <Image src="/contact/calendar-scheduled.svg" alt="Calendar icon" width={50} height={50} className="absolute top-0 left-space-8" />
          <div className="absolute bottom-0 right-0 w-space-26 h-space-26 bg-success rounded-full flex items-center justify-center shadow-[0_0_15px_rgba(0,217,95,0.4)] ring-4 ring-surface-dark">
            <Image src="/contact/check-thick.svg" alt="Checkmark icon" width={14} height={14} />
          </div>
        </div>

        <div className="text-success text-[11px] font-bold tracking-widest uppercase mb-space-12">{contactStatusData.success.badge}</div>
        <h3 className="text-card-title text-white mb-space-16">{contactStatusData.success.title}</h3>

        <p className="text-gray-300 text-section-subtitle-mobile mb-space-32">
          {contactStatusData.success.subtitle}
        </p>

        <p className="text-[11px] text-gray-500 leading-relaxed max-w-sm mx-auto mb-space-40">
          {contactStatusData.success.descriptionLines[0]}<br />{contactStatusData.success.descriptionLines[1]}
        </p>

        <div className="flex flex-col sm:flex-row gap-space-16 w-full max-w-md mx-auto">
          {contactStatusData.success.actions.map((action) => (
            <Link key={action.href} href={action.href} onClick={closeModal} className="flex-1 bg-primary hover:bg-primary text-white py-space-12 px-space-24 rounded-lg text-[13px] font-medium transition-colors flex items-center justify-center shadow-lg shadow-glow-primary">
              {action.label} <span className="ml-space-8 font-bold">→</span>
            </Link>
          ))}
        </div>
      </div>
    );
  }

  if (isSubmitting) {
    return (
      <div className="py-space-64 px-space-16 flex flex-col items-center text-center">
        <div className="w-[46px] h-[46px] border-[3px] border-primary/20 border-t-primary rounded-full animate-spin mb-space-32"></div>
        <div className="text-primary text-[11px] font-bold tracking-widest uppercase mb-space-12">{contactStatusData.submitting.badge}</div>
        <h3 className="text-[28px] font-semibold text-white mb-space-8">{contactStatusData.submitting.title}</h3>
        <p className="text-gray-400 text-[13px] mb-space-40">{contactStatusData.submitting.subtitle}</p>

        <div className="flex flex-col gap-space-14 mb-space-48 text-left">
          {contactStatusData.submitting.checks.map((check) => (
            <div key={check} className="flex items-center text-[13px] text-gray-300">
              <CheckCircle2 className="w-space-16 h-space-16 text-primary mr-space-12" /> {check}
            </div>
          ))}
        </div>

        <p className="text-card-detail-mobile text-gray-500 leading-relaxed">
          {contactStatusData.submitting.descriptionLines[0]}<br />{contactStatusData.submitting.descriptionLines[1]}
        </p>
      </div>
    );
  }

  return null;
}
