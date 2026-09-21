import { FC } from "react";
import Image from "next/image";
import Section from "@/components/ui/Section/Section";
import Container from "@/components/ui/Container/Container";
import { deliveryData } from "./solutionsDeliveryData";
import { cn } from "@/lib/utils/cn";

const SolutionsDelivery: FC = () => {
  return (
    <Section spacing="none">
      <Container className="!px-0">
        {/* Main Card */}
        <div className="bg-brand-pale rounded-4xl p-6 sm:p-10 lg:p-16 flex flex-col lg:grid lg:grid-cols-2 gap-10 lg:gap-20">
          
          {/* Left Side: Text */}
          <div className="flex flex-col justify-center gap-6 lg:gap-8">
            <h2 className="text-card-title-mobile lg:text-section-title text-ink">
              {deliveryData.heading}
            </h2>
            <div className="flex flex-col gap-4 lg:gap-6">
              {deliveryData.paragraphs.map((paragraph, index) => (
                <p key={index} className="text-section-subtitle-mobile lg:text-section-subtitle text-ink-muted">
                  {paragraph}
                </p>
              ))}
            </div>
          </div>

          {/* Right Side: Visuals */}
          <div className="relative flex flex-col gap-4 pr-10 sm:pr-8 lg:pr-12">
            {/* Top Image */}
            <div className="relative w-full aspect-[4/3] sm:aspect-video lg:aspect-[4/3] rounded-card overflow-hidden shadow-card">
              <Image 
                src={deliveryData.mainImage}
                alt="Our Vision"
                fill
                className="object-cover"
              />
              <div className="flex absolute inset-0 p-4 sm:p-10 flex-col justify-center text-white w-full sm:w-3/4 pr-16 sm:pr-10 bg-black/30 sm:bg-transparent">
                <span className="text-cta-text2-sb-mobile sm:text-eyebrow-desktop text-[#FE6E21] uppercase tracking-widest mb-1 sm:mb-4">
                  {deliveryData.mainImageEyebrow}
                </span>
                <h3 className="text-heading2-sb-mobile sm:text-card-title mb-2 sm:mb-6 text-white">
                  {deliveryData.mainImageTitle}
                </h3>
                <div className="text-stat-desc-mobile sm:text-link-mobile text-white max-w-[85%] sm:max-w-sm">
                  {deliveryData.mainImageDesc.split(". ").map((line, i) => (
                    <span key={i} className="block">{line}{i !== deliveryData.mainImageDesc.split(". ").length - 1 ? "." : ""}</span>
                  ))}
                </div>
              </div>
            </div>
            
            {/* Bottom Row Images */}
            <div className="grid grid-cols-2 gap-2 sm:gap-4">
              <div className="relative w-full aspect-square rounded-card overflow-hidden shadow-card">
                <Image 
                  src={deliveryData.bottomLeftImage}
                  alt="Secure"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-3 sm:p-6 text-white max-w-[90%] sm:max-w-[80%]">
                  <span className="text-cta-text2-sb-mobile sm:text-link-mobile block">
                    {deliveryData.bottomLeftText.split(" ").map((word, i, arr) => (
                      <span key={i}>{word}{i === 0 ? <br /> : " "}</span>
                    ))}
                  </span>
                </div>
              </div>
              <div className="relative w-full aspect-square rounded-card overflow-hidden shadow-card">
                <Image 
                  src={deliveryData.bottomRightImage}
                  alt="Modernise"
                  fill
                  className="object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 p-3 sm:p-6 text-white max-w-[90%] sm:max-w-[80%]">
                  <span className="text-cta-text2-sb-mobile sm:text-link-mobile block">
                    {deliveryData.bottomRightText.split(" ").map((word, i, arr) => (
                      <span key={i}>{word}{i === 0 ? <br /> : " "}</span>
                    ))}
                  </span>
                </div>
              </div>
            </div>

            {/* Floating Stats */}
            <div className="absolute right-0 top-1/2 -translate-y-1/2 flex flex-col gap-2 sm:gap-4 z-10 w-max pr-2 sm:pr-0">
              {deliveryData.stats.map((stat, i) => (
                <div key={i} className="bg-surface rounded-xl sm:rounded-2xl shadow-card p-2 sm:p-4 flex items-center gap-2 sm:gap-3">
                  <div className="w-4 h-4 sm:w-6 sm:h-6 relative flex-shrink-0">
                    <Image src={stat.iconPath} alt="" fill className="object-contain" />
                  </div>
                  <div className="flex flex-col">
                    <span className="text-section-title-head-mobile sm:text-section-title-head text-primary">{stat.value}</span>
                    <span className="text-stat-desc-mobile sm:text-card-desc text-ink-muted">{stat.label}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
};

export default SolutionsDelivery;
