"use client";

import { useState } from "react";
import { Container, Section, SectionHeader } from "@/components/ui";
import { aboutContentData, type AboutTabContent } from "./aboutContentData";
import AboutContentTabs from "./AboutContentTabs";

export type AboutContentProps = {
  eyebrow?: string;
  title?: string;
  tabs?: AboutTabContent[];
};

export default function AboutContent({
  eyebrow = "ABOUT CORDINIT",
  title = "Making technology work for what matters.",
  tabs: tabsProp,
}: AboutContentProps = {}) {
  const tabs = Array.isArray(tabsProp) && tabsProp.length > 0 ? tabsProp : aboutContentData;
  const [activeTabId, setActiveTabId] = useState(tabs[0].id);

  const activeContent = tabs.find((tab) => tab.id === activeTabId) ?? tabs[0];

  return (
    <Section spacing="lg">
      <Container>
        <div className="flex flex-col lg:flex-row gap-10 md:gap-16 lg:gap-24 items-center">
          <div className="w-full lg:w-1/2 flex flex-col items-start min-h-[350px]">
            <SectionHeader eyebrow={eyebrow}
              eyebrowClassName="text-mobile-subhead sm:text-eyebrow-desktop"
              title={title}
              titleClassName="text-mobile-heading-1-eb font-extrabold sm:text-section-title"
              className="mb-5 md:mb-10" />

            <AboutContentTabs
              tabs={tabs}
              activeTabId={activeTabId}
              onTabChange={setActiveTabId}
            />

            <div className="flex-1 w-full animate-in fade-in duration-500">
              <h3 className="text-card-title-mobile md:text-card-title mb-4 md:mb-5">{activeContent.title}</h3>
              {activeContent.paragraphs.map((paragraph) => (
                <p key={paragraph.slice(0, 24)} className="text-[14px] md:text-section-subtitle text-ink-muted mb-5 last:mb-0">
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
