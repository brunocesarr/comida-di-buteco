import { useState } from 'react';
import useClickOutside from '@/hooks/useClickOutside';

export function Dropdown({
  children,
  trigger,
}: {
  children: React.ReactNode;
  trigger: React.ReactNode;
}) {
  const [show, setShow] = useState(false);
  const dropRef = useClickOutside(() => setShow(false));

  const handleClose = (e: React.MouseEvent | React.KeyboardEvent) => {
    if ((e as React.KeyboardEvent).key === 'Escape') {
      setShow(false);
    }
  };

  return (
    <div
      className="w-fit relative z-10"
      ref={dropRef}
      onClick={() => setShow((curr) => !curr)}
      onKeyDown={handleClose}>
      <div>{trigger}</div>
      {show && (
        <ul className="min-w-max max-w-64 px-2 absolute right-0 mt-2 bg-black/90 backdrop-blur-lg divide-y divide-white/40 rounded-lg shadow overflow-hidden">
          {children}
        </ul>
      )}
    </div>
  );
}

export function DropdownItem({ children }: { children: React.ReactNode }) {
  return (
    <li className="flex gap-3 items-center px-4 py-2 text-white hover:bg-gray-50 cursor-pointer justify-end">
      {children}
    </li>
  );
}
