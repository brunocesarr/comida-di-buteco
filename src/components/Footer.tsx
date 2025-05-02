import Image from 'next/image';

export function Footer() {
  return (
    <footer id="footer" className="bg-black/75 text-black py-4 w-full">
      <div className="flex flex-row justify-around align-items-center items-center gap-6">
        <div className="logo flex flex-col align-items-center justify-center items-center gap-1">
          <a
            href="https://comidadibuteco.com.br/"
            className="custom-logo-link"
            rel="noreferrer home"
            target="_blank">
            <Image
              alt="Comida Di Buteco Logo"
              src="https://cdb-static-files.s3.amazonaws.com/wp-content/uploads/2022/03/25112702/logo-comida-di-buteco.webp"
              width={100}
              height={100}
              style={{ objectFit: 'contain' }}
            />
          </a>
          <div className="p-2 text-white rounded-lg">
            <div className="font-display text-xl">O maior concurso de butecos do Brasil!</div>
          </div>
        </div>
      </div>
    </footer>
  );
}
