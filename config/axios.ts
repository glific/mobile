import axios, { AxiosInstance } from "axios";
// import { API_BASE_URL } from "@env"

function createAxiosClient(): AxiosInstance {
  return axios.create({
    baseURL: "https://api.staging.tides.coloredcow.com/api",//API_BASE_URL,
  });
}

export default createAxiosClient