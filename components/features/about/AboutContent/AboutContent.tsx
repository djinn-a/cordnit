"use client";

import { useState } from "react";
import { Container, Section, SectionHeader } from "@/components/ui";
import { aboutContentData } from "./aboutContentData";
import AboutContentTabs from "./AboutContentTabs";

export type AboutContentProps = {
  eyebrow?: string;
  title?: string;
};

export default function AboutContent({
  eyebrow = "ABOUT CORDINIT",
  title = "Making technology work for what matters.",
}: AboutContentProps = {}) {
  const [activeTabId, setActiveTabId] = useState(aboutContentData[0].id);

  const activeContent =
    aboutContentData.find((tab) => tab.id === activeTabId) || aboutContentData[0];

  return (
    <Section spacing="lg">
      <Container>
        <div className="flex flex-col lg:flex-row gap-10 md:gap-16 lg:gap-24 items-center">
          <div className="w-full lg:w-1/2 flex flex-col items-start min-h-[350px]">
            <SectionHeader eyebrow={eyebrow} title={title} className="mb-5 md:mb-10" />

            <AboutContentTabs
              tabs={aboutContentData}
              activeTabId={activeTabId}
              onTabChange={setActiveTabId}
            />

            <div className="flex-1 w-full animate-in fade-in duration-500">
              <h3 className="text-h3 mb-4 md:mb-5">{activeContent.title}</h3>
              {activeContent.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-body mb-5 last:mb-0">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          <div className="w-full lg:w-1/2 relative flex justify-end">
            <div className="relative w-full max-w-[550px] h-[360px] xs:h-[400px] md:h-[500px] rounded-card-lg overflow-hidden shadow-lg">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                key={activeContent.imageSrc}
                src={activeContent.imageSrc}
                alt={activeContent.imageAlt}
                className="w-full h-full object-cover animate-in fade-in duration-500"
              />
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}
