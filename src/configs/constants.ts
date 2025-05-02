import type { City } from '@/models/city';

class Constants {
  static readonly DEFAULT_CITY_URL_PARAM: string = 'belo-horizonte';
  static readonly DEFAULT_CITIES_OPTIONS: City[] = [
    { value: 'belem', label: 'Belém' },
    { value: 'belo-horizonte', label: 'Belo Horizonte' },
    { value: 'blumenau', label: 'Blumenau' },
    { value: 'brasilia-butecos', label: 'Brasília' },
    { value: 'campinas', label: 'Campinas' },
    { value: 'curitiba-butecos', label: 'Curitiba' },
    { value: 'florianopolis', label: 'Florianópolis' },
    { value: 'fortaleza', label: 'Fortaleza' },
    { value: 'goias', label: 'Goiás' },
    { value: 'joinville', label: 'Joinville' },
    { value: 'juiz-de-fora', label: 'Juiz de Fora' },
    { value: 'londrina', label: 'Londrina' },
    { value: 'manaus-butecos', label: 'Manaus' },
    { value: 'maringa', label: 'Maringá' },
    { value: 'montes-claros', label: 'Montes Claros' },
    { value: 'niteroi', label: 'Niterói' },
    { value: 'nova-iguacu-duque-de-caxias', label: 'Nova iguaçu, Duque de Caxias' },
    { value: 'pocos-de-caldas', label: 'Poços de Caldas' },
    { value: 'porto-alegre', label: 'Porto Alegre' },
    { value: 'recife', label: 'Recife' },
    { value: 'ribeirao-preto', label: 'Ribeirão Preto' },
    { value: 'rio-de-janeiro', label: 'Rio de Janeiro' },
    { value: 'salvador', label: 'Salvador' },
    { value: 'sao-jose-do-rio-preto', label: 'São José do Rio Preto' },
    { value: 'sao-paulo', label: 'São Paulo' },
    { value: 'triangulo-mineiro', label: 'Triângulo Mineiro' },
    { value: 'vale-do-aco', label: 'Vale do Aço' },
  ];
}

export { Constants };
