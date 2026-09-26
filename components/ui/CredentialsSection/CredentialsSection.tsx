import Image from "next/image";
import CredentialsSectionHeader from "./CredentialsSectionHeader";
import CredentialsSectionLogos from "./CredentialsSectionLogos";
import type { CertificationItem } from "./CredentialsSectionCertification";

export type CredentialsSectionData = {
  eyebrow: string;
  title: string;
  subtitle: string;
  certificationHeading: string;
  certifications: CertificationItem[];
  backgroundImage: {
    src: string;
    alt: string;
  };
};

export type CredentialsSectionProps = {
  data: CredentialsSectionData;
};

export default function CredentialsSection({ data }: CredentialsSectionProps) {
  return (
    <section className="w-full">
      <div className="mx-auto w-full max-w-[1240px]">
        <div className="relative w-full rounded-card-lg overflow-hidden bg-[#E9EFFF] px-space-24 py-space-64 lg:px-space-64 lg:py-space-64">
          {/* Background Image */}
          <div className="absolute inset-0 z-0">
            <Image
              src={data.backgroundImage.src}
              alt={data.backgroundImage.alt}
              fill
              sizes="(min-width: 1240px) 1240px, 100vw"
              className="object-cover object-center"
              priority
            />
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center">
            <CredentialsSectionHeader
              eyebrow={data.eyebrow}
              title={data.title}
              subtitle={data.subtitle}
            />
            <CredentialsSectionLogos
              certificationHeading={data.certificationHeading}
              certifications={data.certifications}
            />
          </div>
        </div>
      </div>
    </section>
  );
}
