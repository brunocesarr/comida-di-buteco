import type { ReactNode } from 'react';

type ModalProps = {
  title: string | null;
  isOpen: boolean;
  onClose: () => void;
  children: ReactNode;
};

type AlertModalProps = ModalProps & {
  isError: boolean;
};

type ConfirmModalProps = ModalProps & {
  onConfirm: () => void;
  isEnabledConfirm?: boolean;
};

export function Modal({ title, isOpen, onClose, children }: ModalProps) {
  const handleClose = (e: React.MouseEvent | React.KeyboardEvent) => {
    if ((e as React.KeyboardEvent).key === 'Escape') {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div
      onClick={onClose}
      onKeyDown={handleClose}
      className="fixed inset-0 bg-black/45 flex justify-center items-center z-50 text-black transition-all transition-discrete delay-150 duration-700 ease-in-out overscroll-none">
      <div
        onClick={(e) => e.stopPropagation()}
        onKeyDown={handleClose}
        className="relative object-center bg-white p-4 rounded shadow-lg max-w-full min-w-sm overflow-auto h-fit">
        <button
          onClick={onClose}
          className="min-w-10 min-h-10 absolute top-2 right-2 text-xl font-bold text-red-600 hover:bg-red-100 rounded-full cursor-pointer">
          &times;
        </button>
        {title && <h2 className="text-2xl font-bold mb-4">{title}</h2>}
        {children}
      </div>
    </div>
  );
}

export function AlertModal({ title, isOpen, onClose, children, isError }: AlertModalProps) {
  const buttonColor = isError
    ? 'border-red-100 hover:bg-red-700 text-red-600'
    : 'bg-green-700 border-green-100 hover:bg-green-600 text-white';

  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose}>
      <div className="text-base my-4 font-sans text-justify">
        <div className="text-base font-light">{children}</div>
      </div>
      <div className="flex items-center justify-end">
        <button
          className={`max-w-full min-w-10 min-h-10 mt-4 px-12 cursor-pointer border hover:text-white rounded-md hover:shadow-lg font-semibold ${buttonColor}`}
          onClick={onClose}>
          Ok
        </button>
      </div>
    </Modal>
  );
}

export function ConfirmModal(
  { title, isOpen, onClose, children, onConfirm, isEnabledConfirm }: ConfirmModalProps = {
    isEnabledConfirm: true,
    title: 'Confirmar',
    isOpen: false,
    onClose: () => {},
    onConfirm: () => {},
    children: <></>,
  }
) {
  const confirmButtonColor = isEnabledConfirm
    ? 'bg-green-700 border-green-100 hover:bg-green-600 text-white hover:shadow-lg cursor-pointer'
    : 'bg-gray-700/60 border-gray-100 text-white cursor-not-allowed';

  const handleConfirm = (e: React.MouseEvent) => {
    e.preventDefault();
    onConfirm();
  };

  return (
    <Modal title={title} isOpen={isOpen} onClose={onClose}>
      <div className="text-base my-4 font-sans text-justify">
        <div className="text-base font-light">{children}</div>
      </div>
      <div className="flex items-center justify-end gap-2">
        <button
          className={`max-w-full min-w-10 min-h-10 mt-4 px-12 border hover:text-white rounded-md font-semibold ${confirmButtonColor}`}
          onClick={handleConfirm}
          disabled={!isEnabledConfirm}>
          Confirmar
        </button>
      </div>
    </Modal>
  );
}
