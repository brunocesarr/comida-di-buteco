/* This example requires Tailwind CSS v2.0+ */
import { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface PaginatedNumbersProps {
  totalPages: number;
  page: number;
  changePage: (index: number) => void;
  maxPageNumberLimit: number;
  minPageNumberLimit: number;
}

const PaginatedNumbers = ({
  totalPages,
  page,
  changePage,
  maxPageNumberLimit,
  minPageNumberLimit,
}: PaginatedNumbersProps) => {
  const paginateNumbers: React.ReactElement[] = [];

  const pageDots = (direction: 'leftDots' | 'rightDots') => {
    return (
      <button
        key={direction}
        disabled
        className="relative inline-flex items-center text-white px-4 py-2 text-sm font-medium">
        ...
      </button>
    );
  };

  const pageNumberItem = (pageNumber: number) => {
    return (
      <button
        key={pageNumber}
        onClick={() => changePage(pageNumber)}
        className={`
          transition delay-50 duration-500 ease-in-out hover:-translate-0 hover:scale-105 hover:border border-gray-50/35 hover:border-gray-50/35
          ${page === pageNumber ? 'bg-gray-50/15 text-white' : ''}
          relative inline-flex items-center rounded-lg px-4 py-2 text-sm font-medium cursor-pointer`}>
        {pageNumber}{' '}
      </button>
    );
  };

  paginateNumbers.push(pageNumberItem(1));

  if (minPageNumberLimit - 1 > 1) {
    paginateNumbers.push(pageDots('leftDots'));
  }

  if (maxPageNumberLimit - minPageNumberLimit > 1) {
    Array.from({ length: totalPages }, (num, index) => {
      const pageNumber = index + 1;
      if (pageNumber > 1 && pageNumber >= minPageNumberLimit) {
        if (pageNumber < totalPages && pageNumber <= maxPageNumberLimit)
          paginateNumbers.push(pageNumberItem(pageNumber));
      }
    });
  }

  if (maxPageNumberLimit + 1 < totalPages) {
    paginateNumbers.push(pageDots('rightDots'));
  }

  paginateNumbers.push(pageNumberItem(totalPages));

  return paginateNumbers;
};

interface PaginationProps {
  total: number;
  pageSize: number;
  page: number;
  changePage: (index: number) => void;
}

export function Pagination({ total, pageSize, page, changePage }: PaginationProps) {
  const [minPageNumberLimit, setMinPageNumberLimit] = useState(0);
  const [maxPageNumberLimit, setMaxPageNumberLimit] = useState(5);

  const pageDifference = (5 - 1) / 2;
  const totalPages = Math.ceil(total / pageSize);

  const handleMinAndMaxPageNumberLimit = (currentPage: number) => {
    const maxPageNumberLimit = currentPage + pageDifference;
    if (maxPageNumberLimit > totalPages) {
      setMaxPageNumberLimit(totalPages);
    } else {
      setMaxPageNumberLimit(maxPageNumberLimit);
    }

    const minPageNumberLimit = currentPage - pageDifference;
    if (minPageNumberLimit < 1) {
      setMinPageNumberLimit(1);
    } else {
      setMinPageNumberLimit(minPageNumberLimit);
    }
  };

  const incrementPage = () => {
    handlePage(page + 1);
  };

  const decrementPage = () => {
    handlePage(page - 1);
  };

  const handlePage = (currentPage: number) => {
    changePage(currentPage);
    handleMinAndMaxPageNumberLimit(currentPage);
  };

  const pageIconButton = (direction: 'left' | 'right') => {
    const isLeftDirection = direction === 'left';
    const isEnabled = isLeftDirection ? page > 1 : page < totalPages;
    const transitionButton = isEnabled
      ? 'transition delay-0 duration-500 ease-in-out hover:-translate-0 hover:scale-105 hover:border border-gray-50/35 hover:border-gray-50/35'
      : '';
    const buttonColor = isEnabled
      ? 'bg-gray-50/15 text-white cursor-pointer'
      : 'text-gray-500 bg-gray-300/10 cursor-not-allowed';
    const buttonClass = `relative inline-flex items-center rounded-lg p-2 text-sm font-medium ${isLeftDirection ? 'rounded-l-lg' : 'rounded-r-lg'}`;
    const buttonAction = isLeftDirection ? decrementPage : incrementPage;

    return (
      <>
        <button
          disabled={!isEnabled}
          onClick={buttonAction}
          className={buttonClass + ' ' + transitionButton + ' ' + buttonColor}>
          <span className="sr-only">{isLeftDirection ? 'Anterior' : 'Proximo'}</span>
          {isLeftDirection ? (
            <ChevronLeft className="size-5" aria-hidden="true" />
          ) : (
            <ChevronRight className="size-5" aria-hidden="true" />
          )}
        </button>
        <button
          disabled={!isEnabled}
          onClick={buttonAction}
          className={'sm:hidden' + ' ' + buttonClass + ' ' + transitionButton + ' ' + buttonColor}>
          {isLeftDirection ? 'Anterior' : 'Proximo'}
        </button>
      </>
    );
  };

  return (
    <div className="flex items-center justify-between rounded-lg border-y border-gray-50/15 px-4 py-3 sm:px-6">
      <div className="flex flex-1 justify-between sm:hidden">
        {pageIconButton('left')}
        {pageIconButton('right')}
      </div>
      <div className="hidden sm:flex sm:flex-1 sm:items-center sm:justify-between">
        <div>
          <p className="text-sm text-gray-100">
            Página <span className="font-medium">{page}</span> de{' '}
            <span className="font-medium">{totalPages}</span> (
            <span className="font-medium">{total}</span> resultados)
          </p>
        </div>
        <div>
          <nav
            className="relative z-0 inline-flex space-x-1 rounded-md shadow-sm"
            aria-label="Pagination">
            {pageIconButton('left')}
            <PaginatedNumbers
              totalPages={totalPages}
              changePage={handlePage}
              page={page}
              minPageNumberLimit={minPageNumberLimit}
              maxPageNumberLimit={maxPageNumberLimit}
            />
            {pageIconButton('right')}
          </nav>
        </div>
      </div>
    </div>
  );
}
