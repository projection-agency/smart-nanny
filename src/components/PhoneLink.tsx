"use client";

import { useAnalytics } from "@/hooks/useAnalytics";

interface PhoneLinkProps {
  phone: string;
  children: React.ReactNode;
  className?: string;
}

export const PhoneLink = ({ phone, children, className }: PhoneLinkProps) => {
  const { trackPhoneCall } = useAnalytics();

  const handleClick = () => {
    trackPhoneCall(phone);
  };

  return (
    <a
      href={`tel:${phone}`}
      onClick={handleClick}
      className={className}
      aria-label={`Зателефонувати за номером ${phone}`}
    >
      {children}
    </a>
  );
};
