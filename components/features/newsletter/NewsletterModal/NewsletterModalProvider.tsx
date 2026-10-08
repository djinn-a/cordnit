"use client";

import React, { createContext, useCallback, useContext, useEffect, useMemo, useRef, useState, ReactNode } from 'react';
import { useNewsletterSubscribe, type NewsletterSubscribe } from '@/hooks/useNewsletterSubscribe';
import NewsletterModal from './NewsletterModal';
import { trackEvent } from '@/lib/analytics';

const CLOSE_MS = 300;

interface NewsletterModalContextType {
  isOpen: boolean;
  openModal: () => void;
  closeModal: () => void;
  subscription: NewsletterSubscribe;
}

const NewsletterModalContext = createContext<NewsletterModalContextType | undefined>(undefined);

export function useNewsletterModal() {
  const context = useContext(NewsletterModalContext);
  if (!context) {
    throw new Error('useNewsletterModal must be used within a NewsletterModalProvider');
  }
  return context;
}

export function NewsletterModalProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [isOpen, setIsOpen] = useState(false);
  const subscription = useNewsletterSubscribe('Newsletter Modal');
  const { reset } = subscription;
  const resetTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openModal = useCallback(() => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
    if (!isOpen) trackEvent('newsletter_view', { location: 'newsletter-modal' });
    setIsOpen(true);
  }, [isOpen]);

  const closeModal = useCallback(() => {
    setIsOpen(false);
    resetTimer.current = setTimeout(reset, CLOSE_MS);
  }, [reset]);

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => () => {
    if (resetTimer.current) clearTimeout(resetTimer.current);
  }, []);

  const value = useMemo(
    () => ({ isOpen, openModal, closeModal, subscription }),
    [isOpen, openModal, closeModal, subscription]
  );

  return (
    <NewsletterModalContext.Provider value={value}>
      {children}
      <NewsletterModal />
    </NewsletterModalContext.Provider>
  );
}
