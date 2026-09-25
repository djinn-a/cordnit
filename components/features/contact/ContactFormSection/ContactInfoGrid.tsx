import ContactCard from './ContactCard';
import { ContactCardType } from './types';

type ContactInfoGridProps = {
  processSteps: {
    sectionTitle: string;
    steps: Array<{ id: string; number: string; title: string; description: string }>;
  };
  contactInfo: {
    headerTitle: string;
    headerSubtitle: string;
    cards: Array<ContactCardType>;
  };
};

export default function ContactInfoGrid({ processSteps, contactInfo }: Readonly<ContactInfoGridProps>) {
  return (
    <div className="w-full lg:w-7/12 flex flex-col gap-6 md:gap-8">

      {/* What happens next Card */}
      <div className="bg-white border border-border-card rounded-3xl p-6 md:p-10 shadow-[0_4px_24px_rgba(0,0,0,0.02)]">
        <h3 className="text-[16px] md:text-2xl font-semibold text-gray-800 mb-6">{processSteps.sectionTitle}</h3>
        <hr className="border-border-card mb-8" />

        <div className="space-y-8">
          {processSteps.steps.map((step) => (
            <div key={step.id}>
              <h4 className="text-[14px] md:text-help-card-title-desktop font-semibold text-gray-900 mb-2">{step.number}. {step.title}</h4>
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
          {contactInfo.headerTitle}
        </h3>
        <p className="text-gray-700 md:text-section-subtitle leading-relaxed mb-6 md:mb-8">
          {contactInfo.headerSubtitle}
        </p>
      </div>

      {/* Info Grid */}
      <div className="grid grid-cols-2 gap-3 md:gap-6">
        {contactInfo.cards.map((card) => (
          <ContactCard key={card.id} card={card} />
        ))}
      </div>
    </div>
  );
}
