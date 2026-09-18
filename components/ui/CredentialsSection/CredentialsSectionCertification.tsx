import Image from "next/image";

export type CertificationItem = {
  id: string;
  src: string;
  alt: string;
  width?: number;
  height?: number;
  aspectRatio?: string;
};

export type CredentialsSectionCertificationProps = {
  certification: CertificationItem;
};

export default function CredentialsSectionCertification({
  certification,
}: CredentialsSectionCertificationProps) {
  return (
    <div 
      className="flex justify-center items-center flex-shrink-0"
      style={{ 
        width: certification.width ? `${certification.width}px` : 'auto',
        height: certification.height ? `${certification.height}px` : '80px',
        aspectRatio: certification.aspectRatio
      }}
    >
      <Image
        src={certification.src}
        alt={certification.alt}
        width={Math.round(certification.width || 140)}
        height={Math.round(certification.height || 80)}
        className="object-contain w-full h-full"
      />
    </div>
  );
}
