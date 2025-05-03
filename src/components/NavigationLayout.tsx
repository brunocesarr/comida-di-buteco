import { Footer } from './Footer';
import { NavigationBar } from './NavigationBar';
import Image from 'next/image';
import Background1 from '@/assets/background-1.png';
import Layout from '@/componets/Layout';
import { MapProvider } from '@/contexts/MapProvider';
import { LoadingSpinner } from './LoadingSpinner';

export default function NavigationLayout({
  children,
  showLoading,
}: {
  children: React.ReactNode;
  showLoading?: boolean;
}) {
  const getSelectedBackground = () => {
    const Backgrounds = [Background1];
    const randomIndex = Math.floor(Math.random() * Backgrounds.length);
    return Backgrounds[randomIndex];
  };

  return (
    <Layout>
      <Image
        src={getSelectedBackground()}
        alt="Comida de Buteco background image"
        fill
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        style={{ zIndex: -1, objectFit: 'cover' }}
      />
      <div className="overflow-hidden flex flex-col justify-between min-h-screen bg-linear-to-b/srgb from-gray-50/0 to-blac backdrop-blur-sm">
        <NavigationBar />
        <MapProvider>{showLoading ? <LoadingSpinner /> : children}</MapProvider>
        <Footer />
      </div>
    </Layout>
  );
}
