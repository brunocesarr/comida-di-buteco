'use client';

import Layout from '@/components/NavigationLayout';
import Image from 'next/image';
import { ArrowRightCircleIcon } from 'lucide-react';

export default function About() {
  return (
    <Layout>
      <div className="container mx-auto py-8 px-4 rounded-sm md:rounded-lg max-w-full md:max-w-8/12 bg-black/45 backdrop-blur-lg">
        <div className="mb-8">
          <h1 className="text-end text-5xl font-display justify-content-start">
            O Comida di Buteco
          </h1>
        </div>
        <div className="flex flex-col md:flex-row items-center justify-center gap-6 max-sm:divide-y md:divide-x divide-gray-100/20">
          <Image
            width={700}
            height={700}
            src="https://comidadibuteco.com.br/wp-content/uploads/2022/03/historia6.jpg"
            className="pb-4 md:pr-4"
            alt=""
            decoding="async"
          />
          <div className="section-text font-sans text-base flex flex-col gap-2 text-justify">
            <p>
              O Comida di Buteco nasceu em 2000 com o objetivo de resgatar os butecos autênticos,
              aqueles que têm alma e todo mundo leva no coração.
              <span className="Apple-converted-space">&nbsp;</span>
            </p>
            <p>
              Ao longo dos anos, encontramos nossa razão de ser: transformar vidas através da
              cozinha de raiz. O concurso caiu no gosto da galera Brasil afora, e assim surgiu a
              nação butequeira, a turma que ama e defende o buteco até o fim.
              <span className="Apple-converted-space">&nbsp;</span>
            </p>
            <p>
              Agora são 25 anos difundindo, celebrando e valorizando o buteco, elemento fundamental
              na cultura e na economia do país.
            </p>
            <p className="mt-2 font-bold text-xl">
              Mas por que <i>buteco</i>?
            </p>
            <p>
              Buteco, com <i>u</i> mesmo. É como carinhosamente os mineiros chamam seus bares.
              Significa, acima de tudo, aquilo que é simples e autêntico.
              <span className="Apple-converted-space">&nbsp;</span>
            </p>
            <p>
              É sinônimo de comida boa, ambiente democrático e descontração. Pode o tempo passar, e
              isso não muda. O Comida di Buteco luta para que os butecos brasileiros possam
              persistir, crescer, se destacar, mas sem perder sua identidade, seu sentido, sua
              essência.<span className="Apple-converted-space">&nbsp;</span>
            </p>
            <a
              className="mt-1 text-sm font-medium text-blue-300 gap-y-0 flex justify-end items-center text-end font-sans"
              href="https://comidadibuteco.com.br/o-comida-di-buteco/">
              Mais informações
              <ArrowRightCircleIcon className="w-4 h-4 inline-block ml-1" />
            </a>
          </div>
        </div>
      </div>
    </Layout>
  );
}
