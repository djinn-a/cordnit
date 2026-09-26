import ContactFormWrapper from './ContactForm/index';
import ContactInfoGrid from './ContactInfoGrid';
import { contactCmsData } from '../../../../data/contact';

type ContactCmsData = typeof contactCmsData;

export type ContactFormSectionProps = Partial<ContactCmsData>;

export default function ContactFormSection({
  formContent = contactCmsData.formContent,
  processSteps = contactCmsData.processSteps,
  contactInfo = contactCmsData.contactInfo,
}: ContactFormSectionProps = {}) {
  return (
    <section className="w-full mx-auto bg-surface">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-6">
        <ContactFormWrapper cmsData={formContent} />
        <ContactInfoGrid
          processSteps={processSteps}
          contactInfo={contactInfo}
        />
      </div>
    </section>
  );
}
