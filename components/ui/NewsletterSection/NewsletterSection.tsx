"use client";

import { Mail } from "lucide-react";
import Button from "@/components/ui/Button/Button";

export default function NewsletterSection() {
  return (
    <div className="w-full mt-12 md:mt-16">
      <div className="w-full bg-primary-pale border border-primary-border rounded-2xl p-5 md:p-10 flex flex-col md:flex-row items-center justify-between gap-6 md:gap-12">
        {/* Left Side */}
        <div className="flex items-center gap-4 md:gap-8 w-full md:w-1/2">
          <div className="w-10 h-10 md:w-14 md:h-14 shrink-0 bg-white border border-primary-border shadow-sm rounded-full flex items-center justify-center">
            <Mail className="w-5 h-5 md:w-6 md:h-6 text-primary" />
          </div>
          <div className="flex flex-col gap-1 md:gap-2">
            <h3 className="text-[14px] md:text-[24px] font-bold text-ink leading-tight">
              Keep the conversation going.
            </h3>
            <p className="text-[10px] md:text-[16px] text-ink-muted">
              Receive occasional perspectives on the technology topics that matter to you.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="w-full md:w-1/2 max-w-[512px] flex flex-col gap-3">
          <form className="flex gap-2 w-full" onSubmit={(e) => e.preventDefault()}>
            <input
              type="email"
              placeholder="Work email"
              required
              className="flex-1 h-[45px] px-3 md:px-4 bg-white border border-border-subtle rounded-lg text-[12px] md:text-[14px] text-ink focus:outline-none focus:border-primary"
            />
            <Button
              type="submit"
              variant="primary"
              className="h-[45px] px-4 md:px-6 text-[12px] md:text-[14px] font-semibold rounded-lg shadow-sm transition-colors"
            >
              Subscribe
            </Button>
          </form>
          <div className="flex items-start gap-2 md:gap-3 mt-1 md:mt-2">
            <input
              type="checkbox"
              id="newsletter-consent"
              required
              className="mt-0.5 md:mt-1 w-3 h-3 md:w-4 md:h-4 rounded border-gray-300 text-primary focus:ring-primary shrink-0"
            />
            <label htmlFor="newsletter-consent" className="text-[10px] md:text-[14px] text-ink-muted leading-relaxed">
              I would like to receive Cordinit insights. I understand I can unsubscribe at any time. Read our Privacy Policy.
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
