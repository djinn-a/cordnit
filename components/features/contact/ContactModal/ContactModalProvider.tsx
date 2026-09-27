"use client";

import React, { createContext, useContext, useState, useEffect, useRef } from 'react';
import { ContactModal } from './ContactModal';

const POPUP_BG = '/popup-bg.webp';
const CLOSE_MS = 300;

export interface ModalContext {
  [key: string]: string | boolean | undefined;
  ctaLocation?: string;
  source?: string;
  service?: string;
  solution?: string;
}

interface ContactModalContextType {
  isOpen: boolean;
  openModal: (context?: ModalContext) => void;
  closeModal: () => void;
}

const ContactModalContext = createContext<ContactModalContextType | undefined>(undefined);

export function useContactModal() {
  const context = useContext(ContactModalContext);
  if (!context) {
    throw new Error('useContactModal must be used within a ContactModalProvider');
  }
  return context;
}

export function ContactModalProvider({ children }: Readonly<{ children: React.ReactNode }>) {
  const [isOpen, setIsOpen] = useState(false);
  const [isEntered, setIsEntered] = useState(false);
  const [modalContext, setModalContext] = useState<ModalContext>({});
  const closeTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const openModal = React.useCallback((context?: ModalContext | React.SyntheticEvent) => {
    if (closeTimerRef.current) {
      clearTimeout(closeTimerRef.current);
      closeTimerRef.current = null;
    }
    // Prevent React SyntheticEvents from being stored as context
    if (context && typeof context === 'object' && !('nativeEvent' in context) && !('preventDefault' in context)) {
      setModalContext(context as ModalContext);
    } else {
      setModalContext({});
    }
    setIsOpen(true);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setIsEntered(true));
    });
  }, []);

  const closeModal = React.useCallback(() => {
    setIsEntered(false);
    closeTimerRef.current = setTimeout(() => {
      setIsOpen(false);
      setModalContext({});
      closeTimerRef.current = null;
    }, CLOSE_MS);
  }, []);

  // Preload popup background so first open is not transparent
  useEffect(() => {
    const preload = () => {
      const img = new Image();
      img.src = POPUP_BG;
    };
    if (typeof window !== 'undefined' && 'requestIdleCallback' in window) {
      const id = window.requestIdleCallback(preload);
      return () => window.cancelIdleCallback(id);
    }
    const timer = setTimeout(preload, 1);
    return () => clearTimeout(timer);
  }, []);

  // Prevent background scrolling when modal is open
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
    return () => {
      if (closeTimerRef.current) clearTimeout(closeTimerRef.current);
    };
  }, []);

  const contextValue = React.useMemo(() => ({ isOpen, openModal, closeModal }), [isOpen, openModal, closeModal]);

  return (
    <ContactModalContext.Provider value={contextValue}>
      {children}
      {isOpen && <ContactModal isEntered={isEntered} modalContext={modalContext} />}
    </ContactModalContext.Provider>
  );
}
