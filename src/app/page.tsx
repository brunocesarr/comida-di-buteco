'use client';

import NavigationLayout from '@/components/NavigationLayout';

export default function Home() {
  return (
    <NavigationLayout>
      <div className="container mx-auto px-8 rounded-2xl flex flex-col items-center justify-items-center justify-center sm:py-20 font-display max-w-5xl gap-y-8 bg-black/45 backdrop-blur-lg">
        <h1 className="text-5xl font-bold text-white">Comida Di Buteco</h1>
        <div className="w-full h-0.5 bg-gray-100/20" />
        <div className="section-text font-sans text-base flex flex-col gap-2 text-justify">
          <p>
            O site desenvolvido tem como principal objetivo facilitar a experiência dos usuários na
            busca por restaurantes participantes e seus respectivos pratos. A plataforma propõe uma
            abordagem centrada na conveniência do cliente, destacando-se pela implementação de
            funcionalidades como a localização de estabelecimentos mais próximos ao usuário
            <span className="Apple-converted-space">&nbsp;</span>
          </p>
          <p>
            Esta ferramenta de geolocalização elimina a necessidade de deslocamentos extensos pela
            cidade, permitindo que os usuários identifiquem rapidamente as opções mais viáveis em
            sua região. Ao apresentar alternativas próximas e relevantes, o sistema otimiza o
            processo decisório do cliente, economizando tempo e tornando a experiência de escolha de
            restaurantes mais eficiente e personalizada.
            <span className="Apple-converted-space">&nbsp;</span>
          </p>
          <p>
            O diferencial da plataforma está justamente em sua capacidade de conectar consumidores a
            estabelecimentos participantes de forma intuitiva e localizada, priorizando a
            praticidade e a acessibilidade na descoberta de novas opções gastronômicas.
          </p>
        </div>
      </div>
    </NavigationLayout>
  );
}
