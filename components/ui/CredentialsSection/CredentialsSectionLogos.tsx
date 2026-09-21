import CredentialsSectionCertification, {
  CertificationItem,
} from "./CredentialsSectionCertification";

export type CredentialsSectionLogosProps = {
  certificationHeading: string;
  certifications: CertificationItem[];
};

export default function CredentialsSectionLogos({
  certificationHeading,
  certifications,
}: CredentialsSectionLogosProps) {
  return (
    <div className="flex flex-col items-center w-full gap-space-32 lg:gap-space-64 mt-space-40 lg:mt-space-64">
      <h3 className="text-base font-semibold lg:text-card-title lg:font-bold text-ink text-center">
        {certificationHeading}
      </h3>
      <div className="grid grid-cols-2 justify-items-center items-center gap-space-32 lg:flex lg:flex-wrap lg:justify-center lg:gap-space-64 w-full">
        {certifications.map((certification) => (
          <CredentialsSectionCertification
            key={certification.id}
            certification={certification}
          />
        ))}
      </div>
    </div>
  );
}
