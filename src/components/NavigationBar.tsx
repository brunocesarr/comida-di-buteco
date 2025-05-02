import { Constants } from '@/configs';
import { useLocationUser } from '@/contexts';
import { LogIn, Settings2, UserRoundPlus } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { ActiveLink } from '@/components';

export function NavigationBar() {
  const { selectedCity, setSelectedCity } = useLocationUser();
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="bg-black/75 h-[10vh] w-[100vw] grid text-center items-center px-8 font-sans lg:py-0 lg:px-28 bg-cover bg-center bg-no-repeat text-white font-dmsansmd">
      <nav className="flex justify-between items-center md:kflex">
        <div className="hidden d-flex justify-center items-center gap-4 lg:flex">
          <Link href="/">
            <Image
              alt="Comida Di Buteco Logo"
              src="https://cdb-static-files.s3.amazonaws.com/wp-content/uploads/2022/03/25112702/logo-comida-di-buteco.webp"
              width={100}
              height={100}
              style={{ objectFit: 'contain' }}
            />
          </Link>
          <ul className="flex gap-8 text-lg font-bold">
            <ActiveLink path="/restaurants" title="Restaurantes" />
            <ActiveLink path="/about" title="Sobre" />
          </ul>
        </div>

        <details className="dropdown lg:hidden text-left text-white">
          <summary className="btn m-1 bg-inherit border-none">
            <i className="fa-solid fa-bars text-white text-lg"></i>
          </summary>
          <ul className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 px-4 flex flex-col gap-3 md:hidden">
            <ActiveLink path="/restaurants" title="Restaurantes" />
            <ActiveLink path="/about" title="Sobre" />
          </ul>
          <ul className="hidden md:flex dropdown-content menu p-2 shadow bg-base-100 rounded-box w-52 px-4 md:flex-col gap-3">
            <ActiveLink path="/restaurants" title="Restaurantes" />
            <ActiveLink path="/about" title="Sobre" />
          </ul>
        </details>

        <div className="hidden md:relative md:block">
          <div className="flex items-center justify-center gap-4">
            <form className="invisible max-w-sm mx-auto font-sans font-bold flex items-center justify-between gap-2">
              <div>
                <label htmlFor="underline_select" className="sr-only text-white">
                  Cidade
                </label>
                <select
                  id="underline_select"
                  onChange={(e) => {
                    const selectedCity = e.target.value;
                    setSelectedCity(selectedCity);
                  }}
                  defaultValue={selectedCity}
                  className="block py-2 px-0 w-full text-sm text-end text-white bg-transparent border-0 border-b-2 border-gray-200 appearance-none focus:outline-none focus:ring-0 focus:border-gray-200 peer">
                  <option value="">Selecione uma cidade</option>
                  {Constants.DEFAULT_CITIES_OPTIONS.map((city) => (
                    <option value={city.value} key={city.value}>
                      {city.label}
                    </option>
                  ))}
                </select>
              </div>
            </form>

            <button
              type="button"
              disabled
              className="cursor-pointer overflow-hidden min-w-10 min-h-10 rounded-lg border border-gray-700 shadow-inner items-center justify-center flex"
              onClick={() => setShowMenu((prev) => !prev)}>
              <span className="sr-only">Toggle dashboard menu</span>

              <Settings2 className="size-6 object-fill text-gray-50/40 font-thin" />
            </button>
          </div>
          <div
            hidden={!showMenu}
            className="absolute end-0 z-10 mt-0.5 min-w-fit divide-y divide-gray-100 rounded-md border border-gray-100 bg-white shadow-lg"
            role="menu">
            <div className="p-2">
              <a
                href="/sign-in"
                className="rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 flex justify-start items-center gap-2"
                role="menuitem">
                <LogIn />
                Login
              </a>

              <a
                href="/sign-up"
                className="rounded-lg px-4 py-2 text-sm text-gray-500 hover:bg-gray-50 hover:text-gray-700 flex justify-start items-center gap-2"
                role="menuitem">
                <UserRoundPlus />
                Registrar-se
              </a>
            </div>
          </div>
        </div>
      </nav>
    </header>
  );
}
