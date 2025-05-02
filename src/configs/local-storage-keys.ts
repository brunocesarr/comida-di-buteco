class LocalStorageKeysCache {
  static readonly COMIDA_DI_BUTECO_RESTAURANTS_INFO: string = process.env
    .NEXT_PUBLIC_AMBIENTE_BRAZUERAO_WEB_APP
    ? `comida-di-buteco-restaurants_${process.env.NEXT_PUBLIC_AMBIENTE_BRAZUERAO_WEB_APP}`
    : 'comida-di-buteco-restaurant';
  static readonly COMIDA_DI_BUTECO_RESTAURANTS_WEB_INFO: string = process.env
    .NEXT_PUBLIC_AMBIENTE_BRAZUERAO_WEB_APP
    ? `comida-di-buteco-restaurants-web_${process.env.NEXT_PUBLIC_AMBIENTE_BRAZUERAO_WEB_APP}`
    : 'comida-di-buteco-restaurant-web';
}

export { LocalStorageKeysCache };
