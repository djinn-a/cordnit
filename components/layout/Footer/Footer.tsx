// "use client";

// import React from 'react';
// import Link from 'next/link';
// import Image from 'next/image';
// import { ArrowRight } from 'lucide-react';
// import { Button } from '@/components/ui';
// import { useContactModal } from '../../features/contact/ContactModal/ContactModalProvider';

// import FooterNewsletter from './FooterNewsletter';
// import FooterMediaFeature from './FooterMediaFeature';
// import { FOOTER_NAV_COLUMNS, SOCIAL_LINKS } from './footerData';

// export default function Footer() {
//   const { openModal } = useContactModal();

//   return (
//     <footer className="w-full relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
//       {/* Background Image */}
//       <div 
//         className="absolute inset-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat"
//         style={{ backgroundImage: "url('/footer-bg.webp')" }}
//       >
//       </div>

//       {/* Main Container */}
//       <div className="relative z-10 bg-white rounded-card-lg shadow-card p-6 md:p-12 lg:p-16 max-w-container-xl 2xl:max-w-container-2xl 3xl:max-w-container-wide mx-auto flex flex-col min-h-[400px]">

//         <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-8">
//           {/* Logo and Tagline (Left Side) */}
//           <div className="lg:w-1/4 shrink-0 mb-4 lg:mb-0">
//             <div className="flex flex-col gap-[5px] lg:gap-[9px] mb-5 lg:mb-6">
//               <Link href="/" className="shrink-0 w-max">
//                 <Image
//                   src="/logo.webp"
//                   alt="Cordinit Logo"
//                   width={73}
//                   height={60}
//                   className="h-[60px] w-[72.844px] brightness-0"
//                 />
//               </Link>
//               <p className="text-black text-caption max-w-[200px]">
//                 Let&apos;s talk about your next milestone—and how to reach it
//               </p>
//             </div>
//             <Button
//               variant="primary"
//               size="md"
//               onClick={openModal}
//               className="w-max"
//               rightIcon={<ArrowRight className="h-4 w-4" />}
//             >
//               Book a call
//             </Button>
//           </div>

//           {/* Links Grid (Right Side) */}
//           <div className="lg:w-3/4 grid grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-8 lg:gap-8">
//             {FOOTER_NAV_COLUMNS.map((col) => (
//               <div key={col.id} className={col.orderClasses}>
//                 <h4 className="text-ink text-mobile-footer-heading sm:text-eyebrow lg:text-footer-heading-desktop mb-4 lg:mb-5">{col.title}</h4>
//                 <ul className="space-y-3">
//                   {col.links.map((link, idx) => (
//                     <li key={idx}>
//                       <Link href={link.href} className="text-black hover:text-ink text-mobile-body-1 sm:text-card-desc">
//                         {link.label}
//                       </Link>
//                     </li>
//                   ))}
//                 </ul>
//               </div>
//             ))}
//           </div>
//         </div>

//         {/* Bottom Section */}
//         <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-12 lg:mt-20 pt-8 border-t border-transparent">
//           {/* Social Icons */}
//           <div className="flex gap-3 mb-8 lg:mb-0">
//             {SOCIAL_LINKS.map((social) => (
//               <a
//                 key={social.id}
//                 href={social.href}
//                 className="w-9 h-9 rounded-full bg-footer-icon flex items-center justify-center hover:opacity-80 transition-opacity"
//                 aria-label={social.label}
//               >
//                 <Image src={social.icon} alt={social.label} width={16} height={16} />
//               </a>
//             ))}
//           </div>

//           {/* Stay Ahead Form */}
//           <FooterNewsletter />
//         </div>
//       </div>

//       {/* Latest from Cordinit Section */}
//       <FooterMediaFeature />
//     </footer>
//   );
// }



"use client";

import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui';
import { useContactModal } from '@/components/features/contact/ContactModal/ContactModalProvider';

import FooterNewsletter from './FooterNewsletter';
import FooterMediaFeature from './FooterMediaFeature';
import { FOOTER_NAV_COLUMNS, SOCIAL_LINKS, FOOTER_BRANDING } from './footerData';

export default function Footer() {
  const { openModal } = useContactModal();

  return (
    <footer className="w-full relative py-12 px-4 sm:px-6 lg:px-8 overflow-hidden">
      {/* Background Image */}
      <div
        className="absolute inset-0 w-full h-full z-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: "url('/footer-bg.webp')" }}
      >
      </div>

      {/* Main Container */}
      <div className="relative z-10 bg-white rounded-card-lg shadow-card p-6 md:p-12 lg:p-16 max-w-container-xl 2xl:max-w-container-2xl 3xl:max-w-container-wide mx-auto flex flex-col min-h-100">

        <div className="flex flex-col lg:flex-row justify-between gap-10 lg:gap-8">
          {/* Logo and Tagline (Left Side) */}
          <div className="lg:w-1/4 shrink-0 mb-4 lg:mb-0">
            <div className="flex flex-col gap-1.25 lg:gap-2.25 mb-5 lg:mb-6">
              <Link href="/" className="shrink-0 w-max">
                <Image
                  src="/logo.webp"
                  alt={FOOTER_BRANDING.logoAlt}
                  width={73}
                  height={60}
                  className="h-15 w-[72.844px] brightness-0"
                />
              </Link>
              <p className="text-black text-caption max-lg:text-card-desc-mobile max-w-50">
                {FOOTER_BRANDING.tagline}
              </p>
            </div>
            <Button
              variant="primary"
              size="md"
              onClick={openModal}
              className="w-max max-lg:text-link-mobile"
              rightIcon={<ArrowRight className="h-4 w-4" />}
            >
              {FOOTER_BRANDING.ctaText}
            </Button>
          </div>

          {/* Links Grid (Right Side) */}
          <div className="lg:w-3/4 grid grid-cols-2 lg:grid-cols-5 gap-x-4 gap-y-8 lg:gap-8">
            {FOOTER_NAV_COLUMNS.map((col) => (
              <div key={col.id} className={col.orderClasses}>
                <h4 className="text-ink text-eyebrow lg:text-footer-heading-desktop max-lg:text-card-detail-mobile max-lg:font-bold mb-4 lg:mb-5">{col.title}</h4>
                <ul className="space-y-3">
                  {col.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className="text-black hover:text-ink text-card-desc max-lg:text-section-subtitle-mobile">
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Section */}
        <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center mt-12 lg:mt-20 pt-8 border-t border-transparent">
          {/* Social Icons */}
          <div className="flex gap-3 mb-8 lg:mb-0">
            {SOCIAL_LINKS.map((social) => (
              <a
                key={social.id}
                href={social.href}
                className="w-9 h-9 rounded-full bg-footer-icon flex items-center justify-center hover:opacity-80 transition-opacity"
                aria-label={social.label}
              >
                <Image src={social.icon} alt={social.label} width={16} height={16} />
              </a>
            ))}
          </div>

          {/* Stay Ahead Form */}
          <FooterNewsletter />
        </div>
      </div>

      {/* Latest from Cordinit Section */}
      <FooterMediaFeature />
    </footer>
  );
}