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
    <div className="flex flex-col items-center w-full gap-space-64 mt-space-64">
      <h3 className="text-card-title text-ink text-center">
        {certificationHeading}
      </h3>
      <div className="flex flex-wrap justify-center items-center gap-space-64 w-full">
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
