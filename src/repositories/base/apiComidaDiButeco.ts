import axios, { type AxiosRequestConfig } from 'axios';

const URL_BASE_API_COMIDA_DI_BUTECO = process.env.NEXT_PUBLIC_URL_BRAZUERAO_WEB_APP;

const defaultOptions: AxiosRequestConfig = {
  baseURL: URL_BASE_API_COMIDA_DI_BUTECO,
  headers: {
    'Content-Type': 'application/json',
  },
};

const apiComidaDiButeco = axios.create(defaultOptions);

export default apiComidaDiButeco;
