import { ModalProvider } from '@/contexts/ModalContext';
import { UserLocationProvider } from '@/contexts';

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <ModalProvider>
      <UserLocationProvider>{children}</UserLocationProvider>
    </ModalProvider>
  );
}
