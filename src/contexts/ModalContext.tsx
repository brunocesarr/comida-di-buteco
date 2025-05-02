'use client';

import { Modal } from '@/components';
import { createContext, type ReactNode, useCallback, useContext, useMemo, useState } from 'react';

interface ModalContextData {
  openModal: (title: string | null, content: string | ReactNode | null) => void;
  closeModal: () => void;
}

export const ModalContext = createContext({} as ModalContextData);

interface ModalProviderProps {
  children: string | ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState<string | null>('');
  const [modalContent, setModalContent] = useState<string | ReactNode | null>(null);

  const openModal = useCallback(
    (title: string | null = null, content: string | ReactNode | null = null) => {
      setModalTitle(title);
      setModalContent(content);
      setIsModalOpen(true);
    },
    []
  );

  const closeModal = useCallback(() => {
    setModalTitle(null);
    setModalContent(null);
    setIsModalOpen(false);
  }, []);

  const contextValue = useMemo(
    () => ({
      openModal,
      closeModal,
    }),
    [openModal, closeModal]
  );

  return (
    <ModalContext.Provider value={contextValue}>
      {children}
      <Modal title={modalTitle} isOpen={isModalOpen} onClose={closeModal}>
        {modalContent}
      </Modal>
    </ModalContext.Provider>
  );
};

export const useModal = () => useContext(ModalContext);
