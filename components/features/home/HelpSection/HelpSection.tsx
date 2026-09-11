import React from "react";
import { ArrowRight } from "lucide-react";
import Image from "next/image";
import { Container, Section } from "@/components/ui";
import { cn } from "@/lib/utils/cn";

export type HelpService = {
  num: string;
  title: string;
  desc: string;
  iconPath: string;
};

export type HelpSectionProps = {
  title?: string;
  description?: string;
  services?: HelpService[];
};

const defaultServices: HelpService[] = [
  {
    num: "01",
    title: "Cybersecurity",
    desc: "We provide advanced cybersecurity solutions to protect digital assets from evolving threats.",
    iconPath: "/icons/cybersecurity.svg",
  },
  {
    num: "02",
    title: "Cloud & Infrastructure",
    desc: "Future-ready infrastructure and cloud services that scale seamlessly.",
    iconPath: "/icons/cloud.svg",
  },
  {
    num: "03",
    title: "AI & Automation",
    desc: "We help you unlock your business's full potential with AI-powered automation.",
    iconPath: "/icons/ai.svg",
  },
  {
    num: "04",
    title: "Data & Integration",
    desc: "Being a leading technology partner we're specialized in building unified digital ecosystems.",
    iconPath: "/icons/data.svg",
  },
  {
    num: "05",
    title: "Salesforce",
    desc: "Tailored CRM ecosystems that help simplify complex business processes.",
    iconPath: "/icons/salesforce.svg",
  },
  {
    num: "06",
    title: "Application Engineering",
    desc: "We combine client trust and technical intelligence to build softwares that offer lasting business value.",
    iconPath: "/icons/engineering.svg",
  },
];

export default function HelpSection({
  title = "Where we can help",
  description = "Structured methodologies applied to complex technological challenges. We architect solutions designed for scalability, security, and operational endurance.",
  services = defaultServices,
}: HelpSectionProps = {}) {
  return (
    <Section spacing="sm" className="pt-8 pb-4 sm:py-16 lg:py-20">
      <Container width="narrow">
        <div className="flex flex-col md:flex-row md:items-start justify-between mb-6 sm:mb-12 lg:mb-16 gap-3 sm:gap-8">
          <h2 className="text-h2 md:w-1/2">{title}</h2>
          <p className="text-body-lg md:w-1/2 max-w-[95%]">{description}</p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((service, index) => {
            const isLgBottomBorder = index < 3;
            const isLgRightBorder = (index + 1) % 3 !== 0;

            return (
              <React.Fragment key={service.num}>
                <div
                  className={cn(
                    "hidden sm:block relative p-6 md:p-8 lg:p-12 border-primary-border border-b-2 hover:bg-primary-pale transition-colors",
                    isLgRightBorder && "lg:border-r-2",
                    !isLgBottomBorder && "lg:border-b-0"
                  )}
                >
                  <div className="flex justify-between items-start mb-10 lg:mb-12">
                    <Image
                      src={service.iconPath}
                      alt={service.title}
                      width={32}
                      height={32}
                      className="w-8 h-8"
                    />
                    <span className="text-caption font-semibold text-ink">
                      {service.num}
                    </span>
                  </div>
                  <h3 className="text-h4 text-primary mb-3 lg:mb-4">
                    {service.title}
                  </h3>
                  <p className="text-body-sm">{service.desc}</p>
                </div>

                <div className="sm:hidden flex items-start py-4 border-b border-border-subtle group cursor-pointer hover:bg-primary-pale/50 transition-colors">
                  <div className="text-primary font-medium mr-3 mt-0.5 text-body-sm">
                    {service.num}
                  </div>
                  <div className="flex-1 pr-3">
                    <h3 className="text-h4 font-medium mb-1 group-hover:text-primary transition-colors">
                      {service.title}
                    </h3>
                    <p className="text-body-sm">{service.desc}</p>
                  </div>
                  <div className="mt-1.5 shrink-0">
                    <ArrowRight className="w-4 h-4 text-primary" />
                  </div>
                </div>
              </React.Fragment>
            );
          })}
        </div>
      </Container>
    </Section>
  );
}
