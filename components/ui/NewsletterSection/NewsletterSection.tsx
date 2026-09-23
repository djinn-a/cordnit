"use client";
import Container from "@/components/ui/Container/Container";
import NewsletterContent from "./NewsletterContent";
import NewsletterForm from "./NewsletterForm";
import type { NewsletterSectionProps } from "./NewsletterSection.types";

export default function NewsletterSection(props: Readonly<NewsletterSectionProps>) {
  return (
    <section className="w-full max-w-360 mx-auto px-0 mt-0 mb-space-80">
      <Container>
        <div className="w-full bg-primary-pale border border-primary-border rounded-2xl p-5 md:p-space-40 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
          <NewsletterContent title={props.title} description={props.description} />
          <NewsletterForm 
            placeholder={props.placeholder} 
            buttonText={props.buttonText} 
            consentText={props.consentText} 
          />
        </div>
      </Container>
    </section>
  );
}
