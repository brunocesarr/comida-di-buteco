import axios, { type AxiosRequestConfig } from 'axios';

const URL_BASE_COMIDA_DI_BUTECO = process.env.NEXT_URL_BASE_COMIDA_DI_BUTECO;
const USER_AGENT =
  'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/135.0.0.0 Safari/537.36 Edg/135.0.0.0';

const defaultOptions: AxiosRequestConfig = {
  baseURL: URL_BASE_COMIDA_DI_BUTECO,
  headers: {
    'Content-Type': 'application/json',
  },
};

const apiComidaDiButecoWeb = axios.create(defaultOptions);

apiComidaDiButecoWeb.interceptors.request.use(
  (config) => {
    config.headers.setUserAgent(USER_AGENT);
    return config;
  },
  (error) => {
    console.error(JSON.stringify(error));
    return Promise.reject(error);
  }
);

export default apiComidaDiButecoWeb;
