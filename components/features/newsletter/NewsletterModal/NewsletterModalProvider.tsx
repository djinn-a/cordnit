"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

export type NewsletterStatus = 'idle' | 'validating' | 'success';

interface NewsletterModalContextType {
  isOpen: boolean;
  status: NewsletterStatus;
  openModal: () => void;
  closeModal: () => void;
  submit: () => void;
}

const NewsletterModalContext = createContext<NewsletterModalContextType | undefined>(undefined);

export function useNewsletterModal() {
  const context = useContext(NewsletterModalContext);
  if (!context) {
    throw new Error('useNewsletterModal must be used within a NewsletterModalProvider');
  }
  return context;
}

import NewsletterModal from './NewsletterModal';

export function NewsletterModalProvider({ children }: Readonly<{ children: ReactNode }>) {
  const [isOpen, setIsOpen] = useState(false);
  const [status, setStatus] = useState<NewsletterStatus>('idle');

  const openModal = () => setIsOpen(true);

  const closeModal = () => {
    setIsOpen(false);
    setTimeout(() => {
      setStatus('idle');
    }, 300);
  };

  const submit = () => {
    setStatus('validating');
  };

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  useEffect(() => {
    if (status === 'validating') {
      const timer = setTimeout(() => {
        setStatus('success');
      }, 2500);
      return () => clearTimeout(timer);
    }
  }, [status]);

  return (
    <NewsletterModalContext.Provider value={{ isOpen, status, openModal, closeModal, submit }}>
      {children}
      <NewsletterModal />
    </NewsletterModalContext.Provider>
  );
}
