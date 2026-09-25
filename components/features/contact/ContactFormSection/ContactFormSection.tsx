
import ContactFormWrapper from './ContactForm/index';
import ContactInfoGrid from './ContactInfoGrid';
import { contactCmsData } from '../../../../data/contact';

export default function ContactFormSection() {
  return (
    <section className="w-full mx-auto bg-surface">
      <div className="flex flex-col lg:flex-row gap-8 lg:gap-6">
        <ContactFormWrapper cmsData={contactCmsData.formContent} />
        <ContactInfoGrid 
          processSteps={contactCmsData.processSteps} 
          contactInfo={contactCmsData.contactInfo} 
        />
      </div>
    </section>
  );
}
