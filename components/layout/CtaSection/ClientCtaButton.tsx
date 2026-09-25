"use client";

import { useContactModal } from "@/components/features/contact/ContactModal/ContactModalProvider";
import { Button } from "@/components/ui";

type Props = {
  label: string;
  className?: string;
};

export default function ClientCtaButton({ label, className }: Readonly<Props>) {
  const { openModal } = useContactModal();

  return (
    <Button
      onClick={() => openModal()}
      className={className}
    >
      {label}
    </Button>
  );
}
