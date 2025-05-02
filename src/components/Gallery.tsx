import type { RestaurantInfoResponse } from '@/models/api/restaurantsInfoResponse';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Pagination } from '@/components';
import { useModal } from '@/contexts/ModalContext';
import { ExternalLink } from 'lucide-react';

export function Gallery({ restaurants }: { restaurants: RestaurantInfoResponse[] }) {
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(16);

  useEffect(() => {
    setPageSize(16);
    setCurrentPage(1);
  }, [restaurants]);

  return (
    <div className="mx-auto max-w-full py-4 px-4 lg:max-w-7xl lg:px-8 grid gap-y-4">
      {restaurants.length / pageSize > 1 && (
        <Pagination
          total={restaurants.length}
          pageSize={pageSize}
          page={currentPage}
          changePage={setCurrentPage}
        />
      )}
      <div className="grid grid-cols-1 gap-y-8 gap-x-4 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
        {restaurants
          .slice((currentPage - 1) * pageSize, currentPage * pageSize)
          .map((restaurant) => (
            <BlurGalleryItem key={restaurant.name} restaurant={restaurant} />
          ))}
      </div>
    </div>
  );
}

function BlurGalleryItem({ restaurant }: { restaurant: RestaurantInfoResponse }) {
  const [isLoading, setLoading] = useState(true);
  const { openModal } = useModal();

  const modalContent = () => {
    return (
      <div className="mt-2 max-w-5xl">
        <div className="relative border-b border-t border-b-blue-gray-100 border-t-blue-gray-100 p-0 font-sans text-base font-light leading-relaxed text-blue-gray-500 antialiased">
          <Image
            alt={restaurant.name}
            src={restaurant.image ?? ''}
            // fill
            width={1024}
            height={1024}
            className={cn(
              'w-full duration-700 ease-in-out group-hover:opacity-75 rounded-lg"',
              isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'
            )}
            onLoadingComplete={() => setLoading(false)}
            onClick={handleImageClick}
          />
        </div>
        <div className="flex flex-col items-stretch justify-between py-4">
          <p className="text-xs font-normal text-slate-500">{restaurant.address}</p>
        </div>
        <div className="flex shrink-0 flex-wrap items-center justify-end text-blue-gray-500">
          <a
            rel="noreferrer"
            target="_blank"
            href={restaurant.detailsLink}
            className="cursor-pointer flex items-center gap-x-1 rounded-md border border-slate-300 py-2 px-4 text-center text-sm transition-all shadow-sm hover:shadow-lg text-slate-600 hover:text-white hover:bg-slate-800 hover:border-slate-800 focus:text-white focus:bg-slate-800 focus:border-slate-800 active:border-slate-800 active:text-white active:bg-slate-800 disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none"
            type="button">
            <ExternalLink />
            Detalhes
          </a>
        </div>
      </div>
    );
  };
  const handleImageClick = () => {
    openModal(restaurant.name, modalContent());
  };

  return (
    <div className="group p-2 border-[1px] rounded-lg bg-black/45 border-gray-200/10 shadow-lg transition delay-150 duration-300 ease-in-out hover:-translate-y-1 hover:scale-105">
      <div className="relative aspect-w-1 aspect-h-1 w-full size-40 overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 xl:aspect-h-8">
        <Image
          alt={restaurant.name}
          src={restaurant.image ?? ''}
          fill={true}
          style={{ objectFit: 'cover' }}
          className={cn(
            'duration-700 ease-in-out group-hover:opacity-75 w-xs rounded-lg"',
            isLoading ? 'scale-110 blur-2xl grayscale' : 'scale-100 blur-0 grayscale-0'
          )}
          onLoadingComplete={() => setLoading(false)}
          onClick={handleImageClick}
        />
      </div>
      <div className="mt-1 font-medium text-gray-300 gap-y-0 font-sans">
        <p className="font-light text-lg flex justify-end text-end">{restaurant.name}</p>
      </div>
      <h3 className="mt-4 text-sm text-gray-100 font-sans font-thin flex justify-end text-end">
        {restaurant.address}
      </h3>
      <a
        rel="noreferrer"
        target="_blank"
        className="mt-1 text-sm font-medium text-blue-300 gap-y-0 flex justify-end text-end font-sans"
        href={restaurant.detailsLink}>
        Detalhes
      </a>
    </div>
  );
}

function cn(...classes: string[]) {
  return classes.filter(Boolean).join(' ');
}
