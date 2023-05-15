import axios, { AxiosInstance } from 'axios';

function createAxiosClient(): AxiosInstance {
  return axios.create({
    baseURL: 'https://api.staging.tides.coloredcow.com/api',
  });
}

export default createAxiosClient